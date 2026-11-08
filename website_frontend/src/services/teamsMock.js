import { useSyncExternalStore } from "react";

// MOCKUP STORE for teams, invites and notifications. Like hostEventsMock, nothing here talks to
// the backend - it lives in this browser's localStorage so the flow can be clicked through.
// Each exported action notes the API call the backend will need.
//
// People are identified by username (lowercased for matching). Roles on a team:
//   manager - created the team; can invite, change roles, delete the team, and join events
//   captain - set by the manager; can join events on behalf of the team
//   player  - plain member

const STORAGE_KEY = 'usync.mock.teams.v1';

export const ROLE_LABELS = { manager: 'Manager', captain: 'Captain', player: 'Player' };

// Stand-ins for other uSync accounts so player search has someone to find.
export const DEMO_PLAYERS = ["Zyphr", "NovaKing", "Blitzz", "ghostlyy", "Rampage", "Kairo", "SnipeGod", "Vexx", "Lumen", "Tempo", "Drifter", "OkayJay"];

const key = (username) => (username ?? '').trim().toLowerCase();
const uid = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
const inviteCode = () => Math.random().toString(36).slice(2, 10);

const load = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved?.teams) return saved;
    } catch {
        // fall through to an empty store
    }
    return { teams: [], invites: [], notifications: [] };
};

let state = load();
const listeners = new Set();

const save = (next) => {
    state = next;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // storage unavailable - keep it for this visit only
    }
    listeners.forEach(fn => fn());
};

const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
};

const notification = (to, type, fields) => ({
    id: uid('n'), to: key(to), type, read: false, at: new Date().toISOString(), ...fields,
});

const addNotifications = (s, ...items) => ({ ...s, notifications: [...items, ...s.notifications] });

// ---- reads -----------------------------------------------------------------

export const useTeamsState = () => useSyncExternalStore(subscribe, () => state);

export const teamMember = (team, username) => team.members.find(m => key(m.username) === key(username));

export const roleOf = (team, username) => teamMember(team, username)?.role ?? null;

export const canEnterEvents = (team, username) => ['manager', 'captain'].includes(roleOf(team, username));

export const teamSizeOf = (event) => Number(String(event.teamSize)[0]) || 1;

// Why a team can't enter this event yet, or '' when it can.
export const entryProblem = (team, event, username) => {
    const need = teamSizeOf(event);
    if (!canEnterEvents(team, username)) return 'Only the manager or a captain can enter events';
    if (team.members.length < need) return `Needs ${need} players (has ${team.members.length})`;
    if (event.entrants?.some(e => e.teamId === team.id)) return 'Already entered';
    return '';
};

// Teams the person is on, newest first.
export const myTeamsFrom = (s, username) => s.teams.filter(t => teamMember(t, username));

export const pendingInvitesFor = (s, username) =>
    s.invites.filter(i => i.status === 'pending' && key(i.to) === key(username));

// Usernames to suggest when searching to invite: demo players plus anyone on a team, minus
// the people already on it or already invited.
export const searchPlayers = (s, team, query) => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const taken = new Set([
        ...team.members.map(m => key(m.username)),
        ...s.invites.filter(i => i.status === 'pending' && i.teamId === team.id).map(i => key(i.to)),
    ]);
    const pool = new Set([...DEMO_PLAYERS, ...s.teams.flatMap(t => t.members.map(m => m.username))]);
    return [...pool].filter(name => name.toLowerCase().includes(q) && !taken.has(key(name))).slice(0, 6);
};

export const inviteUrl = (team) => `${window.location.origin}/teams/join/${team.inviteCode}`;

// ---- writes (mock) ---------------------------------------------------------

// POST /teams { name } - the creator becomes the manager.
export const createTeam = (name, username) => {
    const id = uid('team');
    save({
        ...state,
        teams: [{
            id,
            name: name.trim(),
            inviteCode: inviteCode(),
            createdAt: new Date().toISOString(),
            members: [{ username, role: 'manager', joinedAt: new Date().toISOString() }],
        }, ...state.teams],
    });
    return id;
};

// DELETE /teams/:id - manager only. Invites for it go away with it.
export const deleteTeam = (teamId) => save({
    ...state,
    teams: state.teams.filter(t => t.id !== teamId),
    invites: state.invites.filter(i => i.teamId !== teamId),
    notifications: state.notifications.filter(n => n.teamId !== teamId),
});

const addMember = (s, teamId, username) => ({
    ...s,
    teams: s.teams.map(t => (t.id !== teamId || teamMember(t, username)
        ? t
        : { ...t, members: [...t.members, { username, role: 'player', joinedAt: new Date().toISOString() }] })),
});

// Demo players answer instantly-ish so a manager can fill a team and try entering an event.
const demoAccept = (inviteId) => setTimeout(() => acceptInvite(inviteId), 1200);

// POST /teams/:id/invites { username } - notifies that player.
export const invitePlayer = (teamId, username, from) => {
    const team = state.teams.find(t => t.id === teamId);
    if (!team || teamMember(team, username)) return;
    if (state.invites.some(i => i.status === 'pending' && i.teamId === teamId && key(i.to) === key(username))) return;
    const invite = { id: uid('inv'), teamId, to: username, from, status: 'pending', at: new Date().toISOString() };
    save(addNotifications(
        { ...state, invites: [invite, ...state.invites] },
        notification(username, 'team_invite', { teamId, inviteId: invite.id, from, teamName: team.name }),
    ));
    if (DEMO_PLAYERS.some(p => key(p) === key(username))) demoAccept(invite.id);
};

const settle = (s, inviteId, status) => ({
    ...s,
    invites: s.invites.map(i => (i.id === inviteId ? { ...i, status } : i)),
    notifications: s.notifications.map(n => (n.inviteId === inviteId ? { ...n, read: true, resolved: status } : n)),
});

// POST /teams/invites/:id/accept
export const acceptInvite = (inviteId) => {
    const invite = state.invites.find(i => i.id === inviteId);
    if (!invite || invite.status !== 'pending') return;
    const team = state.teams.find(t => t.id === invite.teamId);
    if (!team) return;
    save(addNotifications(
        addMember(settle(state, inviteId, 'accepted'), invite.teamId, invite.to),
        notification(invite.from, 'team_joined', { teamId: team.id, teamName: team.name, who: invite.to }),
    ));
};

// POST /teams/invites/:id/decline
export const declineInvite = (inviteId) => {
    const invite = state.invites.find(i => i.id === inviteId);
    if (!invite || invite.status !== 'pending') return;
    save(settle(state, inviteId, 'declined'));
};

// POST /teams/join { code } - from an invite link. Returns the team, or null for a bad code.
export const joinByCode = (code, username) => {
    const team = state.teams.find(t => t.inviteCode === code);
    if (!team) return null;
    if (!teamMember(team, username)) {
        const manager = team.members.find(m => m.role === 'manager');
        save(addNotifications(
            addMember(state, team.id, username),
            ...(manager ? [notification(manager.username, 'team_joined', { teamId: team.id, teamName: team.name, who: username })] : []),
        ));
    }
    return state.teams.find(t => t.id === team.id);
};

// PATCH /teams/:id/members/:username { role: 'captain' | 'player' } - manager only.
export const setMemberRole = (teamId, username, role) => save({
    ...state,
    teams: state.teams.map(t => (t.id !== teamId ? t : {
        ...t,
        members: t.members.map(m => (key(m.username) === key(username) && m.role !== 'manager' ? { ...m, role } : m)),
    })),
});

// DELETE /teams/:id/members/:username - the manager removes someone, or a player leaves.
export const removeMember = (teamId, username) => save({
    ...state,
    teams: state.teams.map(t => (t.id !== teamId ? t : {
        ...t,
        members: t.members.filter(m => key(m.username) !== key(username)),
    })),
});

// POST /notifications/read
export const markNotificationsRead = (username) => save({
    ...state,
    notifications: state.notifications.map(n => (n.to === key(username) ? { ...n, read: true } : n)),
});

// Mockup only: an invite to the signed-in player from a demo team, to try the accept flow.
export const sendDemoInvite = (username) => {
    const manager = DEMO_PLAYERS[Math.floor(Math.random() * DEMO_PLAYERS.length)];
    const names = ['Night Owls', 'Static Gaming', 'Apex Five', 'Rogue Unit', 'Cold Front', 'Paper Tigers'];
    const id = uid('team');
    const teamName = names[Math.floor(Math.random() * names.length)];
    const invite = { id: uid('inv'), teamId: id, to: username, from: manager, status: 'pending', at: new Date().toISOString() };
    save(addNotifications(
        {
            ...state,
            teams: [{
                id,
                name: teamName,
                inviteCode: inviteCode(),
                createdAt: new Date().toISOString(),
                members: [{ username: manager, role: 'manager', joinedAt: new Date().toISOString() }],
            }, ...state.teams],
            invites: [invite, ...state.invites],
        },
        notification(username, 'team_invite', { teamId: id, inviteId: invite.id, from: manager, teamName }),
    ));
};
