import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useLocation, useParams } from "react-router";
import { FaCheckCircle, FaImage } from "react-icons/fa";
import { FormSelectInput } from "components/FormSelectInput/FormSelectInput";
import { FormTextArea } from "components/FormTextArea/FormTextArea";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { useCurrentUser, useObjectUrl } from "hooks";
import { useAsync } from "hooks/useEvents";
import { getClaimTarget, submitEventClaim } from "services/eventClaims";
import { isSameSitePath } from "services/authServices";
import { getApiErrorMessage, getLoadErrorMessage } from "utils/apiError";
import { ACCEPTED_IMAGE_TYPES, IMAGE_TYPES_LABEL, imageFileRules } from "utils/imageUpload";
import { addProfileUrl } from "utils/profiles";
import styles from "./ClaimEvent.module.css";

// Keys match the backend's ClaimRole / ContactMethod; it re-checks all of these.
const ROLES = [
    { value: 'owner', label: 'Owner / founder' },
    { value: 'organizer', label: 'Tournament organizer' },
    { value: 'staff', label: 'Staff / admin' },
    { value: 'other', label: 'Other' },
];

const CONTACT_METHODS = {
    email: { label: 'Email', placeholder: 'you@example.com', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: 'Enter a valid email address' },
    discord: { label: 'Discord', placeholder: 'Discord username', pattern: /^\S{2,32}$/, error: 'Enter your Discord username' },
    twitter: { label: 'X / Twitter', placeholder: '@handle', pattern: /^@?\w{1,15}$/, error: 'Enter your X / Twitter handle, e.g. @uSyncGG' },
};
const CONTACT_OPTIONS = Object.entries(CONTACT_METHODS).map(([value, { label }]) => ({ value, label }));

const TYPE_LABELS = { lan: 'LAN', league: 'League', wager: 'Wager platform', 'head-to-head': 'Head-to-head platform' };
const MIN_DESCRIPTION = 30;
const MAX_DESCRIPTION = 2000;

// Shown instead of the form when this account can't claim right now.
const Notice = ({ children, action }) => (
    <div className={styles.card}>
        <p className={styles.text}>{children}</p>
        {action}
    </div>
);

// /claim-event/:eventId - a host proves they run a listed event. The route sits behind
// RequireCompleteProfile, so everyone here is logged in.
export const ClaimEvent = () => {
    const { eventId } = useParams();
    const location = useLocation();
    const { status, profiles, refresh } = useCurrentUser();
    const isHost = profiles.some(profile => profile.type === 'host');

    // Only hosts get as far as loading the event.
    const target = useAsync(() => getClaimTarget(eventId), [eventId], { skip: !isHost });

    // Set by the "Claim here" link. Lost after a login round trip, so there's a fallback.
    const eventPath = isSameSitePath(location.state?.eventPath) ? location.state.eventPath : '/';

    const [done, setDone] = useState(false);
    const methods = useForm({ defaultValues: { contact_method: 'email' } });
    const { register, handleSubmit, watch, resetField, setError, formState: { errors, isSubmitting } } = methods;

    const contactMethod = watch('contact_method');
    const proof = watch('proof')?.[0] ?? null;
    const preview = useObjectUrl(proof);

    // A different method has a different format, so start the field again.
    useEffect(() => {
        resetField('contact');
    }, [contactMethod, resetField]);

    const onSubmit = async (values) => {
        const payload = new FormData();
        payload.append('event_id', eventId);
        payload.append('role', values.role);
        payload.append('description', values.description.trim());
        payload.append('contact_method', values.contact_method);
        payload.append('contact', values.contact.trim());
        payload.append('proof', values.proof[0]);

        try {
            await submitEventClaim(payload);
            setDone(true);
        } catch (err) {
            setError('root.server', { message: getApiErrorMessage(err) });
        }
    };

    let body;
    if (status === 'loading') {
        return null;
    } else if (status === 'incomplete') {
        body = <Notice action={<Link to="/complete-profile" className={styles.primaryBtn}>Finish signing up</Link>}>
            Finish setting up your uSync account first, including a host profile, then come back to this page.
        </Notice>;
    } else if (status === 'error') {
        body = <Notice action={<button type="button" onClick={refresh} className={styles.primaryBtn}>Try again</button>}>
            We couldn't load your account. Please try again.
        </Notice>;
    } else if (!isHost) {
        body = <Notice action={<Link to={addProfileUrl('host')} className={styles.primaryBtn}>Make a host account</Link>}>
            Only host accounts can claim events. Make a host account to continue, then come back to this page.
        </Notice>;
    } else if (target.loading) {
        return null;
    } else if (target.error) {
        body = <Notice action={<Link to="/lans" className={styles.primaryBtn}>Browse LANs</Link>}>
            {target.error.response?.status === 404
                ? "We couldn't find this event. Open the event's page and use the \"Claim here\" link at the bottom."
                : getLoadErrorMessage(target.error, "We couldn't load this event. Please try again in a moment.")}
        </Notice>;
    } else if (done || target.data.pending_claim) {
        body = (
            <div className={`${styles.card} ${styles.success}`}>
                <FaCheckCircle className={styles.successIcon} aria-hidden="true" />
                <h2 className={styles.cardTitle}>{done ? 'Claim submitted' : 'Claim under review'}</h2>
                <p className={styles.text}>
                    Our team is reviewing your proof for <strong>{target.data.name}</strong>. We'll be in touch once it's
                    approved, and the event will then show up as yours.
                </p>
                <Link to={eventPath} className={styles.primaryBtn}>Back to the event</Link>
            </div>
        );
    } else if (target.data.owned) {
        body = <Notice action={<Link to="/more/contactus" className={styles.primaryBtn}>Contact us</Link>}>
            <strong>{target.data.name}</strong> already has an owner on uSync. If you think that's wrong, get in touch.
        </Notice>;
    } else {
        const method = CONTACT_METHODS[contactMethod] ?? CONTACT_METHODS.email;
        body = (
            <FormProvider {...methods}>
                <form className={styles.card} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className={styles.eventBox}>
                        <span className={styles.eventLabel}>{TYPE_LABELS[target.data.event_type] ?? 'Event'}</span>
                        <Link to={eventPath} className={styles.eventName}>{target.data.name}</Link>
                    </div>

                    <p className={styles.text}>
                        To claim this event, show us that you run it. Upload a picture that proves it - for example a screenshot
                        of the event's admin dashboard, a booking confirmation, or a photo of you at the event with your staff
                        badge - and explain how it connects you to the event.
                    </p>

                    <FormSelectInput id="claim-role" name="role" label="Your role at this event" placeholder="Choose your role"
                        options={ROLES} required />

                    <div className={styles.field}>
                        <span className={styles.label}>Proof picture</span>
                        <label htmlFor="claim-proof" className={`${styles.dropzone} ${preview ? styles.dropzoneFilled : ''}`}>
                            {preview
                                ? <img src={preview} alt="Your proof upload" className={styles.previewImg} />
                                : <><FaImage className={styles.dropIcon} aria-hidden="true" /><span>Click to upload a picture</span><span className={styles.hint}>{IMAGE_TYPES_LABEL}</span></>}
                        </label>
                        <input id="claim-proof" type="file" accept={ACCEPTED_IMAGE_TYPES.join(',')} className={styles.fileInput}
                            {...register('proof', { required: 'Upload a picture that proves you run this event', validate: imageFileRules })} />
                        {proof && <p className={styles.hint}>{proof.name} · <label htmlFor="claim-proof" className={styles.changeLink}>Change</label></p>}
                        {errors.proof && <p className={styles.error}>{errors.proof.message}</p>}
                    </div>

                    <FormTextArea id="claim-description" name="description" label="How does this prove you own the event?"
                        maxLength={MAX_DESCRIPTION} required
                        placeholder="e.g. This is the organizer dashboard for our LAN - my name is shown as the event owner at the top."
                        rules={{ validate: (v) => v.trim().length >= MIN_DESCRIPTION || `Tell us a bit more (at least ${MIN_DESCRIPTION} characters)` }} />

                    <div className={styles.contactRow}>
                        <FormSelectInput id="claim-contact-method" name="contact_method" label="Contact method"
                            options={CONTACT_OPTIONS} required />
                        <FormTextInput id="claim-contact" name="contact" label="How should we contact you about this claim?"
                            type={contactMethod === 'email' ? 'email' : 'text'} placeholder={method.placeholder} required
                            rules={{ validate: (v) => method.pattern.test(v.trim()) || method.error }} />
                    </div>

                    <label className={styles.checkRow}>
                        <input type="checkbox" {...register('confirmed', { required: 'Please confirm this is your event' })} />
                        I confirm I run this event and the information I've given is true.
                    </label>
                    {errors.confirmed && <p className={styles.error}>{errors.confirmed.message}</p>}

                    {errors.root?.server && <p className={styles.error}>{errors.root.server.message}</p>}

                    <div className={styles.actions}>
                        <Link to={eventPath} className={styles.ghostBtn}>Cancel</Link>
                        <button type="submit" className={styles.primaryBtn} disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit claim'}
                        </button>
                    </div>
                </form>
            </FormProvider>
        );
    }

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>uSync | Claim an Event</title>
            <meta name="robots" content="noindex, nofollow" />

            <div className={styles.inner}>
                <p className={styles.eyebrow}>Host tools</p>
                <h1 className={styles.title}>Claim this event</h1>
                {body}
            </div>
        </div>
    );
};
