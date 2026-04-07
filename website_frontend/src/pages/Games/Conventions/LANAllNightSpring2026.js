import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const LANAllNightSpring2026 = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"LAN All Night Spring 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["April 23 - 26th, 2026", "Grapevine, TX"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["BYOC and Tabletop Only Weekend", "Focused Entirely on Gaming, Community, and the Core Experience", "No Vendors or Extras - Purely a BYOC LAN Event for the ages"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["BYOC: $90", "General Admission: $10 - $25"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://lanallnight.com/"} />
            </div>
        </div>
    );
}
