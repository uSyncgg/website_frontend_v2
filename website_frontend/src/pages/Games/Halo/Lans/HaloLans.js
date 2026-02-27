import { HostBanner, MapCoverGame } from "components";

export const HaloLans = () => {
    return (
        <div className="standardContainer">
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

                <HostBanner />
                
                <div className="hrEvents" />
            </div>
        </div>
    );
}
