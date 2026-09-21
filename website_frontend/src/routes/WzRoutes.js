import { Route, Routes } from 'react-router';

// Warzone Specific Pages
import { Wz } from 'pages/Games/Wz/Wz';
import { WzLans } from 'pages/Games/Wz/Lans/WzLans';
import { PlatformDetail } from 'pages/Games/Shared/PlatformDetail';
import { LeagueDetail } from 'pages/Games/Shared/LeagueDetail';
// H2H
import { WzHeadToHead } from 'pages/Games/Wz/HeadToHead/WzHeadToHead';
// Leagues
import { WzLeagues } from 'pages/Games/Wz/Leagues/WzLeagues';
// Wagers
import { WzWagers } from 'pages/Games/Wz/Wagers/WzWagers';

const WzRoutes = () => (
    <Routes>
        <Route index element={<Wz />} />
        <Route path='lans' element={<WzLans />} />
        {/* H2H */}
        <Route path='head-to-head' element={<WzHeadToHead />} />
        <Route path='head-to-head/*' element={<PlatformDetail eventType="head-to-head" game="Warzone" sectionPath="/games/warzone/head-to-head" />} />
        {/* Leagues */}
        <Route path='leagues' element={<WzLeagues />} />
        <Route path='leagues/*' element={<LeagueDetail game="Warzone" sectionPath="/games/warzone/leagues" />} />
        {/* Wagers */}
        <Route path='wagers' element={<WzWagers />} />
        <Route path='wagers/*' element={<PlatformDetail eventType="wagers" game="Warzone" sectionPath="/games/warzone/wagers" />} />
    </Routes>
);

export default WzRoutes;
