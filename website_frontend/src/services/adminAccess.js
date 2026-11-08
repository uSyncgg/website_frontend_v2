import apiClient from "./apiClient";

// Kept apart from adminAnalytics.js so this small check is all that loads before the backend
// confirms the visitor is an admin. Resolves for admins and rejects with 401/403 for others.
export const checkAdminAccess = () => {
    if (process.env.REACT_APP_ADMIN_ANALYTICS_MOCK === 'true') return Promise.resolve();
    return apiClient.get('/admin/access');
};
