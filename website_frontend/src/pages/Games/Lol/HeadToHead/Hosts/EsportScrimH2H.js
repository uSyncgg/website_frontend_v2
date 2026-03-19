import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const EsportScrimH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Esport Scrim"} imageClass={"eventPage"} />

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
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://esportscrim.com/"} />
            </div>
        </div>
    );
}