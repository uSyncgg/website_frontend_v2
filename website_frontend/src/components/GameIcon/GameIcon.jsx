import styles from './GameIcon.module.css';

function GameIcon({path, imgUrl, alt}) {
    return (
        <a href={path}>
            <img src={imgUrl} alt={alt} class={styles.gameImage} />
        </a>
    );
}

export default GameIcon;
