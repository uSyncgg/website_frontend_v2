import apiClient from "./apiClient";

// Every /users/me call needs the logged-in user's Bearer token.
const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

// An account has up to one profile of each type (player, host, venue). Each profile has its
// own username, picture and bio, and `type` is how the /me/profiles/{type} routes pick one.

// `payload` is a FormData: `data` (JSON: { default_profile, profiles: [...] }) plus a
// `profile_picture_<type>` file for each profile whose `picture` is "upload".
export const submitSignUpForm = (payload, token) =>
    apiClient.post(`/users/register`, payload, authHeader(token))
        .then(res => res.data);

// Usernames only have to be unique within a profile type. Resolves when the name is free;
// rejects with a 409 when it's taken or a 422 when it breaks the rules.
export const checkUsername = (username, type) =>
    apiClient.get(`/users/check/${encodeURIComponent(username)}`, { params: { type } })
        .then(res => res.data);

// A public profile, plus `others`: the same account's other profiles, for the view switcher.
export const getProfile = (publicId) =>
    apiClient.get(`/users/profiles/${encodeURIComponent(publicId)}`)
        .then(res => res.data);

// { verified, default_profile, profiles }. 404 means sign-up isn't finished yet.
export const getMe = (token) =>
    apiClient.get(`/users/me`, authHeader(token))
        .then(res => res.data);

// Everything the user can edit on one of their profiles.
export const getProfileSettings = (type, token) =>
    apiClient.get(`/users/me/profiles/${type}`, authHeader(token))
        .then(res => res.data);

// Same FormData shape as sign-up, but `data` is a single profile and the file is `profile_picture`.
export const addProfile = (payload, token) =>
    apiClient.post(`/users/me/profiles`, payload, authHeader(token))
        .then(res => res.data);

// `changes` holds only the fields being saved: { bio, bracket_hosting, other_roles,
// other_role_detail, links, details: {...} }. Returns the profile's full settings.
export const updateProfileSettings = (type, changes, token) =>
    apiClient.patch(`/users/me/profiles/${type}`, changes, authHeader(token))
        .then(res => res.data);

// `payload` is a FormData with a `profile_picture` file. Returns the profile's settings.
export const updateProfilePicture = (type, payload, token) =>
    apiClient.put(`/users/me/profiles/${type}/profile-picture`, payload, authHeader(token))
        .then(res => res.data);

// Returns the profile's settings.
export const changeUsername = (type, username, token) =>
    apiClient.patch(`/users/me/profiles/${type}/username`, { username }, authHeader(token))
        .then(res => res.data);

// Returns the same shape as getMe.
export const setDefaultProfile = (type, token) =>
    apiClient.patch(`/users/me/default-profile`, { type }, authHeader(token))
        .then(res => res.data);

export const deleteAccount = (token) =>
    apiClient.delete(`/users/me`, authHeader(token))
        .then(res => res.data);
