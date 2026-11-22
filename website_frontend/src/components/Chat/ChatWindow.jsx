import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FaTimes, FaUserShield } from "react-icons/fa";
import { ReportMatchDialog } from "components/Bracket/Bracket";
import { callAdmin } from "services/chats";
import {
    clearBracketError, disputeResult, matchView, reportNoShow, reportScore, useBracketError, useHostEvent,
} from "services/brackets";
import { findMatch } from "utils/bracket";
import { getApiErrorMessage } from "utils/apiError";
import { useChats } from "./ChatContext";
import styles from "./Chat.module.css";

const MAX_LENGTH = 500;
const clock = (iso) => new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

// Report score / no-show / dispute for a player, the same rules as the match page (the server
// decides what's allowed; this only shows it), plus "Call an admin". An admin who joined gets a
// link to decide the match on its page.
const MatchActions = ({ chat, onError, onChat }) => {
    const event = useHostEvent(chat.eventPublicId);
    const bracketError = useBracketError();
    const [dialog, setDialog] = useState(false);
    const [busy, setBusy] = useState(false);
    const [now, setNow] = useState(() => Date.now());
    // Bracket writes keep their error in a shared store; only show it here for our own actions.
    const acting = useRef(false);

    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 15000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        if (!bracketError || !acting.current) return;
        acting.current = false;
        onError(bracketError);
        clearBracketError();
    }, [bracketError, onError]);

    const matchLink = `/brackets/${encodeURIComponent(chat.eventPublicId)}/matches/${encodeURIComponent(chat.matchCode)}`;
    const built = event?.bracket && event.bracket.status !== 'draft' ? event.bracket.built : null;
    const match = built && findMatch(built, chat.matchCode);

    if (chat.role === 'admin' || !match) {
        return (
            <div className={styles.actions}>
                <Link to={matchLink} className={styles.actionBtn}>{chat.role === 'admin' ? 'Decide on match page' : 'Match page'}</Link>
            </div>
        );
    }

    const view = matchView(event, match);
    const byId = Object.fromEntries(event.entrants.map(e => [e.id, e]));
    const viewerId = event.viewerEntrantId ?? '';
    const opponent = byId[match.a === viewerId ? match.b : match.a]?.name ?? 'the other side';
    const bestOf = match.bestOf ?? event.bestOf;
    const noShowAt = view.noShowUnlocksAt ? new Date(view.noShowUnlocksAt).getTime() : null;
    const disputeUntil = view.disputeClosesAt ? new Date(view.disputeClosesAt).getTime() : null;
    const canNoShow = view.canReportNoShow || (noShowAt && now >= noShowAt && view.canReport);
    const canDispute = view.canDispute && disputeUntil && now <= disputeUntil;

    const act = async (write) => {
        acting.current = true;
        onError('');
        const ok = await write();
        if (ok) acting.current = false;
        return ok;
    };
    const noShow = () => {
        if (window.confirm(`Report ${opponent} as a no-show? An admin will review it and decide what happens.`)) act(() => reportNoShow(event.id, match.id));
    };
    const dispute = () => {
        if (window.confirm('Dispute this result? The next match is put on hold until an admin reviews it. Each side can dispute a match once.')) {
            act(() => disputeResult(event.id, match.id));
        }
    };
    const call = async () => {
        if (!window.confirm('Call the host or an event admin into this chat? They\'ll see the whole conversation.')) return;
        setBusy(true);
        try {
            onChat(await callAdmin(chat.eventPublicId, chat.matchCode));
        } catch (err) {
            onError(getApiErrorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className={styles.actions}>
            {view.canReport && <button type="button" className={styles.actionPrimary} onClick={() => setDialog(true)}>Report score</button>}
            {canNoShow && view.state !== 'no_show' && <button type="button" className={styles.actionBtn} onClick={noShow}>Claim no-show</button>}
            {canDispute && <button type="button" className={styles.actionDanger} onClick={dispute} title={`Until ${clock(view.disputeClosesAt)}`}>Dispute</button>}
            <button type="button" className={styles.actionBtn} disabled={busy} onClick={call}><FaUserShield aria-hidden="true" /> Call an admin</button>
            <Link to={matchLink} className={styles.actionLink}>Match page</Link>

            {dialog && view.canReport &&
                <ReportMatchDialog
                    match={match}
                    entrants={byId}
                    bestOf={bestOf}
                    mode="player"
                    viewerId={viewerId}
                    reports={view.reports ?? {}}
                    onClose={() => setDialog(false)}
                    onSave={async (a, b) => { if (await act(() => reportScore(event.id, match.id, a, b))) setDialog(false); }}
                />
            }
        </div>
    );
};

const Message = ({ message }) => {
    if (message.senderRole === 'system') return <li className={styles.system}>{message.body}</li>;
    return (
        <li className={`${styles.message} ${message.senderRole === 'admin' ? styles.fromAdmin : ''}`}>
            <span className={styles.sender}>
                {message.senderName ?? 'Player'}
                {message.senderRole === 'admin' && <span className={styles.adminTag}>Admin</span>}
                <span className={styles.time}>{clock(message.createdAt)}</span>
            </span>
            <span className={styles.body}>{message.body}</span>
        </li>
    );
};

// The open chat, floating bottom-right on every page: its history, the message box, and the
// match actions. Messages can't be edited or deleted; bad words are masked by the server.
export const ChatWindow = () => {
    const { openChatData: chat, messages, send, closeWindow, showChat, closedNotice, dismissClosedNotice } = useChats();
    const [text, setText] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const listRef = useRef(null);
    const chatId = chat?.id;

    useEffect(() => { setError(''); setText(''); }, [chatId]);

    useEffect(() => {
        const el = listRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, chatId]);

    if (!chat) {
        if (!closedNotice) return null;
        return (
            <div className={styles.toast} role="status">
                {closedNotice}
                <button type="button" onClick={dismissClosedNotice} aria-label="Dismiss"><FaTimes /></button>
            </div>
        );
    }

    const submit = async (e) => {
        e.preventDefault();
        const body = text.trim();
        if (!body || sending) return;
        setSending(true);
        setError('');
        try {
            await send(chat.id, body);
            setText('');
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setSending(false);
        }
    };

    const closingSoon = chat.closesAt && new Date(chat.closesAt).getTime() - Date.now() < 5 * 60000;

    return (
        <section className={styles.window} aria-label={`Chat: ${chat.title}`}>
            <header className={styles.windowHead}>
                <div>
                    <h2 className={styles.windowTitle}>{chat.title}</h2>
                    <p className={styles.windowSubtitle}>{chat.subtitle}</p>
                </div>
                <button type="button" className={styles.closeBtn} onClick={closeWindow} aria-label="Close chat"><FaTimes /></button>
            </header>
            {closingSoon && <p className={styles.closing}>This chat closes at {clock(chat.closesAt)}.</p>}

            <ul className={styles.messages} ref={listRef} aria-live="polite">
                {messages === undefined && <li className={styles.system}>Loading…</li>}
                {messages?.length === 0 && <li className={styles.system}>No messages yet. Say hi to the other side.</li>}
                {messages?.map(m => <Message key={m.id} message={m} />)}
            </ul>

            {chat.kind === 'match' && <MatchActions chat={chat} onError={setError} onChat={showChat} />}

            <form className={styles.compose} onSubmit={submit}>
                <textarea
                    className={styles.input}
                    value={text}
                    maxLength={MAX_LENGTH}
                    rows={2}
                    placeholder="Message"
                    aria-label="Message"
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) submit(e); }}
                />
                <button type="submit" className={styles.sendBtn} disabled={sending || !text.trim()}>Send</button>
            </form>
            <div className={styles.composeFoot}>
                {error ? <span className={styles.error} role="alert">{error}</span> : <span />}
                {text.length > MAX_LENGTH - 100 && <span className={styles.count}>{text.length}/{MAX_LENGTH}</span>}
            </div>
        </section>
    );
};
