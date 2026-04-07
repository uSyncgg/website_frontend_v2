import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const NationalStudentEsportsLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"NSE League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, Fall, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["£1,000 Total Prize Pool (Estimated)", "3 Divisions, Move Up Divisions Based on Placing", "3 Week Regular Season", "4 Week Playoffs and Swiss", "Women Only League and an Open League", "LAN Finals", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - UK"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - Must be Attending University"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.nse.gg/events/"} />
            </div>
        </div>
    );
}
