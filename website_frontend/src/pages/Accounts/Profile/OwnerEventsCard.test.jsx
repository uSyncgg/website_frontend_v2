import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { OwnerEventsCard } from './ProfileSections';
import { setMockViewer } from 'services/hostEventsMock';

// The components index pulls in the map library, which Jest can't load; the card's frame is all that's needed.
jest.mock('components', () => ({
    ProfileCard: ({ title, action, children }) => <section><h2>{title}</h2>{action}{children}</section>,
}));
const own = { type: 'host', username: 'HostCo', public_id: 'hostpub', bracket_hosting: true };
let mockUser = { profiles: [own], defaultProfile: own, switchProfile: jest.fn() };
jest.mock('hooks', () => ({ useCurrentUser: () => mockUser }));

const renderCard = (profile) => render(<MemoryRouter><OwnerEventsCard profile={profile} /></MemoryRouter>);

describe('OwnerEventsCard', () => {
    beforeEach(() => localStorage.clear());

    it("lists a player's entered events and links to the Entered tab", () => {
        setMockViewer('evt-friday-1v1s', 'e1-zyphr');
        renderCard({ type: 'player', public_id: 'playpub' });
        expect(screen.getByText("Events you're entered in")).toBeInTheDocument();
        expect(screen.getByText('uSync Friday Night 1v1s')).toBeInTheDocument();
        expect(screen.getByText(/Entered as Zyphr/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Event Dashboard' })).toHaveAttribute('href', '/dashboard?tab=entered');
    });

    it("lists a host's events with Manage links and links to the Hosting tab", () => {
        renderCard({ type: 'host', public_id: 'hostpub' });
        expect(screen.getByText("Events you're hosting")).toBeInTheDocument();
        expect(screen.getAllByRole('link', { name: 'Manage' })[0]).toHaveAttribute('href', expect.stringMatching(/^\/host\/events\//));
        expect(screen.getByRole('link', { name: 'Event Dashboard' })).toHaveAttribute('href', '/dashboard?tab=hosting');
        expect(screen.getByRole('link', { name: '+ Add event' })).toHaveAttribute('href', '/host/events/new?profile=hostpub');
    });

    it("doesn't offer + Add event on a player profile", () => {
        renderCard({ type: 'player', public_id: 'playpub' });
        expect(screen.queryByText('+ Add event')).toBeNull();
    });
});
