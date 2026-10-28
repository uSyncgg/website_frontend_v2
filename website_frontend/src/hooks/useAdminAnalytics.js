import { useEffect, useState } from "react";
import { getAdminAnalytics } from "services/adminAnalytics";

export function useAdminAnalytics(token) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getAdminAnalytics(token)
            .then(res => { if (!cancelled) { setData(res); setError(null); } })
            .catch(err => { if (!cancelled) setError(err); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [token]);

    return { data, loading, error };
}
