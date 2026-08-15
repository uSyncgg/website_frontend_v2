import { useMemo, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import {
    SeoData, ProfileHero, StatGrid, AchievementList,
    VerifiedLock, GBRankCard, HostEventCard, PlayerCard, usePlayerCardOptions,
    MetricStrip, EarningsCard, MatchRecordCard, RankList, TeamList, GameFilter, BreakdownList,
    ProfileSetup
} from "components";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import {
    LINK_PLATFORMS, HOST_LINK_PLATFORMS, PERSONA_OPTIONS, GAMES,
    HOST_EVENT_TYPES, VERIFIED_BENEFITS, SOCIAL_PLATFORMS, EVENT_PLATFORMS, GAME_PLATFORMS
} from "../SignUp/accountData";
import {
    SAMPLE_PLAYER_PROFILE, SAMPLE_HOST_PROFILE, ACHIEVEMENT_ICON_OPTIONS,
    getGbRankTier, HOST_EVENT_TYPE_LABELS, getPlayerView, gameLabel, HOST_STATS
} from "./profileData";

// Signup lets an account be Player, Host, or both, so the profile has to
// represent all three. A combined account keeps ONE identity header (avatar,
// name, bio, roles, links) and puts the two sides behind a tab.
//
// This is a dashboard, not a form: it takes the width of the device and splits
// into a main column and a rail on desktop.
//
// Two things drive what's on screen:
//   · the game filter — a career only means something per title, so every
//     number below is scoped to the selected game (or summed across all)
//   · who's looking — the owner gets the customization controls, a visitor
//     gets a read-only profile with the card behind a button
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
    const [viewer, setViewer] = useState("owner");    // owner | visitor
    const [activeSide, setActiveSide] = useState("player");
    const [game, setGame] = useState("all");
    const [cardOpen, setCardOpen] = useState(false);

    // Setup the signup flow no longer asks for. Local state stands in for what
    // the account record would hold once there's a backend.
    const [links, setLinks] = useState(SAMPLE_PLAYER_PROFILE.links);
    const [hosting, setHosting] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(SAMPLE_PLAYER_PROFILE.avatar || "");
    const [bio, setBio] = useState(SAMPLE_PLAYER_PROFILE.bio || "");
    const [setupDismissed, setSetupDismissed] = useState(false);

    const isBoth = preview === "both";
    const hasPlayer = preview === "player" || isBoth;
    const hasHost = preview === "host" || isBoth;
    const isOwner = viewer === "owner";

    const side = isBoth ? activeSide : preview;
    const showingPlayer = side === "player";

    const profile = {
        ...(hasPlayer ? SAMPLE_PLAYER_PROFILE : {}),
        ...(hasHost ? SAMPLE_HOST_PROFILE : {}),
        accountType: hasPlayer ? "player" : "host",
        username: hasPlayer ? SAMPLE_PLAYER_PROFILE.username : SAMPLE_HOST_PROFILE.username,
        bio: hasPlayer ? SAMPLE_PLAYER_PROFILE.bio : SAMPLE_HOST_PROFILE.bio,
        state: hasPlayer ? SAMPLE_PLAYER_PROFILE.state : SAMPLE_HOST_PROFILE.state,
        country: hasPlayer ? SAMPLE_PLAYER_PROFILE.country : SAMPLE_HOST_PROFILE.country,
        hidden: hasPlayer ? SAMPLE_PLAYER_PROFILE.hidden : SAMPLE_HOST_PROFILE.hidden,
        links: { ...(hasHost ? SAMPLE_HOST_PROFILE.links : {}), ...(hasPlayer ? SAMPLE_PLAYER_PROFILE.links : {}) },
    };

    const platforms = hasPlayer ? LINK_PLATFORMS : HOST_LINK_PLATFORMS;
    const personaLabels = (profile.personas || []).map(p => PERSONA_OPTIONS.find(x => x.value === p)?.label || p);
    const eventTypeLabels = hasHost ? (SAMPLE_HOST_PROFILE.eventTypes || []).map(t => HOST_EVENT_TYPES.find(x => x.value === t)?.label || t) : [];
    const gameTiles = (profile.games || []).filter(g => g !== "other").map(g => GAMES.find(x => x.value === g)).filter(Boolean);

    // ---- Player, scoped to the selected game ----
    const player = SAMPLE_PLAYER_PROFILE;
    const view = useMemo(() => getPlayerView(player, game), [player, game]);
    const overall = view.record.overall;
    const totalMatches = overall.w + overall.l;
    const gbTier = getGbRankTier(player.gbRank);
    const location = [player.state, player.country].filter(Boolean).join(", ");
    const showRank = verified && player.gbRank && player.gbRank !== "unranked";
    const scopeLabel = view.isAll ? "All games" : gameLabel(game);

    const cardOptions = usePlayerCardOptions({
        profile: player,
        verified,
        progress: player.unlockProgress,
        socialPlatforms: SOCIAL_PLATFORMS,
        eventPlatforms: EVENT_PLATFORMS,
    });

    // The card carries the same scope as the dashboard, so a player ends up
    // with one card per game plus an overall — which is the point.
    const cardStats = [
        { label: "LANs", value: view.counts.lans },
        { label: "Tournaments", value: view.counts.tournaments },
        { label: "Leagues", value: view.counts.leagues },
        { label: "Earnings", value: `$${view.earnings.total.toLocaleString()}`, tone: "money" },
        { label: "W / L", value: `${overall.w}–${overall.l}` },
        ...(showRank ? [{ label: "GB rank", value: gbTier.label, tone: "rank" }] : []),
    ];

    // What "finished" means for a profile. Bracket hosting counts as done once
    // it's been answered either way — declining is a decision, not a gap.
    const linkedCount = Object.keys(links).filter(k => links[k]).length;
    const setupTasks = [
        { id: "links", title: "Link your accounts", note: linkedCount ? `${linkedCount} linked` : "Socials, game and event platforms", done: linkedCount > 0 },
        { id: "hosting", title: "Bracket hosting", note: hosting === null ? "Run your own matches — on or off" : (hosting ? "On" : "Off — you can turn it on later"), done: hosting !== null },
        { id: "avatar", title: "Add a profile photo", note: avatarUrl ? "Added" : "Shows on your profile and your card", done: !!avatarUrl },
        { id: "bio", title: "Write a short bio", note: bio ? "Written" : "A line about how you play", done: !!bio },
        { id: "games", title: "Add your games", note: `${(player.games || []).length} added`, done: (player.games || []).length > 0, href: "/account/profile/edit" },
    ];

    const linkGroups = [
        { id: "socials", label: "Socials", platforms: SOCIAL_PLATFORMS },
        { id: "games", label: "Game platforms", platforms: GAME_PLATFORMS },
        { id: "events", label: "Event platforms", platforms: EVENT_PLATFORMS },
    ];

    const hostEventsByType = (SAMPLE_HOST_PROFILE.events || []).reduce((acc, ev) => {
        (acc[ev.type] = acc[ev.type] || []).push(ev);
        return acc;
    }, {});

    const playerCard = (
        <PlayerCard
            profile={player}
            verified={verified}
            options={cardOptions}
            stats={cardStats}
            location={location}
            mainGame={view.isAll ? null : gameLabel(game)}
            scopeLabel={scopeLabel}
            xp={player.xp}
            progress={player.unlockProgress}
            editable={isOwner}
        />
    );

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
                    <div className={shared.previewToggleGroup}>
                        <button type="button" className={`${shared.previewToggleBtn} ${isOwner ? shared.previewToggleBtnActive : ""}`} onClick={() => setViewer("owner")}>My view</button>
                        <button type="button" className={`${shared.previewToggleBtn} ${!isOwner ? shared.previewToggleBtnActive : ""}`} onClick={() => { setViewer("visitor"); setCardOpen(false); }}>Visitor's view</button>
                    </div>
                </div>

                <ProfileHero
                    profile={{ ...profile, avatar: avatarUrl || profile.avatar, bio: bio || profile.bio }}
                    verified={verified}
                    card={cardOptions.card}
                    bannerUrl={cardOptions.usingBanner ? cardOptions.banner.url : null}
                    platforms={platforms}
                    personaLabels={personaLabels}
                    eventTypeLabels={eventTypeLabels}
                    level={hasPlayer ? player.xp?.level : null}
                    editable={isOwner}
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
                        {isOwner && !setupDismissed && (
                            <ProfileSetup
                                tasks={setupTasks}
                                hosting={hosting}
                                onHostingChange={setHosting}
                                links={links}
                                onLinkChange={(platform, value) => setLinks(prev => ({ ...prev, [platform]: value }))}
                                linkGroups={linkGroups}
                                avatarUrl={avatarUrl}
                                onAvatarChange={setAvatarUrl}
                                bio={bio}
                                onBioChange={setBio}
                                onDismiss={() => setSetupDismissed(true)}
                            />
                        )}

                        <GameFilter
                            games={player.games}
                            value={game}
                            onChange={setGame}
                            label="Showing stats for"
                        />

                        <MetricStrip
                            metrics={[
                                { label: "Earnings", value: `$${view.earnings.total.toLocaleString()}`, tone: "money", sub: view.isAll ? `Across ${view.games.length} titles` : scopeLabel },
                                { label: "Record", record: overall, sub: `${totalMatches} matches played` },
                                { label: "Events", value: view.counts.events, sub: "Entered across all formats" },
                                { label: "Competitions", value: view.counts.competitions, sub: "LANs, tournaments & leagues" },
                            ]}
                        />

                        <div className={shared.dashboardGrid}>
                            <div className={shared.dashboardCol}>
                                {isOwner ? (
                                    <Panel
                                        title={view.isAll ? "Player card — all games" : `Player card — ${scopeLabel}`}
                                        subtitle="Your shareable card, built from whichever game you're viewing. Equip a calling card, pick what it shows, then download it."
                                    >
                                        {playerCard}
                                    </Panel>
                                ) : (
                                    <Panel title="Player card">
                                        <p className={shared.panelSubtitle} style={{ marginTop: 0 }}>
                                            {profile.username}'s card for {scopeLabel.toLowerCase()}.
                                        </p>
                                        {cardOpen ? (
                                            <>
                                                {playerCard}
                                                <button type="button" className={shared.secondaryButton} style={{ marginTop: "1rem" }} onClick={() => setCardOpen(false)}>
                                                    Hide card
                                                </button>
                                            </>
                                        ) : (
                                            <button type="button" className={shared.viewCardButton} onClick={() => setCardOpen(true)}>
                                                <span className={shared.viewCardArt} aria-hidden="true" />
                                                <span>
                                                    <strong>View player card</strong>
                                                    <span>{scopeLabel} · {cardOptions.card.name}</span>
                                                </span>
                                            </button>
                                        )}
                                    </Panel>
                                )}

                                <Panel
                                    title="Earnings"
                                    subtitle={view.isAll
                                        ? "Verified payouts only — prize money uSync can confirm."
                                        : `Verified ${scopeLabel} payouts only — prize money uSync can confirm.`}
                                >
                                    <EarningsCard earnings={view.earnings} allowByGame={view.isAll} />
                                </Panel>

                                <Panel title="Match record" subtitle={`Every ${view.isAll ? "" : scopeLabel + " "}match played through uSync, split by format.`}>
                                    <MatchRecordCard record={view.record} />
                                </Panel>

                                <Panel title="Placements" subtitle="Podium finishes across every bracket entered.">
                                    <StatGrid stats={view.placements} />
                                </Panel>

                                <Panel title="Achievements">
                                    <AchievementList achievements={view.achievements} iconOptions={ACHIEVEMENT_ICON_OPTIONS} />
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
                                                {view.lanStats.map((lan, i) => (
                                                    <div className={shared.achievementCard} key={i}>
                                                        <div className={shared.achievementIconWrap}><FaTrophy /></div>
                                                        <div className={shared.achievementBody}>
                                                            <p className={shared.achievementTitle}>{lan.placing} — {lan.event}</p>
                                                            {lan.proof && <a className={shared.hostEventLink} href={lan.proof} target="_blank" rel="noreferrer">View proof →</a>}
                                                        </div>
                                                    </div>
                                                ))}
                                                {view.lanStats.length === 0 && <p className={shared.emptyState}>No LAN results for {scopeLabel.toLowerCase()} yet.</p>}
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
                                                <button
                                                    type="button"
                                                    key={g.value}
                                                    className={`${shared.tile} ${game === g.value ? shared.tileSelected : ""}`}
                                                    onClick={() => setGame(game === g.value ? "all" : g.value)}
                                                >
                                                    {g.logo && <img src={g.logo} alt="" className={shared.tileLogo} />}
                                                    <span className={shared.tileLabel}>{g.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </Panel>
                                )}

                                <Panel title="Ranked play" subtitle="In-game ranks synced from each title — separate from your uSync match record.">
                                    <RankList ranks={view.ranks} />
                                </Panel>

                                <Panel title="Teams & clans">
                                    <TeamList teams={view.teams} />
                                </Panel>
                            </aside>
                        </div>
                    </>
                )}

                {!showingPlayer && hasHost && (
                    <>
                        <MetricStrip
                            metrics={[
                                { label: "Events hosted", value: HOST_STATS.totals.events, sub: `Across ${HOST_STATS.byGame.length} titles` },
                                { label: "Players hosted", value: HOST_STATS.totals.players.toLocaleString(), sub: "Unique entrants all-time" },
                                { label: "Prize paid", value: `$${HOST_STATS.totals.prizePaid.toLocaleString()}`, tone: "money", sub: "Verified payouts" },
                                { label: "Seasons run", value: HOST_STATS.totals.seasons, sub: `Verified host since ${HOST_STATS.totals.verifiedSince}` },
                            ]}
                        />

                        <div className={shared.dashboardGrid}>
                            <div className={shared.dashboardCol}>
                                {isOwner ? (
                                    <Panel
                                        title="Host card"
                                        subtitle="The venue's shareable card — same treatment players get, with what you've run instead of what you've won."
                                    >
                                        <PlayerCard
                                            profile={SAMPLE_HOST_PROFILE}
                                            verified={verified}
                                            options={cardOptions}
                                            stats={[
                                                { label: "Events", value: HOST_STATS.totals.events },
                                                { label: "Players", value: HOST_STATS.totals.players.toLocaleString() },
                                                { label: "Prize paid", value: `$${HOST_STATS.totals.prizePaid.toLocaleString()}`, tone: "money" },
                                                { label: "Seasons", value: HOST_STATS.totals.seasons },
                                                { label: "Titles", value: HOST_STATS.byGame.length },
                                                { label: "On time", value: "100%", tone: "rank" },
                                            ]}
                                            location={[SAMPLE_HOST_PROFILE.state, SAMPLE_HOST_PROFILE.country].filter(Boolean).join(", ")}
                                            mainGame={null}
                                            scopeLabel="Host"
                                            xp={null}
                                            progress={player.unlockProgress}
                                            editable={isOwner}
                                        />
                                    </Panel>
                                ) : null}

                                <Panel title="What we run" subtitle="Every event this venue has hosted on uSync, by format.">
                                    <BreakdownList rows={HOST_STATS.byType} unit="events" />
                                </Panel>

                                <Panel title="By title" subtitle="Which games this venue actually runs, by event count.">
                                    <BreakdownList rows={HOST_STATS.byGame} unit="events" />
                                </Panel>

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
                                    {Object.entries(hostEventsByType).map(([type, events]) => (
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
                                <Panel title="Track record" subtitle="What a player wants to know before they enter.">
                                    <StatGrid stats={HOST_STATS.reliability} />
                                </Panel>

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
                    </>
                )}
            </div>
        </div>
    );
};
