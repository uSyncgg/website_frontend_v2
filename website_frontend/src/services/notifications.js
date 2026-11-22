import apiClient from "./apiClient";
import { supabase } from "./supabaseClient";
import { ordinal } from "./brackets";

// The navbar bell's notifications. Each is { id, type, data, read, created_at } - see
// notificationText. A notification stays in the bell until you act on it ("Go to ...") or
// dismiss it; both mark it read, which hides it. Read ones are deleted by the server 90 days on.
// Team and admin invites aren't notifications: the invite itself is the bell item.

// Unread notifications, newest first.
export const getNotifications = () => apiClient.get('/notifications').then(res => res.data.filter(n => !n.read));

// Marks the given ids read (or all of them).
export const markNotificationsRead = (ids = null) => apiClient.post('/notifications/read', { ids }).then(res => res.data);

// Other parts of the site that react to new notifications (the chat list reloads on
// match_ready) listen here instead of opening a second Realtime subscription. Returns an
// unsubscribe function.
const listeners = new Set();
export const onNotification = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
};

// New notifications as they're created, over Supabase Realtime. Row Level Security on the
// notifications table only lets a signed-in user read their own rows, so the subscription only
// ever delivers this account's notifications (the filter just saves Supabase some work).
// Returns an unsubscribe function.
export const subscribeToNotifications = (accountId, onNew) => {
    const channel = supabase
        .channel(`notifications:${accountId}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `account_id=eq.${accountId}` },
            payload => {
                onNew(payload.new);
                listeners.forEach(fn => fn(payload.new));
            })
        .subscribe();
    return () => { supabase.removeChannel(channel); };
};

const teamLink = (data) => `/teams/${encodeURIComponent(data.team_id)}`;
const eventLink = (data) => `/brackets/${encodeURIComponent(data.event_id)}`;
const matchLink = (data) => (data.match_id ? `${eventLink(data)}/matches/${encodeURIComponent(data.match_id)}` : eventLink(data));
// Your wallet lives on your own profile; /profile sends you to it.
const walletLink = () => '/profile#wallet';
const money = (cents) => `$${(Math.abs(cents ?? 0) / 100).toFixed(2)}`;
const queueLink = (data) => `/host/events/${encodeURIComponent(data.event_id)}/queue`;

// { text, to, action } for one notification: what it says, where its button goes and what the
// button says.
export const notificationText = ({ type, data }) => {
    switch (type) {
        case 'team_joined':
            return { text: `${data.who} joined ${data.team_name}.`, to: teamLink(data), action: 'View team' };
        case 'team_signed_up':
            return { text: `${data.team_name} has a full roster again and is signed up for ${data.event_name}.`, to: eventLink(data), action: 'Go to event' };
        case 'team_pending':
            return { text: `${data.team_name} lost a player in ${data.event_name} (${data.have} of ${data.need}). Pick another before the bracket is published or it'll be dropped.`, to: eventLink(data), action: 'Pick players' };
        case 'entry_dropped':
            return { text: `${data.team_name} was dropped from ${data.event_name}: it was still short of players when the bracket was published.`, to: eventLink(data), action: 'Go to event' };
        case 'event_delayed': {
            const when = new Date(data.starts_at).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
            return { text: `${data.event_name} now starts ${when}${data.reason ? ` - ${data.reason}` : ''}.`, to: eventLink(data), action: 'Go to event' };
        }
        case 'match_ready':
            return { text: `You have a match in ${data.event_name}${data.opponent ? ` vs ${data.opponent}` : ''}.`, to: matchLink(data), action: 'Go to match' };
        case 'opponent_reported':
            return { text: `${data.opponent} reported a score in ${data.event_name}. Report yours to confirm it.`, to: matchLink(data), action: 'Go to match' };
        case 'score_disputed':
            return { text: `Your score vs ${data.opponent} in ${data.event_name} is disputed. An admin will decide.`, to: matchLink(data), action: 'Go to match' };
        case 'no_show_reported':
            return { text: `${data.opponent} reported you as a no-show in ${data.event_name}. An admin will review it.`, to: matchLink(data), action: 'Go to match' };
        case 'issue_opened':
            return { text: `${data.label} in ${data.event_name}${data.summary ? `: ${data.summary}` : ''}`, to: queueLink(data), action: 'Go to queue' };
        case 'wallet_deposit':
            return { text: `${money(data.amount_cents)} was added to your wallet.`, to: walletLink(), action: 'View wallet' };
        case 'wallet_frozen':
            return { text: 'A deposit was disputed with your bank, so your wallet is frozen until it is back to $0 or more.', to: walletLink(), action: 'View wallet' };
        case 'wallet_adjusted':
            return { text: `uSync ${data.amount_cents >= 0 ? 'added' : 'removed'} ${money(Math.abs(data.amount_cents))} ${data.amount_cents >= 0 ? 'to' : 'from'} your wallet${data.reason ? `: ${data.reason}` : '.'}`, to: walletLink(), action: 'View wallet' };
        case 'entry_fee_paid':
            return { text: `${money(data.amount_cents)} was taken from your wallet for ${data.team_name}'s entry in ${data.event_name}.`, to: eventLink(data), action: 'Go to event' };
        case 'entry_refunded':
            return { text: `Your ${money(data.amount_cents)} entry fee for ${data.event_name} was refunded to your wallet.`, to: walletLink(), action: 'View wallet' };
        case 'event_cancelled':
            return { text: `${data.event_name} was cancelled${data.reason === 'min_entrants' ? ': not enough teams signed up' : ''}. Any entry fees were refunded to wallets.`, to: eventLink(data), action: 'Go to event' };
        case 'prize_paid':
            return { text: `You won ${money(data.amount_cents)} in ${data.event_name}${data.placement ? ` (${ordinal(data.placement)})` : ''}. It's in your Earnings.`, to: walletLink(), action: 'View wallet' };
        case 'host_payout':
            return { text: `${data.event_name} paid out. Your ${money(data.amount_cents)} is in your Earnings.`, to: walletLink(), action: 'View wallet' };
        case 'auto_pay_requested':
            return { text: `${data.from || 'Your captain'} wants to sign ${data.team_name} up for ${data.event_name} (${money(data.amount_cents)} entry fee each). Turn on Auto-Pay so they can take your fee.`, to: walletLink(), action: 'Turn on Auto-Pay' };
        case 'deposit_refunded':
            return { text: `${money(data.amount_cents)} was refunded to your card from your wallet.`, to: walletLink(), action: 'View wallet' };
        case 'team_ownership':
            return { text: `You now own ${data.team_name}: its previous owner left uSync.`, to: teamLink(data), action: 'View team' };
        case 'admin_joined':
            return { text: `${data.player} is now an admin for ${data.event_name}.`, to: `/host/events/${encodeURIComponent(data.event_id)}`, action: 'Go to event' };
        default:
            return { text: 'You have a new notification.', to: null, action: null };
    }
};
