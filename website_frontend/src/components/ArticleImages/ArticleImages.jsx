import styles from './ArticleImages.module.css';
import { Link } from 'react-router';

export const ArticleImages = () => {
    return (
        <div className={styles.articleImages}>
            <Link to={"/LanMap"}>
                <img src="https://i.imgur.com/B7UyPAZ.jpg" alt="Lan Map" />
            </Link>

            <Link to={"/games"}>
                <img src="https://i.imgur.com/R82qrUO.jpg" alt="Games" />
            </Link>
        </div>
    )
}
