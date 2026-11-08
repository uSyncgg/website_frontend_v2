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
