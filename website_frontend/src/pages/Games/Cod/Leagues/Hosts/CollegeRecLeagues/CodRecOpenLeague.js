import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const CodRecOpenLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Cod Rec Open League"} imageClass={"eventsPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Recreational", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Sign up as Solo or Duo"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.google.com/url?q=https%3A%2F%2Fcod.esrl.gg%2F&sa=D&sntz=1&usg=AOvVaw359r5MIeBPnIT5_Guhelh-"} />
            </div>
        </div>
    );
}
