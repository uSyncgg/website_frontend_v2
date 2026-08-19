import { useMemo, useState } from "react";
import { SeoData, HostBanner, NoEvents, LanMap, EventListFilters } from "components";
import { WZ_LAN_MARKERS } from 'data/lanMarkers';
import '../../EventBanners.css';

const LANS = [];

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

export const WzLans = () => {
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
                title={"Warzone LANs"}
                description="Find Warzone LAN events near you. Browse in-person Call of Duty Warzone LAN tournaments and events happening across North America and beyond."
                canonicalPath={"/games/warzone/lans"}
            />

            <div className="lanMapContainer">
                <LanMap markers={WZ_LAN_MARKERS} game="Warzone" />
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
                <NoEvents pageType={"LANs"} />
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
