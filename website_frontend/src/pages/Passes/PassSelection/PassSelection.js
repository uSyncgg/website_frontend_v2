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
import { getApiErrorMessage } from "utils/apiError";

const STEPS = ['Registration', 'Payment', 'Confirmation'];

function getRemaining(tier) {
    if (tier.capacity == null) return null;
    return Math.max(tier.capacity - (tier.sold_count || 0), 0);
}

function isTierPurchasable(tier) {
    if (!tier || !tier.is_active) return false;
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

    const methods = useForm({ shouldUnregister: true });

    useEffect(() => {
        setExpandedPlayers({});
    }, [selectedTierId]);

    useEffect(() => {
        if (tiers && tiers.length && !selectedTierId) {
            const firstPurchasable = tiers.find((tier) => isTierPurchasable(tier)) || tiers[0];
            setSelectedTierId(firstPurchasable.id);
        }
    }, [tiers, selectedTierId]);

    const selectedTier = useMemo(
        () => (tiers || []).find((tier) => tier.id === selectedTierId) || null,
        [tiers, selectedTierId]
    );

    const pass = selectedTier ? selectedTier.price_cents / 100 : 0;
    const fee = pass * 0.05;

    const onSubmit = async (values) => {
        if (!selectedTier) return;

        if (!isTierPurchasable(selectedTier)) {
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
            navigate(`/passes/registration/${result.registration_id}/payment`);
        } catch (err) {
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
                    Unable to load passes for this event right now.
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
                                        const purchasable = isTierPurchasable(tier);

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
                                                {remaining !== null && (
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
