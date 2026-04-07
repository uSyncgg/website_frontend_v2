import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const PlayVSLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"PlayVS League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["8 Week Regular Season, 3 Week Playoffs", "7 Matches in Regular Season", "Multiple Regional Divisions", "No Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Contact for a Quote - Must be a High School Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.playvs.com/rocket-league"} />
            </div>
        </div>
    );
}
