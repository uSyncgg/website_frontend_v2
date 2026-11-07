import { getProfile, getProfileSettings } from "services/user";
import { useAsync } from "./useEvents";

export function useProfile(publicId) {
    return useAsync(() => getProfile(publicId), [publicId]);
}

// One of the signed in user's profiles, by type. Waits (stays loading) until there's a token.
export function useSettings(token, type) {
    return useAsync(() => getProfileSettings(type, token), [token, type], { skip: !token || !type });
}
