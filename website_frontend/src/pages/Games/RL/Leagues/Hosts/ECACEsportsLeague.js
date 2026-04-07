import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const ECACEsportsLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"ECAC League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Multiple Divisions Based on Rank", "Two Matches Weekly", "8 Week Regular Season with Playoffs", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$1,600/yr - Must be a FULL TIME College Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://ecac.leaguespot.gg/"} />
            </div>
        </div>
    );
}
