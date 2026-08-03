import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const NemesisRivalLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Nemesis Rival - Rocket League"}
                description="North America's 1612 - 1779 MMR Rocket League league. Rival league is for players looking to be the best at their craft and improve in Rocket League."
                canonicalPath={"/games/RocketLeague/leagues/nemesis-leagues/rival"}
            />
            <HeaderImage imageClass={"nemesisRLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring Season"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000 Prize Pool (Estimated)", "4 Different Divisions", "18 Match Regular Season", "Draft Based League"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1626 - 1740 MMR"]} footer={<ExternalButton host={"Nemesis Rival"} blank={true} title={"Join Now"} path={"https://discord.com/invite/nemesisrl"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/nemesis-leagues"} />
            </div>
        </div>
    );
}
