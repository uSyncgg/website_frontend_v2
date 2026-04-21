import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const HaloRecLeagueScrimsH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Halo Recreational XP matches. Free to play matches against other Halo rec teams to practice with your teammates."
                canonicalPath={"/games/halo/head-to-head/rec-xp"}
            />
            <HeaderImage title={"Halo Rec League Scrims"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Finder / 8s Lobbies"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Scrim Finder for Casual - Competitive Players", "Schedule Matches & Times Manually", "Medium User Base with Many Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/Ge4eCfFTdB"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/head-to-head"} />
            </div>
        </div>
    );
}