import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const LEAGUES = [
    { name: "Titan Esports", path: "/games/LoL/leagues/titan-leagues", imgUrl: "https://i.imgur.com/SoRhxEf.png", alt: "Titan Esports Leagues", verified: true, region: "NA", buttonTitle: "All Leagues" },
    { name: "Risen Leagues", path: "/games/LoL/leagues/risen-leagues", imgUrl: "https://i.imgur.com/s5LrZoC.png", alt: "Risen Leagues", verified: true, region: "NA", buttonTitle: "All Leagues" },
    { name: "Aegis Leagues", path: "/games/LoL/leagues/aegis-leagues", imgUrl: "https://i.imgur.com/o0sTnrZ.png", alt: "Aegis Leagues", verified: true, region: "NA", buttonTitle: "All Leagues" },
    { name: "Blue Otter Leagues", path: "/games/LoL/leagues/blue-otter-leagues", imgUrl: "https://i.imgur.com/RaTizzw.png", alt: "Blue Otter Leagues", verified: false, region: "NA", buttonTitle: "All Leagues" },
    { name: "Low Budget LCS Leagues", path: "/games/LoL/leagues/low-budget-leagues", imgUrl: "https://i.imgur.com/lPFfJL9.png", alt: "Low Budget LCS Leagues", verified: false, region: "NA", buttonTitle: "All Leagues" },
    { name: "MetaShift Leagues", path: "/games/LoL/leagues/meta-shift-leagues", imgUrl: "https://i.imgur.com/XiFomA7.png", alt: "MetaShift Leagues", verified: false, region: "NA", buttonTitle: "All Leagues" },
    { name: "SDC League", path: "/games/LoL/leagues/sdc", imgUrl: "https://i.imgur.com/A4LXnAj.png", alt: "SDC League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "CWL Leagues", path: "/games/LoL/leagues/cobalt-winds-leagues", imgUrl: "https://i.imgur.com/sMnBEnL.png", alt: "Cobalt Winds Leagues", verified: false, region: "EUW", buttonTitle: "All Leagues" },
    { name: "Corporate LoL League", path: "/games/LoL/leagues/corporate-league", imgUrl: "https://i.imgur.com/k63mdno.png", alt: "Corporate LoL League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "Black Twitch League", path: "/games/LoL/leagues/black-twitch-league", imgUrl: "https://i.imgur.com/ZuJA3w1.png", alt: "Black Twitch League", verified: false, region: "NA", buttonTitle: "More Info" },
];

const COLLEGIATE_LEAGUES = [
    { name: "CLOL", path: "/games/LoL/leagues/clol", imgUrl: "https://i.imgur.com/2jNA26x.png", alt: "CLOL", verified: true, region: "NA", buttonTitle: "More Info" },
    { name: "Playfly College", path: "/games/LoL/leagues/playfly", imgUrl: "https://i.imgur.com/XHCsRTv.png", alt: "Playfly College League", verified: true, region: "NA", buttonTitle: "More Info" },
    { name: "NECC", path: "/games/LoL/leagues/necc", imgUrl: "https://i.imgur.com/wUMekqz.png", alt: "NECC League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "ECAC Esports", path: "/games/LoL/leagues/ecac", imgUrl: "https://i.imgur.com/hsLZywE.png", alt: "ECAC", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "National Student Esports", path: "/games/LoL/leagues/nse", imgUrl: "https://i.imgur.com/mJJJD6e.png", alt: "National Student Esports", verified: false, region: "UK", buttonTitle: "More Info" },
];

const HIGH_SCHOOL_LEAGUES = [
    { name: "PlayVS", path: "/games/LoL/leagues/playvs", imgUrl: "https://i.imgur.com/dj20PCp.png", alt: "PlayVS", verified: false, region: "USA", buttonTitle: "More Info" },
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

export const LolLeagues = () => {
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
                title={"League of Legends Leagues"}
                description="League of Legends leagues. Compete for cash prizes. Sign up based on your in-game rank and elevate your league status forever."
                canonicalPath={"/games/LoL/leagues"}
            />
            <HeaderImage title={"League of Legends Leagues"} imageClass={"lolLeaguePage"} />

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
