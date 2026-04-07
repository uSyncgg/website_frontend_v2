import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const RMCSSpring2026 = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"RMCS Spring 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["April 11th, 2026", "Lakewood, CO"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Custom Trophy, T-Shirts, and Medals for Winners", "League of Legends 5v5 Format", "Collegiate Full-Time Students ONLY", "League of Legends Tournament with Round Robin Format", "Double Elimination Bracket", "Overwatch, Valorant, and Rocket League Tournaments"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $125"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://nerdstreet.com/events/rmcs-spring-26-tournament-2026-04-11?section=overview"} />
            </div>
        </div>
    );
}
