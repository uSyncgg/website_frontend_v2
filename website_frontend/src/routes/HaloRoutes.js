import { Route, Routes } from 'react-router';

// Halo Specific Pages
import { Halo } from 'pages/Games/Halo/Halo';
import { HaloLans } from 'pages/Games/Halo/Lans/HaloLans';
// H2H
import { HaloHeadToHead } from 'pages/Games/Halo/HeadToHead/HaloHeadToHead';
import { ArenaH2H as ArenaHaloH2H } from 'pages/Games/Halo/HeadToHead/Hosts/ArenaH2H';
import { HaloRecLeagueScrimsH2H } from 'pages/Games/Halo/HeadToHead/Hosts/HaloRecLeagueScrimsH2H';
import { SaunaScrimsH2H } from 'pages/Games/Halo/HeadToHead/Hosts/SaunaScrimsH2H';
import { UGCCollegeHaloScrimsH2H } from 'pages/Games/Halo/HeadToHead/Hosts/UGCCollegeHaloScrimsH2H';
// Leagues
import { HaloLeagues } from 'pages/Games/Halo/Leagues/HaloLeagues';
import { HaloAgentLeague } from 'pages/Games/Halo/Leagues/Hosts/HaloAgentLeague';
import { HaloRecLeague } from 'pages/Games/Halo/Leagues/Hosts/HaloRecLeague';
import { CollegeHaloLeague } from 'pages/Games/Halo/Leagues/Hosts/CollegeHaloLeague';
// Wagers
import { HaloWagers } from 'pages/Games/Halo/Wagers/HaloWagers';
import { CmgWagers as CmgHaloWagers } from 'pages/Games/Halo/Wagers/Hosts/CmgWagers';
import { Ewagers as HaloEwagers } from 'pages/Games/Halo/Wagers/Hosts/Ewagers';

const HaloRoutes = () => (
    <Routes>
        <Route index element={<Halo />} />
        <Route path='lans' element={<HaloLans />} />
        {/* H2H */}
        <Route path='head-to-head' element={<HaloHeadToHead />} />
        <Route path='head-to-head/ugc-scrim' element={<UGCCollegeHaloScrimsH2H />} />
        <Route path='head-to-head/rec-xp' element={<HaloRecLeagueScrimsH2H />} />
        <Route path='head-to-head/arena' element={<ArenaHaloH2H />} />
        <Route path='head-to-head/sauna' element={<SaunaScrimsH2H />} />
        {/* Leagues */}
        <Route path='leagues' element={<HaloLeagues />} />
        <Route path='leagues/halo-rec-league' element={<HaloRecLeague />} />
        <Route path='leagues/halo-agent' element={<HaloAgentLeague />} />
        <Route path='leagues/ugc-halo' element={<CollegeHaloLeague />} />
        {/* Wagers */}
        <Route path='wagers' element={<HaloWagers />} />
        <Route path='wagers/cmg' element={<CmgHaloWagers />} />
        <Route path='wagers/ewagers' element={<HaloEwagers />} />
    </Routes>
);

export default HaloRoutes;
