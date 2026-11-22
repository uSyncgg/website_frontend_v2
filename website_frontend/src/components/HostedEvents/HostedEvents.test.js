import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HostedEvents } from './HostedEvents';
import apiClient from 'services/apiClient';

let mockUser = { defaultProfile: null, profiles: [] };
jest.mock('hooks', () => ({ useCurrentUser: () => mockUser }));
jest.mock('services/apiClient', () => ({ __esModule: true, default: { get: jest.fn() } }));

const card = (over = {}) => ({
    id: 'evt-1', name: 'Friday Night 4s', eventType: 'tournament', hostProfile: 'hostpub', hostName: 'Static Gaming',
    game: 'Call of Duty', gameTitle: 'Black Ops 7', gameMode: 'Search and Destroy', format: 'single_elim',
    formatLabel: 'Single Elimination', teamSize: '4v4', startsAt: '2026-11-28T01:00:00+00:00', platform: 'console_only',
    locationType: 'online', venue: '', entryFeeCents: 500, prizeFunding: 'guaranteed', guaranteeCents: 50000,
    poolCents: 0, signedUp: 3, maxEntrants: 16, stage: 'registration', ...over,
});

const open = (path) => render(<MemoryRouter initialEntries={[path]}><HostedEvents /></MemoryRouter>);

describe('HostedEvents', () => {
    beforeEach(() => apiClient.get.mockReset());

    it("asks for this page's game and type and shows a card linking to the event", async () => {
        apiClient.get.mockResolvedValue({ data: { events: [card()], nextCursor: null } });
        open('/tournaments/call-of-duty-tournaments');

        const link = await screen.findByRole('link', { name: 'Friday Night 4s' });
        expect(link).toHaveAttribute('href', '/brackets/evt-1');
        expect(apiClient.get.mock.calls[0][0]).toBe('/brackets/discover?game=call_of_duty&type=tournament&limit=6');
        expect(screen.getByRole('link', { name: 'Static Gaming' })).toHaveAttribute('href', '/profile/hostpub');
        expect(screen.getByText('$5 / player')).toBeInTheDocument();
        expect(screen.getByText('$500 guaranteed')).toBeInTheDocument();
        expect(screen.getByText('3/16 spots')).toBeInTheDocument();
        expect(screen.getByText('Console only')).toBeInTheDocument();
        expect(screen.getByText('Registration open')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Show more' })).toBeNull();
    });

    it('loads the next page with the cursor', async () => {
        apiClient.get
            .mockResolvedValueOnce({ data: { events: [card({ id: 'evt-a', name: 'First' })], nextCursor: 'c1' } })
            .mockResolvedValueOnce({ data: { events: [card({ id: 'evt-b', name: 'Second', entryFeeCents: null, prizeFunding: null })], nextCursor: null } });
        open('/games/halo/leagues');

        fireEvent.click(await screen.findByRole('button', { name: 'Show more' }));
        expect(await screen.findByRole('link', { name: 'Second' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'First' })).toBeInTheDocument();
        expect(apiClient.get.mock.calls[1][1]).toEqual({ params: { cursor: 'c1' } });
        expect(screen.getByText('Free')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Show more' })).toBeNull();
    });

    it('invites hosts to post one when there are none', async () => {
        apiClient.get.mockResolvedValue({ data: { events: [], nextCursor: null } });
        open('/games/warzone/lans');

        expect(await screen.findByText(/No hosted LANs for Warzone yet/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Host one →' })).toHaveAttribute('href', '/host/events/new?type=lan&game=Warzone');
    });

    it('renders nothing off a leagues, LANs or tournaments page', () => {
        const { container } = open('/games/halo/wagers');
        expect(container).toBeEmptyDOMElement();
        expect(apiClient.get).not.toHaveBeenCalled();
    });
});
