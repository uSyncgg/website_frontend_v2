import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router';

// Home + Top Level Pages
import { Home } from 'pages/Home';
import { Games } from 'pages/Games';
import { Leagues } from 'pages/Leagues';
import { Lans } from 'pages/Lans';
import { Tournaments } from 'pages/Tournaments';

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
import { CollegeXPOpenLeague } from 'pages/Games/Cod/Leagues/Hosts/CollegeXPLeagues/CollegeXPOpenLeague';
import { CollegeXPVarsityLeague } from 'pages/Games/Cod/Leagues/Hosts/CollegeXPLeagues/CollegeXPVarsityLeague';
import { HouseOfEsportsLeagues } from 'pages/Games/Cod/Leagues/Hosts/HouseOfEsportsLeagues/HouseOfEsportsLeagues';
import { HouseOfEsportsAmateursLeague } from 'pages/Games/Cod/Leagues/Hosts/HouseOfEsportsLeagues/HouseOfEsportsAmateursLeague';
import { HouseOfEsportsChallengersLeague } from 'pages/Games/Cod/Leagues/Hosts/HouseOfEsportsLeagues/HouseOfEsportsChallengersLeague';
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
import { BeerLeague } from 'pages/Games/Cod/Leagues/Hosts/BeerLeague';
import { CasualXPLeague } from 'pages/Games/Cod/Leagues/Hosts/CasualXPLeague';
import { CodRecLeague } from 'pages/Games/Cod/Leagues/Hosts/CodRecLeague';
import { CollegeCodLeague } from 'pages/Games/Cod/Leagues/Hosts/CollegeCodLeague';
import { CorporateCodLeague } from 'pages/Games/Cod/Leagues/Hosts/CorporateCodLeague';
import { ECACEsportsLeague as ECACCodLeague } from 'pages/Games/Cod/Leagues/Hosts/ECACEsportsLeague';
import { EliteWarfareGamingLeague } from 'pages/Games/Cod/Leagues/Hosts/EliteWarfareGamingLeague';
import { FemaleCodLeague } from 'pages/Games/Cod/Leagues/Hosts/FemaleCodLeague';
import { IXIEsportsLeague } from 'pages/Games/Cod/Leagues/Hosts/IXIEsportsLeague';
import { KineticLeague } from 'pages/Games/Cod/Leagues/Hosts/KineticLeague';
import { NJCAAELeague as NJCAAECodLeague } from 'pages/Games/Cod/Leagues/Hosts/NJCAAELeague';
import { OldHeadsCircuitLeague } from 'pages/Games/Cod/Leagues/Hosts/OldHeadsCircuitLeague';
import { PlayflyCollegeLeague as PlayflyCodLeague } from 'pages/Games/Cod/Leagues/Hosts/PlayflyCollegeLeague';
import { PremierCircuitLeague } from 'pages/Games/Cod/Leagues/Hosts/PremierCircuitLeague';
import { RetiredChallengersLeague } from 'pages/Games/Cod/Leagues/Hosts/RetiredChallengersLeague';
import { TPCWomensCodLeague } from 'pages/Games/Cod/Leagues/Hosts/TPCWomensCodLeague';
import { U18CodLeague } from 'pages/Games/Cod/Leagues/Hosts/U18CodLeague';
import { UnitedRogueLeague as UnitedRogueCodLeague } from 'pages/Games/Cod/Leagues/Hosts/UnitedRogureLeague';
import { XPLeague } from 'pages/Games/Cod/Leagues/Hosts/XPLeague';
import { ZonedOutGamingLeague } from 'pages/Games/Cod/Leagues/Hosts/ZonedOutGamingLeague';
// Tournaments
import { CodTournaments } from 'pages/Games/Cod/Tournaments/CodTournaments';
// Wagers
import { CodWagers } from 'pages/Games/Cod/Wagers/CodWagers';
import { OneVOneMeWagers as OneVOneCodWagers } from 'pages/Games/Cod/Wagers/Hosts/1v1MeWagers';
import { CmgWagers as CmgCodWagers } from 'pages/Games/Cod/Wagers/Hosts/CmgWagers';
import { DropInWagers as DropInCodWagers } from 'pages/Games/Cod/Wagers/Hosts/DropInWagers';
import { DubbzWagers as DubbzCodWagers } from 'pages/Games/Cod/Wagers/Hosts/DubbzWagers';
import { EsportsAgentWagers } from 'pages/Games/Cod/Wagers/Hosts/EsportsAgentWagers';
import { EsportsHubWagers } from 'pages/Games/Cod/Wagers/Hosts/EsportsHubWagers';
import { Ewagers as CodEwagers } from 'pages/Games/Cod/Wagers/Hosts/Ewagers';
import { OneUpWagers as OneUpCodWagers } from 'pages/Games/Cod/Wagers/Hosts/OneUpWagers';

// CS Specific Pages minus LANs
import { CS } from 'pages/Games/CS/CS';
// Head to Head
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
import { LPLPathfinderLeagues as LPLPathfinderLeaguesCS } from 'pages/Games/CS/Leagues/Hosts/LPLPathfinderLeagues/LPLPathfinderLeagues';
import { LPLPathfinderBronzeLeague as LPLPathfinderBronzeLeagueCS } from 'pages/Games/CS/Leagues/Hosts/LPLPathfinderLeagues/LPLPathfinderBronzeLeague';
import { LPLPathfinderGoldLeague as LPLPathfinderGoldLeagueCS } from 'pages/Games/CS/Leagues/Hosts/LPLPathfinderLeagues/LPLPathfinderGoldLeague';
import { LPLPathfinderOpenLeague as LPLPathfinderOpenLeagueCS } from 'pages/Games/CS/Leagues/Hosts/LPLPathfinderLeagues/LPLPathfinderOpenLeague';
import { LPLPathfinderSilverLeague as LPLPathfinderSilverLeagueCS } from 'pages/Games/CS/Leagues/Hosts/LPLPathfinderLeagues/LPLPathfinderSilverLeague';
import { SCLLeagues } from 'pages/Games/CS/Leagues/Hosts/SCLLeagues/SCLLeagues';
import { SCLChallengerLeague } from 'pages/Games/CS/Leagues/Hosts/SCLLeagues/SCLChallengerLeague';
import { SCLIntermediateLeague } from 'pages/Games/CS/Leagues/Hosts/SCLLeagues/SCLIntermediateLeague';
import { SCLMasterLeague } from 'pages/Games/CS/Leagues/Hosts/SCLLeagues/SCLMasterLeague';
import { SCLPublicLeague } from 'pages/Games/CS/Leagues/Hosts/SCLLeagues/SCLPublicLeague';
import { AustralianEsportsLeague as AustralianCSEsportsLeague } from 'pages/Games/CS/Leagues/Hosts/AustralianEsportsLeague';
import { CorporateCS2League } from 'pages/Games/CS/Leagues/Hosts/CorporateCS2League';
import { ECACLeague as ECACCSLeague } from 'pages/Games/CS/Leagues/Hosts/ECACLeague';
import { EGFCLeague as EGFCCSLeague } from 'pages/Games/CS/Leagues/Hosts/EGFCLeague';
import { FaceitCollegiateLeague as FaceitCSCollegiate } from 'pages/Games/CS/Leagues/Hosts/FaceitCollegiateLeague';
import { FaceitESEALeague } from 'pages/Games/CS/Leagues/Hosts/FaceitESEALeague';
import { FastCupLeague } from 'pages/Games/CS/Leagues/Hosts/FastCupLeague';
import { FiReLeague } from 'pages/Games/CS/Leagues/Hosts/FiReLeague';
import { HighSchoolEsportsLeague as HighSchoolCSLeague } from 'pages/Games/CS/Leagues/Hosts/HighSchoolEsportsLeague';
import { NationalStudentEsportsLeague as NationalStudentCSLeague } from 'pages/Games/CS/Leagues/Hosts/NationalStudentEsportsLeague';
import { NECCLeague as NECCCSLeague } from 'pages/Games/CS/Leagues/Hosts/NECCLeague';
import { NJCAAELeague as NJCAAECSLeague } from 'pages/Games/CS/Leagues/Hosts/NJCAAELeague';
import { PlayflyCollegeLeague as PlayflyCSLeague } from 'pages/Games/CS/Leagues/Hosts/PlayflyCollegeLeague';
import { UnitedTwentyOneLeague } from 'pages/Games/CS/Leagues/Hosts/UnitedTwentyOneLeague';
import { VantaGGLeague as VantaGGCSLeague } from 'pages/Games/CS/Leagues/Hosts/VantaGGLeague';
// Wagers
import { CSWagers } from 'pages/Games/CS/Wagers/CSWagers';
import { DubbzWagers as DubbzCSWagers } from 'pages/Games/CS/Wagers/Hosts/DubbzWagers';
import { GamerSaloonWagers as GamerSaloonCSWagers } from 'pages/Games/CS/Wagers/Hosts/GamerSaloonWagers';
import { ShowdownGamingWagers } from 'pages/Games/CS/Wagers/Hosts/ShowdownGamingWagers';

// Halo Specific Pages minus LANs

// LoL Specific Pages minus LANs

// RL Specific Pages minus LANs

// Valorant Specific Pages minus LANs

// Warzone Specific Pages minus LANs

// Other Pages

// LAN Pages

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      {/* Home Page */}
      <Route path='/' element={<Home />} />

      {/* Top Level Pages */}
      <Route path='/games' element={<Games />} />
      <Route path='/leagues' element={<Leagues />} />
      <Route path='/lans' element={<Lans />} />
      <Route path='/tournaments' element={<Tournaments />} />

      {/* CoD Pages Minus LANs */}
      <Route path='/games/call-of-duty' element={<Cod />} />
      <Route path='/games/call-of-duty/lans' element={<CodLans />} />
      {/* H2H */}
      <Route path='/games/call-of-duty/head-to-head' element={<CodHeadToHead />} />
      <Route path='/games/call-of-duty/head-to-head/cmg' element={<CmgCodH2H />} />
      <Route path='/games/call-of-duty/head-to-head/eagent' element={<EsportsAgentH2H />} />
      <Route path='/games/call-of-duty/head-to-head/arena' element={<ArenaCodH2H />} />
      {/* Leagues */}
      <Route path='/games/call-of-duty/leagues' element={<CodLeagues />} />
      <Route path='/games/call-of-duty/leagues/lockdowncl-leagues' element={<LockdownCLLeagues />} />
      <Route path='/games/call-of-duty/leagues/lockdowncl-leagues/legends' element={<LockdownLegendsLeague />} />
      <Route path='/games/call-of-duty/leagues/lockdowncl-leagues/uppers' element={<LockdownUppersLeague />} />
      <Route path='/games/call-of-duty/leagues/lockdowncl-leagues/lowers' element={<LockdownLowersLeague />} />
      <Route path='/games/call-of-duty/leagues/lockdowncl-leagues/womens' element={<LockdownWomensLeague />} />
      <Route path='/games/call-of-duty/leagues/pulse-x-leagues' element={<PulseXLeagues />} />
      <Route path='/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-uppers' element={<PulseUppersLeague />} />
      <Route path='/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-lowers' element={<PulseLowersLeague />} />
      <Route path='/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-open' element={<PulseOpenLeague />} />
      <Route path='/games/call-of-duty/leagues/xp-league-cod' element={<XPLeague />} />
      <Route path='/games/call-of-duty/leagues/cod-beer-league' element={<BeerLeague />} />
      <Route path='/games/call-of-duty/leagues/u18-league' element={<U18CodLeague />} />
      <Route path='/games/call-of-duty/leagues/united-rogue-league' element={<UnitedRogueCodLeague />} />
      <Route path='/games/call-of-duty/leagues/tpc-womens-cod' element={<TPCWomensCodLeague />} />
      <Route path='/games/call-of-duty/leagues/fcl' element={<FemaleCodLeague />} />
      <Route path='/games/call-of-duty/leagues/zoned-out' element={<ZonedOutGamingLeague />} />
      <Route path='/games/call-of-duty/leagues/airforce-league' element={<AirForceCodLeague />} />
      <Route path='/games/call-of-duty/leagues/corporate-cod-league' element={<CorporateCodLeague />} />
      <Route path='/games/call-of-duty/leagues/kinetic-league' element={<KineticLeague />} />
      <Route path='/games/call-of-duty/leagues/House-of-esports-leagues' element={<HouseOfEsportsLeagues />} />
      <Route path='/games/call-of-duty/leagues/House-of-esports-leagues/hoe-amateur' element={<HouseOfEsportsAmateursLeague />} />
      <Route path='/games/call-of-duty/leagues/House-of-esports-leagues/hoe-challengers' element={<HouseOfEsportsChallengersLeague />} />
      <Route path='/games/call-of-duty/leagues/ixi-esports' element={<IXIEsportsLeague />} />
      <Route path='/games/call-of-duty/leagues/tpc-league' element={<PremierCircuitLeague />} />
      <Route path='/games/call-of-duty/leagues/cod-rec-league' element={<CodRecLeague />} />
      <Route path='/games/call-of-duty/leagues/retired-challengers' element={<RetiredChallengersLeague />} />
      <Route path='/games/call-of-duty/leagues/elite-gaming-warfare-league' element={<EliteWarfareGamingLeague />} />
      <Route path='/games/call-of-duty/leagues/casual-xp-league' element={<CasualXPLeague />} />
      <Route path='/games/call-of-duty/leagues/old-heads-circuit' element={<OldHeadsCircuitLeague />} />
      <Route path='/games/call-of-duty/leagues/cxp-leagues' element={<CollegeXPLeagues />} />
      <Route path='/games/call-of-duty/leagues/cxp-leagues/cxp-varsity' element={<CollegeXPVarsityLeague />} />
      <Route path='/games/call-of-duty/leagues/cxp-leagues/cxp-open' element={<CollegeXPOpenLeague />} />
      <Route path='/games/call-of-duty/leagues/cxp-leagues/cxp-club' element={<CollegeXPClubLeague />} />
      <Route path='/games/call-of-duty/leagues/playfly-cod-league' element={<PlayflyCodLeague />} />
      <Route path='/games/call-of-duty/leagues/ccl-league' element={<CollegeCodLeague />} />
      <Route path='/games/call-of-duty/leagues/ecac' element={<ECACCodLeague />} />
      <Route path='/games/call-of-duty/leagues/njcaae' element={<NJCAAECodLeague />} />
      {/* Tournaments   */}
      <Route path='/tournaments/call-of-duty-tournaments' element={<CodTournaments />} />
      {/* Wagers */}
      <Route path='/games/call-of-duty/wagers' element={<CodWagers />} />
      <Route path='/games/call-of-duty/wagers/cmg' element={<CmgCodWagers />} />
      <Route path='/games/call-of-duty/wagers/eagent' element={<EsportsAgentWagers />} />
      <Route path='/games/call-of-duty/wagers/oneup' element={<OneUpCodWagers />} />
      <Route path='/games/call-of-duty/wagers/dropin' element={<DropInCodWagers />} />
      <Route path='/games/call-of-duty/wagers/1v1me' element={<OneVOneCodWagers />} />
      <Route path='/games/call-of-duty/wagers/dubbz' element={<DubbzCodWagers />} />
      <Route path='/games/call-of-duty/wagers/the-esports-hub' element={<EsportsHubWagers />} />
      <Route path='/games/call-of-duty/wagers/ewagers' element={<CodEwagers />} />

      {/* CS2 Pages Minus LANs */}
      <Route path='/games/CS2' element={<CS />} />
      {/* H2H */}
      <Route path='/games/CS2/head-to-head' element={<CSHeadToHead />} />
      <Route path='/games/CS2/head-to-head/faceit' element={<FaceitH2H />} />
      <Route path='/games/CS2/head-to-head/pracc' element={<PraccCSH2H />} />
      <Route path='/games/CS2/head-to-head/esport-scrim' element={<CSEsportScrimH2H />} />
      <Route path='/games/CS2/head-to-head/ckras' element={<CKRASH2H />} />
      {/* Leagues */}
      <Route path='/games/CS2/leagues' element={<CSLeagues />} />
      <Route path='/games/CS2/leagues/faceitesea' element={<FaceitESEALeague />} />
      <Route path='/games/CS2/leagues/lpl-leagues' element={<LPLPathfinderLeaguesCS />} />
      <Route path='/games/CS2/leagues/lpl-leagues/lpl-gold' element={<LPLPathfinderGoldLeagueCS />} />
      <Route path='/games/CS2/leagues/lpl-leagues/lpl-silver' element={<LPLPathfinderSilverLeagueCS />} />
      <Route path='/games/CS2/leagues/lpl-leagues/lpl-bronze' element={<LPLPathfinderBronzeLeagueCS />} />
      <Route path='/games/CS2/leagues/lpl-leagues/lpl-open' element={<LPLPathfinderOpenLeagueCS />} />
      <Route path='/games/CS2/leagues/fastcup' element={<FastCupLeague />} />
      <Route path='/games/CS2/leagues/corporate' element={<CorporateCS2League />} />
      <Route path='/games/CS2/leagues/fireleague' element={<FiReLeague />} />
      <Route path='/games/CS2/leagues/unitedtwentyone' element={<UnitedTwentyOneLeague />} />
      <Route path='/games/CS2/leagues/scl-leagues' element={<SCLLeagues />} />
      <Route path='/games/CS2/leagues/scl-leagues/challenger' element={<SCLChallengerLeague />} />
      <Route path='/games/CS2/leagues/scl-leagues/masters' element={<SCLMasterLeague />} />
      <Route path='/games/CS2/leagues/scl-leagues/intermediate' element={<SCLIntermediateLeague />} />
      <Route path='/games/CS2/leagues/scl-leagues/public' element={<SCLPublicLeague />} />
      <Route path='/games/CS2/leagues/hyperfibre-leagues' element={<HyperfibreLeagues />} />
      <Route path='/games/CS2/leagues/hyperfibre-leagues/elite' element={<HyperfibreEliteLeague />} />
      <Route path='/games/CS2/leagues/hyperfibre-leagues/social' element={<HyperfibreSocialLeague />} />
      <Route path='/games/CS2/leagues/njcaae' element={<NJCAAECSLeague />} />
      <Route path='/games/CS2/leagues/necc' element={<NECCCSLeague />} />
      <Route path='/games/CS2/leagues/ecac' element={<ECACCSLeague />} />
      <Route path='/games/CS2/leagues/egfc' element={<EGFCCSLeague />} />
      <Route path='/games/CS2/leagues/faceitcollegiate' element={<FaceitCSCollegiate />} />
      <Route path='/games/CS2/leagues/nse' element={<NationalStudentCSLeague />} />
      <Route path='/games/CS2/leagues/playfly' element={<PlayflyCSLeague />} />
      <Route path='/games/CS2/leagues/ael' element={<AustralianCSEsportsLeague />} />
      <Route path='/games/CS2/leagues/hsel' element={<HighSchoolCSLeague />} />
      <Route path='/games/CS2/leagues/vantagg' element={<VantaGGCSLeague />} />
      {/* Wagers */}
      <Route path='/games/CS2/wagers' element={<CSWagers />} />
      <Route path='/games/CS2/wagers/dubbzcs2' element={<DubbzCSWagers />} />
      <Route path='/games/CS2/wagers/showdowngaming_cs2' element={<ShowdownGamingWagers />} />
      <Route path='/games/CS2/wagers/gamersaloon_cs2' element={<GamerSaloonCSWagers />} />


    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
