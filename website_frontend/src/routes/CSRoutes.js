import { Route, Routes } from 'react-router';

// CS Specific Pages
import { CS } from 'pages/Games/CS/CS';
import { PlatformDetail } from 'pages/Games/Shared/PlatformDetail';
import { LeagueDetail } from 'pages/Games/Shared/LeagueDetail';
// H2H
import { CSHeadToHead } from 'pages/Games/CS/HeadToHead/CSHeadToHead';
// Leagues
import { CSLeagues } from 'pages/Games/CS/Leagues/CSLeagues';
// Wagers
import { CSWagers } from 'pages/Games/CS/Wagers/CSWagers';

const CSRoutes = () => (
    <Routes>
        <Route index element={<CS />} />
        {/* H2H */}
        <Route path='head-to-head' element={<CSHeadToHead />} />
        <Route path='head-to-head/*' element={<PlatformDetail eventType="head-to-head" game="CS2" sectionPath="/games/CS2/head-to-head" />} />
        {/* Leagues */}
        <Route path='leagues' element={<CSLeagues />} />
        <Route path='leagues/*' element={<LeagueDetail game="CS2" sectionPath="/games/CS2/leagues" />} />
        {/* Wagers */}
        <Route path='wagers' element={<CSWagers />} />
        <Route path='wagers/*' element={<PlatformDetail eventType="wagers" game="CS2" sectionPath="/games/CS2/wagers" />} />
    </Routes>
);

export default CSRoutes;
