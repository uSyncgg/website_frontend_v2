import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const EGFHLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"EGFH League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Two 8 Week Seasonal Splits", "Regional and National Championships", "National Championship Held on LAN", "Live Streamed Matched"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - Must be a High School Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.egf.gg/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
