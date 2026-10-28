// Pure bracket logic: seeding, bracket generation and result reporting.
// Brackets are derived from (seeds + results) every time, so changing an early
// result automatically clears any later match it no longer feeds into.

export const FORMATS = {
    single_elim: { label: 'Single Elimination', available: true },
    round_robin: { label: 'Round Robin', available: true },
    double_elim: { label: 'Double Elimination', available: false },
};

// ---- seeding ---------------------------------------------------------------

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
    rating: { label: 'By skill rating', sort: (list) => [...list].sort((a, b) => b.rating - a.rating) },
    registration: { label: 'Registration order', sort: (list) => [...list].sort((a, b) => a.registeredAt.localeCompare(b.registeredAt)) },
    random: { label: 'Random', sort: (list) => shuffle(list) },
};

// Standard bracket placement so seed 1 and 2 can only meet in the final:
// size 8 -> [1, 8, 4, 5, 2, 7, 3, 6] (read as consecutive pairs).
export const seedPlacement = (size) => {
    let order = [1];
    while (order.length < size) {
        const sum = order.length * 2 + 1;
        order = order.flatMap(seed => [seed, sum - seed]);
    }
    return order;
};

const nextPowerOfTwo = (n) => {
    let size = 2;
    while (size < n) size *= 2;
    return size;
};

// A stored result only counts if it was reported for the same two players
// who are in the match now.
const resultFor = (results, id, a, b) => {
    const r = results[id];
    return r && r.a === a && r.b === b ? r : null;
};

const decide = (match, results) => {
    const { a, b } = match;
    if (a && !b && match.round === 0) return { ...match, status: 'bye', winner: a };
    if (b && !a && match.round === 0) return { ...match, status: 'bye', winner: b };
    if (!a || !b) return { ...match, status: 'pending', winner: null };
    const r = resultFor(results, match.id, a, b);
    if (!r) return { ...match, status: 'ready', winner: null };
    return { ...match, status: 'complete', scoreA: r.scoreA, scoreB: r.scoreB, winner: r.scoreA > r.scoreB ? a : b };
};

// ---- single elimination ----------------------------------------------------

// seeds: entrant ids in seed order (index 0 = seed 1).
// Returns { rounds: [[match]], champion } where match = { id, round, slot, a, b, seedA, seedB, status, winner, scoreA, scoreB }.
export const buildSingleElim = (seeds, results = {}) => {
    if (seeds.length < 2) return { rounds: [], champion: null };
    const size = nextPowerOfTwo(seeds.length);
    const placement = seedPlacement(size);
    const seedOf = (id) => (id ? seeds.indexOf(id) + 1 : null);
    const rounds = [];

    const first = [];
    for (let slot = 0; slot < size / 2; slot++) {
        const a = seeds[placement[slot * 2] - 1] ?? null;
        const b = seeds[placement[slot * 2 + 1] - 1] ?? null;
        first.push(decide({ id: `r0m${slot}`, round: 0, slot, a, b, seedA: seedOf(a), seedB: seedOf(b) }, results));
    }
    rounds.push(first);

    for (let round = 1; size / 2 ** (round + 1) >= 1; round++) {
        const prev = rounds[round - 1];
        const matches = [];
        for (let slot = 0; slot < prev.length / 2; slot++) {
            const a = prev[slot * 2].winner;
            const b = prev[slot * 2 + 1].winner;
            matches.push(decide({ id: `r${round}m${slot}`, round, slot, a, b, seedA: seedOf(a), seedB: seedOf(b) }, results));
        }
        rounds.push(matches);
    }

    const final = rounds[rounds.length - 1][0];
    return { rounds, champion: final.status === 'complete' ? final.winner : null };
};

export const roundName = (round, totalRounds) => {
    const fromEnd = totalRounds - round;
    if (fromEnd === 1) return 'Final';
    if (fromEnd === 2) return 'Semifinals';
    if (fromEnd === 3) return 'Quarterfinals';
    return `Round ${round + 1}`;
};

// ---- round robin -----------------------------------------------------------

// Circle method: everyone plays everyone once. Odd counts get a rotating bye.
export const buildRoundRobin = (seeds, results = {}) => {
    if (seeds.length < 2) return { rounds: [], standings: [] };
    const players = seeds.length % 2 ? [...seeds, null] : [...seeds];
    const n = players.length;
    const rotating = players.slice(1);
    const rounds = [];

    for (let round = 0; round < n - 1; round++) {
        const lineup = [players[0], ...rotating];
        const matches = [];
        for (let i = 0; i < n / 2; i++) {
            const a = lineup[i];
            const b = lineup[n - 1 - i];
            if (!a || !b) continue; // the bye
            matches.push(decide({ id: `rr${round}m${i}`, round, slot: i, a, b }, results));
        }
        rounds.push(matches);
        rotating.unshift(rotating.pop());
    }

    const table = Object.fromEntries(seeds.map(id => [id, { id, played: 0, wins: 0, losses: 0, diff: 0 }]));
    for (const match of rounds.flat()) {
        if (match.status !== 'complete') continue;
        const loser = match.winner === match.a ? match.b : match.a;
        const margin = Math.abs(match.scoreA - match.scoreB);
        table[match.winner].wins++;
        table[match.winner].diff += margin;
        table[loser].losses++;
        table[loser].diff -= margin;
        table[match.a].played++;
        table[match.b].played++;
    }
    const standings = Object.values(table).sort((x, y) => y.wins - x.wins || y.diff - x.diff);
    return { rounds, standings };
};

// ---- shared ----------------------------------------------------------------

export const buildBracket = (format, seeds, results) =>
    format === 'round_robin' ? buildRoundRobin(seeds, results) : buildSingleElim(seeds, results);

export const allMatches = (built) => built.rounds.flat();

export const bracketProgress = (built) => {
    const playable = allMatches(built).filter(m => m.status !== 'bye');
    const done = playable.filter(m => m.status === 'complete').length;
    return { done, total: playable.length };
};

// Results are stored with the players they were reported for (see resultFor).
export const withResult = (results, match, scoreA, scoreB) => ({
    ...results,
    [match.id]: { a: match.a, b: match.b, scoreA, scoreB },
});

export const withoutResult = (results, matchId) => {
    const { [matchId]: _removed, ...rest } = results;
    return rest;
};
