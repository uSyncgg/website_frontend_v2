import { useMemo, useState } from "react";
import { SeoData, HostBanner, NoEvents, LanMap, EventListFilters } from "components";
import { useAllLans } from "hooks";
import { toLanMarkers } from 'data/lanMarkers';
import { buildEventPath } from 'utils/eventPaths';
import '../EventBanners.css';

// Display labels for the game filter, in the order they should appear.
// "Conventions/Other" is shown to visitors but maps back to the "Conventions"
// game value the API/lan markers use.
const GAME_FILTER_OPTIONS = ["Call of Duty", "Halo", "Warzone", "League of Legends", "Conventions/Other"];
const GAME_BY_FILTER_LABEL = {
    "Call of Duty": "Call of Duty",
    "Halo": "Halo",
    "Warzone": "Warzone",
    "League of Legends": "League of Legends",
    "Conventions/Other": "Conventions",
};

const normalizeLan = (event) => ({
    name: event.name,
    path: buildEventPath('/lans', event.path),
    imgUrl: event.banner_img,
    alt: event.name,
    verified: !!event.verified,
    region: event.location,
    game: event.game,
    buttonTitle: "More Info",
});

const applyFiltersAndSort = (list, { selectedGames, verifiedOnly, sort }) => {
    const selectedGameValues = selectedGames.map(label => GAME_BY_FILTER_LABEL[label]);
    let result = list.filter(l =>
        (selectedGameValues.length === 0 || selectedGameValues.includes(l.game)) &&
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

const LanBanner = ({ lan }) => (
    <HostBanner path={lan.path}>
        <HostBanner.Title path={lan.path} verified={lan.verified}>{lan.name}</HostBanner.Title>
        <HostBanner.Image
            path={lan.path}
            imgUrl={lan.imgUrl}
            alt={lan.alt}
        />
        <HostBanner.Region>{lan.region}</HostBanner.Region>
        <HostBanner.Button title={lan.buttonTitle} path={lan.path} />
    </HostBanner>
);

export const AllLans = () => {
    const { data, loading, error } = useAllLans();

    const [sort, setSort] = useState('featured');
    const [selectedGames, setSelectedGames] = useState([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const allLans = useMemo(() => (data || []).map(normalizeLan), [data]);
    const markers = useMemo(() => toLanMarkers(data), [data]);

    const filteredLans = useMemo(
        () => applyFiltersAndSort(allLans, { selectedGames, verifiedOnly, sort }),
        [allLans, sort, selectedGames, verifiedOnly]
    );

    const clearFilters = () => {
        setSelectedGames([]);
        setVerifiedOnly(false);
    };

    return (
        <div className="standardContainer minorBottomSpace">
            <SeoData
                title={"All LANs"}
                description="Find all esports LAN events across every game title on an interactive map. Browse upcoming in-person gaming tournaments and LAN parties near you."
                canonicalPath={"/lans/all"}
            />

            <div className="lanMapContainer">
                <LanMap markers={markers} showAllGames={true} />
            </div>

            <EventListFilters
                sort={sort}
                onSortChange={setSort}
                categoryOptions={GAME_FILTER_OPTIONS}
                selectedCategories={selectedGames}
                onCategoryChange={setSelectedGames}
                categoryLabel="Game"
                verifiedOnly={verifiedOnly}
                onVerifiedChange={setVerifiedOnly}
                resultCount={filteredLans.length}
                onClear={clearFilters}
            />

            {loading ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Loading LANs...</h2>
            ) : error ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Unable to load LANs right now.</h2>
            ) : allLans.length === 0 ? (
                <div className="eventBannerContainer">
                    <NoEvents pageType={"LANs"} />
                </div>
            ) : filteredLans.length === 0 ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>No results match your filters.</h2>
            ) : (
                <div className="eventBannerContainer">
                    {filteredLans.map(lan => (
                        <LanBanner key={lan.path} lan={lan} />
                    ))}
                </div>
            )}
        </div>
    );
}
