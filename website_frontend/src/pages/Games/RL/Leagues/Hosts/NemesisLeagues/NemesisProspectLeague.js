import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const NemesisProspectLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Nemesis Prospect"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000 Prize Pool (Estimated)", "4 Different Divisions", "18 Match Regular Season", "Draft Based League"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1320 - 1498 MMR"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/nemesisrl"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/nemesis-leagues"} />
            </div>
        </div>
    );
}
