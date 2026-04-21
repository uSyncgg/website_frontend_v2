import styles from './VerifiedImage.module.css';
import { Link } from 'react-router';

export const VerifiedImage = ({banner}) => {
    return (
        <Link to="/more/verification">
            <img className={`${banner === true ? styles.bannerVerified : "verifiedImage"}`} src='https://i.imgur.com/PCHIHQB.png' alt='uSync Verified' />
        </Link>
    )
}
