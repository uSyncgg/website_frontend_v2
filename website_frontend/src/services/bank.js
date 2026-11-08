import { useCallback, useEffect, useSyncExternalStore } from "react";
import apiClient from "./apiClient";

// The Bank, backed by the backend's /wallet routes. Money comes back in cents:
// wallet       { balanceCents, pendingWithdrawalCents, minDepositCents, minWithdrawalCents, maxDepositCents,
//                depositFeePercent, payoutDays, depositsEnabled }
// transaction  { id, type: 'deposit' | 'withdrawal' | 'entry_fee' | 'entry_refund', status: 'completed' | 'pending' | 'cancelled',
//                amountCents (signed change to the balance), feeCents, chargedCents (deposits: amount + fee),
//                description, eventId, availableOn (withdrawals: payout date), createdAt }
//
// A small shared cache keeps the navbar balance and the Bank page in step: every deposit or
// withdrawal puts the new wallet back into it.

// Fallbacks until the first response; the API's numbers win once they arrive.
export const MIN_DEPOSIT = 5;
export const MIN_WITHDRAWAL = 5;
export const DEPOSIT_FEE_PERCENT = 5;
export const PAYOUT_DAYS = 30;

let state = { wallet: null, transactions: null };
const listeners = new Set();

const set = (change) => {
    state = { ...state, ...change };
    listeners.forEach(fn => fn());
};

const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
};

// Start over for the next account (sign-out), so one account's balance never flashes for another.
export const resetBank = () => set({ wallet: null, transactions: null });

export const fetchWallet = () => apiClient.get('/wallet').then(res => res.data);
export const fetchTransactions = () => apiClient.get('/wallet/transactions').then(res => res.data);

export const refreshWallet = async () => {
    const wallet = await fetchWallet();
    set({ wallet });
    return wallet;
};

export const refreshTransactions = async () => {
    const transactions = await fetchTransactions();
    set({ transactions });
    return transactions;
};

// Each write resolves to the updated wallet and refreshes the history. Dollars in, cents out.
const write = async (request) => {
    const wallet = (await request).data;
    set({ wallet });
    refreshTransactions().catch(() => {});
    return wallet;
};

// A printable receipt: { receiptNumber, type, status, description, date, lines: [{ label, cents }], totalCents, ... }.
export const getReceipt = (id) => apiClient.get(`/wallet/transactions/${encodeURIComponent(id)}/receipt`).then(res => res.data);

// Tax-time totals for one calendar year, and the years that have activity.
export const getTaxSummary = (year) => apiClient.get('/wallet/tax-summary', { params: { year } }).then(res => res.data);
export const getYears = () => apiClient.get('/wallet/years').then(res => res.data);

// Downloads the history (kind 'transactions', optionally one year) or the one-year tax summary
// (kind 'tax') as a CSV file.
export const downloadExport = async ({ year = null, kind = 'transactions' } = {}) => {
    const res = await apiClient.get('/wallet/export', { params: { ...(year ? { year } : {}), kind }, responseType: 'blob' });
    const name = res.headers['content-disposition']?.match(/filename="([^"]+)"/)?.[1] ?? 'usync-bank-history.csv';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(res.data);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
};

export const deposit = (dollars) => write(apiClient.post('/wallet/deposits', { amount: dollars }));
export const withdraw = (dollars) => write(apiClient.post('/wallet/withdrawals', { amount: dollars }));
export const cancelWithdrawal = (id) => write(apiClient.post(`/wallet/withdrawals/${encodeURIComponent(id)}/cancel`));

// ---- hooks -----------------------------------------------------------------

const REFRESH_MS = 60 * 1000;

// The wallet (null until loaded), refreshed on mount and every minute. Pass enabled=false to
// stay quiet (signed out, or sign-up not finished).
export const useWallet = (enabled = true) => {
    const wallet = useSyncExternalStore(subscribe, () => state.wallet);

    useEffect(() => {
        if (!enabled) return;
        const load = () => refreshWallet().catch(() => {});
        load();
        const id = setInterval(load, REFRESH_MS);
        return () => clearInterval(id);
    }, [enabled]);

    return wallet;
};

// The bank history (null until loaded).
export const useTransactions = (enabled = true) => {
    const transactions = useSyncExternalStore(subscribe, () => state.transactions);
    const reload = useCallback(() => refreshTransactions().catch(() => {}), []);

    useEffect(() => {
        if (enabled) reload();
    }, [enabled, reload]);

    return { transactions, reload };
};

// ---- formatting ------------------------------------------------------------

export const formatMoney = (cents) => {
    const dollars = (cents ?? 0) / 100;
    return dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

// Dollars as typed -> cents, or null when it isn't a valid amount (more than two decimals, zero, negative).
export const parseDollars = (text) => {
    const clean = String(text).trim().replace(/^\$/, '');
    if (!/^\d+(\.\d{1,2})?$/.test(clean)) return null;
    const cents = Math.round(Number(clean) * 100);
    return cents > 0 ? cents : null;
};

// The 5% fee on a deposit of this many cents, rounded half up like the backend.
export const depositFeeCents = (cents, percent = DEPOSIT_FEE_PERCENT) => Math.floor((cents * percent + 50) / 100);
