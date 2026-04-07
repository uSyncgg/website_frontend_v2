import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const LockdownLowersLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"lockdownCODLeagues"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$284 Prize Pool", "Diamond 1 & below", "4v4 CDL Variant Ruleset", "Playoffs after Regular Season", "Solo Registration - Draft Format", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - All Regions (NA Based)"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.gg/SMZ4R8XzWZ"} />
            </div>
        </div>
    );
}