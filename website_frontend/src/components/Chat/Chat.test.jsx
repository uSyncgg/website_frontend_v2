import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ChatProvider } from './ChatContext';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';

jest.mock('hooks', () => ({
    useAuth: () => ({ session: { user: { id: 'acct-1' }, access_token: 't' } }),
    useCurrentUser: () => ({ defaultProfile: { type: 'player', username: 'ace' } }),
}));
jest.mock('services/notifications', () => ({ onNotification: () => () => {} }));
// The match actions load the event; leave it loading so only the chat itself is under test.
jest.mock('services/brackets', () => ({
    useHostEvent: () => undefined, useBracketError: () => '', clearBracketError: () => {},
    matchView: () => ({}), reportScore: jest.fn(), reportNoShow: jest.fn(), disputeResult: jest.fn(),
}));

const channels = {};
jest.mock('services/chats', () => ({
    getChats: jest.fn(),
    getMessages: jest.fn(),
    sendMessage: jest.fn(),
    markRead: jest.fn(() => Promise.resolve()),
    callAdmin: jest.fn(),
    subscribeToChat: (id, handlers) => {
        channels[id] = handlers;
        return () => { delete channels[id]; };
    },
}));
const api = require('services/chats');

const chat = (over = {}) => ({
    id: 'c1', kind: 'match', role: 'player', title: 'Alpha vs Bravo', subtitle: 'Winter Cup · R0M0',
    eventPublicId: 'evt', matchCode: 'r0m0', hasUnread: false, lastMessageAt: null, closesAt: null,
    openedAt: '2026-11-22T10:00:00+00:00', ...over,
});
const msg = (id, body, over = {}) => ({
    id, body, senderProfileId: 'p2', senderName: 'bee', senderRole: 'player', createdAt: '2026-11-22T10:01:00+00:00', ...over,
});

const renderChat = () => render(
    <MemoryRouter><ChatProvider><ChatButton /><ChatWindow /></ChatProvider></MemoryRouter>
);

describe('Match chat', () => {
    beforeEach(() => {
        api.markRead.mockResolvedValue();
        api.getChats.mockResolvedValue([chat({ hasUnread: true })]);
        api.getMessages.mockResolvedValue([msg(1, 'gl hf'), msg(2, 'Ace (Event Admin) joined the chat.', { senderRole: 'system', senderName: null })]);
    });

    it('lists open chats, highlights unread ones, and opens one with its history', async () => {
        renderChat();
        const button = await screen.findByRole('button', { name: /Match chats, 1 with new messages/ });
        fireEvent.click(button);
        expect(screen.getByText('Winter Cup · R0M0')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Alpha vs Bravo'));

        expect(await screen.findByText('gl hf')).toBeInTheDocument();
        expect(screen.getByText('Ace (Event Admin) joined the chat.')).toBeInTheDocument();
        expect(api.getMessages).toHaveBeenCalledWith('c1', 0);
        await waitFor(() => expect(api.markRead).toHaveBeenCalledWith('c1', 2));
        expect(screen.getByRole('button', { name: 'Match chats' })).toBeInTheDocument(); // no longer unread
    });

    it('sends a message and shows live ones from the other side', async () => {
        api.getChats.mockResolvedValue([chat()]);
        api.sendMessage.mockResolvedValue(msg(3, 'ready?', { senderName: 'ace' }));
        renderChat();
        fireEvent.click(await screen.findByRole('button', { name: 'Match chats' }));
        fireEvent.click(screen.getByText('Alpha vs Bravo'));
        await screen.findByText('gl hf');

        fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), { target: { value: '  ready?  ' } });
        fireEvent.click(screen.getByRole('button', { name: 'Send' }));
        expect(await screen.findByText('ready?')).toBeInTheDocument();
        expect(api.sendMessage).toHaveBeenCalledWith('c1', 'ready?');

        act(() => channels.c1.onMessage(msg(4, 'yep')));
        expect(await screen.findByText('yep')).toBeInTheDocument();
    });

    it('drops a chat when it closes', async () => {
        renderChat();
        fireEvent.click(await screen.findByRole('button', { name: /Match chats/ }));
        fireEvent.click(screen.getByText('Alpha vs Bravo'));
        await screen.findByText('gl hf');

        act(() => channels.c1.onClosed());
        expect(await screen.findByText('That chat has closed.')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Match chats/ })).toBeNull();
    });
});
