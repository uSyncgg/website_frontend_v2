import { buildSignUpRequest, buildAddProfileRequest, toFormValues, buildProfileUpdate } from "./profileForm";
import { buildStepSequence, buildSettingsSteps } from "components/SignUpFormWizard/stepConfig";
import { canHostBrackets } from "./profiles";

// Organization profiles: what the wizards ask for and what they send to the backend.

const orgValues = {
    signup_path: ["org"],
    username_org: " Static Gaming ",
    org_country: "north_america",
    org_games: ["Halo", "Other"],
    other_org_games: "Apex",
    org_teams: [{ name: " Static Black ", games: ["halo"] }, { name: "  ", games: [] }, { name: "Static White", games: ["cs2", "valorant"] }],
    bracket_hosting_org: "yes",
};

test("org sign-up asks for the name once: no separate organization field is sent", () => {
    const { data } = buildSignUpRequest(orgValues);
    const [org] = data.profiles;
    expect(data.default_profile).toBe("org");
    expect(org.type).toBe("org");
    expect(org.username).toBe("Static Gaming");
    expect(org.details.organization).toBeUndefined();
    expect(org.details.org_country).toBe("north_america");
    expect(org.details.games).toEqual(["Halo", "Other"]);
    expect(org.details.other_games).toBe("Apex");
});

test("org sign-up sends named teams only, and never bracket hosting", () => {
    const [org] = buildSignUpRequest(orgValues).data.profiles;
    expect(org.details.teams).toEqual([{ name: "Static Black", games: ["halo"] }, { name: "Static White", games: ["cs2", "valorant"] }]);
    expect(org.bracket_hosting).toBe(false);
});

test("adding an org profile sends the same shape", () => {
    const { data } = buildAddProfileRequest("org", { ...orgValues, org_teams: [] });
    expect(data.type).toBe("org");
    expect(data.details.teams).toEqual([]);
    expect(data.bracket_hosting).toBe(false);
});

test("org-only sign-up steps: name, location, titles, teams - no bracket hosting step", () => {
    const steps = buildStepSequence(["org"]);
    expect(steps.map(s => s.key)).toEqual(["signup_path", "user_info", "org_details", "org_games", "org_teams", "profile_bio", "linked_accounts"]);
    expect(steps[1].title).toBe("Organization Name");
    expect(steps.find(s => s.key === "org_details").requiredFields).toEqual(["org_country"]);
});

test("players and orgs are never asked about bracket hosting", () => {
    expect(buildStepSequence(["player", "org"]).map(s => s.key)).not.toContain("bracket_hosting");
    expect(buildSettingsSteps("player").map(s => s.key)).not.toContain("bracket_hosting");
});

test("a player with a host profile is asked about the host profile only", () => {
    const step = buildStepSequence(["player", "host"]).find(s => s.key === "bracket_hosting");
    expect(step).toBeDefined();
});

test("org settings: location, titles, teams dashboard - no bracket hosting", () => {
    const steps = buildSettingsSteps("org");
    expect(steps.map(s => s.key)).toEqual(["org_details", "org_games", "org_teams", "profile_bio"]);
    expect(steps.find(s => s.key === "org_teams").props).toEqual({ ownerType: "org" });
});

test("org settings round-trip: location update goes in details", () => {
    const values = toFormValues({ type: "org", username: "Static Gaming", bracket_hosting: false, details: { organization: "Static Gaming", org_country: "eu", games: ["Halo"], other_games: null } });
    expect(values.org_country).toBe("eu");
    expect(values.org_games).toEqual(["Halo"]);
    expect(buildProfileUpdate("org", ["org_country"], { ...values, org_country: "latam" })).toEqual({ details: { org_country: "latam" } });
});

test("orgs can never host brackets", () => {
    expect(canHostBrackets({ type: "org", bracket_hosting: true })).toBe(false);
    expect(canHostBrackets({ type: "host", bracket_hosting: true })).toBe(true);
});
