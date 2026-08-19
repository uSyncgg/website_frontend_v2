import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import styles from './ChooseYourGame.module.css';

const GAMES = [
    { name: "Call of Duty", to: "/games/call-of-duty", logo: "https://i.imgur.com/faZHdLx.png", accent: styles.accentCod },
    { name: "League of Legends", to: "/games/LoL", logo: "https://i.imgur.com/5riYNow.png", accent: styles.accentLol },
    { name: "Halo", to: "/games/halo", logo: "https://i.imgur.com/wqKJfEu.png", accent: styles.accentHalo },
];

export const ChooseYourGame = () => {
    return (
        <div className={styles.container}>
            <p className={styles.eyebrow}>Community</p>
            <h2 className={styles.white}>Choose Your Game</h2>
            <img className="underlineImg" src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

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
