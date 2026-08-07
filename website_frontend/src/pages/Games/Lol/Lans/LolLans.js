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

            <h1 className="lanPageTitle">League of Legends LANs</h1>

            <div className="lanMapContainer">
                <LanMap markers={LOL_LAN_MARKERS} game="LoL" />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <NoEvents pageType={"LANs"} />

                <div className="hrEvents" />
            </div>
        </div>
    );
}
