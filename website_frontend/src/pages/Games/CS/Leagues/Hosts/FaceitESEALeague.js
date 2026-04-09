import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const FaceitESEALeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"faceitEseaPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Year Round Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$76,600 Prize Pool", "4 Week Regular Season", "2-3 Week Playoffs", "Different Divisions Based on Placement", "Road to The Professional ESL Pro League", "Start in Open Division"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - Available Worldwide"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["ESEA League Pass: $81.59/yr"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.faceit.com/en/cs2/league/ESEA%20League/a14b8616-45b9-4581-8637-4dfd0b5f6af8"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues"} />
            </div>
        </div>
    );
}