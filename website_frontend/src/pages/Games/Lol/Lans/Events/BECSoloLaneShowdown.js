import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const BECSoloLaneShowdown = () => {
    return (
        <div className="standardContainer">
            <SeoData 
                description={"Step into the solo lane and prove you're the best 1v1 player in Bakersfield. First Blood, 100 CS, or First Tower — one goal, one winner. Sign yourself up today to earn cash."}
                canonicalPath={"/lans/bec-sololane-showdown"}
            />
            
            <HeaderImage title={"BEC Solo Lane Showdown"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["June 14th, 2026", "Bakersfield, CA"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$Prize Pool Based on Entrants"
                        , "1v1 Solo Lane League of Legends"
                        , "Live Streamed on Twitch"
                        , "5PM Local Start Time"
                        ,"Double Elimination, BO1 (BO3 for Finals Rounds)"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Online Registration: $20","At Door Registration: $30"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/bec-solo-lane-showdown-league-of-legends-1v1/details"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/lans"} />
            </div>
        </div>
    );
}
