import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import styles from './ChooseYourGame.module.css';
import underline from 'assets/images/misc/underline-decorative-graphic_9.6.26.webp';
import codIcon from 'assets/images/game_icons/game-icon-call-of-duty_9.6.26.webp';
import lolIcon from 'assets/images/game_icons/game-icon-league-of-legends_9.6.26.webp';
import haloIcon from 'assets/images/game_icons/game-icon-halo_9.6.26.webp';

const GAMES = [
    { name: "Call of Duty", to: "/games/call-of-duty", logo: codIcon, accent: styles.accentCod },
    { name: "League of Legends", to: "/games/LoL", logo: lolIcon, accent: styles.accentLol },
    { name: "Halo", to: "/games/halo", logo: haloIcon, accent: styles.accentHalo },
];

export const ChooseYourGame = () => {
    return (
        <div className={styles.container}>
            <p className={styles.eyebrow}>Community</p>
            <h2 className={styles.white}>Choose Your Game</h2>
            <img className="underlineImg" src={underline} alt="underline" />

            <div className={styles.grid}>
                {GAMES.map(game => (
                    <Link to={game.to} key={game.name} className={`${styles.tile} ${game.accent}`}>
                        <img src={game.logo} alt={game.name} className={styles.tileImage} />
                        <div className={styles.tileOverlay} />
                        <div className={styles.tileContent}>
                            <h3>{game.name}</h3>
                            <span className={styles.explore}>Explore</span>
                        </div>
                    </Link>
                ))}

                <Link to="/games" className={`${styles.tile} ${styles.tileMore}`}>
                    <div className={styles.moreIconWrap}>
                        <FaChevronRight className={styles.moreIcon} />
                    </div>
                    <h3>Explore More Games</h3>
                    <span className={styles.explore}>View all</span>
                </Link>
            </div>
        </div>
    );
};
