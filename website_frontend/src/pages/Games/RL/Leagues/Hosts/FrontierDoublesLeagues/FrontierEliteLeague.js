import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const FrontierEliteLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Frontier Double Rocket League league. 1600 - 1799 MMR. Sign up for this 2v2 North American league today on uSync."
                canonicalPath={"/games/RocketLeague/leagues/frontier-doubles-leagues/elite"}
            />
            <HeaderImage title={"Elite League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Multiple Season Annually"]} regionTitle={"Region/Type"} regionInfoList={["2v2 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Salary Determined by MMR", "10 Week Season", "Hosted on NA East, Open to Any Region", "Not a Draft League"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Salary Cap of 37.5"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://fdl.gg/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/frontier-doubles-leagues"} />
            </div>
        </div>
    );
}
