// Converts between the wizards' flat form fields and the backend's profile shape:
// { type, username, picture, bio, bracket_hosting, other_roles, other_role_detail, details: {...} }.
// Used by sign-up, adding a profile and profile settings, so all three send the same thing.

import { PROFILE_TYPES, bioField, bracketField, copyBioField, copyPictureField, pictureField, usernameField } from "./profiles";

// Fields stored on the profile itself (shared by every type).
const PROFILE_FIELDS = ['bio', 'bracket_hosting', 'other_roles', 'other_role_detail'];

// Fields stored in `details`, per type. The form's `venues` is sent as `details.locations`.
// Game account IDs (battlenet, steam, ...) aren't collected yet - linking is "coming soon".
const DETAIL_FIELDS = {
    player: ['first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'country', 'interests', 'other_games'],
    host: ['organization', 'host_country', 'hosted_games', 'other_hosted_games', 'event_types'],
    venue: ['venues'],
    // Org games get their own form fields so they don't collide with a player profile's games
    // when both are created at sign-up. The org's name is its username, so it isn't here.
    org: ['org_country', 'org_games', 'other_org_games', 'website', 'contact_email'],
};

const DETAIL_KEY = { venues: 'locations', org_games: 'games', other_org_games: 'other_games' };

// Optional text columns: a cleared input is saved as null rather than "" (date_of_birth is a
// DATE, so "" would be rejected).
const NULLABLE_FIELDS = new Set(['bio', 'other_role_detail', 'phone_number', 'gender', 'date_of_birth', 'country', 'other_games', 'other_hosted_games', 'other_org_games', 'website', 'contact_email']);

const EMPTY_VENUE = { name: '', location: '' };

export function toApiValue(field, value) {
    if (field === 'bracket_hosting') return value === 'yes';
    // Blank venue rows (like the default empty one) aren't real venues.
    if (field === 'venues') {
        return (value ?? [])
            .map(v => ({ name: v.name.trim(), location: v.location.trim() }))
            .filter(v => v.name && v.location);
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (NULLABLE_FIELDS.has(field) && trimmed === '') return null;
        return trimmed;
    }
    return value;
}

// `details` for one profile type from the form values. Only fields that have a value are
// included, so the backend's own defaults apply to the rest.
function detailsFor(type, values) {
    const details = {};
    for (const field of DETAIL_FIELDS[type]) {
        if (values[field] === undefined) continue;
        details[DETAIL_KEY[field] ?? field] = toApiValue(field, values[field]);
    }
    return details;
}

// One profile entry for POST /register or POST /me/profiles.
// - picture: "upload", "copy_default" or null (see the backend's ProfileBase).
// - bio: the bio text to save (already resolved from "same as my default").
// - includeOtherRoles: the Get Started step's "Other" sub-roles; only sign-up asks for them.
export function buildProfileEntry(type, values, { picture = null, bio = '', includeOtherRoles = false } = {}) {
    const entry = {
        type,
        username: values[usernameField(type)].trim(),
        picture,
        bio: toApiValue('bio', bio ?? ''),
        details: detailsFor(type, values),
    };

    // Asked per profile. Left unanswered, the backend defaults it to on.
    if (values[bracketField(type)] !== undefined) {
        entry.bracket_hosting = toApiValue('bracket_hosting', values[bracketField(type)]);
    }

    if (includeOtherRoles && (values.signup_path ?? []).includes('other')) {
        const roles = values.other_roles ?? [];
        entry.other_roles = roles;
        if (roles.includes('Other')) {
            entry.other_role_detail = toApiValue('other_role_detail', values.other_role_detail ?? '');
        }
    }

    return entry;
}

const pickedFile = (values, type) => values[pictureField(type)]?.[0] ?? null;

// Where one non-default profile's photo comes from. "Same as my default" wins over a file
// picked earlier, but only when the default actually has a photo to copy.
function otherPicture(values, type, defaultHasPicture) {
    if (values[copyPictureField(type)] && defaultHasPicture) return { picture: 'copy_default', file: null };
    const file = pickedFile(values, type);
    return file ? { picture: 'upload', file } : { picture: null, file: null };
}

// Sign-up's multipart body. Every profile has its own photo and bio; a profile other than the
// default can reuse the default's instead (the photo as a server-side copy, the bio as text).
// Returns { data, files }: `data` is the JSON for the `data` field, `files` maps field name -> File.
export function buildSignUpRequest(values) {
    const types = PROFILE_TYPES.filter(type => (values.signup_path ?? []).includes(type));
    const defaultProfile = types.includes(values.default_profile) ? values.default_profile : types[0];
    const defaultFile = pickedFile(values, defaultProfile);
    const defaultBio = values[bioField(defaultProfile)] ?? '';
    const files = {};

    const profiles = types.map(type => {
        let picture;
        if (type === defaultProfile) {
            picture = defaultFile ? 'upload' : null;
            if (defaultFile) files[`profile_picture_${type}`] = defaultFile;
        } else {
            const chosen = otherPicture(values, type, !!defaultFile);
            picture = chosen.picture;
            if (chosen.file) files[`profile_picture_${type}`] = chosen.file;
        }

        const bio = type !== defaultProfile && values[copyBioField(type)] ? defaultBio : values[bioField(type)];
        return buildProfileEntry(type, values, { picture, bio, includeOtherRoles: true });
    });

    return { data: { default_profile: defaultProfile, profiles }, files };
}

// POST /me/profiles: one profile. "Same as my default" copies the account's default profile's
// photo (server-side) or bio (`default_bio`, read from its public profile).
// defaultHasPicture: whether the default profile has a photo to copy.
export function buildAddProfileRequest(type, values, { defaultHasPicture = false } = {}) {
    const { picture, file } = otherPicture(values, type, defaultHasPicture);
    const bio = values[copyBioField(type)] ? values.default_bio : values[bioField(type)];

    return {
        data: buildProfileEntry(type, values, { picture, bio }),
        files: file ? { profile_picture: file } : {},
    };
}

// The FormData both multipart endpoints take.
export function toFormData({ data, files }) {
    const payload = new FormData();
    payload.append('data', JSON.stringify(data));
    for (const [name, file] of Object.entries(files)) {
        payload.append(name, file);
    }
    return payload;
}

// GET /me/profiles/{type} -> the settings form's values.
export function toFormValues(settings) {
    const text = (value) => value ?? '';
    const details = settings.details ?? {};
    const isOrg = settings.type === 'org';

    return {
        username: settings.username,
        bio: text(settings.bio),
        bracket_hosting: settings.bracket_hosting ? 'yes' : 'no',
        other_roles: settings.other_roles ?? [],
        other_role_detail: text(settings.other_role_detail),

        first_name: text(details.first_name),
        last_name: text(details.last_name),
        phone_number: text(details.phone_number),
        gender: text(details.gender),
        date_of_birth: text(details.date_of_birth),
        country: text(details.country),
        interests: details.interests ?? [],
        other_games: isOrg ? '' : text(details.other_games),

        organization: text(details.organization),
        host_country: text(details.host_country),
        hosted_games: details.hosted_games ?? [],
        other_hosted_games: text(details.other_hosted_games),
        event_types: details.event_types ?? [],

        org_country: text(details.org_country),
        org_games: isOrg ? details.games ?? [] : [],
        other_org_games: isOrg ? text(details.other_games) : '',
        website: text(details.website),
        contact_email: text(details.contact_email),

        venues: details.locations?.length > 0
            ? details.locations.map(v => ({ name: v.name, location: v.location }))
            : [EMPTY_VENUE],
    };
}

// PATCH /me/profiles/{type} body for the changed fields. Fields that don't belong to this
// profile type are dropped. Returns null when there's nothing to send.
export function buildProfileUpdate(type, changedFields, values) {
    const update = {};
    const details = {};

    for (const field of changedFields) {
        if (PROFILE_FIELDS.includes(field)) {
            update[field] = toApiValue(field, values[field]);
        } else if (DETAIL_FIELDS[type].includes(field)) {
            details[DETAIL_KEY[field] ?? field] = toApiValue(field, values[field]);
        }
    }

    if (Object.keys(details).length > 0) update.details = details;
    return Object.keys(update).length > 0 ? update : null;
}
