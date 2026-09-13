import styles from './VerifiedText.module.css';
import { Link } from 'react-router';
import verifiedBadge from 'assets/images/verification/verified-badge-usync-verified_9.6.26.webp';
import verifiedBadgeVariant2 from 'assets/images/misc/verified-badge-usync-verified-variant2_9.6.26.webp';

export const VerifiedText = () => {
    return (
        <Link to="/more/verification" className={styles.verifiedImgContainer}>
            <img className={`${styles.verifiedImage}`} src={verifiedBadge} alt='uSync Verified' />
            <img className={`${styles.verifiedText}`} src={verifiedBadgeVariant2} alt='uSync Verified Text' />
        </Link>
    )
}
