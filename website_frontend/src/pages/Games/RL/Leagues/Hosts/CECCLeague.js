import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const CECCLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"CECC League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Qualifiers and Grand Championship"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["4 Regional Divisions", "Regional Qualifiers & Regional Tournaments", "LAN Finals", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - Must be a FULL TIME College Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.collegiatesmg.com/cecc"} />
            </div>
        </div>
    );
}
