import { SeoData, HostBanner, NoEvents } from "components";
import { WZ_LAN_MARKERS } from 'data/lanMarkers';
import { lazy, Suspense } from 'react';

const LanMap = lazy(() => import('components/LanMap/LanMap').then(m => ({ default: m.LanMap })));

export const WzLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Warzone LANs"}
                description="Find Warzone LAN events near you. Browse in-person Call of Duty Warzone LAN tournaments and events happening across North America and beyond."
                canonicalPath={"/games/warzone/lans"}
            />

            <Suspense fallback={<div style={{ minHeight: 400 }} />}>
                <div className="lanMapContainer">
                    <LanMap markers={WZ_LAN_MARKERS} game="Warzone" />
                </div>
            </Suspense>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                {/* <HostBanner /> */}

                <NoEvents pageType={"LANs"} />

                <div className="hrEvents" />
            </div>
        </div>
    );
}
