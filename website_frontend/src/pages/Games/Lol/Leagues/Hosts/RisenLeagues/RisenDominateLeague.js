import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const RisenDominateLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"risenLOLLeagues"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$400 Prize Pool for Every 8 Teams (70/30 Split)", "Join With Your Own Team", "Live Streamed Matches", "Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$70 per Team", "Masters 100 LP Cap", "1 Masters 200 LP Allowed"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/risenesports"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/risen-leagues"} />
            </div>
        </div>
    );
}
