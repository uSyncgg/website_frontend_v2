import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const NemesisNoviceLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Nemesis Novice - Rocket League"}
                description="Rocket League Novice league is being held every spring by Nemesis. Enroll your teammates today in this action packed 3v3 Rocket League league."
                canonicalPath={"/games/RocketLeague/leagues/nemesis-leagues/novice"}
            />
            <HeaderImage title={"Nemesis Novice"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring Season"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000+ Prize Pool (Estimated)", "4 Different Divisions", "18 Match Regular Season", "Draft Based League"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1203 - 1414 MMR"]} footer={<ExternalButton host={"Nemesis Novice"} blank={true} title={"Join Now"} path={"https://discord.com/invite/nemesisrl"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/nemesis-leagues"} />
            </div>
        </div>
    );
}
