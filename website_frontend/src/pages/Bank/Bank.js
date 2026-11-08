import { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { FaArrowDown, FaArrowUp, FaDownload, FaTicketAlt, FaTrophy, FaUndo, FaStore } from "react-icons/fa";
import { useWallet, useTransactions, deposit, withdraw, cancelWithdrawal, getReceipt, getTaxSummary, getYears, downloadExport, formatMoney, parseDollars, depositFeeCents, MIN_DEPOSIT, MIN_WITHDRAWAL, DEPOSIT_FEE_PERCENT, PAYOUT_DAYS } from "services/bank";
import { getApiErrorMessage } from "utils/apiError";
import { Modal } from "pages/Host/hostShared";
import hostStyles from "pages/Host/Host.module.css";
import styles from "./Bank.module.css";

const FILTERS = [
    ['all', 'All'],
    ['deposit', 'Deposits'],
    ['withdrawal', 'Withdrawals'],
    ['entry', 'Entries'],
    ['winnings', 'Winnings'],
];

const QUICK_AMOUNTS = [10, 25, 50, 100];

const dateLabel = (iso) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const TYPE_LABELS = { deposit: 'Deposit', withdrawal: 'Withdrawal', entry_fee: 'Entry', entry_refund: 'Refund', prize: 'Prize', host_payout: 'Event revenue' };

// Which filter a transaction belongs to: entry fees and their refunds are "Entries".
const filterOf = (t) => {
    if (t.type === 'entry_fee' || t.type === 'entry_refund') return 'entry';
    if (t.type === 'prize' || t.type === 'host_payout') return 'winnings';
    return t.type;
};

const StatusTag = ({ t }) => {
    if (t.status === 'cancelled') return <span className={`${styles.tag} ${styles.tagCancelled}`}>Cancelled</span>;
    if (t.type === 'withdrawal' && t.status === 'pending') return <span className={`${styles.tag} ${styles.tagPending}`}>Pending</span>;
    if (t.type === 'withdrawal') return <span className={`${styles.tag} ${styles.tagDone}`}>Paid</span>;
    return <span className={`${styles.tag} ${styles.tagDone}`}>Completed</span>;
};

// Dollars typed into an amount box, checked against the rules. Returns { cents, error }.
const checkAmount = (text, { min, max, noun, verb }) => {
    if (!text.trim()) return { cents: null, error: '' };
    const cents = parseDollars(text);
    if (cents === null) return { cents: null, error: 'Enter a dollar amount, like 25 or 25.50' };
    if (cents < min) return { cents, error: `The minimum ${noun} is ${formatMoney(min)}` };
    if (max != null && cents > max) return { cents, error: `You can ${verb} up to ${formatMoney(max)}` };
    return { cents, error: '' };
};

const AmountField = ({ id, value, onChange, error }) => (
    <div className={hostStyles.field}>
        <label htmlFor={id}>Amount (USD)</label>
        <div className={styles.amountBox}>
            <span aria-hidden="true">$</span>
            <input id={id} className={hostStyles.input} inputMode="decimal" autoComplete="off" placeholder="0.00"
                value={value} onChange={e => onChange(e.target.value)} autoFocus aria-invalid={!!error} />
        </div>
        {error && <p className={hostStyles.fieldError} role="alert">{error}</p>}
    </div>
);

const DepositDialog = ({ wallet, onClose }) => {
    const [text, setText] = useState('');
    const [saving, setSaving] = useState(false);
    const [serverError, setServerError] = useState('');
    const min = wallet?.minDepositCents ?? MIN_DEPOSIT * 100;
    const percent = wallet?.depositFeePercent ?? DEPOSIT_FEE_PERCENT;
    const enabled = wallet?.depositsEnabled !== false;
    const { cents, error } = checkAmount(text, { min, max: wallet?.maxDepositCents, noun: 'deposit', verb: 'deposit' });
    const fee = cents ? depositFeeCents(cents, percent) : 0;

    const submit = async (e) => {
        e.preventDefault();
        if (!cents || error) return;
        setSaving(true);
        setServerError('');
        try {
            await deposit(cents / 100);
            onClose();
        } catch (err) {
            setServerError(getApiErrorMessage(err));
            setSaving(false);
        }
    };

    return (
        <Modal title="Add funds" onClose={onClose}>
            <form onSubmit={submit} className={hostStyles.form}>
                <AmountField id="deposit-amount" value={text} onChange={setText} error={error} />
                <div className={styles.quick} role="group" aria-label="Quick amounts">
                    {QUICK_AMOUNTS.map(a => (
                        <button key={a} type="button" className={`${hostStyles.ghostBtn} ${hostStyles.smallBtn}`} onClick={() => setText(String(a))}>${a}</button>
                    ))}
                </div>
                <dl className={styles.summary}>
                    <dt>Added to your balance</dt><dd>{cents ? formatMoney(cents) : '–'}</dd>
                    <dt>uSync fee ({percent}%)</dt><dd>{cents ? formatMoney(fee) : '–'}</dd>
                    <dt><strong>You pay</strong></dt><dd><strong>{cents ? formatMoney(cents + fee) : '–'}</strong></dd>
                </dl>
                {/* Stripe goes here once it's linked: the card form replaces this placeholder. */}
                <div className={styles.method}>
                    <strong>Payment method</strong>
                    <span>Card payments are coming soon. Deposits are instant once they're connected.</span>
                </div>
                {!enabled && <p className={hostStyles.fieldError} role="alert">Deposits aren't available yet - payments are coming soon.</p>}
                {serverError && <p className={hostStyles.fieldError} role="alert">{serverError}</p>}
                <div className={hostStyles.formActions}>
                    <button type="button" className={hostStyles.ghostBtn} onClick={onClose}>Cancel</button>
                    <button type="submit" className={hostStyles.primaryBtn} disabled={!cents || !!error || saving || !enabled}>
                        {saving ? 'Adding…' : cents ? `Add ${formatMoney(cents)}` : 'Add funds'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

const WithdrawDialog = ({ wallet, onClose }) => {
    const [text, setText] = useState('');
    const [saving, setSaving] = useState(false);
    const [serverError, setServerError] = useState('');
    const min = wallet?.minWithdrawalCents ?? MIN_WITHDRAWAL * 100;
    const days = wallet?.payoutDays ?? PAYOUT_DAYS;
    const balance = wallet?.balanceCents ?? 0;
    const { cents, error } = checkAmount(text, { min, max: balance, noun: 'withdrawal', verb: 'withdraw' });
    const payoutDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    const submit = async (e) => {
        e.preventDefault();
        if (!cents || error) return;
        setSaving(true);
        setServerError('');
        try {
            await withdraw(cents / 100);
            onClose();
        } catch (err) {
            setServerError(getApiErrorMessage(err));
            setSaving(false);
        }
    };

    return (
        <Modal title="Withdraw funds" onClose={onClose}>
            <form onSubmit={submit} className={hostStyles.form}>
                <p className={hostStyles.blurb}>Available to withdraw: <strong>{formatMoney(balance)}</strong></p>
                <AmountField id="withdraw-amount" value={text} onChange={setText} error={error} />
                <div className={styles.quick}>
                    <button type="button" className={`${hostStyles.ghostBtn} ${hostStyles.smallBtn}`} disabled={balance < min}
                        onClick={() => setText((balance / 100).toFixed(2))}>Withdraw everything</button>
                </div>
                <dl className={styles.summary}>
                    <dt>Payout</dt><dd>Net {days} - around {dateLabel(payoutDate)}</dd>
                    <dt>Withdrawal fee</dt><dd>None</dd>
                </dl>
                <p className={hostStyles.fieldHint}>
                    The money leaves your balance right away. Until the payout date you can cancel the withdrawal from your history to put it back.
                </p>
                {serverError && <p className={hostStyles.fieldError} role="alert">{serverError}</p>}
                <div className={hostStyles.formActions}>
                    <button type="button" className={hostStyles.ghostBtn} onClick={onClose}>Cancel</button>
                    <button type="submit" className={hostStyles.primaryBtn} disabled={!cents || !!error || saving}>
                        {saving ? 'Requesting…' : cents ? `Withdraw ${formatMoney(cents)}` : 'Withdraw'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

const printReceipt = (r) => {
    const w = window.open('', '_blank', 'width=640,height=800');
    if (!w) return;
    const doc = w.document;
    doc.title = `uSync receipt ${r.receiptNumber}`;
    const add = (tag, text, parent = doc.body, style = '') => {
        const el = doc.createElement(tag);
        el.textContent = text;
        if (style) el.setAttribute('style', style);
        parent.appendChild(el);
        return el;
    };
    doc.body.setAttribute('style', 'font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:2rem auto;color:#111');
    add('h1', 'uSync receipt', doc.body, 'margin:0 0 .25rem');
    add('p', `${r.receiptNumber} · ${new Date(r.date).toLocaleString('en-US')}`, doc.body, 'margin:0 0 1rem;color:#555');
    add('p', r.description || TYPE_LABELS[r.type] || '', doc.body, 'font-weight:600');
    r.lines.forEach(l => {
        const row = add('div', '', doc.body, 'display:flex;justify-content:space-between;padding:.35rem 0;border-bottom:1px solid #ddd');
        add('span', l.label, row);
        add('span', formatMoney(l.cents), row);
    });
    const total = add('div', '', doc.body, 'display:flex;justify-content:space-between;padding:.6rem 0;font-weight:700');
    add('span', r.direction === 'credit' ? 'Added to your balance' : 'Total', total);
    add('span', formatMoney(r.totalCents), total);
    if (r.email) add('p', `Account: ${r.email}`, doc.body, 'color:#555;font-size:.85rem');
    w.focus();
    w.print();
};

const ReceiptDialog = ({ id, onClose }) => {
    const [receipt, setReceipt] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        getReceipt(id).then(setReceipt).catch(err => setError(getApiErrorMessage(err)));
    }, [id]);

    return (
        <Modal title="Receipt" onClose={onClose}>
            {error && <p className={hostStyles.fieldError} role="alert">{error}</p>}
            {!receipt && !error && <p className={hostStyles.muted}>Loading…</p>}
            {receipt &&
                <>
                    <p className={hostStyles.blurb}>
                        <strong>{receipt.receiptNumber}</strong> · {dateLabel(receipt.date)}<br />
                        {receipt.description || TYPE_LABELS[receipt.type]}
                        {receipt.eventId && <> · <Link to={`/brackets/${encodeURIComponent(receipt.eventId)}`} className={styles.link} onClick={onClose}>View event</Link></>}
                    </p>
                    <dl className={styles.summary}>
                        {receipt.lines.map(l => <Fragment key={l.label}><dt>{l.label}</dt><dd>{formatMoney(l.cents)}</dd></Fragment>)}
                        <dt><strong>{receipt.direction === 'credit' ? 'Added to your balance' : 'Total'}</strong></dt><dd><strong>{formatMoney(receipt.totalCents)}</strong></dd>
                    </dl>
                    {receipt.payoutDate && receipt.type === 'withdrawal' &&
                        <p className={hostStyles.fieldHint}>{receipt.paidOn ? `Paid out ${dateLabel(receipt.paidOn)}.` : `Payout scheduled for ${dateLabel(receipt.payoutDate)}.`}</p>}
                    <div className={hostStyles.formActions}>
                        <button type="button" className={hostStyles.ghostBtn} onClick={onClose}>Close</button>
                        <button type="button" className={hostStyles.primaryBtn} onClick={() => printReceipt(receipt)}>Print / save as PDF</button>
                    </div>
                </>
            }
        </Modal>
    );
};

// CSV downloads of the history and a one-year tax summary (winnings, host earnings and fees).
const Exports = () => {
    const [years, setYears] = useState([new Date().getFullYear()]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [tax, setTax] = useState(null);
    const [busy, setBusy] = useState('');
    const [error, setError] = useState('');

    useEffect(() => { getYears().then(list => list.length && setYears(list)).catch(() => {}); }, []);
    useEffect(() => { getTaxSummary(year).then(setTax).catch(() => setTax(null)); }, [year]);

    const download = async (key, options) => {
        setBusy(key);
        setError('');
        try {
            await downloadExport(options);
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setBusy('');
        }
    };

    return (
        <section aria-labelledby="bank-exports" className={styles.exports}>
            <h2 id="bank-exports" className={hostStyles.sectionTitle}>Exports &amp; tax summary</h2>
            <div className={hostStyles.card}>
                <div className={styles.exportBar}>
                    <label htmlFor="export-year">Year</label>
                    <select id="export-year" className={hostStyles.select} value={year} onChange={e => setYear(Number(e.target.value))}>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <button type="button" className={hostStyles.secondaryBtn} disabled={!!busy} onClick={() => download('year', { year })}>
                        <FaDownload aria-hidden="true" /> {year} history (CSV)
                    </button>
                    <button type="button" className={hostStyles.ghostBtn} disabled={!!busy} onClick={() => download('all', {})}>
                        <FaDownload aria-hidden="true" /> All history (CSV)
                    </button>
                    <button type="button" className={hostStyles.ghostBtn} disabled={!!busy} onClick={() => download('tax', { year, kind: 'tax' })}>
                        <FaDownload aria-hidden="true" /> {year} tax summary (CSV)
                    </button>
                </div>
                {error && <p className={hostStyles.fieldError} role="alert">{error}</p>}
                {tax &&
                    <dl className={styles.summary}>
                        <dt>Prize winnings</dt><dd>{formatMoney(tax.prizeWinningsCents)}</dd>
                        <dt>Event revenue earned as a host (after uSync's fee)</dt><dd>{formatMoney(tax.hostEarningsCents)}</dd>
                        <dt>Entry fees paid (net of refunds)</dt><dd>{formatMoney(tax.netEntryFeesCents)}</dd>
                        <dt>Deposit fees paid</dt><dd>{formatMoney(tax.depositFeesCents)}</dd>
                        <dt>Withdrawals paid out</dt><dd>{formatMoney(tax.withdrawalsPaidCents)}</dd>
                    </dl>
                }
                <p className={hostStyles.fieldHint}>A record of your account activity for your own books. It isn't tax advice.</p>
            </div>
        </section>
    );
};

const History = ({ transactions, reload, onReceipt }) => {
    const [filter, setFilter] = useState('all');
    const [busyId, setBusyId] = useState(null);
    const [error, setError] = useState('');
    const shown = useMemo(() => (transactions ?? []).filter(t => filter === 'all' || filterOf(t) === filter), [transactions, filter]);

    const cancel = async (t) => {
        setBusyId(t.id);
        setError('');
        try {
            await cancelWithdrawal(t.id);
        } catch (err) {
            setError(getApiErrorMessage(err));
            reload();
        } finally {
            setBusyId(null);
        }
    };

    return (
        <section aria-labelledby="bank-history">
            <div className={styles.historyHead}>
                <h2 id="bank-history" className={hostStyles.sectionTitle}>History</h2>
                <div className={hostStyles.segmented} role="group" aria-label="Filter history">
                    {FILTERS.map(([value, label]) => (
                        <button key={value} type="button" aria-pressed={filter === value}
                            className={`${hostStyles.segment} ${filter === value ? hostStyles.segmentActive : ''}`}
                            onClick={() => setFilter(value)}>{label}</button>
                    ))}
                </div>
            </div>
            {error && <p className={hostStyles.fieldError} role="alert">{error}</p>}

            {transactions === null
                ? <p className={hostStyles.muted}>Loading your history…</p>
                : shown.length === 0
                    ? (
                        <div className={hostStyles.emptyState}>
                            <h3 className={hostStyles.sectionTitle}>{transactions.length === 0 ? 'No activity yet' : 'Nothing here'}</h3>
                            <p className={hostStyles.muted}>
                                {transactions.length === 0
                                    ? 'Deposits, withdrawals and paid event entries show up here.'
                                    : 'No transactions match this filter.'}
                            </p>
                        </div>
                    )
                    : (
                        <div className={hostStyles.tableWrap}>
                            <table className={hostStyles.table}>
                                <thead>
                                    <tr><th>Date</th><th>Details</th><th>Status</th><th className={styles.right}>Amount</th><th aria-label="Receipt" /></tr>
                                </thead>
                                <tbody>
                                    {shown.map(t => {
                                        const credit = t.amountCents > 0;
                                        const pendingWithdrawal = t.type === 'withdrawal' && t.status === 'pending';
                                        return (
                                            <tr key={t.id} className={t.status === 'cancelled' ? styles.struck : ''}>
                                                <td>{dateLabel(t.createdAt)}</td>
                                                <td>
                                                    <span className={hostStyles.entrantName}>
                                                        {t.type === 'deposit' && <FaArrowDown aria-hidden="true" className={styles.iconIn} />}
                                                        {t.type === 'withdrawal' && <FaArrowUp aria-hidden="true" className={styles.iconOut} />}
                                                        {t.type === 'entry_fee' && <FaTicketAlt aria-hidden="true" className={styles.iconOut} />}
                                                        {t.type === 'entry_refund' && <FaUndo aria-hidden="true" className={styles.iconIn} />}
                                                        {t.type === 'prize' && <FaTrophy aria-hidden="true" className={styles.iconIn} />}
                                                        {t.type === 'host_payout' && <FaStore aria-hidden="true" className={styles.iconIn} />}
                                                        {t.eventId
                                                            ? <Link to={`/brackets/${encodeURIComponent(t.eventId)}`} className={styles.link}>{t.description}</Link>
                                                            : t.description || TYPE_LABELS[t.type]}
                                                    </span>
                                                    {t.type === 'deposit' && t.feeCents > 0 &&
                                                        <span className={styles.sub}>Charged {formatMoney(t.chargedCents)} ({formatMoney(t.feeCents)} fee)</span>}
                                                    {t.type === 'entry_fee' && t.feeCents > 0 &&
                                                        <span className={styles.sub}>Includes {formatMoney(t.feeCents)} uSync fee</span>}
                                                    {t.type === 'host_payout' && t.feeCents > 0 &&
                                                        <span className={styles.sub}>After the {formatMoney(t.feeCents)} uSync fee (2.5% of profit)</span>}
                                                    {pendingWithdrawal && t.availableOn &&
                                                        <span className={styles.sub}>Payout on {dateLabel(t.availableOn)}</span>}
                                                    {t.type === 'withdrawal' && t.status === 'completed' && t.settledAt &&
                                                        <span className={styles.sub}>Paid on {dateLabel(t.settledAt)}</span>}
                                                </td>
                                                <td>
                                                    <StatusTag t={t} />
                                                    {pendingWithdrawal &&
                                                        <button type="button" className={styles.cancelLink} disabled={busyId === t.id} onClick={() => cancel(t)}>
                                                            {busyId === t.id ? 'Cancelling…' : 'Cancel'}
                                                        </button>}
                                                </td>
                                                <td className={`${hostStyles.num} ${styles.right} ${credit ? styles.credit : styles.debit}`}>
                                                    {credit ? '+' : '−'}{formatMoney(Math.abs(t.amountCents))}
                                                </td>
                                                <td>
                                                    <button type="button" className={styles.cancelLink} onClick={() => onReceipt(t.id)} aria-label={`Receipt for ${t.description || TYPE_LABELS[t.type]}`}>Receipt</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
            }
        </section>
    );
};

// The Bank: your uSync balance, add or withdraw funds, and everything that's moved it.
export const Bank = () => {
    const wallet = useWallet();
    const { transactions, reload } = useTransactions();
    // null, 'deposit' or 'withdraw'.
    const [dialog, setDialog] = useState(null);
    const [receiptId, setReceiptId] = useState(null);
    const days = wallet?.payoutDays ?? PAYOUT_DAYS;
    const percent = wallet?.depositFeePercent ?? DEPOSIT_FEE_PERCENT;

    return (
        <div className={`standardContainer ${hostStyles.page}`}>
            <div className={hostStyles.inner}>
                <div className={hostStyles.pageHeader}>
                    <div>
                        <p className={hostStyles.eyebrow}>Account</p>
                        <h1 className={hostStyles.title}>Bank</h1>
                        <p className={hostStyles.subtitle}>Your uSync funds, for entering events that cost money.</p>
                    </div>
                </div>

                <section className={`${hostStyles.card} ${styles.balanceCard}`} aria-label="Balance">
                    <div>
                        <span className={styles.balanceLabel}>Available balance</span>
                        <p className={styles.balance} aria-live="polite">{wallet ? formatMoney(wallet.balanceCents) : '–'}</p>
                        {wallet?.pendingWithdrawalCents > 0 &&
                            <p className={styles.pendingNote}>{formatMoney(wallet.pendingWithdrawalCents)} on its way to you in a pending withdrawal</p>}
                    </div>
                    <div className={hostStyles.btnRow}>
                        <button type="button" className={hostStyles.primaryBtn} onClick={() => setDialog('deposit')}>Deposit</button>
                        <button type="button" className={hostStyles.secondaryBtn} onClick={() => setDialog('withdraw')}>Withdraw</button>
                    </div>
                </section>

                <ul className={styles.rules}>
                    <li><strong>Instant deposits.</strong> Funds are ready the moment you add them. A {percent}% fee applies to each deposit.</li>
                    <li><strong>Net {days} payouts.</strong> Withdrawals are paid out {days} days after you request them.</li>
                    <li><strong>{formatMoney(wallet?.minDepositCents ?? MIN_DEPOSIT * 100)} minimum</strong> to deposit and <strong>{formatMoney(wallet?.minWithdrawalCents ?? MIN_WITHDRAWAL * 100)} minimum</strong> to withdraw.</li>
                </ul>

                <History transactions={transactions} reload={reload} onReceipt={setReceiptId} />

                <Exports />
            </div>

            {dialog === 'deposit' && <DepositDialog wallet={wallet} onClose={() => setDialog(null)} />}
            {dialog === 'withdraw' && <WithdrawDialog wallet={wallet} onClose={() => setDialog(null)} />}
            {receiptId && <ReceiptDialog id={receiptId} onClose={() => setReceiptId(null)} />}
        </div>
    );
};
