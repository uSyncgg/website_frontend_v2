import styles from './VerifiedText.module.css';
import { Link } from 'react-router';

export const VerifiedText = () => {
    return (
        <Link to="/more/verification" className={styles.verifiedImgContainer}>
            <img className={`${styles.verifiedImage}`} src='https://i.imgur.com/PCHIHQB.png' alt='uSync Verified' />
            <img className={`${styles.verifiedText}`} src='https://i.imgur.com/OSMYolc.png' alt='uSync Verified Text' />
        </Link>
    )
}
