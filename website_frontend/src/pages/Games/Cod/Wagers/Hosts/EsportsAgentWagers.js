import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const EsportsAgentWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"eagentPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Regular Member: 5%", "Prestige Member: 0%", "No Fee & Instant Deposits/Withdrawals"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["24/7 Live Support", "Consistent Rule Updates", "CDL Ruleset with Select GAs", "PC Reset / Monitor Cam Options", "Large Number of Users and Matches Daily"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Worldwide", "US State Restrictions: AZ, MT, and SD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://esportsagent.gg/wagers"} />
            </div>
        </div>
    );
}