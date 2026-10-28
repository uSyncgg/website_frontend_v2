import { useEffect, useState } from "react";
import { FaCheck, FaCopy, FaEnvelope, FaShareAlt, FaTimes } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FORMATS } from "utils/bracket";
import { resetDemoEvents, STAGE_LABELS } from "services/hostEventsMock";
import styles from "./Host.module.css";

export const GAMES = ["Call of Duty", "CS 2", "Halo", "League of Legends", "Rocket League", "Valorant", "Warzone", "Other"];
export const TEAM_SIZES = ["1v1", "2v2", "3v3", "4v4", "5v5"];
export const BEST_OF = [1, 3, 5, 7];

export const formatLabel = (format) => FORMATS[format]?.label ?? format;

export const formatDate = (iso) => new Date(iso).toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
});

export const entrantsById = (event) => Object.fromEntries(event.entrants.map(e => [e.id, e]));

export const isTeamEvent = (event) => event.teamSize !== '1v1';
export const unitLabel = (event, plural = true) => (isTeamEvent(event) ? (plural ? 'teams' : 'team') : (plural ? 'players' : 'player'));

// "13 / 16" or "13 (no cap)" for uncapped events.
export const capacityLabel = (event) =>
    event.maxEntrants == null ? `${event.entrants.length} (no cap)` : `${event.entrants.length} / ${event.maxEntrants}`;

export const publicEventUrl = (event) => `${window.location.origin}/brackets/${event.id}`;

export const StageChip = ({ stage }) => (
    <span className={`${styles.chip} ${styles[`stage_${stage}`]}`}>{STAGE_LABELS[stage]}</span>
);

// Shown on every host page while the flow runs on browser-only mock data.
export const MockBanner = () => (
    <div className={styles.mockBanner}>
        Mockup: events, players and brackets here are sample data saved only in this browser. Nothing is sent to uSync's servers.
        <button type="button" onClick={() => window.confirm('Put the demo events back? Anything you created or changed is lost.') && resetDemoEvents()}>
            Reset demo data
        </button>
    </div>
);

export const Modal = ({ title, onClose, children }) => {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={title}
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{title}</h3>
                    <button type="button" className={styles.iconBtn} onClick={onClose} aria-label="Close"><FaTimes /></button>
                </div>
                {children}
            </div>
        </div>
    );
};

// Share the public event page (where people can see the details and sign up).
export const ShareButton = ({ event, className }) => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const url = publicEventUrl(event);
    const text = `Sign up for ${event.name} on uSync`;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            // clipboard blocked - the link is selectable in the field
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <button type="button" className={className ?? styles.secondaryBtn} onClick={() => setOpen(true)}>
                <FaShareAlt /> Share
            </button>
            {open &&
                <Modal title="Share this event" onClose={() => setOpen(false)}>
                    <p className={styles.blurb}>Anyone with this link can see the event details, sign up, and follow the bracket.</p>
                    <div className={styles.shareRow}>
                        <input className={styles.input} value={url} readOnly onFocus={(e) => e.target.select()} aria-label="Event link" />
                        <button type="button" className={styles.primaryBtn} onClick={copy}>
                            {copied ? <><FaCheck /> Copied</> : <><FaCopy /> Copy</>}
                        </button>
                    </div>
                    <div className={styles.btnRow} style={{ marginTop: '1rem' }}>
                        {typeof navigator !== 'undefined' && navigator.share &&
                            <button type="button" className={styles.ghostBtn}
                                onClick={() => navigator.share({ title: event.name, text, url }).catch(() => {})}>
                                <FaShareAlt /> Share via…
                            </button>
                        }
                        <a className={styles.ghostBtn} target="_blank" rel="noreferrer"
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}>
                            <FaXTwitter /> Post on X
                        </a>
                        <a className={styles.ghostBtn} href={`mailto:?subject=${encodeURIComponent(event.name)}&body=${encodeURIComponent(`${text}: ${url}`)}`}>
                            <FaEnvelope /> Email
                        </a>
                    </div>
                </Modal>
            }
        </>
    );
};
