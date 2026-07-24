import { FaCheckCircle } from "react-icons/fa";
import { AccountField, PasswordField, TileSelect } from "components";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import { COUNTRIES, US_STATES, GAMES, HOST_EVENT_TYPES, VERIFIED_BENEFITS } from "./accountData";

export const HostDetailsStep = ({ form, setField, errors, onNext, onBack }) => {
    const toggleHidden = (field) => setField('hidden', { ...form.hidden, [field]: !form.hidden?.[field] });

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className={shared.eyebrow}>Step 2 · Host details</p>
            <h1 className={shared.stepTitle}>Tell us about your organization</h1>
            <p className={shared.stepSubtitle}>This is what players will see when they check out your events.</p>

            <div className={shared.formGrid}>
                <AccountField label="Account / organization name" name="accountName" value={form.accountName} onChange={(e) => setField('accountName', e.target.value)} required error={errors.accountName} span={2} />

                <AccountField
                    label="Email" name="email" type="email" value={form.email}
                    onChange={(e) => setField('email', e.target.value)} required error={errors.email} autoComplete="email"
                    hideable hidden={form.hidden?.email} onToggleHide={() => toggleHidden('email')}
                />
                <AccountField
                    label="Country" name="country" as="select" options={COUNTRIES.map(c => ({ value: c, label: c }))}
                    value={form.country} onChange={(e) => setField('country', e.target.value)} required error={errors.country}
                    hideable hidden={form.hidden?.country} onToggleHide={() => toggleHidden('country')}
                />

                {form.country === 'United States' ? (
                    <AccountField
                        label="State" name="state" as="select" options={US_STATES.map(s => ({ value: s, label: s }))}
                        value={form.state} onChange={(e) => setField('state', e.target.value)} required error={errors.state}
                        hideable hidden={form.hidden?.state} onToggleHide={() => toggleHidden('state')}
                    />
                ) : (
                    <AccountField
                        label="State / Province" name="state" value={form.state} onChange={(e) => setField('state', e.target.value)} required error={errors.state}
                        hideable hidden={form.hidden?.state} onToggleHide={() => toggleHidden('state')}
                    />
                )}
                <AccountField
                    label="ZIP / Postal code" name="zip" value={form.zip}
                    onChange={(e) => setField('zip', e.target.value)} required={false} error={errors.zip}
                />
            </div>
            <p className={shared.helperText} style={{ marginTop: 0 }}>ZIP/postal code is for internal use only, it's never shown publicly.</p>

            <p className={shared.label} style={{ marginBottom: '.85rem' }}>Contact person</p>
            <div className={shared.formGrid}>
                <AccountField label="Name" name="contactName" value={form.contactName} onChange={(e) => setField('contactName', e.target.value)} required error={errors.contactName} />
                <AccountField
                    label="Email" name="contactEmail" type="email" value={form.contactEmail}
                    onChange={(e) => setField('contactEmail', e.target.value)} required error={errors.contactEmail}
                    hideable hidden={form.hidden?.contactEmail} onToggleHide={() => toggleHidden('contactEmail')}
                />
                <AccountField
                    label="Discord" name="contactDiscord" value={form.contactDiscord} onChange={(e) => setField('contactDiscord', e.target.value)}
                    required={false} placeholder="Optional" span={2}
                    hideable hidden={form.hidden?.contactDiscord} onToggleHide={() => toggleHidden('contactDiscord')}
                />
            </div>

            <p className={shared.label} style={{ marginBottom: '.85rem' }}>Which games do you want to add?</p>
            <TileSelect options={GAMES} value={form.games} onChange={(v) => setField('games', v)} multi compact />

            {form.games?.includes('other') && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <AccountField
                        label="Other: Which game?"
                        name="otherGame"
                        value={form.otherGame}
                        onChange={(e) => setField('otherGame', e.target.value)}
                        placeholder="e.g. Apex Legends"
                        required={false}
                    />
                </div>
            )}

            <p className={shared.label} style={{ marginBottom: '.85rem' }}>What kind of events do you run?</p>
            <TileSelect options={HOST_EVENT_TYPES} value={form.eventTypes} onChange={(v) => setField('eventTypes', v)} multi compact />

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="submit" className={shared.primaryButton} disabled={!form.games?.length || !form.eventTypes?.length}>Continue</button>
            </div>
        </form>
    );
};

export const VerifiedInterestStep = ({ form, setField, onNext, onBack }) => (
    <>
        <p className={shared.eyebrow}>Step 3 · uSync Verified</p>
        <h1 className={shared.stepTitle}>Interested in uSync Verified?</h1>
        <p className={shared.stepSubtitle}>Verified hosts are the most trusted providers we feature. You can apply anytime, no pressure now.</p>

        <ul className={shared.benefitList}>
            {VERIFIED_BENEFITS.map(benefit => (
                <li className={shared.benefitItem} key={benefit}>
                    <FaCheckCircle className={shared.benefitCheck} />
                    {benefit}
                </li>
            ))}
        </ul>

        <div className={shared.radioCardRow}>
            <button type="button" className={`${shared.radioCard} ${form.verifiedInterest === true ? shared.radioCardSelected : ''}`} onClick={() => setField('verifiedInterest', true)}>
                <div>
                    <div className={shared.radioCardTitle}>Yes, I'm interested</div>
                    <div className={shared.radioCardDescription}>We'll follow up about verification after signup.</div>
                </div>
            </button>
            <button type="button" className={`${shared.radioCard} ${form.verifiedInterest === false ? shared.radioCardSelected : ''}`} onClick={() => setField('verifiedInterest', false)}>
                <div>
                    <div className={shared.radioCardTitle}>Not right now</div>
                    <div className={shared.radioCardDescription}>You can request this later from Settings.</div>
                </div>
            </button>
        </div>

        <div className={shared.stepFooter}>
            <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
            <button type="button" className={shared.primaryButton} disabled={form.verifiedInterest === null} onClick={onNext}>Continue</button>
        </div>
    </>
);

export const HostPasswordStep = ({ form, setField, errors, onNext, onBack }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className={shared.eyebrow}>Step 4 · Password</p>
            <h1 className={shared.stepTitle}>Secure your account</h1>
            <p className={shared.stepSubtitle}>Last step before your host account is created.</p>

            <PasswordField name="password" value={form.password} onChange={(e) => setField('password', e.target.value)} required error={errors.password} />

            <div style={{ height: '1.25rem' }} />

            <AccountField
                label="Confirm password" name="confirmPassword" type="password" value={form.confirmPassword}
                onChange={(e) => setField('confirmPassword', e.target.value)} placeholder="••••••••" required error={errors.confirmPassword} autoComplete="new-password"
            />

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="submit" className={shared.primaryButton}>Create account</button>
            </div>
        </form>
    );
};
