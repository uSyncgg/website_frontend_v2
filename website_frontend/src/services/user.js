import apiClient from "./apiClient";

export const submitSignUpForm = (payload, token) =>
    apiClient.post(`/users/register`, payload, {
        headers: { Authorization: `Bearer ${token}`},
    }).then(res => res.data);

export const checkUsername = (username, {isPlayer, isHost} = {}) =>
    apiClient.get(`/users/check/${encodeURIComponent(username)}`, {
        params: { player: isPlayer, host: isHost }
    }).then(res => res.data);

export const getProfile = (username) =>
    apiClient.get(`/users/fetch/${encodeURIComponent(username)}/profile`)
        .then(res => res.data);

export const getMe = (token) =>
    apiClient.get(`/users/me`, {
        headers: { Authorization: `Bearer ${token}`},
    }).then(res => res.data);

// Profile settings — every call needs the logged-in user's Bearer token.
const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const getSettings = (token) =>
    apiClient.get(`/users/me/settings`, authHeader(token))
        .then(res => res.data);

// Each section of the profile lives in its own table, so each has its own PATCH.
// `changes` holds only the fields being saved, e.g. { bio: "..." }. Each returns the full settings.
export const updateUserSettings = (changes, token) =>
    apiClient.patch(`/users/me/user`, changes, authHeader(token))
        .then(res => res.data);

export const updatePlayerSettings = (changes, token) =>
    apiClient.patch(`/users/me/player`, changes, authHeader(token))
        .then(res => res.data);

export const updateHostSettings = (changes, token) =>
    apiClient.patch(`/users/me/host`, changes, authHeader(token))
        .then(res => res.data);

// `payload` is a FormData with a `profile_picture` file, same as sign-up.
export const updateProfilePicture = (payload, token) =>
    apiClient.put(`/users/me/profile-picture`, payload, authHeader(token))
        .then(res => res.data);

export const changeUsername = (username, token) =>
    apiClient.patch(`/users/me/username`, { username }, authHeader(token))
        .then(res => res.data);

export const deleteAccount = (token) =>
    apiClient.delete(`/users/me`, authHeader(token))
        .then(res => res.data);

// Adds the host role to a signed-in account (e.g. a player becoming a host too).
// `payload` is { username, host: { hosted_games, other_hosted_games, organization, host_country, event_types } }.
// `username` is the name to host under - their current one, or a new one that then applies everywhere.
export const becomeHost = (payload, token) =>
    apiClient.post(`/users/me/host`, payload, authHeader(token))
        .then(res => res.data);

// Adds the player role to a signed-in account (e.g. a host or venue who also competes).
// `payload` is { username, player: { first_name, last_name, phone_number, gender, date_of_birth, country, interests, other_games } }.
export const becomePlayer = (payload, token) =>
    apiClient.post(`/users/me/player`, payload, authHeader(token))
        .then(res => res.data);
