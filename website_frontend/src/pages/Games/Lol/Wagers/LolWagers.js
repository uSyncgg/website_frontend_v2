import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import { useWagerEvents } from "hooks";
import { buildEventPath } from 'utils/eventPaths';
import '../../EventBanners.css';

const normalizeWager = (host) => ({
    name: host.name,
    path: buildEventPath('/games/LoL/wagers', host.path),
    imgUrl: host.banner_img,
    alt: host.name,
    verified: !!host.verified,
    buttonTitle: "More Info",
});

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

export const LolWagers = () => {
    const { data, loading, error } = useWagerEvents("League of Legends");

    const [sort, setSort] = useState('featured');
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const allWagers = useMemo(() => (data || []).map(normalizeWager), [data]);

    const filteredWagers = useMemo(
        () => applyFiltersAndSort(allWagers, { verifiedOnly, sort }),
        [allWagers, sort, verifiedOnly]
    );

    const clearFilters = () => {
        setVerifiedOnly(false);
    };

    return (
        <div className="standardContainer minorBottomSpace">
            <SeoData
                title={"League of Legends Wagers"}
                description="Wagers for League of Legends. Play cash matches against other players or other teams and make money playing league."
                canonicalPath={"/games/LoL/wagers"}
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

            {loading ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Loading wagers...</h2>
            ) : error ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Unable to load wagers right now.</h2>
            ) : filteredWagers.length === 0 ? (
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
