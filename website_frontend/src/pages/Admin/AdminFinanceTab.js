import { useState } from "react";
import { adminGetWallet, adminAdjustWallet, adminRefundDeposit, formatMoney, parseDollars } from "services/wallet";
import { getApiErrorMessage } from "utils/apiError";
import hostStyles from "pages/Host/Host.module.css";
import styles from "./AdminAnalytics.module.css";

// Finance tab of /admin/analytics: wallet tools for admins allowed to manage money
// (admins.can_manage_money). Look an account up by email, then:
//   - credit or debit its Deposited Funds by hand (e.g. a wired guaranteed prize), with a reason
//     and a reference; never Earnings, so wired money can't become withdrawable;
//   - refund one of its deposits to the card (amount + fee), while that much is still deposited.
// Every action is audit logged, emailed to uSync, and the user is notified. Other admins get a 403.

const DepositRow = ({ deposit, onRefund, busy }) => (
    <tr>
        <td>{new Date(deposit.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</td>
        <td>{formatMoney(deposit.amountCents)} + {formatMoney(deposit.feeCents)}</td>
        <td>{deposit.status}</td>
        <td>
            {deposit.status === 'succeeded' &&
                <button type="button" className={hostStyles.ghostBtn} disabled={busy} onClick={() => onRefund(deposit)}>Refund</button>}
        </td>
    </tr>
);

export const AdminFinanceTab = () => {
    const [email, setEmail] = useState('');
    const [wallet, setWallet] = useState(null);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [busy, setBusy] = useState(false);
    const [move, setMove] = useState({ direction: 'credit', amount: '', reason: '', reference: '' });

    const run = async (action, success) => {
        setBusy(true);
        setError('');
        setNotice('');
        try {
            setWallet(await action());
            if (success) setNotice(success);
        } catch (err) {
            setError(getApiErrorMessage(err));
        }
        setBusy(false);
    };

    const lookUp = (e) => {
        e.preventDefault();
        if (email.trim()) run(() => adminGetWallet(email.trim()));
    };

    const amountCents = parseDollars(move.amount);
    const canMove = wallet && amountCents > 0 && move.reason.trim().length >= 3 && move.reference.trim();

    const adjust = (e) => {
        e.preventDefault();
        if (!canMove) return;
        const verb = move.direction === 'credit' ? 'Add' : 'Remove';
        if (!window.confirm(`${verb} ${formatMoney(amountCents)} ${move.direction === 'credit' ? 'to' : 'from'} ${wallet.email}'s Deposited Funds?`)) return;
        run(() => adminAdjustWallet({
            email: wallet.email, direction: move.direction, amountCents, reason: move.reason.trim(), reference: move.reference.trim(),
        }), `${verb === 'Add' ? 'Added' : 'Removed'} ${formatMoney(amountCents)}.`).then(() => setMove(m => ({ ...m, amount: '', reason: '', reference: '' })));
    };

    const refund = (deposit) => {
        const total = deposit.amountCents + deposit.feeCents;
        const reason = window.prompt(`Refund ${formatMoney(total)} to the card for this deposit? Reason (optional):`, '');
        if (reason === null) return;
        run(() => adminRefundDeposit(deposit.id, reason), `Refunded ${formatMoney(total)}.`);
    };

    return (
        <section className={styles.card}>
            <h2 className={styles.cardTitle}>Wallet tools</h2>
            <p className={styles.cardSubtitle}>
                For admins allowed to manage money. Every action is logged, emailed to uSync, and the user is notified.
            </p>

            <form onSubmit={lookUp} className={hostStyles.btnRow} style={{ margin: '1rem 0' }}>
                <input className={styles.input} type="email" placeholder="Account email" value={email}
                    onChange={e => setEmail(e.target.value)} aria-label="Account email" />
                <button type="submit" className={hostStyles.primaryBtn} disabled={busy || !email.trim()}>Look up</button>
            </form>

            {error && <p className={styles.error}>{error}</p>}
            {notice && <p className={hostStyles.fieldHint} role="status">{notice}</p>}

            {wallet &&
                <>
                    <dl className={hostStyles.detailList}>
                        <dt>Account</dt><dd>{wallet.email}</dd>
                        <dt>Deposited funds</dt><dd>{formatMoney(wallet.depositedCents)}</dd>
                        <dt>Earnings</dt><dd>{formatMoney(wallet.earningsCents)}</dd>
                        <dt>Frozen</dt><dd>{wallet.frozen ? `Yes, since ${new Date(wallet.frozenAt).toLocaleDateString()}` : 'No'}</dd>
                    </dl>

                    <h3 className={styles.cardTitle} style={{ marginTop: '1.5rem' }}>Adjust Deposited Funds</h3>
                    <form onSubmit={adjust} className={hostStyles.form}>
                        <div className={hostStyles.segmented} role="radiogroup" aria-label="Direction">
                            {[['credit', 'Add (credit)'], ['debit', 'Remove (debit)']].map(([value, label]) => (
                                <button key={value} type="button" role="radio" aria-checked={move.direction === value}
                                    className={`${hostStyles.segment} ${move.direction === value ? hostStyles.segmentActive : ''}`}
                                    onClick={() => setMove(m => ({ ...m, direction: value }))}>{label}</button>
                            ))}
                        </div>
                        <input className={styles.input} inputMode="decimal" placeholder="Amount, e.g. 2500.00" value={move.amount}
                            onChange={e => setMove(m => ({ ...m, amount: e.target.value }))} aria-label="Amount" />
                        <input className={styles.input} placeholder="Reason (the user sees this)" value={move.reason}
                            onChange={e => setMove(m => ({ ...m, reason: e.target.value }))} aria-label="Reason" />
                        <input className={styles.input} placeholder="Reference, e.g. wire confirmation number (internal)" value={move.reference}
                            onChange={e => setMove(m => ({ ...m, reference: e.target.value }))} aria-label="Reference" />
                        <div>
                            <button type="submit" className={hostStyles.primaryBtn} disabled={busy || !canMove}>
                                {move.direction === 'credit' ? 'Add funds' : 'Remove funds'}
                            </button>
                        </div>
                    </form>

                    <h3 className={styles.cardTitle} style={{ marginTop: '1.5rem' }}>Recent deposits</h3>
                    {wallet.deposits.length === 0
                        ? <p className={styles.cardSubtitle}>No deposits.</p>
                        : (
                            <table className={styles.table}>
                                <thead><tr><th>When</th><th>Amount + fee</th><th>Status</th><th aria-label="Actions" /></tr></thead>
                                <tbody>
                                    {wallet.deposits.map(d => <DepositRow key={d.id} deposit={d} onRefund={refund} busy={busy} />)}
                                </tbody>
                            </table>
                        )}
                </>
            }
        </section>
    );
};
