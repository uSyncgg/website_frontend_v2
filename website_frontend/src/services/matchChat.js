import { useCallback, useEffect, useRef, useState } from "react";
import apiClient from "./apiClient";
import { getApiErrorMessage } from "utils/apiError";

// Match chat rooms, backed by /brackets/:event/matches/:match/chat. The server sends the
// room's state ({ role, open, ended, canRead, canWrite, canRequestAdmin, canJoin, canLeave,
// adminRequested, admins, expiresAt, hiddenIds, messages, ... }); a poll passes ?after=<last
// message id> to get only what's new.

export const CHAT_POLL_MS = 5000;

const base = (eventId, matchId) =>
    `/brackets/${encodeURIComponent(eventId)}/matches/${encodeURIComponent(matchId)}/chat`;

export const getChat = (eventId, matchId, after) =>
    apiClient.get(base(eventId, matchId), { params: after ? { after } : undefined }).then(res => res.data);

export const sendChatMessage = (eventId, matchId, body) =>
    apiClient.post(`${base(eventId, matchId)}/messages`, { body }).then(res => res.data);

export const requestChatAdmin = (eventId, matchId) =>
    apiClient.post(`${base(eventId, matchId)}/request-admin`).then(res => res.data);

export const joinChat = (eventId, matchId) =>
    apiClient.post(`${base(eventId, matchId)}/join`).then(res => res.data);

export const leaveChat = (eventId, matchId) =>
    apiClient.post(`${base(eventId, matchId)}/leave`).then(res => res.data);

// Admins only: hides a player's message from the players and reports it to uSync staff.
export const hideChatMessage = (eventId, matchId, messageId) =>
    apiClient.post(`${base(eventId, matchId)}/messages/${messageId}/hide`).then(res => res.data);

// Anyone in the chat: reports a message to uSync staff (never to the event's admins).
export const reportChatMessage = (eventId, matchId, messageId, category, note) =>
    apiClient.post(`${base(eventId, matchId)}/messages/${messageId}/report`, { category, note: note || null }).then(res => res.data);

// The chat's own limits come back as 429s with their own wording ("Wait a few seconds"), which
// the app-wide handler would flatten into its generic "try again in a minute".
export const chatErrorMessage = (err) => {
    const detail = err?.response?.data?.detail;
    return err?.response?.status === 429 && typeof detail === 'string' ? detail : getApiErrorMessage(err);
};

// Newest copy of each message by id, in order.
export const mergeMessages = (current, incoming) => {
    if (!incoming.length) return current;
    const byId = new Map(current.map(m => [m.id, m]));
    incoming.forEach(m => byId.set(m.id, m));
    return [...byId.values()].sort((a, b) => a.id - b.id);
};

// Messages an admin hid after we already had them: players' copies lose their text (an admin's
// keeps it, marked hidden).
export const applyHidden = (messages, hiddenIds, privileged) => {
    const hidden = new Set(hiddenIds ?? []);
    return messages.map(m => {
        // Staff put it back: an admin's copy still has the text, so just clear the mark.
        if (privileged && m.hidden && !hidden.has(m.id)) return { ...m, hidden: false, hiddenBy: null, canHide: m.sender?.role === 'player' };
        if (!hidden.has(m.id) || (m.hidden && (privileged || !m.body))) return m;
        return privileged
            ? { ...m, hidden: true, canHide: false }
            : { ...m, hidden: true, body: '', canReport: false };
    });
};

// One match's chat for the match page: loads it, polls while the tab is visible, and gives the
// panel what it needs. `chat` is null until the first load, and stays null if the account has no
// access (the panel then shows nothing).
export const useMatchChat = (eventId, matchId, enabled = true) => {
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [sendError, setSendError] = useState('');
    const [busy, setBusy] = useState(false);
    const lastId = useRef(0);
    const held = useRef([]);

    const apply = useCallback((data, { replace = false } = {}) => {
        const { messages: incoming = [], ...rest } = data;
        const privileged = rest.role === 'admin' && rest.joined;
        setChat(rest);
        setMessages(current => {
            const merged = replace ? incoming : mergeMessages(current, incoming);
            const next = applyHidden(merged, rest.hiddenIds, privileged);
            held.current = next;
            return next;
        });
        lastId.current = incoming.reduce((max, m) => Math.max(max, m.id), replace ? 0 : lastId.current);
        return rest;
    }, []);

    const load = useCallback(async () => {
        try {
            const data = await getChat(eventId, matchId, lastId.current);
            const privileged = data.role === 'admin' && data.joined;
            // A staff decision put a hidden message back: players only have its placeholder, so start over.
            const restored = !privileged && held.current.some(m => m.hidden && !(data.hiddenIds ?? []).includes(m.id));
            apply(restored ? await getChat(eventId, matchId) : data, { replace: restored });
            setError('');
        } catch (err) {
            // 404: not in this match and not an admin - no chat to show.
            if (err.response?.status !== 404) setError(getApiErrorMessage(err));
        }
    }, [eventId, matchId, apply]);

    useEffect(() => {
        if (!enabled || !eventId || !matchId) return undefined;
        lastId.current = 0;
        held.current = [];
        setMessages([]);
        setChat(null);
        load();
        const timer = setInterval(() => { if (!document.hidden) load(); }, CHAT_POLL_MS);
        return () => clearInterval(timer);
    }, [enabled, eventId, matchId, load]);

    const act = useCallback(async (request, { replace = false } = {}) => {
        setBusy(true);
        setSendError('');
        try {
            apply(await request(), { replace });
            return true;
        } catch (err) {
            setSendError(chatErrorMessage(err));
            return false;
        } finally {
            setBusy(false);
        }
    }, [apply]);

    const send = useCallback(async (body) => {
        setBusy(true);
        setSendError('');
        try {
            const message = await sendChatMessage(eventId, matchId, body);
            setMessages(current => {
                const next = mergeMessages(current, [message]);
                held.current = next;
                return next;
            });
            lastId.current = Math.max(lastId.current, message.id);
            return true;
        } catch (err) {
            setSendError(chatErrorMessage(err));
            return false;
        } finally {
            setBusy(false);
        }
    }, [eventId, matchId]);

    // Resolves to { ok, error } so the report form can show what went wrong.
    const report = useCallback(async (messageId, category, note) => {
        try {
            await reportChatMessage(eventId, matchId, messageId, category, note);
            setMessages(current => current.map(m => m.id === messageId ? { ...m, reported: true } : m));
            return { ok: true };
        } catch (err) {
            if (err.response?.status === 409) setMessages(current => current.map(m => m.id === messageId ? { ...m, reported: true } : m));
            return { ok: false, error: chatErrorMessage(err) };
        }
    }, [eventId, matchId]);

    return {
        chat, messages, error, sendError, busy, send, report,
        requestAdmin: () => act(() => requestChatAdmin(eventId, matchId)),
        join: () => act(() => joinChat(eventId, matchId), { replace: true }),
        leave: () => act(() => leaveChat(eventId, matchId), { replace: true }),
        hide: (messageId) => act(() => hideChatMessage(eventId, matchId, messageId), { replace: true }),
        clearSendError: () => setSendError(''),
    };
};
