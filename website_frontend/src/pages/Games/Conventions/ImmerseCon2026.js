import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../EventInformation.css';

export const ImmerseCon2026 = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"ImmerseCon 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["July 11 - 12th, 2026", "Richmond, VA"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["STEM and Vidoe Game Convention", "Competitive Esports Tournaments", "VR Immersion Chamber", "Tabletop Gaming, Cosplay, and Much More", "All Passes Include Cyber Dungeon Challenge"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Single Day Pass: $30 - $40", "2 Day Pass: $50"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.immersecon.com/"} />
            </div>
        </div>
    );
}
