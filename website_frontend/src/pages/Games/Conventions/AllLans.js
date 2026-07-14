import { SeoData } from "components";
import { ALL_LAN_MARKERS } from 'data/lanMarkers';
import { lazy, Suspense } from 'react';

const LanMap = lazy(() => import('components/LanMap/LanMap').then(m => ({ default: m.LanMap })));

export const AllLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find all esports LAN events across every game title on an interactive map. Browse upcoming in-person gaming tournaments and LAN parties near you."
                canonicalPath={"/lans/all"}
            />

            <Suspense fallback={<div style={{ minHeight: 400 }} />}>
                <div className="lanMapContainer">
                    <LanMap markers={ALL_LAN_MARKERS} showAllGames={true} />
                </div>
            </Suspense>
        </div>
    )
}
