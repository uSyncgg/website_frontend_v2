import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const MACSSpring2026 = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"MACS Spring 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["April 17 - 19th, 2026", "Philadelphia, PA"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Custom Trophy for Winner", "League of Legends 5v5 Format", "Collegiate Full-Time Students ONLY", "League of Legends Tournament with Round Robin Format", "Double Elimination Bracket", "Overwatch, Valorant, and Rocket League Tournaments"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $125"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://nerdstreet.com/events/mid-atlantic-collegiate-series-macs-collegiate-community-tournaments-2026-04-17?section=overview"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/lans"} />
            </div>
        </div>
    );
}
