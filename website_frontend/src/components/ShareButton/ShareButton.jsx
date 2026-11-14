import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaCopy, FaEnvelope, FaShareAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import styles from './ShareButton.module.css';

/**
 * The site's one Share button. Opens a small menu: copy the link, the device's share sheet
 * (where there is one, e.g. phones), post on X, or email it.
 *
 * - `url`: what to share (defaults to the current page).
 * - `title`: the share sheet / email subject.
 * - `text`: the line shared with the link (defaults to the title).
 * - `className`: restyles the button (e.g. the host pages' buttons).
 */
export const ShareButton = ({ title, url, text, className }) => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const wrap = useRef(null);
    const link = url ?? (typeof window !== 'undefined' ? window.location.href : '');
    const message = text ?? title ?? '';

    useEffect(() => {
        if (!open) return undefined;
        const outside = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
        const escape = (e) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', outside);
        document.addEventListener('keydown', escape);
        return () => {
            document.removeEventListener('mousedown', outside);
            document.removeEventListener('keydown', escape);
        };
    }, [open]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            window.prompt('Copy this link:', link);
        }
    };

    const nativeShare = async () => {
        try {
            await navigator.share({ title, text: message, url: link });
            setOpen(false);
        } catch {
            // Closing the share sheet isn't an error worth showing.
        }
    };

    return (
        <div className={styles.wrap} ref={wrap}>
            <button type="button" className={className ?? styles.share} aria-haspopup="menu" aria-expanded={open}
                onClick={() => setOpen(o => !o)}>
                <FaShareAlt aria-hidden="true" /> Share
            </button>
            {open &&
                <div className={styles.menu} role="menu">
                    <button type="button" role="menuitem" className={styles.item} onClick={copy}>
                        {copied ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />} {copied ? 'Link copied' : 'Copy link'}
                    </button>
                    {typeof navigator !== 'undefined' && navigator.share &&
                        <button type="button" role="menuitem" className={styles.item} onClick={nativeShare}>
                            <FaShareAlt aria-hidden="true" /> Share via…
                        </button>
                    }
                    <a role="menuitem" className={styles.item} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(link)}`}>
                        <FaXTwitter aria-hidden="true" /> Post on X
                    </a>
                    <a role="menuitem" className={styles.item} onClick={() => setOpen(false)}
                        href={`mailto:?subject=${encodeURIComponent(title ?? '')}&body=${encodeURIComponent(`${message}: ${link}`)}`}>
                        <FaEnvelope aria-hidden="true" /> Email
                    </a>
                </div>
            }
        </div>
    );
};
