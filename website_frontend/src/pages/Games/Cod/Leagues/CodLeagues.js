import { useMemo, useState } from "react";
import { SeoData, HostBanner, HeaderImage, EventListFilters } from "components";
import '../../EventBanners.css';

const LEAGUES = [
    { name: "LockdownCL", path: "/games/call-of-duty/leagues/lockdowncl-leagues", imgUrl: "https://i.imgur.com/MQkAGHe.png", alt: "LockdownCL Leagues", verified: true, region: "All Regions", buttonTitle: "All Leagues" },
    { name: "U18 COD League", path: "/games/call-of-duty/leagues/u18-league", imgUrl: "https://i.imgur.com/AMzISPh.png", alt: "U18 COD League", verified: false, region: "All Regions", buttonTitle: "More Info" },
    { name: "XP League", path: "/games/call-of-duty/leagues/xp-league-cod", imgUrl: "https://i.imgur.com/d4kQBH4.png", alt: "XP Leaue", verified: false, region: "NA/EU", buttonTitle: "More Info" },
    { name: "COD Beer League (21+)", path: "/games/call-of-duty/leagues/cod-beer-league", imgUrl: "https://i.imgur.com/GKRvsAM.png", alt: "CoD Beer League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "Pulse X League", path: "/games/call-of-duty/leagues/pulse-x-leagues", imgUrl: "https://i.imgur.com/RHgIQV1.jpg", alt: "Pulse X Leagues", verified: false, region: "NA", buttonTitle: "All Leagues" },
    { name: "United Rogue", path: "/games/call-of-duty/leagues/united-rogue-league", imgUrl: "https://i.imgur.com/jZK2DCe.png", alt: "United Rogue League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "TPC Womens COD", path: "/games/call-of-duty/leagues/tpc-womens-cod", imgUrl: "https://i.imgur.com/u9cCMVa.png", alt: "TPC Womens CoD League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "Female COD League", path: "/games/call-of-duty/leagues/fcl", imgUrl: "https://i.imgur.com/SBSXD2X.png", alt: "Female CoD League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "Zoned Out Gaming League", path: "/games/call-of-duty/leagues/zoned-out", imgUrl: "https://i.imgur.com/qiN8RKF.png", alt: "Zoned Out Gaming League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "Airforce Gaming League", path: "/games/call-of-duty/leagues/airforce-league", imgUrl: "https://i.imgur.com/4o2rJWS.png", alt: "Airforce Gaming League", verified: false, region: "NA/EU/APAC", buttonTitle: "More Info" },
    { name: "Corporate COD League", path: "/games/call-of-duty/leagues/corporate-cod-league", imgUrl: "https://i.imgur.com/k63mdno.png", alt: "Corporate CoD League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "IXI Esports", path: "/games/call-of-duty/leagues/ixi-esports", imgUrl: "https://i.imgur.com/mVoGJG4.png", alt: "IXI Esports", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "The Premier Circuit League", path: "/games/call-of-duty/leagues/tpc-league", imgUrl: "https://i.imgur.com/t4k8Qi6.png", alt: "Premier Circuit League", verified: false, region: "NA", buttonTitle: "More Info" },
    // Region corrected from "All Leagues" (a typo) to "All Regions" so it participates correctly in the location filter below.
    { name: "COD Rec League", path: "/games/call-of-duty/leagues/cod-rec-league", imgUrl: "https://i.imgur.com/xLmOqds.png", alt: "CoD Rec League", verified: false, region: "All Regions", buttonTitle: "More Info" },
    { name: "Elite Warfare Gaming League", path: "/games/call-of-duty/leagues/elite-gaming-warfare-league", imgUrl: "https://i.imgur.com/7o2e5a3.png", alt: "Elite Warfare Gaming League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "Casual XP League", path: "/games/call-of-duty/leagues/casual-xp-league", imgUrl: "https://i.imgur.com/wW4jVQ0.png", alt: "Casual XP League", verified: false, region: "All Regions", buttonTitle: "More Info" },
    // TEMP REMOVED, THEY MAY RESTART
    // { name: "Old Heads Circuit", path: "/games/call-of-duty/leagues/old-heads-circuit", imgUrl: "https://i.imgur.com/ndryPxn.png", alt: "Old Heads Circuit", verified: false, region: "All Regions", buttonTitle: "More Info" },
];

const COLLEGIATE_LEAGUES = [
    { name: "College XP", path: "/games/call-of-duty/leagues/cxp-leagues", imgUrl: "https://i.imgur.com/jGdqqOZ.png", alt: "College XP Leagues", verified: false, region: "NA", buttonTitle: "All Leagues" },
    { name: "Playfly College", path: "/games/call-of-duty/leagues/playfly-cod-league", imgUrl: "https://i.imgur.com/XHCsRTv.png", alt: "Playfly College", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "College COD", path: "/games/call-of-duty/leagues/ccl-league", imgUrl: "https://i.imgur.com/71EePEn.png", alt: "College CoD League", verified: false, region: "NA", buttonTitle: "More Info" },
    { name: "ECAC Esports", path: "/games/call-of-duty/leagues/ecac", imgUrl: "https://i.imgur.com/VCXkcNL.png", alt: "ECAC CoD League", verified: false, region: "USA", buttonTitle: "More Info" },
    { name: "NJCAAE", path: "/games/call-of-duty/leagues/njcaae", imgUrl: "https://i.imgur.com/Yer31Qr.png", alt: "NJCAAE CoD League", verified: false, region: "USA", buttonTitle: "More Info" },
];

// Placeholder — no Call of Duty high school leagues have been added to the site yet.
// The filter option exists so entries can be dropped in here once we have them.
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

export const CodLeagues = () => {
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
                title={"Call of Duty Leagues"}
                description="Call of Duty leagues for amateur players looking for high level competition. Every Call of Duty league in one place."
                canonicalPath={"/games/call-of-duty/leagues"}
            />
            <HeaderImage title={"Call of Duty Leagues"} imageClass={"lansPage"} />

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
