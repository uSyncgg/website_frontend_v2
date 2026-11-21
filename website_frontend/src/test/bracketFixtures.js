// Events as the /brackets API returns them, for tests that render bracket pages.

const entrant = (id, name, overrides = {}) => ({
    id, name, captain: name, registeredAt: '2030-01-02T00:00:00Z', status: 'signed_up', teamId: null,
    players: [], roster: [], rosterSize: 0, ...overrides,
});

// A full event (GET /brackets/:id).
export const bracketEvent = (overrides = {}) => ({
    id: 'evt-friday',
    name: 'uSync Friday Night 1v1s',
    eventType: 'tournament',
    game: 'Call of Duty',
    gameKey: 'call_of_duty',
    gameTitle: '',
    gameTitleKey: null,
    gameMode: null,
    gameModeKey: null,
    format: 'single_elim',
    formatLabel: 'Single Elimination',
    teamSize: '1v1',
    bestOf: 3,
    finalBestOf: null,
    maxEntrants: 16,
    minEntrants: null,
    platform: 'pc_allowed',
    restrictions: [],
    startsAt: '2030-01-10T19:00:00Z',
    locationType: 'online',
    venue: '',
    entryFee: 'Free',
    prize: '',
    description: '',
    rules: '',
    registrationOpen: true,
    noShowMinutes: 10,
    payments: { enabled: false },
    signupForm: { playerFields: [], questions: [] },
    delays: [],
    createdAt: '2030-01-01T00:00:00Z',
    stage: 'registration',
    hostProfile: 'hostpub',
    host: { type: 'host', username: 'HostCo', public_id: 'hostpub', profile_picture: null },
    entrants: [entrant('e1', 'Zyphr')],
    canManage: false,
    isHost: false,
    admins: [],
    openIssues: 0,
    viewerEntrantId: 'e1',
    viewerCanAct: true,
    bracket: null,
    ...overrides,
});

export const bracketEntrant = entrant;

// A match as the server's built bracket has it.
export const builtMatch = (id, round, slot, a, b, overrides = {}) => ({
    id, round, slot, a, b, status: a && b ? 'ready' : 'pending', winner: null, loser: null,
    scoreA: null, scoreB: null, bestOf: 3, locked: false, ruled: false, ...overrides,
});

// A list card (GET /brackets/hosting, /entered, /profile/:id return pages of these).
export const bracketSummary = (overrides = {}) => ({
    id: 'evt-friday',
    name: 'uSync Friday Night 1v1s',
    eventType: 'tournament',
    game: 'Call of Duty',
    gameTitle: '',
    format: 'single_elim',
    formatLabel: 'Single Elimination',
    teamSize: '1v1',
    startsAt: '2030-01-10T19:00:00Z',
    stage: 'registration',
    hostProfile: 'hostpub',
    maxEntrants: 16,
    signedUp: 1,
    needsPlayers: 0,
    pending: 0,
    canManage: false,
    isHost: false,
    openIssues: 0,
    viewerEntrantId: 'e1',
    viewerEntrantName: 'Zyphr',
    viewerMatch: null,
    winner: null,
    viewerPlace: null,
    ...overrides,
});

export const page = (events, nextCursor = null) => ({ events, nextCursor });

// Mocks apiClient.get with a map of path -> response data (anything else 404s).
export const apiGetFrom = (routes) => (path) =>
    (path in routes ? Promise.resolve({ data: routes[path] }) : Promise.reject({ response: { status: 404 } }));
