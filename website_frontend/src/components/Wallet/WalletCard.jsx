import { useCallback, useEffect, useState } from "react";
import { ProfileCard } from "components/ProfileCard/ProfileCard";
import { useWallet, refreshWallet, getWalletHistory, startDeposit, waitForDeposit, formatMoney, KIND_LABELS, AUTO_PAY_DAYS, setAutoPay } from "services/wallet";
import { Link } from "react-router";
import { getApiErrorMessage } from "utils/apiError";
import { DepositDialog } from "./DepositDialog";
import hostStyles from "pages/Host/Host.module.css";
import styles from "./Wallet.module.css";

const when = (iso) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

// The wallet on your own profile (never shown on anyone else's): both balances, deposits, and the
// history of every movement.
export const WalletCard = () => {
    const { wallet, error } = useWallet(true);
    const [depositing, setDepositing] = useState(false);
    const [history, setHistory] = useState(null);
    const [nextBefore, setNextBefore] = useState(null);
    const [historyError, setHistoryError] = useState('');
    const [autoPayDays, setAutoPayDays] = useState(30);
    const [autoPayBusy, setAutoPayBusy] = useState(false);
    const [autoPayError, setAutoPayError] = useState('');

    const changeAutoPay = async (days) => {
        setAutoPayBusy(true);
        setAutoPayError('');
        try {
            await setAutoPay(days);
        } catch (err) {
            setAutoPayError(getApiErrorMessage(err));
        }
        setAutoPayBusy(false);
    };

    const loadHistory = useCallback(async (before = null) => {
        try {
            const page = await getWalletHistory(before);
            setHistory(h => (before ? [...(h ?? []), ...page.items] : page.items));
            setNextBefore(page.nextBefore);
            setHistoryError('');
        } catch (err) {
            setHistoryError(getApiErrorMessage(err));
        }
    }, []);

    useEffect(() => {
        loadHistory();
        // Back from a payment method that redirected: wait for Stripe's webhook to land.
        const params = new URLSearchParams(window.location.search);
        if (params.get('deposit') === 'returned' && params.get('redirect_status') === 'succeeded') {
            refreshWallet().then(w => waitForDeposit(w?.totalCents ?? 0, { tries: 5 })).then(() => loadHistory());
        }
    }, [loadHistory]);

    // Linked to from the navbar and notifications as #wallet.
    const loaded = !!wallet;
    useEffect(() => {
        if (loaded && window.location.hash === '#wallet') document.getElementById('wallet')?.scrollIntoView({ behavior: 'smooth' });
    }, [loaded]);

    if (!wallet) {
        return error ? <ProfileCard title="Wallet"><p className={styles.private}>{error}</p></ProfileCard> : null;
    }

    return (
        <div id="wallet">
            <ProfileCard
                title="Wallet"
                action={<button type="button" className={hostStyles.primaryBtn} onClick={() => setDepositing(true)}>Deposit</button>}
            >
                {wallet.frozen &&
                    <p className={styles.frozen}>
                        Your wallet is frozen because a deposit was disputed with your bank. You can't enter paid events or withdraw
                        until it's back to $0 or more. Contact uSync support if you think this is a mistake.
                    </p>}
                <div className={styles.balances}>
                    <div className={styles.balance}>
                        <span className={styles.balanceLabel}>Deposited funds</span>
                        <span className={styles.balanceValue}>{formatMoney(wallet.depositedCents)}</span>
                        <span className={styles.balanceHint}>For entry fees. Can't be withdrawn.</span>
                    </div>
                    <div className={styles.balance}>
                        <span className={styles.balanceLabel}>Earnings</span>
                        <span className={styles.balanceValue}>{formatMoney(wallet.earningsCents)}</span>
                        <span className={styles.balanceHint}>Prizes and host payouts. Withdrawable.</span>
                    </div>
                </div>
                <span className={styles.private}>Only you can see your wallet.</span>

                <div className={styles.autoPay}>
                    <span className={styles.balanceLabel}>Auto-Pay</span>
                    {wallet.autoPayUntil
                        ? <p className={styles.autoPayText}>
                            On until {new Date(wallet.autoPayUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.
                            Your team captains can pay your entry fees from this wallet when they sign you up.
                        </p>
                        : <p className={styles.autoPayText}>
                            Off. Turn it on so your team captains can pay your entry fee from this wallet when they sign the team up with "each player pays".
                        </p>}
                    <div className={styles.autoPayControls}>
                        <select className={hostStyles.select} value={autoPayDays} onChange={e => setAutoPayDays(Number(e.target.value))}
                            aria-label="How long Auto-Pay stays on" disabled={autoPayBusy}>
                            {AUTO_PAY_DAYS.map(d => <option key={d} value={d}>For {d} days</option>)}
                        </select>
                        <button type="button" className={hostStyles.ghostBtn} disabled={autoPayBusy} onClick={() => changeAutoPay(autoPayDays)}>
                            {wallet.autoPayUntil ? 'Extend' : 'Turn on'}
                        </button>
                        {wallet.autoPayUntil &&
                            <button type="button" className={hostStyles.ghostBtn} disabled={autoPayBusy} onClick={() => changeAutoPay(0)}>Turn off</button>}
                    </div>
                    {autoPayError && <p className={hostStyles.fieldError}>{autoPayError}</p>}
                </div>

                {historyError && <p className={hostStyles.fieldError}>{historyError}</p>}
                {history && history.length === 0 && <p className={styles.private} style={{ marginTop: 12 }}>No activity yet.</p>}
                {history && history.length > 0 &&
                    <ul className={styles.history} aria-label="Wallet history">
                        {history.map(item => (
                            <li key={item.id} className={styles.historyRow}>
                                <span>
                                    <span className={styles.historyWhat}>
                                        {KIND_LABELS[item.kind] ?? item.kind}
                                        {item.eventName && <> · <Link to={`/brackets/${encodeURIComponent(item.eventId)}`}>{item.eventName}</Link></>}
                                    </span>
                                    <span className={styles.historyMeta}>
                                        {when(item.createdAt)} · {item.bucket === 'earnings' ? 'Earnings' : 'Deposited funds'}{item.reason ? ` · ${item.reason}` : ''}
                                    </span>
                                </span>
                                <span className={item.amountCents > 0 ? styles.plus : styles.minus}>
                                    {item.amountCents > 0 ? '+' : ''}{formatMoney(item.amountCents)}
                                </span>
                            </li>
                        ))}
                    </ul>}
                {nextBefore &&
                    <button type="button" className={hostStyles.ghostBtn} style={{ marginTop: 10 }} onClick={() => loadHistory(nextBefore)}>Show more</button>}
            </ProfileCard>

            {depositing &&
                <DepositDialog
                    walletTotal={wallet.totalCents}
                    start={startDeposit}
                    onDeposited={() => loadHistory()}
                    onClose={() => setDepositing(false)}
                />}
        </div>
    );
};
