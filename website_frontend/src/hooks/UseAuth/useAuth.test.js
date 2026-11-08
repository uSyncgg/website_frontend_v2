import { renderHook, waitFor } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

const session = { access_token: 't', user: { id: 'u1' } };
let mockGetSession;

jest.mock('services/supabaseClient', () => ({
    supabase: { auth: { getSession: (...args) => mockGetSession(...args), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) } },
}));

import { useAuth, resetAuthMemory } from './useAuth';
import { RequireCompleteProfile } from 'components/RequiredCompleteProfile/RequiredCompleteProfile';

describe('useAuth', () => {
    beforeEach(() => {
        resetAuthMemory();
        mockGetSession = () => Promise.resolve({ data: { session } });
    });

    it('is loading on the first mount, then signed in', async () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.loading).toBe(true);
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.isLoggedIn).toBe(true);
    });

    it('starts signed in, not loading, on later mounts so pages never flash blank', async () => {
        const first = renderHook(() => useAuth());
        await waitFor(() => expect(first.result.current.loading).toBe(false));
        first.unmount();

        const second = renderHook(() => useAuth());
        expect(second.result.current.loading).toBe(false);
        expect(second.result.current.isLoggedIn).toBe(true);
    });
});

describe('RequireCompleteProfile while the session is checked', () => {
    it('shows the dark page background instead of nothing', () => {
        resetAuthMemory();
        mockGetSession = () => new Promise(() => {});
        const { container } = render(
            <MemoryRouter initialEntries={['/bank']}>
                <Routes><Route path="/bank" element={<RequireCompleteProfile />}><Route index element={<p>Bank</p>} /></Route></Routes>
            </MemoryRouter>
        );
        expect(container.querySelector('.standardContainer')).not.toBeNull();
        expect(screen.queryByText('Bank')).toBeNull();
    });
});
