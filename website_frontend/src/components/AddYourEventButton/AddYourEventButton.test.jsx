import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AddYourEventButton } from './AddYourEventButton';

let mockView = null;
jest.mock('hooks', () => ({ useCurrentUser: () => ({ defaultProfile: mockView }) }));

const renderAt = (url, props = {}) => render(
    <MemoryRouter initialEntries={[url]}>
        <AddYourEventButton {...props} />
    </MemoryRouter>
);

describe('AddYourEventButton', () => {
    it('shows in the Host view, pre-filled from the page', () => {
        mockView = { type: 'host', public_id: 'hostpub', bracket_hosting: true };
        renderAt('/games/halo/lans');
        const link = screen.getByRole('link', { name: /Add your LAN/ });
        expect(link).toHaveAttribute('href', '/host/events/new?profile=hostpub&type=lan&game=Halo');
    });

    it('is hidden for players, venues, hosts without bracket hosting, and signed-out visitors', () => {
        for (const view of [
            { type: 'player', public_id: 'p', bracket_hosting: true },
            { type: 'venue', public_id: 'v', bracket_hosting: true },
            { type: 'host', public_id: 'h', bracket_hosting: false },
            null,
        ]) {
            mockView = view;
            const { unmount } = renderAt('/games/halo/leagues');
            expect(screen.queryByRole('link')).toBeNull();
            unmount();
        }
    });
});
