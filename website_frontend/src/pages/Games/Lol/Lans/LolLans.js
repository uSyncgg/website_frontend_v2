import { SeoData, HostBanner, MapCoverGame, NoEvents, LanMap } from "components";

const LOL_LAN_MARKERS = [
    { lat: 42.2469148, lng: -83.0210947, name: "The Summoning 2026", link: "/lans/the-summoning-2026", game: 'LoL' },
];

export const LolLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="League of Legends LANs near you. Find a LAN that is closest to you on our world renown LAN map."
                canonicalPath={"/games/LoL/lans"}
            />
            
            <div className="lanMapContainer">
                <LanMap markers={LOL_LAN_MARKERS} game="LoL" />

                <MapCoverGame game={"LoL"} />
            </div>

            <div className="eventBannerContainer">
                                <div className="hrEvents" />

                {/* <NoEvents pageType={"LANs"} /> */}

                <HostBanner>
                    <HostBanner.Title path={"/lans/the-summoning-2026"}>The Summoning 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/the-summoning-2026"} 
                        imgUrl={"https://i.imgur.com/NnHleWY.png"} 
                        alt={"The Summoning 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Windsor, ON</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/the-summoning-2026"} />
                </HostBanner>
                    
                    
                <div className="hrEvents" />

                
            </div> 
        </div>
    );
}
