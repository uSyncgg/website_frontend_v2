import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const OldHeadsCircuitLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Old Heads Circuit"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Late-Fall Seasons (Estimated)"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Two Divisions: Division A and Division B", "Division A: $1,000 Prize Pool", "Division B: ~$500 Prize Pool", "4v4 CDL Ruleset", "Draft League, Sign Up Solo", "Regular Season and Playoffs", "Ages 27+ and No Longer Competing", "8s, Tournaments, Leagues, and More"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - All Regions"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Solo Entry Fee: $20", "Membership Fee: $3.99 per month"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.gg/xPsJpNrAfd"} />
            </div>
        </div>
    );
}