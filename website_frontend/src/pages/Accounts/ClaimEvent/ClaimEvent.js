import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router";
import { FaCheckCircle, FaImage } from "react-icons/fa";
import { useAuth, useCurrentUser } from "hooks";
import { submitEventClaim } from "services/eventClaims";
import { getApiErrorMessage } from "utils/apiError";
import { setReturnTo } from "utils/returnTo";
import styles from "./ClaimEvent.module.css";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MIN_DESCRIPTION = 30;
const ROLES = ["Owner / founder", "Tournament organizer", "Staff / admin", "Other"];

const TYPE_LABELS = { lan: 'LAN', league: 'League', platform: 'Platform' };

// How uSync can reach the host about their claim - they pick one.
const CONTACT_METHODS = {
    email: { label: 'Email', placeholder: 'you@example.com', valid: (v) => /^\S+@\S+\.\S+$/.test(v), error: 'Enter a valid email address' },
    discord: { label: 'Discord', placeholder: 'Discord username', valid: (v) => /^\S{2,}$/.test(v), error: 'Enter your Discord username' },
    twitter: { label: 'X / Twitter', placeholder: '@handle', valid: (v) => /^@?\w{1,15}$/.test(v), error: 'Enter your X / Twitter handle, e.g. @uSyncGG' },
};

// /claim-event?type=lan&path=/lans/...&name=... - a host proves they run a listed event.
export const ClaimEvent = () => {
    const [params] = useSearchParams();
    const location = useLocation();
    const { session } = useAuth();
    const { status, profile } = useCurrentUser();

    const eventType = params.get('type') ?? '';
    const eventPath = params.get('path') ?? '';
    const eventName = params.get('name') ?? '';

    const [role, setRole] = useState(ROLES[0]);
    const [description, setDescription] = useState('');
    const [contactMethod, setContactMethod] = useState('email');
    const [contact, setContact] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [tried, setTried] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!file) return undefined;
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    if (status === 'loading') return null;
    if (status === 'anonymous') {
        // Come back here once they've logged in or signed up.
        setReturnTo(location.pathname + location.search);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const isHost = profile?.is_host;

    const errors = {
        file: !file ? 'Upload a picture that proves you run this event'
            : !ACCEPTED_TYPES.includes(file.type) ? 'The picture must be a JPG, PNG or WEBP'
            : file.size > MAX_FILE_SIZE ? 'The picture must be 10MB or smaller' : null,
        description: description.trim().length < MIN_DESCRIPTION && `Tell us a bit more (at least ${MIN_DESCRIPTION} characters)`,
        contact: !CONTACT_METHODS[contactMethod].valid(contact.trim()) && CONTACT_METHODS[contactMethod].error,
        confirmed: !confirmed && 'Please confirm this is your event',
    };
    const hasErrors = Object.values(errors).some(Boolean);
    const err = (key) => tried && errors[key] && <p className={styles.error}>{errors[key]}</p>;

    const submit = async (e) => {
        e.preventDefault();
        setTried(true);
        if (hasErrors) return;
        setSubmitError(null);
        setSubmitting(true);

        const payload = new FormData();
        payload.append('event_type', eventType);
        payload.append('event_path', eventPath);
        payload.append('event_name', eventName);
        payload.append('role', role);
        payload.append('description', description.trim());
        payload.append('contact_method', contactMethod);
        payload.append('contact', contact.trim());
        payload.append('proof', file);

        try {
            await submitEventClaim(payload, session?.access_token);
            setDone(true);
        } catch (error) {
            setSubmitError(getApiErrorMessage(error));
        } finally {
            setSubmitting(false);
        }
    };

    const missingEvent = !eventPath || !eventName;

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>uSync | Claim an Event</title>
            <meta name="robots" content="noindex, nofollow" />

            <div className={styles.inner}>

                <p className={styles.eyebrow}>Host tools</p>
                <h1 className={styles.title}>Claim this event</h1>

                {!isHost ? (
                    <div className={styles.card}>
                        <p className={styles.text}>Only host accounts can claim events. Turn on hosting in your profile settings, then come back to this page.</p>
                        <Link to="/settings/profile" className={styles.primaryBtn}>Go to profile settings</Link>
                    </div>
                ) : missingEvent ? (
                    <div className={styles.card}>
                        <p className={styles.text}>We couldn't tell which event you want to claim. Open the event's page and use the "Claim here" link at the bottom.</p>
                        <Link to="/lans" className={styles.primaryBtn}>Browse LANs</Link>
                    </div>
                ) : done ? (
                    <div className={`${styles.card} ${styles.success}`}>
                        <FaCheckCircle className={styles.successIcon} aria-hidden="true" />
                        <h2 className={styles.cardTitle}>Claim submitted</h2>
                        <p className={styles.text}>
                            Thanks! Our team will review your proof for <strong>{eventName}</strong>. We'll be in touch once it's approved,
                            and the event will then show up as yours.
                        </p>
                        <Link to={eventPath} className={styles.primaryBtn}>Back to the event</Link>
                    </div>
                ) : (
                    <form className={styles.card} onSubmit={submit} noValidate>
                        <div className={styles.eventBox}>
                            <span className={styles.eventLabel}>{TYPE_LABELS[eventType] ?? 'Event'}</span>
                            <Link to={eventPath} className={styles.eventName}>{eventName}</Link>
                        </div>

                        <p className={styles.text}>
                            To claim this event, show us that you run it. Upload a picture that proves it - for example a screenshot
                            of the event's admin dashboard, a booking confirmation, or a photo of you at the event with your staff
                            badge - and explain how it connects you to the event.
                        </p>

                        <div className={styles.field}>
                            <label htmlFor="claim-role" className={styles.label}>Your role at this event</label>
                            <select id="claim-role" className={styles.input} value={role} onChange={e => setRole(e.target.value)}>
                                {ROLES.map(r => <option key={r}>{r}</option>)}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <span className={styles.label}>Proof picture</span>
                            <label htmlFor="claim-proof" className={`${styles.dropzone} ${preview ? styles.dropzoneFilled : ''}`}>
                                {preview
                                    ? <img src={preview} alt="Your proof upload" className={styles.previewImg} />
                                    : <><FaImage className={styles.dropIcon} aria-hidden="true" /><span>Click to upload a picture</span><span className={styles.hint}>JPG, PNG or WEBP, up to 10MB</span></>}
                            </label>
                            <input id="claim-proof" type="file" accept={ACCEPTED_TYPES.join(',')} className={styles.fileInput}
                                onChange={e => setFile(e.target.files?.[0] ?? null)} />
                            {file && <p className={styles.hint}>{file.name} · <label htmlFor="claim-proof" className={styles.changeLink}>Change</label></p>}
                            {err('file')}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="claim-description" className={styles.label}>How does this prove you own the event?</label>
                            <textarea id="claim-description" className={`${styles.input} ${styles.textarea}`} value={description}
                                onChange={e => setDescription(e.target.value)} maxLength={2000}
                                placeholder="e.g. This is the organizer dashboard for our LAN - my name is shown as the event owner at the top." />
                            <p className={styles.hint}>{description.trim().length} / 2000</p>
                            {err('description')}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="claim-contact" className={styles.label}>How should we contact you about this claim?</label>
                            <div className={styles.contactRow}>
                                <select className={`${styles.input} ${styles.contactSelect}`} value={contactMethod} aria-label="Contact method"
                                    onChange={e => { setContactMethod(e.target.value); setContact(''); }}>
                                    {Object.entries(CONTACT_METHODS).map(([key, m]) => <option key={key} value={key}>{m.label}</option>)}
                                </select>
                                <input id="claim-contact" type={contactMethod === 'email' ? 'email' : 'text'} className={styles.input}
                                    value={contact} onChange={e => setContact(e.target.value)} placeholder={CONTACT_METHODS[contactMethod].placeholder} />
                            </div>
                            {err('contact')}
                        </div>

                        <label className={styles.checkRow}>
                            <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
                            I confirm I run this event and the information I've given is true.
                        </label>
                        {err('confirmed')}

                        {submitError && <p className={styles.error}>{submitError}</p>}

                        <div className={styles.actions}>
                            <Link to={eventPath} className={styles.ghostBtn}>Cancel</Link>
                            <button type="submit" className={styles.primaryBtn} disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Submit claim'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
