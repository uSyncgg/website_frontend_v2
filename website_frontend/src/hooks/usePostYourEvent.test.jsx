import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { usePostYourEvent } from './usePostYourEvent';
import { HostRequiredNotice } from 'components/HostRequiredNotice/HostRequiredNotice';

const host = { type: 'host', username: 'HostCo', public_id: 'hostpub', bracket_hosting: true };
const player = { type: 'player', username: 'Plays', public_id: 'playpub', bracket_hosting: true };
let mockUser;
jest.mock('hooks/UseAuth/CurrentUserContext', () => ({ useCurrentUser: () => mockUser }));

let post;
const Probe = () => {
    post = usePostYourEvent();
    return null;
};

const renderAt = () => render(
    <MemoryRouter initialEntries={['/']}>
        <HostRequiredNotice />
        <Probe />
        <Routes>
            <Route path="/" element={<p>home</p>} />
            <Route path="/host/events/new" element={<p>event form</p>} />
        </Routes>
    </MemoryRouter>
);

describe('usePostYourEvent', () => {
    it('takes a host straight to the event form', async () => {
        mockUser = { status: 'complete', profiles: [host], defaultProfile: host, switchProfile: jest.fn() };
        renderAt();
        await act(() => post());
        expect(screen.getByText('event form')).toBeInTheDocument();
        expect(mockUser.switchProfile).not.toHaveBeenCalled();
    });

    it('switches to the host view first when viewing as another profile', async () => {
        mockUser = { status: 'complete', profiles: [player, host], defaultProfile: player, switchProfile: jest.fn().mockResolvedValue() };
        renderAt();
        await act(() => post());
        expect(mockUser.switchProfile).toHaveBeenCalledWith('host');
        expect(screen.getByText('event form')).toBeInTheDocument();
    });

    it('shows the popup when the account has no host profile', async () => {
        mockUser = { status: 'complete', profiles: [player], defaultProfile: player, switchProfile: jest.fn() };
        renderAt();
        let posted;
        await act(async () => { posted = await post(); });
        expect(posted).toBe(false);
        expect(screen.getByRole('alert')).toHaveTextContent('You need a host profile to post events');
        expect(screen.getByRole('link', { name: 'Add a host profile' })).toHaveAttribute('href', '/settings/profile/add/host');
        expect(screen.getByText('home')).toBeInTheDocument();
    });

    it('asks signed-out visitors to log in', async () => {
        mockUser = { status: 'anonymous', profiles: [], defaultProfile: null, switchProfile: jest.fn() };
        renderAt();
        await act(() => post());
        expect(screen.getByRole('link', { name: 'Log in' })).toHaveAttribute('href', '/login');
    });

    it('points a host with bracket hosting off to their settings', async () => {
        const off = { ...host, bracket_hosting: false };
        mockUser = { status: 'complete', profiles: [off], defaultProfile: off, switchProfile: jest.fn() };
        renderAt();
        await act(() => post());
        expect(screen.getByRole('link', { name: 'Open Settings' })).toHaveAttribute('href', '/settings/profile/host');
    });
});
