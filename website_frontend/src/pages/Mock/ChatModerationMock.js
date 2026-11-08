import { useMemo, useState } from "react";
import { Link } from "react-router";
import hostStyles from "pages/Host/Host.module.css";
import analytics from "pages/Admin/AdminAnalytics.module.css";
import { ModerationView } from "pages/Admin/AdminModerationTab";

// MOCK PAGE - DELETE src/pages/Mock (and its routes in src/index.js) before this ships.
//
// /mock/chat/moderation: the admin dashboard's Moderation tab with sample reports, in the real
// dashboard's chrome. Resolving, dismissing (which restores a hidden message) and the chat history
// links all work in memory. The real tab is /admin/analytics?tab=moderation.

const ago = (m) => new Date(Date.now() - m * 60000).toISOString();

const LIVE_CHAT = [
    { id: 1, kind: 'user', name: 'cat', role: 'player', body: 'hey, you ready?', at: ago(50), hidden: false },
    { id: 2, kind: 'user', name: 'ace', role: 'player', body: 'yep, sending the lobby code', at: ago(48), hidden: false },
    { id: 3, kind: 'user', name: 'cat', role: 'player', body: 'you are all garbage, uninstall the game', at: ago(30), hidden: true, hidden_by: 'ModMike' },
    { id: 4, kind: 'system', name: null, role: null, body: 'An admin hid a message. uSync staff will review it.', at: ago(29), hidden: false },
    { id: 5, kind: 'user', name: 'ModMike', role: 'admin', body: 'Keep it civil please.', at: ago(28), hidden: false },
];

const SEED = [
    {
        id: 'r1', source: 'player', category: 'harassment', note: 'Keeps telling my team to quit', status: 'open', created_at: ago(14),
        reporter_name: 'ace', sender_name: 'cat', sender_role: 'player', message: 'you are all garbage, uninstall the game',
        event_id: 'evt-spring', event_name: 'Spring Showdown 4v4', match_id: 'r1m0', chat_available: true,
        reviewed_by: null, reviewed_at: null, resolution_note: null, history: LIVE_CHAT, highlight: 3,
    },
    {
        id: 'r2', source: 'admin_hide', category: 'other', note: null, status: 'open', created_at: ago(29),
        reporter_name: 'ModMike', sender_name: 'cat', sender_role: 'player', message: 'you are all garbage, uninstall the game',
        event_id: 'evt-spring', event_name: 'Spring Showdown 4v4', match_id: 'r1m0', chat_available: true,
        reviewed_by: null, reviewed_at: null, resolution_note: null, history: LIVE_CHAT, highlight: 3,
    },
    {
        id: 'r3', source: 'player', category: 'spam', note: null, status: 'open', created_at: ago(60 * 26),
        reporter_name: 'delta_dan', sender_name: 'promo_bot', sender_role: 'player', message: 'free skins at discord-gifts-free.com',
        event_id: 'evt-winter', event_name: 'Winter Brawl 1v1', match_id: 'r0m3', chat_available: false,
        reviewed_by: null, reviewed_at: null, resolution_note: null,
        history: [
            { id: 40, kind: 'user', name: 'delta_dan', role: 'player', body: 'who are you?', at: ago(60 * 26 + 3), hidden: false },
            { id: 41, kind: 'user', name: 'promo_bot', role: 'player', body: 'free skins at discord-gifts-free.com', at: ago(60 * 26 + 2), hidden: false },
        ],
        highlight: 41,
    },
    {
        id: 'r4', source: 'player', category: 'threats', note: null, status: 'actioned', created_at: ago(60 * 70),
        reporter_name: 'bee', sender_name: 'rage_quit', sender_role: 'player', message: 'I will find you after this',
        event_id: 'evt-fall', event_name: 'Fall Classic', match_id: 'r2m1', chat_available: false,
        reviewed_by: 'staff@usync.gg', reviewed_at: ago(60 * 60), resolution_note: '7-day chat ban issued', history: [], highlight: null,
    },
];

export const ChatModerationMock = () => {
    const [reports, setReports] = useState(SEED);
    const [status, setStatus] = useState('open');

    const data = useMemo(() => ({
        open_count: reports.filter(r => r.status === 'open').length,
        reports: reports.filter(r => status === 'all' || r.status === status),
    }), [reports, status]);

    const loadHistory = async (id) => {
        await new Promise(r => setTimeout(r, 250));
        const r = reports.find(x => x.id === id);
        return {
            live: r.chat_available, highlight_id: r.highlight, event_id: r.event_id, match_id: r.match_id,
            admins: r.chat_available ? ['ModMike'] : [], messages: r.history,
        };
    };

    const onResolve = async (id, action, note) => {
        await new Promise(r => setTimeout(r, 250));
        setReports(list => list.map(r => r.id === id
            ? { ...r, status: action, reviewed_by: 'you@usync.gg', reviewed_at: new Date().toISOString(), resolution_note: note || null }
            : r));
        return '';
    };

    return (
        <div className={`standardContainer ${analytics.page}`}>
            <title>uSync | Moderation tab mock</title>
            <meta name="robots" content="noindex, nofollow" />
            <div className={analytics.inner}>
                <p className={hostStyles.mockBanner}>
                    Mock page for review: sample reports, saved nowhere. <Link to="/mock/chat" style={{ color: 'inherit', fontWeight: 700 }}>Back to the chat mock</Link>
                </p>
                <header className={analytics.header}>
                    <div>
                        <p className={analytics.eyebrow}>Admin</p>
                        <h1 className={analytics.title}>Analytics</h1>
                    </div>
                </header>
                <nav className={analytics.tabs} role="tablist" aria-label="Admin sections">
                    {['Overview', 'Accounts', 'Events', 'Finance', 'Articles', 'Moderation'].map(t => (
                        <button key={t} type="button" role="tab" aria-selected={t === 'Moderation'}
                            className={`${analytics.tab} ${t === 'Moderation' ? analytics.tabActive : ''}`} disabled={t !== 'Moderation'}>
                            {t}
                        </button>
                    ))}
                </nav>
                <div role="tabpanel">
                    <ModerationView data={data} status={status} onStatus={setStatus} loading={false} error=""
                        loadHistory={loadHistory} onResolve={onResolve} />
                </div>
            </div>
        </div>
    );
};
