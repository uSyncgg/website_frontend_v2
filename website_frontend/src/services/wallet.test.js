import { depositFee, parseDollars, formatMoney, startDeposit, newIdempotencyKey } from './wallet';
import apiClient from './apiClient';

jest.mock('./apiClient', () => ({ __esModule: true, default: { get: jest.fn(), post: jest.fn() } }));

describe('wallet money helpers', () => {
    it('adds a 5% fee rounded half up to the cent, like the backend', () => {
        expect(depositFee(500)).toBe(25);
        expect(depositFee(1234)).toBe(62);
        expect(depositFee(1230)).toBe(62);
        expect(depositFee(1229)).toBe(61);
    });

    it('reads dollar amounts into cents', () => {
        expect(parseDollars('$12.34')).toBe(1234);
        expect(parseDollars('12.3')).toBe(1230);
        expect(parseDollars('1,000')).toBe(100000);
        expect(parseDollars('5')).toBe(500);
        expect(parseDollars('12.345')).toBeNull();
        expect(parseDollars('abc')).toBeNull();
        expect(parseDollars('')).toBeNull();
    });

    it('formats cents as dollars', () => {
        expect(formatMoney(123456)).toBe('$1,234.56');
        expect(formatMoney(-600)).toBe('-$6.00');
        expect(formatMoney(0)).toBe('$0.00');
    });
});

describe('starting a deposit', () => {
    beforeEach(() => apiClient.post.mockReset());

    it('retries a lost request with the same idempotency key, so the backend makes one deposit', async () => {
        apiClient.post
            .mockRejectedValueOnce(new Error('Network Error'))
            .mockResolvedValueOnce({ data: { depositId: 'd1', clientSecret: 's', amountCents: 1000, feeCents: 50, totalCents: 1050 } });
        const key = newIdempotencyKey();
        const deposit = await startDeposit(1000, key);
        expect(deposit.depositId).toBe('d1');
        expect(apiClient.post).toHaveBeenCalledTimes(2);
        expect(apiClient.post.mock.calls.map(c => c[1].idempotencyKey)).toEqual([key, key]);
    });

    it("doesn't retry an answer like 'over your daily limit'", async () => {
        apiClient.post.mockRejectedValueOnce({ response: { status: 409, data: { detail: 'limit' } } });
        await expect(startDeposit(1000, newIdempotencyKey())).rejects.toBeTruthy();
        expect(apiClient.post).toHaveBeenCalledTimes(1);
    });
});
