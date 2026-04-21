import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const NECCLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="NECC Rocket League college league. $6,000 prize pool with multiple skill divisions. 6 week regular season with playoffs. Must be a full time college student."
                canonicalPath={"/games/RocketLeague/leagues/necc"}
            />
            <HeaderImage title={"NECC League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$6,000 Prize Pool (Estimated)", "Multiple Skill Divisions", "6 Week Regular Season With Playoff Bracket", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$1,500/yr - Unlimited Game Title Participation", "$800/yr - One Game Title Participation", "Must be a FULL TIME College Student and ACADEMICALLY ELIGIBLE"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.neccgames.com/landing/index"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
