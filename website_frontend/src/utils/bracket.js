// How brackets are shown. The backend builds every bracket (its Python engine is the only copy
// of the pairing rules) and sends it as `event.bracket.built`:
//   { rounds, losersRounds?, grandFinal?, standings?, champion?, placements, progress }
// with each match as { id, round, slot, a, b, status, winner, loser, scoreA, scoreB, bestOf, ... }.
// These helpers only name and find things in that structure - they never pair anyone.

// Stands in for "nobody" where a bracket isn't full: a first-round bye, or the loser of a bye
// match dropping into the losers bracket.
export const BYE = '__bye__';
export const isEntrant = (id) => !!id && id !== BYE;

// ---- seeding (the order the host submits; the server builds the bracket from it) ----------

// Fisher-Yates; `rand` is injectable so tests can be deterministic.
export const shuffle = (list, rand = Math.random) => {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
};

export const SEEDING_METHODS = {
    registration: { label: 'Registration order', sort: (list) => [...list].sort((a, b) => a.registeredAt.localeCompare(b.registeredAt)) },
    random: { label: 'Random', sort: (list) => shuffle(list) },
};

// ---- names -------------------------------------------------------------------

// Round 1, Round 2, ... Quarterfinals, Semifinals, Final ("Winners Final" with a prefix).
export const roundName = (round, totalRounds, prefix = '') => {
    const fromEnd = totalRounds - round;
    if (fromEnd === 1) return prefix ? `${prefix} Final` : 'Final';
    if (fromEnd === 2) return 'Semifinals';
    if (fromEnd === 3) return 'Quarterfinals';
    return `Round ${round + 1}`;
};

export const losersRoundName = (round, totalRounds) =>
    round === totalRounds - 1 ? 'Losers Final' : `Losers Round ${round + 1}`;

// What a match is called on its own page: "Semifinals", "Losers Round 2", "Grand Final", "Round 3".
export const matchRoundLabel = (format, built, match) => {
    if (format === 'round_robin' || format === 'swiss') return `Round ${match.round + 1}`;
    if (match.bracket === 'grand') return match.round === 0 ? 'Grand Final' : 'Grand Final Reset';
    if (match.bracket === 'losers') return losersRoundName(match.round, built.losersRounds.length);
    return roundName(match.round, built.rounds.length, format === 'double_elim' ? 'Winners' : '');
};

// ---- finding things ------------------------------------------------------------

export const allMatches = (built) => [
    ...(built?.rounds ?? []).flat(),
    ...(built?.losersRounds ?? []).flat(),
    ...(built?.grandFinal ?? []),
];

export const findMatch = (built, matchId) => allMatches(built).find(m => m.id === matchId) ?? null;

// How many first-round byes a single elimination draft has.
export const firstRoundByes = (built) => (built?.rounds?.[0] ?? []).filter(m => m.status === 'bye').length;
