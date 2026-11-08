import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CreateEvent } from './CreateEvent';

const host = { type: 'host', username: 'HostCo', public_id: 'hostpub', bracket_hosting: true };

jest.mock('hooks', () => ({
    useCurrentUser: () => ({ profiles: [host], defaultProfile: host }),
}));

const renderAt = (url) => render(
    <MemoryRouter initialEntries={[url]}>
        <CreateEvent />
    </MemoryRouter>
);

describe('CreateEvent', () => {
    it('pre-fills the event type and game from the page the host came from', () => {
        renderAt('/host/events/new?profile=hostpub&type=league&game=Halo');
        expect(screen.getByLabelText('Event type')).toHaveValue('league');
        expect(screen.getByLabelText('Game')).toHaveValue('Halo');
        expect(screen.getByText(/Posting as/)).toHaveTextContent('HostCo');
    });

    it('makes LANs in person and asks for the venue', () => {
        renderAt('/host/events/new?profile=hostpub&type=lan&game=Call%20of%20Duty');
        expect(screen.getByLabelText('Where')).toHaveValue('in_person');
        expect(screen.getByLabelText('Where')).toBeDisabled();
        expect(screen.getByLabelText('Venue / address')).toBeInTheDocument();
        expect(screen.getByText('LANs are held in person.')).toBeInTheDocument();
    });

    it('lets other event types be online', () => {
        renderAt('/host/events/new?type=tournament');
        const where = screen.getByLabelText('Where');
        expect(where).toHaveValue('online');
        expect(where).not.toBeDisabled();
        fireEvent.change(screen.getByLabelText('Event type'), { target: { value: 'lan' } });
        expect(where).toHaveValue('in_person');
        expect(where).toBeDisabled();
    });

    it('only offers League, LAN and Tournament, ignoring other pre-filled types', () => {
        renderAt('/host/events/new?type=wager');
        const types = [...screen.getByLabelText('Event type').options].map(o => o.value).filter(Boolean);
        expect(types).toEqual(['league', 'lan', 'tournament']);
        expect(screen.getByLabelText('Event type')).toHaveValue('');
    });

    it('locks tournaments to Call of Duty', () => {
        renderAt('/host/events/new?type=tournament&game=Halo');
        expect(screen.getByLabelText('Game')).toHaveValue('Call of Duty');
        expect(screen.getByLabelText('Game')).toBeDisabled();
        expect(screen.getByText('Only Call of Duty tournaments for now.')).toBeInTheDocument();
        fireEvent.change(screen.getByLabelText('Event type'), { target: { value: 'league' } });
        expect(screen.getByLabelText('Game')).toHaveValue('Halo');
        expect(screen.getByLabelText('Game')).not.toBeDisabled();
    });

    it('requires an event type when nothing pre-filled it', () => {
        renderAt('/host/events/new');
        expect(screen.getByLabelText('Event type')).toHaveValue('');
        fireEvent.click(screen.getByRole('button', { name: 'Create event' }));
        expect(screen.getByText('Pick what kind of event this is')).toBeInTheDocument();
    });

    it("doesn't offer Other as a game, and ignores an unknown pre-filled game", () => {
        renderAt('/host/events/new?game=Other');
        const options = [...screen.getByLabelText('Game').options].map(o => o.value);
        expect(options).not.toContain('Other');
        expect(options).toContain('CS2');
        expect(screen.getByLabelText('Game')).toHaveValue(options[0]);
    });
});
