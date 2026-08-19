import { useMemo, useState } from "react";
import { SeoData, HostBanner, LanMap, EventListFilters } from "components";
import { COD_LAN_MARKERS } from 'data/lanMarkers';
import '../../EventBanners.css';

const LANS = [
    { name: "EWGL 3", path: "/lans/ewgl3", imgUrl: "https://i.imgur.com/7o2e5a3.png", alt: "EWGL 3", verified: false, region: "St Johns, FL", buttonTitle: "More Info" },
    { name: "Shinto Champs", path: "/lans/shintochamps2026", imgUrl: "https://i.imgur.com/0TKXrhh.png", alt: "Shinto Champs", verified: false, region: "Columbus, OH", buttonTitle: "More Info" },
    { name: "GA:CoD Modern Warfare 4 Launch Tournament", path: "/lans/ga-cod-modern-warfare-4-launch-tournament", imgUrl: "https://i.imgur.com/EWYDkHI.png", alt: "GA:CoD Modern Warfare 4 Launch Tournament", verified: false, region: "Columbus, OH", buttonTitle: "More Info" },
    { name: "California Tier List LAN", path: "/lans/california-tier-list-lan", imgUrl: "https://i.imgur.com/1fHItii.png", alt: "California Tier List LAN", verified: false, region: "Lake Forest, CA", buttonTitle: "More Info" },
];

const REGION_OPTIONS = Array.from(new Set(LANS.map(l => l.region)));

const applyFiltersAndSort = (list, { selectedRegions, verifiedOnly, sort }) => {
    let result = list.filter(l =>
        (selectedRegions.length === 0 || selectedRegions.includes(l.region)) &&
        (!verifiedOnly || l.verified)
    );

    if (sort === 'az') {
        result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'za') {
        result = result.slice().sort((a, b) => b.name.localeCompare(a.name));
    } else {
        result = result.slice().sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
    }

    return result;
};

const LanBanner = ({ lan }) => (
    <HostBanner path={lan.path}>
        <HostBanner.Title path={lan.path} verified={lan.verified}>{lan.name}</HostBanner.Title>
        <HostBanner.Image
            path={lan.path}
            imgUrl={lan.imgUrl}
            alt={lan.alt}
        />
        <HostBanner.Region>{lan.region}</HostBanner.Region>
        <HostBanner.Button title={lan.buttonTitle} path={lan.path} />
    </HostBanner>
);

export const CodLans = () => {
    const [sort, setSort] = useState('featured');
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const filteredLans = useMemo(
        () => applyFiltersAndSort(LANS, { selectedRegions, verifiedOnly, sort }),
        [sort, selectedRegions, verifiedOnly]
    );

    const clearFilters = () => {
        setSelectedRegions([]);
        setVerifiedOnly(false);
    };

    return (
        <div className="standardContainer minorBottomSpace">
            <SeoData
                title={"Call of Duty LANs"}
                description="Call of Duty LAN tournaments near you. Find the closest Call of Duty LANs to where you live and work. Every LAN going on near you."
                canonicalPath={"/games/call-of-duty/lans"}
            />
            <div className="lanMapContainer">
                <LanMap markers={COD_LAN_MARKERS} game="CoD" />
            </div>

            <EventListFilters
                sort={sort}
                onSortChange={setSort}
                regionOptions={REGION_OPTIONS}
                selectedRegions={selectedRegions}
                onRegionChange={setSelectedRegions}
                verifiedOnly={verifiedOnly}
                onVerifiedChange={setVerifiedOnly}
                resultCount={filteredLans.length}
                onClear={clearFilters}
            />

            {filteredLans.length === 0 ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>No results match your filters.</h2>
            ) : (
                <div className="eventBannerContainer">
                    {filteredLans.map(lan => (
                        <LanBanner key={lan.path} lan={lan} />
                    ))}
                </div>
            )}
        </div>
    );
}
