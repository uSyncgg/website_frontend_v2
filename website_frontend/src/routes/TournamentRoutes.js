import { Route, Routes } from 'react-router';

import { CodTournaments } from 'pages/Games/Cod/Tournaments/CodTournaments';

const TournamentRoutes = () => (
    <Routes>
        <Route path='call-of-duty-tournaments' element={<CodTournaments />} />
    </Routes>
);

export default TournamentRoutes;
