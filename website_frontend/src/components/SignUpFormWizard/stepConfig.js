import { SignUpPathStep } from "components/MutualSignUpSteps/SignUpPathStep";
import { ProfileIdentityStep } from "components/MutualSignUpSteps/ProfileIdentityStep";
import { UserGamesStep } from "components/MutualSignUpSteps/UserGamesStep";
import { ProfileBioStep } from "components/MutualSignUpSteps/ProfileBioStep";
import { ProfileMediaStep } from "components/MutualSignUpSteps/ProfileMediaStep";
import { LocationStep } from "components/MutualSignUpSteps/LocationStep";
import { BracketHostingStep } from "components/MutualSignUpSteps/BracketHostingStep";
import { LinkedAccountsStep } from "components/MutualSignUpSteps/LinkedAccountsStep";

import { PlayerAboutStep } from "components/PlayerSignUpSteps/PlayerAboutStep";

import { HostOrgStep } from "components/HostSignUpSteps/HostOrgStep";
import { HostEventStep } from "components/HostSignUpSteps/HostEventStep";

import { OrgDetailsStep } from "components/OrgSignUpSteps/OrgDetailsStep";
import { OrgTeamsStep } from "components/OrgSignUpSteps/OrgTeamsStep";
import { TeamsTab } from "pages/Host/TeamsTab";

import { NO_BRACKET_TYPES, PROFILE_TYPES, bioField, linksField, pictureField, usernameField } from "utils/profiles";

// Shared by the sign-up wizard, the add-a-profile wizard and the profile settings wizard.
// - `fields`: fields validated (via trigger) before leaving the step.
// - `requiredFields` / `isComplete(values)`: the information the step needs before the form can
//   be submitted; the step checks off in the sidebar once it's there. Steps with neither are
//   optional: they never block submitting, and only check off after the user continues past them.
// - `saveFields`: every field the step owns, optional ones included. Profile settings uses
//   it to work out which changed values belong to this step's save.

const PLAYER_ABOUT_FIELDS = ['first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'country'];

// Step 0 of sign-up: which profiles to create. Every other step depends on it.
export const PATH_STEP = { key: 'signup_path', title: 'Get Started', subtitle: "Pick everything that fits. Each one gets its own profile and username, all on one account.", Component: SignUpPathStep, fields: [], saveFields: ['signup_path', 'other_roles', 'other_role_detail'] };

const identityStep = (types, { isSignUp }) => {
    const usernames = types.map(usernameField);
    // An org's username is its organization name, so an org on its own is asked for just that.
    const orgOnly = types.length === 1 && types[0] === 'org';
    return {
        key: 'user_info',
        title: orgOnly ? 'Organization Name' : types.length > 1 ? 'Usernames' : 'Username',
        subtitle: orgOnly
            ? "The name your organization and its teams go by across uSync. Spaces are fine."
            : types.length > 1
                ? "Each profile gets its own name. They can match - a name only has to be unique among profiles of the same kind."
                : "This is how this profile shows up across uSync.",
        Component: ProfileIdentityStep,
        props: { types, isSignUp },
        fields: isSignUp ? [...usernames, 'email'] : usernames,
        requiredFields: isSignUp ? [...usernames, 'email'] : usernames,
        saveFields: [],
    };
};

// Profile settings: the one profile's photo and bio.
const BIO_STEP = { key: 'profile_bio', title: 'Profile', subtitle: 'A photo and a line about yourself. Both optional.', Component: ProfileBioStep, fields: ['profile_picture', 'bio'], saveFields: ['profile_picture', 'bio'] };

// Sign-up and add-a-profile: a photo and bio for each profile being created. Any profile other
// than the default can reuse the default's photo and/or bio instead.
const mediaStep = (types, { isSignUp }) => ({
    key: 'profile_bio',
    title: types.length > 1 ? 'Photos & Bios' : 'Profile',
    subtitle: types.length > 1
        ? 'Each profile can have its own photo and bio, or reuse your default one. All optional - you can do this later.'
        : 'A photo and a line about yourself. Both optional - you can do this later.',
    Component: ProfileMediaStep,
    props: { types, isSignUp },
    fields: types.flatMap(type => [pictureField(type), bioField(type)]),
    saveFields: [],
});
// A venue profile needs at least one complete location.
const hasLocation = (values) => (values.venues ?? []).some(v => v?.name?.trim() && v?.location?.trim());
export const LOCATION_STEP = { key: 'venue_location', title: 'Location', subtitle: "Add every venue you'll be hosting from. You can add more than one.", Component: LocationStep, fields: ['venues'], isComplete: hasLocation, saveFields: ['venues'] };

// "Games You Play" (player), "Hosted Titles" (host), or "Games You Play & Host"
// (both) - same UserGamesStep component, told via `props.mode` which field(s) to bind.
const PLAYER_GAMES_STEP = { key: 'user_games', title: 'Games You Play', subtitle: 'Pick as many as you like - this drives the events we surface for you.', Component: UserGamesStep, props: { mode: 'player' }, fields: ['other_games'], saveFields: ['interests', 'other_games'] };
const HOST_GAMES_STEP = { key: 'user_games', title: 'Hosted Titles', subtitle: 'Pick every title you run events for.', Component: UserGamesStep, props: { mode: 'host' }, fields: ['other_hosted_games'], saveFields: ['hosted_games', 'other_hosted_games'] };
const COMBINED_GAMES_STEP = { key: 'user_games', title: 'Games You Play & Host', subtitle: 'Pick as many as you like in each - this drives the events we surface for you.', Component: UserGamesStep, props: { mode: 'combined' }, fields: ['other_games', 'other_hosted_games'], saveFields: ['interests', 'other_games', 'hosted_games', 'other_hosted_games'] };

const PLAYER_ABOUT_STEP = { key: 'player_about', title: 'About You', subtitle: 'Only your name shows publicly by default.', Component: PlayerAboutStep, fields: PLAYER_ABOUT_FIELDS, requiredFields: ['first_name', 'last_name'], saveFields: PLAYER_ABOUT_FIELDS };
// Bracket hosting is per profile and every type can have it. Sign-up and add-a-profile ask for
// each profile being created; settings edits the one profile's `bracket_hosting`.
const BRACKET_SUBTITLE = 'Want to run your own brackets for friends, your team or your community? You can change this later.';
const bracketStep = (types) => ({ key: 'bracket_hosting', title: 'Bracket Hosting', subtitle: BRACKET_SUBTITLE, Component: BracketHostingStep, props: { types }, fields: [], saveFields: [] });
const SETTINGS_BRACKET_STEP = { key: 'bracket_hosting', title: 'Bracket Hosting', subtitle: BRACKET_SUBTITLE, Component: BracketHostingStep, fields: [], saveFields: ['bracket_hosting'] };
const HOST_ORG_STEP = { key: 'host_org', title: 'Organization', subtitle: 'This is the name players will see on every event you run.', Component: HostOrgStep, fields: ['organization', 'host_country'], requiredFields: ['organization', 'host_country'], saveFields: ['organization', 'host_country'] };
const HOST_EVENTS_STEP = { key: 'host_events', title: 'Event Types', subtitle: 'Pick every format you host.', Component: HostEventStep, fields: [], saveFields: ['event_types'] };
// Organizations: their name and country, the games their teams play, and their teams. Teams are
// optional at sign-up (named here, created with the account); settings manages them live.
// The org's name is its username (asked on the username step), so this is just where it's based.
const ORG_DETAILS_STEP = { key: 'org_details', title: 'Location', subtitle: 'Where your organization is based. Pick a region if you compete across several countries.', Component: OrgDetailsStep, fields: ['org_country'], requiredFields: ['org_country'], saveFields: ['org_country'] };
const ORG_GAMES_STEP = { key: 'org_games', title: 'Team Titles', subtitle: 'Pick every game your organization fields teams in.', Component: UserGamesStep, props: { mode: 'org' }, fields: ['other_org_games'], saveFields: ['org_games', 'other_org_games'] };
const ORG_TEAMS_STEP = { key: 'org_teams', title: 'Teams', subtitle: 'Optional - name the teams in your organization. You can add, rename and fill them with players later from your profile.', Component: OrgTeamsStep, fields: ['org_teams'], saveFields: [] };
const ORG_TEAMS_MANAGE_STEP = { key: 'org_teams', title: 'Teams', subtitle: 'Create teams, give them an image and invite players. Click a team to manage its roster.', Component: TeamsTab, props: { ownerType: 'org' }, fields: [], saveFields: [] };

// Optional: the accounts each new profile links. Profile settings edits them in the link editor instead.
const accountsStep = (types) => ({
    key: 'linked_accounts',
    title: 'Linked Accounts',
    subtitle: types.length > 1
        ? 'Optional - paste a link or type a handle for each profile, so people can find you.'
        : 'Optional - paste a link or type a handle, so people can find you.',
    Component: LinkedAccountsStep,
    props: { types },
    fields: [],
    saveFields: types.map(linksField),
});

// The detail steps for a set of profile types, in order. The order/composition lives entirely
// here - reorder or interleave steps by editing this function, nothing else needs to change.
function detailSteps(types, { includeAccounts, media, bracket, isSettings = false }) {
    const isPlayer = types.includes('player');
    const isHost = types.includes('host');
    const isVenue = types.includes('venue');
    const isOrg = types.includes('org');
    const hostsBrackets = types.some(type => !NO_BRACKET_TYPES.includes(type));

    return [
        ...(isVenue ? [LOCATION_STEP] : []),
        ...(isPlayer ? [PLAYER_ABOUT_STEP] : []),
        ...(isPlayer && isHost ? [COMBINED_GAMES_STEP] : isPlayer ? [PLAYER_GAMES_STEP] : isHost ? [HOST_GAMES_STEP] : []),
        ...(isHost ? [HOST_ORG_STEP, HOST_EVENTS_STEP] : []),
        ...(isOrg ? [ORG_DETAILS_STEP, ORG_GAMES_STEP, isSettings ? ORG_TEAMS_MANAGE_STEP : ORG_TEAMS_STEP] : []),
        ...(hostsBrackets ? [bracket] : []),
        media,
        ...(includeAccounts ? [accountsStep(types)] : []),
    ];
}

// The profile types picked on the Get Started step, in PROFILE_TYPES order ("other" isn't a profile).
export const selectedTypes = (pathSelection = []) => PROFILE_TYPES.filter(type => pathSelection.includes(type));

// Sign-up: Get Started, then one username per profile, then the details every picked type needs.
export function buildStepSequence(pathSelection) {
    const types = selectedTypes(pathSelection);
    if (types.length === 0) return [PATH_STEP];
    return [PATH_STEP, identityStep(types, { isSignUp: true }), ...detailSteps(types, { includeAccounts: true, media: mediaStep(types, { isSignUp: true }), bracket: bracketStep(types) })];
}

// Adding one profile to an existing account: its username, then its details and linked accounts.
export function buildAddProfileSteps(type) {
    return [identityStep([type], { isSignUp: false }), ...detailSteps([type], { includeAccounts: true, media: mediaStep([type], { isSignUp: false }), bracket: bracketStep([type]) })];
}

// Profile settings for one profile. The username lives on the settings Account step instead.
export function buildSettingsSteps(type) {
    return detailSteps([type], { includeAccounts: false, media: BIO_STEP, bracket: SETTINGS_BRACKET_STEP, isSettings: true });
}

// "Other" is a sub-role tag, not a profile - picking it still requires a real profile type.
export function otherNeedsProfile(selection) {
    return selection.includes('other') && selectedTypes(selection).length === 0;
}

// Fields the sidebar checkmarks care about - kept to a minimal, targeted watch
// list so typing doesn't re-render the whole wizard on every keystroke.
export const COMPLETION_WATCH_FIELDS = [
    'signup_path', 'other_roles', ...PROFILE_TYPES.map(usernameField), 'email', 'first_name', 'last_name', 'organization', 'host_country', 'venues', 'org_country',
];

// Whether the step has everything the form needs from it. Optional steps always do.
export function hasRequiredInfo(step, values) {
    if (step.key === 'signup_path') {
        const selection = values.signup_path ?? [];
        if (selectedTypes(selection).length === 0) return false;
        if (selection.includes('other') && (values.other_roles ?? []).length === 0) return false;
        return true;
    }
    if (step.isComplete) return step.isComplete(values);
    if (step.requiredFields) return step.requiredFields.every(field => !!values[field]);
    return true;
}

// The sidebar checkmark: steps that need information check off once it's there; optional
// steps check off once the user has continued past them (otherwise every optional step would
// show a checkmark from the start).
export function isStepComplete(step, values, passedSteps) {
    const needsInfo = step.key === 'signup_path' || step.isComplete || step.requiredFields;
    return needsInfo ? hasRequiredInfo(step, values) : passedSteps.has(step.key);
}
