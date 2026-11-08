import { useCallback, useEffect, useRef, useState } from "react";
import apiClient from "./apiClient";
import { getApiErrorMessage } from "utils/apiError";

// Match chat rooms, backed by /brackets/:event/matches/:match/chat. The server sends the
// room's state ({ role, open, canRead, canWrite, canRequestAdmin, canJoin, adminRequested,
// admins, expiresAt, messages, ... }); a poll passes ?after=<last message id> to get only what's new.

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

// Newest copy of each message by id, in order.
export const mergeMessages = (current, incoming) => {
    if (!incoming.length) return current;
    const byId = new Map(current.map(m => [m.id, m]));
    incoming.forEach(m => byId.set(m.id, m));
    return [...byId.values()].sort((a, b) => a.id - b.id);
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

    const apply = useCallback((data, { replace = false } = {}) => {
        const { messages: incoming = [], ...rest } = data;
        setChat(rest);
        setMessages(current => replace ? incoming : mergeMessages(current, incoming));
        const newest = incoming.reduce((max, m) => Math.max(max, m.id), replace ? 0 : lastId.current);
        lastId.current = newest;
    }, []);

    const load = useCallback(async () => {
        try {
            apply(await getChat(eventId, matchId, lastId.current));
            setError('');
        } catch (err) {
            // 404: not in this match and not an admin - no chat to show.
            if (err.response?.status !== 404) setError(getApiErrorMessage(err));
        }
    }, [eventId, matchId, apply]);

    useEffect(() => {
        if (!enabled || !eventId || !matchId) return undefined;
        lastId.current = 0;
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
            setSendError(getApiErrorMessage(err));
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
            setMessages(current => mergeMessages(current, [message]));
            lastId.current = Math.max(lastId.current, message.id);
            return true;
        } catch (err) {
            setSendError(getApiErrorMessage(err));
            return false;
        } finally {
            setBusy(false);
        }
    }, [eventId, matchId]);

    return {
        chat, messages, error, sendError, busy, send,
        requestAdmin: () => act(() => requestChatAdmin(eventId, matchId)),
        join: () => act(() => joinChat(eventId, matchId), { replace: true }),
        clearSendError: () => setSendError(''),
    };
};
