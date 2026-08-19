import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const WAGERS = [
    { name: "Checkmate Gaming", path: "/games/call-of-duty/wagers/cmg", imgUrl: "https://i.imgur.com/QKP5L9N.png", alt: "CMG Wagers", verified: true, buttonTitle: "More Info" },
    { name: "Esports Agent", path: "/games/call-of-duty/wagers/eagent", imgUrl: "https://i.imgur.com/mued0Qd.png", alt: "Esports Agent Wagers", verified: true, buttonTitle: "More Info" },
    { name: "1v1 Me (App)", path: "/games/call-of-duty/wagers/1v1me", imgUrl: "https://i.imgur.com/BFNJpgg.png", alt: "1v1 Me Wagers", verified: false, buttonTitle: "More Info" },
    { name: "The Esports Hub", path: "/games/call-of-duty/wagers/the-esports-hub", imgUrl: "https://i.imgur.com/2t8zzc5.png", alt: "Esports Hub Wagers", verified: false, buttonTitle: "More Info" },
    { name: "Ewagers", path: "/games/call-of-duty/wagers/ewagers", imgUrl: "https://i.imgur.com/FAg32lR.png", alt: "Ewagers", verified: false, buttonTitle: "More Info" },
];

const applyFiltersAndSort = (list, { verifiedOnly, sort }) => {
    let result = list.filter(w => !verifiedOnly || w.verified);

    if (sort === 'az') {
        result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'za') {
        result = result.slice().sort((a, b) => b.name.localeCompare(a.name));
    } else {
        result = result.slice().sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
    }

    return result;
};

const WagerBanner = ({ wager }) => (
    <HostBanner path={wager.path}>
        <HostBanner.Title path={wager.path} verified={wager.verified}>{wager.name}</HostBanner.Title>
        <HostBanner.Image
            path={wager.path}
            imgUrl={wager.imgUrl}
            alt={wager.alt}
        />
        <HostBanner.Button title={wager.buttonTitle} path={wager.path} />
    </HostBanner>
);

export const CodWagers = () => {
    const [sort, setSort] = useState('featured');
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const filteredWagers = useMemo(
        () => applyFiltersAndSort(WAGERS, { verifiedOnly, sort }),
        [sort, verifiedOnly]
    );

    const clearFilters = () => {
        setVerifiedOnly(false);
    };

    return (
        <div className="standardContainer minorBottomSpace">
            <SeoData
                title={"Call of Duty Wagers"}
                description="Wagers for Call of Duty from every website out there. Find the best website to play Call of Duty wagers."
                canonicalPath={"/games/call-of-duty/wagers"}
            />
            <HeaderImage title={"Wagers"} imageClass={"codWagersPage"} />

            <EventListFilters
                sort={sort}
                onSortChange={setSort}
                verifiedOnly={verifiedOnly}
                onVerifiedChange={setVerifiedOnly}
                resultCount={filteredWagers.length}
                onClear={clearFilters}
            />

            {filteredWagers.length === 0 ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>No results match your filters.</h2>
            ) : (
                <div className="eventBannerContainer">
                    {filteredWagers.map(wager => (
                        <WagerBanner key={wager.path} wager={wager} />
                    ))}
                </div>
            )}
        </div>
    )
}
