import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const HEAD_TO_HEAD = [
    { name: "Checkmate Gaming", path: "/games/call-of-duty/head-to-head/cmg", imgUrl: "https://i.imgur.com/QKP5L9N.png", alt: "CMG Head to Head", verified: true, buttonTitle: "More Info" },
    { name: "Esports Agent", path: "/games/call-of-duty/head-to-head/eagent", imgUrl: "https://i.imgur.com/mued0Qd.png", alt: "Esports Agent Head to Head", verified: false, buttonTitle: "More Info" },
    { name: "The Arena", path: "/games/call-of-duty/head-to-head/arena", imgUrl: "https://i.imgur.com/rBPapid.png", alt: "Arena Head to Head", verified: false, buttonTitle: "More Info" },
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

export const CodHeadToHead = () => {
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
                title={"Call of Duty Head-to-Head"}
                description="Call of Duty XP and ladder matches. Free competitive cod esports matches to improve your skill."
                canonicalPath={"/games/call-of-duty/head-to-head"}
            />
            <HeaderImage title={"Head to Head"} imageClass={"codh2hPage"} />

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
