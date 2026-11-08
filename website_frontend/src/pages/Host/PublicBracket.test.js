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

const team = (public_id, name, owner) => ({
    public_id, name, game: 'Call of Duty', my_role: 'owner', owner, members: [{}, {}],
});
const event = bracketEvent({ id: 'evt-2s', teamSize: '2v2', entrants: [], viewerEntrantId: null });
const teams = [team('t-mine', 'My Duo', player), team('t-org', 'Static Duo', org)];

const open = async () => {
    render(
        <MemoryRouter initialEntries={['/brackets/evt-2s']}>
            <Routes><Route path="/brackets/:eventId" element={<PublicBracket />} /></Routes>
        </MemoryRouter>
    );
    fireEvent.click((await screen.findAllByRole('button', { name: 'Sign up' }))[0]);
    await screen.findByText(/My Duo/, {}, { timeout: 2000 }).catch(() => {});
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
});
