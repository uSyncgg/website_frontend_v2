import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const TitanOlympusLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Titan Olympus League - League of Legends"}
                description="Titan Esports League Olympus league for League of Legends players with a ranking of Diamond 4. Play every Thursday each week during the season."
                canonicalPath={"/games/LoL/leagues/titan-leagues/olympus"}
            />
            <HeaderImage title={"Titan Olympus League"} imageClass={"titanLOLLeagues"} />

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
                    <EventInfoCard title={"Entry Fee"} infoList={["$75 per Team", "$50 Forfeit Deposit", "Diamond 4 Cap"]} footer={<ExternalButton host={"Titan Olympus League"} blank={true} title={"Join Now"} path={"https://discord.gg/6W6thQEfGn"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/titan-leagues"} />
            </div>
        </div>
    );
}
