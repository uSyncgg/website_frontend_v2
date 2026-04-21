import { SeoData, GameImage, HeaderImage, EventTypeImages } from "components";

export const Lans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find esports LAN events for your favorite game titles near you. From Call of Duty to League of Legends we have every LAN going on."
                canonicalPath={"/lans"}
            />
            <HeaderImage title={"LAN Titles"} imageClass={"lansPage"} />

            <GameImage 
                games={
                    {
                        "Call of Duty": "/games/call-of-duty/lans",
                        "Warzone": "/games/warzone/lans",
                        "Halo": "/games/halo/lans",
                        "League of Legends": "/games/LoL/lans"
                    }
                }
            />

            <EventTypeImages page={"All LANs"} />
        </div>
    );
}