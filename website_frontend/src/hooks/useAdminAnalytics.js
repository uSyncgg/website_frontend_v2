import { useEffect, useState } from "react";
import { getAdminAnalytics, getAdminEvents } from "services/adminAnalytics";

// Loads one admin read (fetcher) for the signed-in admin's token.
function useAdminRead(fetcher, token) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetcher(token)
            .then(res => { if (!cancelled) { setData(res); setError(null); } })
            .catch(err => { if (!cancelled) setError(err); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [fetcher, token]);

    return { data, loading, error };
}

export const useAdminAnalytics = (token) => useAdminRead(getAdminAnalytics, token);
export const useAdminEvents = (token) => useAdminRead(getAdminEvents, token);
