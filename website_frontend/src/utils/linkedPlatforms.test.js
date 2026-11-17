import { LINKED_PLATFORMS, linkChanges, platformsFor, toHandle } from './linkedPlatforms';

const platform = (key) => LINKED_PLATFORMS.find(p => p.key === key);
const linkFor = (key, input) => {
    const handle = toHandle(platform(key), input);
    return handle ? platform(key).url(handle) : '';
};

describe('toHandle', () => {
    test.each([
        'https://x.com/JakeBrewskie',
        'http://x.com/JakeBrewskie',
        'https://www.x.com/JakeBrewskie/',
        'x.com/JakeBrewskie',
        'https://twitter.com/JakeBrewskie',
        'https://x.com/JakeBrewskie?s=21&t=abc',
        'https://x.com/JakeBrewskie/status/123',
        '@JakeBrewskie',
        'JakeBrewskie',
        '  JakeBrewskie  ',
        // Another site's link still only gives the handle, so it links to x.com.
        'https://badword.com/JakeBrewskie',
        'badword.com/JakeBrewskie',
    ])('X: %s', (input) => {
        expect(linkFor('twitter', input)).toBe('https://x.com/JakeBrewskie');
    });

    test.each([
        ['https://www.youtube.com/@JakeBrewskie', 'JakeBrewskie'],
        ['youtube.com/@JakeBrewskie/videos', 'JakeBrewskie'],
        ['https://m.youtube.com/@JakeBrewskie?si=x', 'JakeBrewskie'],
        ['https://www.youtube.com/c/JakeBrewskie', 'JakeBrewskie'],
        ['https://www.youtube.com/user/JakeBrewskie', 'JakeBrewskie'],
        ['@JakeBrewskie', 'JakeBrewskie'],
    ])('YouTube: %s', (input, handle) => {
        expect(toHandle(platform('youtube'), input)).toBe(handle);
    });

    test.each([
        ['https://www.twitch.tv/jakebrewskie', 'twitch', 'jakebrewskie'],
        ['twitch.tv/jakebrewskie/videos', 'twitch', 'jakebrewskie'],
        ['https://kick.com/jakebrewskie', 'kick', 'jakebrewskie'],
        ['https://www.instagram.com/jake.brewskie/?hl=en', 'instagram', 'jake.brewskie'],
        ['jake.brewskie', 'instagram', 'jake.brewskie'],
        ['https://www.tiktok.com/@usync.gg?lang=en', 'tiktok', 'usync.gg'],
        ['https://www.facebook.com/usyncgg/', 'facebook', 'usyncgg'],
        ['https://linktr.ee/usync', 'linktree', 'usync'],
        ['@Jake.Brewskie', 'discord', 'jake.brewskie'],
    ])('%s (%s)', (input, key, handle) => {
        expect(toHandle(platform(key), input)).toBe(handle);
    });

    test.each([
        ['https://www.linkedin.com/company/usync/', 'company/usync'],
        ['linkedin.com/company/usync/about', 'company/usync'],
        ['https://www.linkedin.com/in/jake-brewskie-123', 'in/jake-brewskie-123'],
        ['usync', 'company/usync'],
    ])('LinkedIn: %s', (input, handle) => {
        expect(toHandle(platform('linkedin'), input)).toBe(handle);
    });

    test.each([
        ['https://usync.gg', 'usync.gg'],
        ['https://www.usync.gg/', 'www.usync.gg'],
        ['usync.gg/about?ref=1', 'usync.gg/about'],
        ['not a website', ''],
        ['javascript:alert(1)', ''],
    ])('Website: %s', (input, handle) => {
        expect(toHandle(platform('website'), input)).toBe(handle);
    });

    test('game IDs are kept as typed', () => {
        expect(toHandle(platform('riot'), ' Brewskie#NA1 ')).toBe('Brewskie#NA1');
    });

    test('blank and junk give no handle', () => {
        expect(toHandle(platform('twitter'), '   ')).toBe('');
        expect(toHandle(platform('twitter'), 'https://x.com/')).toBe('');
        expect(toHandle(platform('twitter'), '<script>')).toBe('script');
    });

    test.each([
        ['@Jake.Brewskie', 'jake.brewskie'],
        ['jakebrewskie', 'jakebrewskie'],
        ['https://discord.gg/usync', ''],
        ['discord.com/users/123', ''],
    ])('player Discord is a username only: %s', (input, handle) => {
        const discord = platformsFor('player').find(p => p.key === 'discord');
        expect(discord.url).toBeUndefined();
        expect(toHandle(discord, input)).toBe(handle);
    });

    test.each([
        'https://discord.gg/usync',
        'discord.gg/usync',
        'https://discord.com/invite/usync?event=1',
        'https://badword.com/usync',
        'usync',
    ])('host/venue Discord server always links to discord.gg: %s', (input) => {
        for (const type of ['host', 'venue']) {
            const server = platformsFor(type).find(p => p.key === 'discord');
            expect(server.url(toHandle(server, input))).toBe('https://discord.gg/usync');
        }
    });
});

describe('linkChanges', () => {
    test('player: socials reduced to handles, coming-soon links kept, game accounts never sent', () => {
        const existing = { type: 'player', links: { faceit: 'OldFaceit', twitch: 'old' } };
        expect(linkChanges(existing, {
            twitter: 'https://x.com/JakeBrewskie?s=1',
            twitch: '',
            riot: 'Brewskie#NA1',
            faceit: 'ignored',
        })).toEqual({ twitter: 'JakeBrewskie', faceit: 'OldFaceit' });
    });

    test('host: brand links and Discord server, platforms a host cannot have are dropped', () => {
        expect(linkChanges({ type: 'host' }, {
            website: 'https://www.usync.gg/',
            discord: 'https://discord.gg/AbC123',
            steam: '123',
            faceit: 'x',
        })).toEqual({ website: 'www.usync.gg', discord: 'AbC123' });
    });
});
