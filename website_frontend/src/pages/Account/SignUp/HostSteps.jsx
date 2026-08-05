import { AccountField, TileSelect } from "components";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import { COUNTRIES, US_STATES, HOST_EVENT_TYPES } from "./accountData";

// Host details got split across two steps rather than one long form, and lost
// a lot of fields along the way:
//   - password → Supabase owns it
//   - the whole "contact person" block (name / phone / email / Discord) → the
//     org name and the account email already identify who to reach; asking for
//     a separate contact person was duplicate data entry
//   - "Are you also a player?" → the first screen answers this now
export const HostDetailsStep = ({ form, setField, errors, onNext, onBack }) => {
    const toggleHidden = (field) => setField('hidden', { ...form.hidden, [field]: !form.hidden?.[field] });
    const countryChosen = !!form.hostCountry;
    const isUS = form.hostCountry === 'United States';

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className={shared.eyebrow}>Host details</p>
            <h1 className={shared.stepTitle}>Tell us about your organization</h1>
            <p className={shared.stepSubtitle}>This is what players see when they check out your events.</p>

            <AccountField
                label="Organization name"
                name="accountName"
                value={form.accountName}
                onChange={(e) => setField('accountName', e.target.value)}
                placeholder="Apex Circuit Events"
                required
                error={errors.accountName}
            />

            <p className={shared.helperText} style={{ marginTop: '.5rem' }}>
                Players and uSync will reach you at <strong>{form.email || 'your account email'}</strong>. You can change that under Settings → Account.
            </p>

            <p className={shared.label} style={{ marginBottom: '.35rem' }}>Where are you based?</p>
            <p className={shared.helperText} style={{ marginTop: 0 }}>Optional — only useful if you run in-person events like LANs, or want players nearby to find you. Online-only? Skip it.</p>
            <div className={shared.formGrid}>
                <AccountField
                    label="Country" name="hostCountry" as="select" options={COUNTRIES.map(c => ({ value: c, label: c }))}
                    value={form.hostCountry} onChange={(e) => setField('hostCountry', e.target.value)} required={false}
                    placeholder="Optional"
                    hideable hidden={form.hidden?.hostCountry} onToggleHide={() => toggleHidden('hostCountry')}
                />

                {countryChosen && (isUS ? (
                    <AccountField
                        label="State" name="hostState" as="select" options={US_STATES.map(s => ({ value: s, label: s }))}
                        value={form.hostState} onChange={(e) => setField('hostState', e.target.value)} required={false}
                        hideable hidden={form.hidden?.hostState} onToggleHide={() => toggleHidden('hostState')}
                    />
                ) : (
                    <AccountField
                        label="State / Province / Region" name="hostState" value={form.hostState}
                        onChange={(e) => setField('hostState', e.target.value)} required={false}
                        hideable hidden={form.hidden?.hostState} onToggleHide={() => toggleHidden('hostState')}
                    />
                ))}
                {countryChosen && (
                    <AccountField
                        label={isUS ? "ZIP code" : "Postal code"} name="hostZip" value={form.hostZip}
                        onChange={(e) => setField('hostZip', e.target.value)} required={false}
                    />
                )}
            </div>

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="submit" className={shared.primaryButton}>Continue</button>
            </div>
        </form>
    );
};

export const HostEventsStep = ({ form, setField, onNext, onBack }) => (
    <>
        <p className={shared.eyebrow}>Your events</p>
        <h1 className={shared.stepTitle}>Add the events you run</h1>
        <p className={shared.stepSubtitle}>Pick every format you host. This decides where your listings show up on uSync — you can add more later.</p>

        <TileSelect options={HOST_EVENT_TYPES} value={form.eventTypes} onChange={(v) => setField('eventTypes', v)} multi compact />

        <p className={shared.helperText}>You'll post your actual events from your profile once you're set up — no need to fill anything in here.</p>

        <div className={shared.stepFooter}>
            <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
            <button type="button" className={shared.primaryButton} disabled={!form.eventTypes?.length} onClick={onNext}>Continue</button>
        </div>
    </>
);
