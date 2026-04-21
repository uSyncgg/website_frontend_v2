
export const filteredTournaments = ( tournaments, filters ) => {
    const { selectedFormats, selectedRegions, selectedSkills, selectedPlatforms, selectedEntry } = filters;

    return tournaments.filter(tournament => {
        const formatMatch = selectedFormats.length === 0 || selectedFormats.some(format => tournament.team_size.includes(format));
        const regionMatch = selectedRegions.length === 0 || selectedRegions.some(region => tournament.region.includes(region));
        const skillMatch = selectedSkills.length === 0 || selectedSkills.some(skill => tournament.Skills_for_filter.includes(skill));
        
        const platformMatch = 
            selectedPlatforms.length === 0 || 
            (selectedPlatforms.includes("PC")
                ? !tournament.Platforms_for_filter.includes("Console")
                : selectedPlatforms.some(plat => tournament.Platforms_for_filter.includes(plat)));
        
        const entryMatch = 
            selectedEntry.length === 0 || 
            (selectedEntry.includes("Paid")
                ? !tournament.iseco.includes("Free Entry")
                : selectedEntry.some(entr => tournament.iseco.includes(entr)));
        return formatMatch && regionMatch && platformMatch && skillMatch && entryMatch;
    });
}
