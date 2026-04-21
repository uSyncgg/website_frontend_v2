import { SeoData, HeaderImage, EventTypeImages } from "components";

export const Cod = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Call of Duty leagues, LANs, wagers, head-to-head, and tournaments. Find every type of competition from every site."
                canonicalPath={"/games/call-of-duty"}
            />
            <HeaderImage imageClass={"codGamePage"} />
            <EventTypeImages page={"Call of Duty"} />
        </div>
    );
}
