// This will be for the LAN/Tourney/League/Wager/H2H icons within each game, similar to GameIcon
import styles from './GameChildrenIcon.module.css';


function GameChildrenIcon({path, imgUrl, alt}) {
    return (
        <a href={path}>
            <img src={imgUrl} alt={alt} className={styles.gameChildren} />
        </a>
    )
}

export default GameChildrenIcon;