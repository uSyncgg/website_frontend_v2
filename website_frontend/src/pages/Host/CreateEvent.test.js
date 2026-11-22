import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CreateEvent } from './CreateEvent';
import { createEvent } from 'services/brackets';

const host = { type: 'host', username: 'HostCo', public_id: 'hostpub', bracket_hosting: true };

jest.mock('hooks', () => ({
    useCurrentUser: () => ({ profiles: [host], defaultProfile: host }),
    useAuth: () => ({ session: { access_token: 't' } }),
}));
// What GET /brackets/meta returns (the lookup tables), trimmed down.
const META = {
    games: [
        { key: 'call_of_duty', name: 'Call of Duty', modes: [], titles: [
            { key: 'modern_warfare_4', name: 'Modern Warfare 4', year: 2026, modes: [] },
            { key: 'black_ops_7', name: 'Black Ops 7', year: 2025, modes: [] },
            { key: 'call_of_duty', name: 'Call of Duty', year: 2003, modes: [] },
        ] },
        { key: 'halo', name: 'Halo', modes: [{ key: 'slayer', name: 'Slayer' }, { key: 'ctf', name: 'Capture the Flag' }], titles: [
            { key: 'halo_infinite', name: 'Halo Infinite', year: 2021, modes: ['slayer', 'ctf'] },
            { key: 'halo_2', name: 'Halo 2', year: 2004, modes: ['slayer'] },
        ] },
        { key: 'cs2', name: 'CS2', modes: [], titles: [] },
        { key: 'rocket_league', name: 'Rocket League', modes: [], titles: [] },
    ],
    formats: [
        { key: 'single_elim', label: 'Single Elimination', description: 'Lose once and you are out.', hasFinal: true, minEntrants: 2 },
        { key: 'double_elim', label: 'Double Elimination', description: 'Lose twice to be out.', hasFinal: true, minEntrants: 2 },
        { key: 'round_robin', label: 'Round Robin', description: 'Everyone plays everyone once.', hasFinal: false, minEntrants: 2 },
        { key: 'swiss', label: 'Swiss', description: 'Paired by record.', hasFinal: false, minEntrants: 2 },
    ],
};

jest.mock('services/brackets', () => ({
    ...jest.requireActual('services/brackets'),
    createEvent: jest.fn().mockResolvedValue(null),
    useBracketMeta: () => META,
}));

jest.mock('services/wallet', () => ({
    ...jest.requireActual('services/wallet'),
    useWallet: () => ({ wallet: { totalCents: 5000, frozen: false } }),
}));

const renderAt = (url) => render(
    <MemoryRouter initialEntries={[url]}>
        <CreateEvent />
    </MemoryRouter>
);

// The game pickers are searchable dropdowns: a button showing the choice, opening a list.
const picker = (label) => screen.getByLabelText(label);
const pick = (label, option) => {
    fireEvent.click(picker(label));
    fireEvent.mouseDown(within(screen.getByRole('listbox')).getByRole('option', { name: new RegExp(`^${option}`) }));
};

const fillRequired = () => {
    fireEvent.change(screen.getByLabelText('Event name'), { target: { value: 'Friday Cup' } });
    fireEvent.click(screen.getByRole('radio', { name: 'Free entry' }));
};

describe('CreateEvent', () => {
    beforeEach(() => createEvent.mockClear());

    it('pre-fills the event type and game from the page the host came from', () => {
        renderAt('/host/events/new?profile=hostpub&type=league&game=Halo');
        expect(screen.getByLabelText('Event type')).toHaveValue('league');
        expect(picker('Game')).toHaveTextContent('Halo');
        expect(screen.getByText(/Posting as/)).toHaveTextContent('HostCo');
    });

    it('makes LANs in person with a venue, and has no platform choice', () => {
        renderAt('/host/events/new?profile=hostpub&type=lan&game=CS2');
        expect(screen.queryByLabelText('Where')).toBeNull();
        expect(screen.getByLabelText('Venue / address')).toBeInTheDocument();
        expect(screen.getByText('LANs are held in person.')).toBeInTheDocument();
        expect(screen.queryByRole('radiogroup', { name: 'Platforms' })).toBeNull();
    });

    it('makes everything else online, with PC allowed or console only', () => {
        renderAt('/host/events/new?type=league&game=CS2');
        expect(screen.getByText('Played online.')).toBeInTheDocument();
        expect(screen.queryByLabelText('Venue / address')).toBeNull();
        const platforms = screen.getByRole('radiogroup', { name: 'Platforms' });
        expect(within(platforms).getByRole('radio', { name: 'PC allowed' })).toHaveAttribute('aria-checked', 'true');
        fireEvent.click(within(platforms).getByRole('radio', { name: 'Console only' }));
        expect(within(platforms).getByRole('radio', { name: 'Console only' })).toHaveAttribute('aria-checked', 'true');
    });

    it('only offers League, LAN and Tournament, ignoring other pre-filled types', () => {
        renderAt('/host/events/new?type=wager');
        const types = [...screen.getByLabelText('Event type').options].map(o => o.value).filter(Boolean);
        expect(types).toEqual(['league', 'lan', 'tournament']);
        expect(screen.getByLabelText('Event type')).toHaveValue('');
    });

    it('locks tournaments to Call of Duty', () => {
        renderAt('/host/events/new?type=tournament&game=Halo');
        expect(picker('Game')).toHaveTextContent('Call of Duty');
        expect(picker('Game')).toBeDisabled();
        expect(screen.getByText('Only Call of Duty tournaments for now.')).toBeInTheDocument();
        fireEvent.change(screen.getByLabelText('Event type'), { target: { value: 'league' } });
        expect(picker('Game')).toHaveTextContent('Halo');
        expect(picker('Game')).not.toBeDisabled();
    });

    it('requires an event type when nothing pre-filled it', () => {
        renderAt('/host/events/new');
        expect(screen.getByLabelText('Event type')).toHaveValue('');
        fireEvent.click(screen.getByRole('button', { name: 'Create event' }));
        expect(screen.getByText('Pick what kind of event this is')).toBeInTheDocument();
    });

    it('searches games, and ignores an unknown pre-filled game', () => {
        renderAt('/host/events/new?type=league&game=Other');
        fireEvent.click(picker('Game'));
        expect(within(screen.getByRole('listbox')).queryByRole('option', { name: 'Other' })).toBeNull();
        fireEvent.change(screen.getByLabelText('Search games'), { target: { value: 'rock' } });
        expect(within(screen.getByRole('listbox')).getAllByRole('option').map(o => o.textContent)).toEqual(['Rocket League']);
    });

    it('asks which Call of Duty game, newest first, and requires one', () => {
        renderAt('/host/events/new?type=league&game=Call%20of%20Duty');
        fireEvent.click(picker('Which Call of Duty game'));
        const titles = within(screen.getByRole('listbox')).getAllByRole('option').map(o => o.textContent);
        expect(titles).toEqual(['Modern Warfare 42026', 'Black Ops 72025', 'Call of Duty2003']);
        fireEvent.keyDown(screen.getByLabelText('Search Call of Duty games'), { key: 'Escape' });
        fillRequired();
        fireEvent.click(screen.getByRole('button', { name: 'Create event' }));
        expect(screen.getByText('Pick which Call of Duty game')).toBeInTheDocument();
        expect(createEvent).not.toHaveBeenCalled();
    });

    it('asks which Halo game, and clears the choice when the game changes', () => {
        renderAt('/host/events/new?type=league&game=Halo');
        pick('Which Halo game', 'Halo Infinite');
        expect(picker('Which Halo game')).toHaveTextContent('Halo Infinite');
        pick('Game', 'CS2');
        expect(screen.queryByLabelText('Which Halo game')).toBeNull();
        pick('Game', 'Halo');
        expect(picker('Which Halo game')).toHaveTextContent('Choose a Halo game');
    });

    it("offers a game's modes, narrowed to the title, and requires one", () => {
        renderAt('/host/events/new?type=league&game=Halo');
        pick('Which Halo game', 'Halo 2');
        fireEvent.click(picker('Game mode'));
        expect(within(screen.getByRole('listbox')).getAllByRole('option').map(o => o.textContent)).toEqual(['Slayer']);
        fireEvent.keyDown(screen.getByLabelText('Search modes'), { key: 'Escape' });
        fillRequired();
        fireEvent.click(screen.getByRole('button', { name: 'Create event' }));
        expect(screen.getByText('Pick a game mode')).toBeInTheDocument();
        expect(createEvent).not.toHaveBeenCalled();
    });

    it("never shows a title or mode picker for a game without them", () => {
        renderAt('/host/events/new?type=league&game=CS2');
        expect(screen.queryByLabelText(/Which .* game/)).toBeNull();
        expect(screen.queryByLabelText('Game mode')).toBeNull();
    });

    it('offers round robin and swiss, and a finals best of only for elimination formats', () => {
        renderAt('/host/events/new?type=league&game=CS2');
        expect(screen.getByRole('radio', { name: /Round Robin/ })).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: /Swiss/ })).toBeInTheDocument();
        fireEvent.click(screen.getByLabelText('Finals are a different best of'));
        expect(screen.getByLabelText('Finals best of')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('radio', { name: /Swiss/ }));
        expect(screen.queryByLabelText('Finals are a different best of')).toBeNull();
    });

    it('only asks players for Discord and Twitter / X beyond their gamertag', () => {
        renderAt('/host/events/new?type=league&game=CS2');
        expect(screen.getByText('Gamertag (always)')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Discord' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Twitter / X' })).toBeInTheDocument();
        for (const gone of ['Activision ID', 'Riot ID', 'Epic ID', 'Steam', 'Battle.net', 'Xbox Gamertag', 'PSN']) {
            expect(screen.queryByRole('button', { name: gone })).toBeNull();
        }
    });

    it('sends the new options when the event is created', () => {
        renderAt('/host/events/new?profile=hostpub&type=league&game=Call%20of%20Duty');
        fillRequired();
        pick('Which Call of Duty game', 'Black Ops 7');
        fireEvent.click(screen.getByRole('radio', { name: 'Console only' }));
        fireEvent.click(screen.getByRole('button', { name: /Add a restriction/ }));
        fireEvent.change(screen.getByLabelText('Restriction 1'), { target: { value: 'No snipers' } });
        fireEvent.click(screen.getByLabelText('Finals are a different best of'));
        fireEvent.change(screen.getByLabelText('Finals best of'), { target: { value: '7' } });
        fireEvent.click(screen.getByLabelText(/Set a minimum number/));
        fireEvent.change(screen.getByLabelText('Minimum players'), { target: { value: '6' } });
        fireEvent.click(screen.getByRole('button', { name: 'Create event' }));
        expect(createEvent).toHaveBeenCalledWith(expect.objectContaining({
            game: 'call_of_duty', gameTitle: 'black_ops_7', gameMode: null, platform: 'console_only',
            restrictions: ['No snipers'], bestOf: 3, finalBestOf: 7, minEntrants: 6, maxEntrants: 16, admins: [],
        }));
    });

    it('sends a wallet entry fee with a prize from the entry fees', () => {
        renderAt('/host/events/new?profile=hostpub&type=league&game=CS2');
        fireEvent.change(screen.getByLabelText('Event name'), { target: { value: 'Money Cup' } });
        fireEvent.click(screen.getByRole('radio', { name: 'Entry fee (uSync wallets)' }));
        fireEvent.change(screen.getByLabelText('Entry fee per player'), { target: { value: '5' } });
        fireEvent.click(screen.getByRole('radio', { name: 'From entry fees' }));
        fireEvent.change(screen.getByLabelText('Your cut of the entry fees (%)'), { target: { value: '15' } });
        fireEvent.change(screen.getByLabelText('Places paid'), { target: { value: '2' } });
        fireEvent.click(screen.getByRole('button', { name: 'Create event' }));
        expect(createEvent).toHaveBeenCalledWith(expect.objectContaining({
            entryFeeCents: 500, prizeFunding: 'entry_funded', hostCutBps: 1500, guaranteeCents: null,
            payoutStructure: [7000, 3000], entryFee: '$5.00', payments: { enabled: false },
        }));
    });

    it('lets a free event guarantee a prize, and checks the split adds up', () => {
        renderAt('/host/events/new?profile=hostpub&type=league&game=CS2');
        fillRequired();
        fireEvent.click(screen.getByRole('radio', { name: 'Guaranteed by me' }));
        expect(screen.queryByRole('radio', { name: 'From entry fees' })).not.toBeInTheDocument();
        fireEvent.change(screen.getByLabelText('Guaranteed prize pool'), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText('2nd place percent'), { target: { value: '20' } });
        fireEvent.change(screen.getByLabelText('3rd place percent'), { target: { value: '30' } });
        fireEvent.click(screen.getByRole('button', { name: 'Create event' }));
        expect(screen.getByText("A place can't be paid more than the place above it")).toBeInTheDocument();
        fireEvent.change(screen.getByLabelText('3rd place percent'), { target: { value: '20' } });
        expect(screen.getByText('The percentages add up to 90%, not 100%')).toBeInTheDocument();
        expect(createEvent).not.toHaveBeenCalled();
        fireEvent.change(screen.getByLabelText('2nd place percent'), { target: { value: '30' } });
        fireEvent.click(screen.getByRole('button', { name: 'Create event' }));
        expect(createEvent).toHaveBeenCalledWith(expect.objectContaining({
            entryFeeCents: null, prizeFunding: 'guaranteed', guaranteeCents: 10000, hostCutBps: null, payoutStructure: [5000, 3000, 2000],
        }));
    });

    it("won't take a minimum above the maximum", () => {
        renderAt('/host/events/new?type=league&game=CS2');
        fillRequired();
        fireEvent.click(screen.getByLabelText(/Set a minimum number/));
        fireEvent.change(screen.getByLabelText('Minimum players'), { target: { value: '20' } });
        fireEvent.click(screen.getByRole('button', { name: 'Create event' }));
        expect(screen.getByText("The minimum can't be more than the maximum")).toBeInTheDocument();
        expect(createEvent).not.toHaveBeenCalled();
    });
});
