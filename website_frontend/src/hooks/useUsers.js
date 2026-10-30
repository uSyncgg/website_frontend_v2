import { getProfile, getSettings } from "services/user";
import { useAsync } from "./useEvents";

export function useProfile(username) {
    return useAsync(() => getProfile(username), [username]);
}

// reloadKey: change it to fetch the settings again (e.g. after adding a role).
export function useSettings(token, reloadKey = 0) {
    return useAsync(
        () => {
            if (!token) {
                return Promise.resolve(null);
            } else {
                return getSettings(token);
            } 
        }, [token, reloadKey]);
}
