import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const HEAD_TO_HEAD = [
    { name: "Gankster GG", path: "/games/Valorant/head-to-head/gankster", imgUrl: "https://i.imgur.com/ljDANVi.png", alt: "Gankster GG", verified: true, buttonTitle: "More Info" },
    { name: "Esport Scrim", path: "/games/Valorant/head-to-head/esport-scrim", imgUrl: "https://i.imgur.com/irkzmva.png", alt: "Esport Scrim", verified: false, buttonTitle: "More Info" },
    { name: "Collegiate Valorant Esports Hub", path: "/games/Valorant/head-to-head/college-hub", imgUrl: "https://i.imgur.com/InYxRbE.png", alt: "Collegiate Valorant Esports Hub", verified: false, buttonTitle: "More Info" },
    { name: "Pracc", path: "/games/Valorant/head-to-head/pracc", imgUrl: "https://i.imgur.com/jqe9CCc.png", alt: "Pracc", verified: false, buttonTitle: "More Info" },
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

export const ValorantHeadToHead = () => {
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
                title={"Valorant Head-to-Head"}
                description="Find the best Valorant scrim and head-to-head platforms. Compare Gankster GG, Esport Scrim, Collegiate Valorant Hub, and Pracc for practice matches."
                canonicalPath={"/games/Valorant/head-to-head"}
            />
            <HeaderImage title={"Head-to-Head"} imageClass={"rlh2hPage"} />

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
