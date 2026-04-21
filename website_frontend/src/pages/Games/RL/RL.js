import { SeoData, HeaderImage, EventTypeImages } from "components";

export const RL = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Rocket League tournaments, leagues, LANs, head-to-head, and wagers to make money playing RL. Compete in events to prove your skill."
                canonicalPath={"/games/RocketLeague"}
            />
            <HeaderImage imageClass={"rlGamePage"} />
            <EventTypeImages page={"Rocket League"} />
        </div>
    );
}
