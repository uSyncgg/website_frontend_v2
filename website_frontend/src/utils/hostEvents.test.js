import { eventContextFromPath, HOST_GAMES } from './hostEvents';
import { createEventUrl } from './profiles';

describe('eventContextFromPath', () => {
    it('reads the event type and game from a game section page', () => {
        expect(eventContextFromPath('/games/call-of-duty/leagues')).toEqual({ type: 'league', game: 'Call of Duty' });
        expect(eventContextFromPath('/games/halo/lans')).toEqual({ type: 'lan', game: 'Halo' });
        expect(eventContextFromPath('/games/CS2/wagers')).toEqual({ type: 'wager', game: 'CS2' });
        expect(eventContextFromPath('/games/Valorant/head-to-head')).toEqual({ type: 'h2h', game: 'Valorant' });
    });

    it('works on an event under the section and ignores case', () => {
        expect(eventContextFromPath('/games/call-of-duty/leagues/some-league')).toEqual({ type: 'league', game: 'Call of Duty' });
        expect(eventContextFromPath('/games/rocketleague/head-to-head/rl-site')).toEqual({ type: 'h2h', game: 'Rocket League' });
    });

    it("doesn't match a different section that starts the same", () => {
        expect(eventContextFromPath('/games/call-of-duty/leaguesxyz')).toEqual({});
        expect(eventContextFromPath('/games/call-of-duty/tournaments')).toEqual({});
        expect(eventContextFromPath('/leagues')).toEqual({});
    });
});

describe('HOST_GAMES', () => {
    it('is the supported titles, without "Other"', () => {
        expect(HOST_GAMES).toEqual(expect.arrayContaining(['Call of Duty', 'Warzone', 'Halo', 'League of Legends', 'Rocket League', 'Valorant', 'CS2']));
        expect(HOST_GAMES).not.toContain('Other');
    });
});

describe('createEventUrl', () => {
    it('carries the profile and any pre-fill', () => {
        expect(createEventUrl('abc')).toBe('/host/events/new?profile=abc');
        expect(createEventUrl('abc', { type: 'league', game: 'Call of Duty' })).toBe('/host/events/new?profile=abc&type=league&game=Call+of+Duty');
    });
});
