import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const TitanImmortalLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Titan Immortal League - League of Legends"}
                description="Titan Immortal League. 600LP cap League of Legends league for those that are looking to improve their game and make some money."
                canonicalPath={"/games/LoL/leagues/titan-leagues/immortal"}
            />
            <HeaderImage imageClass={"titanLOLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Summer, Fall, and Winter Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1st Place = 35% - 2nd Place = 15% - 3rd/4th Place = 5% - Operators = 40%", "Top 16 Teams Advance to Playoffs", "Fearless Draft", "Support on Discord", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$150 Entry Fee", "$50 Forfeit Deposit", "1200 LP Cap S16", "1000 LP Cap S15 / 14-3"]} footer={<ExternalButton host={"Titan Immortal League"} blank={true} title={"Join Now"} path={"https://discord.gg/6W6thQEfGn"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/titan-leagues"} />
            </div>
        </div>
    );
}
