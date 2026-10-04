import styles from './EmailIcon.module.css';
import { useCheckResize } from 'hooks';
import { Link } from 'react-router';
import gmailIcon from 'assets/images/contact_us/contactus-gmail-icon_9.6.26.webp';

export const EmailIcon = () => {
    const isMobile = useCheckResize();

    const mail = !isMobile ? "contact@usync.gg" : "";

    return (
        <div className={styles.mailContainer}>
            <Link to="mailto:contact@usync.gg" target="_blank">
                <img src={gmailIcon} alt="Gmail" />
            </Link>
            
            <p className={styles.white}>{mail}</p>
        </div> 
    )
}
