import { useState } from "react";
import { sendLocalNudge, clearLocalNudges } from "services/nudges";
import styles from "./AdminAnalytics.module.css";

// /dev/nudge-test (development builds only): send yourself a nudge popup without a backend.
// The popup is the real one the app shows everywhere, so it follows you to other pages
// until you close it.

export const NudgeTest = () => {
    const [nudge, setNudge] = useState({
        title: 'New CoD league starts Friday',
        message: 'Sign-ups close Thursday night. Grab your squad and get in.',
        link_url: '/leagues',
        link_label: 'View leagues',
    });

    const field = (key) => ({ value: nudge[key], onChange: e => setNudge(n => ({ ...n, [key]: e.target.value })) });

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>uSync | Nudge test</title>
            <meta name="robots" content="noindex, nofollow" />
            <div className={styles.inner}>
                <header className={styles.header}>
                    <div>
                        <p className={styles.eyebrow}>Dev</p>
                        <h1 className={styles.title}>Nudge popup test</h1>
                    </div>
                </header>
                <section className={styles.card}>
                    <form
                        style={{ display: 'grid', gap: '.6rem', maxWidth: '32rem' }}
                        onSubmit={e => { e.preventDefault(); sendLocalNudge(nudge); }}
                    >
                        <input className={styles.input} placeholder="Title" required {...field('title')} />
                        <textarea className={styles.input} placeholder="Message" rows={3} {...field('message')} />
                        <input className={styles.input} placeholder="Link URL (optional)" {...field('link_url')} />
                        <input className={styles.input} placeholder="Button text (optional)" {...field('link_label')} />
                        <div className={styles.formActions}>
                            <button type="submit" className={styles.primaryButton}>Send to me</button>
                            <button type="button" className={styles.ghostButton} onClick={clearLocalNudges}>Clear test nudges</button>
                        </div>
                        <p className={styles.chartNote}>
                            The popup shows in the bottom-right corner. Close it with the ×; send several to see them queue.
                        </p>
                    </form>
                </section>
            </div>
        </div>
    );
};
