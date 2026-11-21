import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { PublicBracket } from './PublicBracket';
import apiClient from 'services/apiClient';
import { bracketEvent, apiGetFrom } from 'test/bracketFixtures';

const player = { type: 'player', username: 'Plays', public_id: 'playpub' };
const org = { type: 'org', username: 'Static Gaming', public_id: 'orgpub' };
let mockUser;
jest.mock('hooks', () => ({ useCurrentUser: () => mockUser, useAuth: () => ({ session: { access_token: 't' } }) }));
jest.mock('services/apiClient', () => ({ __esModule: true, default: { get: jest.fn() } }));

const team = (public_id, name, owner, games = [{ key: 'call_of_duty', name: 'Call of Duty' }]) => ({
    public_id, name, games, my_role: 'owner', owner,
    members: [{ public_id: `${public_id}-a`, username: `${name} Ace`, role: 'captain' }, { public_id: `${public_id}-b`, username: `${name} Bee`, role: 'player' }],
});
const event = bracketEvent({ id: 'evt-2s', teamSize: '2v2', entrants: [], viewerEntrantId: null });
const teams = [team('t-mine', 'My Duo', player), team('t-org', 'Static Duo', org), team('t-halo', 'Halo Duo', player, [{ key: 'halo', name: 'Halo' }])];

const open = async () => {
    render(
        <MemoryRouter initialEntries={['/brackets/evt-2s']}>
            <Routes><Route path="/brackets/:eventId" element={<PublicBracket />} /></Routes>
        </MemoryRouter>
    );
    fireEvent.click((await screen.findAllByRole('button', { name: 'Sign up' }))[0]);
    try {
        await screen.findByText(/My Duo/, {}, { timeout: 2000 });
    } catch {
        // Some tests have no teams to list.
    }
};

describe('PublicBracket sign-up', () => {
    beforeEach(() => apiClient.get.mockImplementation(apiGetFrom({ '/brackets/evt-2s': event, '/teams/me': teams })));

    it('has no "Sign up as" choice without an organization', async () => {
        mockUser = { defaultProfile: player, profiles: [player] };
        await open();
        expect(screen.queryByRole('radiogroup', { name: 'Sign up as' })).toBeNull();
        expect(await screen.findByText(/My Duo/)).toBeInTheDocument();
        expect(screen.getByText(/Static Duo/)).toBeInTheDocument();
    });

    it('lets an organization account sign up as a player or as the organization', async () => {
        mockUser = { defaultProfile: player, profiles: [player, org] };
        await open();
        const choice = screen.getByRole('radiogroup', { name: 'Sign up as' });
        expect(choice).toHaveTextContent('Player');
        expect(choice).toHaveTextContent('Organization (Static Gaming)');
        expect(await screen.findByText(/My Duo/)).toBeInTheDocument();
        expect(screen.queryByText(/Static Duo/)).toBeNull();
        fireEvent.click(screen.getByRole('radio', { name: /Organization/ }));
        expect(screen.getByText(/Static Duo/)).toBeInTheDocument();
        expect(screen.queryByText(/My Duo/)).toBeNull();
    });

    it("won't enter a team that doesn't play the game, and has the captain pick who plays", async () => {
        mockUser = { defaultProfile: player, profiles: [player] };
        await open();
        expect(await screen.findByText("Doesn't play Call of Duty")).toBeInTheDocument();
        fireEvent.click(screen.getByRole('radio', { name: /My Duo/ }));
        fireEvent.click(screen.getByRole('checkbox', { name: /My Duo Ace/ }));
        expect(screen.getByText('1 of 2 picked. Each player can only play once in this event.')).toBeInTheDocument();
        fireEvent.click(screen.getAllByRole('button', { name: 'Sign up' }).find(b => b.type === 'submit'));
        expect(await screen.findByText(/Fill in: 2 players/)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('checkbox', { name: /My Duo Bee/ }));
        expect(screen.getByText(/2 of 2 picked/)).toBeInTheDocument();
    });

    it("says when a team's roster is too small for the event", async () => {
        mockUser = { defaultProfile: player, profiles: [player] };
        const small = { ...team('t-solo', 'Lone Wolf', player), members: [{ public_id: 'lw-a', username: 'Wolf', role: 'captain' }] };
        apiClient.get.mockImplementation(apiGetFrom({ '/brackets/evt-2s': event, '/teams/me': [small] }));
        await open();
        expect(await screen.findByText('Not enough players on the roster (needs 2, has 1)')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: /Lone Wolf/ })).toBeDisabled();
    });
});

describe('PublicBracket solo sign-up', () => {
    const solo = bracketEvent({ id: 'evt-2s', teamSize: '1v1', entrants: [], viewerEntrantId: null });

    it('enters a team and has the captain pick the one player who competes', async () => {
        mockUser = { defaultProfile: player, profiles: [player] };
        apiClient.get.mockImplementation(apiGetFrom({ '/brackets/evt-2s': solo, '/teams/me': [team('t-mine', 'My Duo', player)] }));
        await open();
        fireEvent.click(await screen.findByRole('radio', { name: /My Duo/ }));
        expect(screen.getByText(/Pick who competes/)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('radio', { name: /My Duo Bee/ }));
        expect(screen.getByRole('radio', { name: /My Duo Bee/ })).toBeChecked();
    });
});
