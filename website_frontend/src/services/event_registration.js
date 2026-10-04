import apiClient from "./apiClient";

export const getEventPasses = ({ path }) =>
    apiClient.get(`/event-registration/event/${encodeURIComponent(path)}/passes`).then(res => res.data);

export const submitEventRegistration = (payload) =>
    apiClient.post(`/event-registration/event-form-submission`, payload).then(res => res.data);

export const createPaymentIntent = ({ registration_id }) =>
    apiClient.post(`/event-registration/${registration_id}/payment-intent`).then(res => res.data);

export const getEventReceipt = ({ registration_id }) =>
    apiClient.get(`/event-registration/${registration_id}/receipt`).then(res => res.data);
