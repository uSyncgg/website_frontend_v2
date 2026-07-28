import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const TitanSentinelLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Titan Sentinel League - League of Legends"}
                description="Titan Sentinel League is a League of Legends league with a Masters 100 average. Do you have what it takes to win the entire league?"
                canonicalPath={"/games/LoL/leagues/titan-leagues/sentinel"}
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
                    <EventInfoCard title={"Entry Fee"} infoList={["$100 per Team", "Forfeit Deposit TBD", "M100 Avg"]} footer={<ExternalButton host={"Titan Sentinel League"} blank={true} title={"Join Now"} path={"https://discord.gg/6W6thQEfGn"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/titan-leagues"} />
            </div>
        </div>
    );
}
