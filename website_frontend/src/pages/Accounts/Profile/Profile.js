import { useParams, useSearchParams, Link } from "react-router";
import { SeoData, LoadingWheel, EmptyState, ProfileHeader, ProfileViewToggle, ProfileCard } from "components";
import { useProfile } from "hooks";
import { gamesCatalog } from "catalog/games.catalog";
import { NotFound } from "pages/NotFound";
import styles from "./Profile.module.css";

// Profile game names come from the sign-up form ("CS 2", "Call of Duty", ...),
// so match them against the catalog loosely to pick up icons and links.
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const findCatalogGame = (name) => gamesCatalog.entries.find(entry =>
    normalize(entry.name) === normalize(name) || normalize(entry.apiGame) === normalize(name)
);

const initials = (name) => name.split(/\s+/).map(w => w.charAt(0)).join('').slice(0, 3).toUpperCase();

function buildViews(profile) {
    return [
        { key: 'player', label: 'Player', available: profile.is_player },
        { key: 'host', label: 'Host', available: profile.is_host },
        { key: 'venue', label: 'Venue', available: profile.venues?.length > 0 },
    ];
}

const GamesCard = ({ games }) => (
    <ProfileCard title="Games">
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
            <p className={styles.muted}>No games added yet.</p>
        )}
    </ProfileCard>
);

const ComingSoonCard = ({ title }) => (
    <ProfileCard title={title}>
        <EmptyState title="Coming soon" body={`${title} details will show up here.`} />
    </ProfileCard>
);

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
                <p className={styles.status}>Unable to load this profile right now.</p>
            </div>
        );
    }

    const views = buildViews(profile);
    const requested = views.find(v => v.key === searchParams.get('view') && v.available);
    const activeView = requested?.key ?? views.find(v => v.available)?.key ?? 'player';
    const setView = (key) => setSearchParams({ view: key }, { replace: true });

    const roles = [
        profile.is_player && 'Player',
        profile.is_host && 'Host',
        ...(profile.other_roles ?? []),
    ].filter(Boolean);

    return (
        <div className="standardContainer">
            <SeoData
                title={profile.username}
                description={profile.bio ?? `${profile.username}'s profile on uSync.`}
                canonicalPath={`/profile/${encodeURIComponent(profile.username)}`}
                type="profile"
            />

            <div className={styles.wrap}>
                <ProfileHeader username={profile.username} verified={profile.verified} roles={roles}>
                    <ProfileViewToggle views={views} active={activeView} onChange={setView} />
                </ProfileHeader>

                <div className={styles.cols}>
                    <div>
                        {activeView === 'player' && <GamesCard games={profile.games} />}
                        {activeView === 'host' && <ComingSoonCard title="Host profile" />}
                        {activeView === 'venue' && <ComingSoonCard title="Venue profile" />}
                    </div>

                    <aside>
                        <ProfileCard title="About">
                            {profile.bio
                                ? <p className={styles.bio}>{profile.bio}</p>
                                : <p className={styles.muted}>No bio yet.</p>}
                        </ProfileCard>

                        {profile.other_roles?.length > 0 &&
                            <ProfileCard title="Other roles">
                                <div className={styles.tags}>
                                    {profile.other_roles.map(role => (
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
