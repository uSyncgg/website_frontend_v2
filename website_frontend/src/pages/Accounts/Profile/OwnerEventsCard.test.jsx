import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { OwnerEventsCard } from './ProfileSections';
import apiClient from 'services/apiClient';
import { bracketEvent, apiGetFrom } from 'test/bracketFixtures';

// The components index pulls in the map library, which Jest can't load; the card's frame is all that's needed.
jest.mock('components', () => ({
    ProfileCard: ({ title, action, children }) => <section><h2>{title}</h2>{action}{children}</section>,
}));
const own = { type: 'host', username: 'HostCo', public_id: 'hostpub', bracket_hosting: true };
let mockUser = { profiles: [own], defaultProfile: own, switchProfile: jest.fn() };
jest.mock('hooks', () => ({ useCurrentUser: () => mockUser }));
jest.mock('services/apiClient', () => ({ __esModule: true, default: { get: jest.fn() } }));

const renderCard = (profile) => render(<MemoryRouter><OwnerEventsCard profile={profile} /></MemoryRouter>);

describe('OwnerEventsCard', () => {
    beforeEach(() => apiClient.get.mockImplementation(apiGetFrom({
        '/brackets/entered': [bracketEvent()],
        '/brackets/hosting': [bracketEvent({ id: 'evt-cup', name: 'Cup', canManage: true, viewerEntrantId: null })],
    })));

    it("lists a player's entered events and links to the Entered tab", async () => {
        renderCard({ type: 'player', public_id: 'playpub' });
        expect(screen.getByText("Events you're entered in")).toBeInTheDocument();
        expect(await screen.findByText('uSync Friday Night 1v1s')).toBeInTheDocument();
        expect(screen.getByText(/Entered as Zyphr/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Event Dashboard' })).toHaveAttribute('href', '/dashboard?tab=entered');
    });

    it("lists a host's events with Manage links and links to the Hosting tab", async () => {
        renderCard({ type: 'host', public_id: 'hostpub' });
        expect(screen.getByText("Events you're hosting")).toBeInTheDocument();
        expect((await screen.findAllByRole('link', { name: 'Manage' }))[0]).toHaveAttribute('href', expect.stringMatching(/^\/host\/events\//));
        expect(screen.getByRole('link', { name: 'Event Dashboard' })).toHaveAttribute('href', '/dashboard?tab=hosting');
        expect(screen.getByRole('link', { name: '+ Add event' })).toHaveAttribute('href', '/host/events/new?profile=hostpub');
    });

    it("doesn't offer + Add event on a player profile", () => {
        renderCard({ type: 'player', public_id: 'playpub' });
        expect(screen.queryByText('+ Add event')).toBeNull();
    });
});
