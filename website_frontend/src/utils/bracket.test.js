import { buildSingleElim, buildRoundRobin, seedPlacement, shuffle, withResult } from "./bracket";

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
