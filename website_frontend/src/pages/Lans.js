import { GameImage, HeaderImage, EventTypeImages } from "components";

export const Lans = () => {
    return (
        <div className="standardContainer">
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