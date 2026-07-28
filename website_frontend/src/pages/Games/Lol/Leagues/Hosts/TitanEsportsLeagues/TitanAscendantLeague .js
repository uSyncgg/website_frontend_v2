import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const TitanAscendantLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Titan Ascendant League - League of Legends"}
                description="Titan Ascendant League is a League of Legends league with a 500 LP cap. Do you have what it takes to win the entire league?"
                canonicalPath={"/games/LoL/leagues/titan-leagues/ascendant"}
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
                    <EventInfoCard title={"Details"} infoList={["1st Place = 35% - 2nd Place = 15% - 3rd/4th Place = 5% - Operators = 40%", "Support on Discord", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$100 per Team", "Forfeit Deposit TBD", "500 LP Cap S16", "300 LP Cap S15 / 14-3"]} footer={<ExternalButton host={"Titan Ascendant League"} blank={true} title={"Join Now"} path={"https://discord.gg/6W6thQEfGn"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/titan-leagues"} />
            </div>
        </div>
    );
}
