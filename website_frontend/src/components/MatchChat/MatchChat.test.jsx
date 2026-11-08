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

    it('reports a message to uSync staff, saying that event admins never see it', async () => {
        const onReport = jest.fn().mockResolvedValue({ ok: true });
        renderChat({}, { onReport, messages: [msg(1, 'you all suck', { canReport: true })] });
        fireEvent.click(screen.getByRole('button', { name: /Report cat's message/ }));
        expect(screen.getByRole('dialog')).toHaveTextContent(/uSync staff only/);
        fireEvent.change(screen.getByLabelText(/What's wrong/), { target: { value: 'hate' } });
        fireEvent.change(screen.getByLabelText(/Anything else/), { target: { value: ' repeated ' } });
        fireEvent.click(screen.getByRole('button', { name: 'Send report' }));
        await waitFor(() => expect(onReport).toHaveBeenCalledWith(1, 'hate', 'repeated'));
        expect(await screen.findByText(/uSync staff will review it/)).toBeInTheDocument();
    });

    it('shows a reported message as reported and gives your own messages no report button', () => {
        renderChat({}, { onReport: jest.fn(), messages: [msg(1, 'rude', { canReport: true, reported: true }), msg(2, 'mine', { mine: true, canReport: false })] });
        expect(screen.getByText('Reported')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Report/ })).not.toBeInTheDocument();
    });

    it('shows players a placeholder for a hidden message but an admin the text, marked hidden', () => {
        const hidden = msg(1, 'secret rude words', { hidden: true });
        const { unmount } = render(<MatchChat chat={base} messages={[{ ...hidden, body: '' }]} />);
        expect(screen.getByText('Hidden by an admin')).toBeInTheDocument();
        expect(screen.queryByText('secret rude words')).not.toBeInTheDocument();
        unmount();
        render(<MatchChat chat={{ ...base, role: 'admin', joined: true, canLeave: true }} messages={[{ ...hidden, hiddenBy: 'ModMike' }]} />);
        expect(screen.getByText('secret rude words')).toBeInTheDocument();
        expect(screen.getByText(/Hidden from players by ModMike/)).toBeInTheDocument();
    });

    it('lets a joined admin hide a player message and leave, but not delete', () => {
        const onHide = jest.fn();
        const onLeave = jest.fn();
        renderChat({ role: 'admin', joined: true, canLeave: true, canRequestAdmin: false }, { onHide, onLeave, messages: [msg(1, 'rude', { canHide: true })] });
        fireEvent.click(screen.getByRole('button', { name: /Hide cat's message from players/ }));
        expect(onHide).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
        fireEvent.click(screen.getByRole('button', { name: /Leave chat/ }));
        expect(onLeave).toHaveBeenCalled();
        expect(screen.queryByRole('button', { name: /Delete/ })).not.toBeInTheDocument();
    });

    it('is read-only once the event has ended', () => {
        renderChat({ ended: true, closedReason: 'This event has ended, so the chat is read-only.', canWrite: false, canRequestAdmin: false, expiresAt: '2030-01-05T12:00:00Z' });
        expect(screen.getByText(/read-only/)).toBeInTheDocument();
        expect(screen.queryByLabelText('Message')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Request an admin/ })).not.toBeInTheDocument();
    });
});
