import { SeoData, HostBanner, MapCoverGame } from "components";

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

                <HostBanner>
                    <HostBanner.Title path={"/lans/lakewood-league-xii-spring"}>Lakewood League XII Spring</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/lakewood-league-xii-spring"} 
                        imgUrl={"https://i.imgur.com/IbpZc52.png"} 
                        alt={"Lakewood League XII Spring"}
                        verified={false}
                    />
                    <HostBanner.Region>Lakewood, CO</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/lakewood-league-xii-spring"} />
                </HostBanner>

                <div className="hrEvents" />
            </div> 
        </div>
    );
}
