import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const LEAGUES = [
    { name: "Nemesis Leagues", path: "/games/RocketLeague/leagues/nemesis-leagues", imgUrl: "https://i.imgur.com/PcmcLLk.png", alt: "Nemesis Leagues", verified: true, region: "NA", buttonTitle: "All Leagues" },
    { name: "RLPC", path: "/games/RocketLeague/leagues/rlpc-leagues", imgUrl: "https://i.imgur.com/kVDfckC.png", alt: "RLPC Leagues", verified: true, region: "NA", buttonTitle: "All Leagues" },
    { name: "Rocket Soccar Confederation", path: "/games/RocketLeague/leagues/rsc-leagues", imgUrl: "https://i.imgur.com/QiNSeyE.png", alt: "RSC Leagues", verified: false, region: "NA/EU", buttonTitle: "All Leagues" },
    { name: "Minor League Esports", path: "/games/RocketLeague/leagues/mle-leagues", imgUrl: "https://i.imgur.com/ydii4DZ.png", alt: "MLE Leagues", verified: false, region: "All Regions", buttonTitle: "All Leagues" },
    { name: "United Rogue League", path: "/games/RocketLeague/leagues/united-rogue", imgUrl: "https://i.imgur.com/jWphxcz.png", alt: "United Rogue League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "Italian Rocket Champ Leagues", path: "/games/RocketLeague/leagues/italian-leagues", imgUrl: "https://i.imgur.com/VjsPbnv.png", alt: "Italian Leagues", verified: false, region: "ITL", buttonTitle: "All Leagues" },
    { name: "Frontier Doubles Leagues", path: "/games/RocketLeague/leagues/frontier-doubles-leagues", imgUrl: "https://i.imgur.com/JRaBjWV.png", alt: "Frontier Doubles Leagues", verified: false, region: "NA", buttonTitle: "All Leagues" },
    { name: "Corporate League", path: "/games/RocketLeague/leagues/corporate", imgUrl: "https://i.imgur.com/k63mdno.png", alt: "Corporate League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "Airforce Gaming League", path: "/games/RocketLeague/leagues/airforce", imgUrl: "https://i.imgur.com/4o2rJWS.png", alt: "Airforce Gaming League", verified: false, region: "NA/EU/APAC", buttonTitle: "More Info" },
];

const COLLEGIATE_LEAGUES = [
    { name: "College Carball Association", path: "/games/RocketLeague/leagues/cca", imgUrl: "https://i.imgur.com/UqFxQ9Q.png", alt: "College Carball", verified: true, region: "NA/EU", buttonTitle: "More Info" },
    { name: "Playfly College", path: "/games/RocketLeague/leagues/playfly", imgUrl: "https://i.imgur.com/XHCsRTv.png", alt: "Playfly College", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "ECAC Esports", path: "/games/RocketLeague/leagues/ecac", imgUrl: "https://i.imgur.com/VCXkcNL.png", alt: "ECAC", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "NECC", path: "/games/RocketLeague/leagues/necc", imgUrl: "https://i.imgur.com/wUMekqz.png", alt: "NECC", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "CECC League", path: "/games/RocketLeague/leagues/cecc", imgUrl: "https://i.imgur.com/WFbWb2d.png", alt: "CECC League", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "NJCAAE", path: "/games/RocketLeague/leagues/njcaae", imgUrl: "https://i.imgur.com/jTKBWZM.png", alt: "NJCAAE", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "EGFC League", path: "/games/RocketLeague/leagues/egfc", imgUrl: "https://i.imgur.com/3DTxejo.png", alt: "EGFC League", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "Australian Esports League", path: "/games/RocketLeague/leagues/ael", imgUrl: "https://i.imgur.com/YYvUqCM.png", alt: "Australian Esports League", verified: false, region: "AUS", buttonTitle: "More Info" },
];

const HIGH_SCHOOL_LEAGUES = [
    { name: "PlayVS", path: "/games/RocketLeague/leagues/playvs", imgUrl: "https://i.imgur.com/dj20PCp.png", alt: "PlayVS", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "The Esports Company League", path: "/games/RocketLeague/leagues/tec", imgUrl: "https://i.imgur.com/FZeLamS.png", alt: "The Esports Company League", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "EGFH League", path: "/games/RocketLeague/leagues/egfh", imgUrl: "https://i.imgur.com/3DTxejo.png", alt: "EGFH League", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "Australian Esports League", path: "/games/RocketLeague/leagues/aelhs", imgUrl: "https://i.imgur.com/YYvUqCM.png", alt: "Australian Esports League", verified: false, region: "AUS", buttonTitle: "More Info" },
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

export const RLLeagues = () => {
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
                title={"Rocket League Leagues"}
                description="Every single Rocket League league from across the world. Find what league suits your playstyle whether you are an amateur player, high school student, or a college student."
                canonicalPath={"/games/RocketLeague/leagues"}
            />
            <HeaderImage title={"Rocket League Leagues"} imageClass={"rlLeaguePage"} />

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
