import { resolveViews } from "./profileViews";

const profile = { is_player: false, is_host: false, other_roles: null, venues: null };
const keys = ({ views }) => views.map(view => view.key);

test("only the views the profile has are returned, in toggle order", () => {
    expect(keys(resolveViews({ ...profile, is_host: true, other_roles: ["Coach", "Venue"] }))).toEqual(["host", "venue"]);
    expect(keys(resolveViews({ ...profile, is_player: true, other_roles: ["Coach"] }))).toEqual(["player"]);
});

test("the venue view follows the Venue role, not whether venues are listed", () => {
    expect(keys(resolveViews({ ...profile, other_roles: ["Venue"], venues: null }))).toEqual(["venue"]);
    expect(keys(resolveViews({ ...profile, is_player: true, venues: [{ name: "Arena", location: "Austin" }] }))).toEqual(["player"]);
});

test("the requested view is used when the profile has it", () => {
    expect(resolveViews({ ...profile, is_player: true, is_host: true }, "host").active).toBe("host");
});

test("a missing or unavailable requested view falls back to the first available", () => {
    const both = { ...profile, is_player: true, is_host: true };
    expect(resolveViews(both, null).active).toBe("player");
    expect(resolveViews({ ...profile, is_host: true }, "venue").active).toBe("host");
});

test("a profile with no views has no active view", () => {
    expect(resolveViews(profile, "player")).toEqual({ views: [], active: null });
});
