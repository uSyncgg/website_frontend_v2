import { useState } from "react";
import { Link } from "react-router";
import { FaTrophy } from "react-icons/fa";
import {
    SeoData, AccountShell, ProfileHeader, StatGrid, AchievementList,
    VerifiedLock, GBRankCard, HostEventCard
} from "components";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import { LINK_PLATFORMS, HOST_LINK_PLATFORMS, PERSONA_OPTIONS, GAMES, HOST_EVENT_TYPES, VERIFIED_BENEFITS } from "../SignUp/accountData";
import {
    SAMPLE_PLAYER_PROFILE, SAMPLE_HOST_PROFILE, ACHIEVEMENT_ICON_OPTIONS,
    getGbRankTier, HOST_EVENT_TYPE_LABELS
} from "./profileData";

// Signup lets an account be Player, Host, or both, so the profile has to
// represent all three. A combined account keeps ONE identity header (avatar,
// name, bio, roles, links) and puts the two sides behind a tab — that's the
// payoff for merging the signup flows instead of making people hold two
// accounts.
//
// No backend yet (repo-wide "UI-only mockup" convention), so this renders
// sample data with a preview switcher. Remove the switcher once real profile
// data exists.
export const Profile = () => {
    const [preview, setPreview] = useState("player"); // player | host | both
    const [verified, setVerified] = useState(true);
    const [activeSide, setActiveSide] = useState("player");

    const isBoth = preview === "both";
    const hasPlayer = preview === "player" || isBoth;
    const hasHost = preview === "host" || isBoth;

    // Which side's content is on screen. Single-type accounts have no tab.
    const side = isBoth ? activeSide : preview;
    const showingPlayer = side === "player";

    const profile = {
        ...(hasPlayer ? SAMPLE_PLAYER_PROFILE : {}),
        ...(hasHost ? SAMPLE_HOST_PROFILE : {}),
        // A combined account is still a person, so the personal identity wins
        // for the header while the org name shows on the Host tab.
        accountType: hasPlayer ? "player" : "host",
        username: hasPlayer ? SAMPLE_PLAYER_PROFILE.username : SAMPLE_HOST_PROFILE.username,
        bio: hasPlayer ? SAMPLE_PLAYER_PROFILE.bio : SAMPLE_HOST_PROFILE.bio,
        // The header is the person's, so their location wins over the org's
        // when an account is both — the org's location belongs to its events.
        state: hasPlayer ? SAMPLE_PLAYER_PROFILE.state : SAMPLE_HOST_PROFILE.state,
        country: hasPlayer ? SAMPLE_PLAYER_PROFILE.country : SAMPLE_HOST_PROFILE.country,
        hidden: hasPlayer ? SAMPLE_PLAYER_PROFILE.hidden : SAMPLE_HOST_PROFILE.hidden,
        links: { ...(hasHost ? SAMPLE_HOST_PROFILE.links : {}), ...(hasPlayer ? SAMPLE_PLAYER_PROFILE.links : {}) },
    };

    const platforms = hasPlayer ? LINK_PLATFORMS : HOST_LINK_PLATFORMS;
    const personaLabels = (profile.personas || []).map(p => PERSONA_OPTIONS.find(x => x.value === p)?.label || p);
    const eventTypeLabels = hasHost ? (SAMPLE_HOST_PROFILE.eventTypes || []).map(t => HOST_EVENT_TYPES.find(x => x.value === t)?.label || t) : [];
    const gameTiles = (profile.games || []).filter(g => g !== "other").map(g => GAMES.find(x => x.value === g)).filter(Boolean);

    const eventsByType = (SAMPLE_HOST_PROFILE.events || []).reduce((acc, ev) => {
        (acc[ev.type] = acc[ev.type] || []).push(ev);
        return acc;
    }, {});

    return (
        <div className="standardContainer">
            <SeoData
                title={"Profile"}
                description="View your uSync profile: stats, achievements, and everything you've linked to your account."
                canonicalPath={"/account/profile"}
            />

            <AccountShell>
                <div className={shared.previewSwitcher}>
                    <span className={shared.previewSwitcherLabel}>Preview as</span>
                    <div className={shared.previewToggleGroup}>
                        <button type="button" className={`${shared.previewToggleBtn} ${preview === "player" ? shared.previewToggleBtnActive : ""}`} onClick={() => setPreview("player")}>Player</button>
                        <button type="button" className={`${shared.previewToggleBtn} ${preview === "host" ? shared.previewToggleBtnActive : ""}`} onClick={() => setPreview("host")}>Host</button>
                        <button type="button" className={`${shared.previewToggleBtn} ${isBoth ? shared.previewToggleBtnActive : ""}`} onClick={() => setPreview("both")}>Both</button>
                    </div>
                    <div className={shared.previewToggleGroup}>
                        <button type="button" className={`${shared.previewToggleBtn} ${!verified ? shared.previewToggleBtnActive : ""}`} onClick={() => setVerified(false)}>Free</button>
                        <button type="button" className={`${shared.previewToggleBtn} ${verified ? shared.previewToggleBtnActive : ""}`} onClick={() => setVerified(true)}>Verified</button>
                    </div>
                </div>

                <div className={shared.profileSection}>
                    <ProfileHeader
                        profile={profile}
                        verified={verified}
                        platforms={platforms}
                        personaLabels={personaLabels}
                        eventTypeLabels={eventTypeLabels}
                    />
                    <div className={shared.profileActions} style={{ marginTop: "1.25rem" }}>
                        <Link to="/account/profile/edit" className={shared.secondaryButton} style={{ textDecoration: "none", display: "inline-block" }}>Edit profile</Link>
                    </div>
                </div>

                {isBoth && (
                    <div className={shared.profileSection}>
                        <div className={shared.linkTabs}>
                            <button
                                type="button"
                                className={`${shared.linkTab} ${showingPlayer ? shared.linkTabActive : ""}`}
                                onClick={() => setActiveSide("player")}
                            >
                                Player
                            </button>
                            <button
                                type="button"
                                className={`${shared.linkTab} ${!showingPlayer ? shared.linkTabActive : ""}`}
                                onClick={() => setActiveSide("host")}
                            >
                                Host
                            </button>
                        </div>
                        <p className={shared.profileSectionSubtitle} style={{ margin: 0 }}>
                            {showingPlayer
                                ? "Your competitive side — what you play, how you've placed, what you've earned."
                                : `Everything you run as ${SAMPLE_HOST_PROFILE.accountName}.`}
                        </p>
                    </div>
                )}

                {showingPlayer && hasPlayer && (
                    <>
                        {gameTiles.length > 0 && (
                            <div className={shared.profileSection}>
                                <h2 className={shared.profileSectionTitle}>Games</h2>
                                <div className={`${shared.tileGrid} ${shared.tileGridCompact}`}>
                                    {gameTiles.map(g => (
                                        <div className={shared.tile} style={{ cursor: "default" }} key={g.value}>
                                            {g.logo && <img src={g.logo} alt="" className={shared.tileLogo} />}
                                            <span className={shared.tileLabel}>{g.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={shared.profileSection}>
                            <h2 className={shared.profileSectionTitle}>Tournament stats</h2>
                            <StatGrid stats={SAMPLE_PLAYER_PROFILE.stats.tournament} />
                        </div>
                        <div className={shared.profileSection}>
                            <h2 className={shared.profileSectionTitle}>Wager stats</h2>
                            <StatGrid stats={SAMPLE_PLAYER_PROFILE.stats.wager} />
                        </div>
                        <div className={shared.profileSection}>
                            <h2 className={shared.profileSectionTitle}>XP stats</h2>
                            <StatGrid stats={SAMPLE_PLAYER_PROFILE.stats.xp} />
                        </div>

                        <div className={shared.profileSection}>
                            <h2 className={shared.profileSectionTitle}>Achievements</h2>
                            <AchievementList achievements={SAMPLE_PLAYER_PROFILE.achievements || []} iconOptions={ACHIEVEMENT_ICON_OPTIONS} />
                        </div>

                        <div className={shared.profileSection}>
                            <h2 className={shared.profileSectionTitle}>LAN results &amp; GB rank</h2>
                            <p className={shared.profileSectionSubtitle}>Verified players unlock LAN placement history and their live GameBattles rank.</p>
                            <VerifiedLock
                                verified={verified}
                                title="Verified players only"
                                description="Subscribe to uSync Verified to show your LAN placements and GameBattles rank on your public profile."
                                ctaLabel="Get Verified"
                                benefits={[
                                    "LAN placement history with proof links",
                                    "Live GameBattles rank badge",
                                    "Email alerts for the games you play",
                                    "Customizable profile — hide or show any section",
                                ]}
                            >
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                    <GBRankCard gbUsername={SAMPLE_PLAYER_PROFILE.links?.gb} rank={getGbRankTier(SAMPLE_PLAYER_PROFILE.gbRank)} />
                                    <div className={shared.achievementList}>
                                        {(SAMPLE_PLAYER_PROFILE.lanStats || []).map((lan, i) => (
                                            <div className={shared.achievementCard} key={i}>
                                                <div className={shared.achievementIconWrap}><FaTrophy /></div>
                                                <div className={shared.achievementBody}>
                                                    <p className={shared.achievementTitle}>{lan.placing} — {lan.event}</p>
                                                    {lan.proof && <a className={shared.hostEventLink} href={lan.proof} target="_blank" rel="noreferrer">View proof →</a>}
                                                </div>
                                            </div>
                                        ))}
                                        {(SAMPLE_PLAYER_PROFILE.lanStats || []).length === 0 && <p className={shared.emptyState}>No LAN results yet.</p>}
                                    </div>
                                </div>
                            </VerifiedLock>
                        </div>
                    </>
                )}

                {!showingPlayer && hasHost && (
                    <>
                        <div className={shared.profileSection}>
                            <h2 className={shared.profileSectionTitle}>uSync Verified</h2>
                            <VerifiedLock
                                verified={verified}
                                title="Verified hosts only"
                                description="Verified hosts get top placement, event analytics, and lower fees for their players."
                                ctaLabel="Apply for Verified"
                                benefits={VERIFIED_BENEFITS}
                            >
                                <div className={shared.achievementCard}>
                                    <img src="https://i.imgur.com/PCHIHQB.png" alt="uSync Verified" style={{ width: "2.5rem", height: "2.5rem", flexShrink: 0 }} />
                                    <div className={shared.achievementBody}>
                                        <p className={shared.achievementTitle}>You're a uSync Verified host</p>
                                        <p className={shared.achievementDesc}>Your events get top placement, analytics, and custom branding on your social images.</p>
                                    </div>
                                </div>
                            </VerifiedLock>
                        </div>

                        <div className={shared.profileSection}>
                            <h2 className={shared.profileSectionTitle}>Events</h2>
                            {Object.entries(eventsByType).map(([type, events]) => (
                                <div className={shared.hostEventGroup} key={type}>
                                    <p className={shared.hostEventGroupTitle}>{HOST_EVENT_TYPE_LABELS[type]}</p>
                                    {events.map(ev => (
                                        <HostEventCard key={ev.id} event={ev} typeLabel={HOST_EVENT_TYPE_LABELS[type]} />
                                    ))}
                                </div>
                            ))}
                            {(SAMPLE_HOST_PROFILE.events || []).length === 0 && <p className={shared.emptyState}>No events listed yet.</p>}
                        </div>
                    </>
                )}
            </AccountShell>
        </div>
    );
};
