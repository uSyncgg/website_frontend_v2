import { useParams, useNavigate, Link, Navigate } from "react-router";
import { SeoData, LoadingWheel, ProfileHeader, ProfileViewToggle, ProfileCard } from "components";
import { useCurrentUser, useProfile } from "hooks";
import { gamesCatalog } from "catalog/games.catalog";
import { NotFound } from "pages/NotFound";
import styles from "./Profile.module.css";
import { getLoadErrorMessage } from "utils/apiError";
import { resolveViews } from "./profileViews";
import { PROFILE_LABELS, profileUrl } from "utils/profiles";

// Profile game names come from the sign-up form ("CS 2", "Call of Duty", ...),
// so match them against the catalog loosely to pick up icons and links.
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const findCatalogGame = (name) => gamesCatalog.entries.find(entry =>
    normalize(entry.name) === normalize(name) || normalize(entry.apiGame) === normalize(name)
);

const initials = (name) => name.split(/\s+/).map(w => w.charAt(0)).join('').slice(0, 3).toUpperCase();

const GamesCard = ({ title, games, emptyText }) => (
    <ProfileCard title={title}>
        {games?.length > 0 ? (
            <div>
                {games.map(name => {
                    const entry = findCatalogGame(name);
                    return (
                        <div key={name} className={styles.game}>
                            <div className={styles.emblem}>
                                {entry?.image
                                    ? <img src={entry.image} alt="" />
                                    : initials(name)}
                            </div>
                            <div>
                                {entry?.genre && <div className={styles.eyebrow}>{entry.genre}</div>}
                                <div className={styles.gameName}>{entry?.name ?? name}</div>
                            </div>
                            {entry?.path &&
                                <Link to={entry.path} className={styles.gameLink}>View events</Link>
                            }
                        </div>
                    );
                })}
            </div>
        ) : (
            <p className={styles.muted}>{emptyText}</p>
        )}
    </ProfileCard>
);

const VenuesCard = ({ locations }) => (
    <ProfileCard title="Locations">
        {locations?.length > 0 ? (
            <div>
                {locations.map(venue => (
                    <div key={venue.name} className={styles.game}>
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

// Main-column content for each profile type. `details` is shaped by the type.
const TYPE_CONTENT = {
    player: (details) => <GamesCard title="Games" games={details.games} emptyText="No games added yet." />,
    host: (details) => <GamesCard title="Hosted Games" games={details.hosted_games} emptyText="No hosted games added yet." />,
    venue: (details) => <VenuesCard locations={details.locations} />,
};

// /profile/:publicId/:username - the public_id finds the profile; the username is only there
// so the link reads well, and gets corrected if the profile has been renamed.
export const Profile = () => {
    const { publicId, username } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useProfile(publicId);
    // Right after the URL changes (e.g. switching views), the hook still holds the previous
    // profile for one render before it starts the new fetch. Only use data for the profile in
    // the URL - otherwise the rename check below would "correct" the URL back to the old one.
    const profile = data?.public_id === publicId ? data : null;

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

    if (profile.username !== username) {
        return <Navigate to={profileUrl(profile)} replace />;
    }

    const { views, active } = resolveViews(profile);
    const openView = (key) => navigate(views.find(view => view.key === key).path);

    const otherRoles = profile.other_roles ?? [];
    const roles = [PROFILE_LABELS[profile.type], ...otherRoles];

    return (
        <div className="standardContainer">
            <SeoData
                title={profile.username}
                description={profile.bio || `${profile.username}'s profile on uSync.`}
                canonicalPath={profileUrl(profile)}
                type="profile"
            />

            <div className={styles.wrap}>
                <ProfileHeader
                    key={profile.profile_picture}
                    username={profile.username}
                    verified={profile.verified}
                    profilePicture={profile.profile_picture}
                    roles={roles}
                >
                    {views.length > 1 &&
                        <ProfileViewToggle views={views} active={active} onChange={openView} />
                    }
                </ProfileHeader>

                <div className={styles.cols}>
                    <div>
                        {TYPE_CONTENT[profile.type](profile.details ?? {})}
                    </div>

                    <aside>
                        <ProfileCard title="About">
                            {profile.bio
                                ? <p className={styles.bio}>{profile.bio}</p>
                                : <p className={styles.muted}>No bio yet.</p>}
                        </ProfileCard>

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
