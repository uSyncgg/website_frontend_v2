import { parseEstDate } from 'utils/tournamentDate';

// Picks up to 4 tournaments for the homepage highlight section: simply the
// soonest upcoming tournaments, ordered by start date + time.
export function pickHomepageTournaments(tournaments) {
    const now = new Date();

    return (tournaments || [])
        .map(tournament => ({ tournament, startDate: parseEstDate(tournament.date, tournament.time) }))
        .filter(({ startDate }) => startDate && startDate > now)
        .sort((a, b) => a.startDate - b.startDate)
        .slice(0, 4)
        .map(({ tournament }) => tournament);
}
