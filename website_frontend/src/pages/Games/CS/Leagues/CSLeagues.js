import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const LEAGUES = [
    { name: "FACEIT ESEA", path: "/games/CS2/leagues/faceitesea", imgUrl: "https://i.imgur.com/STmx1Aa.png", alt: "FACEIT ESEA League", verified: true, region: "Available Worldwide", buttonTitle: "More Info" },
    { name: "Fast Cup", path: "/games/CS2/leagues/fastcup", imgUrl: "https://i.imgur.com/e7lFoB8.png", alt: "Fast Cup League", verified: false, region: "EU, CIS, ME, and SA", buttonTitle: "More Info" },
    { name: "Corporate CS2 League", path: "/games/CS2/leagues/corporate", imgUrl: "https://i.imgur.com/87GfbXz.png", alt: "Corporate CS2 League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "FiReLEAGUE", path: "/games/CS2/leagues/fireleague", imgUrl: "https://i.imgur.com/gLNXCQA.png", alt: "FiRe League", verified: false, region: "NA, EU, and SA", buttonTitle: "More Info" },
    { name: "United TwentyOne", path: "/games/CS2/leagues/unitedtwentyone", imgUrl: "https://i.imgur.com/VTroInj.png", alt: "United TwentyOne League", verified: false, region: "Available Worldwide", buttonTitle: "More Info" },
    { name: "Hyperfibre Leagues", path: "/games/CS2/leagues/hyperfibre-leagues", imgUrl: "https://i.imgur.com/Cx4N8HW.png", alt: "Hyperfibre Leagues", verified: false, region: "NZ", buttonTitle: "All Leagues" },
];

const COLLEGIATE_LEAGUES = [
    { name: "NJCAAE", path: "/games/CS2/leagues/njcaae", imgUrl: "https://i.imgur.com/jTKBWZM.png", alt: "NJCAAE League", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "NECC", path: "/games/CS2/leagues/necc", imgUrl: "https://i.imgur.com/0JWBSKD.png", alt: "NECC League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "EGFC League", path: "/games/CS2/leagues/egfc", imgUrl: "https://i.imgur.com/euAj2dR.png", alt: "Dubbz Wagers", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "Playfly College", path: "/games/CS2/leagues/playfly", imgUrl: "https://i.imgur.com/XHCsRTv.png", alt: "Playfly College League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "Australian Esports League", path: "/games/CS2/leagues/ael", imgUrl: "https://i.imgur.com/YYvUqCM.png", alt: "Australian Esports League", verified: false, region: "AUS", buttonTitle: "More Info" },
];

// Placeholder — no CS2 high school leagues have been added to the site yet.
const HIGH_SCHOOL_LEAGUES = [];

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

export const CSLeagues = () => {
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
                title={"Counter-Strike Leagues"}
                description="Counter-Strike 2 leagues to prove your CS2 talent and compete like the pros. Join a league today and win huge cash prize pools."
                canonicalPath={"/games/CS2/leagues"}
            />
            <HeaderImage title={"Counter-Strike 2 Leagues"} imageClass={"cs2LeaguePage"} />

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
