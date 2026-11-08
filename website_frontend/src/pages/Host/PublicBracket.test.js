import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('PublicBracket paid sign-up', () => {
    const mate = { public_id: 'matepub', username: 'Mate' };
    const me = { public_id: 'playpub', username: 'Plays' };
    const paidEvent = bracketEvent({
        id: 'evt-paid', teamSize: '2v2', entrants: [], viewerEntrantId: null, refundable: true,
        payments: { enabled: true, tiers: [{ name: 'Std', price: '10' }] },
    });
    const duo = { public_id: 't-duo', name: 'Paid Duo', game: 'Call of Duty', my_role: 'owner', owner: player, members: [me, mate] };
    const wallet = (balanceCents) => ({ balanceCents });

    const openPaid = async (balanceCents) => {
        mockUser = { defaultProfile: player, profiles: [player] };
        apiClient.get.mockImplementation(apiGetFrom({ '/brackets/evt-paid': paidEvent, '/teams/me': [duo], '/wallet': wallet(balanceCents) }));
        apiClient.post = jest.fn().mockResolvedValue({ data: { ...paidEvent, viewerEntrantId: 'x' } });
        render(
            <MemoryRouter initialEntries={['/brackets/evt-paid']}>
                <Routes><Route path="/brackets/:eventId" element={<PublicBracket />} /></Routes>
            </MemoryRouter>
        );
        fireEvent.click((await screen.findAllByRole('button', { name: 'Sign up' }))[0]);
        fireEvent.click(await screen.findByRole('radio', { name: /Paid Duo/ }));
        fireEvent.change(screen.getByLabelText('Contact email'), { target: { value: 'a@b.co' } });
    };

    it('charges you your own share and warns when your balance is short', async () => {
        await openPaid(500);
        expect(await screen.findByText('You pay now')).toBeInTheDocument();
        expect(screen.getAllByText('$10.50').length).toBeGreaterThan(0);
        expect(screen.getByText(/You need \$5\.50 more/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Pay $10.50 and sign up' })).toBeDisabled();
    });

    it('lets you pay for a teammate and sends who you covered', async () => {
        await openPaid(5000);
        fireEvent.click(await screen.findByRole('checkbox', { name: /Mate/ }));
        expect(screen.getByRole('button', { name: 'Pay $21.00 and sign up' })).toBeEnabled();
        fireEvent.click(screen.getByRole('button', { name: 'Pay $21.00 and sign up' }));
        await waitFor(() => expect(apiClient.post).toHaveBeenCalled());
        expect(apiClient.post.mock.calls[0][1]).toMatchObject({ teamId: 't-duo', pass: 'Std', payFor: ['Mate'] });
    });

    it('only charges your own share when you cover nobody', async () => {
        await openPaid(5000);
        fireEvent.click(await screen.findByRole('button', { name: 'Pay $10.50 and sign up' }));
        await waitFor(() => expect(apiClient.post).toHaveBeenCalled());
        expect(apiClient.post.mock.calls[0][1].payFor).toEqual([]);
    });
});
