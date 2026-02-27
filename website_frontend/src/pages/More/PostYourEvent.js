import { HeaderImage } from "components";
import { Link } from "react-router";
import styles from '../Home.module.css';

export const PostYourEvent = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Post Your Event"} imageClass={"gamesPage"} />
            
            <div className={`${styles.subscriptionContainer} ${styles.post}`}>
                <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSf8UhB2bn7wDN9mHTpEfFvlLN9ZkDA47uWfUaAInWujsuez2g/viewform?embedded=true"
                    width={"640"}
                    height={"1950"}
                    frameBorder="0"
                    marginheight="0"
                    marginwidth="0"
                    title="Event Post Form"
                />
            </div>

            <div className="hr" />

            <div className={styles.subscriptionContainer}>
                <p className={`${styles.learn} ${styles.post}`}>
                    Already Featured? Become {" "}
                    <Link to={"/more/eventhost/verification"}>Verified</Link>
                </p>
            </div>
        </div>
    );
}
