import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const FrontierExpertLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Frontier Expert League - Rocket League"}
                description="Rocket League league - Frontier Doubles Expert. 2v2 NA league where players must be from 1200 - 1399 MMR."
                canonicalPath={"/games/RocketLeague/leagues/frontier-doubles-leagues/expert"}
            />
            <HeaderImage title={"Expert League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Multiple Seasons Annually"]} regionTitle={"Region/Type"} regionInfoList={["2v2 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Salary Determined by MMR", "10 Week Season", "Hosted on NA East, Open to Any Region", "Not a Draft League"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Salary Cap of 42"]} footer={<ExternalButton host={"Expert League"} blank={true} title={"Join Now"} path={"https://fdl.gg/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/frontier-doubles-leagues"} />
            </div>
        </div>
    );
}
