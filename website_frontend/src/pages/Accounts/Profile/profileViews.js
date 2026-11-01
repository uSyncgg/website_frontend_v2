import { PROFILE_LABELS, byProfileType, profileUrl } from "utils/profiles";

// Each profile is its own page; the toggle switches between the account's profiles.
// Views come from the profile being shown plus `others` (the same account's other
// profiles), in player/host/venue order. `active` is the shown profile's type.
export function resolveViews(profile) {
    const views = [profile, ...(profile.others ?? [])]
        .sort(byProfileType)
        .map(p => ({ key: p.type, label: PROFILE_LABELS[p.type], path: profileUrl(p) }));
    return { views, active: profile.type };
}
