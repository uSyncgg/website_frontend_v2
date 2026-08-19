import { useMemo, useState } from "react";
import { SeoData, HostBanner, LanMap, EventListFilters } from "components";
import { HALO_LAN_MARKERS } from 'data/lanMarkers';
import '../../EventBanners.css';

const LANS = [
    { name: "Game And Geek Expo 2026", path: "/lans/game-and-geek-2026", imgUrl: "https://i.imgur.com/pR1izqw.png", alt: "Game And Geek Expo 2026", verified: false, region: "Raleigh, NC", buttonTitle: "More Info" },
    { name: "Ozokucon 2026", path: "/lans/ozokucon-2026", imgUrl: "https://i.imgur.com/ZGIrDlo.png", alt: "Ozokucon 2026", verified: false, region: "Port Huron, MI", buttonTitle: "More Info" },
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

export const HaloLans = () => {
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
                title={"Halo LANs"}
                description="Halo LAN tournaments near you and across the world. Find the closest Halo LAN to you today."
                canonicalPath={"/games/halo/lans"}
            />

            <div className="lanMapContainer">
                <LanMap markers={HALO_LAN_MARKERS} game="Halo" />
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
