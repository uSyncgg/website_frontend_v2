import { SignUpPathStep } from "components/MutualSignUpSteps/SignUpPathStep";
import { UserInfoStep } from "components/MutualSignUpSteps/UserInfoStep";
import { UserGamesStep } from "components/MutualSignUpSteps/UserGamesStep";
import { ProfileBioStep } from "components/MutualSignUpSteps/ProfileBioStep";
import { LocationStep } from "components/MutualSignUpSteps/LocationStep";

import { PlayerAboutStep } from "components/PlayerSignUpSteps/PlayerAboutStep";
import { PlayerBracketStep } from "components/PlayerSignUpSteps/PlayerBracketStep";
import { PlayerAccountsStep } from "components/PlayerSignUpSteps/PlayerAccountsStep";

import { HostOrgStep } from "components/HostSignUpSteps/HostOrgStep";
import { HostEventStep } from "components/HostSignUpSteps/HostEventStep";
import { HostAccountsStep } from "components/HostSignUpSteps/HostAccountsStep";

// Shared by the sign-up wizard and the profile settings wizard.
// - `fields`: required fields validated (via trigger) before leaving the step.
// - `saveFields`: every field the step owns, optional ones included — used by
//   profile settings to work out which changed values belong to this step's save.

const SOCIAL_FIELDS = ['twitch', 'twitter', 'youtube', 'kick', 'discord', 'instagram'];
const PLAYER_PLATFORM_FIELDS = ['battlenet', 'activision', 'steam', 'riot'];
const PLAYER_COMPETITIVE_FIELDS = ['cmg', 'gankster', 'faceit', 'battlefy', 'esea'];
const PLAYER_ABOUT_FIELDS = ['first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'country'];

// Step 0 is always the path choice; every other step's presence depends on it.
export const PATH_STEP = { key: 'signup_path', title: 'Get Started', subtitle: "Pick one or both. If you compete and run events, choose both — it's a single account either way.", Component: SignUpPathStep, fields: [], saveFields: ['signup_path', 'other_roles', 'other_role_detail'] };
const MUTUAL_INFO_STEP = { key: 'user_info', title: 'Account Info', subtitle: "This is how you'll show up across uSync.", Component: UserInfoStep, fields: ['username', 'email'], saveFields: ['username', 'email'] };
const MUTUAL_BIO_STEP = { key: 'profile_bio', title: 'Profile', subtitle: 'A photo and a line about yourself. Both optional — you can do this later.', Component: ProfileBioStep, fields: ['profile_picture', 'bio'], saveFields: ['profile_picture', 'bio'] };
// Shown whenever "Venue" is picked among the Other sub-roles on the Get
// Started step, on top of whatever player/host steps are already in the sequence.
export const LOCATION_STEP = { key: 'venue_location', title: 'Location', subtitle: "Add every venue you'll be hosting from. You can add more than one.", Component: LocationStep, fields: [], saveFields: ['venues'] };

// "Games You Play" (player), "Hosted Titles" (host), or "Games You Play & Host"
// (both) — same UserGamesStep component, told via `props.mode` which field(s) to bind.
export const PLAYER_GAMES_STEP = { key: 'user_games', title: 'Games You Play', subtitle: 'Pick as many as you like — this drives the events we surface for you.', Component: UserGamesStep, props: { mode: 'player' }, fields: ['other_games'], saveFields: ['interests', 'other_games'] };
export const HOST_GAMES_STEP = { key: 'user_games', title: 'Hosted Titles', subtitle: 'Pick every title you run events for.', Component: UserGamesStep, props: { mode: 'host' }, fields: ['other_hosted_games'], saveFields: ['hosted_games', 'other_hosted_games'] };
const COMBINED_GAMES_STEP = { key: 'user_games', title: 'Games You Play & Host', subtitle: 'Pick as many as you like in each — this drives the events we surface for you.', Component: UserGamesStep, props: { mode: 'combined' }, fields: ['other_games', 'other_hosted_games'], saveFields: ['interests', 'other_games', 'hosted_games', 'other_hosted_games'] };

export const PLAYER_ABOUT_STEP = { key: 'player_about', title: 'About You', subtitle: 'Only your name shows publicly by default.', Component: PlayerAboutStep, fields: PLAYER_ABOUT_FIELDS, saveFields: PLAYER_ABOUT_FIELDS };
export const HOST_ORG_STEP = { key: 'host_org', title: 'Organization', subtitle: 'This is the name players will see on every event you run.', Component: HostOrgStep, fields: ['organization', 'host_country'], saveFields: ['organization', 'host_country'] };
export const HOST_EVENTS_STEP = { key: 'host_events', title: 'Event Types', subtitle: 'Pick every format you host.', Component: HostEventStep, fields: [], saveFields: ['event_types'] };
const PLAYER_ACCOUNTS_STEP = { key: 'player_accounts', title: 'Linked Accounts', subtitle: 'Optional — connect the platforms you use so teammates and organizers can find you.', Component: PlayerAccountsStep, fields: [], saveFields: [...SOCIAL_FIELDS, ...PLAYER_PLATFORM_FIELDS, ...PLAYER_COMPETITIVE_FIELDS] };

// Hosts always get bracket hosting, so this step only appears for players who aren't hosts.
export const PLAYER_BRACKET_STEP = { key: 'player_bracket', title: 'Bracket Hosting', subtitle: 'Want to run your own brackets for friends or your team? You can change this later.', Component: PlayerBracketStep, fields: [], saveFields: ['bracket_hosting'] };

const PLAYER_STEPS = [
    MUTUAL_INFO_STEP,
    PLAYER_ABOUT_STEP,
    PLAYER_GAMES_STEP,
    PLAYER_BRACKET_STEP,
    MUTUAL_BIO_STEP,
    PLAYER_ACCOUNTS_STEP,
];

const HOST_STEPS = [
    MUTUAL_INFO_STEP,
    HOST_GAMES_STEP,
    HOST_ORG_STEP,
    HOST_EVENTS_STEP,
    MUTUAL_BIO_STEP,
    { key: 'host_accounts', title: 'Linked Accounts', subtitle: 'Optional — connect the platforms you use so players can find you.', Component: HostAccountsStep, fields: [], saveFields: SOCIAL_FIELDS },
];

const COMBINED_STEPS = [
    MUTUAL_INFO_STEP,
    PLAYER_ABOUT_STEP,
    COMBINED_GAMES_STEP,
    HOST_ORG_STEP,
    HOST_EVENTS_STEP,
    MUTUAL_BIO_STEP,
    PLAYER_ACCOUNTS_STEP,
];

// The order/composition of the sequence lives entirely here - reorder or interleave
// player/host steps by editing this function, nothing else needs to change.
export function buildStepSequence(pathSelection, otherRoles) {
    const isPlayer = pathSelection.includes('player');
    const isHost = pathSelection.includes('host');
    // Venue lives under the "Other" sub-role picker, not as its own top-level option.
    const isVenue = pathSelection.includes('other') && otherRoles.includes('Venue');

    let steps;
    if (isPlayer && isHost) steps = [PATH_STEP, ...COMBINED_STEPS];
    else if (isHost) steps = [PATH_STEP, ...HOST_STEPS];
    else if (isPlayer) steps = [PATH_STEP, ...PLAYER_STEPS];
    else steps = [PATH_STEP];

    if (!isVenue) return steps;

    // Venue is independent of player/host, so it just slots the Location
    // step in right after Account Info wherever that ends up (or right
    // after Get Started, if Account Info isn't in the sequence).
    const infoIndex = steps.findIndex(step => step.key === 'user_info');
    const insertAt = infoIndex === -1 ? 1 : infoIndex + 1;
    return [...steps.slice(0, insertAt), LOCATION_STEP, ...steps.slice(insertAt)];
}

// "Other" is a sub-role tag, not a standalone signup path — picking it still
// requires Player and/or Host so every account has somewhere real to plug into.
export function otherNeedsPlayerOrHost(selection) {
    return selection.includes('other') && !selection.includes('player') && !selection.includes('host');
}

// Fields the sidebar checkmarks care about — kept to a minimal, targeted watch
// list so typing doesn't re-render the whole wizard on every keystroke.
export const COMPLETION_WATCH_FIELDS = ['signup_path', 'other_roles', 'username', 'email', 'first_name', 'last_name', 'organization'];

// A step only earns its sidebar checkmark once it's actually been dealt with:
// - Steps with real required fields (signup path, account info, about you,
//   organization) check off as soon as that information is filled in,
//   regardless of whether the step has been visited yet.
// - Steps with nothing strictly required (bracket hosting, event types,
//   games, bio, linked accounts) have no data to validate, so they only
//   check off once the user has actually continued past them — otherwise
//   every optional step would show a checkmark from the very start.
export function isStepComplete(step, values, passedSteps) {
    switch (step.key) {
        case 'signup_path': {
            const selection = values.signup_path ?? [];
            if (selection.length === 0) return false;
            if (selection.includes('other') && (values.other_roles ?? []).length === 0) return false;
            if (otherNeedsPlayerOrHost(selection)) return false;
            return true;
        }
        case 'user_info':
            return !!values.username && !!values.email;
        case 'player_about':
            return !!values.first_name && !!values.last_name;
        case 'host_org':
            return !!values.organization;
        default:
            return passedSteps.has(step.key);
    }
}
