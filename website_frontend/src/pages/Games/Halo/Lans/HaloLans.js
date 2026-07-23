import { SeoData, HostBanner, NoEvents } from "components";
import { HALO_LAN_MARKERS } from 'data/lanMarkers';
import { lazy, Suspense } from 'react';

const LanMap = lazy(() => import('components/LanMap/LanMap').then(m => ({ default: m.LanMap })));

export const HaloLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Halo LANs"}
                description="Halo LAN tournaments near you and across the world. Find the closest Halo LAN to you today."
                canonicalPath={"/games/halo/lans"}
            />

            <Suspense fallback={<div style={{ minHeight: 400 }} />}>
                <div className="lanMapContainer">
                    <LanMap markers={HALO_LAN_MARKERS} game="Halo" />
                </div>
            </Suspense>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                {/* <NoEvents pageType={"LANs"} /> */}

                <HostBanner>
                    <HostBanner.Title path={"/lans/game-and-geek-2026"}>Game And Geek Expo 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/game-and-geek-2026"} 
                        imgUrl={"https://i.imgur.com/pR1izqw.png"} 
                        alt={"Game And Geek Expo 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Raleigh, NC</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/game-and-geek-2026"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/sfge-2026"}>Southern-Fried Gaming Expo 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/sfge-2026"} 
                        imgUrl={"https://i.imgur.com/1UtSmN5.png"} 
                        alt={"Southern-Fried Gaming Expo 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Atlanta, GA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/sfge-2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/citadel-i"}>Citadel I</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/citadel-i"} 
                        imgUrl={"https://i.imgur.com/NXXgHBk.png"} 
                        alt={"Citadel I"}
                        verified={false}
                    />
                    <HostBanner.Region>Lakewood, CO</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/citadel-i"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/oh-yoshi-di-int-rehatched"}>Oh Yoshi Di-int Rehatched</HostBanner.Title>
                    <HostBanner.Image
                        path={"/lans/oh-yoshi-di-int-rehatched"}
                        imgUrl={"https://i.imgur.com/hXqNfnx.png"}
                        alt={"Oh Yoshi Di-int Rehatched"}
                        verified={false}
                    />
                    <HostBanner.Region>Visalia, CA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/oh-yoshi-di-int-rehatched"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
