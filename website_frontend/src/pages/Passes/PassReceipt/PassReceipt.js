import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import styles from '../../Payment/GeneralPaymentForm/GeneralPaymentForm.module.css';
import formStyles from 'components/PaymentForm/PaymentForm.module.css';
import receiptStyles from 'components/Receipt/Receipt.module.css';
import pageStyles from './PassReceipt.module.css';
import { CheckoutSteps, LoadingWheel } from "components";
import { getEventReceipt } from "services/event_registration";
import { getApiErrorMessage } from "utils/apiError";
import { humanizeKey } from "utils/humanize";

const STEPS = ['Registration', 'Payment', 'Confirmation'];
const TERMINAL_STATUSES = ['paid', 'succeeded', 'complete', 'completed'];
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 5;

function PassReceipt() {
    const { registrationId } = useParams();
    const [receipt, setReceipt] = useState(null);
    const [error, setError] = useState(null);
    const [gaveUp, setGaveUp] = useState(false);
    const attemptsRef = useRef(0);

    useEffect(() => {
        let cancelled = false;
        let timeoutId;
        attemptsRef.current = 0;
        setReceipt(null);
        setError(null);
        setGaveUp(false);

        const poll = () => {
            getEventReceipt({ registration_id: registrationId })
                .then((data) => {
                    if (cancelled) return;
                    setReceipt(data);

                    const isTerminal = TERMINAL_STATUSES.includes((data.payment_status || '').toLowerCase());
                    if (!isTerminal) {
                        attemptsRef.current += 1;
                        if (attemptsRef.current < MAX_POLL_ATTEMPTS) {
                            timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
                        } else {
                            setGaveUp(true);
                        }
                    }
                })
                .catch((err) => {
                    if (!cancelled) setError(getApiErrorMessage(err));
                });
        };

        poll();

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, [registrationId]);

    const isPaid = receipt && TERMINAL_STATUSES.includes((receipt.payment_status || '').toLowerCase());
    const players = receipt?.player_info || [];
    const customFieldEntries = Object.entries(receipt?.custom_fields || {});

    return (
        <div className="standardContainer">
            <div className={styles.checkoutHeader}>
                <p className={styles.eyebrow}>Secure Checkout</p>
                <h1 className={styles.eventTitle}>{isPaid ? "You're All Set" : "Finalizing Your Payment"}</h1>
                <CheckoutSteps active={3} steps={STEPS} />
            </div>

            {error && !receipt ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.25rem', padding: '2rem 0' }}>{error}</p>
            ) : !receipt ? (
                <LoadingWheel />
            ) : (
                <div className={styles.generalFormContainer}>
                    {/* Recap of what was submitted - mirrors GeneralPaymentReceipt's disabled left-column form */}
                    <div className={styles.sectionOneForm}>
                        <div className={formStyles.formContainer}>
                            <h1 className={formStyles.formTitle}>Registration Details</h1>
                            <div className={`${styles.formGrid} ${pageStyles.fieldsGrid}`}>
                                <div>
                                    <label className={formStyles.requiredLabel}>Contact Email</label>
                                    <input className={formStyles.input} value={receipt.contact_email} disabled readOnly />
                                </div>

                                {receipt.org_twitter && (
                                    <div>
                                        <label className={formStyles.requiredLabel}>Org Twitter</label>
                                        <input className={formStyles.input} value={receipt.org_twitter} disabled readOnly />
                                    </div>
                                )}

                                {receipt.team_name && (
                                    <div>
                                        <label className={formStyles.requiredLabel}>Team Name</label>
                                        <input className={formStyles.input} value={receipt.team_name} disabled readOnly />
                                    </div>
                                )}

                                {receipt.contact_username && (
                                    <div>
                                        <label className={formStyles.requiredLabel}>Captain</label>
                                        <input className={formStyles.input} value={receipt.contact_username} disabled readOnly />
                                    </div>
                                )}

                                {players.map((player, i) => {
                                    const playerPrefix = players.length > 1 ? `Player ${i + 1} ` : '';

                                    return (
                                        <React.Fragment key={i}>
                                            <div>
                                                <label className={formStyles.requiredLabel}>{playerPrefix}Gamertag</label>
                                                <input className={formStyles.input} value={player.gamertag || ''} disabled readOnly />
                                            </div>
                                            {Object.entries(player.socials || {}).map(([platform, handle]) => (
                                                <div key={platform}>
                                                    <label className={formStyles.requiredLabel}>{playerPrefix}{humanizeKey(platform)}</label>
                                                    <input className={formStyles.input} value={handle || ''} disabled readOnly />
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    );
                                })}

                                {customFieldEntries.map(([key, value]) => (
                                    <div key={key}>
                                        <label className={formStyles.requiredLabel}>{humanizeKey(key)}</label>
                                        <input className={formStyles.input} value={String(value)} disabled readOnly />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.sectionTwoForm}>
                        <div className={receiptStyles.secondContainer}>
                            <div className={receiptStyles.cartContainer}>
                                <div className={receiptStyles.successBadge}>
                                    <FaCheckCircle />
                                </div>
                                <h1 className={receiptStyles.title}>{isPaid ? "Payment Confirmed" : "Payment Processing"}</h1>
                                <p className={receiptStyles.subtitle}>
                                    {isPaid
                                        ? "A confirmation has been sent to your email."
                                        : gaveUp
                                            ? "This is taking a little longer than usual — we'll email your receipt as soon as it's confirmed."
                                            : "Hang tight while we confirm your payment..."}
                                </p>

                                <div className={receiptStyles.cartItem}>
                                    <span>Pass Price</span>
                                    <span>${(receipt.price_snapshot_cents / 100).toFixed(2)}</span>
                                </div>
                                <div className={receiptStyles.cartItem}>
                                    <span>Platform Fee</span>
                                    <span>${(receipt.fee_snapshot_cents / 100).toFixed(2)}</span>
                                </div>

                                <hr className={receiptStyles.cartDivider} />

                                <div className={receiptStyles.cartTotal}>
                                    <span>Price Total</span>
                                    <span className={receiptStyles.totalValue}>${(receipt.total_snapshot_cents / 100).toFixed(2)}</span>
                                </div>

                                {/* Event branding (logo/header) isn't modeled on the backend yet - add it here once it is. */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PassReceipt;
