import apiClient from "./apiClient";

// The navbar bell's notifications (GET /notifications). Team invites come from the Teams API
// and are shown alongside. Each is { id, type, data, read, created_at } - see notificationText.
export const getNotifications = () => apiClient.get('/notifications').then(res => res.data);

// Marks the given ids read, or all of them. Resolves to the updated list.
export const markNotificationsRead = (ids = null) => apiClient.post('/notifications/read', { ids }).then(res => res.data);

const teamLink = (data) => `/teams/${encodeURIComponent(data.team_id)}`;
const eventLink = (data) => `/brackets/${encodeURIComponent(data.event_id)}`;
const manageLink = (data) => `/host/events/${encodeURIComponent(data.event_id)}/bracket`;

// { text, to } for one notification: what it says and where it goes.
export const notificationText = ({ type, data }) => {
    switch (type) {
        case 'team_joined':
            return { text: `${data.who} joined ${data.team_name}.`, to: teamLink(data) };
        case 'team_signed_up':
            return { text: `${data.team_name} has enough players and is now signed up for ${data.event_name}.`, to: eventLink(data) };
        case 'team_pending':
            return { text: `${data.team_name} is pending for ${data.event_name}: ${data.have} of ${data.need} players.`, to: eventLink(data) };
        case 'event_delayed': {
            const when = new Date(data.starts_at).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
            return { text: `${data.event_name} now starts ${when}${data.reason ? ` - ${data.reason}` : ''}.`, to: eventLink(data) };
        }
        case 'match_ready':
            return { text: `You have a match in ${data.event_name}${data.opponent ? ` vs ${data.opponent}` : ''}.`, to: eventLink(data) };
        case 'opponent_reported':
            return { text: `${data.opponent} reported a score in ${data.event_name}. Report yours to confirm it.`, to: eventLink(data) };
        case 'score_disputed':
            return data.host
                ? { text: `Disputed score in ${data.event_name} (${data.opponent}). You decide.`, to: manageLink(data) }
                : { text: `Your score vs ${data.opponent} in ${data.event_name} is disputed. The host will decide.`, to: eventLink(data) };
        case 'no_show_reported':
            if (data.host) return { text: `${data.opponent} was reported as a no-show in ${data.event_name}.`, to: manageLink(data) };
            return { text: `${data.opponent} reported you as a no-show in ${data.event_name}. The host will review it.`, to: eventLink(data) };
        default:
            return { text: 'You have a new notification.', to: null };
    }
};
