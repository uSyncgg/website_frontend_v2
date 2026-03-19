import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const UGCCollegeHaloScrimsH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"ugcPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Collegiate Scrim Finder / 8s Lobbies"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Collegiate School Scrim Finder", "Schedule Matches & Times Manually", "Large Number of Users and Matches Daily"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide", "Collegiate Teams / Students ONLY"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/CapnyyzMkJ"} />
            </div>
        </div>
    );
}