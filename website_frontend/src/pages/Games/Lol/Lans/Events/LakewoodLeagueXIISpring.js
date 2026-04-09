import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const LakewoodLeagueXIISpring = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Lakewood League XII - Spring"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["April 26th, 2026", "Lakewood, CO"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$750 Prize Pool ($500 1st, $250 2nd)", "16 Teams MAX (Two Brackets of 8 each)", "Community 10mans Starting after Groups", "Giveaway items"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $150"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://nerdstreet.com/events/lakewood-league-xii-2026-04-26?section=overview"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/lans"} />
            </div>
        </div>
    );
}
