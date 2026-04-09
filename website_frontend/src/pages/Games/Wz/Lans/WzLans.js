import { HostBanner, MapCoverGame, NoEvents } from "components";

export const WzLans = () => {
    return (
        <div className="standardContainer">
            <div className="lanMapContainer">
                <iframe 
                    title="Warzone LAN Map" 
                    id="map" 
                    className="lanMap"
                    src="https://www.google.com/maps/d/u/2/embed?mid=1a5JsmB31CsSiOh4SWPvXNfESQdpvrvA&ehbc=2E312F"
                />

                <MapCoverGame game={"Warzone"} />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                {/* <HostBanner /> */}

                <NoEvents pageType={"LANs"} />

                <div className="hrEvents" />
            </div>
        </div>
    );
}
