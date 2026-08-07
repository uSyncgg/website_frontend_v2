import { Route, Routes } from 'react-router';

// Cod Specific Pages
import { Cod } from 'pages/Games/Cod/Cod';
import { CodLans } from 'pages/Games/Cod/Lans/CodLans';
// H2H
import { CodHeadToHead } from 'pages/Games/Cod/HeadToHead/CodHeadToHead';
import { ArenaH2H as ArenaCodH2H } from 'pages/Games/Cod/HeadToHead/Hosts/ArenaH2H';
import { CmgH2H as CmgCodH2H } from 'pages/Games/Cod/HeadToHead/Hosts/CmgH2H';
import { EsportsAgentH2H } from 'pages/Games/Cod/HeadToHead/Hosts/EsportsAgentH2H';
// Leagues
import { CodLeagues } from 'pages/Games/Cod/Leagues/CodLeagues';
import { CollegeXPLeagues } from 'pages/Games/Cod/Leagues/Hosts/CollegeXPLeagues/CollegeXPLeagues';
import { CollegeXPClubLeague } from 'pages/Games/Cod/Leagues/Hosts/CollegeXPLeagues/CollegeXPClubLeague';
import { CollegeXPVarsityLeague } from 'pages/Games/Cod/Leagues/Hosts/CollegeXPLeagues/CollegeXPVarsityLeague';
import { LockdownCLLeagues } from 'pages/Games/Cod/Leagues/Hosts/LockdownCLLeagues/LockdownCLLeagues';
import { LockdownLegendsLeague } from 'pages/Games/Cod/Leagues/Hosts/LockdownCLLeagues/LockdownLegendsLeague';
import { LockdownLowersLeague } from 'pages/Games/Cod/Leagues/Hosts/LockdownCLLeagues/LockdownLowersLeague';
import { LockdownUppersLeague } from 'pages/Games/Cod/Leagues/Hosts/LockdownCLLeagues/LockdownUppersLeague';
import { LockdownWomensLeague } from 'pages/Games/Cod/Leagues/Hosts/LockdownCLLeagues/LockdownWomensLeague';
import { PulseXLeagues } from 'pages/Games/Cod/Leagues/Hosts/PulseXLeagues/PulseXLeagues';
import { PulseLowersLeague } from 'pages/Games/Cod/Leagues/Hosts/PulseXLeagues/PulseLowersLeague';
import { PulseOpenLeague } from 'pages/Games/Cod/Leagues/Hosts/PulseXLeagues/PulseOpenLeague';
import { PulseUppersLeague } from 'pages/Games/Cod/Leagues/Hosts/PulseXLeagues/PulseUppersLeague';
import { AirForceGamingLeague as AirForceCodLeague } from 'pages/Games/Cod/Leagues/Hosts/AirForceGamingLeague';
import { BeerLeague } from 'pages/Games/Cod/Leagues/Hosts/BeerLeague/BeerLeague';
import { CBLTeamLeague } from 'pages/Games/Cod/Leagues/Hosts/BeerLeague/CBLTeamLeague';
import { OGBeerLeague } from 'pages/Games/Cod/Leagues/Hosts/BeerLeague/OGBeerLeague';
import { CasualXPLeague } from 'pages/Games/Cod/Leagues/Hosts/CasualXPLeague';
import { CodRecLeagues } from 'pages/Games/Cod/Leagues/Hosts/CodRecLeagues/CodRecLeagues';
import { CodRecPremadeLeague } from 'pages/Games/Cod/Leagues/Hosts/CodRecLeagues/CodRecPremadeLeague';
import { CodRecMixedLeague } from 'pages/Games/Cod/Leagues/Hosts/CodRecLeagues/CodRecMixedLeague';
import { CollegeCodLeague } from 'pages/Games/Cod/Leagues/Hosts/CollegeCodLeague';
import { CorporateCodLeague } from 'pages/Games/Cod/Leagues/Hosts/CorporateCodLeague';
import { ECACEsportsLeague as ECACCodLeague } from 'pages/Games/Cod/Leagues/Hosts/ECACEsportsLeague';
import { EliteWarfareGamingLeague } from 'pages/Games/Cod/Leagues/Hosts/EliteWarfareGamingLeague';
import { FemaleCodLeague } from 'pages/Games/Cod/Leagues/Hosts/FemaleCodLeague';
import { IXIEsportsLeague } from 'pages/Games/Cod/Leagues/Hosts/IXIEsportsLeague';
import { NJCAAELeague as NJCAAECodLeague } from 'pages/Games/Cod/Leagues/Hosts/NJCAAELeague';
// TEMP REMOVED, THEY MAY RESTART
// import { OldHeadsCircuitLeague } from 'pages/Games/Cod/Leagues/Hosts/OldHeadsCircuitLeague';
import { PlayflyCollegeLeague as PlayflyCodLeague } from 'pages/Games/Cod/Leagues/Hosts/PlayflyCollegeLeague';
import { PremierCircuitLeague } from 'pages/Games/Cod/Leagues/Hosts/PremierCircuitLeague';
import { TPCWomensCodLeague } from 'pages/Games/Cod/Leagues/Hosts/TPCWomensCodLeague';
import { U18CodLeague } from 'pages/Games/Cod/Leagues/Hosts/U18CodLeague';
import { UnitedRogueLeague as UnitedRogueCodLeague } from 'pages/Games/Cod/Leagues/Hosts/UnitedRogueLeague';
import { XPLeague } from 'pages/Games/Cod/Leagues/Hosts/XPLeague';
import { ZonedOutGamingLeague } from 'pages/Games/Cod/Leagues/Hosts/ZonedOutGamingLeague';
// Wagers
import { CodWagers } from 'pages/Games/Cod/Wagers/CodWagers';
import { OneVOneMeWagers as OneVOneCodWagers } from 'pages/Games/Cod/Wagers/Hosts/1v1MeWagers';
import { CmgWagers as CmgCodWagers } from 'pages/Games/Cod/Wagers/Hosts/CmgWagers';
import { EsportsAgentWagers } from 'pages/Games/Cod/Wagers/Hosts/EsportsAgentWagers';
import { EsportsHubWagers } from 'pages/Games/Cod/Wagers/Hosts/EsportsHubWagers';
import { Ewagers as CodEwagers } from 'pages/Games/Cod/Wagers/Hosts/Ewagers';

const CodRoutes = () => (
    <Routes>
        <Route index element={<Cod />} />
        <Route path='lans' element={<CodLans />} />
        {/* H2H */}
        <Route path='head-to-head' element={<CodHeadToHead />} />
        <Route path='head-to-head/cmg' element={<CmgCodH2H />} />
        <Route path='head-to-head/eagent' element={<EsportsAgentH2H />} />
        <Route path='head-to-head/arena' element={<ArenaCodH2H />} />
        {/* Leagues */}
        <Route path='leagues' element={<CodLeagues />} />
        <Route path='leagues/lockdowncl-leagues' element={<LockdownCLLeagues />} />
        <Route path='leagues/lockdowncl-leagues/legends' element={<LockdownLegendsLeague />} />
        <Route path='leagues/lockdowncl-leagues/uppers' element={<LockdownUppersLeague />} />
        <Route path='leagues/lockdowncl-leagues/lowers' element={<LockdownLowersLeague />} />
        <Route path='leagues/lockdowncl-leagues/womens' element={<LockdownWomensLeague />} />
        <Route path='leagues/pulse-x-leagues' element={<PulseXLeagues />} />
        <Route path='leagues/pulse-x-leagues/pulse-x-uppers' element={<PulseUppersLeague />} />
        <Route path='leagues/pulse-x-leagues/pulse-x-lowers' element={<PulseLowersLeague />} />
        <Route path='leagues/pulse-x-leagues/pulse-x-open' element={<PulseOpenLeague />} />
        <Route path='leagues/xp-league-cod' element={<XPLeague />} />
        <Route path='leagues/cod-beer-league' element={<BeerLeague />} />
        <Route path='leagues/cod-beer-league/cbl-team-league' element={<CBLTeamLeague />} />
        <Route path='leagues/cod-beer-league/og-beer-league' element={<OGBeerLeague />} />
        <Route path='leagues/u18-league' element={<U18CodLeague />} />
        <Route path='leagues/united-rogue-league' element={<UnitedRogueCodLeague />} />
        <Route path='leagues/tpc-womens-cod' element={<TPCWomensCodLeague />} />
        <Route path='leagues/fcl' element={<FemaleCodLeague />} />
        <Route path='leagues/zoned-out' element={<ZonedOutGamingLeague />} />
        <Route path='leagues/airforce-league' element={<AirForceCodLeague />} />
        <Route path='leagues/corporate-cod-league' element={<CorporateCodLeague />} />
        <Route path='leagues/ixi-esports' element={<IXIEsportsLeague />} />
        <Route path='leagues/tpc-league' element={<PremierCircuitLeague />} />
        <Route path='leagues/cod-rec-league' element={<CodRecLeagues />} />
        <Route path='leagues/cod-rec-league/cod-rec-premade-league' element={<CodRecPremadeLeague />} />
        <Route path='leagues/cod-rec-league/cod-rec-mixed-league' element={<CodRecMixedLeague />} />
        <Route path='leagues/elite-gaming-warfare-league' element={<EliteWarfareGamingLeague />} />
        <Route path='leagues/casual-xp-league' element={<CasualXPLeague />} />
        {/* TEMP REMOVED, THEY MAY RESTART */}
        {/* <Route path='leagues/old-heads-circuit' element={<OldHeadsCircuitLeague />} /> */}
        <Route path='leagues/cxp-leagues' element={<CollegeXPLeagues />} />
        <Route path='leagues/cxp-leagues/cxp-varsity' element={<CollegeXPVarsityLeague />} />
        <Route path='leagues/cxp-leagues/cxp-club' element={<CollegeXPClubLeague />} />
        <Route path='leagues/playfly-cod-league' element={<PlayflyCodLeague />} />
        <Route path='leagues/ccl-league' element={<CollegeCodLeague />} />
        <Route path='leagues/ecac' element={<ECACCodLeague />} />
        <Route path='leagues/njcaae' element={<NJCAAECodLeague />} />
        {/* Wagers */}
        <Route path='wagers' element={<CodWagers />} />
        <Route path='wagers/cmg' element={<CmgCodWagers />} />
        <Route path='wagers/eagent' element={<EsportsAgentWagers />} />
        <Route path='wagers/1v1me' element={<OneVOneCodWagers />} />
        <Route path='wagers/the-esports-hub' element={<EsportsHubWagers />} />
        <Route path='wagers/ewagers' element={<CodEwagers />} />
    </Routes>
);

export default CodRoutes;