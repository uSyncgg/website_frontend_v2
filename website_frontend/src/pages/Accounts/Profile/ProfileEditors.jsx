import { useEffect, useRef, useState } from "react";
import { EditModal } from "components/EditModal/EditModal";
import { SelectableFormBlock } from "components/SelectableFormBlock/SelectableFormBlock";
import { GAME_OPTIONS } from "components/MutualSignUpSteps/UserGamesStep";
import { HOST_EVENT_OPTIONS } from "components/HostSignUpSteps/HostEventStep";
import { useAuth, useCurrentUser } from "hooks";
import { changeUsername, checkUsername, getProfileSettings, updateProfilePicture, updateProfileSettings } from "services/user";
import { ImageCropModal } from "components/FormPFPUpload/ImageCropModal";
import { getApiErrorMessage } from "utils/apiError";
import styles from "./ProfileEditors.module.css";

// Owner-only editors for the profile page (username, About, Games, Locations). The settings
// ones save through the same PATCH /users/me/profiles/{type} as profile settings (which only
// works for the signed in owner), and hand the profile's new settings to `onSaved`.

const useSave = (type, onSaved) => {
    const { session } = useAuth();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const save = async (changes) => {
        setSaving(true);
        setError(null);
        try {
            onSaved(await updateProfileSettings(type, changes, session?.access_token));
        } catch (err) {
            setError(getApiErrorMessage(err));
            setSaving(false);
        }
    };

    return { save, saving, error, token: session?.access_token };
};

const toggleIn = (list, value) => (list.includes(value) ? list.filter(v => v !== value) : [...list, value]);

// Each profile type has its own About (the bio is per profile), so the editor speaks to that type.
const ABOUT_COPY = {
    player: { title: 'About the player', hint: 'Shown on your player profile.', placeholder: 'Your role, your main games, what you compete in...' },
    host: { title: 'About the host', hint: 'Shown on your host profile, with the kinds of events you run.', placeholder: 'Who you are, what events you run, where...' },
    venue: { title: 'About the venue', hint: 'Shown on your venue profile.', placeholder: 'Your space, setups, capacity, what you host...' },
    org: { title: 'About the organization', hint: 'Shown on your organization profile.', placeholder: 'Who you are, the games you compete in, your achievements...' },
};

// A host's About also picks which kinds of events it shows (its event_types).
export const EditAboutModal = ({ profile, onClose, onSaved }) => {
    const [bio, setBio] = useState(profile.bio ?? '');
    const [eventTypes, setEventTypes] = useState(profile.details?.event_types ?? []);
    const { save, saving, error } = useSave(profile.type, onSaved);
    const isHost = profile.type === 'host';
    const copy = ABOUT_COPY[profile.type];

    const submit = () => save(isHost
        ? { bio: bio.trim() || null, details: { event_types: eventTypes } }
        : { bio: bio.trim() || null });

    return (
        <EditModal
            title={copy.title}
            hint={copy.hint}
            onClose={onClose}
            onSubmit={submit}
            saving={saving}
            error={error}
        >
            <textarea
                className={styles.textarea}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={6}
                placeholder={copy.placeholder}
                autoFocus
            />
            {isHost &&
                <>
                    <p className={styles.label}>Events you run</p>
                    <div className={styles.tiles}>
                        {HOST_EVENT_OPTIONS.map(opt => (
                            <SelectableFormBlock
                                key={opt.value}
                                title={opt.title}
                                selected={eventTypes.includes(opt.value)}
                                onToggle={() => setEventTypes(list => toggleIn(list, opt.value))}
                                blockClassName={styles.tile}
                                selectedClassName={styles.tileSelected}
                            />
                        ))}
                    </div>
                </>
            }
        </EditModal>
    );
};

// Players list the games they play (`interests`), hosts the games they host (`hosted_games`);
// either can add one that isn't listed under "Other".
const GAME_FIELDS = {
    player: { list: 'interests', other: 'other_games', title: 'Games', hint: 'The games you play.' },
    host: { list: 'hosted_games', other: 'other_hosted_games', title: 'Hosted games', hint: 'The games you host events for.' },
    org: { list: 'games', other: 'other_games', title: 'Team titles', hint: 'The games your teams compete in.' },
};

export const EditGamesModal = ({ profile, onClose, onSaved }) => {
    const fields = GAME_FIELDS[profile.type];
    const { save, saving, error, token } = useSave(profile.type, onSaved);
    // The public profile leaves out "Other" and its text, so the current picks come from settings.
    const [selected, setSelected] = useState(null);
    const [other, setOther] = useState('');
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!token) return;
        getProfileSettings(profile.type, token)
            .then(settings => {
                setSelected(settings.details?.[fields.list] ?? []);
                setOther(settings.details?.[fields.other] ?? '');
            })
            .catch(err => setLoadError(getApiErrorMessage(err)));
    }, [profile.type, token, fields]);

    const submit = () => {
        if (!selected) return;
        const otherText = selected.includes('Other') ? other.trim() || null : null;
        save({ details: { [fields.list]: selected, [fields.other]: otherText } });
    };

    return (
        <EditModal
            title={fields.title}
            hint={fields.hint}
            onClose={onClose}
            onSubmit={submit}
            saving={saving}
            disabled={!selected}
            error={error ?? loadError}
        >
            {selected &&
                <>
                    <div className={styles.tiles}>
                        {GAME_OPTIONS.map(opt => (
                            <SelectableFormBlock
                                key={opt.value}
                                image={opt.image}
                                title={opt.title}
                                selected={selected.includes(opt.value)}
                                onToggle={() => setSelected(current => toggleIn(current, opt.value))}
                                blockClassName={styles.tile}
                                selectedClassName={styles.tileSelected}
                            />
                        ))}
                    </div>
                    {selected.includes('Other') &&
                        <input
                            className={styles.input}
                            value={other}
                            onChange={(e) => setOther(e.target.value)}
                            placeholder="Other: which game? e.g. Apex Legends"
                        />
                    }
                </>
            }
        </EditModal>
    );
};

const EMPTY_LOCATION = { name: '', location: '' };

// A venue's locations: add, change or remove them. Saved as the whole list, so the profile's
// location count follows.
export const EditLocationsModal = ({ profile, onClose, onSaved }) => {
    const [rows, setRows] = useState(() => (profile.details?.locations?.length ? profile.details.locations : [EMPTY_LOCATION]));
    const { save, saving, error } = useSave(profile.type, onSaved);
    const [missing, setMissing] = useState(false);

    const update = (i, key, value) => setRows(list => list.map((row, j) => (j === i ? { ...row, [key]: value } : row)));

    const submit = () => {
        const filled = rows
            .map(r => ({ name: r.name.trim(), location: r.location.trim() }))
            .filter(r => r.name || r.location);
        if (filled.length === 0 || filled.some(r => !r.name || !r.location)) {
            setMissing(true);
            return;
        }
        setMissing(false);
        save({ details: { locations: filled } });
    };

    return (
        <EditModal
            title="Locations"
            hint="Each place your venue runs from: its name and where it is."
            onClose={onClose}
            onSubmit={submit}
            saving={saving}
            error={error ?? (missing ? 'Every location needs a name and where it is, and you need at least one.' : null)}
        >
            {rows.map((row, i) => (
                <div key={i} className={styles.locationRow}>
                    <input className={styles.input} value={row.name} onChange={(e) => update(i, 'name', e.target.value)} placeholder="Name, e.g. uSync Arena" aria-label={`Location ${i + 1} name`} />
                    <input className={styles.input} value={row.location} onChange={(e) => update(i, 'location', e.target.value)} placeholder="City, State" aria-label={`Location ${i + 1} place`} />
                    <button type="button" className={styles.remove} onClick={() => setRows(list => list.filter((_, j) => j !== i))} disabled={rows.length === 1} aria-label={`Remove location ${i + 1}`}>×</button>
                </div>
            ))}
            <button type="button" className={styles.add} onClick={() => setRows(list => [...list, EMPTY_LOCATION])}>+ Add location</button>
        </EditModal>
    );
};

// Same rough check as profile settings: only skip asking about the user's own current name.
const sameName = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();
const CHECK_DELAY_MS = 450;

const usernameProblem = (err, name) => {
    if (err.response?.status === 409) return `${name} is already taken.`;
    const detail = err.response?.data?.detail;
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg.replace(/^Value error, /, '');
    return getApiErrorMessage(err);
};

// Renames the profile. The name is checked as they type (it only has to be unique among
// profiles of the same type) and again by the backend when saved. `onRenamed` gets the new settings.
export const EditUsernameModal = ({ profile, onClose, onRenamed }) => {
    const { session } = useAuth();
    const { refresh } = useCurrentUser();
    const [username, setUsername] = useState(profile.username);
    // null (nothing to check), 'checking', or { ok, message }.
    const [status, setStatus] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const trimmed = username.trim();
    const changed = trimmed !== '' && trimmed !== profile.username;
    const blocked = !changed || status === 'checking' || status?.ok === false;

    useEffect(() => {
        if (!trimmed || sameName(trimmed, profile.username)) {
            setStatus(null);
            return;
        }
        let stale = false;
        setStatus('checking');
        const timer = setTimeout(async () => {
            try {
                await checkUsername(trimmed, profile.type);
                if (!stale) setStatus({ ok: true });
            } catch (err) {
                if (!stale) setStatus({ ok: false, message: usernameProblem(err, trimmed) });
            }
        }, CHECK_DELAY_MS);
        return () => {
            stale = true;
            clearTimeout(timer);
        };
    }, [trimmed, profile.username, profile.type]);

    const submit = async () => {
        if (blocked) return;
        setSaving(true);
        setError(null);
        try {
            const saved = await changeUsername(profile.type, trimmed, session?.access_token);
            // Updates the navbar's profile link too.
            await refresh();
            onRenamed(saved);
        } catch (err) {
            setError(usernameProblem(err, trimmed));
            setSaving(false);
        }
    };

    return (
        <EditModal
            title="Username"
            hint="Only has to be unique among other profiles of the same kind."
            onClose={onClose}
            onSubmit={submit}
            saving={saving}
            disabled={blocked}
            error={error}
        >
            <input className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} autoFocus aria-label="Username" />
            {status === 'checking' && <p className={styles.status}>Checking…</p>}
            {status?.ok && <p className={`${styles.status} ${styles.ok}`}>{trimmed} is available.</p>}
            {status?.ok === false && <p className={`${styles.status} ${styles.bad}`}>{status.message}</p>}
        </EditModal>
    );
};

const PICTURE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PICTURE_MAX_BYTES = 5 * 1024 * 1024;

// The owner's profile picture change: pick an image, crop it (same cropper as sign-up), upload.
// Returns `open` (starts it: opens the file picker) and `element` (the hidden input, the
// cropper and any error, to render somewhere on the page). `onSaved` gets the new settings.
export const usePictureEditor = (profile, onSaved) => {
    const { session } = useAuth();
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const pick = (e) => {
        const picked = e.target.files?.[0];
        e.target.value = '';
        if (!picked) return;
        if (!PICTURE_TYPES.includes(picked.type)) return setError('Pick a JPG, PNG or WEBP image.');
        if (picked.size > PICTURE_MAX_BYTES) return setError('Pick an image that is 5MB or smaller.');
        setError(null);
        setFile(picked);
    };

    const upload = async (cropped) => {
        setFile(null);
        setUploading(true);
        try {
            const payload = new FormData();
            payload.append('profile_picture', cropped);
            onSaved(await updateProfilePicture(profile.type, payload, session?.access_token));
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setUploading(false);
        }
    };

    const element = (
        <>
            <input ref={inputRef} type="file" accept={PICTURE_TYPES.join(',')} hidden onChange={pick} />
            {file &&
                <ImageCropModal
                    file={file}
                    onCancel={() => setFile(null)}
                    onApply={upload}
                    onError={() => { setFile(null); setError("That image couldn't be cropped. Try another one."); }}
                />
            }
            {(uploading || error) &&
                <p className={`${styles.pictureStatus} ${error ? styles.bad : ''}`} role={error ? 'alert' : 'status'}>
                    {uploading ? 'Uploading your picture…' : error}
                </p>
            }
        </>
    );

    return { open: () => inputRef.current?.click(), element };
};
