import { useState } from "react";
import styles from './MapCover.module.css'

const MapCoverHome = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
        setIsVisible(false);
    }

    if (!isVisible) return null;

    return (
        <div className={styles.cover} onClick={handleClick}>
            <p className={styles.coverText}>Click to interact with the map</p>
        </div>
    )
}

export default MapCoverHome;
