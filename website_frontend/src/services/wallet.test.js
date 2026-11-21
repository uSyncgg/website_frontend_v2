import { depositFee, parseDollars, formatMoney } from './wallet';

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
