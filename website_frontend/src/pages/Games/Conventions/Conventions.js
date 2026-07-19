import { SeoData, HostBanner, LanMap } from "components";
import { CONVENTION_MARKERS } from 'data/lanMarkers';
export const Conventions = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find esports LAN conventions and in-person gaming events. Browse gaming conventions and multi-game LAN events happening across the country."
                canonicalPath={"/lans"}
            />
            <div className="lanMapContainer">
                <LanMap markers={CONVENTION_MARKERS} game="Conventions" />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/gacs-operation-heatwave"}>GA:CS Operation Heatwave</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/gacs-operation-heatwave"} 
                        imgUrl={"https://i.imgur.com/wgR4yga.png"} 
                        alt={"GA:CS Operation Heatwave"}
                        verified={false}
                    />
                    <HostBanner.Region>Columbus, OH</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/gacs-operation-heatwave"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/hellcase-cs2-2026"}>Hellcase CS2 LAN 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/hellcase-cs2-2026"} 
                        imgUrl={"https://i.imgur.com/3vI1PAe.png"} 
                        alt={"Hellcase CS2 LAN 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Lakewood, CO</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/hellcase-cs2-2026"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
