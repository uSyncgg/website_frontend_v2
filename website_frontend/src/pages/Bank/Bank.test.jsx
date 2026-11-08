import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Bank } from './Bank';
import { parseDollars, depositFeeCents, formatMoney } from 'services/bank';
import apiClient from 'services/apiClient';

jest.mock('services/apiClient', () => ({ __esModule: true, default: { get: jest.fn(), post: jest.fn() } }));

const wallet = {
    balanceCents: 4200, pendingWithdrawalCents: 0, minDepositCents: 500, minWithdrawalCents: 500,
    maxDepositCents: 500000, depositFeePercent: 5, payoutDays: 30, depositsEnabled: true,
};
const transactions = [
    { id: 't1', type: 'entry_fee', status: 'completed', amountCents: -1050, feeCents: 50, description: 'Entry: Summer Cup', eventId: 'abc123', createdAt: '2026-11-01T12:00:00Z' },
    { id: 't2', type: 'deposit', status: 'completed', amountCents: 5000, feeCents: 250, chargedCents: 5250, description: 'Deposit', createdAt: '2026-10-30T12:00:00Z' },
    { id: 't4', type: 'prize', status: 'completed', amountCents: 2500, feeCents: 0, description: 'Prize: 1st place - Summer Cup', eventId: 'abc123', createdAt: '2026-11-03T12:00:00Z' },
    { id: 't3', type: 'withdrawal', status: 'pending', amountCents: -1000, feeCents: 0, description: 'Withdrawal', availableOn: '2026-12-01T12:00:00Z', createdAt: '2026-11-02T12:00:00Z' },
];

const renderBank = () => render(<MemoryRouter><Bank /></MemoryRouter>);

beforeEach(() => {
    apiClient.get.mockImplementation((url) => {
        if (url === '/wallet') return Promise.resolve({ data: wallet });
        if (url === '/wallet/years') return Promise.resolve({ data: [2026] });
        if (url === '/wallet/tax-summary') return Promise.resolve({ data: { year: 2026, prizeWinningsCents: 2500, hostEarningsCents: 0, netEntryFeesCents: 1050, depositFeesCents: 250, withdrawalsPaidCents: 0 } });
        if (url.endsWith('/receipt')) return Promise.resolve({ data: { receiptNumber: 'USY-ABC12345', type: 'entry_fee', status: 'completed', description: 'Entry: Summer Cup', date: '2026-11-01T12:00:00Z', lines: [{ label: 'Pass price', cents: 1000 }, { label: 'uSync fee (5%)', cents: 50 }], totalCents: 1050, direction: 'debit', email: 'a@b.co' } });
        return Promise.resolve({ data: transactions });
    });
    apiClient.post.mockResolvedValue({ data: { ...wallet, balanceCents: 9200 } });
});

describe('bank helpers', () => {
    it('parses dollars to cents and rejects bad input', () => {
        expect(parseDollars('25')).toBe(2500);
        expect(parseDollars('$19.99')).toBe(1999);
        expect(parseDollars('1.005')).toBeNull();
        expect(parseDollars('0')).toBeNull();
        expect(parseDollars('-5')).toBeNull();
        expect(parseDollars('abc')).toBeNull();
    });

    it('charges a 5% deposit fee', () => {
        expect(depositFeeCents(2000)).toBe(100);
        expect(depositFeeCents(500)).toBe(25);
        expect(formatMoney(2125)).toBe('$21.25');
    });
});

describe('Bank page', () => {
    it('shows the balance and history, and filters entries', async () => {
        renderBank();
        expect(await screen.findByText('$42.00')).toBeInTheDocument();
        expect(await screen.findByText('Entry: Summer Cup')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Entries' }));
        expect(screen.getByText('Entry: Summer Cup')).toBeInTheDocument();
        expect(screen.queryByText('Withdrawal')).not.toBeInTheDocument();
    });

    it('blocks deposits under $5 and shows the 5% fee', async () => {
        renderBank();
        await screen.findByText('$42.00');
        fireEvent.click(screen.getByRole('button', { name: 'Deposit' }));
        const input = screen.getByLabelText('Amount (USD)');

        fireEvent.change(input, { target: { value: '4.99' } });
        expect(screen.getByRole('alert')).toHaveTextContent('The minimum deposit is $5.00');
        expect(screen.getByRole('button', { name: /^Add/ })).toBeDisabled();

        fireEvent.change(input, { target: { value: '20' } });
        expect(screen.getByText('$21.00')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Add $20.00' }));
        await waitFor(() => expect(apiClient.post).toHaveBeenCalledWith('/wallet/deposits', { amount: 20 }));
    });

    it('blocks withdrawals under $5 or over the balance', async () => {
        renderBank();
        await screen.findByText('$42.00');
        fireEvent.click(screen.getByRole('button', { name: 'Withdraw' }));
        const input = screen.getByLabelText('Amount (USD)');

        fireEvent.change(input, { target: { value: '4' } });
        expect(screen.getByRole('alert')).toHaveTextContent('The minimum withdrawal is $5.00');

        fireEvent.change(input, { target: { value: '50' } });
        expect(screen.getByRole('alert')).toHaveTextContent('up to $42.00');

        fireEvent.change(input, { target: { value: '10' } });
        fireEvent.click(screen.getByRole('button', { name: 'Withdraw $10.00' }));
        await waitFor(() => expect(apiClient.post).toHaveBeenCalledWith('/wallet/withdrawals', { amount: 10 }));
    });
});

describe('Bank receipts, winnings and exports', () => {
    it('lists prizes under Winnings', async () => {
        renderBank();
        await screen.findByText('Prize: 1st place - Summer Cup');
        fireEvent.click(screen.getByRole('button', { name: 'Winnings' }));
        expect(screen.getByText('Prize: 1st place - Summer Cup')).toBeInTheDocument();
        expect(screen.queryByText('Entry: Summer Cup')).not.toBeInTheDocument();
    });

    it('opens a receipt with its line items and total', async () => {
        renderBank();
        await screen.findByText('Entry: Summer Cup');
        fireEvent.click(screen.getByRole('button', { name: 'Receipt for Entry: Summer Cup' }));
        expect(await screen.findByText('USY-ABC12345')).toBeInTheDocument();
        expect(screen.getByText('Pass price')).toBeInTheDocument();
        expect(screen.getByText('uSync fee (5%)')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Print/ })).toBeInTheDocument();
    });

    it('shows the tax summary for the year and offers CSV downloads', async () => {
        renderBank();
        expect(await screen.findByText('Prize winnings')).toBeInTheDocument();
        expect(screen.getByText('$25.00')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /2026 history \(CSV\)/ })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /2026 tax summary \(CSV\)/ })).toBeInTheDocument();
    });
});
