import { Route, Routes } from 'react-router';

// Cod Specific Pages
import { Cod } from 'pages/Games/Cod/Cod';
import { CodLans } from 'pages/Games/Cod/Lans/CodLans';
import { PlatformDetail } from 'pages/Games/Shared/PlatformDetail';
import { LeagueDetail } from 'pages/Games/Shared/LeagueDetail';
// H2H
import { CodHeadToHead } from 'pages/Games/Cod/HeadToHead/CodHeadToHead';
// Leagues
import { CodLeagues } from 'pages/Games/Cod/Leagues/CodLeagues';
// Wagers
import { CodWagers } from 'pages/Games/Cod/Wagers/CodWagers';

const CodRoutes = () => (
    <Routes>
        <Route index element={<Cod />} />
        <Route path='lans' element={<CodLans />} />
        {/* H2H */}
        <Route path='head-to-head' element={<CodHeadToHead />} />
        <Route path='head-to-head/*' element={<PlatformDetail eventType="head-to-head" game="Call of Duty" sectionPath="/games/call-of-duty/head-to-head" />} />
        {/* Leagues */}
        <Route path='leagues' element={<CodLeagues />} />
        <Route path='leagues/*' element={<LeagueDetail game="Call of Duty" sectionPath="/games/call-of-duty/leagues" />} />
        {/* Wagers */}
        <Route path='wagers' element={<CodWagers />} />
        <Route path='wagers/*' element={<PlatformDetail eventType="wagers" game="Call of Duty" sectionPath="/games/call-of-duty/wagers" />} />
    </Routes>
);

export default CodRoutes;
