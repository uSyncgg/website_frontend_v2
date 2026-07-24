import { FaGamepad, FaBuilding, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import { LINK_PLATFORMS } from "./accountData";

export const AccountTypeStep = ({ value, onChange, onNext }) => (
    <>
        <p className={shared.eyebrow}>Step 1 · Create account</p>
        <h1 className={shared.stepTitle}>How will you use uSync?</h1>
        <p className={shared.stepSubtitle}>You can add hosting as a Person later, it's a separate upgrade.</p>

        <div className={shared.radioCardRow}>
            <button
                type="button"
                className={`${shared.radioCard} ${value === 'person' ? shared.radioCardSelected : ''}`}
                onClick={() => onChange('person')}
            >
                <FaGamepad className={shared.radioCardIcon} />
                <div>
                    <div className={shared.radioCardTitle}>Person</div>
                    <div className={shared.radioCardDescription}>Build a profile, track stats, get discovered.</div>
                </div>
            </button>

            <button
                type="button"
                className={`${shared.radioCard} ${value === 'host' ? shared.radioCardSelected : ''}`}
                onClick={() => onChange('host')}
            >
                <FaBuilding className={shared.radioCardIcon} />
                <div>
                    <div className={shared.radioCardTitle}>Host</div>
                    <div className={shared.radioCardDescription}>Run recurring LANs, leagues & paid events.</div>
                </div>
            </button>
        </div>

        <button type="button" className={shared.primaryButton} disabled={!value} onClick={onNext}>Continue</button>
    </>
);

export const TwoFactorStep = ({ enabled, onChange, onNext, onBack }) => (
    <>
        <p className={shared.eyebrow}>Security</p>
        <h1 className={shared.stepTitle}>Add two-factor authentication</h1>
        <p className={shared.stepSubtitle}>Protect your account with a code sent to your email each time you log in from a new device.</p>

        <div className={shared.radioCardRow}>
            <button
                type="button"
                className={`${shared.radioCard} ${enabled ? shared.radioCardSelected : ''}`}
                onClick={() => onChange(true)}
            >
                <FaShieldAlt className={shared.radioCardIcon} />
                <div>
                    <div className={shared.radioCardTitle}>Yes, enable it</div>
                    <div className={shared.radioCardDescription}>Recommended, adds a quick verification step at login.</div>
                </div>
            </button>

            <button
                type="button"
                className={`${shared.radioCard} ${!enabled ? shared.radioCardSelected : ''}`}
                onClick={() => onChange(false)}
            >
                <div>
                    <div className={shared.radioCardTitle}>Not right now</div>
                    <div className={shared.radioCardDescription}>You can turn this on anytime in Settings → Security.</div>
                </div>
            </button>
        </div>

        <div className={shared.stepFooter}>
            <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
            <button type="button" className={shared.primaryButton} onClick={onNext}>Continue</button>
        </div>
    </>
);

export const LinkAccountsStep = ({ links, onChange, onFinish, onSkip, onBack }) => (
    <>
        <p className={shared.eyebrow}>Almost done</p>
        <h1 className={shared.stepTitle}>Link your accounts</h1>
        <p className={shared.stepSubtitle}>Optional, connect the platforms you use so teammates and organizers can find you. You can always add these later from Settings.</p>

        <div className={shared.linkAccountsGrid}>
            {LINK_PLATFORMS.map(({ value, label, icon: Icon }) => (
                <div className={shared.linkAccountRow} key={value}>
                    <Icon className={shared.linkAccountIcon} />
                    <span className={shared.linkAccountLabel}>{label}</span>
                    <input
                        className={shared.linkAccountInput}
                        placeholder="Username"
                        value={links[value] || ''}
                        onChange={(e) => onChange(value, e.target.value)}
                    />
                </div>
            ))}
        </div>

        <div className={shared.stepFooter}>
            <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
            <button type="button" className={shared.primaryButton} onClick={onFinish}>Finish</button>
        </div>

        <button type="button" className={shared.skipButton} onClick={onSkip}>Skip for now</button>
    </>
);

export const SuccessStep = ({ onDone }) => (
    <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
        <FaCheckCircle style={{ fontSize: '3rem', color: '#b18af0', marginBottom: '1rem' }} />
        <h1 className={shared.stepTitle} style={{ textAlign: 'center' }}>You're in!</h1>
        <p className={shared.stepSubtitle} style={{ textAlign: 'center' }}>Your uSync account has been created. Head to your profile to finish setting things up.</p>
        <button type="button" className={shared.primaryButton} onClick={onDone}>Go to your profile</button>
    </div>
);
