import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const AegisMarauderLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Marauder League by Aegis is a Master 600LP cap League of Legends league. Make thousands playing LoL."
                canonicalPath={"/games/LoL/leagues/aegis-leagues/marauder"}
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
                    <EventInfoCard title={"Details"} infoList={["$1,680 - $3,360 Prize Pool (Estimate)", "Live Streamed Matches", "Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$150 per Team", "$50 Forfeit Deposit", "Master 600 LP Peak from Y2025, Y2024 - S3, Y2024 - S2", "700 LP Peak from Y2024 - S1, Y2023 - S2"]} />
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
