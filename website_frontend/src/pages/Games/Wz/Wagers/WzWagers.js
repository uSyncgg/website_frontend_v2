import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const WAGERS = [
    { name: "Checkmate Gaming", path: "/games/warzone/wagers/cmg", imgUrl: "https://i.imgur.com/QKP5L9N.png", alt: "CMG", verified: true, buttonTitle: "More Info" },
    { name: "1v1 Me (App)", path: "/games/warzone/wagers/1v1me", imgUrl: "https://i.imgur.com/BFNJpgg.png", alt: "1v1 Me", verified: false, buttonTitle: "More Info" },
    { name: "GamerSaloon", path: "/games/warzone/wagers/gamersaloon", imgUrl: "https://i.imgur.com/M8da8S6.png", alt: "GamerSaloon", verified: false, buttonTitle: "More Info" },
    { name: "Ewagers", path: "/games/warzone/wagers/ewagers", imgUrl: "https://i.imgur.com/FAg32lR.png", alt: "Ewagers", verified: false, buttonTitle: "More Info" },
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

export const WzWagers = () => {
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
                title={"Warzone Wagers"}
                description="Find the best Warzone wager platforms. Compare Checkmate Gaming, 1v1 Me, Gamer Saloon, and Ewagers to wager on your Call of Duty Warzone skills."
                canonicalPath={"/games/warzone/wagers"}
            />
            <HeaderImage title={"Wagers"} imageClass={"lolWagerPage"} />

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
    );
}
