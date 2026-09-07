import { Route, Routes } from 'react-router';

// Halo Specific Pages
import { Halo } from 'pages/Games/Halo/Halo';
import { HaloLans } from 'pages/Games/Halo/Lans/HaloLans';
import { PlatformDetail } from 'pages/Games/Shared/PlatformDetail';
import { LeagueDetail } from 'pages/Games/Shared/LeagueDetail';
// H2H
import { HaloHeadToHead } from 'pages/Games/Halo/HeadToHead/HaloHeadToHead';
// Leagues
import { HaloLeagues } from 'pages/Games/Halo/Leagues/HaloLeagues';
// Wagers
import { HaloWagers } from 'pages/Games/Halo/Wagers/HaloWagers';

const HaloRoutes = () => (
    <Routes>
        <Route index element={<Halo />} />
        <Route path='lans' element={<HaloLans />} />
        {/* H2H */}
        <Route path='head-to-head' element={<HaloHeadToHead />} />
        <Route path='head-to-head/*' element={<PlatformDetail eventType="head-to-head" game="Halo" sectionPath="/games/halo/head-to-head" />} />
        {/* Leagues */}
        <Route path='leagues' element={<HaloLeagues />} />
        <Route path='leagues/*' element={<LeagueDetail game="Halo" sectionPath="/games/halo/leagues" />} />
        {/* Wagers */}
        <Route path='wagers' element={<HaloWagers />} />
        <Route path='wagers/*' element={<PlatformDetail eventType="wagers" game="Halo" sectionPath="/games/halo/wagers" />} />
    </Routes>
);

export default HaloRoutes;
