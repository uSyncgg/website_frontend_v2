import { useCallback, useEffect, useSyncExternalStore } from "react";
import apiClient from "./apiClient";
import { getApiErrorMessage } from "utils/apiError";

// Bracket hosting, backed by the backend's /brackets routes. The backend builds every bracket
// and works out every rule (who can report, when a no-show unlocks, whether a result can still
// be disputed); this file only fetches, caches and sends. A full event (GET /brackets/:id):
// { id, name, eventType, game, gameTitle, gameMode, format, formatLabel, teamSize, bestOf,
//   finalBestOf, startsAt, stage: 'registration' | 'closed' | 'seeding' | 'live' | 'complete',
//   entrants: [{ id, name, captain, status: 'signed_up' | 'pending', teamId, players, rosterSize }],
//   bracket: { status, format, seeds, built, matches: { [code]: view } } | null,
//   canManage, isHost, openIssues, viewerEntrantId, viewerCanAct }
// where each match view is { state, reportedBy, issues, reports?, noShowUnlocksAt,
//   disputeClosesAt, canReport, canReportNoShow, canDispute }.
//
// Lists (hosting, entered, a profile's events) are pages of summaries, not full events.
//
// A small shared cache keeps every page showing the same copy: reads fill it, and every write
// puts the event the API returns back into it. Writes resolve to their result, or to null when
// they fail - the error is kept in the store for <BracketError /> to show.

// ---- cache -----------------------------------------------------------------

let state = { events: {}, pages: {}, meta: null, error: '' };
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

export const useBracketError = () => useSyncExternalStore(subscribe, () => state.error);
export const clearBracketError = () => set(() => ({ error: '' }));

const run = async (request) => {
    try {
        const res = await request;
        // 204 No Content (a delete) comes back with an empty body: that's a success too.
        return res.status === 204 || res.data === '' || res.data == null ? true : res.data;
    } catch (err) {
        set(() => ({ error: getApiErrorMessage(err) }));
        return null;
    }
};

// A write that returns the event: cache it, and refresh the lists it may have moved in.
const eventCall = async (request) => {
    const event = await run(request);
    if (!event || typeof event !== 'object') return null;
    put(event);
    refreshPages();
    return event;
};

const url = (id, rest = '') => `/brackets/${encodeURIComponent(id)}${rest}`;

// ---- one event -------------------------------------------------------------

export const fetchEvent = (id) => apiClient.get(url(id))
    .then(res => put(res.data))
    .catch(err => {
        if (err.response?.status === 404) set(s => ({ events: { ...s.events, [id]: null } }));
    });

// One event: undefined while loading, null if it doesn't exist. Refreshes every 30 seconds while
// the tab is visible, and straight away when you come back to it, so live brackets pick up the
// other side's reports and the host's calls.
export const useHostEvent = (id) => {
    useEffect(() => {
        if (!id) return undefined;
        fetchEvent(id);
        const tick = () => { if (document.visibilityState === 'visible') fetchEvent(id); };
        const t = setInterval(tick, 30000);
        document.addEventListener('visibilitychange', tick);
        return () => {
            clearInterval(t);
            document.removeEventListener('visibilitychange', tick);
        };
    }, [id]);
    return useSyncExternalStore(subscribe, () => (id ? state.events[id] : undefined));
};

// ---- lists: pages of summaries ---------------------------------------------------
//
// A summary: { id, name, eventType, game, gameTitle, format, formatLabel, teamSize, startsAt,
// stage, maxEntrants, signedUp, pending, canManage, isHost, openIssues, viewerEntrantId,
// viewerEntrantName, viewerMatch: { id, opponent } | null, winner, viewerPlace }.

const EMPTY_PAGE = { events: [], nextCursor: null, loading: true };

const loadPage = async (key, path, more = false) => {
    const current = state.pages[key];
    const cursor = more ? current?.nextCursor : null;
    if (more && !cursor) return;
    try {
        const res = await apiClient.get(path, { params: cursor ? { cursor } : {} });
        set(s => ({
            pages: {
                ...s.pages,
                [key]: {
                    path,
                    events: more ? [...(s.pages[key]?.events ?? []), ...res.data.events] : res.data.events,
                    nextCursor: res.data.nextCursor,
                    loading: false,
                },
            },
        }));
    } catch {
        set(s => ({ pages: { ...s.pages, [key]: { path, events: s.pages[key]?.events ?? [], nextCursor: null, loading: false } } }));
    }
};

// Reload the first page of every list on screen (after a write that may have changed them).
const refreshPages = () => {
    Object.entries(state.pages).forEach(([key, page]) => page?.path && loadPage(key, page.path));
};

const usePage = (key, path) => {
    useEffect(() => {
        if (path) loadPage(key, path);
    }, [key, path]);
    const page = useSyncExternalStore(subscribe, () => state.pages[key]);
    const loadMore = useCallback(() => path && loadPage(key, path, true), [key, path]);
    return { ...(page ?? EMPTY_PAGE), loadMore };
};

// Events the signed in account runs or helps run (any view).
export const useHostEvents = () => usePage('hosting', '/brackets/hosting');

// Events the account is in (solo, or through a team it owns, captains or plays on).
export const useEnteredEvents = () => usePage('entered', '/brackets/entered');

// Events a host or venue profile runs, for its public profile page.
export const useProfileBracketEvents = (publicId) =>
    usePage(`profile:${publicId}`, publicId ? `/brackets/profile/${encodeURIComponent(publicId)}` : null);

// ---- the event form's options -------------------------------------------------------

// { games: [{ key, name, titles: [{ key, name, year, modes }], modes: [{ key, name }] }],
//   formats: [{ key, label, description, hasFinal, minEntrants }] } - fetched once.
let metaRequest = null;
export const useBracketMeta = () => {
    useEffect(() => {
        if (state.meta || metaRequest) return;
        metaRequest = apiClient.get('/brackets/meta')
            .then(res => set(() => ({ meta: res.data })))
            .catch(() => { metaRequest = null; });
    }, []);
    return useSyncExternalStore(subscribe, () => state.meta);
};

// ---- reading an event ---------------------------------------------------------

export const isArchived = (event) => event.stage === 'complete';

// Players a team needs for this event: '4v4' -> 4.
export const teamSizeOf = (event) => Number(String(event.teamSize).split('v')[0]) || 1;

export const isPending = (_event, entrant) => entrant.status === 'pending';

export const signedUpEntrants = (event) => event.entrants.filter(e => e.status !== 'pending');

export const pendingEntrants = (event) => event.entrants.filter(e => e.status === 'pending');

export const isFull = (event) => event.maxEntrants != null && signedUpEntrants(event).length >= event.maxEntrants;

export const isLive = (event) => event.stage === 'live' || event.stage === 'complete';

export const STAGE_LABELS = {
    registration: 'Registration open',
    closed: 'Registration closed',
    seeding: 'Seeding',
    live: 'Live',
    complete: 'Complete',
};

// What the viewer sees and may do in one match (from the server), or {} for one not underway.
export const matchView = (event, match) => (match && event.bracket?.matches?.[match.id]) || {};

// 'ready' | 'awaiting' | 'disputed' | 'no_show' | 'locked' | the match's own status.
export const matchState = (event, match) => matchView(event, match).state ?? match.status;

// The viewer's match that's waiting to be played, or null.
export const viewerMatch = (event, built) => {
    const me = event.viewerEntrantId;
    if (!me || !built) return null;
    const all = [...built.rounds.flat(), ...(built.losersRounds ?? []).flat(), ...(built.grandFinal ?? [])];
    return all.find(m => m.status === 'ready' && (m.a === me || m.b === me)) ?? null;
};

// ---- writes ----------------------------------------------------------------

// Resolves to the new event's id (or null).
export const createEvent = async (fields) => (await eventCall(apiClient.post('/brackets', fields)))?.id ?? null;

export const updateEvent = (id, fields) => eventCall(apiClient.patch(url(id), fields));

export const deleteEvent = async (id) => {
    const ok = await run(apiClient.delete(url(id)));
    if (ok) {
        set(s => ({ events: { ...s.events, [id]: null } }));
        refreshPages();
    }
    return ok;
};

// The backend tells everyone entered.
export const delayStart = (id, startsAt, reason) => eventCall(apiClient.post(url(id, '/delays'), { startsAt, reason }));

// { teamId (team events), players (profile public ids the captain picks), email, answers, pass }
export const register = (id, fields) => eventCall(apiClient.post(url(id, '/registration'), fields));

// The captain changes who plays, until the bracket is published.
export const setPlayers = (id, players) => eventCall(apiClient.put(url(id, '/registration/players'), { players }));

export const unregister = (id) => eventCall(apiClient.delete(url(id, '/registration')));

// The host or an admin removes an entrant.
export const removeEntrant = (id, entrantId) => eventCall(apiClient.delete(url(id, `/entrants/${entrantId}`)));

// Saves the draft seeding; the event that comes back carries the server-built preview.
export const saveBracketDraft = (id, seeds) => eventCall(apiClient.put(url(id, '/bracket'), { seeds }));

// If the entrants changed since the draft was seeded, the server rebuilds the draft and refuses
// (409): reload the event so the host reviews the new bracket before publishing again.
export const publishBracket = async (id) => {
    const event = await eventCall(apiClient.post(url(id, '/bracket/publish')));
    if (!event) await fetchEvent(id);
    return event;
};

export const resetBracket = (id) => eventCall(apiClient.delete(url(id, '/bracket')));

// ---- playing ------------------------------------------------------------------

const matchUrlOf = (id, code, rest) => url(id, `/matches/${encodeURIComponent(code)}${rest}`);

// A side reports its score; when both name the same winner, that winner advances.
export const reportScore = (id, code, scoreA, scoreB) => eventCall(apiClient.post(matchUrlOf(id, code, '/reports'), { scoreA, scoreB }));

export const reportNoShow = (id, code) => eventCall(apiClient.post(matchUrlOf(id, code, '/no-show')));

// Within 5 minutes of a result, before the next match is reported: freezes the next match.
export const disputeResult = (id, code) => eventCall(apiClient.post(matchUrlOf(id, code, '/dispute')));

// Host / admin: { action: 'award' | 'clear' | 'uphold', scoreA?, scoreB?, forfeit? }. Final.
export const ruleOnMatch = (id, code, ruling) => eventCall(apiClient.post(matchUrlOf(id, code, '/ruling'), ruling));

export const getDecisions = (id) => apiClient.get(url(id, '/decisions')).then(res => res.data);

export const revertDecision = (id, decisionId) => eventCall(apiClient.post(url(id, `/decisions/${decisionId}/revert`)));

// ---- the admin queue ------------------------------------------------------------

// { open: [issue], closed: [issue] }, oldest open first.
export const getQueue = (id) => apiClient.get(url(id, '/issues')).then(res => res.data);

// "Go to issue": resolves to { matchId }, or throws with "Another admin claimed this" /
// "This notification has been resolved".
export const claimIssue = (id, issueId) => apiClient.post(url(id, `/issues/${issueId}/claim`)).then(res => res.data);

export const dismissIssue = (id, issueId) => apiClient.post(url(id, `/issues/${issueId}/dismiss`)).then(res => res.data);

// ---- admins ------------------------------------------------------------------

// The host invites a player profile (by public_id) to help run the event; they accept from the bell.
export const inviteAdmin = (id, profilePublicId) => eventCall(apiClient.post(url(id, '/admins'), { profile: profilePublicId }));

// The host removes an admin or cancels an invite; an admin can also step down.
export const removeAdmin = (id, adminId) => eventCall(apiClient.delete(url(id, `/admins/${adminId}`)));

// Admin invites waiting on the signed in account: [{ id, eventId, eventName, game, startsAt, host }].
export const getAdminInvites = () => apiClient.get('/brackets/admin-invites').then(res => res.data);

// Accept or decline; resolves to the invites still waiting. Accepting refreshes the lists.
export const respondAdminInvite = async (inviteId, accept) => {
    const res = await apiClient.post(`/brackets/admin-invites/${inviteId}`, { accept });
    if (accept) refreshPages();
    return res.data;
};
