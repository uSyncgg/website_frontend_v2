import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth, useCurrentUser } from "hooks";
import { getChats, getMessages, markRead, sendMessage, subscribeToChat } from "services/chats";
import { onNotification } from "services/notifications";

// Every open chat of the signed-in account, for the whole site: the navbar's chat button lists
// them, and the chat window (one at a time, floating bottom-right) stays open as you move
// between pages.
//
// - The list loads on sign-in, when you come back to the tab, and when a notification arrives
//   (a new match means a new chat). Nothing polls.
// - Each open chat has one Realtime subscription here, so new messages light up the list even
//   when the chat isn't open. Messages are only kept for chats you've opened; on (re)connecting
//   anything missed is fetched with ?after=.
// - A chat that closes drops out of the list and its window closes, for good.

const ChatContext = createContext(null);

const merge = (list, more) => {
    const seen = new Set(list.map(m => m.id));
    const added = more.filter(m => !seen.has(m.id));
    return added.length ? [...list, ...added].sort((a, b) => a.id - b.id) : list;
};

export const ChatProvider = ({ children }) => {
    const { session } = useAuth();
    const { defaultProfile } = useCurrentUser();
    const signedIn = !!session && !!defaultProfile;
    const [chats, setChats] = useState([]);
    const [openId, setOpenId] = useState(null);
    const [messages, setMessages] = useState({}); // { chatId: [message] } for chats opened this visit
    const [closedNotice, setClosedNotice] = useState(null);
    const openRef = useRef(null);
    const messagesRef = useRef({});
    openRef.current = openId;
    messagesRef.current = messages;

    const refresh = useCallback(() => {
        if (!signedIn) return Promise.resolve();
        return getChats().then(list => {
            setChats(list);
            const ids = new Set(list.map(c => c.id));
            if (openRef.current && !ids.has(openRef.current)) setOpenId(null);
        }).catch(() => {});
    }, [signedIn]);

    useEffect(() => {
        if (!signedIn) {
            setChats([]);
            setOpenId(null);
            setMessages({});
            return undefined;
        }
        refresh();
        const onVisible = () => { if (document.visibilityState === 'visible') refresh(); };
        document.addEventListener('visibilitychange', onVisible);
        const stop = onNotification(() => refresh());
        return () => {
            document.removeEventListener('visibilitychange', onVisible);
            stop();
        };
    }, [signedIn, refresh]);

    const read = useCallback((chatId, list) => {
        const last = list[list.length - 1];
        if (!last) return;
        setChats(cs => cs.map(c => (c.id === chatId ? { ...c, hasUnread: false } : c)));
        markRead(chatId, last.id).catch(() => {});
    }, []);

    // Fetches what's new for a chat whose messages we hold (or its whole history the first time).
    const catchUp = useCallback(async (chatId) => {
        const have = messagesRef.current[chatId];
        const after = have?.length ? have[have.length - 1].id : 0;
        try {
            const more = await getMessages(chatId, after);
            const next = merge(messagesRef.current[chatId] ?? [], more);
            setMessages(m => ({ ...m, [chatId]: merge(m[chatId] ?? [], more) }));
            if (openRef.current === chatId) read(chatId, next);
        } catch (err) {
            if (err.response?.status === 410 || err.response?.status === 403) refresh();
        }
    }, [read, refresh]);

    const removeChat = useCallback((chatId) => {
        setChats(cs => cs.filter(c => c.id !== chatId));
        setMessages(m => {
            const { [chatId]: _, ...rest } = m;
            return rest;
        });
        if (openRef.current === chatId) {
            setOpenId(null);
            setClosedNotice('That chat has closed.');
        }
    }, []);

    // One Realtime subscription per open chat.
    const idsKey = chats.map(c => c.id).sort().join(',');
    useEffect(() => {
        if (!idsKey) return undefined;
        const stops = idsKey.split(',').map(chatId => subscribeToChat(chatId, {
            onMessage: (message) => {
                if (!message) return;
                setChats(cs => cs.map(c => (c.id === chatId
                    ? { ...c, lastMessageAt: message.createdAt, hasUnread: openRef.current === chatId ? c.hasUnread : true }
                    : c)).sort((a, b) => (b.lastMessageAt || b.openedAt).localeCompare(a.lastMessageAt || a.openedAt)));
                if (messagesRef.current[chatId]) {
                    setMessages(m => ({ ...m, [chatId]: merge(m[chatId] ?? [], [message]) }));
                }
                if (openRef.current === chatId) read(chatId, [message]);
            },
            onClosed: () => removeChat(chatId),
            onSubscribed: () => { if (messagesRef.current[chatId]) catchUp(chatId); },
        }));
        return () => stops.forEach(stop => stop());
    }, [idsKey, catchUp, read, removeChat]);

    const openChat = useCallback((chatId) => {
        setClosedNotice(null);
        setOpenId(chatId);
        catchUp(chatId);
    }, [catchUp]);

    // A chat the server just handed back (joining, calling an admin): add or update it, then open it.
    const showChat = useCallback((chat) => {
        setChats(cs => (cs.some(c => c.id === chat.id) ? cs.map(c => (c.id === chat.id ? chat : c)) : [chat, ...cs]));
        openChat(chat.id);
    }, [openChat]);

    const send = useCallback(async (chatId, body) => {
        try {
            const message = await sendMessage(chatId, body);
            setMessages(m => ({ ...m, [chatId]: merge(m[chatId] ?? [], [message]) }));
            setChats(cs => cs.map(c => (c.id === chatId ? { ...c, lastMessageAt: message.createdAt } : c)));
            return message;
        } catch (err) {
            if (err.response?.status === 410) removeChat(chatId);
            throw err;
        }
    }, [removeChat]);

    const value = useMemo(() => ({
        signedIn,
        chats,
        unreadCount: chats.filter(c => c.hasUnread).length,
        openId,
        openChatData: chats.find(c => c.id === openId) ?? null,
        messages: openId ? messages[openId] : undefined,
        closedNotice,
        dismissClosedNotice: () => setClosedNotice(null),
        openChat,
        showChat,
        closeWindow: () => setOpenId(null),
        send,
        refresh,
        chatForMatch: (eventId, code) => chats.find(c => c.eventPublicId === eventId && c.matchCode === code) ?? null,
    }), [signedIn, chats, openId, messages, closedNotice, openChat, showChat, send, refresh]);

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Outside a ChatProvider (tests, prerendering) chats are simply absent.
const NONE = {
    signedIn: false, chats: [], unreadCount: 0, openId: null, openChatData: null, messages: undefined, closedNotice: null,
    dismissClosedNotice: () => {}, openChat: () => {}, showChat: () => {}, closeWindow: () => {},
    send: async () => null, refresh: async () => {}, chatForMatch: () => null,
};

export const useChats = () => useContext(ChatContext) ?? NONE;
