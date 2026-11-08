import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ModerationView } from './AdminModerationTab';

jest.mock('components', () => ({ LoadingWheel: () => <div>loading</div> }));
jest.mock('hooks', () => ({ useAuth: () => ({ session: { access_token: 't' } }) }));

const report = (extra = {}) => ({
    id: 'r1', source: 'player', category: 'harassment', note: 'keeps saying quit', status: 'open', created_at: '2030-01-02T18:00:00Z',
    reporter_name: 'ace', sender_name: 'cat', sender_role: 'player', message: 'you all suck', event_id: 'evt-1', event_name: 'Spring Showdown',
    match_id: 'r1m0', chat_available: true, reviewed_by: null, reviewed_at: null, resolution_note: null, ...extra,
});

const renderView = (reports, props = {}) => {
    const handlers = {
        loadHistory: jest.fn().mockResolvedValue({ live: true, highlight_id: 1, admins: ['ModMike'], messages: [{ id: 1, kind: 'user', name: 'cat', role: 'player', body: 'you all suck', at: '2030-01-02T17:59:00Z', hidden: false }] }),
        onResolve: jest.fn().mockResolvedValue(''),
        onStatus: jest.fn(),
    };
    render(<MemoryRouter><ModerationView data={{ open_count: reports.length, reports }} status="open" loading={false} error="" {...handlers} {...props} /></MemoryRouter>);
    return handlers;
};

describe('ModerationView', () => {
    it('lists a report with who reported what, and the open count', () => {
        renderView([report()]);
        expect(screen.getByText('Player report')).toBeInTheDocument();
        expect(screen.getByText('you all suck')).toBeInTheDocument();
        expect(screen.getByText('ace')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Open (1)' })).toBeInTheDocument();
        expect(screen.getByText(/never to the event's host or admins/)).toBeInTheDocument();
    });

    it('opens the chat history for a report', async () => {
        const { loadHistory } = renderView([report()]);
        fireEvent.click(screen.getByRole('button', { name: 'View chat history' }));
        await waitFor(() => expect(loadHistory).toHaveBeenCalledWith('r1'));
        expect(await screen.findByText(/Live chat · admins who joined: ModMike/)).toBeInTheDocument();
        expect(screen.getByRole('list', { name: 'Chat history' })).toBeInTheDocument();
    });

    it('says when the chat was deleted and only a saved copy is left', async () => {
        renderView([report({ chat_available: false })], { loadHistory: jest.fn().mockResolvedValue({ live: false, highlight_id: 1, admins: [], messages: [] }) });
        expect(screen.getByText(/The chat was deleted/)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'View chat history' }));
        expect(await screen.findByText(/Saved copy/)).toBeInTheDocument();
    });

    it('closes a report as actioned with a note, or dismisses it', async () => {
        const { onResolve } = renderView([report()]);
        fireEvent.change(screen.getByLabelText(/Note/), { target: { value: 'warned' } });
        fireEvent.click(screen.getByRole('button', { name: 'Mark actioned' }));
        await waitFor(() => expect(onResolve).toHaveBeenCalledWith('r1', 'actioned', 'warned'));
        await waitFor(() => expect(screen.getByRole('button', { name: 'Dismiss' })).toBeEnabled());
        fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
        await waitFor(() => expect(onResolve).toHaveBeenCalledWith('r1', 'dismissed', 'warned'));
    });

    it('marks hidden-by-admin reports as automatic, and dismissing restores the message', () => {
        renderView([report({ source: 'admin_hide', reporter_name: 'ModMike' })]);
        expect(screen.getByText(/Hidden by an admin \(auto-reported\)/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Dismiss and restore message' })).toBeInTheDocument();
    });

    it('shows who closed a reviewed report and hides the actions', () => {
        renderView([report({ status: 'actioned', reviewed_by: 'staff@usync.gg', reviewed_at: '2030-01-03T10:00:00Z', resolution_note: 'chat ban' })]);
        expect(screen.getByText(/Actioned by staff@usync.gg/)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Mark actioned' })).not.toBeInTheDocument();
    });
});
