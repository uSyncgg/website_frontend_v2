import { SeoData, HostBanner, NoEvents, LanMap } from "components";

import { LOL_LAN_MARKERS } from 'data/lanMarkers';
import { lazy, Suspense } from 'react';

const LanMap = lazy(() => import('components/LanMap/LanMap').then(m => ({ default: m.LanMap })));

export const LolLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"League of Legends LANs"}
                description="League of Legends LANs near you. Find a LAN that is closest to you on our world renown LAN map."
                canonicalPath={"/games/LoL/lans"}
            />

            <Suspense fallback={<div style={{ minHeight: 400 }} />}>
                <div className="lanMapContainer">
                    <LanMap markers={LOL_LAN_MARKERS} game="LoL" />
                </div>
            </Suspense>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <NoEvents pageType={"LANs"} />

                <div className="hrEvents" />
            </div>
        </div>
    );
}
