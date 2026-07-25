import { FaGamepad, FaBuilding, FaCheckCircle } from "react-icons/fa";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import { LINK_PLATFORMS } from "./accountData";

export const AccountTypeStep = ({ value, onChange, onNext }) => (
    <>
        <p className={shared.eyebrow}>Step 1 · Create account</p>
        <h1 className={shared.stepTitle}>How will you use uSync?</h1>
        <p className={shared.stepSubtitle}>You can add hosting as a Member later, it's a separate upgrade.</p>

        <div className={shared.radioCardRow}>
            <div
                role="button"
                tabIndex={0}
                className={`${shared.radioCard} ${value === 'member' ? shared.radioCardSelected : ''}`}
                onClick={() => onChange('member')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange('member'); } }}
            >
                <FaGamepad className={shared.radioCardIcon} />
                <div>
                    <div className={shared.radioCardTitle}>Member</div>
                    <div className={shared.radioCardDescription}>Build a profile, track stats, get discovered.</div>
                    <div className={shared.hostHint}>
                        You can still host events as a Non-host.{' '}
                        <span className={shared.hintTrigger} tabIndex={0} onClick={(e) => e.stopPropagation()}>
                            See here
                            <span className={shared.hintTooltip}>
                                Players/Non-hosts can turn on hosting in your settings. Go to Settings → Hosting → Turn on hosting as a Member account.
                            </span>
                        </span>
                    </div>
                </div>
            </div>

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

export const LinkAccountsStep = ({ links, onChange, onFinish, onSkip, onBack, platforms = LINK_PLATFORMS }) => (
    <>
        <p className={shared.eyebrow}>Almost done</p>
        <h1 className={shared.stepTitle}>Link your accounts</h1>
        <p className={shared.stepSubtitle}>Optional, connect the platforms you use so teammates and organizers can find you. You can always add these later from Settings.</p>

        <div className={shared.linkAccountsGrid}>
            {platforms.map(({ value, label, icon: Icon }) => (
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
