import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { MatchPage } from './MatchPage';
import apiClient from 'services/apiClient';
import { bracketEvent, bracketEntrant, builtMatch, apiGetFrom } from 'test/bracketFixtures';

jest.mock('services/apiClient', () => ({ __esModule: true, default: { get: jest.fn() } }));

const team = (id, name, roster) => bracketEntrant(id, name, {
    captain: roster[0], teamId: `t-${id}`, roster, rosterSize: roster.length,
    players: roster.map(u => ({ username: u, public_id: u, type: 'player' })),
});
const event = bracketEvent({
    id: 'evt-4s', teamSize: '2v2', rules: 'Hardpoint first.', restrictions: ['No snipers'], platform: 'console_only',
    gameTitle: 'Black Ops 7', gameMode: 'Hardpoint', finalBestOf: 5, stage: 'live',
    entrants: [team('e1', 'Alpha', ['ace', 'bee']), team('e2', 'Bravo', ['cat', 'dog']), team('e3', 'Charlie', ['eel', 'fox']), team('e4', 'Delta', ['gnu', 'hen'])],
    bracket: {
        status: 'published', format: 'single_elim', seeds: ['e1', 'e2', 'e3', 'e4'],
        built: {
            rounds: [
                [builtMatch('r0m0', 0, 0, 'e1', 'e4'), builtMatch('r0m1', 0, 1, 'e2', 'e3')],
                [builtMatch('r1m0', 1, 0, null, null, { bestOf: 5 })],
            ],
            champion: null, placements: null, progress: { done: 0, total: 3 },
        },
        matches: {
            r0m0: { state: 'ready', reportedBy: [], issues: [], canReport: true, canReportNoShow: false, canDispute: false, noShowUnlocksAt: '2099-01-01T00:00:00Z' },
            r0m1: { state: 'ready', reportedBy: [], issues: [], canReport: false, canReportNoShow: false, canDispute: false },
        },
    },
});

const renderMatch = (matchId) => render(
    <MemoryRouter initialEntries={[`/brackets/evt-4s/matches/${matchId}`]}>
        <Routes><Route path="/brackets/:eventId/matches/:matchId" element={<MatchPage />} /></Routes>
    </MemoryRouter>
);

describe('MatchPage', () => {
    beforeEach(() => apiClient.get.mockImplementation(apiGetFrom({ '/brackets/evt-4s': event })));

    it('shows your opponent, both rosters, the rules and restrictions, and lets you report', async () => {
        renderMatch('r0m0');
        expect(await screen.findByRole('heading', { name: 'Semifinals' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Alpha/ })).toHaveTextContent('You');
        expect(screen.getByRole('heading', { name: 'Delta' })).toBeInTheDocument();
        for (const name of ['ace', 'bee', 'gnu', 'hen']) expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText('Hardpoint first.')).toBeInTheDocument();
        expect(screen.getByText('No snipers')).toBeInTheDocument();
        expect(screen.getByText('Call of Duty: Black Ops 7')).toBeInTheDocument();
        expect(screen.getByText('Hardpoint')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Report score' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Report No Show' })).toBeDisabled();
    });

    it('uses the finals best of for the final, and has no report button for others', async () => {
        renderMatch('r1m0');
        expect(await screen.findByRole('heading', { name: 'Final' })).toBeInTheDocument();
        expect(screen.getByText(/Best of 5 · first to 3/)).toBeInTheDocument();
        expect(screen.getAllByText('TBD')).toHaveLength(2);
        expect(screen.queryByRole('button', { name: 'Report score' })).toBeNull();
    });

    it('offers a dispute in the window after a result', async () => {
        const decided = JSON.parse(JSON.stringify(event));
        Object.assign(decided.bracket.built.rounds[0][0], { status: 'complete', winner: 'e4', loser: 'e1', scoreA: 1, scoreB: 2 });
        decided.bracket.matches.r0m0 = { state: 'complete', reportedBy: [], issues: [], canDispute: true, disputeClosesAt: '2099-01-01T00:00:00Z' };
        apiClient.get.mockImplementation(apiGetFrom({ '/brackets/evt-4s': decided }));
        renderMatch('r0m0');
        expect(await screen.findByRole('button', { name: 'Dispute this result' })).toBeInTheDocument();
    });

    it('says so when the match is not in the bracket', async () => {
        renderMatch('nope');
        expect(await screen.findByText('Match not found')).toBeInTheDocument();
    });
});
