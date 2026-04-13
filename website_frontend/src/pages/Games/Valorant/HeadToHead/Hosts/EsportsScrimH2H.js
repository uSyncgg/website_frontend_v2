import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const EsportsScrimH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Esports Scrim"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Finder"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["All Levels of Competition", "Live Discord Support", "Large Number of Users Searching for Scrims Daily"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Regions: NA / EUW / EUNE"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://esportscrim.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/head-to-head"} />
            </div>
        </div>
    );
}