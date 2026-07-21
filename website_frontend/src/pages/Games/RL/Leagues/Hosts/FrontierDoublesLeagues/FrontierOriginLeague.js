import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const FrontierOriginLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Frontier Origin League - Rocket League"}
                description="Origin Frontier Doubles league. This Rocket League league is for players with MMR from 0 - 1199. Sign up with your duo."
                canonicalPath={"/games/RocketLeague/leagues/frontier-doubles-leagues/origin"}
            />
            <HeaderImage title={"Origin League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Multiple Seasons Annually"]} regionTitle={"Region/Type"} regionInfoList={["2v2 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Salary Determined by MMR", "10 Week Season", "Hosted on NA East, Open to Any Region", "Not a Draft League"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Salary Cap of 30"]} footer={<ExternalButton host={"Origin League"} blank={true} title={"Join Now"} path={"https://fdl.gg/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/frontier-doubles-leagues"} />
            </div>
        </div>
    );
}
