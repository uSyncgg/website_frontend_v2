import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { EventDashboard } from './EventDashboard';
import apiClient from 'services/apiClient';
import { bracketEvent, apiGetFrom } from 'test/bracketFixtures';

const host = { type: 'host', username: 'HostCo', public_id: 'hostpub', bracket_hosting: true };
const player = { type: 'player', username: 'Plays', public_id: 'playpub', bracket_hosting: true };
let mockUser;
jest.mock('hooks', () => ({ useCurrentUser: () => mockUser, useAuth: () => ({ session: null }) }));
jest.mock('services/apiClient', () => ({ __esModule: true, default: { get: jest.fn() } }));

const entered = bracketEvent();
const hosted = bracketEvent({ id: 'evt-cup', name: 'Valorant Community Cup', canManage: true, viewerEntrantId: null, entrants: [] });

const renderAt = (url = '/dashboard') => render(<MemoryRouter initialEntries={[url]}><EventDashboard /></MemoryRouter>);

describe('EventDashboard', () => {
    beforeEach(() => apiClient.get.mockImplementation(apiGetFrom({ '/brackets/entered': [entered], '/brackets/hosting': [hosted] })));

    it('opens a player on Entered, listing the events they signed up for', async () => {
        mockUser = { defaultProfile: player, profiles: [player], switchProfile: jest.fn() };
        renderAt();
        expect(screen.getByRole('button', { name: 'Entered' })).toHaveAttribute('aria-pressed', 'true');
        expect(await screen.findByText('uSync Friday Night 1v1s')).toBeInTheDocument();
        expect(screen.getByText('Zyphr')).toBeInTheDocument();
        expect(screen.queryByText('Valorant Community Cup')).toBeNull();
    });

    it('shows an empty Entered tab when they have not signed up for anything', async () => {
        apiClient.get.mockImplementation(apiGetFrom({ '/brackets/entered': [], '/brackets/hosting': [] }));
        mockUser = { defaultProfile: player, profiles: [player], switchProfile: jest.fn() };
        renderAt();
        expect(await screen.findByText("You're not entered in any events")).toBeInTheDocument();
    });

    it('offers to switch to Host on the Hosting tab from the player view', () => {
        mockUser = { defaultProfile: player, profiles: [player, host], switchProfile: jest.fn().mockResolvedValue() };
        renderAt();
        fireEvent.click(screen.getByRole('button', { name: 'Hosting' }));
        fireEvent.click(screen.getByRole('button', { name: 'Switch to Host' }));
        expect(mockUser.switchProfile).toHaveBeenCalledWith('host');
    });

    it('points a player with no host profile to adding one', () => {
        mockUser = { defaultProfile: player, profiles: [player], switchProfile: jest.fn() };
        renderAt('/dashboard?tab=hosting');
        expect(screen.getByRole('link', { name: 'Add a host profile' })).toHaveAttribute('href', '/settings/profile/add/host');
    });

    it('opens a host on Hosting, and still shows the events they entered', async () => {
        mockUser = { defaultProfile: host, profiles: [player, host], switchProfile: jest.fn() };
        renderAt();
        expect(screen.getByRole('button', { name: 'Hosting' })).toHaveAttribute('aria-pressed', 'true');
        expect(await screen.findByText('Valorant Community Cup')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Create event/ })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Entered' }));
        expect(await screen.findByText('Zyphr')).toBeInTheDocument();
    });
});

describe('EventDashboard archive', () => {
    const two = [
        { id: 'e1', name: 'Zyphr', captain: 'Zyphr', rating: 1200, registeredAt: '2030-01-02T00:00:00Z', status: 'signed_up', teamId: null, roster: [], rosterSize: 0, teammates: [] },
        { id: 'e2', name: 'Kova', captain: 'Kova', rating: 1200, registeredAt: '2030-01-03T00:00:00Z', status: 'signed_up', teamId: null, roster: [], rosterSize: 0, teammates: [] },
    ];
    const finished = (overrides) => bracketEvent({
        entrants: two,
        bracket: { published: true, format: 'single_elim', seeds: ['e1', 'e2'], results: { r0m0: { a: 'e1', b: 'e2', scoreA: 2, scoreB: 0 } } },
        ...overrides,
    });
    const played = finished({ id: 'evt-old-played', name: 'Old Played Cup', startsAt: '2029-01-01T19:00:00Z' });
    const ran = finished({ id: 'evt-old-hosted', name: 'Old Hosted Cup', canManage: true, isHost: true, viewerEntrantId: null, startsAt: '2029-06-01T19:00:00Z' });
    const live = bracketEvent({ id: 'evt-live', name: 'Live Cup', entrants: two, bracket: { published: true, format: 'single_elim', seeds: ['e1', 'e2'], results: {} } });

    beforeEach(() => {
        mockUser = { defaultProfile: host, profiles: [player, host], switchProfile: jest.fn() };
        apiClient.get.mockImplementation(apiGetFrom({ '/brackets/entered': [played, live], '/brackets/hosting': [ran] }));
    });

    it('moves finished events to Archived, filterable by hosted and played', async () => {
        renderAt('/dashboard?tab=archived');
        expect(await screen.findByText('Old Played Cup')).toBeInTheDocument();
        expect(screen.getByText('Old Hosted Cup')).toBeInTheDocument();
        expect(screen.queryByText('Live Cup')).toBeNull();
        expect(screen.getAllByText('Zyphr').length).toBeGreaterThan(0);
        fireEvent.click(screen.getByRole('radio', { name: 'Hosted' }));
        expect(screen.queryByText('Old Played Cup')).toBeNull();
        expect(screen.getByRole('link', { name: 'Duplicate' })).toHaveAttribute('href', '/host/events/new?from=evt-old-hosted');
        fireEvent.click(screen.getByRole('radio', { name: 'Played' }));
        expect(screen.queryByText('Old Hosted Cup')).toBeNull();
        expect(screen.getByText('Old Played Cup')).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Duplicate' })).toBeNull();
    });

    it('sorts newest or oldest first', async () => {
        renderAt('/dashboard?tab=archived');
        await screen.findByText('Old Played Cup');
        const names = () => screen.getAllByRole('heading', { level: 2 }).map(h => h.textContent).filter(t => t.startsWith('Old'));
        expect(names()).toEqual(['Old Hosted Cup', 'Old Played Cup']);
        fireEvent.change(screen.getByLabelText('Sort'), { target: { value: 'oldest' } });
        expect(names()).toEqual(['Old Played Cup', 'Old Hosted Cup']);
    });

    it('keeps finished events off Entered, and links your live match', async () => {
        renderAt('/dashboard?tab=entered');
        expect(await screen.findByText('Live Cup')).toBeInTheDocument();
        expect(screen.queryByText('Old Played Cup')).toBeNull();
        expect(screen.getByRole('link', { name: 'Your match vs Kova' })).toHaveAttribute('href', '/brackets/evt-live/matches/r0m0');
    });
});
