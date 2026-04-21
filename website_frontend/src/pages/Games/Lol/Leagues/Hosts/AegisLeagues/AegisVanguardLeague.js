import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const AegisVanguardLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Aegis Protectors league is an entry level League of Legends league that has a cash prize for the winning team. Try it today."
                canonicalPath={"/games/LoL/leagues/aegis-leagues/vanguard"}
            />
            <HeaderImage imageClass={"aegisLOLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,120 - $2,240 Prize Pool (Estimate)", "Live Streamed Matches", "Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$200 per Team", "1000 LP Peak from Y2025 and Y2024 - S3"]} />
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
