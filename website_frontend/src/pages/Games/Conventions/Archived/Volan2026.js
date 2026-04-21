import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const Volan2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description={"The annual Esports Tournament hosted by the student run Esports Club at the University of Tennessee. The event is focused on providing an in-person LAN experience to college esports teams and clubs in the Southeast."}
                canonicalPath={"/lans/volan-2026"}
            />

            <HeaderImage title={"Volan 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["April 10-12th, 2026", "Knoxville, TN"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["All Tournaments are BYOC (Brind Your Own Computer)", "College Students ONLY, Except for Smash", "Side Games and Food", "5+ Different Tournaments (Valorant, OW2, and More)"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["League of Legends: $20"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/volan-2026/details"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/lans"} />
            </div>
        </div>
    );
}
