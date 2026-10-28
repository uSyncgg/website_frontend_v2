import { buildSingleElim, buildRoundRobin, buildBracket, allMatches, bracketProgress, seedPlacement, shuffle, withResult, FORMATS, placements } from "./bracket";

const ids = (n) => Array.from({ length: n }, (_, i) => `p${i + 1}`);

test("seed placement keeps top seeds apart", () => {
    expect(seedPlacement(8)).toEqual([1, 8, 4, 5, 2, 7, 3, 6]);
});

test("single elim gives byes to top seeds when the field isn't a power of two", () => {
    const { rounds } = buildSingleElim(ids(5));
    expect(rounds.map(r => r.length)).toEqual([4, 2, 1]);
    const byes = rounds[0].filter(m => m.status === 'bye').map(m => m.winner);
    expect(byes).toEqual(["p1", "p2", "p3"]);
    // bye winners are already waiting in round 2
    expect(rounds[1][1].a).toBe("p2");
});

test("reporting results advances winners and crowns a champion", () => {
    let results = {};
    let built = buildSingleElim(ids(4));
    results = withResult(results, built.rounds[0][0], 2, 0); // p1 beats p4
    results = withResult(results, built.rounds[0][1], 1, 2); // p3 beats p2
    built = buildSingleElim(ids(4), results);
    expect(built.rounds[1][0]).toMatchObject({ a: "p1", b: "p3", status: "ready" });
    results = withResult(results, built.rounds[1][0], 3, 1);
    expect(buildSingleElim(ids(4), results).champion).toBe("p1");
});

test("changing an earlier result clears the later match it fed", () => {
    let built = buildSingleElim(ids(4));
    let results = withResult({}, built.rounds[0][0], 2, 0);
    results = withResult(results, built.rounds[0][1], 2, 0);
    built = buildSingleElim(ids(4), results);
    results = withResult(results, built.rounds[1][0], 2, 1);
    // flip semifinal 1: p4 now wins, so the final's stored result no longer applies
    results = withResult(results, built.rounds[0][0], 0, 2);
    built = buildSingleElim(ids(4), results);
    expect(built.rounds[1][0]).toMatchObject({ a: "p4", status: "ready" });
    expect(built.champion).toBeNull();
});

test("round robin schedules every pairing exactly once", () => {
    const { rounds } = buildRoundRobin(ids(5));
    const pairs = rounds.flat().map(m => [m.a, m.b].sort().join("-"));
    expect(pairs).toHaveLength(10);
    expect(new Set(pairs).size).toBe(10);
});

test("shuffle keeps every entrant", () => {
    let seed = 1;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    expect(shuffle(ids(8), rand).sort()).toEqual(ids(8));
});

// Plays every ready match until none are left. `pickA(match)` decides whether side A wins.
const playOut = (format, seeds, pickA = (m) => m.seedA < m.seedB) => {
    let results = {};
    for (let guard = 0; guard < 500; guard++) {
        const next = allMatches(buildBracket(format, seeds, results)).find(m => m.status === 'ready');
        if (!next) break;
        results = pickA(next) ? withResult(results, next, 2, 0) : withResult(results, next, 0, 2);
    }
    return buildBracket(format, seeds, results);
};

test.each([2, 3, 4, 5, 6, 8, 11, 16])("double elim with %i entrants plays 2n-2 matches when the top seed never loses", (n) => {
    const built = playOut('double_elim', ids(n));
    expect(built.champion).toBe("p1");
    expect(bracketProgress(built)).toEqual({ done: 2 * n - 2, total: 2 * n - 2 });
    expect(built.grandFinal).toHaveLength(1);
});

test("double elim: grand final reset appears when the losers-side player wins game one", () => {
    const seeds = ids(4);
    let results = {};
    let built = buildBracket('double_elim', seeds, results);
    const step = (pick) => {
        const next = allMatches(buildBracket('double_elim', seeds, results)).find(m => m.status === 'ready');
        results = pick(next) ? withResult(results, next, 2, 0) : withResult(results, next, 0, 2);
        return next;
    };
    // Higher seed wins everything until the grand final, then the losers-side player wins it.
    for (let i = 0; i < 6; i++) {
        const next = allMatches(buildBracket('double_elim', seeds, results)).find(m => m.status === 'ready');
        if (next.id === 'gf1') break;
        step(m => m.seedA < m.seedB);
    }
    built = buildBracket('double_elim', seeds, results);
    expect(built.grandFinal[0]).toMatchObject({ status: 'ready', a: 'p1', b: 'p2' });
    step(() => false); // p2 (losers side) wins game one
    built = buildBracket('double_elim', seeds, results);
    expect(built.grandFinal).toHaveLength(2);
    expect(built.champion).toBeNull();
    step(() => false);
    expect(buildBracket('double_elim', seeds, results).champion).toBe("p2");
});

test("pool play is labelled Pool Play", () => {
    expect(FORMATS.round_robin.label).toBe("Pool Play");
});

test("single elim 3rd place is the semifinal loser who lost to the champion", () => {
    // p4 upsets p1 in their semi, then p2 wins the final: 3rd is p3 (lost to champion p2).
    let results = {};
    let built = buildSingleElim(ids(4));
    results = withResult(results, built.rounds[0][0], 0, 2); // p1 v p4 -> p4
    results = withResult(results, built.rounds[0][1], 2, 0); // p2 v p3 -> p2
    built = buildSingleElim(ids(4), results);
    results = withResult(results, built.rounds[1][0], 0, 2); // p4 v p2 -> p2
    expect(placements('single_elim', buildSingleElim(ids(4), results))).toEqual(["p2", "p4", "p3"]);
});

test("placements: double elim and pool play", () => {
    expect(placements('double_elim', playOut('double_elim', ids(8)))).toEqual(["p1", "p2", "p3"]);
    expect(placements('round_robin', playOut('round_robin', ids(5), (m) => m.a < m.b))).toEqual(["p1", "p2", "p3"]);
    expect(placements('single_elim', buildSingleElim(ids(4)))).toBeNull();
});
