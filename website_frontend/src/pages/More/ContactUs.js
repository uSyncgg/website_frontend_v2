import { HeaderImage, EmailIcon, TeamPhoto } from "components";
import { Link } from "react-router";
import styles from '../Home.module.css';

export const ContactUs = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Find Us"} imageClass={"lansPage"} />

            <div className={styles.socialsContainer}>
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

            <div className={styles.subscriptionContainer}>
                <h1 className={styles.verificationDesc}>
                    At uSync we strive to bring all of the tournaments, leagues, LANs, and more to one easy and accessible place. 
                    You won't have to waste your time going from site to site or endlessly scrolling on Twitter/Discord just to find competition. 
                    By utilizing the supported events on our website, you have access to all of the esports competitions in one simple place. 
                    We are the game hub of competitive titles across all of esports!
                </h1>
            </div>

            <div className="hr" />

            <div className={styles.sectionTwo}>
                <h2 className={styles.white}>Hosting Events?</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                <div className={styles.eventContainer}>
                    <div className={styles.eventSectionOne}>
                        <EmailIcon />
                    </div>

                    <div className={styles.eventSectionTwo}>
                        <p className={`${styles.learn} ${styles.post}`}>
                            We support plenty of different events/websites but may miss a few from time to time in our search to support all games. 
                            If you are interested in working with us, click   {" "}
                            <Link to={"/more/eventhost/eventhost"}>HERE</Link>
                        </p>
                    </div>
                </div>

                <div className="hr" />

                <h2 className={styles.white}>About Us</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                <div className={`${styles.subscriptionContainer}`}>
                <p className={`${styles.aboutDesc}`}>
                    Our team has played competitive esports in both the amateur and collegiate level for years. uSync was founded after noticing that 
                    esports is extremely disorganized and in some circumstances impossible to find information without knowing the right people. 
                    Our vision is to solve this by allowing all events to be shown in one place, so everyone can participate in as many events as 
                    they desire!
                </p>
                </div>

                <div className={styles.teamContainer}>
                    <TeamPhoto member={"Jake"} />
                    <TeamPhoto member={"Matt"} />
                    <TeamPhoto member={"Mace"} />
                    <TeamPhoto member={"Tone"} />
                </div>

                <div className="hr" />

            </div>
        </div>
    );
}
