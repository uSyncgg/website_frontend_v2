import { useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Modal } from "pages/Host/hostShared";
import { stripeAppearance, stripeLoader } from "utils/stripeAppearance";
import { getApiErrorMessage } from "utils/apiError";
import {
    DEPOSIT_MIN_CENTS, DEPOSIT_FEE_PERCENT, DEPOSIT_DAILY_LIMIT_CENTS, depositFee, formatMoney, parseDollars, waitForDeposit,
    newIdempotencyKey,
} from "services/wallet";
import hostStyles from "pages/Host/Host.module.css";
import styles from "./Wallet.module.css";

// Paying for a deposit with the Payment Element (the same one LAN passes use). Card and Link pay
// in place; methods that redirect (e.g. Cash App) come back to this page, and the wallet card
// picks up the result from the URL.
const PayStep = ({ deposit, walletTotal, onDone }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paying, setPaying] = useState(false);
    const [message, setMessage] = useState('');

    const pay = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setPaying(true);
        setMessage('');
        const { error } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: { return_url: `${window.location.origin}${window.location.pathname}?deposit=returned#wallet` },
        });
        if (error) {
            setMessage(error.type === 'card_error' || error.type === 'validation_error' ? error.message : 'The payment did not go through. Please try again.');
            setPaying(false);
            return;
        }
        setMessage('Payment received. Adding it to your wallet…');
        const landed = await waitForDeposit(walletTotal);
        onDone(landed);
    };

    return (
        <form onSubmit={pay}>
            <PaymentElement options={{ layout: 'accordion' }} />
            {message && <p className={hostStyles.fieldHint} role="status">{message}</p>}
            <div className={hostStyles.formActions}>
                <button type="submit" className={hostStyles.primaryBtn} disabled={paying || !stripe || !elements}>
                    {paying ? 'Processing…' : `Pay ${formatMoney(deposit.totalCents)}`}
                </button>
            </div>
        </form>
    );
};

// Deposit flow: pick an amount (at least $5), see the 5% fee on top, agree to the terms, then pay.
export const DepositDialog = ({ walletTotal, onClose, onDeposited, start }) => {
    // Inside the component, not module scope (see PassPayment: prerendering has no key).
    const [stripePromise] = useState(() => loadStripe(process.env.REACT_APP_STRIPE_PK));
    const [amountText, setAmountText] = useState('');
    const [agree, setAgree] = useState(false);
    const [deposit, setDeposit] = useState(null);
    const [error, setError] = useState('');
    const [starting, setStarting] = useState(false);
    const [done, setDone] = useState(null);
    // One key per amount in this dialog: pressing Continue again (or a retried request) returns
    // the same deposit; changing the amount starts a new one.
    const [key, setKey] = useState(newIdempotencyKey);

    const amountCents = parseDollars(amountText);
    const valid = amountCents != null && amountCents >= DEPOSIT_MIN_CENTS && amountCents <= DEPOSIT_DAILY_LIMIT_CENTS;
    const fee = valid ? depositFee(amountCents) : 0;

    const begin = async (e) => {
        e.preventDefault();
        if (!valid || !agree) return;
        setStarting(true);
        setError('');
        try {
            setDeposit(await start(amountCents, key));
        } catch (err) {
            setError(getApiErrorMessage(err));
        }
        setStarting(false);
    };

    const finished = (landed) => {
        setDone(landed);
        onDeposited?.();
    };

    return (
        <Modal title="Deposit to your wallet" onClose={onClose}>
            {done !== null ? (
                <>
                    <p className={hostStyles.blurb}>
                        {done
                            ? `${formatMoney(deposit.amountCents)} was added to your Deposited Funds.`
                            : 'Your payment went through. It can take a minute to show in your wallet - refresh shortly.'}
                    </p>
                    <div className={hostStyles.formActions}>
                        <button type="button" className={hostStyles.primaryBtn} onClick={onClose}>Done</button>
                    </div>
                </>
            ) : deposit ? (
                <>
                    <dl className={`${hostStyles.detailList} ${styles.breakdown}`}>
                        <dt>Deposit</dt><dd>{formatMoney(deposit.amountCents)}</dd>
                        <dt>uSync fee ({DEPOSIT_FEE_PERCENT}%)</dt><dd>{formatMoney(deposit.feeCents)}</dd>
                        <dt><strong>Total charged</strong></dt><dd><strong>{formatMoney(deposit.totalCents)}</strong></dd>
                    </dl>
                    <Elements stripe={stripePromise} options={{ clientSecret: deposit.clientSecret, appearance: stripeAppearance, loader: stripeLoader }}>
                        <PayStep deposit={deposit} walletTotal={walletTotal} onDone={finished} />
                    </Elements>
                </>
            ) : (
                <form onSubmit={begin} className={hostStyles.form}>
                    <div className={hostStyles.field}>
                        <label htmlFor="deposit-amount">Amount to deposit (minimum {formatMoney(DEPOSIT_MIN_CENTS)})</label>
                        <input id="deposit-amount" className={hostStyles.input} inputMode="decimal" placeholder="$25.00"
                            value={amountText} onChange={e => { setAmountText(e.target.value); setKey(newIdempotencyKey()); }} />
                        {amountText && !valid &&
                            <p className={hostStyles.fieldError}>
                                Enter an amount between {formatMoney(DEPOSIT_MIN_CENTS)} and {formatMoney(DEPOSIT_DAILY_LIMIT_CENTS)}.
                            </p>}
                    </div>
                    {valid &&
                        <dl className={`${hostStyles.detailList} ${styles.breakdown}`}>
                            <dt>Deposit</dt><dd>{formatMoney(amountCents)}</dd>
                            <dt>uSync fee ({DEPOSIT_FEE_PERCENT}%)</dt><dd>{formatMoney(fee)}</dd>
                            <dt><strong>Total charged</strong></dt><dd><strong>{formatMoney(amountCents + fee)}</strong></dd>
                        </dl>}
                    <label className={styles.consent}>
                        <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
                        <span>
                            I understand deposited funds can be used to enter events on uSync but can't be withdrawn. Only earnings
                            (prizes and host payouts) can be withdrawn. Deposits are limited to {formatMoney(DEPOSIT_DAILY_LIMIT_CENTS)} in 24 hours.
                        </span>
                    </label>
                    {error && <p className={hostStyles.fieldError}>{error}</p>}
                    <div className={hostStyles.formActions}>
                        <button type="button" className={hostStyles.ghostBtn} onClick={onClose}>Cancel</button>
                        <button type="submit" className={hostStyles.primaryBtn} disabled={!valid || !agree || starting}>
                            {starting ? 'Starting…' : 'Continue to payment'}
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};
