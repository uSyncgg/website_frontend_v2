import { TournamentList, TournamentFilter, TournamentPagination, filteredTournaments, SeoData } from "components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import styles from './CodTournaments.module.css';
import '../../EventInformation.css';

export const CodTournaments = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedFormats, setSelectedFormats] = useState(() => searchParams.getAll('format'));
    const [selectedRegions, setSelectedRegions] = useState(() => searchParams.getAll('region'));
    const [selectedPlatforms, setSelectedPlatforms] = useState(() => searchParams.getAll('platform'));
    const [selectedSkills, setSelectedSkills] = useState(() => searchParams.getAll('skill'));
    const [selectedEntry, setSelectedEntry] = useState(() => searchParams.getAll('entry'));
    const [selectedHosts, setSelectedHosts] = useState(() => searchParams.getAll('host'));

    const clearFilters = () => {
        setSelectedFormats([]);
        setSelectedRegions([]);
        setSelectedPlatforms([]);
        setSelectedSkills([]);
        setSelectedEntry([]);
        setSelectedHosts([]);
    }

    const teamOptions = ['1v1', '2v2', '3v3', '4v4'];
    const regionOptions = ['NA', 'EU', 'LATAM', 'United States'];
    const consoleOptions = ['PC', 'Console'];
    const skillOptions = ['Novice', 'Amateur', 'Expert', 'Agent', 'Master', 'Challenger'];
    const entryOptions = ['Free Entry', 'Paid', 'ECO'];
    const hostOptions = ['CMG', 'CoD Agent', 'Console Kings'];

    const [tournaments, setTournaments] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    useEffect(() => {
        axios.get("https://website-backend-v2.onrender.com/tournaments/cod")
            .then(res => setTournaments(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoaded(true));
    }, []);

    // Sync filters to URL and reset page whenever a filter changes
    // NOTE: If we ever do in app routing to this page with specific filters applied they will NOT be applied with the current
    // configuration as it wont be a cold load and thus it wont mount. If we ever do plan to have that on the site we need a new
    // useEffect to manage the mounting. Not a big issue but an item potentially for the future.
    useEffect(() => {
        setCurrentPage(1);
        const params = new URLSearchParams(searchParams);
        ['format', 'region', 'platform', 'skill', 'entry', 'host'].forEach(k => params.delete(k));
        selectedFormats.forEach(v => params.append('format', v));
        selectedRegions.forEach(v => params.append('region', v));
        selectedPlatforms.forEach(v => params.append('platform', v));
        selectedSkills.forEach(v => params.append('skill', v));
        selectedEntry.forEach(v => params.append('entry', v));
        selectedHosts.forEach(v => params.append('host', v));
        setSearchParams(params, { replace: true });
    }, [selectedFormats, selectedRegions, selectedPlatforms, selectedSkills, selectedEntry, selectedHosts, setSearchParams]);

    const handleFilterChange = (setter, currentValues) => (selectedOptions) => {
        // If selectedOptions is an array, ensure deselected options are removed
        if (Array.isArray(selectedOptions)) {
            setter(selectedOptions);
        } else {
            // If it's a single value toggle (boolean), remove if unchecked
            const updatedValues = currentValues.includes(selectedOptions)
                ? currentValues.filter(item => item !== selectedOptions) // Remove if unchecked
                : [...currentValues, selectedOptions]; // Add if checked

            setter(updatedValues);
        }
    };

    const filters = {selectedFormats, selectedRegions, selectedSkills, selectedPlatforms, selectedEntry, selectedHosts};
    const filteredTourneys = filteredTournaments(tournaments, filters);

    const totalFilteredPages = Math.ceil(filteredTourneys.length / cardsPerPage);

    const indexOfLastTournament = currentPage * cardsPerPage;
    const indexOfFirstTournament = indexOfLastTournament - cardsPerPage;
    const currentTournaments = filteredTourneys.slice(indexOfFirstTournament, indexOfLastTournament);

    const freeEntryCount = filteredTourneys.filter(tournament => tournament.is_free === true).length;

    return (
        <div className={`standardContainer ${styles.page}`}>
            <SeoData
                title={"Call of Duty Tournaments"}
                description="Find all the live Call of Duty Tournaments for the day posted at uSync.gg/tournaments/call-of-duty-tournaments"
                canonicalPath={"/games/call-of-duty/tournaments/call-of-duty-tournaments"}
            />

            <div className={styles.pageHeader}>
                <h1 className={styles.white}>CALL OF DUTY</h1>
                <h1 className={styles.gradientText}>TOURNAMENTS</h1>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                <p className={styles.subtext}>
                    Updated every day.
                    Filter by team size, region, platform, skill, and entry fee.
                </p>

                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <p className={styles.statValue}>{filteredTourneys.length}</p>
                        <p className={styles.statLabel}>Tournaments</p>
                    </div>
                    <div className={styles.statCard}>
                        <p className={styles.statValue}>{freeEntryCount}</p>
                        <p className={styles.statLabel}>Free Entry</p>
                    </div>
                </div>
            </div>

            <div className="totalTournamentContainer">
                <div className="leftItem">
                    <TournamentFilter onClear={clearFilters}>
                        <TournamentFilter.chips
                            title={"Team Size"}
                            options={teamOptions}
                            onChange={handleFilterChange(setSelectedFormats, selectedFormats)}
                            selectedOptions={selectedFormats}
                        />

                        <TournamentFilter.chips
                            title={"Region"}
                            options={regionOptions}
                            onChange={handleFilterChange(setSelectedRegions, selectedRegions)}
                            selectedOptions={selectedRegions}
                        />

                        <TournamentFilter.chips
                            title={"Platform"}
                            options={consoleOptions}
                            onChange={handleFilterChange(setSelectedPlatforms, selectedPlatforms)}
                            selectedOptions={selectedPlatforms}
                        />

                        <TournamentFilter.chips
                            title={"Skill Level"}
                            options={skillOptions}
                            onChange={handleFilterChange(setSelectedSkills, selectedSkills)}
                            selectedOptions={selectedSkills}
                        />

                        <TournamentFilter.chips
                            title={"Entry Fee"}
                            options={entryOptions}
                            onChange={handleFilterChange(setSelectedEntry, selectedEntry)}
                            selectedOptions={selectedEntry}
                        />

                        <TournamentFilter.chips
                            title={"Host"}
                            options={hostOptions}
                            onChange={handleFilterChange(setSelectedHosts, selectedHosts)}
                            selectedOptions={selectedHosts}
                        />
                    </TournamentFilter>
                </div>

                <div className="rightItem">
                    <p className={styles.resultCount}>
                        Page {currentPage} of {Math.max(1, totalFilteredPages)} · {filteredTourneys.length} tournaments
                    </p>

                    {!isLoaded ? (
                        <div className={styles.statusMessage}>
                            <h1 className="white">Loading tournaments...</h1>
                        </div>
                    ) : tournaments.length === 0 ? (
                        <div className={styles.statusMessage}>
                            <h1 className="white">We are experiencing technical difficulties right now.</h1>
                            <h1 className="white">Please check back later.</h1>
                        </div>
                    ) : filteredTourneys.length === 0 ? (
                        <div className={styles.statusMessage}>
                            <h1 className="white">No tournaments match your filters.</h1>
                        </div>
                    ) : (
                        <TournamentList tournaments={currentTournaments} game={'Cod'} />
                    )}
                </div>

                <div className="bottomItem">
                    <TournamentPagination
                        totalFilteredPages={totalFilteredPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}
