// Profile types in display order. An account has at most one profile of each.
export const PROFILE_TYPES = ['player', 'host', 'venue'];

export const PROFILE_LABELS = { player: 'Player', host: 'Host', venue: 'Venue' };

// Sign-up and add-a-profile give each profile type its own username form field.
export const usernameField = (type) => `username_${type}`;

// ...and its own photo and bio fields. `copyPictureField`/`copyBioField` are the "same as my
// default profile" checkboxes.
export const pictureField = (type) => `profile_picture_${type}`;
export const bioField = (type) => `bio_${type}`;
export const copyPictureField = (type) => `copy_picture_${type}`;
export const copyBioField = (type) => `copy_bio_${type}`;
export const bracketField = (type) => `bracket_hosting_${type}`;
// The profile's linked accounts on sign-up/add-a-profile: { platform: typed value }.
export const linksField = (type) => `links_${type}`;

// Public profile link. The public_id finds the profile; the username is only there so the
// URL reads well, and the page fixes it up if the profile has been renamed since.
export const profileUrl = (profile) =>
    `/profile/${encodeURIComponent(profile.public_id)}/${encodeURIComponent(profile.username)}`;

// A player's stats page: every linked game, or one game by its slug. Shareable like the profile.
export const statsUrl = (profile, gameSlug) =>
    `${profileUrl(profile)}/stats${gameSlug ? `/${encodeURIComponent(gameSlug)}` : ''}`;

export const settingsUrl = (type) => `/settings/profile/${type}`;

// Host and venue profiles post bracket events, unless they turned bracket hosting off. It's on
// by default, so a profile summary from before /users/me listed bracket_hosting counts as on.
export const canHostBrackets = (profile) => !!profile && profile.type !== 'player' && profile.bracket_hosting !== false;

// Creating a bracket event, posted as the given host or venue profile (by public_id).
export const createEventUrl = (publicId) => `/host/events/new?profile=${encodeURIComponent(publicId)}`;

export const addProfileUrl = (type) => `/settings/profile/add/${type}`;

// Sorts profiles (or anything with a `type`) into PROFILE_TYPES order.
export const byProfileType = (a, b) => PROFILE_TYPES.indexOf(a.type) - PROFILE_TYPES.indexOf(b.type);

// The types the account doesn't have yet, i.e. the ones it can still add.
export const missingProfileTypes = (profiles = []) =>
    PROFILE_TYPES.filter(type => !profiles.some(profile => profile.type === type));
