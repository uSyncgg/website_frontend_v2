import styles from './VerifiedImage.module.css';
import { Link } from 'react-router';
import verifiedBadge from 'assets/images/verification/verified-badge-usync-verified_9.6.26.webp';

export const VerifiedImage = ({banner}) => {
    return (
        <Link to="/more/verification" onClick={(e) => e.stopPropagation()}>
            <img className={`${banner === true ? styles.bannerVerified : "verifiedImage"}`} src={verifiedBadge} alt='uSync Verified' />
        </Link>
    )
}
