import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { InviteCard, PlayerPicker } from './TeamParts';
import { TeamPage } from 'pages/Teams/TeamPage';
import * as teams from 'services/teams';

jest.mock('hooks', () => ({
    useAuth: () => ({ session: { access_token: 't' } }),
    useCurrentUser: () => ({ profiles: [{ type: 'player', username: 'MeMyself', public_id: 'mepub' }, { type: 'org', username: 'My Org', public_id: 'orgpub' }] }),
}));
jest.mock('components', () => ({ LoadingWheel: () => <p>loading</p>, SeoData: () => null }));
jest.mock('pages/NotFound', () => ({ NotFound: () => <p>not found</p> }));
jest.mock('services/teams', () => ({
    ...jest.requireActual('services/teams'),
    searchPlayers: jest.fn(),
    getTeam: jest.fn(),
    getMyInvites: jest.fn(),
    respondToInvite: jest.fn(),
}));

const owner = { type: 'org', username: 'Static Gaming', public_id: 'orgpub2', profile_picture: null };
const team = {
    public_id: 'team1', name: 'Static Black', game: 'Halo', picture: null, created_at: '2026-11-07T00:00:00Z',
    owner, my_role: null, invites: [],
    members: [{ public_id: 'p1', username: 'Zyphr', profile_picture: null, role: 'captain' }],
};
const invite = { id: 'inv1', team, invited_by: owner, created_at: '2026-11-07T00:00:00Z' };

test('an invite links to the team page and to the profile that sent it', () => {
    render(<MemoryRouter><InviteCard invite={invite} onRespond={jest.fn()} busy={false} /></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'Static Black' })).toHaveAttribute('href', '/teams/team1');
    expect(screen.getByRole('link', { name: 'Static Gaming' })).toHaveAttribute('href', '/profile/orgpub2/Static%20Gaming');
});

test('the invite picker never offers your own player profile', async () => {
    teams.searchPlayers.mockResolvedValue([
        { type: 'player', username: 'MeMyself', public_id: 'mepub' },
        { type: 'player', username: 'Mercy', public_id: 'merpub' },
    ]);
    render(<PlayerPicker selected={[]} onChange={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(/search players/i), { target: { value: 'me' } });
    expect(await screen.findByRole('button', { name: /Mercy/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /MeMyself/ })).toBeNull();
});

test('an invited player sees the roster with profile links and can accept from the team page', async () => {
    teams.getTeam.mockResolvedValue(team);
    teams.getMyInvites.mockResolvedValue([invite]);
    teams.respondToInvite.mockResolvedValue([]);
    render(
        <MemoryRouter initialEntries={['/teams/team1']}>
            <Routes><Route path="/teams/:teamId" element={<TeamPage />} /></Routes>
        </MemoryRouter>
    );
    expect(await screen.findByRole('heading', { name: 'Static Black' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zyphr/ })).toHaveAttribute('href', '/profile/p1/Zyphr');
    expect(await screen.findByText(/invited you to join this team/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    await waitFor(() => expect(teams.respondToInvite).toHaveBeenCalledWith('inv1', true, 't'));
});
