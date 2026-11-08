import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { FaEyeSlash, FaFlag } from "react-icons/fa";
import { LoadingWheel } from "components";
import { useAuth } from "hooks";
import { ChatLog, REPORT_CATEGORIES } from "components/MatchChat/MatchChat";
import { getApiErrorMessage } from "utils/apiError";
import { getChatReports, getChatReportHistory, resolveChatReport, historyMessages } from "services/adminModeration";
import analytics from "./AdminAnalytics.module.css";
import styles from "./AdminModeration.module.css";

// Moderation tab of /admin/analytics: match chat messages players or admins reported, and
// messages an admin hid (those are reported automatically). Reports go to uSync staff only, never
// to an event's own admins. Each one links to its chat history, and is closed as "actioned"
// (staff acted on it, e.g. a warning or a ban) or "dismissed" (a hidden message is put back).

const STATUSES = [
    { key: 'open', label: 'Open' },
    { key: 'actioned', label: 'Actioned' },
    { key: 'dismissed', label: 'Dismissed' },
    { key: 'all', label: 'All' },
];

const categoryLabel = (key) => REPORT_CATEGORIES.find(c => c.key === key)?.label ?? (key === 'other' ? 'Other' : key);

const when = (iso) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

const ReportCard = ({ report, loadHistory, onResolve }) => {
    const [history, setHistory] = useState(null);
    const [open, setOpen] = useState(false);
    const [loadError, setLoadError] = useState('');
    const [note, setNote] = useState('');
    const [busy, setBusy] = useState(false);
    const [resolveError, setResolveError] = useState('');
    const auto = report.source === 'admin_hide';

    const toggle = async () => {
        if (open) { setOpen(false); return; }
        setOpen(true);
        if (history) return;
        try {
            setHistory(await loadHistory(report.id));
            setLoadError('');
        } catch (err) {
            setLoadError(getApiErrorMessage(err));
        }
    };

    const resolve = async (action) => {
        setBusy(true);
        setResolveError('');
        const error = await onResolve(report.id, action, note.trim());
        if (error) setResolveError(error);
        setBusy(false);
    };

    return (
        <article className={`${analytics.card} ${styles.report}`} aria-label={`Report in ${report.event_name}`}>
            <div className={styles.top}>
                <span className={`${styles.badge} ${auto ? styles.badgeAuto : styles.badgePlayer}`}>
                    {auto ? <><FaEyeSlash aria-hidden="true" /> Hidden by an admin (auto-reported)</> : <><FaFlag aria-hidden="true" /> Player report</>}
                </span>
                {!auto && <span className={styles.badge}>{categoryLabel(report.category)}</span>}
                <span className={`${styles.badge} ${styles[`status_${report.status}`]}`}>{report.status}</span>
                <span className={styles.when}>{when(report.created_at)}</span>
            </div>

            <p className={styles.where}>
                <strong>{report.event_name}</strong> · match {report.match_id}
                {' · '}<Link to={`/brackets/${encodeURIComponent(report.event_id)}`} className={styles.link}>Open event</Link>
            </p>

            <blockquote className={styles.quote}>
                <strong>{report.sender_name ?? 'Unknown'}</strong>
                {report.sender_role === 'admin' && <span className={styles.roleTag}>admin</span>}
                <span className={styles.body}>{report.message}</span>
            </blockquote>
            <p className={styles.reporter}>
                {auto ? 'Hidden by' : 'Reported by'} <strong>{report.reporter_name ?? 'a deleted account'}</strong>
                {report.note && <> · “{report.note}”</>}
            </p>

            <div className={styles.row}>
                <button type="button" className={analytics.ghostButton} aria-expanded={open} onClick={toggle}>
                    {open ? 'Hide chat history' : 'View chat history'}
                </button>
                {!report.chat_available && <span className={styles.muted}>The chat was deleted; a saved copy is kept with this report.</span>}
            </div>

            {open &&
                <div className={styles.history}>
                    {loadError && <p className={analytics.error} role="alert">{loadError}</p>}
                    {!history && !loadError && <p className={styles.muted}>Loading…</p>}
                    {history &&
                        <>
                            <p className={styles.muted}>
                                {history.live
                                    ? `Live chat${history.admins.length ? ` · admins who joined: ${history.admins.join(', ')}` : ' · no admin joined'}`
                                    : 'Saved copy: the reported message and the lines around it.'}
                            </p>
                            <ChatLog messages={historyMessages(history)} highlightId={history.highlight_id} />
                        </>
                    }
                </div>
            }

            {report.status === 'open'
                ? (
                    <div className={styles.resolve}>
                        <label className={styles.noteField}>
                            <span>Note (optional, kept with the report)</span>
                            <input className={analytics.input} value={note} maxLength={500} onChange={(e) => setNote(e.target.value)} />
                        </label>
                        <div className={styles.row}>
                            <button type="button" className={analytics.primaryButton} disabled={busy} onClick={() => resolve('actioned')}>Mark actioned</button>
                            <button type="button" className={analytics.ghostButton} disabled={busy} onClick={() => resolve('dismissed')}>
                                {auto ? 'Dismiss and restore message' : 'Dismiss'}
                            </button>
                        </div>
                        {resolveError && <p className={analytics.error} role="alert">{resolveError}</p>}
                    </div>
                )
                : (
                    <p className={styles.muted}>
                        {report.status === 'actioned' ? 'Actioned' : 'Dismissed'} by {report.reviewed_by ?? 'staff'} {report.reviewed_at && `on ${when(report.reviewed_at)}`}
                        {report.resolution_note && <> · “{report.resolution_note}”</>}
                    </p>
                )}
        </article>
    );
};

// The tab's content from props, so the real tab and the mock page share it.
export const ModerationView = ({ data, status, onStatus, loading, error, loadHistory, onResolve }) => (
    <>
        <div className={analytics.filterRow}>
            <span className={analytics.filterLabel}>Show</span>
            <div className={analytics.segmented} role="group" aria-label="Report status">
                {STATUSES.map(s => (
                    <button key={s.key} type="button" aria-pressed={status === s.key}
                        className={`${analytics.segment} ${status === s.key ? analytics.segmentActive : ''}`} onClick={() => onStatus(s.key)}>
                        {s.label}{s.key === 'open' && data ? ` (${data.open_count})` : ''}
                    </button>
                ))}
            </div>
        </div>

        <p className={styles.intro}>
            Reported match chat messages. Reports come from players, from admins who joined a chat, and automatically when an admin
            hides a message. They are only visible here, never to the event's host or admins. Reading a chat is recorded in the admin audit log.
        </p>

        {loading && !data && <LoadingWheel />}
        {error && <p className={analytics.error} role="alert">{error}</p>}
        {data && data.reports.length === 0 && <p className={styles.empty}>No {status === 'all' ? '' : `${status} `}reports.</p>}
        {data && data.reports.map(r => <ReportCard key={r.id} report={r} loadHistory={loadHistory} onResolve={onResolve} />)}
    </>
);

export const AdminModerationTab = () => {
    const { session } = useAuth();
    const token = session?.access_token;
    const [status, setStatus] = useState('open');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            setData(await getChatReports(token, status));
            setError('');
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [token, status]);

    useEffect(() => { load(); }, [load]);

    const resolve = async (id, action, note) => {
        try {
            await resolveChatReport(token, id, action, note);
            await load();
            return '';
        } catch (err) {
            return getApiErrorMessage(err);
        }
    };

    return (
        <ModerationView
            data={data} status={status} onStatus={setStatus} loading={loading} error={error}
            loadHistory={(id) => getChatReportHistory(token, id)} onResolve={resolve}
        />
    );
};
