import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters, NoEvents } from "components";
import { useLeagueEvents } from "hooks";
import { buildEventPath } from 'utils/eventPaths';
import '../../EventBanners.css';

const normalizeHost = (host) => {
    const grouped = Array.isArray(host.leagues) && host.leagues.length > 0;

    return {
        name: host.name,
        path: buildEventPath('/games/warzone/leagues', host.path),
        imgUrl: host.banner_img,
        alt: host.name,
        verified: !!host.verified,
        region: (grouped ? host.leagues[0]?.region : host.region) || 'NA',
        buttonTitle: grouped ? 'All Leagues' : 'More Info',
    };
};

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

const LeagueBanner = ({ league }) => (
    <HostBanner path={league.path}>
        <HostBanner.Title path={league.path} verified={league.verified}>{league.name}</HostBanner.Title>
        <HostBanner.Image
            path={league.path}
            imgUrl={league.imgUrl}
            alt={league.alt}
        />
        <HostBanner.Region>{league.region}</HostBanner.Region>
        <HostBanner.Button title={league.buttonTitle} path={league.path} />
    </HostBanner>
);

export const WzLeagues = () => {
    const { data, loading, error } = useLeagueEvents("Warzone");

    const [sort, setSort] = useState('featured');
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const allLeagues = useMemo(() => (data || []).map(normalizeHost), [data]);
    const regionOptions = useMemo(() => Array.from(new Set(allLeagues.map(l => l.region))), [allLeagues]);

    const filteredLeagues = useMemo(
        () => applyFiltersAndSort(allLeagues, { selectedRegions, verifiedOnly, sort }),
        [allLeagues, sort, selectedRegions, verifiedOnly]
    );

    const clearFilters = () => {
        setSelectedRegions([]);
        setVerifiedOnly(false);
    };

    return (
        <div className="standardContainer minorBottomSpace">
            <SeoData
                title={"Warzone Leagues"}
                description="Find Warzone leagues. Browse competitive Call of Duty Warzone league opportunities for players looking to compete in organized team play."
                canonicalPath={"/games/warzone/leagues"}
            />
            <HeaderImage title={"Warzone Leagues"} imageClass={"wzLeaguePage"} />

            {!loading && !error && allLeagues.length > 0 &&
                <EventListFilters
                    sort={sort}
                    onSortChange={setSort}
                    regionOptions={regionOptions}
                    selectedRegions={selectedRegions}
                    onRegionChange={setSelectedRegions}
                    verifiedOnly={verifiedOnly}
                    onVerifiedChange={setVerifiedOnly}
                    resultCount={filteredLeagues.length}
                    onClear={clearFilters}
                />
            }

            {loading ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Loading leagues...</h2>
            ) : error ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Unable to load leagues right now.</h2>
            ) : allLeagues.length === 0 ? (
                <div className="eventBannerContainer">
                    <NoEvents pageType={"Leagues"} />
                </div>
            ) : filteredLeagues.length === 0 ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>No leagues match your filters.</h2>
            ) : (
                <div className="eventBannerContainer">
                    {filteredLeagues.map(league => (
                        <LeagueBanner key={league.path} league={league} />
                    ))}
                </div>
            )}
        </div>
    );
}
