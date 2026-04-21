import { SeoData, HeaderImage, EventTypeImages } from "components";

export const Halo = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Halo and Halo Infinite LANs, leagues, wagers, tournaments, and head-to-head matches from across the globe. Find your next event today."
                canonicalPath={"/games/halo"}
            />
            <HeaderImage imageClass={"haloGamePage"} />
            <EventTypeImages page={"Halo"} />
        </div>
    );
}
