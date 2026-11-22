import { useEffect, useSyncExternalStore } from "react";
import apiClient from "./apiClient";

// The signed in account's wallet, backed by the backend's /wallet routes. Money is always integer
// cents. A wallet has two balances: Deposited Funds (spendable on entry fees, never withdrawable)
// and Earnings (prizes and host cuts; the only money that can be withdrawn). A withdrawal moves
// Earnings into Pending Withdrawal (pendingWithdrawalCents, not spendable and not in totalCents)
// until uSync sends it or returns it. The backend credits a
// deposit only when Stripe confirms it, so after paying we poll until the balance moves.
//
// One small shared copy, so the navbar dropdown and the profile's wallet card always agree.

export const DEPOSIT_MIN_CENTS = 500;
// Deposit fee: up to $15 it's 3% + 30c, over $15 it's 5% (both give 75c at $15).
export const DEPOSIT_FEE_SMALL_MAX_CENTS = 1500;
export const DEPOSIT_FEE_SMALL_PERCENT = 3;
export const DEPOSIT_FEE_SMALL_FLAT_CENTS = 30;
export const DEPOSIT_FEE_PERCENT = 5;
export const DEPOSIT_DAILY_LIMIT_CENTS = 100_000;
// Withdrawals: any amount of Earnings from $1, or all of them (the only option below $1).
export const WITHDRAWAL_MIN_CENTS = 100;

// Must match deposit_fee() in the backend: percentages rounded half up to the cent.
export const depositFee = (amountCents) => (amountCents <= DEPOSIT_FEE_SMALL_MAX_CENTS
    ? Math.floor((amountCents * DEPOSIT_FEE_SMALL_PERCENT + 50) / 100) + DEPOSIT_FEE_SMALL_FLAT_CENTS
    : Math.floor((amountCents * DEPOSIT_FEE_PERCENT + 50) / 100));

// The rate shown next to the fee, e.g. "3% + $0.30" or "5%".
export const depositFeeLabel = (amountCents) => (amountCents <= DEPOSIT_FEE_SMALL_MAX_CENTS
    ? `${DEPOSIT_FEE_SMALL_PERCENT}% + ${formatMoney(DEPOSIT_FEE_SMALL_FLAT_CENTS)}`
    : `${DEPOSIT_FEE_PERCENT}%`);

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

// { items: [{ id, kind, bucket: 'deposited' | 'earnings' | 'pending_withdrawal', amountCents, createdAt, reason, eventId, eventName }], nextBefore }
export const getWalletHistory = (before = null) =>
    apiClient.get('/wallet/history', { params: before ? { before } : {} }).then(res => res.data);

// { depositId, clientSecret, amountCents, feeCents, totalCents, status }. Same key -> same deposit.
export const startDeposit = (amountCents, idempotencyKey) =>
    retrying(() => apiClient.post('/wallet/deposits', { amountCents, idempotencyKey })).then(res => res.data);

// Asks to withdraw `amountCents` of Earnings, or every cent of them with { all: true }. Resolves
// to the updated wallet. One key per withdraw dialog: a retry or double click asks once.
export const requestWithdrawal = async ({ amountCents = null, all = false }, idempotencyKey) => {
    const body = all ? { all: true, idempotencyKey } : { amountCents, idempotencyKey };
    const { data } = await retrying(() => apiClient.post('/wallet/withdrawals', body));
    set({ wallet: data, error: '' });
    return data;
};

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
    event_payout: 'Event payout',
    withdrawal_request: 'Withdrawal requested',
    withdrawal_complete: 'Withdrawal completed',
    withdrawal_return: 'Withdrawal returned',
};

export const BUCKET_LABELS = {
    deposited: 'Deposited funds',
    earnings: 'Earnings',
    pending_withdrawal: 'Pending withdrawal',
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

// { items: [{ id, accountId, email, usernames, amountCents, status, requestedAt, decidedAt,
// returnReason, externalReference, walletFrozen, earningsCents }] }, oldest first.
export const adminListWithdrawals = (status = 'pending') =>
    apiClient.get('/admin/withdrawals', { params: { status } }).then(res => res.data);

// Both safe to repeat: the backend completes or returns a withdrawal once, whatever happens.
export const adminCompleteWithdrawal = (withdrawalId, externalReference) =>
    retrying(() => apiClient.post(`/admin/withdrawals/${withdrawalId}/complete`, { externalReference: externalReference || null })).then(res => res.data);

export const adminReturnWithdrawal = (withdrawalId, reason) =>
    retrying(() => apiClient.post(`/admin/withdrawals/${withdrawalId}/return`, { reason })).then(res => res.data);
