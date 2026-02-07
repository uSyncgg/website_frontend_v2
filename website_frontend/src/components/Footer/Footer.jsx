import { Link } from "react-router";
import styles from './Footer.module.css'

function Footer() {

    return (
        <footer>
            <Link to="/reportproblem" className={styles.report}>Report a problem</Link>
            <div>
                <Link to="https://www.linkedin.com/company/usync-llc/" target="_blank">
                    <img src="https://i.imgur.com/Bx4MX1t.png" alt="LinkedIn Icon" />
                </Link>

                <Link to="https://www.instagram.com/usyncgg/?next=%2F" target="_blank">
                    <img src="https://i.imgur.com/YOav7r1.png" alt="Instagram Icon" />
                </Link>

                <Link to="https://twitter.com/uSyncGG" target="_blank">
                    <img src="https://i.imgur.com/p0wIHEq.png" alt="X Icon" />
                </Link>

                <Link to="mailto:contact@usync.gg" target="_blank">
                    <img src="https://i.imgur.com/mUzX7o1.png" alt="Email Icon" />
                </Link>
            </div>
            <div>
                <p className={styles.paragraph}>
                    contact@usync.gg ©2022 by uSync LLC. {' '}
                    <Link to="/more/contactus">Contact Us</Link>
                    <br/>
                    All content, game titles, trade names and/or trade dress, trademarks, artworks and associated imagery are
                    <br/>
                    trademarks and/or copyright material of their respective owners.
                </p>
            </div>
        </footer>
    );
}

export default Footer;