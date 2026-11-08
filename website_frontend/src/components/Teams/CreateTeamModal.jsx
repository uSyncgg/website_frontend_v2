import { useEffect, useRef, useState } from "react";
import { EditModal } from "components/EditModal/EditModal";
import { GAME_OPTIONS } from "components/MutualSignUpSteps/UserGamesStep";
import { useAuth, useCurrentUser } from "hooks";
import { getApiErrorMessage } from "utils/apiError";
import { PROFILE_LABELS, byProfileType } from "utils/profiles";
import { createTeam } from "services/teams";
import { Avatar, PlayerPicker } from "./TeamParts";
import styles from "./Teams.module.css";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

// "Create team": name it, give it an image, pick its game, invite players, then Create.
// The team belongs to one of the account's profiles: `ownerType` fixes it (an org's settings),
// otherwise the user picks when they have more than one (org first, as orgs exist to run teams).
export const CreateTeamModal = ({ onClose, onCreated, ownerType = null }) => {
    const { session } = useAuth();
    const { profiles = [] } = useCurrentUser();
    const owners = [...profiles].sort(byProfileType).sort((a, b) => (b.type === 'org') - (a.type === 'org'));
    const [owner, setOwner] = useState(ownerType ?? owners[0]?.type ?? 'player');
    const [name, setName] = useState('');
    const [game, setGame] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [invites, setInvites] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const fileInput = useRef(null);

    useEffect(() => {
        if (!file) return setPreview(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const pickFile = (e) => {
        const picked = e.target.files?.[0];
        e.target.value = '';
        if (!picked) return;
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(picked.type)) return setError('Use a JPG, PNG or WebP image.');
        if (picked.size > MAX_IMAGE_BYTES) return setError('That image is over 5 MB.');
        setError('');
        setFile(picked);
    };

    const submit = async () => {
        if (name.trim().length < 2) return setError('Give your team a name (at least 2 characters).');
        setSaving(true);
        setError('');
        try {
            const team = await createTeam({
                owner_type: owner,
                name: name.trim(),
                game: game || null,
                invites: invites.map(p => p.username),
                picture: file,
            }, session?.access_token);
            onCreated(team);
        } catch (err) {
            setError(getApiErrorMessage(err));
            setSaving(false);
        }
    };

    return (
        <EditModal
            title="Create a team"
            hint="Name it, give it an image and invite your players. You can change all of this later."
            onClose={onClose}
            onSubmit={submit}
            saving={saving}
            disabled={name.trim().length < 2}
            error={error}
            submitLabel="Create team"
            savingLabel="Creating…"
        >
            <div className={`${styles.field} ${styles.imagePicker}`}>
                <button type="button" className={styles.imageButton} onClick={() => fileInput.current?.click()} aria-label="Choose a team image">
                    <Avatar src={preview} name={name || '+'} size={72} team />
                </button>
                <div>
                    <button type="button" className={styles.linkBtn} onClick={() => fileInput.current?.click()}>{file ? 'Change image' : 'Add a team image'}</button>
                    {file && <> · <button type="button" className={styles.linkBtn} onClick={() => setFile(null)}>Remove</button></>}
                    <p className={styles.hint}>JPG, PNG or WebP, up to 5 MB. Optional.</p>
                </div>
                <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" className={styles.hidden} onChange={pickFile} />
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="team-name">Team name</label>
                <input id="team-name" className={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Night Owls" maxLength={40} autoFocus />
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="team-game">Game</label>
                <select id="team-game" className={styles.input} value={game} onChange={e => setGame(e.target.value)}>
                    <option value="">Any / not set</option>
                    {GAME_OPTIONS.filter(g => g.value !== 'Other').map(g => <option key={g.value} value={g.value}>{g.title}</option>)}
                </select>
            </div>

            {!ownerType && owners.length > 1 &&
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="team-owner">Team for</label>
                    <select id="team-owner" className={styles.input} value={owner} onChange={e => setOwner(e.target.value)}>
                        {owners.map(p => <option key={p.type} value={p.type}>{p.username} ({PROFILE_LABELS[p.type]})</option>)}
                    </select>
                    <p className={styles.hint}>The profile that runs the team and pays its entry fees.</p>
                </div>
            }

            <div className={styles.field}>
                <label className={styles.label} htmlFor="team-invites">Invite players</label>
                <PlayerPicker id="team-invites" selected={invites} onChange={setInvites} />
                <p className={styles.hint}>They'll get an invite and join once they accept.</p>
            </div>
        </EditModal>
    );
};
