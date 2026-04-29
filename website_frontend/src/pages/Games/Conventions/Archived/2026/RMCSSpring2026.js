import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const RMCSSpring2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description={"Localhost Denver is putting on the Rocky Mountain Collegiate Showcase - Spring '26 Tournament."}
                canonicalPath={"/lans/rmcs-spring-2026"}
            />
            
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
                <ExternalButton blank={true} title={"Join Now"} path={"https://nerdstreet.com/events/rmcs-spring-26-tournament-2026-04-11?section=overview"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/lans"} />
            </div>
        </div>
    );
}
