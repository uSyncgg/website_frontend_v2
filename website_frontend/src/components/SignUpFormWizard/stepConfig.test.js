import { buildStepSequence, hasRequiredInfo, isStepComplete } from "./stepConfig";

const allThree = ["player", "host", "venue"];
const filled = {
    signup_path: allThree,
    username_player: "Matt", username_host: "MattHosts", username_venue: "Arena", email: "m@usync.gg",
    first_name: "M", last_name: "O",
    organization: "uSync", host_country: "US",
    venues: [{ name: "Arena", location: "Austin" }],
};
const canSubmit = (values) => buildStepSequence(values.signup_path).every(step => hasRequiredInfo(step, values));

test("a filled-in form can be submitted without continuing past the optional steps", () => {
    // Regression: the last step (Linked Accounts) has no Continue button, so gating on
    // visited steps kept Submit disabled forever.
    expect(canSubmit(filled)).toBe(true);
});

test("each missing piece of required information blocks submitting", () => {
    expect(canSubmit({ ...filled, username_venue: "" })).toBe(false);
    expect(canSubmit({ ...filled, host_country: "" })).toBe(false);
    expect(canSubmit({ ...filled, last_name: "" })).toBe(false);
    expect(canSubmit({ ...filled, venues: [{ name: "Arena", location: " " }] })).toBe(false);
    expect(canSubmit({ ...filled, signup_path: [...allThree, "other"], other_roles: [] })).toBe(false);
});

test("optional steps only check off after continuing past them; required ones once filled", () => {
    const steps = buildStepSequence(allThree);
    const events = steps.find(step => step.key === "host_events");
    const location = steps.find(step => step.key === "venue_location");
    expect(isStepComplete(events, filled, new Set())).toBe(false);
    expect(isStepComplete(events, filled, new Set(["host_events"]))).toBe(true);
    expect(isStepComplete(location, filled, new Set())).toBe(true);
});
