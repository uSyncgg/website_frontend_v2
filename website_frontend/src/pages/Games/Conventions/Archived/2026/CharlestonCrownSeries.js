import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CharlestonCrownSeries = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="The most reputable LAN host is back hosting a Call of Duty LAN event - Charleston Crown Series. Compete against teams in-person for $3k in prizing."
                canonicalPath={"/lans/charleston-crown-series"}
            />
            <HeaderImage imageClass={"charlestonCrownPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["April 18 - 19th, 2026", "Charleston, SC"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$3,000 Prize Pool, Based on Entrants", "4v4 CDL Ruleset", "Pool Play into Double Elimination", "15 Minutes from Airport", "Live Streamed Matches"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $300", "VIP Team Pass: $400"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://x.com/TeamBasai/status/2015205573680107861"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
