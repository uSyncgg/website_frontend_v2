import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CKRASH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"CKRAS"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Voice Server: 1.50€/month", "EPS Entry: 14.99€/month", "EPS Extreme Server: 20.99€/month", "EPS Extreme Plus: 59.99€/month"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Purchase Gamer Server to Be Used in Scrims", "Can Connect with Pracc Account", "ESL Ready & Certified", "Live Website Support"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.ckras.com/en"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/head-to-head"} />
            </div>
        </div>
    );
}