import { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import {
    SeoData, ProfileHero, StatGrid, AchievementList,
    VerifiedLock, GBRankCard, HostEventCard, PlayerCard, usePlayerCardOptions,
    MetricStrip, EarningsCard, MatchRecordCard, RankList, TeamList
} from "components";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import {
    LINK_PLATFORMS, HOST_LINK_PLATFORMS, PERSONA_OPTIONS, GAMES,
    HOST_EVENT_TYPES, VERIFIED_BENEFITS, SOCIAL_PLATFORMS, EVENT_PLATFORMS
} from "../SignUp/accountData";
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
// This is a dashboard, not a form: it takes the width of the device and splits
// into a main column and a rail on desktop, rather than sitting in the narrow
// AccountShell card the signup and auth pages use.
//
// No backend yet (repo-wide "UI-only mockup" convention), so this renders
// sample data with a preview switcher. Remove the switcher once real profile
// data exists.
const Panel = ({ title, subtitle, action, children }) => (
    <section className={shared.panel}>
        {(title || action) && (
            <div className={shared.panelHead}>
                {title && <h2 className={shared.panelTitle}>{title}</h2>}
                {action}
            </div>
        )}
        {subtitle && <p className={shared.panelSubtitle}>{subtitle}</p>}
        {children}
    </section>
);

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

    // ---- Player card ----
    // Everything printed on the card comes from data the profile already shows,
    // so the card can never claim more than the profile does. The equipped
    // calling card also skins the hero, which is why this state lives here.
    const player = SAMPLE_PLAYER_PROFILE;
    const counts = player.eventCounts || {};
    const overall = player.record?.overall || { w: 0, l: 0 };
    const totalMatches = overall.w + overall.l;
    const gbTier = getGbRankTier(player.gbRank);
    const mainGame = GAMES.find(g => g.value === player.games?.[0])?.label;
    const location = [player.state, player.country].filter(Boolean).join(", ");
    const showRank = verified && player.gbRank && player.gbRank !== "unranked";

    const cardOptions = usePlayerCardOptions({
        profile: player,
        verified,
        progress: player.unlockProgress,
        socialPlatforms: SOCIAL_PLATFORMS,
        eventPlatforms: EVENT_PLATFORMS,
    });

    const cardStats = [
        { label: "LANs", value: counts.lans ?? 0 },
        { label: "Tournaments", value: counts.tournaments ?? 0 },
        { label: "Leagues", value: counts.leagues ?? 0 },
        { label: "Earnings", value: `$${(player.earnings?.total || 0).toLocaleString()}`, tone: "money" },
        { label: "W / L", value: `${overall.w}–${overall.l}` },
        // Rank is a Verified-only unlock elsewhere on the profile, so it only
        // reaches the card when the player actually has it.
        ...(showRank ? [{ label: "GB rank", value: gbTier.label, tone: "rank" }] : []),
    ];

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

            <div className={shared.dashboard}>
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

                <ProfileHero
                    profile={profile}
                    verified={verified}
                    card={cardOptions.card}
                    bannerUrl={cardOptions.usingBanner ? cardOptions.banner.url : null}
                    platforms={platforms}
                    personaLabels={personaLabels}
                    eventTypeLabels={eventTypeLabels}
                    level={hasPlayer ? player.xp?.level : null}
                />

                {isBoth && (
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
                )}

                {showingPlayer && hasPlayer && (
                    <>
                        <MetricStrip
                            metrics={[
                                { label: "Earnings", value: `$${(player.earnings?.total || 0).toLocaleString()}`, tone: "money", sub: `Across ${player.earnings?.byGame?.length || 0} titles` },
                                { label: "Record", record: overall, sub: `${totalMatches} matches played` },
                                { label: "Events", value: counts.events ?? 0, sub: "Entered across all formats" },
                                { label: "Competitions", value: counts.competitions ?? 0, sub: "LANs, tournaments & leagues" },
                            ]}
                        />

                        <div className={shared.dashboardGrid}>
                            <div className={shared.dashboardCol}>
                                <Panel
                                    title="Player card"
                                    subtitle="Your shareable card. Equip a calling card, pick the social and event platform it shows, then download it."
                                >
                                    <PlayerCard
                                        profile={player}
                                        verified={verified}
                                        options={cardOptions}
                                        stats={cardStats}
                                        location={location}
                                        mainGame={mainGame}
                                        xp={player.xp}
                                        progress={player.unlockProgress}
                                    />
                                </Panel>

                                <Panel title="Earnings" subtitle="Verified payouts only — prize money uSync can confirm.">
                                    <EarningsCard earnings={player.earnings} />
                                </Panel>

                                <Panel title="Match record" subtitle="Every match played through uSync, split by format.">
                                    <MatchRecordCard record={player.record} />
                                </Panel>

                                <Panel title="Tournament stats">
                                    <StatGrid stats={player.stats.tournament} />
                                </Panel>

                                <Panel title="Wager stats">
                                    <StatGrid stats={player.stats.wager} />
                                </Panel>

                                <Panel title="XP stats">
                                    <StatGrid stats={player.stats.xp} />
                                </Panel>

                                <Panel title="Achievements">
                                    <AchievementList achievements={player.achievements || []} iconOptions={ACHIEVEMENT_ICON_OPTIONS} />
                                </Panel>

                                <Panel
                                    title="LAN results & GB rank"
                                    subtitle="Verified players unlock LAN placement history and their live GameBattles rank."
                                >
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
                                            <GBRankCard gbUsername={player.links?.gb} rank={gbTier} />
                                            <div className={shared.achievementList}>
                                                {(player.lanStats || []).map((lan, i) => (
                                                    <div className={shared.achievementCard} key={i}>
                                                        <div className={shared.achievementIconWrap}><FaTrophy /></div>
                                                        <div className={shared.achievementBody}>
                                                            <p className={shared.achievementTitle}>{lan.placing} — {lan.event}</p>
                                                            {lan.proof && <a className={shared.hostEventLink} href={lan.proof} target="_blank" rel="noreferrer">View proof →</a>}
                                                        </div>
                                                    </div>
                                                ))}
                                                {(player.lanStats || []).length === 0 && <p className={shared.emptyState}>No LAN results yet.</p>}
                                            </div>
                                        </div>
                                    </VerifiedLock>
                                </Panel>
                            </div>

                            <aside className={shared.dashboardRail}>
                                {gameTiles.length > 0 && (
                                    <Panel title="Games">
                                        <div className={`${shared.tileGrid} ${shared.tileGridCompact}`}>
                                            {gameTiles.map(g => (
                                                <div className={shared.tile} style={{ cursor: "default" }} key={g.value}>
                                                    {g.logo && <img src={g.logo} alt="" className={shared.tileLogo} />}
                                                    <span className={shared.tileLabel}>{g.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Panel>
                                )}

                                <Panel title="Ranked play" subtitle="In-game ranks synced from each title — separate from your uSync match record.">
                                    <RankList ranks={player.ranks} />
                                </Panel>

                                <Panel title="Teams & clans">
                                    <TeamList teams={player.teams} />
                                </Panel>
                            </aside>
                        </div>
                    </>
                )}

                {!showingPlayer && hasHost && (
                    <div className={shared.dashboardGrid}>
                        <div className={shared.dashboardCol}>
                            <Panel title="uSync Verified">
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
                            </Panel>

                            <Panel title="Events">
                                {Object.entries(eventsByType).map(([type, events]) => (
                                    <div className={shared.hostEventGroup} key={type}>
                                        <p className={shared.hostEventGroupTitle}>{HOST_EVENT_TYPE_LABELS[type]}</p>
                                        {events.map(ev => (
                                            <HostEventCard key={ev.id} event={ev} typeLabel={HOST_EVENT_TYPE_LABELS[type]} />
                                        ))}
                                    </div>
                                ))}
                                {(SAMPLE_HOST_PROFILE.events || []).length === 0 && <p className={shared.emptyState}>No events listed yet.</p>}
                            </Panel>
                        </div>

                        <aside className={shared.dashboardRail}>
                            {gameTiles.length > 0 && (
                                <Panel title="Games">
                                    <div className={`${shared.tileGrid} ${shared.tileGridCompact}`}>
                                        {gameTiles.map(g => (
                                            <div className={shared.tile} style={{ cursor: "default" }} key={g.value}>
                                                {g.logo && <img src={g.logo} alt="" className={shared.tileLogo} />}
                                                <span className={shared.tileLabel}>{g.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Panel>
                            )}
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};
