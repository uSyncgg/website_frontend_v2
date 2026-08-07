import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const TitanDivinityLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Titan Divinity League - League of Legends"}
                description="Calling all League of Legends players that are lower rank than Emerald 4. Risen Divinity League is the perfect league for you."
                canonicalPath={"/games/LoL/leagues/titan-leagues/divinity"}
            />
            <HeaderImage title={"Titan Divinity League"} imageClass={"titanLOLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Summer, Fall, and Winter Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1st Place = 35% - 2nd Place = 15% - 3rd/4th Place = 5% - Operators = 40%", "Top 4 From Each Group Advance to Playoffs", "Fearless Draft", "Support on Discord", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$50 per Team", "$50 Forfeit Deposit", "Emerald 4 Cap"]} footer={<ExternalButton host={"Titan Divinity League"} blank={true} title={"Join Now"} path={"https://discord.gg/6W6thQEfGn"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/titan-leagues"} />
            </div>
        </div>
    );
}
