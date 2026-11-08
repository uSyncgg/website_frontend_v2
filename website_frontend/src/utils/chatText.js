// Turns the links in a chat message into pieces the chat can render as anchors. The server has
// already refused unsafe sites, so this only decides what looks like a link. Everything else
// stays plain text (React escapes it), and only http(s) addresses are ever produced.

export const MAX_CHAT_LENGTH = 500;

const COMMON_TLDS = 'com|gg|tv|net|org|io|me|co|ly|app|dev|gl|be|fm|us|uk|ca|info|gift';
const LINK_RE = new RegExp(
    `((?:https?:\\/\\/|www\\.)[^\\s<>"'\`]+|\\b(?:[a-z0-9-]+\\.)+(?:${COMMON_TLDS})\\b(?:\\/[^\\s<>"'\`]*)?)`,
    'gi'
);
const TRAILING = /[.,;:!?)\]}'"]+$/;

// 'see twitch.tv/usync.' -> [{ text: 'see ' }, { text: 'twitch.tv/usync', href: 'https://twitch.tv/usync' }, { text: '.' }]
export const chatParts = (body) => {
    const parts = [];
    let last = 0;
    for (const match of body.matchAll(LINK_RE)) {
        const raw = match[0];
        const text = raw.replace(TRAILING, '');
        if (match.index > last) parts.push({ text: body.slice(last, match.index) });
        parts.push({ text, href: /^https?:\/\//i.test(text) ? text : `https://${text}` });
        if (text.length < raw.length) parts.push({ text: raw.slice(text.length) });
        last = match.index + raw.length;
    }
    if (last < body.length) parts.push({ text: body.slice(last) });
    return parts;
};
