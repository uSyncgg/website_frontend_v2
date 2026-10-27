import { useEffect, useState } from 'react';
import {
  getLeagueEvents,
  getLanEvents,
  getWagerEvents,
  getXpEvents,
  getLeagueChildren,
  getEventByPath,
  getLanInformation,
  getLeagueInformation,
  getVerifiedEvents,
  getAllLans,
  getVerifiedEventsByType
} from 'services/events';
import { LAN_GAMES } from 'data/lanMarkers';
import { useAuth } from './UseAuth/useAuth';

export function useAsync(fetchFn, deps, { skip = false } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Stay in the loading state until the caller is ready to fetch.
    if (skip) return;
    // Clear the previous result so a stale error (e.g. a 404) or old data
    // doesn't carry over when deps change, and ignore responses that arrive
    // after deps have moved on.
    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);
    fetchFn()
      .then(result => { if (!cancelled) setData(result); })
      .catch(err => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, skip]);

  return { data, loading, error };
}

// Event payloads only include `details` for signed-in viewers, so wait for the
// session to resolve before fetching (otherwise signed-in users fetch twice and
// briefly see the locked state), and refetch when the signed-in user changes.
// Keyed on the user id, not the token, so token refreshes don't refetch.
function useEventsAsync(fetchFn, deps) {
  const { session, loading: authLoading } = useAuth();
  return useAsync(fetchFn, [...deps, session?.user?.id], { skip: authLoading });
}

export function useLeagueEvents(game) {
  return useEventsAsync(() => getLeagueEvents({ game }), [game]);
}

export function useLanEvents(game) {
  return useEventsAsync(() => getLanEvents({ game }), [game]);
}

export function useAllLans() {
  return useEventsAsync(() => getAllLans(), []);
}

// Fetches LAN events across every game with a LANs section (one request per
// game, in parallel) and tags each event with the game it came from, since
// the per-game payload doesn't otherwise carry it. A single game's request
// failing doesn't blank the rest of the map.
export function useAllLanEvents() {
  return useEventsAsync(
    () => Promise.all(
      LAN_GAMES.map(game =>
        getLanEvents({ game })
          .then(events => events.map(event => ({ ...event, game })))
          .catch(() => [])
      )
    ).then(results => results.flat()),
    []
  );
}

export function useWagerEvents(game) {
  return useEventsAsync(() => getWagerEvents({ game }), [game]);
}

export function useXpEvents(game) {
  return useEventsAsync(() => getXpEvents({ game }), [game]);
}

export function useEventByPath(eventType, game, path) {
  return useEventsAsync(
    () => getEventByPath({ event_type: eventType, game, path }),
    [eventType, game, path]
  );
}

export function useLanInfo(path) {
  return useEventsAsync(() => getLanInformation({ path }), [path]);
}

export function useLeagueInfo(game, path) {
  return useEventsAsync(() => getLeagueInformation({ game, path }), [game, path]);
}

export function useLeagueChildren(game, parent) {
  return useEventsAsync(() => getLeagueChildren({ game, parent }), [game, parent]);
}

export function useVerifiedEvents(game) {
  return useEventsAsync(() => getVerifiedEvents({game}), [game]);
}

export function useVerifiedEventsByType(event_type) {
  return useEventsAsync(() => getVerifiedEventsByType({event_type}), [event_type]);
}

// Verified events for a fixed set of games, fetched in parallel (one request
// per game), keyed back by game name. A single game's request failing just
// drops that game's data rather than blanking the rest. `games` should be a
// stable reference (e.g. derived from a static catalog) since it's used as
// the effect dependency.
export function useVerifiedEventsByGame(games) {
  return useEventsAsync(
    () => Promise.all(games.map(game => getVerifiedEvents({ game }).catch(() => null)))
      .then(results => Object.fromEntries(games.map((game, i) => [game, results[i]]))),
    [games]
  );
}