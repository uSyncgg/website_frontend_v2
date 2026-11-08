import { useCallback, useMemo, useState } from "react";

// MOCK DATA FOR THE CHAT PREVIEW PAGES (/mock/chat*). Delete src/pages/Mock when the chat is
// signed off. Nothing here touches the API: it's the same shape useMatchChat gets from the
// server, held in memory, with a tiny stand-in for the server's word and link filters and
// for the limits on how fast you can send.

const minutesAgo = (m) => new Date(Date.now() - m * 60000).toISOString();
const inDays = (d) => new Date(Date.now() + d * 86400000).toISOString();

let nextId = 1000;

const user = (id, name, text, ago, { mine = false, role = 'player', hidden = false, hiddenBy = null } = {}) =>
    ({ id, kind: 'user', sender: { name, role }, body: text, at: minutesAgo(ago), mine, hidden, hiddenBy });
const system = (id, text, ago) => ({ id, kind: 'system', sender: null, body: text, at: minutesAgo(ago), mine: false });

const CONVERSATION = [
    user(1, 'cat', 'hey, you guys ready? we can start whenever', 42),
    user(2, 'ace', 'yep! lobby is up, code is on the event page', 40, { mine: true }),
    user(3, 'cat', 'cool. which side do you want for Hardpoint?', 38),
    user(4, 'ace', 'we pick, you ban, same as the rules. rules: https://discord.gg/usync', 36, { mine: true }),
    user(5, 'cat', 'ok sending invites now', 30),
];

const DISPUTE_HISTORY = [
    ...CONVERSATION,
    user(6, 'ace', 'we won 3-1', 6, { mine: true }),
    user(7, 'cat', 'no, it was 2-3 and you left', 5),
    user(8, 'cat', 'you are all garbage, uninstall the game', 4, { hidden: false }),
    system(9, "The scores don't match, so an admin has been invited to this chat to sort it out.", 4),
];

const BASE = {
    role: 'player', open: true, ended: false, closedReason: null, joined: false,
    adminRequested: false, adminRequestedAt: null, adminRequestReason: null, admins: [], expiresAt: null,
};

export const SCENARIOS = [
    {
        key: 'player', label: 'Player: chatting', blurb: 'What either side of the match sees. Send a message, report one of cat\'s messages, or try the blocked examples below.',
        build: () => ({ chat: { ...BASE }, messages: CONVERSATION }),
    },
    {
        key: 'requested', label: 'Player: admin requested', blurb: 'After a player taps "Request an admin" the chat says so and the button locks. Admins get a bell notification.',
        build: () => ({
            chat: { ...BASE, adminRequested: true, adminRequestedAt: minutesAgo(3), adminRequestReason: 'requested' },
            messages: [...CONVERSATION, user(6, 'cat', 'they are not showing up, I am requesting an admin', 8),
                system(7, 'cat requested an admin to join this chat.', 7)],
        }),
    },
    {
        key: 'joined', label: 'Player: admin joined', blurb: 'The chat tells the players when an admin joins, and who. A hidden message shows as a placeholder.',
        build: () => ({
            chat: { ...BASE, adminRequested: true, adminRequestReason: 'requested', admins: [{ name: 'ModMike', joinedAt: minutesAgo(2) }] },
            messages: [...CONVERSATION, system(6, 'cat requested an admin to join this chat.', 6), system(7, 'Admin ModMike joined the chat.', 2),
                user(8, 'cat', 'you are all garbage, uninstall the game', 1.5, { hidden: true, hiddenBy: 'ModMike' }),
                system(9, 'An admin hid a message. uSync staff will review it.', 1),
                user(10, 'ModMike', 'Hi both, I am the host. Keep it civil please, what is going on?', 0.5, { role: 'admin' })],
        }),
    },
    {
        key: 'dispute', label: 'Auto-invite: score dispute', blurb: 'The two sides reported different scores, so an admin is invited to the chat without anyone asking.',
        build: () => ({
            chat: { ...BASE, adminRequested: true, adminRequestedAt: minutesAgo(1), adminRequestReason: 'dispute' },
            messages: DISPUTE_HISTORY,
        }),
    },
    {
        key: 'noshow', label: 'Auto-invite: no-show', blurb: 'Reporting a no-show invites an admin to the chat automatically.',
        build: () => ({
            chat: { ...BASE, adminRequested: true, adminRequestedAt: minutesAgo(1), adminRequestReason: 'no_show' },
            messages: [user(1, 'ace', 'hello? we are in the lobby', 25, { mine: true }), user(2, 'ace', 'it has been 15 minutes', 12, { mine: true }),
                system(3, 'ace reported cat as a no-show, so an admin has been invited to this chat.', 1)],
        }),
    },
    {
        key: 'admin-waiting', label: 'Admin: not joined yet', blurb: 'What the host or an event admin sees before joining: no messages, a banner and a Join button. Join, then try Hide, Leave chat and rejoin.',
        build: () => ({
            chat: { ...BASE, role: 'admin', adminRequested: true, adminRequestedAt: minutesAgo(3), adminRequestReason: 'dispute' },
            messages: DISPUTE_HISTORY,
        }),
    },
    {
        key: 'admin-joined', label: 'Admin: joined', blurb: 'After joining, the admin sees the full history from before they arrived. Admins can hide a player\'s message (reported to uSync staff automatically) but not delete anything, and can leave the chat.',
        build: () => ({
            chat: { ...BASE, role: 'admin', joined: true, adminRequested: true, adminRequestReason: 'dispute', admins: [{ name: 'ModMike', joinedAt: minutesAgo(2) }] },
            messages: [...DISPUTE_HISTORY, system(10, 'Admin ModMike joined the chat.', 2)],
        }),
    },
    {
        key: 'not-open', label: 'Not open yet', blurb: 'A later-round match whose opponent is still being decided has a room, but it stays closed until both sides are known.',
        build: () => ({ chat: { ...BASE, open: false, closedReason: 'This chat opens once both sides of the match are decided.' }, messages: [] }),
    },
    {
        key: 'ended', label: 'Event over: read-only', blurb: 'Once every match is played the chat is read-only (reports still work) and shows the day it will be deleted: 3 days after the event ends.',
        build: () => ({
            chat: { ...BASE, ended: true, closedReason: 'This event has ended, so the chat is read-only.', expiresAt: inDays(3) },
            messages: CONVERSATION,
        }),
    },
];

// A stand-in for the server's filters and limits, so the mock can show the rejections.
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
    if ((text.match(/https?:\/\/\S+/gi) ?? []).length > 2) return 'Please keep it to 2 links per message.';
    if (/(.)\1{9,}/.test(text)) return 'That message looks like spam. Please reword it.';
    const link = FAKE_BANNED_LINKS.find(([re]) => re.test(text));
    return link ? link[1] : null;
};

// What the server works out from the raw room: who can read, write, join, leave, and what each
// message offers (report, hide) and shows (a hidden message's text only goes to a joined admin).
const view = (state) => {
    const { chat, messages } = state;
    const admin = chat.role === 'admin';
    const privileged = admin && chat.joined;
    const live = chat.open && !chat.ended;
    const canRead = !admin || chat.joined;
    const hiddenIds = messages.filter(m => m.hidden).map(m => m.id);
    return {
        chat: {
            ...chat, canRead, canWrite: live && canRead, canJoin: admin && !chat.joined, canLeave: privileged,
            canRequestAdmin: !admin && live && !chat.adminRequested && chat.admins.length === 0, hiddenIds,
        },
        messages: canRead ? messages.map(m => m.kind === 'system' ? m : ({
            ...m,
            body: m.hidden && !privileged ? '' : m.body,
            canReport: !m.mine && !(m.hidden && !privileged),
            canHide: privileged && m.sender?.role === 'player' && !m.hidden,
            reported: !!m.reported,
        })) : [],
    };
};

// Same shape as useMatchChat's return value, but in memory.
export const useMockChat = (scenario) => {
    const [state, setState] = useState(() => scenario.build());
    const [sendError, setSendError] = useState('');
    const [busy, setBusy] = useState(false);
    const [sent, setSent] = useState([]);
    const shown = useMemo(() => view(state), [state]);

    const reset = useCallback(() => { setState(scenario.build()); setSendError(''); setSent([]); }, [scenario]);

    const send = useCallback(async (body) => {
        const reason = mockScreen(body);
        if (reason) { setSendError(reason); return false; }
        const now = Date.now();
        const recent = sent.filter(t => now - t.at < 10000);
        if (recent.length >= 5) { setSendError("You're sending messages too fast. Wait a few seconds."); return false; }
        if (sent[sent.length - 1]?.body === body.toLowerCase() && now - sent[sent.length - 1].at < 30000) { setSendError('You just sent that message.'); return false; }
        setSent(list => [...list, { at: now, body: body.toLowerCase() }]);
        setSendError('');
        setState(s => ({
            ...s,
            messages: [...s.messages, { id: nextId++, kind: 'user', sender: { name: s.chat.role === 'admin' ? 'ModMike' : 'ace', role: s.chat.role }, body, at: new Date().toISOString(), mine: true }],
        }));
        return true;
    }, [sent]);

    const pause = async () => { setBusy(true); await new Promise(r => setTimeout(r, 350)); setBusy(false); };

    const requestAdmin = useCallback(async () => {
        await pause();
        setState(s => ({
            chat: { ...s.chat, adminRequested: true, adminRequestReason: 'requested', adminRequestedAt: new Date().toISOString() },
            messages: [...s.messages, system(nextId++, 'ace requested an admin to join this chat.', 0)],
        }));
        return true;
    }, []);

    const join = useCallback(async () => {
        await pause();
        setState(s => ({
            chat: { ...s.chat, joined: true, admins: [...s.chat.admins.filter(a => a.name !== 'ModMike'), { name: 'ModMike', joinedAt: new Date().toISOString() }] },
            messages: [...s.messages, system(nextId++, 'Admin ModMike joined the chat.', 0)],
        }));
        return true;
    }, []);

    const leave = useCallback(async () => {
        await pause();
        setState(s => ({
            chat: { ...s.chat, joined: false, admins: s.chat.admins.filter(a => a.name !== 'ModMike') },
            messages: [...s.messages, system(nextId++, 'Admin ModMike left the chat.', 0)],
        }));
        return true;
    }, []);

    const hide = useCallback((message) => {
        setState(s => ({
            ...s,
            messages: [...s.messages.map(m => m.id === message.id ? { ...m, hidden: true, hiddenBy: 'ModMike' } : m),
                system(nextId++, 'An admin hid a message. uSync staff will review it.', 0)],
        }));
    }, []);

    const report = useCallback(async (id) => {
        await new Promise(r => setTimeout(r, 400));
        setState(s => ({ ...s, messages: s.messages.map(m => m.id === id ? { ...m, reported: true } : m) }));
        return { ok: true };
    }, []);

    return {
        ...shown, error: '', sendError, busy, send, requestAdmin, join, leave, hide, report,
        clearSendError: () => setSendError(''), reset,
    };
};
