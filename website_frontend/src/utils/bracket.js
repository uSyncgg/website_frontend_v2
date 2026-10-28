// Pure bracket logic: seeding, bracket generation and result reporting.
// Brackets are derived from (seeds + results) every time, so changing an early
// result automatically clears any later match it no longer feeds into.

export const FORMATS = {
    single_elim: { label: 'Single Elimination', blurb: 'Lose once and you\'re out. Fast, classic bracket.' },
    double_elim: { label: 'Double Elimination', blurb: 'Winners and losers brackets - lose twice to be out.' },
    round_robin: { label: 'Pool Play', blurb: 'Everyone in the pool plays everyone. Best for small groups and leagues.' },
};

// Stands in for "nobody" where a bracket isn't full: a first-round bye, or the
// loser of a bye match dropping into the losers bracket.
export const BYE = '__bye__';
export const isEntrant = (id) => !!id && id !== BYE;

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
export const sameMatchup = (record, match) => !!record && record.a === match.a && record.b === match.b;

// status: 'empty' (bye vs bye) | 'bye' | 'pending' (waiting on an earlier match) | 'ready' | 'complete'
const decide = (match, results) => {
    const { a, b } = match;
    if (a === BYE && b === BYE) return { ...match, status: 'empty', winner: BYE, loser: BYE };
    if (a === BYE || b === BYE) {
        const other = a === BYE ? b : a;
        if (!other) return { ...match, status: 'pending', winner: null, loser: null };
        return { ...match, status: 'bye', winner: other, loser: BYE };
    }
    if (!a || !b) return { ...match, status: 'pending', winner: null, loser: null };
    const r = results[match.id];
    if (!sameMatchup(r, match)) return { ...match, status: 'ready', winner: null, loser: null };
    const aWon = r.scoreA > r.scoreB;
    return {
        ...match, status: 'complete', scoreA: r.scoreA, scoreB: r.scoreB, forfeit: !!r.forfeit,
        winner: aWon ? a : b, loser: aWon ? b : a,
    };
};

const seedLookup = (seeds) => (id) => (isEntrant(id) ? seeds.indexOf(id) + 1 : null);

// ---- single elimination ----------------------------------------------------

// seeds: entrant ids in seed order (index 0 = seed 1).
// Returns { rounds: [[match]], champion }.
export const buildSingleElim = (seeds, results = {}) => {
    if (seeds.length < 2) return { rounds: [], champion: null };
    const size = nextPowerOfTwo(seeds.length);
    const placement = seedPlacement(size);
    const seedOf = seedLookup(seeds);
    const make = (id, round, slot, a, b) => decide({ id, round, slot, a, b, seedA: seedOf(a), seedB: seedOf(b) }, results);
    const rounds = [];

    const first = [];
    for (let slot = 0; slot < size / 2; slot++) {
        const a = seeds[placement[slot * 2] - 1] ?? BYE;
        const b = seeds[placement[slot * 2 + 1] - 1] ?? BYE;
        first.push(make(`r0m${slot}`, 0, slot, a, b));
    }
    rounds.push(first);

    for (let round = 1; size / 2 ** (round + 1) >= 1; round++) {
        const prev = rounds[round - 1];
        const matches = [];
        for (let slot = 0; slot < prev.length / 2; slot++) {
            matches.push(make(`r${round}m${slot}`, round, slot, prev[slot * 2].winner, prev[slot * 2 + 1].winner));
        }
        rounds.push(matches);
    }

    const final = rounds[rounds.length - 1][0];
    return { rounds, champion: final.status === 'complete' ? final.winner : null };
};

// Rounds are numbered until the last three, which get their usual names.
export const roundName = (round, totalRounds, prefix = '') => {
    const fromEnd = totalRounds - round;
    if (fromEnd === 1) return prefix ? `${prefix} Final` : 'Final';
    if (fromEnd === 2) return 'Semifinals';
    if (fromEnd === 3) return 'Quarterfinals';
    return `Round ${round + 1}`;
};

// ---- double elimination ----------------------------------------------------

// Winners bracket is a normal single-elim bracket. Losers drop into the losers
// bracket, which alternates two kinds of round:
//   - "minor": losers-bracket survivors play each other (halves the field)
//   - "major": survivors play the players just dropped from the winners bracket
// The winners and losers champions meet in the grand final; if the losers-side
// player wins it, a reset match decides it (everyone has to lose twice).
export const buildDoubleElim = (seeds, results = {}) => {
    const wb = buildSingleElim(seeds, results);
    if (!wb.rounds.length) return { rounds: [], losersRounds: [], grandFinal: [], champion: null };
    const seedOf = seedLookup(seeds);
    const make = (id, round, slot, a, b, bracket) =>
        decide({ id, round, slot, a, b, seedA: seedOf(a), seedB: seedOf(b), bracket }, results);
    const k = wb.rounds.length;
    const lr = [];

    if (k >= 2) {
        const first = wb.rounds[0];
        const r0 = [];
        for (let i = 0; i < first.length / 2; i++) r0.push(make(`l0m${i}`, 0, i, first[i * 2].loser, first[i * 2 + 1].loser, 'losers'));
        lr.push(r0);

        for (let j = 1; j < k; j++) {
            const prev = lr[lr.length - 1];
            const dropped = wb.rounds[j].map(m => m.loser);
            // Flip the drop order every other round so players don't rematch straight away.
            const ordered = j % 2 ? [...dropped].reverse() : dropped;
            const majorIndex = lr.length;
            lr.push(prev.map((m, i) => make(`l${majorIndex}m${i}`, majorIndex, i, ordered[i], m.winner, 'losers')));

            if (j < k - 1) {
                const p = lr[lr.length - 1];
                const minorIndex = lr.length;
                const minor = [];
                for (let i = 0; i < p.length / 2; i++) minor.push(make(`l${minorIndex}m${i}`, minorIndex, i, p[i * 2].winner, p[i * 2 + 1].winner, 'losers'));
                lr.push(minor);
            }
        }
    }

    const wbFinal = wb.rounds[k - 1][0];
    const wbChamp = wbFinal.status === 'complete' ? wbFinal.winner : null;
    const lbChamp = k === 1 ? wbFinal.loser : lr[lr.length - 1][0].winner;

    const gf1 = make('gf1', 0, 0, wbChamp, lbChamp, 'grand');
    const grandFinal = [gf1];
    let champion = null;
    if (gf1.status === 'bye') champion = gf1.winner;
    if (gf1.status === 'complete') {
        if (gf1.winner === wbChamp) {
            champion = wbChamp;
        } else {
            const gf2 = make('gf2', 1, 0, wbChamp, lbChamp, 'grand');
            grandFinal.push(gf2);
            if (gf2.status === 'complete') champion = gf2.winner;
        }
    }

    return { rounds: wb.rounds, losersRounds: lr, grandFinal, champion };
};

export const losersRoundName = (round, totalRounds) =>
    round === totalRounds - 1 ? 'Losers Final' : `Losers Round ${round + 1}`;

// ---- pool play (round robin) -----------------------------------------------

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
        const margin = Math.abs(match.scoreA - match.scoreB);
        table[match.winner].wins++;
        table[match.winner].diff += margin;
        table[match.loser].losses++;
        table[match.loser].diff -= margin;
        table[match.a].played++;
        table[match.b].played++;
    }
    const standings = Object.values(table).sort((x, y) => y.wins - x.wins || y.diff - x.diff);
    return { rounds, standings };
};

// ---- shared ----------------------------------------------------------------

export const buildBracket = (format, seeds, results) => {
    if (format === 'round_robin') return buildRoundRobin(seeds, results);
    if (format === 'double_elim') return buildDoubleElim(seeds, results);
    return buildSingleElim(seeds, results);
};

export const allMatches = (built) => [
    ...built.rounds.flat(),
    ...(built.losersRounds ?? []).flat(),
    ...(built.grandFinal ?? []),
];

export const bracketProgress = (built) => {
    const playable = allMatches(built).filter(m => m.status !== 'bye' && m.status !== 'empty');
    const done = playable.filter(m => m.status === 'complete').length;
    return { done, total: playable.length };
};

// Results are stored with the players they were reported for (see sameMatchup).
export const withResult = (results, match, scoreA, scoreB, extra = {}) => ({
    ...results,
    [match.id]: { a: match.a, b: match.b, scoreA, scoreB, ...extra },
});

export const withoutResult = (results, matchId) => {
    const { [matchId]: _removed, ...rest } = results;
    return rest;
};
