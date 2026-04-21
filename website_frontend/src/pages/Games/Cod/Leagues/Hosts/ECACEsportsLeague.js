import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const ECACEsportsLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Call of Duty league for ECAC members. 8 week long regular season and playoffs to prove your skillset."
                canonicalPath={"/games/call-of-duty/leagues/ecac"}
            />
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
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.gg/ecacesports"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}