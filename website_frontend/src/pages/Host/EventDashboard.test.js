import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { EventDashboard } from './EventDashboard';
import apiClient from 'services/apiClient';
import { bracketSummary, page } from 'test/bracketFixtures';

const host = { type: 'host', username: 'HostCo', public_id: 'hostpub', bracket_hosting: true };
const player = { type: 'player', username: 'Plays', public_id: 'playpub', bracket_hosting: true };
let mockUser;
jest.mock('hooks', () => ({ useCurrentUser: () => mockUser, useAuth: () => ({ session: null }) }));
jest.mock('services/apiClient', () => ({ __esModule: true, default: { get: jest.fn() } }));

// The list endpoints return pages of summaries.
const routes = (map) => (path) => (path in map ? Promise.resolve({ data: map[path] }) : Promise.reject({ response: { status: 404 } }));

const entered = bracketSummary();
const hosted = bracketSummary({ id: 'evt-cup', name: 'Valorant Community Cup', canManage: true, isHost: true, viewerEntrantId: null, viewerEntrantName: null, openIssues: 2 });

const renderAt = (url = '/dashboard') => render(<MemoryRouter initialEntries={[url]}><EventDashboard /></MemoryRouter>);

describe('EventDashboard', () => {
    beforeEach(() => apiClient.get.mockImplementation(routes({ '/brackets/entered': page([entered]), '/brackets/hosting': page([hosted]) })));

    it('opens a player on Entered, listing the events they signed up for', async () => {
        mockUser = { defaultProfile: player, profiles: [player], switchProfile: jest.fn() };
        renderAt();
        expect(screen.getByRole('button', { name: 'Entered' })).toHaveAttribute('aria-pressed', 'true');
        expect(await screen.findByText('uSync Friday Night 1v1s')).toBeInTheDocument();
        expect(screen.getByText('Zyphr')).toBeInTheDocument();
        expect(screen.queryByText('Valorant Community Cup')).toBeNull();
    });

    it('shows an empty Entered tab when they have not signed up for anything', async () => {
        apiClient.get.mockImplementation(routes({ '/brackets/entered': page([]), '/brackets/hosting': page([]) }));
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

    it('opens a host on Hosting with the queue count, and still shows the events they entered', async () => {
        mockUser = { defaultProfile: host, profiles: [player, host], switchProfile: jest.fn() };
        renderAt();
        expect(screen.getByRole('button', { name: 'Hosting' })).toHaveAttribute('aria-pressed', 'true');
        expect(await screen.findByText('Valorant Community Cup')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Queue (2)' })).toHaveAttribute('href', '/host/events/evt-cup/queue');
        expect(screen.getByRole('link', { name: /Create event/ })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Entered' }));
        expect(await screen.findByText('Zyphr')).toBeInTheDocument();
    });

    it('loads more when the server says there is another page', async () => {
        mockUser = { defaultProfile: player, profiles: [player], switchProfile: jest.fn() };
        apiClient.get.mockImplementation((path, opts) => Promise.resolve({
            data: opts?.params?.cursor ? page([bracketSummary({ id: 'evt-2', name: 'Second Page Cup' })]) : page([entered], 'cur-1'),
        }));
        renderAt();
        fireEvent.click(await screen.findByRole('button', { name: 'Load more' }));
        expect(await screen.findByText('Second Page Cup')).toBeInTheDocument();
    });
});

describe('EventDashboard archive', () => {
    const played = bracketSummary({ id: 'evt-old-played', name: 'Old Played Cup', startsAt: '2029-01-01T19:00:00Z', stage: 'complete', winner: 'Zyphr', viewerPlace: 1 });
    const ran = bracketSummary({ id: 'evt-old-hosted', name: 'Old Hosted Cup', canManage: true, isHost: true, viewerEntrantId: null, viewerEntrantName: null, startsAt: '2029-06-01T19:00:00Z', stage: 'complete', winner: 'Kova' });
    const live = bracketSummary({ id: 'evt-live', name: 'Live Cup', stage: 'live', viewerMatch: { id: 'r0m0', opponent: 'Kova' } });

    beforeEach(() => {
        mockUser = { defaultProfile: host, profiles: [player, host], switchProfile: jest.fn() };
        apiClient.get.mockImplementation(routes({ '/brackets/entered': page([played, live]), '/brackets/hosting': page([ran]) }));
    });

    it('moves finished events to Archived, filterable by hosted and played', async () => {
        renderAt('/dashboard?tab=archived');
        expect(await screen.findByText('Old Played Cup')).toBeInTheDocument();
        expect(screen.getByText('Old Hosted Cup')).toBeInTheDocument();
        expect(screen.queryByText('Live Cup')).toBeNull();
        expect(screen.getByText(/\(1st\)/)).toBeInTheDocument();
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
