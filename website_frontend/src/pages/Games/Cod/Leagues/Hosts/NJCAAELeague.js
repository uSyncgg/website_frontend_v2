import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const NJCAAELeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"NJCAAE League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Early Spring Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["3 Skill Tiers", "7 Week Round Robin Regular Season", "Single Elimination Playoffs", "No Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$2,000/yr per school", "Must be Attending a 2 Year College Program"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.njcaaesports.org/"} />
            </div>
        </div>
    );
}