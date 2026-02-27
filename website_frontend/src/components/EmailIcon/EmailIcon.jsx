import styles from './EmailIcon.module.css';
import { useCheckResize } from 'hooks';
import { Link } from 'react-router';

export const EmailIcon = () => {
    const isMobile = useCheckResize();

    const mail = !isMobile ? "contact@usync.gg" : "";

    return (
        <div className={styles.mailContainer}>
            <Link to="mailto:contact@usync.gg" target="_blank">
                <img src="https://imgur.com/za685rg.png" alt="Gmail" />
            </Link>
            
            <p className={styles.white}>{mail}</p>
        </div> 
    )
}
