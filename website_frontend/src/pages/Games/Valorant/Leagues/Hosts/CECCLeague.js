import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CECCLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"CECC League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["4 Regional Divisions", "Regional Qualifiers & Regional Tournaments", "LAN Finals", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry - Must be a FULL TIME College Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://collegiatesmg.com/esportsu/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/leagues"} />
            </div>
        </div>
    );
}
