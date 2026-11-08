import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MatchChat } from './MatchChat';

const base = {
    role: 'player', open: true, closedReason: null, joined: false, canRead: true, canWrite: true,
    canRequestAdmin: true, canJoin: false, adminRequested: false, adminRequestReason: null, admins: [], expiresAt: null,
};
const msg = (id, body, extra = {}) => ({ id, kind: 'user', sender: { name: 'cat', role: 'player' }, body, at: '2030-01-02T18:00:00Z', mine: false, ...extra });

const renderChat = (chat = {}, props = {}) => {
    const handlers = { onSend: jest.fn().mockResolvedValue(true), onRequestAdmin: jest.fn(), onJoin: jest.fn(), onClearError: jest.fn() };
    render(<MatchChat chat={{ ...base, ...chat }} messages={[]} busy={false} error="" sendError="" {...handlers} {...props} />);
    return handlers;
};

describe('MatchChat', () => {
    it('renders nothing before the chat loads', () => {
        const { container } = render(<MatchChat chat={null} messages={[]} error="" />);
        expect(container).toBeEmptyDOMElement();
    });

    it('sends a trimmed message and clears the box', async () => {
        const { onSend } = renderChat();
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: '  ready when you are  ' } });
        fireEvent.click(screen.getByRole('button', { name: 'Send' }));
        await waitFor(() => expect(onSend).toHaveBeenCalledWith('ready when you are'));
        await waitFor(() => expect(screen.getByLabelText('Message')).toHaveValue(''));
    });

    it('keeps the text and shows the server\'s reason when a message is refused', async () => {
        const onSend = jest.fn().mockResolvedValue(false);
        renderChat({}, { onSend, sendError: "Shortened links aren't allowed." });
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'bit.ly/x' } });
        fireEvent.click(screen.getByRole('button', { name: 'Send' }));
        await waitFor(() => expect(onSend).toHaveBeenCalled());
        expect(screen.getByRole('alert')).toHaveTextContent("Shortened links aren't allowed.");
        expect(screen.getByLabelText('Message')).toHaveValue('bit.ly/x');
    });

    it('renders links as safe anchors and system lines apart from messages', () => {
        renderChat({}, { messages: [msg(1, 'rules https://discord.gg/usync'), { id: 2, kind: 'system', sender: null, body: 'Admin ModMike joined the chat.', at: '2030-01-02T18:01:00Z', mine: false }] });
        const link = screen.getByRole('link', { name: 'https://discord.gg/usync' });
        expect(link).toHaveAttribute('target', '_blank');
        expect(link.getAttribute('rel')).toContain('noopener');
        expect(screen.getByText('Admin ModMike joined the chat.')).toBeInTheDocument();
    });

    it('lets a player request an admin, then shows it as requested', () => {
        const { onRequestAdmin } = renderChat();
        fireEvent.click(screen.getByRole('button', { name: /Request an admin/ }));
        expect(onRequestAdmin).toHaveBeenCalled();
    });

    it('disables the request once one is pending or an admin is in the chat', () => {
        const { unmount } = render(<MatchChat chat={{ ...base, canRequestAdmin: false, adminRequested: true }} messages={[]} />);
        expect(screen.getByRole('button', { name: /Admin requested/ })).toBeDisabled();
        unmount();
        render(<MatchChat chat={{ ...base, canRequestAdmin: false, admins: [{ name: 'ModMike', joinedAt: '2030-01-02T18:00:00Z' }] }} messages={[]} />);
        expect(screen.getByRole('button', { name: /Admin is in the chat/ })).toBeDisabled();
        expect(screen.getByText('ModMike joined')).toBeInTheDocument();
    });

    it('hides the chat from an admin until they join', () => {
        const { onJoin } = renderChat({ role: 'admin', canRead: false, canWrite: false, canRequestAdmin: false, canJoin: true, adminRequested: true, adminRequestReason: 'dispute' });
        expect(screen.getByText('The two sides reported different scores.')).toBeInTheDocument();
        expect(screen.getByText(/hidden until you join/)).toBeInTheDocument();
        expect(screen.queryByLabelText('Message')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Join chat' }));
        expect(onJoin).toHaveBeenCalled();
    });

    it('is closed until both sides are known, and says when the chat will be deleted', () => {
        renderChat({ open: false, closedReason: 'This chat opens once both sides of the match are decided.', canWrite: false, canRequestAdmin: false });
        expect(screen.getByText(/opens once both sides/)).toBeInTheDocument();
        expect(screen.queryByLabelText('Message')).not.toBeInTheDocument();
    });

    it('shows the deletion date once the event is over', () => {
        renderChat({ expiresAt: '2030-01-05T12:00:00Z' });
        expect(screen.getByText(/This chat is deleted on/)).toBeInTheDocument();
    });
});
