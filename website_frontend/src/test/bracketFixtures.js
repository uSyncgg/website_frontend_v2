// Events as GET /brackets/... returns them, for tests that render bracket pages.
export const bracketEvent = (overrides = {}) => ({
    id: 'evt-friday',
    name: 'uSync Friday Night 1v1s',
    eventType: 'tournament',
    game: 'Call of Duty',
    format: 'single_elim',
    teamSize: '1v1',
    bestOf: 3,
    maxEntrants: 16,
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
    bracket: null,
    createdAt: '2030-01-01T00:00:00Z',
    hostProfile: 'hostpub',
    host: { type: 'host', username: 'HostCo', public_id: 'hostpub', profile_picture: null },
    entrants: [{
        id: 'e1', name: 'Zyphr', captain: 'Zyphr', rating: 1200, registeredAt: '2030-01-02T00:00:00Z',
        status: 'signed_up', teamId: null, roster: [], rosterSize: 0, teammates: [],
    }],
    canManage: false,
    viewerEntrantId: 'e1',
    viewerCanAct: true,
    rostersLocked: false,
    ...overrides,
});

// Mocks apiClient.get with a map of path -> response data (anything else 404s).
export const apiGetFrom = (routes) => (path) =>
    (path in routes ? Promise.resolve({ data: routes[path] }) : Promise.reject({ response: { status: 404 } }));
