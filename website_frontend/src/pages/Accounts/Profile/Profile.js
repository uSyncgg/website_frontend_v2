import { useParams, useSearchParams, Link } from "react-router";
import { SeoData, LoadingWheel, EmptyState, ProfileHeader, ProfileViewToggle, ProfileCard } from "components";
import { useProfile } from "hooks";
import { gamesCatalog } from "catalog/games.catalog";
import { NotFound } from "pages/NotFound";
import styles from "./Profile.module.css";
import { getLoadErrorMessage } from "utils/apiError";
import { resolveViews } from "./profileViews";

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

const VenuesCard = ({ venues }) => (
    <ProfileCard title="Venues">
        {venues?.length > 0 ? (
            <div>
                {venues.map(venue => (
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
            <p className={styles.muted}>No venues yet.</p>
        )}
    </ProfileCard>
);

// Main-column content for each view in PROFILE_VIEWS (profileViews.js).
const VIEW_CONTENT = {
    player: (profile) => <GamesCard title="Games" games={profile.games} emptyText="No games added yet." />,
    host: (profile) => <GamesCard title="Hosted Games" games={profile.host_games} emptyText="No hosted games added yet." />,
    venue: (profile) => <VenuesCard venues={profile.venues} />,
};

export const Profile = () => {
    const { username } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: profile, loading, error } = useProfile(username);

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    if (loading) {
        return <div className="standardContainer"><LoadingWheel /></div>;
    }

    if (error || !profile) {
        return (
            <div className="standardContainer">
                <p className={styles.status}>{getLoadErrorMessage(error, "Unable to load this profile right now.")}</p>
            </div>
        );
    }

    const { views, active: activeView } = resolveViews(profile, searchParams.get('view'));
    const setView = (key) => setSearchParams(params => {
        params.set('view', key);
        return params;
    }, { replace: true });

    // Roles with their own view (e.g. Venue) show as a view badge, not again in
    // the "Other roles" card.
    const viewLabels = views.map(view => view.label);
    const otherRoles = (profile.other_roles ?? []).filter(role => !viewLabels.includes(role));
    const roles = [...viewLabels, ...otherRoles];

    return (
        <div className="standardContainer">
            <SeoData
                title={profile.username}
                description={profile.bio || `${profile.username}'s profile on uSync.`}
                canonicalPath={`/profile/${encodeURIComponent(profile.username)}`}
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
                        <ProfileViewToggle views={views} active={activeView} onChange={setView} />
                    }
                </ProfileHeader>

                <div className={styles.cols}>
                    <div>
                        {activeView
                            ? VIEW_CONTENT[activeView](profile)
                            : <ProfileCard title="Profile">
                                <EmptyState title="Nothing here yet" body="No player, host or venue profile yet." />
                            </ProfileCard>
                        }
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
