import { SeoData, HostBanner, MapCoverGame } from "components";
export const Conventions = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find esports LAN conventions and in-person gaming events. Browse gaming conventions and multi-game LAN events happening across the country."
                canonicalPath={"/lans"}
            />
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

                <div className="hrEvents" />
            </div>
        </div>
    );
}
