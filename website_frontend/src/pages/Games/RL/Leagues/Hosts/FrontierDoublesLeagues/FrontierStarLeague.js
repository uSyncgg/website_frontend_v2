import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const FrontierStarLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Grab your duo and sign up for the Rocket League star league. with a 1400 - 1599 MMR range you can compete for cash prizes and more."
                canonicalPath={"/games/RocketLeague/leagues/frontier-doubles-leagues/star"}
            />
            <HeaderImage title={"Star League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Multiple Seasons Annually"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Salary Determined by MMR", "10 Week Season", "Hosted on NA East, Open to Any Region", "Not a Draft League"]} regionTitle={"Region/Type"} regionInfoList={["2v2 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Salary Cap of 48"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://fdl.gg/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/frontier-doubles-leagues"} />
            </div>
        </div>
    );
}
