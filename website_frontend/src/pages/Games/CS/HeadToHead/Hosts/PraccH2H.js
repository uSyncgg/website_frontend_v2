import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const PraccH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Pracc"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Finder"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["All Levels of Competition", "Various Different Platforms to Use", "NO Game Server Provided", "Large Number of Users Searching for Scrims", "Live Discord Support"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://pracc.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/head-to-head"} />
            </div>
        </div>
    );
}