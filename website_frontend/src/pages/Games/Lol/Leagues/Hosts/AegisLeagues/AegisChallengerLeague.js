import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const AegisChallengerLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"aegisLOLLeagues"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Prize Pool TBD", "16 - 32 Teams", "Live Streamed Matches", "Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$300 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/dBtt7Fg9jv"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/aegis-leagues"} />
            </div>
        </div>
    );
}
