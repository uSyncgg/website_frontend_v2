import styles from './BannerTitle.module.css';
import { Link } from 'react-router';

function BannerTitle({path, children}) {
    return (
        <div className={styles.bannerTitle}>
            <Link to={path}>
                <h1>{children}</h1>
            </Link>
        </div>
    );
}

export default BannerTitle;