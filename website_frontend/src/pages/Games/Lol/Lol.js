import { SeoData, HeaderImage, EventTypeImages } from "components";

export const Lol = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="League of Legends LANs, leagues, tournaments, head-to-head, and wagers from every site on Google. Earn money playing League of Legends."
                canonicalPath={"/games/LoL"}
            />
            <HeaderImage imageClass={"lolGamePage"} />
            <EventTypeImages page={"League of Legends"} />
        </div>
    );
}
