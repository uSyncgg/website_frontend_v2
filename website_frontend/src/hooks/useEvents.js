import { useEffect, useState } from 'react';
import {
  getLeagueEvents,
  getLanEvents,
  getWagerEvents,
  getXpEvents,
  getEvent,
} from 'services/events';

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
