import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const Volan2026 = () => {
    return (
        <div className="standardContainer">
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
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://www.start.gg/tournament/volan-2026/details"} />
            </div>
        </div>
    );
}
