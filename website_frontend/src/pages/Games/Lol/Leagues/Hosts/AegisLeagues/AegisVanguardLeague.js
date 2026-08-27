import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const AegisVanguardLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Aegis Vanguard League - League of Legends"}
                description="Aegis Protectors league is an entry level League of Legends league that has a cash prize for the winning team. Try it today."
                canonicalPath={"/games/LoL/leagues/aegis-leagues/vanguard"}
            />
            <HeaderImage title={"Aegis Vanguard League"} imageClass={"aegisLOLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,120 - $2,240 Prize Pool (Estimate)", "Live Streamed Matches", "Support on Discord"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$200 per Team", "1000 LP Peak from Y2025 and Y2024 - S3"]} footer={<ExternalButton host={"Aegis Vanguard League"} blank={true} title={"Join Now"} path={"https://discord.com/invite/dBtt7Fg9jv"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/aegis-leagues"} />
            </div>
        </div>
    );
}
