import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const NemesisRivalLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="North America's 1612 - 1779 MMR Rocket League league. Rival league is for players looking to be the best at their craft and improve in Rocket League."
                canonicalPath={"/games/RocketLeague/leagues/nemesis-leagues/rival"}
            />
            <HeaderImage title={"Nemesis Rival"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000 Prize Pool (Estimated)", "4 Different Divisions", "18 Match Regular Season", "Draft Based League"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1608 - 1745 MMR"]} />
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
