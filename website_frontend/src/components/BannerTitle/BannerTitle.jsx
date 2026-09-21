import styles from './BannerTitle.module.css';
import { Link } from 'react-router';

function BannerTitle({path, verified, children}) {
    return (
        <div className={styles.bannerTitle}>
            <Link to={path} className={styles.titleLink} onClick={(e) => e.stopPropagation()}>
                <h1>{children}</h1>
            </Link>
            {verified === true && (
                <Link
                    to="/more/verification"
                    className={styles.verifiedPill}
                    onClick={(e) => e.stopPropagation()}
                >
                    <span className={styles.checkBadge}>
                        <svg className={styles.verifiedIcon} viewBox="0 0 24 24" aria-hidden="true">
                            <polyline points="4,13 9,18 20,6" />
                        </svg>
                    </span>
                    Verified
                </Link>
            )}
        </div>
    );
}

export default BannerTitle;
