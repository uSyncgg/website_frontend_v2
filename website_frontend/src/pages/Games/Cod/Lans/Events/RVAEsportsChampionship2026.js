import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const RVAEsportsChampionship2026 = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"RVA Esports Championship 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["July 11 - 12th, 2026", "Richmond, VA"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$1,000 Prize Pool, Based on Entrants", "1v1 Championship", "Call of Duty, Super Smash Bros Ultimate, and Street Fighter 6"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Venue Fee: $55", "Spectator Pass: $35"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/rva-esports-championship-2026-1/details"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
