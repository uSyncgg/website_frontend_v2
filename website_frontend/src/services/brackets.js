import { useEffect, useSyncExternalStore } from "react";
import apiClient from "./apiClient";
import { getApiErrorMessage } from "utils/apiError";
import { buildBracket, bracketProgress, sameMatchup, allMatches } from "utils/bracket";

// Bracket hosting, backed by the backend's /brackets routes (replaces the old localStorage
// mock). Events come back in the shape the bracket pages are built on:
// { id, name, eventType, game, format, teamSize: '4v4', bestOf, maxEntrants, startsAt, ...,
//   entrants: [{ id, name, captain, status: 'signed_up' | 'pending', teamId, roster, rosterSize, ... }],
//   bracket: { format, seeds, results, reports, noShows, log, published } | null,
//   canManage, viewerEntrantId, viewerCanAct, rostersLocked }
//
// A small shared cache keeps every page showing the same copy: reads fill it, and every write
// puts the event the API returns back into it. Writes resolve to their result, or to null when
// they fail - the error is kept in the store for <BracketError /> to show.

// ---- cache -----------------------------------------------------------------

let state = { events: {}, lists: {}, error: '' };
const listeners = new Set();

const set = (change) => {
    state = { ...state, ...change(state) };
    listeners.forEach(fn => fn());
};

const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
};

const put = (event) => {
    set(s => ({ events: { ...s.events, [event.id]: event } }));
    return event;
};

const putList = (key, events) => set(s => ({
    events: { ...s.events, ...Object.fromEntries(events.map(e => [e.id, e])) },
    lists: { ...s.lists, [key]: events.map(e => e.id) },
}));

const drop = (id) => set(s => ({
    events: { ...s.events, [id]: null },
    lists: Object.fromEntries(Object.entries(s.lists).map(([k, ids]) => [k, ids.filter(x => x !== id)])),
}));

export const useBracketError = () => useSyncExternalStore(subscribe, () => state.error);
export const clearBracketError = () => set(() => ({ error: '' }));

const run = async (request) => {
    try {
        const res = await request;
        return res.data ?? true;
    } catch (err) {
        set(() => ({ error: getApiErrorMessage(err) }));
        return null;
    }
};

const eventCall = async (request) => {
    const event = await run(request);
    return event && typeof event === 'object' ? put(event) : null;
};

const url = (id, rest = '') => `/brackets/${encodeURIComponent(id)}${rest}`;

// ---- reads -----------------------------------------------------------------

const fetchEvent = (id) => apiClient.get(url(id))
    .then(res => put(res.data))
    .catch(err => {
        if (err.response?.status === 404) set(s => ({ events: { ...s.events, [id]: null } }));
    });

// One event: undefined while loading, null if it doesn't exist. Refreshes every 30 seconds
// so live brackets pick up the other side's reports and the host's calls.
export const useHostEvent = (id) => {
    useEffect(() => {
        if (!id) return undefined;
        fetchEvent(id);
        const t = setInterval(() => fetchEvent(id), 30000);
        return () => clearInterval(t);
    }, [id]);
    return useSyncExternalStore(subscribe, () => state.events[id]);
};

const useList = (key, path) => {
    useEffect(() => {
        if (!path) return;
        apiClient.get(path).then(res => putList(key, res.data)).catch(() => putList(key, []));
    }, [key, path]);
    const ids = useSyncExternalStore(subscribe, () => state.lists[key]);
    const events = useSyncExternalStore(subscribe, () => state.events);
    return ids ? ids.map(id => events[id]).filter(Boolean) : undefined;
};

// The events the signed in account runs (any of its host or venue profiles). [] while loading.
export const useHostEvents = () => useList('hosting', '/brackets/hosting') ?? [];

// The events a host or venue profile runs, for its public profile page.
export const useProfileBracketEvents = (publicId) =>
    useList(`profile:${publicId}`, publicId ? `/brackets/profile/${encodeURIComponent(publicId)}` : null) ?? [];

// The events the account is in (solo, or through a team it owns or plays on), each with its entrant.
export const useEnteredEvents = () => (useList('entered', '/brackets/entered') ?? [])
    .map(event => ({ event, entrant: event.entrants.find(e => e.id === event.viewerEntrantId) }))
    .filter(row => row.entrant);

// ---- derived ---------------------------------------------------------------

// The viewer's match that's waiting to be played, or null.
export const viewerMatch = (event) => {
    if (!event.bracket?.published || !event.viewerEntrantId) return null;
    const built = buildBracket(event.format, event.bracket.seeds, event.bracket.results);
    const me = event.viewerEntrantId;
    return allMatches(built).find(m => m.status === 'ready' && (m.a === me || m.b === me)) ?? null;
};

// Finished events move to the Archived tab.
export const isArchived = (event) => eventStage(event) === 'complete';

// Players a team needs for this event: '4v4' -> 4.
export const teamSizeOf = (event) => Number(String(event.teamSize).split('v')[0]) || 1;

// Pending entrants (a team short of players, or waiting for a spot) don't take a spot and
// aren't seeded. The server decides; this just reads it.
export const isPending = (_event, entrant) => entrant.status === 'pending';

export const signedUpEntrants = (event) => event.entrants.filter(e => e.status !== 'pending');

export const pendingEntrants = (event) => event.entrants.filter(e => e.status === 'pending');

export const isFull = (event) => event.maxEntrants != null && signedUpEntrants(event).length >= event.maxEntrants;

// Where an event is in its life cycle, derived from its data.
export const eventStage = (event) => {
    if (event.bracket?.published) {
        const { done, total } = bracketProgress(buildBracket(event.format, event.bracket.seeds, event.bracket.results));
        return total > 0 && done === total ? 'complete' : 'live';
    }
    if (event.bracket) return 'seeding';
    return event.registrationOpen ? 'registration' : 'closed';
};

export const STAGE_LABELS = {
    registration: 'Registration open',
    closed: 'Registration closed',
    seeding: 'Seeding',
    live: 'Live',
    complete: 'Complete',
};

// Reports that still apply to the players currently in the match.
const liveReports = (bracket, match) =>
    Object.entries(bracket.reports?.[match.id] ?? {}).filter(([, r]) => sameMatchup(r, match));

// Returns 'no_show' | 'disputed' | 'awaiting' | the match's own status.
export const matchState = (bracket, match) => {
    if (match.status !== 'ready') return match.status;
    if (sameMatchup(bracket.noShows?.[match.id], match)) return 'no_show';
    const reports = liveReports(bracket, match);
    if (reports.length >= 2) return 'disputed';
    if (reports.length === 1) return 'awaiting';
    return 'ready';
};

export const matchReports = (bracket, match) => Object.fromEntries(liveReports(bracket, match));

export const matchNoShow = (bracket, match) =>
    sameMatchup(bracket.noShows?.[match.id], match) ? bracket.noShows[match.id] : null;

// When players can start reporting no-shows: the host's timer after the start time.
export const noShowUnlocksAt = (event) =>
    event.noShowMinutes == null ? null : new Date(new Date(event.startsAt).getTime() + event.noShowMinutes * 60000);

// ---- writes ----------------------------------------------------------------

// Resolves to the new event's id (or null).
export const createEvent = async (fields) => {
    const event = await eventCall(apiClient.post('/brackets', fields));
    if (event) set(s => ({ lists: { ...s.lists, hosting: [event.id, ...(s.lists.hosting ?? [])] } }));
    return event?.id ?? null;
};

export const updateEvent = (id, fields) => eventCall(apiClient.patch(url(id), fields));

export const deleteEvent = async (id) => {
    const ok = await run(apiClient.delete(url(id)));
    if (ok) drop(id);
    return ok;
};

// The backend tells everyone entered.
export const delayStart = (id, startsAt, reason) => eventCall(apiClient.post(url(id, '/delays'), { startsAt, reason }));

// { teamId (team events), email, answers, pass }
export const register = async (id, fields) => {
    const event = await eventCall(apiClient.post(url(id, '/registration'), fields));
    if (event) set(s => ({ lists: { ...s.lists, entered: [...new Set([...(s.lists.entered ?? []), event.id])] } }));
    return event;
};

export const unregister = (id) => eventCall(apiClient.delete(url(id, '/registration')));

// The host removes an entrant.
export const removeEntrant = (id, entrantId) => eventCall(apiClient.delete(url(id, `/entrants/${entrantId}`)));

export const saveBracketDraft = (id, seeds) => eventCall(apiClient.put(url(id, '/bracket'), { seeds }));

export const publishBracket = (id) => eventCall(apiClient.post(url(id, '/bracket/publish')));

export const resetBracket = (id) => eventCall(apiClient.delete(url(id, '/bracket')));

// The host's call is final.
export const hostReportMatch = (id, match, scoreA, scoreB, { forfeit = false } = {}) =>
    eventCall(apiClient.put(url(id, `/bracket/matches/${match.id}`), { scoreA, scoreB, forfeit }));

// A side reports its score; when both agree the winner advances.
export const playerReportMatch = (id, match, _entrantId, scoreA, scoreB) =>
    eventCall(apiClient.post(url(id, `/bracket/matches/${match.id}/reports`), { scoreA, scoreB }));

export const reportNoShow = (id, match) => eventCall(apiClient.post(url(id, `/bracket/matches/${match.id}/no-show`)));

export const dismissNoShow = (id, matchId) => eventCall(apiClient.delete(url(id, `/bracket/matches/${matchId}/no-show`)));

export const clearMatch = (id, match) => eventCall(apiClient.delete(url(id, `/bracket/matches/${match.id}`)));

export const revertDecision = (id, entryId) => eventCall(apiClient.post(url(id, `/bracket/log/${entryId}/revert`)));

// ---- admins ------------------------------------------------------------------

// The host invites a player profile (by public_id) to help run the event; they accept from the bell.
export const inviteAdmin = (id, profilePublicId) => eventCall(apiClient.post(url(id, '/admins'), { profile: profilePublicId }));

// The host removes an admin or cancels an invite; an admin can also step down.
export const removeAdmin = (id, adminId) => eventCall(apiClient.delete(url(id, `/admins/${adminId}`)));

// Admin invites waiting on the signed in account: [{ id, eventId, eventName, game, startsAt, host }].
export const getAdminInvites = () => apiClient.get('/brackets/admin-invites').then(res => res.data);

// Accept or decline; resolves to the invites still waiting. Accepting refreshes the Hosting list.
export const respondAdminInvite = async (inviteId, accept) => {
    const res = await apiClient.post(`/brackets/admin-invites/${inviteId}`, { accept });
    if (accept) apiClient.get('/brackets/hosting').then(r => putList('hosting', r.data)).catch(() => {});
    return res.data;
};
