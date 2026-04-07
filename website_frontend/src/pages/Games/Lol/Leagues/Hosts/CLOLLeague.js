import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const CLOLLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"CLOLPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Fall Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$22k Player Scholarship & $11k Sub/Staff Prize Pool", "Top 1-4 Depending on Conference Play for Prize Pool", "Live Streamed Matches", "Live Support on Discord"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry - Must be a FULL TIME College Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/clol"} />
            </div>
        </div>
    );
}
