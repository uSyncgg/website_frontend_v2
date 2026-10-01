import apiClient from "./apiClient";

export const submitSignUpForm = (payload, token) =>
    apiClient.post(`/users/register`, payload, {
        headers: { Authorization: `Bearer ${token}`},
    }).then(res => res.data);
