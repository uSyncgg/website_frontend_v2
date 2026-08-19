import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const WAGERS = [
    { name: "Showdown Gaming", path: "/games/CS2/wagers/showdowngaming_cs2", imgUrl: "https://i.imgur.com/1UTQLkh.png", alt: "Showdown Gaming Wagers", verified: false, buttonTitle: "More Info" },
    { name: "Gamer Saloon", path: "/games/CS2/wagers/gamersaloon_cs2", imgUrl: "https://i.imgur.com/MFqfurA.png", alt: "Gamer Saloon Wagers", verified: false, buttonTitle: "More Info" },
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

export const CSWagers = () => {
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
                title={"Counter-Strike Wagers"}
                description="Wagers for Counter-Strike 2 players looking to make money gaming. Play for $ and showcase your earnings."
                canonicalPath={"/games/CS2/wagers"}
            />
            <HeaderImage title={"Wagers"} imageClass={"cs2WagersPage"} />

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
