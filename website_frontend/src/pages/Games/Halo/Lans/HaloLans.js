import { SeoData, HostBanner, NoEvents, LanMap } from "components";
import { HALO_LAN_MARKERS } from 'data/lanMarkers';
import '../../EventBanners.css';

export const HaloLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Halo LANs"}
                description="Halo LAN tournaments near you and across the world. Find the closest Halo LAN to you today."
                canonicalPath={"/games/halo/lans"}
            />

            <div className="lanMapContainer">
                <LanMap markers={HALO_LAN_MARKERS} game="Halo" />
            </div>

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
                    <HostBanner.Title path={"/lans/ozokucon-2026"}>Ozokucon 2026</HostBanner.Title>
                    <HostBanner.Image
                        path={"/lans/ozokucon-2026"}
                        imgUrl={"https://i.imgur.com/ZGIrDlo.png"}
                        alt={"Ozokucon 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Port Huron, MI</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/ozokucon-2026"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
