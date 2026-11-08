import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { MatchPage } from './MatchPage';
import apiClient from 'services/apiClient';
import { bracketEvent, apiGetFrom } from 'test/bracketFixtures';

jest.mock('services/apiClient', () => ({ __esModule: true, default: { get: jest.fn() } }));

const team = (id, name, roster) => ({
    id, name, captain: roster[0], rating: 1200, registeredAt: '2030-01-02T00:00:00Z', status: 'signed_up',
    teamId: `t-${id}`, roster, rosterSize: roster.length, teammates: roster.slice(1),
});
const event = bracketEvent({
    id: 'evt-4s', teamSize: '2v2', rules: 'Hardpoint first.', restrictions: ['No snipers'], platform: 'console_only',
    gameTitle: 'Black Ops 7', finalBestOf: 5,
    entrants: [team('e1', 'Alpha', ['ace', 'bee']), team('e2', 'Bravo', ['cat', 'dog']), team('e3', 'Charlie', ['eel', 'fox']), team('e4', 'Delta', ['gnu', 'hen'])],
    bracket: { published: true, format: 'single_elim', seeds: ['e1', 'e2', 'e3', 'e4'], results: {}, reports: {}, noShows: {} },
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
        expect(screen.getByText(/Maps and modes for this match will be posted here/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Report score' })).toBeInTheDocument();
    });

    it('uses the finals best of for the final, and has no report button for others', async () => {
        renderMatch('r1m0');
        expect(await screen.findByRole('heading', { name: 'Final' })).toBeInTheDocument();
        expect(screen.getByText(/Best of 5 · first to 3/)).toBeInTheDocument();
        expect(screen.getAllByText('TBD')).toHaveLength(2);
        expect(screen.queryByRole('button', { name: 'Report score' })).toBeNull();
    });

    it('says so when the match is not in the bracket', async () => {
        renderMatch('nope');
        expect(await screen.findByText('Match not found')).toBeInTheDocument();
    });
});
