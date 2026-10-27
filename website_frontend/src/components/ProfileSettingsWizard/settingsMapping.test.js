import { toFormValues, buildPayloads } from "./settingsMapping";

const settings = {
    username: "Matt", verified: false, is_player: true, is_host: true,
    bio: null, bracket_hosting: false, other_roles: ["Venue"], other_role_detail: null, profile_picture: null,
    interests: ["Halo"], other_games: null, first_name: "M", last_name: "O", phone_number: null,
    gender: null, date_of_birth: null, country: "US",
    organization: "uSync", hosted_games: [], other_hosted_games: null, host_country: "US", event_types: [],
    venues: [],
};

test("toFormValues rebuilds the path and fills blanks", () => {
    const values = toFormValues(settings);
    expect(values.signup_path).toEqual(["player", "host", "other"]);
    expect(values.bracket_hosting).toBe("no");
    expect(values.bio).toBe("");
    expect(values.venues).toEqual([{ name: "", location: "" }]);
});

test("buildPayloads routes fields to their section and converts values back", () => {
    const values = {
        ...toFormValues(settings),
        bio: "  ",
        date_of_birth: "",
        bracket_hosting: "yes",
        interests: ["Halo", "CS 2"],
        venues: [{ name: " Arena ", location: "Austin" }, { name: "", location: "" }],
    };
    expect(buildPayloads(["bio", "bracket_hosting", "venues", "interests", "date_of_birth"], values)).toEqual({
        user: { bio: null, bracket_hosting: true, venues: [{ name: "Arena", location: "Austin" }] },
        player: { interests: ["Halo", "CS 2"], date_of_birth: null },
    });
});
