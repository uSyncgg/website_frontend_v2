import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const SaunaScrimsH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Sauna Scrims"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Finder / 8s Lobbies"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Scrim Finder for Casual - Competitive Players", "Schedule Matches & Times Manually", "Smaller User Base with Few Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/cCVjpAvUdz"} />
            </div>
        </div>
    );
}