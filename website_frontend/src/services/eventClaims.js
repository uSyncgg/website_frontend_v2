import apiClient from "./apiClient";

// Both routes need a logged-in user. apiClient's interceptor attaches Supabase's current
// access token to every request, so nothing here sets the Authorization header.

// { event_id, name, event_type, owned, pending_claim }: the event's real name (from the
// backend, not the URL) and whether this account can still claim it. 404 if there's no such event.
export const getClaimTarget = (eventId) =>
    apiClient.get(`/host/event-claims/events/${encodeURIComponent(eventId)}`)
        .then(res => res.data);

// `payload` is FormData: event_id, role, description, contact_method, contact, proof (image).
// The backend checks the account has a host profile and the event has no owner yet.
export const submitEventClaim = (payload) =>
    apiClient.post(`/host/event-claims`, payload)
        .then(res => res.data);
