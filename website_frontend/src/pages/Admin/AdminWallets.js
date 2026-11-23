import { useMemo, useState } from "react";
import { LoadingWheel } from "components";
import { formatMoney } from "services/wallet";
import { getLoadErrorMessage } from "utils/apiError";
import styles from "./AdminAnalytics.module.css";

// Finance tab: every account's wallet, sortable, with totals over every wallet. Wallets of
// deleted accounts aren't listed but are counted in the totals; if any still hold money (they
// shouldn't: deletion is refused while a wallet holds money) a warning says how much. Clicking
// a row loads that account into the wallet tools below. Money admins only.

const SHOW_LIMIT = 200;

// Money columns sort largest first; username A to Z.
const COLUMNS = [
    { key: 'username', label: 'Account' },
    { key: 'depositedCents', label: 'Deposited funds', money: true },
    { key: 'earningsCents', label: 'Earnings', money: true },
    { key: 'pendingWithdrawalCents', label: 'Pending withdrawal', money: true },
];

const byColumn = (key) => {
    if (key === 'username') return (a, b) => (a.username ?? a.email ?? '').localeCompare(b.username ?? b.email ?? '');
    return (a, b) => b[key] - a[key] || b.earningsCents - a.earningsCents;
};

// Negative only after a chargeback (the wallet is then frozen).
export const Money = ({ cents }) => (
    <span className={cents < 0 ? styles.negative : undefined}>{formatMoney(cents)}</span>
);

export const AdminWallets = ({ data, loading, error, onPick }) => {
    const [sort, setSort] = useState('earningsCents');
    const [search, setSearch] = useState('');

    const shown = useMemo(() => {
        const q = search.trim().toLowerCase();
        return (data?.items ?? [])
            .filter(w => !q || `${w.username ?? ''} ${w.email ?? ''}`.toLowerCase().includes(q))
            .sort(byColumn(sort));
    }, [data, search, sort]);

    if (error) return <p className={styles.error}>{getLoadErrorMessage(error, "Unable to load wallets right now.")}</p>;
    if (loading && !data) return <LoadingWheel />;
    if (!data) return null;

    const { totals, deletedAccounts } = data;

    const sortHeader = ({ key, label, money }) => (
        <th key={key} className={money ? styles.money : undefined}
            aria-sort={sort === key ? (money ? 'descending' : 'ascending') : 'none'}>
            <button type="button" className={`${styles.sortButton} ${sort === key ? styles.sortActive : ''}`} onClick={() => setSort(key)}>
                {label}{sort === key && <span aria-hidden="true">{money ? ' ↓' : ' ↑'}</span>}
            </button>
        </th>
    );

    return (
        <section className={styles.card}>
            <h2 className={styles.cardTitle}>Wallets</h2>
            <p className={styles.cardSubtitle}>
                {data.items.length.toLocaleString('en-US')} wallets. Click one to open it in the wallet tools below.
            </p>

            <div className={styles.filterRow}>
                <input className={styles.input} style={{ maxWidth: '18rem' }} placeholder="Search username or email"
                    value={search} onChange={e => setSearch(e.target.value)} aria-label="Search wallets" />
            </div>

            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead><tr>{COLUMNS.map(sortHeader)}</tr></thead>
                    <tbody>
                        {shown.slice(0, SHOW_LIMIT).map(w => (
                            <tr key={w.accountId} className={styles.clickableRow} tabIndex={0}
                                onClick={() => onPick(w.email)}
                                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(w.email); } }}>
                                <td>
                                    <span className={styles.eventName}>{w.username || '—'}</span>
                                    {w.frozen && <span className={styles.frozenBadge}>Frozen</span>}
                                    <span className={styles.updatedAgo}>{w.email}</span>
                                </td>
                                <td className={styles.money}><Money cents={w.depositedCents} /></td>
                                <td className={styles.money}><Money cents={w.earningsCents} /></td>
                                <td className={styles.money}><Money cents={w.pendingWithdrawalCents} /></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total, every wallet</td>
                            <td className={styles.money}><Money cents={totals.depositedCents} /></td>
                            <td className={styles.money}><Money cents={totals.earningsCents} /></td>
                            <td className={styles.money}><Money cents={totals.pendingWithdrawalCents} /></td>
                        </tr>
                    </tfoot>
                </table>
                {shown.length > SHOW_LIMIT &&
                    <p className={styles.chartNote}>Showing the first {SHOW_LIMIT} of {shown.length.toLocaleString('en-US')}.</p>}
                {!shown.length && <p className={styles.chartNote}>No wallets match.</p>}
            </div>

            {deletedAccounts.walletCount > 0 &&
                <p className={styles.error} role="alert">
                    The totals include {formatMoney(deletedAccounts.depositedCents + deletedAccounts.earningsCents + deletedAccounts.pendingWithdrawalCents)}
                    {' '}in {deletedAccounts.walletCount} {deletedAccounts.walletCount === 1 ? 'wallet' : 'wallets'} of deleted accounts
                    {' '}({formatMoney(deletedAccounts.depositedCents)} deposited, {formatMoney(deletedAccounts.earningsCents)} earnings,
                    {' '}{formatMoney(deletedAccounts.pendingWithdrawalCents)} pending withdrawal). This shouldn't happen: look into it.
                </p>}
        </section>
    );
};
