import { Route, Routes } from 'react-router';

// RL Specific Pages
import { RL } from 'pages/Games/RL/RL';
import { PlatformDetail } from 'pages/Games/Shared/PlatformDetail';
import { LeagueDetail } from 'pages/Games/Shared/LeagueDetail';
// H2H
import { RLHeadToHead } from 'pages/Games/RL/HeadToHead/RLHeadToHead';
// Leagues
import { RLLeagues } from 'pages/Games/RL/Leagues/RLLeagues';
// Wagers
import { RLWagers } from 'pages/Games/RL/Wagers/RLWagers';

const RLRoutes = () => (
    <Routes>
        <Route index element={<RL />} />
        {/* H2H */}
        <Route path='head-to-head' element={<RLHeadToHead />} />
        <Route path='head-to-head/*' element={<PlatformDetail eventType="head-to-head" game="Rocket League" sectionPath="/games/RocketLeague/head-to-head" />} />
        {/* Leagues */}
        <Route path='leagues' element={<RLLeagues />} />
        <Route path='leagues/*' element={<LeagueDetail game="Rocket League" sectionPath="/games/RocketLeague/leagues" />} />
        {/* Wagers */}
        <Route path='wagers' element={<RLWagers />} />
        <Route path='wagers/*' element={<PlatformDetail eventType="wagers" game="Rocket League" sectionPath="/games/RocketLeague/wagers" />} />
    </Routes>
);

export default RLRoutes;
