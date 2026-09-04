import { useEffect, useState } from 'react';
import {
  getLeagueEvents,
  getLanEvents,
  getWagerEvents,
  getXpEvents,
  getEvent,
  getLeagueChildren,
} from 'services/events';
import { LAN_GAMES } from 'data/lanMarkers';

function useAsync(fetchFn, deps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchFn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

export function useLeagueEvents(game) {
  return useAsync(() => getLeagueEvents({ game }), [game]);
}

export function useLanEvents(game) {
  return useAsync(() => getLanEvents({ game }), [game]);
}

// Fetches LAN events across every game with a LANs section (one request per
// game, in parallel) and tags each event with the game it came from, since
// the per-game payload doesn't otherwise carry it. A single game's request
// failing doesn't blank the rest of the map.
export function useAllLanEvents() {
  return useAsync(
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
  return useAsync(() => getWagerEvents({ game }), [game]);
}

export function useXpEvents(game) {
  return useAsync(() => getXpEvents({ game }), [game]);
}

export function useEvent(eventType, game, eventName) {
  return useAsync(
    () => getEvent({ event_type: eventType, game, event_name: eventName }),
    [eventType, game, eventName]
  );
}

export function useLeagueChildren(game, parent) {
  return useAsync(() => getLeagueChildren({ game, parent }), [game, parent]);
}