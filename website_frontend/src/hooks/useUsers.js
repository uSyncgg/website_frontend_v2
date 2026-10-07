import { getProfile } from "services/user";
import { useAsync } from "./useEvents";

export function useProfile(username) {
    return useAsync(() => getProfile(username), [username]);
}
