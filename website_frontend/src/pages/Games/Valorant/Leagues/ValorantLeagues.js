import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters, NoEvents } from "components";
import { useLeagueEvents } from "hooks";
import { buildEventPath } from 'utils/eventPaths';
import '../../EventBanners.css';

const CATEGORY_LABEL = { collegiate: 'Collegiate', highschool: 'High School' };
const CATEGORY_OPTIONS = ['Collegiate', 'High School'];
const CATEGORY_KEY_BY_LABEL = { 'Collegiate': 'collegiate', 'High School': 'highschool' };


const normalizeHost = (host) => {
    const grouped = Array.isArray(host.leagues) && host.leagues.length > 0;

    return {
        name: host.name,
        path: buildEventPath('/games/Valorant/leagues', host.path),
        imgUrl: host.banner_img,
        alt: host.name,
        verified: !!host.verified,
        region: (grouped ? host.leagues[0]?.region : host.region) || 'NA',
        buttonTitle: grouped ? 'All Leagues' : 'More Info',
        category: host.is_college ? 'collegiate' : host.is_hs ? 'highschool' : 'open',
    };
};

const isVisible = (league, selectedCategories) => {
    if (selectedCategories.length === 0) return true;
    if (league.category === 'open') return false;
    return selectedCategories.includes(league.category);
};

const applyFiltersAndSort = (list, { selectedRegions, selectedCategories, verifiedOnly, sort }) => {
    let result = list.filter(l =>
        isVisible(l, selectedCategories) &&
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

const LeagueBanner = ({ league }) => {
    const regionText = league.category === 'open'
        ? league.region
        : `${league.region} | ${CATEGORY_LABEL[league.category]}`;

    return (
        <HostBanner path={league.path}>
            <HostBanner.Title path={league.path} verified={league.verified}>{league.name}</HostBanner.Title>
            <HostBanner.Image
                path={league.path}
                imgUrl={league.imgUrl}
                alt={league.alt}
            />
            <HostBanner.Region>{regionText}</HostBanner.Region>
            <HostBanner.Button title={league.buttonTitle} path={league.path} />
        </HostBanner>
    );
};

export const ValorantLeagues = () => {
    const { data, loading, error } = useLeagueEvents("Valorant");

    const [sort, setSort] = useState('featured');
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedCategoryLabels, setSelectedCategoryLabels] = useState([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const allLeagues = useMemo(
        () => (data || []).map(normalizeHost),
        [data]
    );

    const regionOptions = useMemo(
        () => Array.from(new Set(allLeagues.map(l => l.region))),
        [allLeagues]
    );

    const selectedCategories = selectedCategoryLabels.map(label => CATEGORY_KEY_BY_LABEL[label]);
    const filters = { selectedRegions, selectedCategories, verifiedOnly, sort };

    const filteredLeagues = useMemo(
        () => applyFiltersAndSort(allLeagues, filters),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [allLeagues, sort, selectedRegions, selectedCategoryLabels, verifiedOnly]
    );

    const clearFilters = () => {
        setSelectedRegions([]);
        setSelectedCategoryLabels([]);
        setVerifiedOnly(false);
    };

    return (
        <div className="standardContainer minorBottomSpace">
            <SeoData
                title={"Valorant Leagues"}
                description="Find Valorant leagues for all skill levels. Browse corporate, collegiate, and high school Valorant leagues including NECC, CECC, College Valorant League, and more."
                canonicalPath={"/games/Valorant/leagues"}
            />
            <HeaderImage title={"Valorant Leagues"} imageClass={"valLeaguePage"} />

            <EventListFilters
                sort={sort}
                onSortChange={setSort}
                categoryOptions={CATEGORY_OPTIONS}
                selectedCategories={selectedCategoryLabels}
                onCategoryChange={setSelectedCategoryLabels}
                regionOptions={regionOptions}
                selectedRegions={selectedRegions}
                onRegionChange={setSelectedRegions}
                verifiedOnly={verifiedOnly}
                onVerifiedChange={setVerifiedOnly}
                resultCount={filteredLeagues.length}
                onClear={clearFilters}
            />

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
