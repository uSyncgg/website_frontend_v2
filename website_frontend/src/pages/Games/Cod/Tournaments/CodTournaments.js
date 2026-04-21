import { TournamentList, TournamentFilter, TournamentPagination, filteredTournaments, SeoData } from "components";
import { useState, useEffect } from "react";
import axios from "axios";

export const CodTournaments = () => {
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState([]);

    const clearFilters = () => {
        setSelectedFormats([]);
        setSelectedRegions([]);
        setSelectedPlatforms([]);
        setSelectedSkills([]);
        setSelectedEntry([]);
    }

    const teamOptions = ['1v1', '2v2', '3v3', '4v4']; 
    const regionOptions = ['NA', 'EU', 'LATAM', 'United States']; 
    const consoleOptions = ['PC', 'Console'];
    const skillOptions = ['Novice', 'Amateur', 'Expert', 'Agent', 'Master', 'Challenger'];
    const entryOptions = ['Free Entry', 'Paid', 'ECO'];

    const [tournaments, setTournaments] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    useEffect(() => {
        axios.get("https://website-backend-5m32.onrender.com/usyncapp/tournaments")
            .then(res => setTournaments(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleFilterChange = (setter, currentValues) => (selectedOptions) => {
        // setCurrentPage(1); // NEED TO THINK ABOUT HOW TO DO THIS ONE
        console.log(Array.isArray(selectedOptions))
        console.log(selectedOptions)
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

    const filters = {selectedFormats, selectedRegions, selectedSkills, selectedPlatforms, selectedEntry};
    const filteredTourneys = filteredTournaments(tournaments, filters); 

    const totalFilteredPages = Math.ceil(filteredTourneys.length / cardsPerPage);

    const indexOfLastTournament = currentPage * cardsPerPage;
    const indexOfFirstTournament = indexOfLastTournament - cardsPerPage;
    const currentTournaments = filteredTourneys.slice(indexOfFirstTournament, indexOfLastTournament);

    return (
        <div className="standardContainer">
            <SeoData
                description="Find all the live Call of Duty Tournaments for the day posted at uSync.gg/tournaments/call-of-duty-tournaments"
                canonicalPath={"/games/call-of-duty/tournaments/call-of-duty-tournaments"}
            />

            <div className="totalTournamentContainer">
                <div className="leftItem">
                    <TournamentFilter>
                        <TournamentFilter.checkbox 
                            title={"Team Size"} 
                            options={teamOptions} 
                            onChange={handleFilterChange(setSelectedFormats, selectedFormats)} 
                            selectedOptions={selectedFormats} 
                        />

                        <TournamentFilter.checkbox 
                            title={"Regions"} 
                            options={regionOptions} 
                            onChange={handleFilterChange(setSelectedRegions, selectedRegions)} 
                            selectedOptions={selectedRegions} 
                        />

                        <TournamentFilter.checkbox 
                            title={"Platforms"} 
                            options={consoleOptions} 
                            onChange={handleFilterChange(setSelectedPlatforms, selectedPlatforms)} 
                            selectedOptions={selectedPlatforms} 
                        />

                        <TournamentFilter.checkbox 
                            title={"Skill"} 
                            options={skillOptions} 
                            onChange={handleFilterChange(setSelectedSkills, selectedSkills)} 
                            selectedOptions={selectedSkills} 
                        />

                        <TournamentFilter.checkbox 
                            title={"Entry Fee"} 
                            options={entryOptions} 
                            onChange={handleFilterChange(setSelectedEntry, selectedEntry)} 
                            selectedOptions={selectedEntry} 
                        />

                    </TournamentFilter>
                </div>

                <div className="rightItem">
                    <div className="rightItemTitle">
                        <h1 className="white">Featured</h1>
                        <h1 className="purple">Tournaments</h1> 
                    </div>
                    <TournamentList tournaments={currentTournaments} game={'Cod'} />
                </div>

                <div className="bottomItem">
                    <TournamentPagination 
                        filteredTourneys={filteredTourneys}
                        totalFilteredPages={totalFilteredPages}
                        cardsPerPage={cardsPerPage} 
                        currentPage={currentPage} 
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    ); 
}
