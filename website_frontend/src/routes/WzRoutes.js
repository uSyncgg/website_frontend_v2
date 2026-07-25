import { Route, Routes } from 'react-router';

// Warzone Specific Pages
import { Wz } from 'pages/Games/Wz/Wz';
import { WzLans } from 'pages/Games/Wz/Lans/WzLans';
// H2H
import { WzHeadToHead } from 'pages/Games/Wz/HeadToHead/WzHeadToHead';
import { CmgH2H as CmgWzH2H } from 'pages/Games/Wz/HeadToHead/Hosts/CmgH2H';
// Leagues
import { WzLeagues } from 'pages/Games/Wz/Leagues/WzLeagues';
// Wagers
import { WzWagers } from 'pages/Games/Wz/Wagers/WzWagers';
import { OneVOneMeWagers as OneVOneWzWagers } from 'pages/Games/Wz/Wagers/Hosts/1v1MeWagers';
import { CmgWagers as CmgWzWagers } from 'pages/Games/Wz/Wagers/Hosts/CmgWagers';
import { Ewagers as WzEwagers } from 'pages/Games/Wz/Wagers/Hosts/Ewagers';
import { GamerSaloonWagers as GamerSaloonWzWagers } from 'pages/Games/Wz/Wagers/Hosts/GamerSaloonWagers';

const WzRoutes = () => (
    <Routes>
        <Route index element={<Wz />} />
        <Route path='lans' element={<WzLans />} />
        {/* H2H */}
        <Route path='head-to-head' element={<WzHeadToHead />} />
        <Route path='head-to-head/cmg' element={<CmgWzH2H />} />
        {/* Leagues */}
        <Route path='leagues' element={<WzLeagues />} />
        {/* Wagers */}
        <Route path='wagers' element={<WzWagers />} />
        <Route path='wagers/cmg' element={<CmgWzWagers />} />
        <Route path='wagers/1v1me' element={<OneVOneWzWagers />} />
        <Route path='wagers/gamersaloon' element={<GamerSaloonWzWagers />} />
        <Route path='wagers/ewagers' element={<WzEwagers />} />
    </Routes>
);

export default WzRoutes;
