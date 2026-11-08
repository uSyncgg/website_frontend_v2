import { Link } from "react-router";
import { FaBell } from "react-icons/fa";
import { notificationText } from "services/notifications";
import hostStyles from "pages/Host/Host.module.css";
import bell from "components/NotificationBell/NotificationBell.module.css";

// MOCK PAGE - DELETE src/pages/Mock (and its routes in src/index.js) before this ships.
//
// /mock/chat/notifications: the notifications an admin (and the players) get from match chat,
// drawn with the real notificationText and the bell's own styles. Each row links to the mock match page.

const EVENT = { event_id: 'evt-spring', event_name: 'Spring Showdown 4v4', match_id: 'r1m0' };

const ROWS = [
    {
        label: 'A player asked for an admin',
        who: 'Host and event admins',
        n: { type: 'chat_admin_requested', read: false, created_at: new Date(Date.now() - 3 * 60000).toISOString(), data: { ...EVENT, opponent: 'Alpha vs Delta', reason: 'requested', host: true } },
    },
    {
        label: 'Score dispute (admin auto-invited to the chat)',
        who: 'Host and event admins',
        n: { type: 'score_disputed', read: false, created_at: new Date(Date.now() - 20 * 60000).toISOString(), data: { ...EVENT, opponent: 'Alpha vs Delta', host: true } },
    },
    {
        label: 'No-show reported (admin auto-invited to the chat)',
        who: 'Host and event admins',
        n: { type: 'no_show_reported', read: true, created_at: new Date(Date.now() - 95 * 60000).toISOString(), data: { ...EVENT, opponent: 'Delta', against_you: false, host: true } },
    },
    {
        label: 'Score dispute, as the players see it',
        who: 'Both sides',
        n: { type: 'score_disputed', read: true, created_at: new Date(Date.now() - 26 * 3600000).toISOString(), data: { ...EVENT, opponent: 'Delta' } },
    },
];

export const ChatNotificationsMock = () => (
    <div className={`standardContainer ${hostStyles.page}`}>
        <title>uSync | Chat notifications mock</title>
        <meta name="robots" content="noindex, nofollow" />
        <div className={hostStyles.narrow}>
            <p className={hostStyles.mockBanner}>
                Mock page for review. <Link to="/mock/chat" style={{ color: 'inherit', fontWeight: 700 }}>Back to the chat mock</Link>
            </p>
            <h1 className={hostStyles.title}>Chat notifications</h1>
            <p className={hostStyles.subtitle}>
                What lands in the bell. Admins open the match from the notification and join the chat there.
                (Clicking a row goes to the real match route, which won't have data on this mock.)
            </p>

            {ROWS.map(({ label, who, n }) => {
                const { text, to } = notificationText(n);
                return (
                    <section key={label} className={hostStyles.card} style={{ marginTop: '1rem' }}>
                        <h2 className={hostStyles.sectionTitle}><FaBell aria-hidden="true" /> {label}</h2>
                        <p className={hostStyles.muted}>Sent to: {who}</p>
                        <div className={bell.panel} style={{ position: 'static', width: '100%', maxHeight: 'none', marginTop: '.6rem' }}>
                            <div className={`${bell.item} ${n.read ? '' : bell.unread}`}>
                                <Link to={to} className={bell.itemLink}>
                                    <p className={bell.text}>{text}</p>
                                    <span className={bell.time}>{Math.max(1, Math.round((Date.now() - new Date(n.created_at)) / 60000))}m ago</span>
                                </Link>
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    </div>
);
