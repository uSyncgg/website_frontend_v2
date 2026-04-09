import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
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
                    <EventInfoCard title={"Details"} infoList={["Compete for Team Trophies", "8 Week Regular Season then Playoffs", "Multiple Skill Divisions", "No Prize Pool", "Live Streamed Matches", "Live Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$1,600/Year for ECAC Membership", "Free Entry - Must be a FULL TIME College Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://ecacsports.com/sb_output.aspx?form=235"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}