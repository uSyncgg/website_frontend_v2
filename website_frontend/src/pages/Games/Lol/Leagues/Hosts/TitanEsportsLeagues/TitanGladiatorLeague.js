import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const TitanGladiatorLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Titan Gladiator League - League of Legends"}
                description="Titan Gladiator League. The League of Legends league with a Platinum 4 cap. Sign up before spots sell out."
                canonicalPath={"/games/LoL/leagues/titan-leagues/gladiator"}
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
                    <EventInfoCard title={"Details"} infoList={["1st Place = 35% - 2nd Place = 15% - 3rd/4th Place = 5% - Operators = 40%", "9 Week Round Robin Group Stage", "3 Week Playoffs", "Standard Draft", "Support on Discord"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$25 per Team", "$25 Forfeit Deposit", "Platinum 4 Cap"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://lol.titanesports.org/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/titan-leagues"} />
            </div>
        </div>
    );
}
