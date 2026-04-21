import { SeoData, HeaderImage, EventTypeImages } from "components";

export const Valorant = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find Valorant esports events. Browse head-to-head scrim finders, leagues, and wager platforms for Valorant players of all skill levels."
                canonicalPath={"/games/Valorant"}
            />
            <HeaderImage imageClass={"valGamePage"} />
            <EventTypeImages page={"Valorant"} />
        </div>
    );
}
