import { roundName, losersRoundName, matchRoundLabel, findMatch, firstRoundByes, shuffle, SEEDING_METHODS, isEntrant, BYE } from './bracket';

// Brackets are built by the server; these helpers only name and find things in what it sends.
const m = (id, round, extra = {}) => ({ id, round, slot: 0, a: 'x', b: 'y', status: 'ready', ...extra });
const single = { rounds: [[m('r0m0', 0, { status: 'bye', b: BYE }), m('r0m1', 0)], [m('r1m0', 1)]] };
const double = {
    rounds: [[m('r0m0', 0)], [m('r1m0', 1)]],
    losersRounds: [[m('l0m0', 0, { bracket: 'losers' })], [m('l1m0', 1, { bracket: 'losers' })]],
    grandFinal: [m('gf1', 0, { bracket: 'grand' }), m('gf2', 1, { bracket: 'grand' })],
};

test('round names count back from the final', () => {
    expect(roundName(3, 4)).toBe('Final');
    expect(roundName(2, 4)).toBe('Semifinals');
    expect(roundName(1, 4)).toBe('Quarterfinals');
    expect(roundName(0, 4)).toBe('Round 1');
    expect(roundName(1, 2, 'Winners')).toBe('Winners Final');
    expect(losersRoundName(1, 2)).toBe('Losers Final');
    expect(losersRoundName(0, 2)).toBe('Losers Round 1');
});

test('match labels per format', () => {
    expect(matchRoundLabel('single_elim', single, single.rounds[1][0])).toBe('Final');
    expect(matchRoundLabel('double_elim', double, double.grandFinal[0])).toBe('Grand Final');
    expect(matchRoundLabel('double_elim', double, double.grandFinal[1])).toBe('Grand Final Reset');
    expect(matchRoundLabel('double_elim', double, double.losersRounds[0][0])).toBe('Losers Round 1');
    expect(matchRoundLabel('double_elim', double, double.rounds[1][0])).toBe('Winners Final');
    expect(matchRoundLabel('swiss', single, m('sw2m0', 2))).toBe('Round 3');
});

test('finds matches anywhere in the bracket, and counts first-round byes', () => {
    expect(findMatch(double, 'l1m0').id).toBe('l1m0');
    expect(findMatch(double, 'gf2').id).toBe('gf2');
    expect(findMatch(double, 'nope')).toBeNull();
    expect(firstRoundByes(single)).toBe(1);
});

test('seeding helpers', () => {
    const list = [{ id: 'b', registeredAt: '2030-01-02' }, { id: 'a', registeredAt: '2030-01-01' }];
    expect(SEEDING_METHODS.registration.sort(list).map(e => e.id)).toEqual(['a', 'b']);
    expect(shuffle([1, 2, 3, 4], () => 0).sort()).toEqual([1, 2, 3, 4]);
    expect(isEntrant(BYE)).toBe(false);
    expect(isEntrant('e1')).toBe(true);
});
