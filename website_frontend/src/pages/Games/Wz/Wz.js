import { SeoData, HeaderImage, EventTypeImages } from "components";

export const Wz = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find Warzone esports events. Browse head-to-head matches, LAN events, leagues, and wager platforms for Call of Duty Warzone players of all skill levels."
                canonicalPath={"/games/warzone"}
            />
            <HeaderImage imageClass={"wzGamePage"} />
            <EventTypeImages page={"Warzone"} />
        </div>
    );
}
