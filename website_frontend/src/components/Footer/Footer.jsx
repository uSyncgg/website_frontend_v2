import { Link } from "react-router";
import styles from './Footer.module.css'

function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.hostBanner}>
                <p className={styles.hostBannerText}>
                    Are you a host or organizer? <span>Learn how uSync Verified builds trust with players.</span>
                </p>
                <Link to="/more/verification" className={styles.hostBannerLink}>Learn about Verified</Link>
            </div>

            <div className={styles.top}>
                <div className={styles.brandCol}>
                    <Link to="/" className={styles.logoLink}>
                        <img src="https://i.imgur.com/F5lNU1H.png" alt="uSync Logo" className={styles.logo} />
                    </Link>
                    <p className={styles.tagline}>
                        The all-in-one hub for esports LANs, leagues, and tournaments.
                    </p>
                    <div className={styles.socials}>
                        <Link to="https://www.linkedin.com/company/usync-llc/" target="_blank" aria-label="LinkedIn">
                            <img src="https://i.imgur.com/Bx4MX1t.png" alt="LinkedIn Icon" />
                        </Link>

                        <Link to="https://www.instagram.com/usyncgg/?next=%2F" target="_blank" aria-label="Instagram">
                            <img src="https://i.imgur.com/YOav7r1.png" alt="Instagram Icon" />
                        </Link>

                        <Link to="https://twitter.com/uSyncGG" target="_blank" aria-label="X (Twitter)">
                            <img src="https://i.imgur.com/p0wIHEq.png" alt="X Icon" />
                        </Link>

                        <Link to="mailto:contact@usync.gg" target="_blank" aria-label="Email">
                            <img src="https://i.imgur.com/mUzX7o1.png" alt="Email Icon" />
                        </Link>
                    </div>
                </div>

                <div className={styles.linkCol}>
                    <h4>Navigate</h4>
                    <Link to="/">Home</Link>
                    <Link to="/games">Games</Link>
                    <Link to="/leagues">Leagues</Link>
                    <Link to="/lans">LANs</Link>
                    <Link to="/tournaments">Tournaments</Link>
                </div>

                <div className={styles.linkCol}>
                    <h4>Resources</h4>
                    <Link to="/more/eventhost">Host an Event</Link>
                    <Link to="/more/verification">Get Verified</Link>
                    <Link to="/more/FAQ">FAQ</Link>
                    <Link to="/more/articles">Articles</Link>
                </div>

                <div className={styles.linkCol}>
                    <h4>Support</h4>
                    <Link to="/more/contactus">Contact Us</Link>
                    <Link to="/reportproblem">Report a Problem</Link>
                </div>
            </div>

            <div className={styles.bottom}>
                <p className={styles.copyright}>
                    <span suppressHydrationWarning> © {new Date().getFullYear()} uSync LLC. All rights reserved. {' '}</span>
                    <a href="mailto:contact@usync.gg">contact@usync.gg</a>
                </p>
                <p className={styles.disclaimer}>
                    All content, game titles, trade names and/or trade dress, trademarks, artworks and associated imagery
                    are trademarks and/or copyright material of their respective owners.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
