import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const LANAllNightSpring2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="LAN All Night is here for all your LAN needs this spring! Bring Your Own Computer (BYOC) and game with tons of similar people!"
                canonicalPath={"/lans/lan-all-night-spring-26"}
            />

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
                <ExternalButton blank={true} title={"Join Now"} path={"https://lanallnight.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
