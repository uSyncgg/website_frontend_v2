import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { EventEntrants } from './EventEntrants';
import { bracketEvent } from 'test/bracketFixtures';

let mockEvent;
jest.mock('./ManageEvent', () => ({ useManagedEvent: () => mockEvent }));
jest.mock('services/apiClient', () => ({ __esModule: true, default: { get: jest.fn(), post: jest.fn(), delete: jest.fn() } }));

const entrant = (id, name, payment, extra = {}) => ({
    id, name, captain: 'cap', rating: 1200, registeredAt: '2030-01-02T00:00:00Z', status: 'signed_up',
    teamId: 't', roster: ['cap', 'mate'], rosterSize: 2, teammates: ['mate'], email: 'a@b.co', answers: {}, pass: 'Std', fullyPaid: true,
    payment, ...extra,
});

const paidShare = (paidCount, players) => ({ priceCents: 1000, feeCents: 50, paidCount, totalCount: players.length, players });

const renderEntrants = () => render(<MemoryRouter><EventEntrants /></MemoryRouter>);

beforeEach(() => {
    mockEvent = bracketEvent({
        id: 'evt-paid', teamSize: '2v2', canManage: true, payments: { enabled: true, tiers: [{ name: 'Std', price: '10' }] },
        entrants: [
            entrant('e1', 'All Paid', paidShare(2, [{ username: 'cap', paid: true, paidBy: null }, { username: 'mate', paid: true, paidBy: 'cap' }])),
            entrant('e2', 'Half Paid', paidShare(1, [{ username: 'cap', paid: true, paidBy: null }, { username: 'mate', paid: false, paidBy: null }]), { status: 'pending', fullyPaid: false }),
        ],
    });
});

describe('EventEntrants payments', () => {
    it('shows who has paid and who has not', () => {
        renderEntrants();
        expect(screen.getByText('Paid', { selector: 'span' })).toBeInTheDocument();
        expect(screen.getByText('1 of 2 paid')).toBeInTheDocument();
        expect(screen.getByText(/1 not fully paid yet/)).toBeInTheDocument();
    });

    it('lists each player and who covered them in the details', () => {
        renderEntrants();
        fireEvent.click(screen.getByRole('button', { name: 'All Paid' }));
        expect(screen.getByText('2 of 2 paid ($10.50 each)')).toBeInTheDocument();
        expect(screen.getByText('@mate: paid by @cap')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Close' }));
        fireEvent.click(screen.getByRole('button', { name: 'Half Paid' }));
        expect(screen.getByText('@mate: not paid yet')).toBeInTheDocument();
    });

    it('has no payment column for free events', () => {
        mockEvent = bracketEvent({ id: 'free', teamSize: '2v2', canManage: true, entrants: [entrant('e3', 'Free Duo', undefined)] });
        renderEntrants();
        expect(screen.queryByText('Paid', { selector: 'th' })).toBeNull();
    });
});
