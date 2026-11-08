import axios from 'axios';
import { supabase } from './supabaseClient';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Attach the signed-in user's token to every request that doesn't set its own.
// Public routes (e.g. /events) use it to decide what to include - event details
// are withheld from anonymous viewers on the backend.
apiClient.interceptors.request.use(async (config) => {
    // Optional separate backend for admin reads (e.g. a local backend while the rest of the
    // site keeps using the regular API).
    if (process.env.REACT_APP_ADMIN_API_BASE_URL && config.url?.startsWith('/admin')) {
        config.baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
    }
    if (!config.headers.Authorization) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
});

export default apiClient;
