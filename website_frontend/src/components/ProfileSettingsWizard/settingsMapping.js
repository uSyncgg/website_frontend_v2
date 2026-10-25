// Converts between GET /users/me/settings and the sign-up form's field shapes,
// and routes changed fields to the PATCH endpoint for the table that stores them.

// Which PATCH endpoint (table) owns each form field. profile_picture has its own endpoint.
const SECTION_FIELDS = {
    user: ['bio', 'bracket_hosting', 'other_roles', 'other_role_detail', 'venues'],
    player: ['first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'country', 'interests', 'other_games'],
    host: ['organization', 'host_country', 'hosted_games', 'other_hosted_games', 'event_types'],
};

const FIELD_SECTION = Object.fromEntries(
    Object.entries(SECTION_FIELDS).flatMap(([section, fields]) => fields.map(field => [field, section]))
);

// Optional columns: a cleared input is saved as null rather than "" (date_of_birth is a DATE, so "" would be rejected).
const NULLABLE_FIELDS = new Set(['bio', 'other_role_detail', 'phone_number', 'gender', 'date_of_birth', 'country', 'other_games', 'other_hosted_games']);

const EMPTY_VENUE = { name: '', location: '' };

export function toFormValues(settings) {
    const text = (value) => value ?? '';

    return {
        // The path is locked in settings - it's only rebuilt so buildStepSequence picks the right steps.
        signup_path: [
            ...(settings.is_player ? ['player'] : []),
            ...(settings.is_host ? ['host'] : []),
            ...(settings.other_roles.length > 0 ? ['other'] : []),
        ],
        username: settings.username,
        bio: text(settings.bio),
        bracket_hosting: settings.bracket_hosting ? 'yes' : 'no',
        other_roles: settings.other_roles,
        other_role_detail: text(settings.other_role_detail),
        venues: settings.venues.length > 0
            ? settings.venues.map(v => ({ name: v.name, location: v.location }))
            : [EMPTY_VENUE],

        first_name: text(settings.first_name),
        last_name: text(settings.last_name),
        phone_number: text(settings.phone_number),
        gender: text(settings.gender),
        date_of_birth: text(settings.date_of_birth),
        country: text(settings.country),
        interests: settings.interests,
        other_games: text(settings.other_games),

        organization: text(settings.organization),
        host_country: text(settings.host_country),
        hosted_games: settings.hosted_games,
        other_hosted_games: text(settings.other_hosted_games),
        event_types: settings.event_types,
    };
}

function toApiValue(field, value) {
    if (field === 'bracket_hosting') return value === 'yes';
    // Blank venue rows (like the default empty one) aren't real venues.
    if (field === 'venues') {
        return value
            .map(v => ({ name: v.name.trim(), location: v.location.trim() }))
            .filter(v => v.name && v.location);
    }
    if (NULLABLE_FIELDS.has(field) && typeof value === 'string' && value.trim() === '') return null;
    return value;
}

// Groups changed fields by endpoint: { user: {...}, player: {...} }. Sections with no changes are left out.
export function buildPayloads(changedFields, values) {
    const payloads = {};

    for (const field of changedFields) {
        const section = FIELD_SECTION[field];
        if (!section) continue;
        payloads[section] = { ...payloads[section], [field]: toApiValue(field, values[field]) };
    }

    return payloads;
}

export const sectionFields = (section) => SECTION_FIELDS[section];
