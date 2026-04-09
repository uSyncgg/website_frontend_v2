import { HeaderImage } from "components";
import styles from '../Home.module.css';
import { Link } from "react-router";

export const ReportProblem = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Report a Problem"} imageClass={"reportPage"} />

            <div className={`${styles.subscriptionContainer} ${styles.post}`}>
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLScQS0BmGcMtiv4WXLCJcfFJx_uF7Ks1K28-29o-upGAUhQAEA/viewform?embedded=true"
                    width={"640"}
                    height={"1000"}
                    frameBorder={"0"}
                    marginHeight={"0"}
                    marginWidth={"0"}
                />
            </div>

            <div className="hr" />

            <div className={styles.subscriptionContainer}>
                <p className={`${styles.learn} ${styles.post}`}>
                    Looking to post an event? {" "}
                    <Link to={"/more/eventhost"}>Learn More</Link>
                </p>
            </div>
        </div>
    );
}
