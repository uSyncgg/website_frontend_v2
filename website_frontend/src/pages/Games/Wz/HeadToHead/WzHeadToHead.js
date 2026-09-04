import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import { useXpEvents } from "hooks";
import '../../EventBanners.css';

const normalizeEntry = (host) => ({
    name: host.name,
    path: `/games/warzone/head-to-head${host.path}`,
    imgUrl: host.banner_img,
    alt: host.name,
    verified: !!host.verified,
    buttonTitle: "More Info",
});

const applyFiltersAndSort = (list, { verifiedOnly, sort }) => {
    let result = list.filter(h => !verifiedOnly || h.verified);

    if (sort === 'az') {
        result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'za') {
        result = result.slice().sort((a, b) => b.name.localeCompare(a.name));
    } else {
        result = result.slice().sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
    }

    return result;
};

const HeadToHeadBanner = ({ entry }) => (
    <HostBanner path={entry.path}>
        <HostBanner.Title path={entry.path} verified={entry.verified}>{entry.name}</HostBanner.Title>
        <HostBanner.Image
            path={entry.path}
            imgUrl={entry.imgUrl}
            alt={entry.alt}
        />
        <HostBanner.Button title={entry.buttonTitle} path={entry.path} />
    </HostBanner>
);

export const WzHeadToHead = () => {
    const { data, loading, error } = useXpEvents("Warzone");

    const [sort, setSort] = useState('featured');
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const allEntries = useMemo(() => (data || []).map(normalizeEntry), [data]);

    const filteredEntries = useMemo(
        () => applyFiltersAndSort(allEntries, { verifiedOnly, sort }),
        [allEntries, sort, verifiedOnly]
    );

    const clearFilters = () => {
        setVerifiedOnly(false);
    };

    return (
        <div className="standardContainer minorBottomSpace">
            <SeoData
                title={"Warzone Head-to-Head"}
                description="Find Warzone head-to-head match platforms. Compare Checkmate Gaming for competitive Warzone matches and ladders with prizes based on your record."
                canonicalPath={"/games/warzone/head-to-head"}
            />
            <HeaderImage title={"Head-to-Head"} imageClass={"lolLeaguePage"} />

            <EventListFilters
                sort={sort}
                onSortChange={setSort}
                verifiedOnly={verifiedOnly}
                onVerifiedChange={setVerifiedOnly}
                resultCount={filteredEntries.length}
                onClear={clearFilters}
            />

            {loading ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Loading head-to-head platforms...</h2>
            ) : error ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Unable to load head-to-head platforms right now.</h2>
            ) : filteredEntries.length === 0 ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>No results match your filters.</h2>
            ) : (
                <div className="eventBannerContainer">
                    {filteredEntries.map(entry => (
                        <HeadToHeadBanner key={entry.path} entry={entry} />
                    ))}
                </div>
            )}
        </div>
    );
}
