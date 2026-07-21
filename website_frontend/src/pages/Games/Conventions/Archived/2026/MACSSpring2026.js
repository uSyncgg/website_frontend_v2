import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const MACSSpring2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData 
                title={"MACS Spring 2026 Convention"}
                description={"Every player planning to attend this event must receive a ranking before forming a roster. You must join our discord and put your name in the “player-rating” text channel under the general section. "}
                canonicalPath={"/lans/macs-spring-2026"}
            />
            <HeaderImage title={"MACS Spring 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["April 17 - 19th, 2026", "Philadelphia, PA"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Custom Trophy for Winner", "League of Legends 5v5 Format", "Collegiate Full-Time Students ONLY", "League of Legends Tournament with Round Robin Format", "Double Elimination Bracket", "Overwatch, Valorant, and Rocket League Tournaments"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $125"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://nerdstreet.com/events/mid-atlantic-collegiate-series-macs-collegiate-community-tournaments-2026-04-17?section=overview"} />}/> 
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/lans"} />
            </div>
        </div>
    );
}
