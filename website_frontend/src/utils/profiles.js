// Profile types in display order. An account has at most one profile of each.
export const PROFILE_TYPES = ['player', 'host', 'venue', 'org'];

export const PROFILE_LABELS = { player: 'Player', host: 'Host', venue: 'Venue', org: 'Organization' };

// Types that can't host brackets (the backend rejects it). Orgs enter events but don't run them.
export const NO_BRACKET_TYPES = ['org'];

// Sign-up and add-a-profile give each profile type its own username form field.
export const usernameField = (type) => `username_${type}`;

// ...and its own photo and bio fields. `copyPictureField`/`copyBioField` are the "same as my
// default profile" checkboxes.
export const pictureField = (type) => `profile_picture_${type}`;
export const bioField = (type) => `bio_${type}`;
export const copyPictureField = (type) => `copy_picture_${type}`;
export const copyBioField = (type) => `copy_bio_${type}`;
export const bracketField = (type) => `bracket_hosting_${type}`;

// Public profile link. The public_id finds the profile; the username is only there so the
// URL reads well, and the page fixes it up if the profile has been renamed since.
export const profileUrl = (profile) =>
    `/profile/${encodeURIComponent(profile.public_id)}/${encodeURIComponent(profile.username)}`;

export const settingsUrl = (type) => `/settings/profile/${type}`;

export const addProfileUrl = (type) => `/settings/profile/add/${type}`;

// Sorts profiles (or anything with a `type`) into PROFILE_TYPES order.
export const byProfileType = (a, b) => PROFILE_TYPES.indexOf(a.type) - PROFILE_TYPES.indexOf(b.type);

// The types the account doesn't have yet, i.e. the ones it can still add.
export const missingProfileTypes = (profiles = []) =>
    PROFILE_TYPES.filter(type => !profiles.some(profile => profile.type === type));
