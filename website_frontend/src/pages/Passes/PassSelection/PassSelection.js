import React, { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { FaLock } from "react-icons/fa";
import styles from '../../Payment/GeneralPaymentForm/GeneralPaymentForm.module.css';
import formStyles from 'components/PaymentForm/PaymentForm.module.css';
import pageStyles from './PassSelection.module.css';
import { PaymentForm, DynamicFormField, PaymentCart, LoadingWheel, CheckoutSteps } from "components";
import { useEventPasses } from "hooks";
import { submitEventRegistration } from "services/event_registration";
import { getApiErrorMessage, getLoadErrorMessage } from "utils/apiError";

const STEPS = ['Registration', 'Payment', 'Confirmation'];

const NO_SOLD_OUT = new Set();
const SOLD_OUT_DETAIL = 'This pass is sold out';

// null means no limit.
function remainingOf(capacity, soldCount) {
    if (capacity == null) return null;
    return Math.max(capacity - (soldCount || 0), 0);
}

// A tier can sell up to its own capacity, but tiers that share a pool (e.g. regular + VIP team
// passes) also can't sell past the pool's shared capacity, so the real limit is the smaller one.
function getRemaining(tier) {
    const tierLeft = remainingOf(tier.capacity, tier.sold_count);
    const poolLeft = tier.pool_id ? remainingOf(tier.pool_capacity, tier.pool_sold_count) : null;

    if (tierLeft === null) return poolLeft;
    if (poolLeft === null) return tierLeft;
    return Math.min(tierLeft, poolLeft);
}

// soldOutIds: tiers the backend said were sold out after this page loaded.
function isTierPurchasable(tier, soldOutIds = NO_SOLD_OUT) {
    if (!tier || !tier.is_active || soldOutIds.has(tier.id)) return false;
    const remaining = getRemaining(tier);
    return remaining === null || remaining > 0;
}

function PassSelection() {
    const slug = useParams()['*'];
    const navigate = useNavigate();
    const { data: tiers, loading, error } = useEventPasses(slug);

    const [selectedTierId, setSelectedTierId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [expandedPlayers, setExpandedPlayers] = useState({});
    const [soldOutIds, setSoldOutIds] = useState(NO_SOLD_OUT);

    const methods = useForm({ shouldUnregister: true });

    useEffect(() => {
        setExpandedPlayers({});
    }, [selectedTierId]);

    useEffect(() => {
        if (tiers && tiers.length && !selectedTierId) {
            const firstPurchasable = tiers.find((tier) => isTierPurchasable(tier, soldOutIds)) || tiers[0];
            setSelectedTierId(firstPurchasable.id);
        }
    }, [tiers, selectedTierId, soldOutIds]);

    const selectedTier = useMemo(
        () => (tiers || []).find((tier) => tier.id === selectedTierId) || null,
        [tiers, selectedTierId]
    );

    // Work in whole cents so the fee shown is rounded to the cent, like the amount actually charged.
    const passCents = selectedTier ? selectedTier.price_cents : 0;
    const feeCents = Math.round(passCents * 0.05);
    const pass = passCents / 100;
    const fee = feeCents / 100;

    const onSubmit = async (values) => {
        if (!selectedTier) return;

        if (!isTierPurchasable(selectedTier, soldOutIds)) {
            setSubmitError('This pass is no longer available. Please choose another option.');
            return;
        }

        setSubmitError(null);
        setSubmitting(true);

        const teamSize = selectedTier.team_size || 1;
        const requiresTeam = !!selectedTier.requires_team;
        const player_info = Array.from({ length: teamSize }).map((_, i) => ({
            gamertag: values.player_info?.[i]?.gamertag || '',
            socials: values.player_info?.[i]?.socials || {}
        }));

        const payload = {
            pass_tier_id: selectedTier.id,
            team_name: requiresTeam ? (values.team_name || null) : null,
            contact_username: requiresTeam ? (values.contact_username || null) : (player_info[0]?.gamertag || null),
            contact_email: values.contact_email,
            org_twitter: values.org_twitter || null,
            player_info,
            custom_fields: values.custom_fields || {}
        };

        try {
            const result = await submitEventRegistration(payload); 
            // Remember where the passes page is, so the payment page can send the buyer back here
            // if their reservation expires. Router state survives a page refresh.
            navigate(`/passes/registration/${result.registration_id}/payment`, {
                state: { passesPath: `/passes/${slug}` }
            });
        } catch (err) {
            // The tier (or its shared pool) filled up while they were filling in the form. Mark it
            // sold out here instead of refetching, which would reset everything they typed.
            if (err?.response?.status === 409 && err?.response?.data?.detail === SOLD_OUT_DETAIL) {
                setSoldOutIds((prev) => new Set(prev).add(selectedTier.id));
            }
            setSubmitError(getApiErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="standardContainer">
            <div className={styles.checkoutHeader}>
                <p className={styles.eyebrow}>Secure Checkout</p>
                <h1 className={styles.eventTitle}>Event Pass Registration</h1>
                <CheckoutSteps active={1} steps={STEPS} />
                <p className={styles.trustNote}><FaLock /> Payments are processed securely by Stripe. uSync never stores your card details.</p>
            </div>

            {loading ? (
                <LoadingWheel />
            ) : error || !tiers || !tiers.length ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>
                    {getLoadErrorMessage(error, "Unable to load passes for this event right now.")}
                </p>
            ) : (
                <FormProvider {...methods}>
                    <div className={styles.generalFormContainer}>
                        <div className={styles.sectionOneForm}>
                            <div className={formStyles.formContainer}>
                                <h1 className={formStyles.formTitle}>Choose Your Pass</h1>

                                <div className={pageStyles.tierList}>
                                    {tiers.map((tier) => {
                                        const remaining = getRemaining(tier);
                                        const purchasable = isTierPurchasable(tier, soldOutIds);

                                        return (
                                            <label
                                                key={tier.id}
                                                className={`${pageStyles.tierCard} ${!purchasable ? pageStyles.tierDisabled : ''} ${selectedTierId === tier.id ? pageStyles.tierSelected : ''}`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="tier"
                                                    value={tier.id}
                                                    checked={selectedTierId === tier.id}
                                                    disabled={!purchasable}
                                                    onChange={() => setSelectedTierId(tier.id)}
                                                />
                                                <span className={pageStyles.tierName}>{tier.tier_name}</span>
                                                <span className={pageStyles.tierPrice}>${(tier.price_cents / 100).toFixed(2)}</span>
                                                {purchasable && remaining !== null && (
                                                    <span className={pageStyles.tierRemaining}>{remaining} passes remaining</span>
                                                )}
                                                {!purchasable && <span className={pageStyles.tierSoldOut}>Sold Out</span>}
                                            </label>
                                        );
                                    })}
                                </div>

                                {selectedTier && (
                                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                                        <div className={`${styles.formGrid} ${pageStyles.fieldsGrid}`}>
                                            <div>
                                                <PaymentForm.RequiredLabel htmlFor="contact_email">Contact Email</PaymentForm.RequiredLabel>
                                                <PaymentForm.TextInput
                                                    id="contact_email"
                                                    name="contact_email"
                                                    type="email"
                                                    required="Contact Email is required."
                                                    placeholder="contact@usync.gg"
                                                />
                                            </div>

                                            <div>
                                                <PaymentForm.RegularLabel htmlFor="org_twitter">Org Twitter (optional)</PaymentForm.RegularLabel>
                                                <PaymentForm.TextInput
                                                    id="org_twitter"
                                                    name="org_twitter"
                                                    required={false}
                                                    placeholder="@uSyncGG"
                                                />
                                            </div>

                                            {selectedTier.requires_team && (
                                                <>
                                                    <div>
                                                        <PaymentForm.RequiredLabel htmlFor="team_name">Team Name</PaymentForm.RequiredLabel>
                                                        <PaymentForm.TextInput
                                                            id="team_name"
                                                            name="team_name"
                                                            required="Team Name is required."
                                                            placeholder="uSync"
                                                        />
                                                    </div>
                                                    <div>
                                                        <PaymentForm.RequiredLabel htmlFor="contact_username">Captain</PaymentForm.RequiredLabel>
                                                        <PaymentForm.TextInput
                                                            id="contact_username"
                                                            name="contact_username"
                                                            required="Captain is required."
                                                            placeholder="uSync"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {Array.from({ length: selectedTier.team_size || 1 }).map((_, i) => {
                                            const fields = selectedTier.player_fields || [];
                                            const fieldMeta = fields.map((field, idx) => ({
                                                field,
                                                name: idx === 0 ? `player_info.${i}.gamertag` : `player_info.${i}.socials.${field.key}`
                                            }));
                                            const requiredMeta = fieldMeta.filter((m) => m.field.required);
                                            const optionalMeta = fieldMeta.filter((m) => !m.field.required);
                                            const isExpanded = !!expandedPlayers[i];

                                            return (
                                                <div key={i} className={pageStyles.playerSection}>
                                                    {selectedTier.team_size > 1 && (
                                                        <p className={pageStyles.playerHeading}>Player {i + 1}</p>
                                                    )}

                                                    {requiredMeta.length > 0 && (
                                                        <div className={`${styles.formGrid} ${pageStyles.fieldsGrid}`}>
                                                            {requiredMeta.map(({ field, name }) => (
                                                                <DynamicFormField key={name} field={field} name={name} label={field.label || field.key} />
                                                            ))}
                                                        </div>
                                                    )}

                                                    {optionalMeta.length > 0 && !isExpanded && (
                                                        <button
                                                            type="button"
                                                            className={pageStyles.expandToggle}
                                                            onClick={() => setExpandedPlayers((prev) => ({ ...prev, [i]: true }))}
                                                        >
                                                            + Click to add more information
                                                        </button>
                                                    )}

                                                    {optionalMeta.length > 0 && isExpanded && (
                                                        <div className={`${styles.formGrid} ${pageStyles.fieldsGrid} ${pageStyles.optionalFieldsGrid}`}>
                                                            {optionalMeta.map(({ field, name }) => (
                                                                <DynamicFormField key={name} field={field} name={name} label={field.label || field.key} />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        {(selectedTier.form_fields || []).length > 0 && (
                                            <div className={`${styles.formGrid} ${pageStyles.fieldsGrid} ${pageStyles.optionalFieldsGrid}`}>
                                                {selectedTier.form_fields.map((field) => (
                                                    <DynamicFormField key={field.key} field={field} name={`custom_fields.${field.key}`} />
                                                ))}
                                            </div>
                                        )}

                                        {submitError && (
                                            <div className={pageStyles.submitErrorRow}>
                                                <span className={formStyles.formError}>{submitError}</span>
                                            </div>
                                        )}

                                        <button type="submit" className={formStyles.formButton} disabled={submitting || !isTierPurchasable(selectedTier)}>
                                            {submitting
                                                ? 'Submitting...'
                                                : !isTierPurchasable(selectedTier)
                                                    ? 'Pass Unavailable'
                                                    : 'Go to Payment'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        <div className={styles.sectionTwoForm}>
                            <PaymentCart pass={pass} fee={fee} eventName={selectedTier?.tier_name} />
                        </div>
                    </div>
                </FormProvider>
            )}
        </div>
    );
}

export default PassSelection;
