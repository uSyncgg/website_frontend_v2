import {
    createTeam, invitePlayer, acceptInvite, joinByCode, setMemberRole, deleteTeam,
    entryProblem, useTeamsState, sendDemoInvite, pendingInvitesFor,
} from "./teamsMock";
import { renderHook } from "@testing-library/react";

const snapshot = () => renderHook(() => useTeamsState()).result.current;
const event2v2 = { teamSize: '2v2', entrants: [] };

describe('teamsMock', () => {
    it('lets the manager build a team, make a captain and enter once it is big enough', () => {
        const id = createTeam('Night Owls', 'me');
        let team = snapshot().teams.find(t => t.id === id);
        expect(entryProblem(team, event2v2, 'me')).toMatch(/Needs 2 players/);

        joinByCode(team.inviteCode, 'buddy');
        team = snapshot().teams.find(t => t.id === id);
        expect(entryProblem(team, event2v2, 'me')).toBe('');
        expect(entryProblem(team, event2v2, 'buddy')).toMatch(/manager or a captain/);

        setMemberRole(id, 'buddy', 'captain');
        team = snapshot().teams.find(t => t.id === id);
        expect(entryProblem(team, event2v2, 'buddy')).toBe('');
        expect(snapshot().notifications.some(n => n.to === 'me' && n.type === 'team_joined')).toBe(true);

        deleteTeam(id);
        expect(snapshot().teams.find(t => t.id === id)).toBeUndefined();
    });

    it('sends an invite as a notification that can be accepted', () => {
        sendDemoInvite('me');
        const [invite] = pendingInvitesFor(snapshot(), 'me');
        expect(snapshot().notifications.find(n => n.inviteId === invite.id)).toBeTruthy();
        acceptInvite(invite.id);
        const team = snapshot().teams.find(t => t.id === invite.teamId);
        expect(team.members.map(m => m.username)).toContain('me');
        expect(pendingInvitesFor(snapshot(), 'me')).toHaveLength(0);
    });

    it('does not invite someone twice', () => {
        const id = createTeam('Static', 'me');
        invitePlayer(id, 'stranger', 'me');
        invitePlayer(id, 'stranger', 'me');
        expect(snapshot().invites.filter(i => i.teamId === id)).toHaveLength(1);
    });
});
