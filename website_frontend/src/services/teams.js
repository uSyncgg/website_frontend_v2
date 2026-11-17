import apiClient from "./apiClient";

// Teams (the backend's /teams routes). A team is owned by one of an account's profiles (an
// org's teams, or a player's own team). A team looks like:
// { public_id, name, game, picture, created_at, owner: { type, username, public_id, profile_picture },
//   my_role: 'owner' | 'captain' | 'player' | null,
//   members: [{ public_id, username, profile_picture, role }],
//   invites: [{ id, public_id, username, profile_picture, created_at }] (owner only) }
const auth = (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {});
const data = (res) => res.data;
const team = (id) => `/teams/${encodeURIComponent(id)}`;

// Every team the account owns or plays on.
export const getMyTeams = (token) => apiClient.get('/teams/me', auth(token)).then(data);

// A team's public page (signed in, it also fills in my_role and, for the owner, invites).
export const getTeam = (teamId, token) => apiClient.get(team(teamId), auth(token)).then(data);

// Player profiles matching `q` (2+ characters), for the invite picker.
export const searchPlayers = (q, token) =>
    apiClient.get('/teams/players/search', { ...auth(token), params: { q } }).then(data);

// { owner_type, name, game, invites: [username] } plus an optional picture File.
export const createTeam = ({ picture, ...body }, token) => {
    const payload = new FormData();
    payload.append('data', JSON.stringify(body));
    if (picture) payload.append('picture', picture);
    return apiClient.post('/teams', payload, auth(token)).then(data);
};

export const updateTeam = (teamId, body, token) => apiClient.patch(team(teamId), body, auth(token)).then(data);

export const updateTeamPicture = (teamId, file, token) => {
    const payload = new FormData();
    payload.append('picture', file);
    return apiClient.put(`${team(teamId)}/picture`, payload, auth(token)).then(data);
};

export const deleteTeam = (teamId, token) => apiClient.delete(team(teamId), auth(token));

export const leaveTeam = (teamId, token) => apiClient.post(`${team(teamId)}/leave`, null, auth(token));

export const invitePlayer = (teamId, username, token) =>
    apiClient.post(`${team(teamId)}/invites`, { username }, auth(token)).then(data);

export const cancelInvite = (teamId, inviteId, token) =>
    apiClient.delete(`${team(teamId)}/invites/${inviteId}`, auth(token)).then(data);

// role: 'captain' | 'player'. A captain can enter the team in events.
export const setMemberRole = (teamId, playerId, role, token) =>
    apiClient.patch(`${team(teamId)}/members/${encodeURIComponent(playerId)}`, { role }, auth(token)).then(data);

export const removeMember = (teamId, playerId, token) =>
    apiClient.delete(`${team(teamId)}/members/${encodeURIComponent(playerId)}`, auth(token)).then(data);

// The invited player's side: [{ id, team, invited_by, created_at }].
export const getMyInvites = (token) => apiClient.get('/teams/invites/me', auth(token)).then(data);

export const respondToInvite = (inviteId, accept, token) =>
    apiClient.post(`/teams/invites/${inviteId}/${accept ? 'accept' : 'decline'}`, null, auth(token)).then(data);

export const teamUrl = (t) => `/teams/${encodeURIComponent(t.public_id)}`;

export const ROLE_LABELS = { owner: 'Owner', captain: 'Captain', player: 'Player' };
