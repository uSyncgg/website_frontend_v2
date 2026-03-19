import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const CmgH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"cmgPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free XP Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["24/7 Live Support", "Consistent Rule Updates", "Large Number of Users and Matches Daily", "Ranked Ladder by Wins"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide", "US State Restrictions: AZ, IA, MS, MT, NV, and SD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.checkmategaming.com/ladders"} />
            </div>
        </div>
    );
}