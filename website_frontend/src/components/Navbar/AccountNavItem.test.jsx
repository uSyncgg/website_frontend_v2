import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AccountNavItem } from './AccountNavItem';

const host = { type: 'host', username: 'HostCo', public_id: 'hostpub', bracket_hosting: true };
const player = { type: 'player', username: 'Plays', public_id: 'playpub', bracket_hosting: true };
let mockUser;
jest.mock('hooks', () => ({ useCurrentUser: () => mockUser }));

const renderMenu = () => render(<MemoryRouter><AccountNavItem /></MemoryRouter>);

describe('AccountNavItem', () => {
    beforeEach(() => {
        mockUser = { status: 'complete', defaultProfile: host, profiles: [player, host], switchProfile: jest.fn(), logout: jest.fn() };
    });

    it('opens the account menu from the avatar, without "Viewing as"', () => {
        renderMenu();
        fireEvent.click(screen.getByRole('button', { name: 'Account menu' }));
        expect(screen.getByRole('menuitem', { name: 'Profile' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Settings' })).toBeInTheDocument();
        expect(screen.queryByText('Viewing as')).toBeNull();
        expect(screen.queryByText('Profile Settings')).toBeNull();
    });

    it('opens only "Viewing as" from the view label', () => {
        renderMenu();
        fireEvent.click(screen.getByRole('button', { name: /switch view/ }));
        expect(screen.getByText('Viewing as')).toBeInTheDocument();
        expect(screen.getByRole('menuitemradio', { name: 'Player' })).toBeInTheDocument();
        expect(screen.getByRole('menuitemradio', { name: 'Host' })).toHaveAttribute('aria-checked', 'true');
        expect(screen.queryByRole('menuitem', { name: 'Settings' })).toBeNull();
        expect(screen.queryByRole('menuitem', { name: 'Profile' })).toBeNull();
    });

    it('opening one menu closes the other', () => {
        renderMenu();
        fireEvent.click(screen.getByRole('button', { name: 'Account menu' }));
        fireEvent.click(screen.getByRole('button', { name: /switch view/ }));
        expect(screen.queryByRole('menuitem', { name: 'Settings' })).toBeNull();
        expect(screen.getByText('Viewing as')).toBeInTheDocument();
    });

    it('shows a plain label when there is only one profile to view as', () => {
        mockUser = { ...mockUser, defaultProfile: player, profiles: [player] };
        renderMenu();
        expect(screen.queryByRole('button', { name: /switch view/ })).toBeNull();
        expect(screen.getByText('Player')).toBeInTheDocument();
    });
});
