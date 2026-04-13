import { HeaderImage, MoreInfoButton } from "components";
import { Link } from "react-router";
import styles from '../Home.module.css';

export const Verification = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={""} verification={true} imageClass={"verificationPage"} />

            <div className={styles.sectionTwo}>
                <h2 className={styles.white}>Verified Features</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                <div className={styles.subscriptionContainer}>
                    <Link to={"https://buy.stripe.com/eVadRz4PY0s31mEcMV"} target="_blank">
                        <img src="https://i.imgur.com/EC4OOoS.png" alt="Verified Features" />
                    </Link>

                    <div className={styles.subscription}>
                        <MoreInfoButton title={"Subscribe"} path={"https://buy.stripe.com/eVadRz4PY0s31mEcMV"} external={true} />
                    </div>
                </div>

                <div className="hr" />

                <div className={styles.subscriptionContainer}>
                    <img className={styles.usyncVerified} src="https://i.imgur.com/OSMYolc.png" alt="uSync Verified" />
                    <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                    <h1 className={styles.verificationDesc}>
                        uSync Verified providers are the most trustworthy providers that we feature. 
                        These events are not only extremely well trusted but have shown a record of exceptional quality in their work. 
                        We strive to verify as many events as possible so that you can bring your organization to the highest level of competitive play.
                    </h1>
                
                </div>

                <div className="hr" />

                <p className={`${styles.learn} ${styles.post}`}>
                    Looking to post an event? Send {" "}
                    <Link to={"/more/eventhost"}>Event Submission</Link>
                </p>

            </div>
        </div>
    );
}
