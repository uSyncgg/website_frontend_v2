// Every view a profile can have, in toggle order. The first available one is
// the default. To add a view, add an entry here and its content in Profile.js.
// `roles` is the profile's other_roles as a Set.
export const PROFILE_VIEWS = [
    { key: 'player', label: 'Player', isAvailable: (profile) => profile.is_player },
    { key: 'host', label: 'Host', isAvailable: (profile) => profile.is_host },
    { key: 'venue', label: 'Venue', isAvailable: (profile, roles) => roles.has('Venue') },
];

// Picks the views this profile has and which one to show. A requested view the
// profile doesn't have falls back to the default; `active` is null when the
// profile has no views at all.
export function resolveViews(profile, requested) {
    const roles = new Set(profile.other_roles ?? []);
    const views = PROFILE_VIEWS.filter(view => view.isAvailable(profile, roles));
    const active = views.find(view => view.key === requested)?.key ?? views[0]?.key ?? null;
    return { views, active };
}
