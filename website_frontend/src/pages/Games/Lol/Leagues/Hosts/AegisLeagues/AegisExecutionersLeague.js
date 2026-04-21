import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const AegisExecutionersLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Aegis Executioners League is for League players who are lower than diamond 4. Can you win the entire league?"
                canonicalPath={"/games/LoL/leagues/aegis-leagues/executioners"}
            />
            <HeaderImage imageClass={"aegisLOLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Leagues"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$840 - $1,680 Prize Pool (Estimate)", "Live Streamed Matches", "Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$75 per Team", "$25 Forfeit Deposit", "Diamond 4 99 LP Peak from Y2025, Y2024 - S3, Y2024 - S2", "D3 99 LP Peak from Y2024 - S1, Y2023 - S2"]} />
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
