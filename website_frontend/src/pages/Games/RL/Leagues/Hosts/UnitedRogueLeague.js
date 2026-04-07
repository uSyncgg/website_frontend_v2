import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const UnitedRogueLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"United Rogue League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["2 Seasons Annually"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["32 Franchises over 5 League System", "8 Week Regular Season, 4 Week Playoffs", "Group Stage Playoffs into Single Elimination Bracket", "2 Conferences with 4 Divisions in Each League", "Enforced Salary Caps for Competitiveness", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Ages 16+"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://rl.unitedrogue.com/"} />
            </div>
        </div>
    );
}
