import { useCallback, useEffect, useRef, useState } from "react";
import { FaComments } from "react-icons/fa";
import { timeAgo } from "utils/humanize";
import { useChats } from "./ChatContext";
import styles from "./Chat.module.css";

// The chat icon left of the notification bell: your open match chats, the ones with messages
// you haven't read highlighted. Picking one opens it in the chat window. Hidden until you have
// a chat.
export const ChatButton = () => {
    const { signedIn, chats, unreadCount, openChat, refresh } = useChats();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if (!open) return undefined;
        refresh();
        const outside = (e) => { if (!ref.current?.contains(e.target)) close(); };
        const escape = (e) => { if (e.key === 'Escape') close(); };
        document.addEventListener('mousedown', outside);
        document.addEventListener('keydown', escape);
        return () => {
            document.removeEventListener('mousedown', outside);
            document.removeEventListener('keydown', escape);
        };
    }, [open, refresh, close]);

    if (!signedIn || chats.length === 0) return null;

    return (
        <div className={styles.wrap} ref={ref}>
            <button type="button" className={styles.iconButton} aria-label={`Match chats${unreadCount ? `, ${unreadCount} with new messages` : ''}`}
                aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(o => !o)}>
                <FaComments aria-hidden="true" />
                {unreadCount > 0 && <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>}
            </button>
            {open &&
                <div className={styles.panel}>
                    <div className={styles.head}><h2>Match chats</h2></div>
                    <ul className={styles.list}>
                        {chats.map(c => (
                            <li key={c.id}>
                                <button type="button" className={`${styles.chatRow} ${c.hasUnread ? styles.unread : ''}`}
                                    onClick={() => { openChat(c.id); close(); }}>
                                    <span className={styles.chatTitle}>
                                        {c.title}
                                        {c.hasUnread && <span className={styles.dot} aria-label="New messages" />}
                                    </span>
                                    <span className={styles.chatSubtitle}>{c.subtitle}</span>
                                    <span className={styles.chatMeta}>
                                        {c.role === 'admin' ? 'You joined as admin · ' : ''}
                                        {c.lastMessageAt ? `Last message ${timeAgo(c.lastMessageAt)}` : 'No messages yet'}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
};
