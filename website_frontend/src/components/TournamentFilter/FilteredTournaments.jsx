import { hostKeyFromLabel } from "components/TournamentCard/hosts";
import { codTitleFromTournament } from "components/CodTitleSelect/codTitles";

export const filteredTournaments = ( tournaments, filters ) => {
    const { selectedFormats, selectedRegions, selectedSkills, selectedPlatforms, selectedEntry, selectedHosts = [], selectedTitles = [] } = filters;

    const checks = [
        [selectedFormats, {
            "1v1": "is_1v1",
            "2v2": "is_2v2",
            "3v3": "is_3v3",
            "4v4": "is_4v4"
        }],
        [selectedRegions, {
            "NA": "is_na",
            "EU": "is_eu",
            "LATAM": "is_latam",
            "United States": "is_usa"
        }],
        [selectedSkills, {
            "Novice": "is_novice",
            "Amateur": "is_amateur",
            "Expert": "is_expert",
            "Agent": "is_agent",
            "Master": "is_master",
            "Challenger": "is_challenger"
        }],
        [selectedPlatforms, {
            "PC": "is_pc",
            "Console": "is_console"
        }],
        [selectedEntry, {
            "Free Entry": "is_free",
            "Paid": "is_paid",
            "ECO": "is_eco",
            // "Elite": "is_elite"
        }]
    ]

    return tournaments.filter(tournament => {
        const hostMatch = selectedHosts.length === 0 ||
            selectedHosts.some(host => hostKeyFromLabel(host) === tournament.site);

        // Which Call of Duty the tournament is on — picked from the cover tiles
        const titleMatch = selectedTitles.length === 0 ||
            selectedTitles.includes(codTitleFromTournament(tournament));

        return hostMatch && titleMatch && checks.every(([selected, fieldMap]) =>
            selected.length === 0 ||
            selected.some(value => tournament[fieldMap[value]] === true)
        )
    });
}
