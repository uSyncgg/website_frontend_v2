import { buildSignUpRequest, buildAddProfileRequest, toFormValues, buildProfileUpdate } from "./profileForm";

const file = { name: "me.png" };
const hostFile = { name: "host.png" };

const signUpValues = {
    signup_path: ["player", "host", "other"],
    default_profile: "host",
    username_player: " Matt ",
    username_host: "MattHosts",
    other_roles: ["Coach", "Other"],
    other_role_detail: " Referee ",
    bio_player: "",
    bio_host: "I run LANs",
    bracket_hosting_player: "no",
    bracket_hosting_host: "yes",
    first_name: "M", last_name: "O", phone_number: "", date_of_birth: "", interests: ["Halo"],
    organization: "uSync", host_country: "US",
    venues: [{ name: "", location: "" }],
};

test("sign-up builds one profile per picked type with its own username, bio and details", () => {
    const { data } = buildSignUpRequest(signUpValues);
    expect(data.default_profile).toBe("host");
    expect(data.profiles.map(p => p.type)).toEqual(["player", "host"]);

    const [player, host] = data.profiles;
    expect(player.username).toBe("Matt");
    expect(player.bio).toBeNull();
    expect(host.bio).toBe("I run LANs");
    expect(player.bracket_hosting).toBe(false);
    expect(player.details).toEqual({ first_name: "M", last_name: "O", phone_number: null, date_of_birth: null, interests: ["Halo"] });
    expect(host.details).toEqual({ organization: "uSync", host_country: "US" });
    expect(host.bracket_hosting).toBe(true);
    // "Other" sub-roles go on every profile created at sign-up.
    expect(host.other_roles).toEqual(["Coach", "Other"]);
    expect(host.other_role_detail).toBe("Referee");
});

test("sign-up photos are per profile unless a profile reuses the default's", () => {
    const own = buildSignUpRequest({ ...signUpValues, profile_picture_host: [hostFile], profile_picture_player: [file] });
    expect(own.data.profiles.map(p => p.picture)).toEqual(["upload", "upload"]);
    expect(own.files).toEqual({ profile_picture_player: file, profile_picture_host: hostFile });

    // Reusing wins over a file picked before the box was ticked, and that file isn't sent.
    const copied = buildSignUpRequest({ ...signUpValues, profile_picture_host: [hostFile], profile_picture_player: [file], copy_picture_player: true });
    expect(copied.data.profiles.map(p => p.picture)).toEqual(["copy_default", "upload"]);
    expect(copied.files).toEqual({ profile_picture_host: hostFile });

    // Nothing to copy when the default has no photo.
    const nothing = buildSignUpRequest({ ...signUpValues, copy_picture_player: true });
    expect(nothing.data.profiles.map(p => p.picture)).toEqual([null, null]);
    expect(nothing.files).toEqual({});
});

test("sign-up bios can reuse the default's text", () => {
    const { data } = buildSignUpRequest({ ...signUpValues, bio_player: "ignored", copy_bio_player: true });
    expect(data.profiles.map(p => p.bio)).toEqual(["I run LANs", "I run LANs"]);
});

test("bracket hosting is asked per profile and left to the backend's default when unanswered", () => {
    const { data } = buildSignUpRequest({ ...signUpValues, bracket_hosting_host: undefined });
    expect(data.profiles[0].bracket_hosting).toBe(false);
    expect(data.profiles[1]).not.toHaveProperty("bracket_hosting");
});

test("sign-up falls back to the first type when the default isn't one being created", () => {
    const { data } = buildSignUpRequest({ ...signUpValues, signup_path: ["venue"], default_profile: "host", username_venue: "Arena", venues: [{ name: " Arena ", location: "Austin" }] });
    expect(data.default_profile).toBe("venue");
    expect(data.profiles[0].details).toEqual({ locations: [{ name: "Arena", location: "Austin" }] });
    expect(data.profiles[0]).not.toHaveProperty("other_roles");
});

test("adding a profile can use its own photo and bio, or the default profile's", () => {
    const values = { username_host: "MattHosts", organization: "uSync", host_country: "US", bio_host: "Mine", default_bio: "Default bio" };
    expect(buildAddProfileRequest("host", { ...values, profile_picture_host: [file] }, { defaultHasPicture: true })).toEqual({
        data: { type: "host", username: "MattHosts", picture: "upload", bio: "Mine", details: { organization: "uSync", host_country: "US" } },
        files: { profile_picture: file },
    });

    const copied = buildAddProfileRequest("host", { ...values, copy_picture_host: true, copy_bio_host: true }, { defaultHasPicture: true });
    expect(copied.data.picture).toBe("copy_default");
    expect(copied.data.bio).toBe("Default bio");
    expect(copied.files).toEqual({});

    expect(buildAddProfileRequest("host", { ...values, copy_picture_host: true }, { defaultHasPicture: false }).data.picture).toBeNull();
});

const settings = {
    type: "player", username: "Matt", bio: null, bracket_hosting: false, other_roles: ["Coach"], other_role_detail: null,
    details: { first_name: "M", last_name: "O", interests: ["Halo"], date_of_birth: null },
};

test("toFormValues flattens details and fills blanks", () => {
    const values = toFormValues(settings);
    expect(values.first_name).toBe("M");
    expect(values.bracket_hosting).toBe("no");
    expect(values.bio).toBe("");
    expect(values.venues).toEqual([{ name: "", location: "" }]);
    expect(toFormValues({ ...settings, type: "venue", details: { locations: [{ name: "Arena", location: "Austin" }] } }).venues)
        .toEqual([{ name: "Arena", location: "Austin" }]);
});

test("buildProfileUpdate splits profile fields from details and drops other types' fields", () => {
    const values = { ...toFormValues(settings), bio: "  ", bracket_hosting: "yes", date_of_birth: "", interests: ["Halo", "CS 2"], organization: "x" };
    expect(buildProfileUpdate("player", ["bio", "bracket_hosting", "interests", "date_of_birth", "organization"], values)).toEqual({
        bio: null,
        bracket_hosting: true,
        details: { interests: ["Halo", "CS 2"], date_of_birth: null },
    });
    expect(buildProfileUpdate("venue", ["venues"], { venues: [{ name: " Arena ", location: "Austin" }, { name: "", location: "" }] }))
        .toEqual({ details: { locations: [{ name: "Arena", location: "Austin" }] } });
    expect(buildProfileUpdate("host", ["first_name"], values)).toBeNull();
});
