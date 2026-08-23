import { Route, Routes } from 'react-router';

// All LANs
import { AllLans } from 'pages/Games/Conventions/AllLans';

// CoD
import { ShintoChamps2026 } from 'pages/Games/Cod/Lans/Events/ShintoChamps2026';
import { EWGL3 } from 'pages/Games/Cod/Lans/Events/EWGL3';
import { GACoDModernWarfare4LaunchTournament } from 'pages/Games/Cod/Lans/Events/GACoDModernWarfare4LaunchTournament';
import { CaliforniaTierListLAN } from 'pages/Games/Cod/Lans/Events/CaliforniaTierListLAN';
import { GoodbyeBO7DuoLANSwitch } from 'pages/Games/Cod/Lans/Events/GoodbyeBO7DuoLANSwitch';
import { CaliforniaEsportsMW3Throwback } from 'pages/Games/Cod/Lans/Events/CaliforniaEsportsMW3Throwback';
import { CaliforniaEsportsMW4Kickoff } from 'pages/Games/Cod/Lans/Events/CaliforniaEsportsMW4Kickoff';

// Halo
import { GameandGeek2026 } from 'pages/Games/Halo/Lans/Events/GameandGeek2026';
import { Ozokucon2026 } from 'pages/Games/Halo/Lans/Events/Ozokucon2026';

// LoL
import { BECSoloLaneShowdown } from 'pages/Games/Conventions/Archived/2026/BECSoloLaneShowdown';
import { Pittsburgh5v5GoatGamersLounge } from 'pages/Games/Lol/Lans/Events/Pittsburgh5v5GoatGamersLounge';

// Conventions
import { LANATHONUnderTheSun2026 } from 'pages/Games/Conventions/Events/LANATHONUnderTheSun2026';
import { FortLAN2026 } from 'pages/Games/Conventions/Events/FortLAN2026';
import { LANAllNight2026 } from 'pages/Games/Conventions/Events/LANAllNight2026';
import { GearsOfWarEDayLaunchTournament } from 'pages/Games/Conventions/Events/GearsOfWarEDayLaunchTournament';

// Archived LANs
// 2026
import { HNLxFANDOM2026 } from 'pages/Games/Cod/Lans/Archived/2026/HNLxFANDOM2026';
import { OhYoshiDiIntRehatched } from 'pages/Games/Halo/Lans/Archived/2026/OhYoshiDiIntRehatched';
import { GACSHeatwave } from 'pages/Games/Conventions/Archived/2026/GACSHeatwave';
import { CS210Mans2026 } from 'pages/Games/Conventions/Archived/2026/CS210Mans2026';
import { TheSummoning2026 } from 'pages/Games/Lol/Lans/Archived/2026/TheSummoning2026';
import { TheRetake2026 } from 'pages/Games/Conventions/Archived/2026/TheRetake2026';
import { ShintoTest } from 'pages/Games/Cod/Lans/Archived/2026/ShintoTest';
import { RVAEsportsChampionship2026 } from 'pages/Games/Cod/Lans/Archived/2026/RVAEsportsChampionship2026';
import { ImmerseCon2026 } from 'pages/Games/Conventions/Archived/2026/ImmerseCon2026';
import { DreamCon2026 } from 'pages/Games/Conventions/Archived/2026/DreamCon2026';
import { SummerConWS2026 } from 'pages/Games/Conventions/Archived/2026/SummerConWS2026';
import { EgoChallTournament } from 'pages/Games/Conventions/Archived/2026/EgoChallTournament';
import { LowtierMajorIV } from 'pages/Games/Conventions/Archived/2026/LowtierMajorIV';
import { EWGL2 } from 'pages/Games/Conventions/Archived/2026/EWGL2';
import { EmeraldCityLAN2026 } from 'pages/Games/Conventions/Archived/2026/EmeraldCityLAN2026';
import { GACSOperationCupid } from 'pages/Games/Conventions/Archived/2026/GACSOperationCupid';
import { BelowZeroLANWinter2026 } from 'pages/Games/Conventions/Archived/2026/BelowZeroLANWinter2026';
import { ShintoGCMajor3 } from 'pages/Games/Conventions/Archived/2026/ShintoGCMajor3';
import { GSiteBO7 } from 'pages/Games/Conventions/Archived/2026/G-SiteBO7';
import { Heartland2026 } from 'pages/Games/Conventions/Archived/2026/Heartland2026';
import { MidwestBattleground2026 } from 'pages/Games/Conventions/Archived/2026/MidwestBattleground2026';
import { KamiCon17 } from 'pages/Games/Conventions/Archived/2026/Kami-Con17';
import { DreamHackBirmingham } from 'pages/Games/Conventions/Archived/2026/DreamHackBirmingham';
import { FortLANSpring2026 } from 'pages/Games/Conventions/Archived/2026/FortLANSpring2026';
import { LowPingLAN } from 'pages/Games/Conventions/Archived/2026/LowPingLAN';
import { TomorrowLAN2026 } from 'pages/Games/Conventions/Archived/2026/TomorrowLAN2026';
import { MACSSpring2026 } from 'pages/Games/Conventions/Archived/2026/MACSSpring2026';
import { CharlestonCrownSeries } from 'pages/Games/Conventions/Archived/2026/CharlestonCrownSeries';
import { RMCSSpring2026 } from 'pages/Games/Conventions/Archived/2026/RMCSSpring2026';
import { Volan2026 } from 'pages/Games/Conventions/Archived/2026/Volan2026';
import { LakewoodLeagueXIISpring } from 'pages/Games/Conventions/Archived/2026/LakewoodLeagueXIISpring';
import { LANAllNightSpring2026 } from 'pages/Games/Conventions/Archived/2026/LANAllNightSpring2026';
import { SFGE2026 } from 'pages/Games/Halo/Lans/Archived/2026/SFGE2026';
import { EgoCODLAN4v4 } from 'pages/Games/Cod/Lans/Archived/2026/EgoCODLAN4v4';
import { CitadelI } from 'pages/Games/Halo/Lans/Archived/2026/CitadelI';
import { HellcaseCS2LAN2026 } from 'pages/Games/Conventions/Archived/2026/HellcaseCS2LAN2026';

const LanRoutes = () => (
    <Routes>
        {/* All LANs */}
        <Route path='all' element={<AllLans />} />
        {/* CoD */}
        <Route path='shintochamps2026' element={<ShintoChamps2026 />} />
        <Route path='ewgl3' element={<EWGL3 />} />
        <Route path='ga-cod-modern-warfare-4-launch-tournament' element={<GACoDModernWarfare4LaunchTournament />} />
        <Route path='california-tier-list-lan' element={<CaliforniaTierListLAN />} />
        <Route path='goodbye-bo7-duo-lan-switch' element={<GoodbyeBO7DuoLANSwitch />} />
        <Route path='california-esports-mw3-throwback' element={<CaliforniaEsportsMW3Throwback />} />
        <Route path='california-esports-mw4-kickoff' element={<CaliforniaEsportsMW4Kickoff />} />
        {/* Wz */}
        {/* Halo */}
        <Route path='game-and-geek-2026' element={<GameandGeek2026 />} />
        <Route path='ozokucon-2026' element={<Ozokucon2026 />} />
        {/* LoL */}
        <Route path='bec-sololane-showdown' element={<BECSoloLaneShowdown />} />
        <Route path='5v5-pittsburgh-goat-gamers-lounge' element={<Pittsburgh5v5GoatGamersLounge />} />
        {/* Conventions */}
        <Route path='lan-a-thon-under-the-sun-2026' element={<LANATHONUnderTheSun2026 />} />
        <Route path='fortlan-2026' element={<FortLAN2026 />} />
        <Route path='lan-all-night-2026' element={<LANAllNight2026 />} />
        <Route path='gears-of-war-e-day-launch-tournament' element={<GearsOfWarEDayLaunchTournament />} />

        {/* Archived LANs */}
        {/* 2026 */}
        <Route path='hnl-x-fandom-2026' element={<HNLxFANDOM2026 />} />
        <Route path='oh-yoshi-di-int-rehatched' element={<OhYoshiDiIntRehatched />} />
        <Route path='gacs-operation-heatwave' element={<GACSHeatwave />} />
        <Route path='cs2-10-mans-2026' element={<CS210Mans2026 />} />
        <Route path='the-summoning-2026' element={<TheSummoning2026 />} />
        <Route path='the-retake' element={<TheRetake2026 />} />
        <Route path='shinto-test' element={<ShintoTest />} />
        <Route path='rva-esports-championship-2026' element={<RVAEsportsChampionship2026 />} />
        <Route path='immersecon-2026' element={<ImmerseCon2026 />} />
        <Route path='dreamcon2026' element={<DreamCon2026 />} />
        <Route path='summercon-ws-2026' element={<SummerConWS2026 />} />
        <Route path='egochall-tournament' element={<EgoChallTournament />} />
        <Route path='lowtier-major-iv' element={<LowtierMajorIV />} />
        <Route path='ewgl2' element={<EWGL2 />} />
        <Route path='emerald-city-2026' element={<EmeraldCityLAN2026 />} />
        <Route path='operation-cupid' element={<GACSOperationCupid />} />
        <Route path='belowzerolan-winter-26' element={<BelowZeroLANWinter2026 />} />
        <Route path='shintogc-major-iii-2026' element={<ShintoGCMajor3 />} />
        <Route path='g-site-bo7' element={<GSiteBO7 />} />
        <Route path='heartland-2026' element={<Heartland2026 />} />
        <Route path='midwest-battleground-2026' element={<MidwestBattleground2026 />} />
        <Route path='kamicon-17' element={<KamiCon17 />} />
        <Route path='dreamhack-birmingham' element={<DreamHackBirmingham />} />
        <Route path='forlan-spring-2026' element={<FortLANSpring2026 />} />
        <Route path='low-ping-lan-2026' element={<LowPingLAN />} />
        <Route path='tomorrowlan_2026' element={<TomorrowLAN2026 />} />
        <Route path='macs-spring-2026' element={<MACSSpring2026 />} />
        <Route path='charleston-crown-series' element={<CharlestonCrownSeries />} />
        <Route path='rmcs-spring-2026' element={<RMCSSpring2026 />} />
        <Route path='volan-2026' element={<Volan2026 />} />
        <Route path='lan-all-night-spring-26' element={<LANAllNightSpring2026 />} />
        <Route path='lakewood-league-xii-spring' element={<LakewoodLeagueXIISpring />} />
        <Route path='sfge-2026' element={<SFGE2026 />} />
        <Route path='ego-cod-lan-4v4' element={<EgoCODLAN4v4 />} />
        <Route path='citadel-i' element={<CitadelI />} />
        <Route path='hellcase-cs2-2026' element={<HellcaseCS2LAN2026 />} />
    </Routes>
);

export default LanRoutes;
