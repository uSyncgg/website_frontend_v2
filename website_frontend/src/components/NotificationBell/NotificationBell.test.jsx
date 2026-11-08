import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NotificationBell } from './NotificationBell';
import { getNotifications, markNotificationsRead } from 'services/notifications';
import { getMyInvites } from 'services/teams';
import { getAdminInvites } from 'services/brackets';

jest.mock('hooks', () => ({
    useAuth: () => ({ session: { access_token: 't' } }),
    useCurrentUser: () => ({ defaultProfile: { type: 'player', username: 'Plays', public_id: 'playpub' } }),
}));
jest.mock('services/teams', () => ({ getMyInvites: jest.fn(), respondToInvite: jest.fn() }));
jest.mock('services/brackets', () => ({ getAdminInvites: jest.fn(), respondAdminInvite: jest.fn() }));
jest.mock('services/notifications', () => ({
    ...jest.requireActual('services/notifications'),
    getNotifications: jest.fn(),
    markNotificationsRead: jest.fn(),
}));

const note = (id, read = false) => ({
    id, type: 'prize_won', read, created_at: new Date().toISOString(),
    data: { event_id: 'evt', event_name: 'Summer Cup', place: 1, amount_cents: 1500 },
});

const renderBell = () => render(<MemoryRouter><NotificationBell /></MemoryRouter>);

beforeEach(() => {
    document.title = 'uSync | Home';
    getMyInvites.mockResolvedValue([]);
    getAdminInvites.mockResolvedValue([]);
    markNotificationsRead.mockResolvedValue([]);
});

describe('NotificationBell', () => {
    it('puts the unread count in the browser tab title', async () => {
        getNotifications.mockResolvedValue([note('a'), note('b'), note('c', true)]);
        renderBell();
        await waitFor(() => expect(document.title).toBe('(2) uSync | Home'));
    });

    it('keeps the count when a page changes the title', async () => {
        getNotifications.mockResolvedValue([note('a')]);
        renderBell();
        await waitFor(() => expect(document.title).toBe('(1) uSync | Home'));
        document.title = 'uSync | Bank';
        await waitFor(() => expect(document.title).toBe('(1) uSync | Bank'));
    });

    it('has no count in the title when everything is read', async () => {
        getNotifications.mockResolvedValue([note('a', true)]);
        renderBell();
        await screen.findByRole('button', { name: 'Notifications' });
        expect(document.title).toBe('uSync | Home');
    });

    it('marks every notification read with one click and clears the count', async () => {
        getNotifications.mockResolvedValue([note('a'), note('b')]);
        // Like the server: once marked, later fetches come back read.
        markNotificationsRead.mockImplementation(async () => {
            getNotifications.mockResolvedValue([note('a', true), note('b', true)]);
            return [];
        });
        renderBell();
        await waitFor(() => expect(document.title).toBe('(2) uSync | Home'));
        fireEvent.click(screen.getByRole('button', { name: 'Notifications, 2 new' }));
        fireEvent.click(screen.getByRole('button', { name: 'Mark all as read' }));
        expect(markNotificationsRead).toHaveBeenCalledWith(null);
        await waitFor(() => expect(document.title).toBe('uSync | Home'));
        expect(screen.queryByRole('button', { name: 'Mark all as read' })).toBeNull();
    });

    it('does not mark anything read just by opening the bell', async () => {
        getNotifications.mockResolvedValue([note('a')]);
        renderBell();
        await waitFor(() => expect(document.title).toBe('(1) uSync | Home'));
        fireEvent.click(screen.getByRole('button', { name: 'Notifications, 1 new' }));
        expect(markNotificationsRead).not.toHaveBeenCalled();
        expect(document.title).toBe('(1) uSync | Home');
    });

    it('marks a single notification read when you open it', async () => {
        getNotifications.mockResolvedValue([note('a'), note('b')]);
        renderBell();
        await waitFor(() => expect(document.title).toBe('(2) uSync | Home'));
        fireEvent.click(screen.getByRole('button', { name: 'Notifications, 2 new' }));
        fireEvent.click(screen.getAllByRole('link', { name: /You won \$15\.00/ })[0]);
        expect(markNotificationsRead).toHaveBeenCalledWith(['a']);
        await waitFor(() => expect(document.title).toBe('(1) uSync | Home'));
    });
});
