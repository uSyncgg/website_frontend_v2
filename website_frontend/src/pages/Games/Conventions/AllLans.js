import { useMemo, useState } from "react";
import { SeoData, NoEvents, LanMap, EventListFilters, GameImage } from "components";
import { useAllLans } from "hooks";
import { toLanListItems } from 'data/lanMarkers';
import { buildEventPath } from 'utils/eventPaths';
import { Link } from "react-router";
import styles from './AllLans.module.css';
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
    raw: event,
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

export const AllLans = () => {
    const { data, loading, error } = useAllLans();

    const [sort, setSort] = useState('featured');
    const [selectedGames, setSelectedGames] = useState([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const allLans = useMemo(() => (data || []).map(normalizeLan), [data]);

    const filteredLans = useMemo(
        () => applyFiltersAndSort(allLans, { selectedGames, verifiedOnly, sort }),
        [allLans, sort, selectedGames, verifiedOnly]
    );

    // Map pins and the side list follow the active filters and sort, so
    // verified LANs lead the list by default.
    const markers = useMemo(() => toLanListItems(filteredLans.map(l => l.raw)), [filteredLans]);

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

            <div className={styles.intro}>
                <p className={styles.eyebrow}>Compete In Person</p>
                <h1 className={styles.title}>All LANs</h1>
                <p className={styles.subtext}>
                    Every upcoming LAN across every game. Pick one from the list to jump to it on the map.
                </p>
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
                <div className={styles.explorer}>
                    <LanMap
                        variant="explorer"
                        className="lanExplorerMap"
                        markers={markers}
                        showAllGames={true}
                    />
                </div>
            )}

            <div className={styles.more}>
                <GameImage
                    title={"Browse LANs by Game"}
                    games={{
                        "Call of Duty": "/games/call-of-duty/lans",
                        "Warzone": "/games/warzone/lans",
                        "Halo": "/games/halo/lans",
                        "League of Legends": "/games/LoL/lans"
                    }}
                />
                <h3 className={styles.post}>
                    Hosting a LAN? Learn how to post it to the map {" "}
                    <Link to="/more/eventhost">here</Link>
                </h3>
            </div>
        </div>
    );
}
