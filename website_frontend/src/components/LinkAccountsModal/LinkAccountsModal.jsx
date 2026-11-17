import { useState } from 'react';
import { useAuth } from 'hooks';
import { updateProfileSettings } from 'services/user';
import { getApiErrorMessage } from 'utils/apiError';
import { EditModal } from 'components/EditModal/EditModal';
import { LinkFields, linkPreview } from 'components/LinkFields/LinkFields';
import { linkChanges, platformsFor } from 'utils/linkedPlatforms';
import { PROFILE_LABELS } from 'utils/profiles';

const startValues = (profile) => Object.fromEntries(platformsFor(profile.type).map(p => [p.key, profile.links?.[p.key] ?? '']));

/**
 * Lets the owner link, change and remove the accounts shown on one of their profiles. Each
 * profile type has its own set of platforms (see utils/linkedPlatforms). `onSaved` gets the
 * profile's new settings.
 */
export const LinkAccountsModal = ({ profile, onClose, onSaved }) => {
    const { session } = useAuth();
    const [values, setValues] = useState(() => startValues(profile));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // A field that won't save (e.g. a link pasted where a username goes) blocks the save rather
    // than being dropped quietly.
    const invalid = platformsFor(profile.type)
        .filter(p => linkPreview(p, values[p.key])?.startsWith('Not a valid'))
        .map(p => p.label);

    const save = async () => {
        if (invalid.length > 0) {
            setError(`Fix ${invalid.join(', ')} before saving.`);
            return;
        }
        setSaving(true);
        setError(null);
        try {
            onSaved(await updateProfileSettings(profile.type, { links: linkChanges(profile, values) }, session?.access_token));
        } catch (err) {
            setError(getApiErrorMessage(err));
            setSaving(false);
        }
    };

    return (
        <EditModal
            title="Linked accounts"
            hint={`Shown on your ${PROFILE_LABELS[profile.type].toLowerCase()} profile. Leave a field blank to unlink it.`}
            onClose={onClose}
            onSubmit={save}
            saving={saving}
            error={error}
        >
            <LinkFields
                type={profile.type}
                values={values}
                onChange={(key, value) => setValues(v => ({ ...v, [key]: value }))}
            />
        </EditModal>
    );
};
