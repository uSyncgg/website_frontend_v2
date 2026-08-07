import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const NemesisChallengerLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Nemesis Challenger - Rocket League"}
                description="Nemesis Challenger League is a Rocket League league with a 1453 - 1609 MMR range. Join this spring and showcase your skills at the highest level."
                canonicalPath={"/games/RocketLeague/leagues/nemesis-leagues/challenger"}
            />
            <HeaderImage title={"Nemesis Challenger"} imageClass={"nemesisRLLeagues"} />

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
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1535 - 1625 MMR"]} footer={<ExternalButton host={"Nemesis Challenger"} blank={true} title={"Join Now"} path={"https://discord.com/invite/nemesisrl"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/nemesis-leagues"} />
            </div>
        </div>
    );
}
