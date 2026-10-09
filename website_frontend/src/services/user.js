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
