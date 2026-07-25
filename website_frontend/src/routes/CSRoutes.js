import { Route, Routes } from 'react-router';

// CS Specific Pages
import { CS } from 'pages/Games/CS/CS';
// H2H
import { CSHeadToHead } from 'pages/Games/CS/HeadToHead/CSHeadToHead';
import { CKRASH2H } from 'pages/Games/CS/HeadToHead/Hosts/CKRASH2H';
import { EsportScrimH2H as CSEsportScrimH2H } from 'pages/Games/CS/HeadToHead/Hosts/EsportScrimH2H';
import { FaceitH2H } from 'pages/Games/CS/HeadToHead/Hosts/FaceitH2H';
import { PraccH2H as PraccCSH2H } from 'pages/Games/CS/HeadToHead/Hosts/PraccH2H';
// Leagues
import { CSLeagues } from 'pages/Games/CS/Leagues/CSLeagues';
import { HyperfibreLeagues } from 'pages/Games/CS/Leagues/Hosts/HyperfibreLeagues/HyperfibreLeagues';
import { HyperfibreEliteLeague } from 'pages/Games/CS/Leagues/Hosts/HyperfibreLeagues/HyperfibreEliteLeague';
import { HyperfibreSocialLeague } from 'pages/Games/CS/Leagues/Hosts/HyperfibreLeagues/HyperfibreSocialLeague';
import { AustralianEsportsLeague as AustralianCSEsportsLeague } from 'pages/Games/CS/Leagues/Hosts/AustralianEsportsLeague';
import { CorporateCS2League } from 'pages/Games/CS/Leagues/Hosts/CorporateCS2League';
import { EGFCLeague as EGFCCSLeague } from 'pages/Games/CS/Leagues/Hosts/EGFCLeague';
import { FaceitESEALeague } from 'pages/Games/CS/Leagues/Hosts/FaceitESEALeague';
import { FastCupLeague } from 'pages/Games/CS/Leagues/Hosts/FastCupLeague';
import { FiReLeague } from 'pages/Games/CS/Leagues/Hosts/FiReLeague';
import { NECCLeague as NECCCSLeague } from 'pages/Games/CS/Leagues/Hosts/NECCLeague';
import { NJCAAELeague as NJCAAECSLeague } from 'pages/Games/CS/Leagues/Hosts/NJCAAELeague';
import { PlayflyCollegeLeague as PlayflyCSLeague } from 'pages/Games/CS/Leagues/Hosts/PlayflyCollegeLeague';
import { UnitedTwentyOneLeague } from 'pages/Games/CS/Leagues/Hosts/UnitedTwentyOneLeague';
// Wagers
import { CSWagers } from 'pages/Games/CS/Wagers/CSWagers';
import { GamerSaloonWagers as GamerSaloonCSWagers } from 'pages/Games/CS/Wagers/Hosts/GamerSaloonWagers';
import { ShowdownGamingWagers } from 'pages/Games/CS/Wagers/Hosts/ShowdownGamingWagers';

const CSRoutes = () => (
    <Routes>
        <Route index element={<CS />} />
        {/* H2H */}
        <Route path='head-to-head' element={<CSHeadToHead />} />
        <Route path='head-to-head/faceit' element={<FaceitH2H />} />
        <Route path='head-to-head/pracc' element={<PraccCSH2H />} />
        <Route path='head-to-head/esport-scrim' element={<CSEsportScrimH2H />} />
        <Route path='head-to-head/ckras' element={<CKRASH2H />} />
        {/* Leagues */}
        <Route path='leagues' element={<CSLeagues />} />
        <Route path='leagues/faceitesea' element={<FaceitESEALeague />} />
        <Route path='leagues/fastcup' element={<FastCupLeague />} />
        <Route path='leagues/corporate' element={<CorporateCS2League />} />
        <Route path='leagues/fireleague' element={<FiReLeague />} />
        <Route path='leagues/unitedtwentyone' element={<UnitedTwentyOneLeague />} />
        <Route path='leagues/hyperfibre-leagues' element={<HyperfibreLeagues />} />
        <Route path='leagues/hyperfibre-leagues/elite' element={<HyperfibreEliteLeague />} />
        <Route path='leagues/hyperfibre-leagues/social' element={<HyperfibreSocialLeague />} />
        <Route path='leagues/njcaae' element={<NJCAAECSLeague />} />
        <Route path='leagues/necc' element={<NECCCSLeague />} />
        <Route path='leagues/egfc' element={<EGFCCSLeague />} />
        <Route path='leagues/playfly' element={<PlayflyCSLeague />} />
        <Route path='leagues/ael' element={<AustralianCSEsportsLeague />} />
        {/* Wagers */}
        <Route path='wagers' element={<CSWagers />} />
        <Route path='wagers/showdowngaming_cs2' element={<ShowdownGamingWagers />} />
        <Route path='wagers/gamersaloon_cs2' element={<GamerSaloonCSWagers />} />
    </Routes>
);

export default CSRoutes;
