import { getProfile, getSettings } from "services/user";
import { useAsync } from "./useEvents";

export function useProfile(username) {
    return useAsync(() => getProfile(username), [username]);
}

export function useSettings(token) {
    

    return useAsync(
        () => {
            if (!token) {
                return Promise.resolve(null);
            } else {
                return getSettings(token);
            } 
        }, [token]);
}
