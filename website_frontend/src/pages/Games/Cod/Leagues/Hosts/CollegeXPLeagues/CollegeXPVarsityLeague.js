import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const CollegeXPVarsityLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"CXP Varsity"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["High Level Scholarship Players", "Prize Pool: $75% Varsity Entry Fee", "Varsity players must have the ability to compete from school facility", "Pre-Season and In-Season Tournaments", "Region/Conference Based Regular Season", "Live Streamed Matches", "Double Elimination Playoff Bracket"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$240 per Team", "$275 Late Entry per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://x.com/CXPCoD"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues/cxp-leagues"} />
            </div>
        </div>
    );
}