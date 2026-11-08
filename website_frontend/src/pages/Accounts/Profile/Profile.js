import { useState } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router";
import { TeamCard } from "components/Teams/TeamParts";
import teamStyles from "components/Teams/Teams.module.css";
import { EVENT_DASHBOARD_PATH } from "utils/hostEvents";
import { SeoData, LoadingWheel, ProfileHeader, ProfileLinks, LinkAccountsModal, ProfileViewToggle, ProfileCard, ShareButton } from "components";
import { useCurrentUser, useProfile } from "hooks";
import { NotFound } from "pages/NotFound";
import styles from "./Profile.module.css";
import { getLoadErrorMessage } from "utils/apiError";
import { resolveViews } from "./profileViews";
import { EditAboutModal, EditGamesModal, EditLocationsModal, EditUsernameModal, usePictureEditor } from "./ProfileEditors";
import { PlayerStats } from "./PlayerStats";
import { AboutCard, EventsCard, OwnerEventsCard, OwnerTeamsCard } from "./ProfileSections";
import { gameEmblem, initials, playerGames } from "./profileGames";
import { PROFILE_LABELS, profileUrl, statsUrl } from "utils/profiles";

// The owner's "Edit" button on a card.
const EditButton = ({ onClick }) => (
    <button type="button" className={styles.cardAction} onClick={onClick}>Edit</button>
);

// A host's games, each linking to that game's events.
const GamesCard = ({ title, games, emptyText, onEdit }) => (
    <ProfileCard title={title} action={onEdit && <EditButton onClick={onEdit} />}>
        {games?.length > 0 ? (
            <div>
                {playerGames(games).map(game => (
                    <div key={game.slug} className={styles.game}>
                        {gameEmblem(game)}
                        <div>
                            {game.genre && <div className={styles.eyebrow}>{game.genre}</div>}
                            <div className={styles.gameName}>{game.name}</div>
                        </div>
                        {game.path && <Link to={game.path} className={styles.gameLink}>View events</Link>}
                    </div>
                ))}
            </div>
        ) : (
            <p className={styles.muted}>{emptyText}</p>
        )}
    </ProfileCard>
);

const VenuesCard = ({ locations, onEdit }) => (
    <ProfileCard title="Locations" action={onEdit && <EditButton onClick={onEdit} />}>
        {locations?.length > 0 ? (
            <div>
                {locations.map(venue => (
                    <div key={`${venue.name}-${venue.location}`} className={styles.game}>
                        <div className={styles.emblem}>{initials(venue.name)}</div>
                        <div>
                            <div className={styles.gameName}>{venue.name}</div>
                            <div className={styles.location}>{venue.location}</div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className={styles.muted}>No locations yet.</p>
        )}
    </ProfileCard>
);

// An organization's teams; each card opens the team's page. The owner manages them from the
// Teams dashboard.
const OrgTeamsCard = ({ teams, isOwner }) => (
    <ProfileCard
        title="Teams"
        action={isOwner && <Link to={`${EVENT_DASHBOARD_PATH}?tab=teams`} className={styles.cardAction}>Manage teams</Link>}
    >
        {teams?.length > 0 ? (
            <div className={teamStyles.grid}>
                {teams.map(team => <TeamCard key={team.public_id} team={team} />)}
            </div>
        ) : (
            <p className={styles.muted}>No teams yet.</p>
        )}
    </ProfileCard>
);

// Main-column content for each profile type. `edit(what)` opens an owner editor (undefined for
// everyone else). A player's page is their stats: every game, or one game at .../stats/:game.
// The owner also sees "Your events" first: entered events above a player's stats, and on a host
// or venue profile their hosted events in place of the public Events card (visitors see that).
const TYPE_CONTENT = {
    player: (profile, { edit, isOwner, gameSlug }) => (
        <>
            {isOwner && <OwnerEventsCard profile={profile} />}
            {isOwner && <OwnerTeamsCard profile={profile} />}
            <PlayerStats profile={profile} gameSlug={gameSlug} isOwner={isOwner} onEditGames={edit('games')} />
        </>
    ),
    host: (profile, { edit, isOwner }) => (
        <>
            {isOwner ? <OwnerEventsCard profile={profile} /> : <EventsCard profile={profile} />}
            <GamesCard title="Hosted Games" games={profile.details.hosted_games} emptyText="No hosted games added yet." onEdit={edit('games')} />
        </>
    ),
    venue: (profile, { edit, isOwner }) => (
        <>
            {isOwner && <OwnerEventsCard profile={profile} />}
            <VenuesCard locations={profile.details.locations} onEdit={edit('locations')} />
            {!isOwner && <EventsCard profile={profile} />}
        </>
    ),
    org: (profile, { edit, isOwner }) => (
        <>
            <OrgTeamsCard teams={profile.details.teams} isOwner={isOwner} />
            <GamesCard title="Team Titles" games={profile.details.games} emptyText="No titles added yet." onEdit={edit('games')} />
        </>
    ),
};

const without = (games, value) => (games ?? []).filter(g => g !== value);

// The profile as the owner just saved it from one of the page's editors, until it's refetched.
// `settings` is the save's response; its details also hold private fields (phone, name...),
// so only the public ones shown here are taken.
function applySettings(profile, settings) {
    const saved = settings.details ?? {};
    const details = { ...profile.details };
    if (profile.type === 'player') details.games = without(saved.interests, 'Other');
    if (profile.type === 'host') {
        details.hosted_games = without(saved.hosted_games, 'Other');
        details.event_types = saved.event_types ?? [];
    }
    if (profile.type === 'venue') details.locations = saved.locations ?? [];
    if (profile.type === 'org') {
        details.organization = saved.organization ?? details.organization;
        details.games = without(saved.games, 'Other');
    }
    return {
        ...profile,
        username: settings.username,
        profile_picture: settings.profile_picture,
        bio: settings.bio,
        links: settings.links,
        details,
    };
}

// /profile/:publicId/:username - the public_id finds the profile; the username is only there
// so the link reads well, and gets corrected if the profile has been renamed. A player's
// profile shows their stats; /profile/:publicId/:username/stats/:game is one game's, shareable
// on its own.
export const Profile = ({ stats = false }) => {
    const { publicId, username, game: gameSlug } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useProfile(publicId);
    const { profiles: myProfiles } = useCurrentUser();
    // Which owner editor is open: 'links', 'about', 'games', 'locations' or 'username'.
    const [editing, setEditing] = useState(null);
    const [saved, setSaved] = useState(null);
    // Right after the URL changes (e.g. switching views), the hook still holds the previous
    // profile for one render before it starts the new fetch. Only use data for the profile in
    // the URL - otherwise the rename check below would "correct" the URL back to the old one.
    let profile = data?.public_id === publicId ? data : null;
    if (profile && saved?.public_id === profile.public_id) {
        profile = applySettings(profile, saved);
    }
    const onSaved = (settings) => {
        setSaved(settings);
        setEditing(null);
    };
    const picture = usePictureEditor(profile ?? { type: null }, onSaved);

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    if (loading || (!error && !profile)) {
        return <div className="standardContainer"><LoadingWheel /></div>;
    }

    if (error) {
        return (
            <div className="standardContainer">
                <p className={styles.status}>{getLoadErrorMessage(error, "Unable to load this profile right now.")}</p>
            </div>
        );
    }

    // Only players have per-game stats pages; the all-games stats are the profile itself.
    const gameStats = stats && gameSlug && profile.type === 'player';
    const canonical = gameStats ? statsUrl(profile, gameSlug) : profileUrl(profile);

    if (profile.username !== username || (stats && !gameStats)) {
        return <Navigate to={canonical} replace />;
    }

    const { views, active } = resolveViews(profile);
    const openView = (key) => navigate(views.find(view => view.key === key).path);

    const otherRoles = profile.other_roles ?? [];
    const roles = [PROFILE_LABELS[profile.type], ...otherRoles];
    // The editors only show for the owner; saving also checks it (the saves only ever change
    // the signed in user's own profile).
    const isOwner = myProfiles.some(mine => mine.public_id === profile.public_id);
    const edit = (what) => (isOwner ? () => setEditing(what) : undefined);
    const closeEditor = () => setEditing(null);

    // After a rename the URL moves to the new name (the page would otherwise "correct" it back).
    const onRenamed = (settings) => {
        onSaved(settings);
        const renamed = { ...profile, username: settings.username };
        navigate(gameStats ? statsUrl(renamed, gameSlug) : profileUrl(renamed), { replace: true });
    };

    return (
        <div className="standardContainer">
            <SeoData
                title={gameStats ? `${profile.username} - Stats` : profile.username}
                description={profile.bio || `${profile.username}'s profile on uSync.`}
                canonicalPath={canonical}
                type="profile"
            />

            <div className={styles.wrap}>
                <ProfileHeader
                    key={profile.profile_picture}
                    username={profile.username}
                    verified={profile.verified}
                    profilePicture={profile.profile_picture}
                    roles={roles}
                    links={<ProfileLinks profile={profile} onEdit={edit('links')} />}
                    onEditPicture={isOwner ? picture.open : undefined}
                    onEditName={edit('username')}
                >
                    <ShareButton title={`${profile.username} on uSync`} />
                    {views.length > 1 &&
                        <ProfileViewToggle views={views} active={active} onChange={openView} />
                    }
                </ProfileHeader>

                {isOwner && picture.element}
                {editing === 'links' && <LinkAccountsModal profile={profile} onClose={closeEditor} onSaved={onSaved} />}
                {editing === 'about' && <EditAboutModal profile={profile} onClose={closeEditor} onSaved={onSaved} />}
                {editing === 'games' && <EditGamesModal profile={profile} onClose={closeEditor} onSaved={onSaved} />}
                {editing === 'locations' && <EditLocationsModal profile={profile} onClose={closeEditor} onSaved={onSaved} />}
                {editing === 'username' && <EditUsernameModal profile={profile} onClose={closeEditor} onRenamed={onRenamed} />}

                <div className={styles.cols}>
                    <div>
                        {TYPE_CONTENT[profile.type]({ ...profile, details: profile.details ?? {} }, { edit, isOwner, gameSlug: gameStats ? gameSlug : null })}
                    </div>

                    <aside>
                        <AboutCard profile={profile} action={isOwner && <EditButton onClick={edit('about')} />} />

                        {otherRoles.length > 0 &&
                            <ProfileCard title="Other roles">
                                <div className={styles.tags}>
                                    {otherRoles.map(role => (
                                        <span key={role} className={styles.tag}>{role}</span>
                                    ))}
                                </div>
                                {profile.other_role_detail &&
                                    <p className={styles.detail}>{profile.other_role_detail}</p>
                                }
                            </ProfileCard>
                        }
                    </aside>
                </div>
            </div>
        </div>
    );
}

// /profile - the signed in user's own profile (the navbar's "Profile" link). With a finished
// account it forwards to the default profile's page. Before sign-up is finished there's no
// profile to show yet, so it's a blank one pointing to the sign-up form.
// RequireCompleteProfile has already sent logged-out users to /login.
export const MyProfile = () => {
    const { status, defaultProfile } = useCurrentUser();

    if (status === 'loading' || status === 'anonymous') {
        return <div className="standardContainer"><LoadingWheel /></div>;
    }

    if (status === 'complete' && defaultProfile) {
        return <Navigate to={profileUrl(defaultProfile)} replace />;
    }

    if (status === 'error') {
        return (
            <div className="standardContainer">
                <p className={styles.status}>Unable to load your profile right now.</p>
            </div>
        );
    }

    return (
        <div className="standardContainer">
            <div className={styles.wrap}>
                <ProfileHeader username="Your profile" verified={false} profilePicture={null} />

                <div className={styles.cols}>
                    <div>
                        <ProfileCard title="Profile">
                            <div className={styles.incomplete}>
                                <p className={styles.incompleteText}>Your profile is incomplete.</p>
                                <Link to="/complete-profile" className={styles.completeLink}>Complete it here</Link>
                            </div>
                        </ProfileCard>
                    </div>

                    <aside>
                        <ProfileCard title="About">
                            <p className={styles.muted}>No bio yet.</p>
                        </ProfileCard>
                    </aside>
                </div>
            </div>
        </div>
    );
};
