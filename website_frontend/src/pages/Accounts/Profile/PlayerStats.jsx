import { Link } from "react-router";
import { ProfileCard } from "components";
import { profileUrl, statsUrl } from "utils/profiles";
import { gameEmblem, playerGames } from "./profileGames";
import styles from "./Profile.module.css";

/**
 * A player's stats, the main part of their profile: every game they play on the profile itself,
 * or one game at /profile/:publicId/:username/stats/:game (its own URL, so it can be shared).
 * Stats come from the player's linked game accounts, which can't be linked yet, so each game
 * says that for now. `onEditGames` (the owner) edits which games they play.
 */
export const PlayerStats = ({ profile, gameSlug, isOwner, onEditGames }) => {
    const games = playerGames(profile.details?.games);
    const game = gameSlug ? games.find(g => g.slug === gameSlug) : null;
    const shown = gameSlug ? (game ? [game] : []) : games;

    return (
        <ProfileCard
            title={game ? `${game.name} stats` : 'Stats'}
            action={onEditGames && <button type="button" className={styles.cardAction} onClick={onEditGames}>Edit games</button>}
        >
            {games.length > 0 &&
                <nav className={styles.statTabs} aria-label="Stats by game">
                    <Link to={profileUrl(profile)} className={`${styles.statTab} ${!gameSlug ? styles.statTabActive : ''}`} aria-current={!gameSlug ? 'page' : undefined}>All games</Link>
                    {games.map(g => (
                        <Link
                            key={g.slug}
                            to={statsUrl(profile, g.slug)}
                            className={`${styles.statTab} ${g.slug === gameSlug ? styles.statTabActive : ''}`}
                            aria-current={g.slug === gameSlug ? 'page' : undefined}
                        >
                            {g.name}
                        </Link>
                    ))}
                </nav>
            }

            {gameSlug && !game && <p className={styles.muted}>{profile.username} doesn't have that game on their profile.</p>}
            {!gameSlug && games.length === 0 && <p className={styles.muted}>No games added yet.</p>}

            {shown.map(g => (
                <div key={g.slug} className={styles.game}>
                    {gameEmblem(g)}
                    <div>
                        {g.genre && <div className={styles.eyebrow}>{g.genre}</div>}
                        <div className={styles.gameName}>{g.name}</div>
                        <div className={styles.location}>
                            {isOwner
                                ? 'Link your game account to show live stats here - coming soon.'
                                : 'No stats linked yet.'}
                        </div>
                    </div>
                </div>
            ))}
        </ProfileCard>
    );
};
