import apiClient from "./apiClient";
import { supabase } from "./supabaseClient";

// Match chats (backend /chats). A chat: { id, kind: 'match', role: 'player' | 'admin', title
// ("Alpha vs Bravo"), subtitle ("Winter Cup · R1M2"), eventPublicId, matchCode, hasUnread,
// lastMessageAt, closesAt, openedAt }. A message: { id, senderProfileId, senderName,
// senderRole: 'player' | 'admin' | 'system', body, createdAt }.
//
// Only a chat's members can read or send. Once a chat closes every call answers 410 and it
// drops out of GET /chats for good. Messages arrive live over Supabase Realtime Broadcast on the
// private channel chat:{id}: only the backend sends on it, and only open members can listen.
// Anything missed while disconnected is fetched with ?after=<last id>.

// The signed-in account's open chats, most recently active first.
export const getChats = () => apiClient.get('/chats').then(res => res.data);

// Messages after the given id (0 = from the start), oldest first.
export const getMessages = (chatId, after = 0) =>
    apiClient.get(`/chats/${chatId}/messages`, { params: { after } }).then(res => res.data);

// 429 when sending too fast (5 in 10 seconds, 20 a minute), 409 when the chat is full.
export const sendMessage = (chatId, body) => apiClient.post(`/chats/${chatId}/messages`, { body }).then(res => res.data);

export const markRead = (chatId, lastMessageId) => apiClient.post(`/chats/${chatId}/read`, { lastMessageId });

const matchUrl = (eventId, code, rest) => `/brackets/${encodeURIComponent(eventId)}/matches/${encodeURIComponent(code)}${rest}`;

// The host or an event admin joins a match's chat (seeing its whole history). Returns the chat.
export const joinMatchChat = (eventId, code) => apiClient.post(matchUrl(eventId, code, '/chat/join')).then(res => res.data);

// A player in the match calls the host or an admin (409 if a call is already open). Returns the chat.
export const callAdmin = (eventId, code) => apiClient.post(matchUrl(eventId, code, '/call-admin')).then(res => res.data);

// Listens on chat:{id}. onMessage(message) for each new one, onClosed() when the chat closes,
// onSubscribed() each time the channel (re)connects - the moment to fetch anything missed.
// Returns an unsubscribe function.
export const subscribeToChat = (chatId, { onMessage, onClosed, onSubscribed }) => {
    const channel = supabase
        .channel(`chat:${chatId}`, { config: { private: true } })
        .on('broadcast', { event: 'message' }, ({ payload }) => onMessage?.(payload.message))
        .on('broadcast', { event: 'closed' }, () => onClosed?.())
        .subscribe(status => { if (status === 'SUBSCRIBED') onSubscribed?.(); });
    return () => { supabase.removeChannel(channel); };
};
