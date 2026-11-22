import { useCallback, useEffect, useState } from "react";
import { adminListWithdrawals, adminCompleteWithdrawal, adminReturnWithdrawal, formatMoney } from "services/wallet";
import { getApiErrorMessage } from "utils/apiError";
import hostStyles from "pages/Host/Host.module.css";
import styles from "./AdminAnalytics.module.css";

// Finance tab: the pending withdrawals queue, oldest first. Send the money by hand through the
// payout service (to the account's email), then mark it Completed, optionally with the payout's
// reference. Or Return it with a reason the user sees: the money goes back to their Earnings.
// A frozen wallet's withdrawal can only be returned. Hidden from admins without can_manage_money.

const when = (iso) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export const AdminWithdrawals = () => {
    const [items, setItems] = useState(null);
    const [forbidden, setForbidden] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [busy, setBusy] = useState(false);

    const load = useCallback(async () => {
        try {
            setItems((await adminListWithdrawals('pending')).items);
            setError('');
        } catch (err) {
            if (err?.response?.status === 403) setForbidden(true);
            else setError(getApiErrorMessage(err));
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const act = async (action, success) => {
        setBusy(true);
        setError('');
        setNotice('');
        try {
            await action();
            setNotice(success);
        } catch (err) {
            setError(getApiErrorMessage(err));
        }
        await load();
        setBusy(false);
    };

    const complete = (w) => {
        const reference = window.prompt(
            `Mark ${formatMoney(w.amountCents)} to ${w.email} as sent? It leaves their wallet for good.\n\nPayout reference (optional):`, '');
        if (reference === null) return;
        act(() => adminCompleteWithdrawal(w.id, reference.trim()), `Completed ${formatMoney(w.amountCents)} for ${w.email}.`);
    };

    const giveBack = (w) => {
        const reason = window.prompt(`Return ${formatMoney(w.amountCents)} to ${w.email}'s Earnings? Reason (the user sees this):`, '');
        if (reason === null) return;
        if (reason.trim().length < 3) {
            setError('Write a reason of at least 3 characters.');
            return;
        }
        act(() => adminReturnWithdrawal(w.id, reason.trim()), `Returned ${formatMoney(w.amountCents)} to ${w.email}.`);
    };

    if (forbidden) return null;

    return (
        <section className={styles.card}>
            <h2 className={styles.cardTitle}>Pending withdrawals</h2>
            <p className={styles.cardSubtitle}>
                Send the money through the payout service to the account's email, then mark it completed. Every action is logged and the user is notified.
            </p>
            {error && <p className={styles.error}>{error}</p>}
            {notice && <p className={hostStyles.fieldHint} role="status">{notice}</p>}
            {items && items.length === 0 && <p className={styles.cardSubtitle}>No pending withdrawals.</p>}
            {items && items.length > 0 &&
                <table className={styles.table}>
                    <thead><tr><th>Requested</th><th>Account</th><th>Amount</th><th>Earnings now</th><th aria-label="Actions" /></tr></thead>
                    <tbody>
                        {items.map(w => (
                            <tr key={w.id}>
                                <td>{when(w.requestedAt)}</td>
                                <td>
                                    {w.email ?? 'Deleted account'}
                                    {w.usernames.length > 0 && <><br /><small>{w.usernames.join(', ')}</small></>}
                                    {w.walletFrozen && <><br /><small className={styles.error}>Wallet frozen: return only</small></>}
                                </td>
                                <td>{formatMoney(w.amountCents)}</td>
                                <td>{formatMoney(w.earningsCents)}</td>
                                <td>
                                    <div className={hostStyles.btnRow}>
                                        <button type="button" className={hostStyles.primaryBtn} disabled={busy || w.walletFrozen} onClick={() => complete(w)}>Complete</button>
                                        <button type="button" className={hostStyles.ghostBtn} disabled={busy} onClick={() => giveBack(w)}>Return</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
        </section>
    );
};
