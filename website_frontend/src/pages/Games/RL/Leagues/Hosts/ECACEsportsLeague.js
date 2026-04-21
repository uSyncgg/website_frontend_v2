import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const ECACEsportsLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="ECAC Esports Rocket League. 8 week regular season with playoffs and multiple rank based divisions. Must be a full time college student in the USA."
                canonicalPath={"/games/RocketLeague/leagues/ecac-esports"}
            />
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
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.gg/ecacesports"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
