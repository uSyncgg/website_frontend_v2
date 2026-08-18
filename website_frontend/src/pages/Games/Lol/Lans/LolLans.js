import { SeoData, HostBanner, NoEvents, LanMap } from "components";
import '../../EventBanners.css';

import { LOL_LAN_MARKERS } from 'data/lanMarkers';

export const LolLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"League of Legends LANs"}
                description="League of Legends LANs near you. Find a LAN that is closest to you on our world renown LAN map."
                canonicalPath={"/games/LoL/lans"}
            />

            <div className="lanMapContainer">
                <LanMap markers={LOL_LAN_MARKERS} game="LoL" />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                {/* <NoEvents pageType={"LANs"} /> */}

                <HostBanner>
                    <HostBanner.Title path={"/lans/5v5-pittsburgh-goat-gamers-lounge"}>5v5 Pittsburgh - Goat Gamers Lounge</HostBanner.Title>
                    <HostBanner.Image
                        path={"/lans/5v5-pittsburgh-goat-gamers-lounge"}
                        imgUrl={"https://i.imgur.com/VXdSRXE.png"}
                        alt={"5v5 Pittsburgh - Goat Gamers Lounge"}
                        verified={false}
                    />
                    <HostBanner.Region>Pittsburgh, PA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/5v5-pittsburgh-goat-gamers-lounge"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
