import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const EGFCLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"EGFC League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Fall - Spring Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Two 8 Week Seasonal Splits", "4 Week Playoffs", "Small Number of Teams", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD", "Must be in a D1 Varisty Esports Program"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.egf.gg/"} />
            </div>
        </div>
    );
}