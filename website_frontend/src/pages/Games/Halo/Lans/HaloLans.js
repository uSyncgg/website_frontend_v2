import { SeoData, HostBanner, MapCoverGame, NoEvents } from "components";

export const HaloLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Halo LAN tournaments near you and across the world. Find the closest Halo LAN to you today."
                canonicalPath={"/games/halo/lans"}
            />
            <div className="lanMapContainer">
                <iframe 
                    title="Halo LAN Map" 
                    id="map" 
                    className="lanMap"
                    src="https://www.google.com/maps/d/u/2/embed?mid=1RWVPklwSmTd6iqaSgHP4LLh2WOd8Pt8&ehbc=2E312F"
                />

                <MapCoverGame game={"Halo"} />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <NoEvents pageType={"LANs"} />
                
                <div className="hrEvents" />
            </div>
        </div>
    );
}
