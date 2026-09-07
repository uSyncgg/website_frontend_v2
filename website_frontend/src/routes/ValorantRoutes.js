import { Route, Routes } from 'react-router';

// Valorant Specific Pages
import { Valorant } from 'pages/Games/Valorant/Valorant';
import { PlatformDetail } from 'pages/Games/Shared/PlatformDetail';
import { LeagueDetail } from 'pages/Games/Shared/LeagueDetail';
// H2H
import { ValorantHeadToHead } from 'pages/Games/Valorant/HeadToHead/ValorantHeadToHead';
// Leagues
import { ValorantLeagues } from 'pages/Games/Valorant/Leagues/ValorantLeagues';
// Wagers
import { ValorantWagers } from 'pages/Games/Valorant/Wagers/ValorantWagers';

const ValorantRoutes = () => (
    <Routes>
        <Route index element={<Valorant />} />
        {/* H2H */}
        <Route path='head-to-head' element={<ValorantHeadToHead />} />
        <Route path='head-to-head/*' element={<PlatformDetail eventType="head-to-head" game="Valorant" sectionPath="/games/Valorant/head-to-head" />} />
        {/* Leagues */}
        <Route path='leagues' element={<ValorantLeagues />} />
        <Route path='leagues/*' element={<LeagueDetail game="Valorant" sectionPath="/games/Valorant/leagues" />} />
        {/* Wagers */}
        <Route path='wagers' element={<ValorantWagers />} />
        <Route path='wagers/*' element={<PlatformDetail eventType="wagers" game="Valorant" sectionPath="/games/Valorant/wagers" />} />
    </Routes>
);

export default ValorantRoutes;
