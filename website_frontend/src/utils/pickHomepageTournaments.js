import { parseEstDate } from 'utils/tournamentDate';

const GTD_URL_PATTERN = /-(\d+)-gtd-/i;

// Picks up to 4 tournaments for the homepage highlight section: the soonest
// GTD (or, failing that, Elite Entry) tournament, the soonest free-entry
// tournament, then the soonest "regular" tournaments to fill out the rest.
export function pickHomepageTournaments(tournaments) {
    const now = new Date();

    const upcoming = (tournaments || [])
        .map(tournament => ({ tournament, startDate: parseEstDate(tournament.date, tournament.time) }))
        .filter(({ startDate }) => startDate && startDate > now)
        .sort((a, b) => a.startDate - b.startDate)
        .map(({ tournament }) => tournament);

    const picked = [];
    const pickedUrls = new Set();

    const take = (tournament, homeBadge) => {
        if (!tournament || pickedUrls.has(tournament.url)) return;
        picked.push({ ...tournament, homeBadge });
        pickedUrls.add(tournament.url);
    };

    const gtdMatch = upcoming.find(t => GTD_URL_PATTERN.test(t.url || ''));
    if (gtdMatch) {
        const amount = gtdMatch.url.match(GTD_URL_PATTERN)[1];
        take(gtdMatch, `$${amount} GTD`);
    } else {
        const eliteMatch = upcoming.find(t => t.is_elite === true);
        take(eliteMatch, 'Elite Entry');
    }

    const freeMatch = upcoming.find(t => t.is_free === true && !pickedUrls.has(t.url));
    take(freeMatch);

    for (const tournament of upcoming) {
        if (picked.length >= 4) break;
        if (pickedUrls.has(tournament.url)) continue;
        if (tournament.is_free === true) continue;
        if (tournament.is_elite === true) continue;
        if (GTD_URL_PATTERN.test(tournament.url || '')) continue;
        take(tournament);
    }

    // The steps above pick tournaments by priority (GTD/Elite, then free, then
    // regulars), which leaves `picked` out of chronological order. Re-sort the
    // final selection by start date + time so the cards display soonest-first.
    picked.sort((a, b) => parseEstDate(a.date, a.time) - parseEstDate(b.date, b.time));

    return picked;
}
