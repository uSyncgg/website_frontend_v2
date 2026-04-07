import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const PremierCircuitLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"The Premier Circuit League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000 Prize Pool", "Stats for Every Game", "Live Streamed Matches", "Qualifier Tournament to Enter", "4v4 CDL Variant", "16 Teams MAX"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - DM to Enter"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://x.com/TPCircuit"} />
            </div>
        </div>
    );
}