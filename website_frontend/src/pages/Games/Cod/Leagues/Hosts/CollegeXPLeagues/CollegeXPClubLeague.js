import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const CollegeXPClubLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"CXP Club"} imageClass={"eventsPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Club + Other Teams", "No Scholarships", "Top Club teams in previous year must compete in varsity", "Prize Pool: 100% Club Entry Fee", "Pre-Season and In-Season Tournaments", "Region/Conference Based Regular Season", "Live Streamed Matches", "Double Elimination Playoff Bracket"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$80 per Team", "$100 Late Entry per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://x.com/CXPCoD"} />
            </div>
        </div>
    );
}