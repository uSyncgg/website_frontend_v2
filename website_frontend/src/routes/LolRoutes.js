import { Route, Routes } from 'react-router';

// LoL Specific Pages
import { Lol } from 'pages/Games/Lol/Lol';
import { LolLans } from 'pages/Games/Lol/Lans/LolLans';
import { PlatformDetail } from 'pages/Games/Shared/PlatformDetail';
import { LeagueDetail } from 'pages/Games/Shared/LeagueDetail';
// H2H
import { LolHeadToHead } from 'pages/Games/Lol/HeadToHead/LolHeadToHead';
// Leagues
import { LolLeagues } from 'pages/Games/Lol/Leagues/LolLeagues';
// Wagers
import { LolWagers } from 'pages/Games/Lol/Wagers/LolWagers';

const LolRoutes = () => (
    <Routes>
        <Route index element={<Lol />} />
        <Route path='lans' element={<LolLans />} />
        {/* H2H */}
        <Route path='head-to-head' element={<LolHeadToHead />} />
        <Route path='head-to-head/*' element={<PlatformDetail eventType="head-to-head" game="League of Legends" sectionPath="/games/LoL/head-to-head" />} />
        {/* Leagues */}
        <Route path='leagues' element={<LolLeagues />} />
        <Route path='leagues/*' element={<LeagueDetail game="League of Legends" sectionPath="/games/LoL/leagues" />} />
        {/* Wagers */}
        <Route path='wagers' element={<LolWagers />} />
        <Route path='wagers/*' element={<PlatformDetail eventType="wagers" game="League of Legends" sectionPath="/games/LoL/wagers" />} />
    </Routes>
);

export default LolRoutes;
