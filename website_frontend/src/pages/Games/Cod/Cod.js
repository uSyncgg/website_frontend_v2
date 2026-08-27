import { SeoData, HeaderImage, EventTypeImages } from "components";

export const Cod = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Call of Duty"}
                description="Call of Duty leagues, LANs, wagers, head-to-head, and tournaments. Find every type of competition from every site."
                canonicalPath={"/games/call-of-duty"}
            />
            <HeaderImage title={"Call of Duty"} imageClass={"codGamePage"} />
            <EventTypeImages page={"Call of Duty"} />
        </div>
    );
}
