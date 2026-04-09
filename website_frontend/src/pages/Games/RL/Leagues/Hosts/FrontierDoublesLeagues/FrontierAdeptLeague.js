import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const FrontierAdeptLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Adept League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Multiple Seasons Annually"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Salary Determined by MMR", "10 Week Season", "Hosted on NA East, Open to Any Region", "Not a Draft League"]} regionTitle={"Region/Type"} regionInfoList={["2v2 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Salary Cap of 36"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://fdl.gg/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/frontier-doubles-leagues"} />
            </div>
        </div>
    );
}
