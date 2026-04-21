import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const NemesisChallengerLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Nemesis Challenger League is a Rocket League league with a 1453 - 1609 MMR range. Join this spring and showcase your skills at the highest level."
                canonicalPath={"/games/RocketLeague/leagues/nemesis-leagues/challenger"}
            />
            <HeaderImage title={"Nemesis Challenger"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000+ Prize Pool (Estimated)", "4 Different Divisions", "18 Match Regular Season", "Draft Based League"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1499 - 1607 MMR"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/nemesisrl"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/nemesis-leagues"} />
            </div>
        </div>
    );
}
