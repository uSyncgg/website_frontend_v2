import { SeoData, HeaderImage, EventTypeImages } from "components";

export const CS = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Counter-Strike 2 Leagues, LANs, Wagers, Head-To-Head, and Tournaments all in one place. Try the true competitive experience today."
                canonicalPath={"/games/CS2"}
            />
            <HeaderImage imageClass={"cs2GamePage"} />
            <EventTypeImages page={"CS2"} />
        </div>
    );
}
