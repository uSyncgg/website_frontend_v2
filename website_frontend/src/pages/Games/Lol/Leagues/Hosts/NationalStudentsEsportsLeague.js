import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
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
                    <EventInfoCard title={"Details"} infoList={["£1,000 Total Prize Pool", "Women Only League as well as Open League", "3 Divisions, Move Up Divisions Based on Placing", "3 Week Regular Season", "4 Week Playoffs and Swiss", "Live LAN Finals (Estimated)", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - UK"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD", "Must be Attending University"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.nse.gg/tournaments/buec-spring-2026/league-of-legends-nse-spring/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues"} />
            </div>
        </div>
    );
}
