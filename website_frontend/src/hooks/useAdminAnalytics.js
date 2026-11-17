import { useEffect, useState } from "react";
import { getAdminAccounts, getAdminAnalytics, getAdminEvents } from "services/adminAnalytics";

// Loads one admin read when the tab opens. The API client attaches a current token to each
// request, so a token refresh doesn't reload the dashboard. Import this file directly rather
// than through hooks/index.js, so it stays in the admin-only download.
function useAdminRead(fetcher) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetcher()
            .then(res => { if (!cancelled) { setData(res); setError(null); } })
            .catch(err => { if (!cancelled) setError(err); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [fetcher]);

    return { data, loading, error };
}

export const useAdminAnalytics = () => useAdminRead(getAdminAnalytics);
export const useAdminEvents = () => useAdminRead(getAdminEvents);
export const useAdminAccounts = () => useAdminRead(getAdminAccounts);
