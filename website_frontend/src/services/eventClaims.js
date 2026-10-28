import apiClient from "./apiClient";

// Host claims an existing listing (LAN, league, platform) as theirs.
// `payload` is FormData: event_path, event_type, event_name, role, description,
// contact_email, proof (image file).
// NOTE: POST /host/event-claims doesn't exist on the backend yet - it needs to
// store the claim (and the proof image) for uSync to review.
export const submitEventClaim = (payload, token) =>
    apiClient.post(`/host/event-claims`, payload, {
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data);
