import { useState } from "react";
import styles from './MapCover.module.css'
import { Link } from "react-router";

const MapCoverGame = ({game}) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
        setIsVisible(false);
    }

    if (!isVisible) return null;
    

    return (
        <div className={styles.cover} onClick={handleClick}>
            <p className={styles.coverText}>Click to interact with the map <br /> or scroll below</p>

            <Link to="/lans" className={`${styles.mapButtonLans} ${styles.mapButton}`}>Back to LANs</Link>

            {game === "CoD" && 
                <Link to="/games/call-of-duty" className={`${styles.mapButtonGame} ${styles.mapButton}`}>Back to Call of Duty</Link>            
            }

            {game === "Warzone" && 
                <Link to="/games/warzone" className={`${styles.mapButtonGame} ${styles.mapButton}`}>Back to Warzone</Link>
            }

            {game === "LoL" && 
                <Link to="/games/LoL" className={`${styles.mapButtonGame} ${styles.mapButton}`}>Back to LoL</Link>
            }

            {game === "Halo" &&
                <Link to="/games/halo" className={`${styles.mapButtonGame} ${styles.mapButton}`}>Back to Halo</Link>
            }
        </div>
    )
}

export default MapCoverGame;