import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const ArenaH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"The Arena | 8 Mans"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Finder / 8s Lobbies"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Scrim Finder for Competitive Players", "Live Staff Support", "Can Queue Anytime", "Small User Base with Little Matches"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} /> 
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/thearena"} />
            </div>
        </div>
    );
}
