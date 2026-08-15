import { useEffect, useState } from "react";
import { FaGamepad, FaBuilding, FaCheckCircle, FaCheck, FaCalendarPlus, FaStar, FaSlidersH } from "react-icons/fa";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import { SOCIAL_PLATFORMS, GAME_PLATFORMS, EVENT_PLATFORMS } from "./accountData";

const ACCOUNT_TYPES = [
    {
        value: 'player',
        icon: FaGamepad,
        title: 'Player',
        description: 'Build a profile, track stats, get discovered.',
    },
    {
        value: 'host',
        icon: FaBuilding,
        title: 'Host',
        description: 'Run recurring LANs, leagues & paid events.',
    },
];

export const AccountTypeStep = ({ value = [], onChange, onNext }) => {
    const bothSelected = value.length === 2;

    return (
        <>
            <p className={shared.eyebrow}>Step 1 · Create account</p>
            <h1 className={shared.stepTitle}>Set up your account</h1>
            <p className={shared.stepSubtitle}>Pick one or both. If you compete and run events, choose both, we'll combine it into a single account instead of making you sign up twice.</p>

            <div className={shared.radioCardRow}>
                {ACCOUNT_TYPES.map(({ value: type, icon: Icon, title, description }) => {
                    const selected = value.includes(type);
                    return (
                        <button
                            type="button"
                            key={type}
                            className={`${shared.radioCard} ${selected ? shared.radioCardSelected : ''}`}
                            onClick={() => onChange(type)}
                            aria-pressed={selected}
                        >
                            {selected && <FaCheck className={shared.radioCardCheck} />}
                            <Icon className={shared.radioCardIcon} />
                            <div>
                                <div className={shared.radioCardTitle}>{title}</div>
                                <div className={shared.radioCardDescription}>{description}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {bothSelected ? (
                <p className={shared.calloutNote}>
                    <FaCheckCircle />
                    <span>Nice — one account, one signup. Your profile will have a Player tab and a Host tab you can switch between.</span>
                </p>
            ) : (
                <p className={shared.calloutNote}>
                    <span>Not sure yet? Pick what fits today. You can add the other one anytime from <strong>Settings → Account type</strong> without making a second account.</span>
                </p>
            )}

            <button type="button" className={shared.primaryButton} disabled={value.length === 0} onClick={onNext}>Continue</button>
        </>
    );
};

const LinkAccountsGroup = ({ platforms, links, onChange }) => (
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
);

export const LinkAccountsStep = ({
    links, onChange, onFinish, onSkip, onBack,
    socialPlatforms = SOCIAL_PLATFORMS,
    gamePlatforms = GAME_PLATFORMS,
    eventPlatforms = EVENT_PLATFORMS,
}) => {
    const tabs = [
        { id: 'socials', label: 'Socials', platforms: socialPlatforms },
        { id: 'games', label: 'Game platforms', platforms: gamePlatforms },
        { id: 'events', label: 'Event platforms', platforms: eventPlatforms },
    ].filter(t => t.platforms.length > 0);

    const [activeTab, setActiveTab] = useState(tabs[0]?.id);
    const active = tabs.find(t => t.id === activeTab) || tabs[0];

    return (
        <>
            <p className={shared.eyebrow}>Almost done</p>
            <h1 className={shared.stepTitle}>Link your accounts</h1>
            <p className={shared.stepSubtitle}>Optional, connect the platforms you use so teammates and organizers can find you. You can always add these later from Settings.</p>

            {tabs.length > 1 && (
                <div className={shared.linkTabs}>
                    {tabs.map(tab => (
                        <button
                            type="button"
                            key={tab.id}
                            className={`${shared.linkTab} ${active?.id === tab.id ? shared.linkTabActive : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}

            {active && <LinkAccountsGroup platforms={active.platforms} links={links} onChange={onChange} />}

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="button" className={shared.primaryButton} onClick={onFinish}>Finish</button>
            </div>

            <button type="button" className={shared.skipButton} onClick={onSkip}>Skip for now</button>
        </>
    );
};

// Not a step — a landing. The account exists by the time this shows, so it
// says so and then gets out of the way, dropping people on their profile where
// the optional setup (links, bracket hosting) is waiting.
export const SuccessStep = ({ onDone, isPlayer, isHost, delay = 4 }) => {
    const [left, setLeft] = useState(delay);

    useEffect(() => {
        if (left <= 0) {
            onDone?.();
            return undefined;
        }
        const t = setTimeout(() => setLeft(n => n - 1), 1000);
        return () => clearTimeout(t);
    }, [left, onDone]);

    return (
        <div className={shared.successWrap}>
            <FaCheckCircle className={shared.successIcon} />
            <h1 className={shared.stepTitle} style={{ textAlign: 'center' }}>You're in!</h1>
            <p className={shared.stepSubtitle} style={{ textAlign: 'center' }}>
                {isPlayer && isHost
                    ? "Your uSync account is ready — both your Player and Host sides are set up."
                    : "Your uSync account has been created."}
            </p>

            <div className={shared.nextUpList}>
                <div className={shared.nextUpCard}>
                    <FaSlidersH className={shared.nextUpIcon} />
                    <div>
                        <div className={shared.nextUpTitle}>Finish setting up on your profile</div>
                        <div className={shared.nextUpText}>
                            Link your accounts{isPlayer && !isHost ? ', turn on bracket hosting' : ''} and pick a calling card whenever
                            you like — there's a setup card waiting at the top of your profile.
                        </div>
                    </div>
                </div>
                {isHost && (
                    <div className={shared.nextUpCard}>
                        <FaCalendarPlus className={shared.nextUpIcon} />
                        <div>
                            <div className={shared.nextUpTitle}>Post your first event</div>
                            <div className={shared.nextUpText}>Head to your profile and hit <strong>Add event</strong> to get your first listing up.</div>
                        </div>
                    </div>
                )}
                <div className={shared.nextUpCard}>
                    <FaStar className={shared.nextUpIcon} />
                    <div>
                        <div className={shared.nextUpTitle}>Get uSync Verified</div>
                        <div className={shared.nextUpText}>
                            {isHost
                                ? "Verified hosts get top placement, event analytics, and lower fees for players."
                                : "Verified players unlock LAN results and a live GameBattles rank on their profile."}
                        </div>
                    </div>
                </div>
            </div>

            <button type="button" className={shared.primaryButton} onClick={onDone}>Go to your profile</button>
            <p className={shared.redirectNote} aria-live="polite">
                Taking you there in {left}s…
            </p>
        </div>
    );
};
