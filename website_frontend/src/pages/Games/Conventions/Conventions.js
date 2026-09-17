import { useMemo, useState } from "react";
import { SeoData, HostBanner, NoEvents, LanMap, EventListFilters } from "components";
import { useLanEvents } from "hooks";
import { toLanMarkers } from 'data/lanMarkers';
import { buildEventPath } from 'utils/eventPaths';
import { getStateFromLocation } from 'utils/location';
import '../EventBanners.css';

const GAME = "Conventions";

const normalizeLan = (event) => ({
    name: event.name,
    path: buildEventPath('/lans', event.path),
    imgUrl: event.banner_img,
    alt: event.name,
    verified: !!event.verified,
    region: event.location,
    state: getStateFromLocation(event.location),
    buttonTitle: "More Info",
});

const applyFiltersAndSort = (list, { selectedStates, verifiedOnly, sort }) => {
    let result = list.filter(l =>
        (selectedStates.length === 0 || selectedStates.includes(l.state)) &&
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

export const Conventions = () => {
    const { data, loading, error } = useLanEvents(GAME);

    const [sort, setSort] = useState('featured');
    const [selectedStates, setSelectedStates] = useState([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const lans = useMemo(() => (data || []).map(normalizeLan), [data]);
    const markers = useMemo(() => toLanMarkers(data, GAME), [data]);

    const stateOptions = useMemo(
        () => Array.from(new Set(lans.map(l => l.state))).sort(),
        [lans]
    );

    const filteredLans = useMemo(
        () => applyFiltersAndSort(lans, { selectedStates, verifiedOnly, sort }),
        [lans, sort, selectedStates, verifiedOnly]
    );

    const clearFilters = () => {
        setSelectedStates([]);
        setVerifiedOnly(false);
    };

    return (
        <div className="standardContainer minorBottomSpace">
            <SeoData
                title={"Conventions"}
                description="Find esports LAN conventions and in-person gaming events. Browse gaming conventions and multi-game LAN events happening across the country."
                canonicalPath={"/other-lans"}
            />

            <h1 className="lanPageTitle">Conventions</h1>

            <div className="lanMapContainer">
                <LanMap markers={markers} game="Conventions" />
            </div>

            <EventListFilters
                sort={sort}
                onSortChange={setSort}
                regionOptions={stateOptions}
                regionLabel="State"
                selectedRegions={selectedStates}
                onRegionChange={setSelectedStates}
                verifiedOnly={verifiedOnly}
                onVerifiedChange={setVerifiedOnly}
                resultCount={filteredLans.length}
                onClear={clearFilters}
            />

            {loading ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Loading conventions...</h2>
            ) : error ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Unable to load conventions right now.</h2>
            ) : lans.length === 0 ? (
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
