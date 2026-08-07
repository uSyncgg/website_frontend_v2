import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const NemesisProvisionalLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Nemesis Provisional - Rocket League"}
                description="Nemesis Provisional League is a Rocket League league with a 835 - 1202 MMR range. Join this spring and showcase your skills."
                canonicalPath={"/games/RocketLeague/leagues/nemesis-leagues/provisional"}
            />
            <HeaderImage title={"Nemesis Provisional"} imageClass={"nemesisRLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring Season"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000+ Prize Pool (Estimated)", "4 Different Divisions", "18 Match Regular Season", "Draft Based League"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "835 - 1202 MMR"]} footer={<ExternalButton host={"Nemesis Provisional"} blank={true} title={"Join Now"} path={"https://discord.com/invite/nemesisrl"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/nemesis-leagues"} />
            </div>
        </div>
    );
}
