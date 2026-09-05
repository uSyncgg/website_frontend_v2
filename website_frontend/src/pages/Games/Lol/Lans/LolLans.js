import { useMemo, useState } from "react";
import { SeoData, HostBanner, NoEvents, LanMap, EventListFilters } from "components";
import { useLanEvents } from "hooks";
import { toLanMarkers } from 'data/lanMarkers';
import { buildEventPath } from 'utils/eventPaths';
import '../../EventBanners.css';

const GAME = "League of Legends";
const MAP_GAME = "LoL";

const normalizeLan = (event) => ({
    name: event.name,
    path: buildEventPath('/lans', event.path),
    imgUrl: event.banner_img,
    alt: event.name,
    verified: !!event.verified,
    region: event.location,
    buttonTitle: "More Info",
});

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

export const LolLans = () => {
    const { data, loading, error } = useLanEvents(GAME);

    const [sort, setSort] = useState('featured');
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const allLans = useMemo(() => (data || []).map(normalizeLan), [data]);
    const markers = useMemo(() => toLanMarkers(data, GAME), [data]);

    const regionOptions = useMemo(
        () => Array.from(new Set(allLans.map(l => l.region))),
        [allLans]
    );

    const filteredLans = useMemo(
        () => applyFiltersAndSort(allLans, { selectedRegions, verifiedOnly, sort }),
        [allLans, sort, selectedRegions, verifiedOnly]
    );

    const clearFilters = () => {
        setSelectedRegions([]);
        setVerifiedOnly(false);
    };

    return (
        <div className="standardContainer minorBottomSpace">
            <SeoData
                title={"League of Legends LANs"}
                description={"League of Legends LANs near you. Find a LAN that is closest to you on our world renown LAN map."}
                canonicalPath={"/games/LoL/lans"}
            />

            <div className="lanMapContainer">
                <LanMap markers={markers} game={MAP_GAME} />
            </div>

            <EventListFilters
                sort={sort}
                onSortChange={setSort}
                regionOptions={regionOptions}
                selectedRegions={selectedRegions}
                onRegionChange={setSelectedRegions}
                verifiedOnly={verifiedOnly}
                onVerifiedChange={setVerifiedOnly}
                resultCount={filteredLans.length}
                onClear={clearFilters}
            />

            {loading ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Loading LANs...</h2>
            ) : error ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Unable to load LANs right now.</h2>
            ) : allLans.length === 0 ? (
                <div className="eventBannerContainer">
                    <NoEvents pageType={"LANs"} />
                </div>
            ) : filteredLans.length === 0 ? (
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
