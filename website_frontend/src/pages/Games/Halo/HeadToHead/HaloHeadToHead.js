import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const HEAD_TO_HEAD = [
    { name: "UGC College Halo Scrims", path: "/games/halo/head-to-head/ugc-scrim", imgUrl: "https://i.imgur.com/JeMuXtx.png", alt: "UGC Head to Head", verified: true, buttonTitle: "More Info" },
    { name: "Halo Rec League Scrims", path: "/games/halo/head-to-head/rec-xp", imgUrl: "https://i.imgur.com/6cA46YH.png", alt: "Halo Rec League Head to Head", verified: false, buttonTitle: "More Info" },
    { name: "The Arena | 8 Mans", path: "/games/halo/head-to-head/arena", imgUrl: "https://i.imgur.com/rBPapid.png", alt: "Arena Head to Head", verified: false, buttonTitle: "More Info" },
    { name: "The Sauna Scrims", path: "/games/halo/head-to-head/sauna", imgUrl: "https://i.imgur.com/Oqt4YIJ.png", alt: "Sauna Head to Head", verified: false, buttonTitle: "More Info" },
];

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

export const HaloHeadToHead = () => {
    const [sort, setSort] = useState('featured');
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const filteredEntries = useMemo(
        () => applyFiltersAndSort(HEAD_TO_HEAD, { verifiedOnly, sort }),
        [sort, verifiedOnly]
    );

    const clearFilters = () => {
        setVerifiedOnly(false);
    };

    return (
        <div className="standardContainer minorBottomSpace">
            <SeoData
                title={"Halo Head-to-Head"}
                description="Halo XP Matches. Find free to play head-to-head matches to become better overall at competitive Halo."
                canonicalPath={"/games/halo/head-to-head"}
            />
            <HeaderImage title={"Head-to-Head"} imageClass={"codh2hPage"} />

            <EventListFilters
                sort={sort}
                onSortChange={setSort}
                verifiedOnly={verifiedOnly}
                onVerifiedChange={setVerifiedOnly}
                resultCount={filteredEntries.length}
                onClear={clearFilters}
            />

            {filteredEntries.length === 0 ? (
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
