import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const ArenaH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Join The Arena 8s Lobbies. Play free competitive Call of Duty matches and scrims."
                canonicalPath={"/games/call-of-duty/head-to-head/arena"}
            />
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
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/the-arena-powered-by-dg-918527675642052658"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/head-to-head"} />
            </div>
        </div>
    );
}
