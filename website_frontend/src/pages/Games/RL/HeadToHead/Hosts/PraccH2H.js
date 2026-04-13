import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const PraccH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Pracc"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Covers all levels of competitions", "Various Different Platforms to Use", "Large Number of Users and Scrims", "Live Discord Support"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://pracc.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/head-to-head"} />
            </div>
        </div>
    );
}