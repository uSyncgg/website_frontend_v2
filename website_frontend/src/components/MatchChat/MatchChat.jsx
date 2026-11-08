import { useEffect, useRef, useState } from "react";
import { FaComments, FaEyeSlash, FaFlag, FaLock, FaShieldAlt, FaSignOutAlt, FaUserShield } from "react-icons/fa";
import { chatParts, MAX_CHAT_LENGTH } from "utils/chatText";
import styles from "./MatchChat.module.css";

const REQUEST_REASONS = {
    requested: 'A player asked for an admin to join.',
    dispute: 'The two sides reported different scores.',
    no_show: 'A no-show was reported.',
};

export const REPORT_CATEGORIES = [
    { key: 'harassment', label: 'Harassment or bullying' },
    { key: 'hate', label: 'Hate or discrimination' },
    { key: 'sexual', label: 'Sexual or inappropriate content' },
    { key: 'threats', label: 'Threats' },
    { key: 'spam', label: 'Spam or scam' },
    { key: 'other', label: 'Something else' },
];

const timeOf = (iso) => new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

export const dateOf = (iso) => new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

// A message's text, with links as anchors. `ugc` and `nofollow` tell search engines it's user
// content; `noopener noreferrer` keep the opened page from reaching back into ours.
const Body = ({ text }) => chatParts(text).map((part, i) => part.href
    ? <a key={i} href={part.href} target="_blank" rel="noopener noreferrer nofollow ugc" className={styles.link}>{part.text}</a>
    : <span key={i}>{part.text}</span>
);

// One line of a chat. Also used read-only by the staff Moderation tab (no handlers, `highlight`
// marks the reported message).
export const Message = ({ message, highlight = false, onReport, onHide }) => {
    if (message.kind === 'system') {
        return (
            <li className={styles.system}>
                <span>{message.body}</span>
                <time dateTime={message.at}>{timeOf(message.at)}</time>
            </li>
        );
    }
    const admin = message.sender?.role === 'admin';
    const placeholder = message.hidden && !message.body;
    return (
        <li className={`${styles.row} ${message.mine ? styles.mine : ''}`}>
            <div className={`${styles.bubble} ${admin ? styles.adminBubble : ''} ${message.hidden ? styles.hiddenBubble : ''} ${highlight ? styles.highlight : ''}`}>
                <div className={styles.meta}>
                    <strong className={styles.name}>{message.sender?.name ?? 'Player'}</strong>
                    {admin && <span className={styles.adminTag}><FaShieldAlt aria-hidden="true" /> Admin</span>}
                    <time dateTime={message.at}>{timeOf(message.at)}</time>
                </div>
                {placeholder
                    ? <p className={styles.placeholder}><FaEyeSlash aria-hidden="true" /> Hidden by an admin</p>
                    : (
                        <>
                            {message.hidden && <p className={styles.hiddenTag}><FaEyeSlash aria-hidden="true" /> Hidden from players{message.hiddenBy ? ` by ${message.hiddenBy}` : ''}</p>}
                            <p className={styles.text}><Body text={message.body} /></p>
                        </>
                    )}
                {(onReport || onHide) &&
                    <div className={styles.actions}>
                        {message.canHide && onHide &&
                            <button type="button" className={styles.action} onClick={() => onHide(message)} aria-label={`Hide ${message.sender?.name}'s message from players`}>
                                <FaEyeSlash aria-hidden="true" /> Hide
                            </button>}
                        {message.canReport && onReport && (message.reported
                            ? <span className={styles.reported}>Reported</span>
                            : <button type="button" className={styles.action} onClick={() => onReport(message)} aria-label={`Report ${message.sender?.name}'s message`}>
                                <FaFlag aria-hidden="true" /> Report
                            </button>)}
                    </div>
                }
            </div>
        </li>
    );
};

// A day label whenever the day changes between two messages, then the message itself.
const Line = ({ previous, ...props }) => {
    const { message } = props;
    const newDay = !previous || dateOf(previous.at) !== dateOf(message.at);
    return (
        <>
            {newDay && <li className={styles.day} aria-hidden="true">{dateOf(message.at)}</li>}
            <Message {...props} />
        </>
    );
};

// A read-only chat log (the Moderation tab's chat history).
export const ChatLog = ({ messages, highlightId }) => (
    <ol className={`${styles.list} ${styles.logOnly}`} aria-label="Chat history">
        {messages.length === 0
            ? <li className={styles.empty}>Nothing was saved for this chat.</li>
            : messages.map((m, i) => <Line key={m.id} message={m} previous={messages[i - 1]} highlight={m.id === highlightId} />)}
    </ol>
);

// The report form: what's wrong, and who sees it (uSync staff only).
const ReportDialog = ({ message, onClose, onSubmit }) => {
    const [category, setCategory] = useState('harassment');
    const [note, setNote] = useState('');
    const [state, setState] = useState({ sending: false, error: '', done: false });

    const submit = async (e) => {
        e.preventDefault();
        setState({ sending: true, error: '', done: false });
        const { ok, error } = await onSubmit(message.id, category, note.trim());
        setState({ sending: false, error: ok ? '' : error, done: ok });
    };

    return (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="report-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <form className={styles.dialog} onSubmit={submit}>
                <h3 id="report-title" className={styles.dialogTitle}><FaFlag aria-hidden="true" /> Report a message</h3>
                <blockquote className={styles.quote}><strong>{message.sender?.name}:</strong> {message.body}</blockquote>
                {state.done
                    ? (
                        <>
                            <p className={styles.thanks}>Thanks. uSync staff will review it. Hosts and admins of this event don't see reports.</p>
                            <div className={styles.dialogActions}><button type="button" className={styles.primaryBtn} onClick={onClose}>Done</button></div>
                        </>
                    )
                    : (
                        <>
                            <p className={styles.dialogHint}>
                                Reports go to uSync staff only, not to this event's host or admins. Abuse of chat can lead to a warning or a ban under our Terms of Service.
                            </p>
                            <label className={styles.field}>
                                <span>What's wrong?</span>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
                                    {REPORT_CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                                </select>
                            </label>
                            <label className={styles.field}>
                                <span>Anything else we should know? (optional)</span>
                                <textarea value={note} maxLength={300} rows={3} onChange={(e) => setNote(e.target.value)} className={styles.input} />
                            </label>
                            {state.error && <p className={styles.error} role="alert">{state.error}</p>}
                            <div className={styles.dialogActions}>
                                <button type="button" className={styles.ghostBtn} onClick={onClose}>Cancel</button>
                                <button type="submit" className={styles.primaryBtn} disabled={state.sending}>Send report</button>
                            </div>
                        </>
                    )}
            </form>
        </div>
    );
};

// The match chat. Players on either side of the match talk here to sort out when and where
// to play; an admin (host or event admin) can be requested, and joins on their own or when a
// dispute or no-show calls for one. Admins can leave again, hide a player's message (which
// reports it to uSync staff), and anyone can report a message to staff. All the state comes in
// as props (see useMatchChat), so the real page and the mock pages share it.
export const MatchChat = ({
    chat, messages, error, sendError, busy, onSend, onRequestAdmin, onJoin, onLeave, onHide, onReport, onClearError,
    title = 'Match chat',
}) => {
    const [draft, setDraft] = useState('');
    const [reporting, setReporting] = useState(null);
    const listRef = useRef(null);
    const stick = useRef(true);

    // Stay at the bottom as lines arrive, unless the reader scrolled up to look back.
    useEffect(() => {
        const el = listRef.current;
        if (el && stick.current) el.scrollTop = el.scrollHeight;
    }, [messages, chat?.canRead]);

    if (!chat) {
        return error
            ? <section className={styles.card}><p className={styles.notice} role="alert">{error}</p></section>
            : null;
    }

    const onScroll = () => {
        const el = listRef.current;
        stick.current = !el || el.scrollHeight - el.scrollTop - el.clientHeight < 48;
    };

    const submit = async (e) => {
        e.preventDefault();
        const body = draft.trim();
        if (!body || busy) return;
        stick.current = true;
        if (await onSend(body)) setDraft('');
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) submit(e);
    };

    const isAdmin = chat.role === 'admin';
    const adminHere = chat.admins?.length > 0;
    const deleteDay = chat.expiresAt ? new Date(chat.expiresAt) : null;

    return (
        <section className={styles.card} aria-labelledby="match-chat-title">
            <header className={styles.head}>
                <h2 id="match-chat-title" className={styles.title}><FaComments aria-hidden="true" /> {title}</h2>
                <div className={styles.chips}>
                    {isAdmin && <span className={`${styles.chip} ${styles.chipAdmin}`}><FaUserShield aria-hidden="true" /> Viewing as admin</span>}
                    {adminHere
                        ? chat.admins.map(a => <span key={a.name} className={`${styles.chip} ${styles.chipAdmin}`}><FaShieldAlt aria-hidden="true" /> {a.name} joined</span>)
                        : chat.adminRequested && <span className={`${styles.chip} ${styles.chipWaiting}`}>Admin requested</span>}
                </div>
            </header>

            {isAdmin && !chat.joined &&
                <div className={`${styles.banner} ${chat.adminRequested ? styles.bannerAlert : ''}`}>
                    {chat.adminRequested && <strong>{REQUEST_REASONS[chat.adminRequestReason] ?? 'An admin was asked to join.'}</strong>}
                    <p>
                        Players can talk in private until an admin joins. When you join, you see the whole chat so far
                        and everyone in it is told that you joined.
                    </p>
                    {chat.canJoin && <button type="button" className={styles.primaryBtn} disabled={busy} onClick={onJoin}>Join chat</button>}
                </div>
            }

            {chat.closedReason && <p className={styles.notice}><FaLock aria-hidden="true" /> {chat.closedReason}</p>}

            {chat.canRead
                ? (
                    <ol className={styles.list} ref={listRef} onScroll={onScroll} role="log" aria-live="polite" aria-label="Chat messages">
                        {messages.length === 0
                            ? <li className={styles.empty}>No messages yet. Say hi and agree on when to play.</li>
                            : messages.map((m, i) => (
                                <Line key={m.id} message={m} previous={messages[i - 1]} onReport={onReport && setReporting} onHide={onHide} />
                            ))}
                    </ol>
                )
                : isAdmin && <p className={styles.notice}><FaLock aria-hidden="true" /> The chat is hidden until you join.</p>
            }

            {chat.canWrite &&
                <form className={styles.composer} onSubmit={submit}>
                    <label htmlFor="match-chat-input" className={styles.srOnly}>Message</label>
                    <textarea
                        id="match-chat-input"
                        className={styles.input}
                        rows={1}
                        maxLength={MAX_CHAT_LENGTH}
                        placeholder="Write a message"
                        value={draft}
                        onChange={(e) => { setDraft(e.target.value); if (sendError) onClearError?.(); }}
                        onKeyDown={onKeyDown}
                    />
                    <button type="submit" className={styles.primaryBtn} disabled={busy || !draft.trim()}>Send</button>
                </form>
            }
            {(sendError || error) && <p className={styles.error} role="alert">{sendError || error}</p>}

            <footer className={styles.foot}>
                <div className={styles.footActions}>
                    {chat.role === 'player' && chat.open && !chat.ended &&
                        <button type="button" className={styles.ghostBtn} disabled={busy || !chat.canRequestAdmin} onClick={onRequestAdmin}>
                            <FaUserShield aria-hidden="true" /> {adminHere ? 'Admin is in the chat' : chat.adminRequested ? 'Admin requested' : 'Request an admin'}
                        </button>
                    }
                    {chat.canLeave &&
                        <button type="button" className={styles.ghostBtn} disabled={busy} onClick={onLeave}>
                            <FaSignOutAlt aria-hidden="true" /> Leave chat
                        </button>
                    }
                    {chat.canWrite && <span className={styles.count}>{draft.length}/{MAX_CHAT_LENGTH}</span>}
                </div>
                <p className={styles.rules}>
                    Keep it respectful. Banned words and unsafe links are blocked, and you can report any message to uSync staff.
                    Admins can only see this chat if they join.
                    {deleteDay
                        ? <> This chat is deleted on {dateOf(deleteDay.toISOString())}.</>
                        : <> Chats are deleted 3 days after the event ends.</>}
                </p>
            </footer>

            {reporting && onReport && <ReportDialog message={reporting} onClose={() => setReporting(null)} onSubmit={onReport} />}
        </section>
    );
};
