import { chatParts } from './chatText';

describe('chatParts', () => {
    it('leaves plain text alone', () => {
        expect(chatParts('gg, see you at 5.30pm')).toEqual([{ text: 'gg, see you at 5.30pm' }]);
    });

    it('turns http, www and common bare domains into https links', () => {
        const hrefs = chatParts('a https://discord.gg/x b www.twitch.tv/usync c youtube.com/watch?v=1')
            .filter(p => p.href).map(p => p.href);
        expect(hrefs).toEqual(['https://discord.gg/x', 'https://www.twitch.tv/usync', 'https://youtube.com/watch?v=1']);
    });

    it('keeps trailing punctuation out of the link', () => {
        expect(chatParts('see twitch.tv/usync.')).toEqual([
            { text: 'see ' }, { text: 'twitch.tv/usync', href: 'https://twitch.tv/usync' }, { text: '.' },
        ]);
    });

    it('never produces a link from a javascript: address', () => {
        expect(chatParts('javascript:alert(1)').some(p => p.href)).toBe(false);
    });
});
