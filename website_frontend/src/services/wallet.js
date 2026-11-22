import { useEffect, useSyncExternalStore } from "react";
import apiClient from "./apiClient";

// The signed in account's wallet, backed by the backend's /wallet routes. Money is always integer
// cents. A wallet has two balances: Deposited Funds (spendable on entry fees, never withdrawable)
// and Earnings (prizes and host cuts; the only money that can be withdrawn). The backend credits a
// deposit only when Stripe confirms it, so after paying we poll until the balance moves.
//
// One small shared copy, so the navbar dropdown and the profile's wallet card always agree.

export const DEPOSIT_MIN_CENTS = 500;
export const DEPOSIT_FEE_PERCENT = 5;
export const DEPOSIT_DAILY_LIMIT_CENTS = 100_000;

// Must match deposit_fee() in the backend: 5%, rounded half up to the cent.
export const depositFee = (amountCents) => Math.floor((amountCents * DEPOSIT_FEE_PERCENT + 50) / 100);

export const formatMoney = (cents) => {
    const value = Math.abs(cents ?? 0) / 100;
    const text = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return cents < 0 ? `-${text}` : text;
};

// "$12.34" / "12.3" / "12" -> 1234 / 1230 / 1200 cents, or null if it isn't a money amount.
export const parseDollars = (text) => {
    const clean = String(text ?? '').replace(/[$,\s]/g, '');
    if (!/^\d+(\.\d{0,2})?$/.test(clean)) return null;
    const [whole, frac = ''] = clean.split('.');
    return Number(whole) * 100 + Number(frac.padEnd(2, '0'));
};

// ---- shared copy ------------------------------------------------------------------

let state = { wallet: null, loading: false, error: '' };
const listeners = new Set();
const set = (change) => {
    state = { ...state, ...change };
    listeners.forEach(fn => fn());
};
const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
};

export const refreshWallet = async () => {
    set({ loading: true });
    try {
        const { data } = await apiClient.get('/wallet');
        set({ wallet: data, loading: false, error: '' });
        return data;
    } catch (err) {
        // 404: no profile yet, so no wallet. Anything else: keep the last copy we had.
        set({ loading: false, error: err?.response?.status === 404 ? '' : 'Could not load your wallet.' });
        return null;
    }
};

export const clearWallet = () => set({ wallet: null, loading: false, error: '' });

// { wallet, loading, error }. Loads once per mount when `enabled` (signed in with a profile).
export const useWallet = (enabled = true) => {
    const snapshot = useSyncExternalStore(subscribe, () => state);
    useEffect(() => {
        if (enabled) refreshWallet();
    }, [enabled]);
    return snapshot;
};

// Polls until the wallet total changes from `fromTotal` (the webhook landed) or time runs out.
export const waitForDeposit = async (fromTotal, { tries = 10, everyMs = 2000 } = {}) => {
    for (let i = 0; i < tries; i++) {
        await new Promise(resolve => setTimeout(resolve, everyMs));
        const wallet = await refreshWallet();
        if (wallet && wallet.totalCents !== fromTotal) return true;
    }
    return false;
};

// ---- calls -------------------------------------------------------------------------
//
// Every call that moves money carries an idempotency key: one per deposit dialog (or admin form
// submission). The backend does the action once per key and returns the same result for
// repeats, so a request whose answer got lost can safely be sent again - which `retrying` does
// for network errors and server hiccups.

export const newIdempotencyKey = () =>
    (window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`);

const transient = (err) => !err?.response || err.response.status >= 500;

const retrying = async (call, { tries = 3, waitMs = 800 } = {}) => {
    for (let attempt = 1; ; attempt++) {
        try {
            return await call();
        } catch (err) {
            if (attempt >= tries || !transient(err)) throw err;
            await new Promise(resolve => setTimeout(resolve, waitMs * attempt));
        }
    }
};

// { items: [{ id, kind, bucket: 'deposited' | 'earnings', amountCents, createdAt, reason, eventId, eventName }], nextBefore }
export const getWalletHistory = (before = null) =>
    apiClient.get('/wallet/history', { params: before ? { before } : {} }).then(res => res.data);

// { depositId, clientSecret, amountCents, feeCents, totalCents, status }. Same key -> same deposit.
export const startDeposit = (amountCents, idempotencyKey) =>
    retrying(() => apiClient.post('/wallet/deposits', { amountCents, idempotencyKey })).then(res => res.data);

export const KIND_LABELS = {
    deposit: 'Deposit',
    deposit_refund: 'Deposit refunded',
    chargeback: 'Disputed deposit taken back',
    chargeback_reversal: 'Dispute resolved, deposit restored',
    manual_credit: 'Added by uSync',
    manual_debit: 'Removed by uSync',
    deposit_refund_reversal: 'Refund failed, money put back',
    entry_fee: 'Entry fee',
    entry_refund: 'Entry fee refunded',
    guarantee_fund: 'Guaranteed prize held',
    guarantee_refund: 'Guaranteed prize returned',
};

// Auto-Pay lets your team captains take entry fees from your wallet when they sign you up.
export const AUTO_PAY_DAYS = [7, 30, 90];

// Turns Auto-Pay on for `days` (7, 30 or 90) or off (0); resolves to the updated wallet.
export const setAutoPay = async (days) => {
    const { data } = await apiClient.put('/wallet/auto-pay', { days });
    set({ wallet: data, error: '' });
    return data;
};

// ---- uSync staff (admins with can_manage_money) ---------------------------------------

// Cancels an event and refunds everyone (audit logged). Safe to repeat.
export const adminCancelEvent = (eventId, reason) =>
    retrying(() => apiClient.post(`/admin/events/${encodeURIComponent(eventId)}/cancel`, { reason })).then(res => res.data);

export const adminGetWallet = (email) => apiClient.get('/admin/wallets', { params: { email } }).then(res => res.data);

// { email, direction: 'credit' | 'debit', amountCents, reason, reference, idempotencyKey }
export const adminAdjustWallet = (fields) => retrying(() => apiClient.post('/admin/wallets/adjustments', fields)).then(res => res.data);

// Safe to repeat: a deposit is only ever refunded once, whatever happens.
export const adminRefundDeposit = (depositId, reason) =>
    retrying(() => apiClient.post(`/admin/deposits/${depositId}/refund`, { reason })).then(res => res.data);
