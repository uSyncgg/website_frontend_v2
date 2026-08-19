import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const LEAGUES = [
    { name: "Corporate League", path: "/games/Valorant/leagues/corporate", imgUrl: "https://i.imgur.com/k63mdno.png", alt: "Corporate League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "Unified Premier League", path: "/games/Valorant/leagues/unified", imgUrl: "https://i.imgur.com/KDf5r2a.png", alt: "Unified Premier League", verified: false, region: "NA", buttonTitle: "More Info" },
];

const COLLEGIATE_LEAGUES = [
    { name: "College Valorant League", path: "/games/Valorant/leagues/riot", imgUrl: "https://i.imgur.com/1Hqgxu0.png", alt: "College Valorant League", verified: true, region: "NA", buttonTitle: "More Info" },
    { name: "NJCAAE", path: "/games/Valorant/leagues/njcaae", imgUrl: "https://i.imgur.com/Yer31Qr.png", alt: "NJCAAE", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "NECC", path: "/games/Valorant/leagues/necc", imgUrl: "https://i.imgur.com/wUMekqz.png", alt: "NECC", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "EGFC League", path: "/games/Valorant/leagues/egfc", imgUrl: "https://i.imgur.com/3DTxejo.png", alt: "EGFC League", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "Playfly College", path: "/games/Valorant/leagues/playfly-leagues", imgUrl: "https://i.imgur.com/XHCsRTv.png", alt: "Playfly College Leagues", verified: false, region: "NA", buttonTitle: "All Leagues" },
    { name: "CECC League", path: "/games/Valorant/leagues/cecc", imgUrl: "https://i.imgur.com/WFbWb2d.png", alt: "CECC League", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "National Student Esports", path: "/games/Valorant/leagues/nse", imgUrl: "https://i.imgur.com/mJJJD6e.png", alt: "National Student Esports", verified: false, region: "UK", buttonTitle: "More Info" },
];

const HIGH_SCHOOL_LEAGUES = [
    { name: "The Esports Company League", path: "/games/Valorant/leagues/tec", imgUrl: "https://i.imgur.com/FZeLamS.png", alt: "The Esports Company League", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "NASEF League", path: "/games/Valorant/leagues/nasef", imgUrl: "https://i.imgur.com/x0SaVuR.png", alt: "NASEF League", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "EGFH League", path: "/games/Valorant/leagues/egfh", imgUrl: "https://i.imgur.com/3DTxejo.png", alt: "EGFH", verified: false, region: "USA", buttonTitle: "More Info" },
];

const CATEGORY_LABEL = { collegiate: 'Collegiate', highschool: 'High School' };
const CATEGORY_OPTIONS = ['Collegiate', 'High School'];
const CATEGORY_KEY_BY_LABEL = { 'Collegiate': 'collegiate', 'High School': 'highschool' };

const ALL_LEAGUES = [
    ...LEAGUES.map(l => ({ ...l, category: 'open' })),
    ...COLLEGIATE_LEAGUES.map(l => ({ ...l, category: 'collegiate' })),
    ...HIGH_SCHOOL_LEAGUES.map(l => ({ ...l, category: 'highschool' })),
];

const REGION_OPTIONS = Array.from(new Set(ALL_LEAGUES.map(l => l.region)));

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
    const [sort, setSort] = useState('featured');
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedCategoryLabels, setSelectedCategoryLabels] = useState([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const selectedCategories = selectedCategoryLabels.map(label => CATEGORY_KEY_BY_LABEL[label]);
    const filters = { selectedRegions, selectedCategories, verifiedOnly, sort };

    const filteredLeagues = useMemo(
        () => applyFiltersAndSort(ALL_LEAGUES, filters),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sort, selectedRegions, selectedCategoryLabels, verifiedOnly]
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
                regionOptions={REGION_OPTIONS}
                selectedRegions={selectedRegions}
                onRegionChange={setSelectedRegions}
                verifiedOnly={verifiedOnly}
                onVerifiedChange={setVerifiedOnly}
                resultCount={filteredLeagues.length}
                onClear={clearFilters}
            />

            {filteredLeagues.length === 0 ? (
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
