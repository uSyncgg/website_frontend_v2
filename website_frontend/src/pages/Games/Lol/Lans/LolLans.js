import { SeoData, HostBanner, MapCoverGame, NoEvents } from "components";

export const LolLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="League of Legends LANs near you. Find a LAN that is closest to you on our world renown LAN map."
                canonicalPath={"/games/LoL/lans"}
            />
            
            <div className="lanMapContainer">
                <iframe 
                    title="League of Legends LAN Map" 
                    id="map" 
                    className="lanMap"
                    src="https://www.google.com/maps/d/u/2/embed?mid=1CFHyDVMbDSwBAX2_cz3KqiCm0UY9aQQ&ehbc=2E312F"
                />

                <MapCoverGame game={"LoL"} />
            </div>

            <div className="eventBannerContainer">
                
                {/* <NoEvents pageType={"LANs"} /> */}
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/bec-sololane-showdown"}>BEC Solo Lane Showdown</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/bec-sololane-showdown"} 
                        imgUrl={"https://i.imgur.com/BhVKVln.png"} 
                        alt={"BEC Solo Lane Showdown"}
                        verified={false}
                    />
                    <HostBanner.Region>Bakersfield, CA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/bec-sololane-showdown"} />
                </HostBanner>
                    
                <div className="hrEvents" />

                
            </div> 
        </div>
    );
}
