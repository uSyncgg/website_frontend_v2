// LAN event locations are stored as "City, State" (e.g. "Richmond, VA").
// This pulls just the state/province portion for state-level filtering.
export const getStateFromLocation = (location) => (location || '').split(',').pop().trim();
