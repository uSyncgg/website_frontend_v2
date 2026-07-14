import { SeoData, HostBanner } from "components";
import { CONVENTION_MARKERS } from 'data/lanMarkers';
import { lazy, Suspense } from 'react';

const LanMap = lazy(() => import('components/LanMap/LanMap').then(m => ({ default: m.LanMap })));

export const Conventions = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find esports LAN conventions and in-person gaming events. Browse gaming conventions and multi-game LAN events happening across the country."
                canonicalPath={"/lans"}
            />
            
            <Suspense fallback={<div style={{ minHeight: 400 }} />}>
                <div className="lanMapContainer">
                    <LanMap markers={CONVENTION_MARKERS} game="Conventions" />
                </div>
            </Suspense>

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
                    <HostBanner.Title path={"/lans/the-retake"}>The Retake</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/the-retake"} 
                        imgUrl={"https://i.imgur.com/sCivztU.png"} 
                        alt={"The Retake"}
                        verified={false}
                    />
                    <HostBanner.Region>Philadelphia, PA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/the-retake"} />
                </HostBanner>
                
                <div className="hrEvents" />

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
