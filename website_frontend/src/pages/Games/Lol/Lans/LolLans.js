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
                <div className="hrEvents" />

                <NoEvents pageType={"LANs"} />
                    
                <div className="hrEvents" />
            </div> 
        </div>
    );
}
