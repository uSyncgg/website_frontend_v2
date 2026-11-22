import { useState } from "react";
import { Modal } from "pages/Host/hostShared";
import { getApiErrorMessage } from "utils/apiError";
import { WITHDRAWAL_MIN_CENTS, formatMoney, parseDollars, newIdempotencyKey, requestWithdrawal } from "services/wallet";
import hostStyles from "pages/Host/Host.module.css";
import styles from "./Wallet.module.css";

const ARRIVAL = 'Your withdrawal will be processed and should arrive in 3 - 5 business days.';

// Withdrawing Earnings (never Deposited Funds): an amount from $1, or all of them. Below $1 of
// Earnings, all of them is the only option. The money shows as Pending Withdrawal on the wallet
// until uSync sends it or returns it.
export const WithdrawDialog = ({ earningsCents, onClose, onRequested }) => {
    const onlyAll = earningsCents < WITHDRAWAL_MIN_CENTS;
    const [all, setAll] = useState(onlyAll);
    const [amountText, setAmountText] = useState('');
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(null);
    // One key per choice in this dialog: pressing Withdraw again (or a retried request) asks once;
    // changing the amount makes a new one.
    const [key, setKey] = useState(newIdempotencyKey);

    const amountCents = all ? earningsCents : parseDollars(amountText);
    const valid = all ? earningsCents > 0 : amountCents != null && amountCents >= WITHDRAWAL_MIN_CENTS && amountCents <= earningsCents;

    const choose = (nextAll) => {
        setAll(nextAll);
        setKey(newIdempotencyKey());
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!valid) return;
        setSending(true);
        setError('');
        try {
            const wallet = await requestWithdrawal(all ? { all: true } : { amountCents }, key);
            setSent(wallet.pendingWithdrawalCents);
            onRequested?.();
        } catch (err) {
            setError(getApiErrorMessage(err));
        }
        setSending(false);
    };

    return (
        <Modal title="Withdraw earnings" onClose={onClose}>
            {sent !== null ? (
                <>
                    <p className={hostStyles.blurb}>{formatMoney(sent)} is now pending withdrawal. {ARRIVAL}</p>
                    <div className={hostStyles.formActions}>
                        <button type="button" className={hostStyles.primaryBtn} onClick={onClose}>Done</button>
                    </div>
                </>
            ) : (
                <form onSubmit={submit} className={hostStyles.form}>
                    <p className={hostStyles.blurb}>
                        You have {formatMoney(earningsCents)} in Earnings. Only Earnings can be withdrawn, never Deposited Funds.
                    </p>
                    {!onlyAll &&
                        <div className={hostStyles.segmented} role="radiogroup" aria-label="How much to withdraw">
                            {[[false, 'An amount'], [true, 'Withdraw all']].map(([value, label]) => (
                                <button key={label} type="button" role="radio" aria-checked={all === value}
                                    className={`${hostStyles.segment} ${all === value ? hostStyles.segmentActive : ''}`}
                                    onClick={() => choose(value)}>{label}</button>
                            ))}
                        </div>}
                    {all ? (
                        <p className={hostStyles.fieldHint}>
                            {onlyAll && `Withdrawals under ${formatMoney(WITHDRAWAL_MIN_CENTS)} must be all of your Earnings. `}
                            All of your Earnings ({formatMoney(earningsCents)}) will be withdrawn.
                        </p>
                    ) : (
                        <div className={hostStyles.field}>
                            <label htmlFor="withdraw-amount">Amount to withdraw (minimum {formatMoney(WITHDRAWAL_MIN_CENTS)})</label>
                            <input id="withdraw-amount" className={hostStyles.input} inputMode="decimal" placeholder="$25.00"
                                value={amountText} onChange={e => { setAmountText(e.target.value); setKey(newIdempotencyKey()); }} />
                            {amountText && !valid &&
                                <p className={hostStyles.fieldError}>
                                    Enter an amount between {formatMoney(WITHDRAWAL_MIN_CENTS)} and {formatMoney(earningsCents)}.
                                </p>}
                        </div>
                    )}
                    <p className={styles.private}>{ARRIVAL} You can't spend it while it's pending.</p>
                    {error && <p className={hostStyles.fieldError}>{error}</p>}
                    <div className={hostStyles.formActions}>
                        <button type="button" className={hostStyles.ghostBtn} onClick={onClose}>Cancel</button>
                        <button type="submit" className={hostStyles.primaryBtn} disabled={!valid || sending}>
                            {sending ? 'Withdrawing…' : valid ? `Withdraw ${formatMoney(amountCents)}` : 'Withdraw'}
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};
