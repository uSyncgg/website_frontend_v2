import { HostBanner, MapCoverGame } from "components";
export const Conventions = () => {
    return (
        <div className="standardContainer">
            <div className="lanMapContainer">
                <iframe 
                    title="LAN Map" 
                    id="map" 
                    className="lanMap"
                    src="https://www.google.com/maps/d/u/2/embed?mid=14BPiOYVAOTLrIFgUNrLdViUMRoypuU4&ehbc=2E312F"
                />

                <MapCoverGame />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/immersecon-2026"}>ImmerseCon 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/immersecon-2026"} 
                        imgUrl={"https://i.imgur.com/fwRdpTT.png"} 
                        alt={"ImmerseCon 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Richmond, VA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/immersecon-2026"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/lan-all-night-spring-2026"}>LAN All Night</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/lan-all-night-spring-2026"} 
                        imgUrl={"https://i.imgur.com/JYplRtG.png"} 
                        alt={"LAN All Night Spring 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Grapevine, TX</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/lan-all-night-spring-2026"} />
                </HostBanner>
                <div className="hrEvents" />
            </div>
        </div>
    );
}
