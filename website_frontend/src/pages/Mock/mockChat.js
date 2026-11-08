import { useCallback, useState } from "react";

// MOCK DATA FOR THE CHAT PREVIEW PAGES (/mock/chat*). Delete src/pages/Mock when the chat is
// signed off. Nothing here touches the API: it's the same shape useMatchChat gets from the
// server, held in memory, with a tiny stand-in for the server's word and link filters.

const minutesAgo = (m) => new Date(Date.now() - m * 60000).toISOString();
const inDays = (d) => new Date(Date.now() + d * 86400000).toISOString();

let nextId = 1000;

const user = (id, name, text, ago, { mine = false, role = 'player' } = {}) =>
    ({ id, kind: 'user', sender: { name, role }, body: text, at: minutesAgo(ago), mine });
const system = (id, text, ago) => ({ id, kind: 'system', sender: null, body: text, at: minutesAgo(ago), mine: false });

const CONVERSATION = [
    user(1, 'cat', 'hey, you guys ready? we can start whenever', 42),
    user(2, 'ace', 'yep! lobby is up, code is on the event page', 40, { mine: true }),
    user(3, 'cat', 'cool. which side do you want for Hardpoint?', 38),
    user(4, 'ace', 'we pick, you ban, same as the rules. rules: https://discord.gg/usync', 36, { mine: true }),
    user(5, 'cat', 'ok sending invites now', 30),
];

const BASE = {
    role: 'player', open: true, closedReason: null, joined: false, canRead: true, canWrite: true,
    canRequestAdmin: true, canJoin: false, adminRequested: false, adminRequestedAt: null, adminRequestReason: null,
    admins: [], expiresAt: null,
};

export const SCENARIOS = [
    {
        key: 'player', label: 'Player: chatting', blurb: 'What either side of the match sees. Try sending a message, or the blocked examples below.',
        build: () => ({ chat: { ...BASE }, messages: CONVERSATION }),
    },
    {
        key: 'requested', label: 'Player: admin requested', blurb: 'After a player taps "Request an admin" the chat says so and the button locks. Admins get a bell notification.',
        build: () => ({
            chat: { ...BASE, canRequestAdmin: false, adminRequested: true, adminRequestedAt: minutesAgo(3), adminRequestReason: 'requested' },
            messages: [...CONVERSATION, user(6, 'cat', 'they are not showing up, I am requesting an admin', 8),
                system(7, 'cat requested an admin to join this chat.', 7)],
        }),
    },
    {
        key: 'joined', label: 'Player: admin joined', blurb: 'The chat tells the players when an admin joins, and who.',
        build: () => ({
            chat: { ...BASE, canRequestAdmin: false, adminRequested: true, adminRequestReason: 'requested', joined: false, admins: [{ name: 'ModMike', joinedAt: minutesAgo(2) }] },
            messages: [...CONVERSATION, system(6, 'cat requested an admin to join this chat.', 6), system(7, 'Admin ModMike joined the chat.', 2),
                user(8, 'ModMike', 'Hi both, I am the host. What is going on?', 1, { role: 'admin' })],
        }),
    },
    {
        key: 'dispute', label: 'Auto-invite: score dispute', blurb: 'The two sides reported different scores, so an admin is invited to the chat without anyone asking.',
        build: () => ({
            chat: { ...BASE, canRequestAdmin: false, adminRequested: true, adminRequestedAt: minutesAgo(1), adminRequestReason: 'dispute' },
            messages: [...CONVERSATION, user(6, 'ace', 'we won 3-1', 6, { mine: true }), user(7, 'cat', 'no, it was 2-3 and you left', 5),
                system(8, "The scores don't match, so an admin has been invited to this chat to sort it out.", 1)],
        }),
    },
    {
        key: 'noshow', label: 'Auto-invite: no-show', blurb: 'Reporting a no-show invites an admin to the chat automatically.',
        build: () => ({
            chat: { ...BASE, canRequestAdmin: false, adminRequested: true, adminRequestedAt: minutesAgo(1), adminRequestReason: 'no_show' },
            messages: [user(1, 'ace', 'hello? we are in the lobby', 25, { mine: true }), user(2, 'ace', 'it has been 15 minutes', 12, { mine: true }),
                system(3, 'ace reported cat as a no-show, so an admin has been invited to this chat.', 1)],
        }),
    },
    {
        key: 'admin-waiting', label: 'Admin: not joined yet', blurb: 'What the host or an event admin sees on the match page before joining: no messages, a banner and a Join button.',
        build: () => ({
            chat: { ...BASE, role: 'admin', canRead: false, canWrite: false, canRequestAdmin: false, canJoin: true, adminRequested: true, adminRequestedAt: minutesAgo(3), adminRequestReason: 'dispute' },
            messages: [],
        }),
        // After "Join chat" the admin gets the whole history and the players get a system message.
        onJoin: (s) => ({
            chat: { ...s.chat, canRead: true, canWrite: true, canJoin: false, joined: true, admins: [{ name: 'ModMike', joinedAt: new Date().toISOString() }] },
            messages: [...DISPUTE_HISTORY, system(nextId++, 'Admin ModMike joined the chat.', 0)],
        }),
    },
    {
        key: 'admin-joined', label: 'Admin: joined', blurb: 'After joining, the admin sees the full history from before they arrived and can write.',
        build: () => ({
            chat: { ...BASE, role: 'admin', canRequestAdmin: false, canJoin: false, joined: true, adminRequested: true, adminRequestReason: 'dispute', admins: [{ name: 'ModMike', joinedAt: minutesAgo(2) }] },
            messages: [...DISPUTE_HISTORY, system(9, 'Admin ModMike joined the chat.', 2)],
        }),
    },
    {
        key: 'not-open', label: 'Not open yet', blurb: 'A later-round match whose opponent is still being decided has a room, but it stays closed until both sides are known.',
        build: () => ({
            chat: { ...BASE, open: false, closedReason: 'This chat opens once both sides of the match are decided.', canWrite: false, canRequestAdmin: false },
            messages: [],
        }),
    },
    {
        key: 'ending', label: 'Event finished', blurb: 'Once every match is played the chat shows the day it will be deleted (3 days after the event ends).',
        build: () => ({ chat: { ...BASE, expiresAt: inDays(3) }, messages: CONVERSATION }),
    },
];

const DISPUTE_HISTORY = [
    ...CONVERSATION,
    user(6, 'ace', 'we won 3-1', 6, { mine: true }),
    user(7, 'cat', 'no, it was 2-3 and you left', 5),
    system(8, "The scores don't match, so an admin has been invited to this chat to sort it out.", 4),
];

// A stand-in for the server's filters, so the mock can show the rejections.
const FAKE_BANNED_WORDS = ['fuck', 'shit', 'bitch', 'cunt'];
const FAKE_BANNED_LINKS = [
    [/\b(?:bit\.ly|tinyurl\.com|t\.ly)\b/i, "Shortened links aren't allowed. Paste the full address instead."],
    [/\b(?:pornhub|xvideos|onlyfans)\.com\b|\.xxx\b/i, "Links to adult sites aren't allowed."],
    [/\b(?:grabify\.link|iplogger\.org)\b/i, 'That link is blocked because it\'s known to be unsafe.'],
    [/https?:\/\/\d{1,3}(?:\.\d{1,3}){3}/i, "Links to raw IP addresses aren't allowed."],
    [/\.(?:exe|scr|bat|apk|msi)\b/i, "Links to downloadable programs aren't allowed."],
];

export const mockScreen = (text) => {
    const squashed = text.toLowerCase().replace(/[\s._*-]+/g, '');
    if (FAKE_BANNED_WORDS.some(w => squashed.includes(w))) return "That message contains language that isn't allowed. Please reword it.";
    const link = FAKE_BANNED_LINKS.find(([re]) => re.test(text));
    return link ? link[1] : null;
};

// Same shape as useMatchChat's return value, but in memory.
export const useMockChat = (scenario) => {
    const [state, setState] = useState(() => scenario.build());
    const [sendError, setSendError] = useState('');
    const [busy, setBusy] = useState(false);

    const reset = useCallback(() => { setState(scenario.build()); setSendError(''); }, [scenario]);

    const send = useCallback(async (body) => {
        const reason = mockScreen(body);
        if (reason) { setSendError(reason); return false; }
        setSendError('');
        setState(s => ({
            ...s,
            messages: [...s.messages, { id: nextId++, kind: 'user', sender: { name: s.chat.role === 'admin' ? 'ModMike' : 'ace', role: s.chat.role }, body, at: new Date().toISOString(), mine: true }],
        }));
        return true;
    }, []);

    const requestAdmin = useCallback(async () => {
        setBusy(true);
        await new Promise(r => setTimeout(r, 350));
        setState(s => ({
            chat: { ...s.chat, canRequestAdmin: false, adminRequested: true, adminRequestReason: 'requested', adminRequestedAt: new Date().toISOString() },
            messages: [...s.messages, system(nextId++, 'ace requested an admin to join this chat.', 0)],
        }));
        setBusy(false);
        return true;
    }, []);

    const join = useCallback(async () => {
        setBusy(true);
        await new Promise(r => setTimeout(r, 350));
        setState(s => scenario.onJoin ? scenario.onJoin(s) : s);
        setBusy(false);
        return true;
    }, [scenario]);

    return { chat: state.chat, messages: state.messages, error: '', sendError, busy, send, requestAdmin, join, clearSendError: () => setSendError(''), reset };
};
