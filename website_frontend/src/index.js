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

// More Pages
import { Articles } from 'pages/More/Articles';
import { ContactUs } from 'pages/More/ContactUs';
import { Faqs } from 'pages/More/Faqs';
import { PostYourEvent } from 'pages/More/PostYourEvent';
import { Verification } from 'pages/More/Verification';

// Articles
import { HowEsportsCanBeBetter } from 'pages/More/Articles/HowEsportsCanBeBetter';
import { HowWeFixIt } from 'pages/More/Articles/HowWeFixIt';
import { JoiningEsportsLeague } from 'pages/More/Articles/JoiningEsportsLeague';
import { ProblemWithEsports } from 'pages/More/Articles/ProblemWithEsports';
import { WhatWeProvide } from 'pages/More/Articles/WhatWeProvide';

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
import { AscendingBaselineLeagues } from 'pages/Games/Halo/Leagues/Hosts/AscendingBaselineLeagues/AscendingBaselineLeagues';
import { AscendingBaselineABLeague } from 'pages/Games/Halo/Leagues/Hosts/AscendingBaselineLeagues/AscendingBaselineABLeague';
import { AscendingBaselinePandemoniumGamesLeague } from 'pages/Games/Halo/Leagues/Hosts/AscendingBaselineLeagues/AscendingBaselinePandemoniumGamesLeague';
import { CollegeHaloLeague } from 'pages/Games/Halo/Leagues/Hosts/CollegeHaloLeague';
import { HaloAgentLeague } from 'pages/Games/Halo/Leagues/Hosts/HaloAgentLeague';
import { HaloRecLeague } from 'pages/Games/Halo/Leagues/Hosts/HaloRecLeague';
import { HighSchoolEsportsLeague as HighSchoolHaloLeague } from 'pages/Games/Halo/Leagues/Hosts/HighSchoolEsportsLeague';
// Wagers
import { HaloWagers } from 'pages/Games/Halo/Wagers/HaloWagers';
import { CmgWagers as CmgHaloWagers } from 'pages/Games/Halo/Wagers/Hosts/CmgWagers';
import { Ewagers as HaloEwagers } from 'pages/Games/Halo/Wagers/Hosts/Ewagers';
import { OneUpWagers as OneUpHaloWagers } from 'pages/Games/Halo/Wagers/Hosts/OneUpWagers';

// LoL Specific Pages minus LANs
import { Lol } from 'pages/Games/Lol/Lol';
import { LolLans } from 'pages/Games/Lol/Lans/LolLans';
// H2H
import { LolHeadToHead } from 'pages/Games/Lol/HeadToHead/LolHeadToHead';
import { EsportScrimH2H as LoLEsportsScrim } from 'pages/Games/Lol/HeadToHead/Hosts/EsportScrimH2H';
import { GanksterGGH2H as GanksterLoLH2H } from 'pages/Games/Lol/HeadToHead/Hosts/GanksterGGH2H';
import { PraccH2H as PraccLoLH2H } from 'pages/Games/Lol/HeadToHead/Hosts/PraccH2H';
// Leagues
import { LolLeagues } from 'pages/Games/Lol/Leagues/LolLeagues';
import { AegisLeagues } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisLeagues';
import { AegisChampionsLeague } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisChampionsLeague';
import { AegisDefendersLeague } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisDefendersLeague';
import { AegisExecutionersLeague } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisExecutionersLeague';
import { AegisMarauderLeague } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisMarauderLeague';
import { AegisProtectorsLeague } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisProtectorsLeague';
import { BlueOtterLeagues } from 'pages/Games/Lol/Leagues/Hosts/BlueOtterLeagues/BlueOtterLeagues';
import { BlueOtterDiamondLeague } from 'pages/Games/Lol/Leagues/Hosts/BlueOtterLeagues/BlueOtterDiamondLeague';
import { BlueOtterDraftLeague } from 'pages/Games/Lol/Leagues/Hosts/BlueOtterLeagues/BlueOtterDraftLeague';
import { BlueOtterEmeraldLeague } from 'pages/Games/Lol/Leagues/Hosts/BlueOtterLeagues/BlueOtterEmeraldLeague';
import { BlueOtterGoldLeague } from 'pages/Games/Lol/Leagues/Hosts/BlueOtterLeagues/BlueOtterGoldLeague';
import { BlueOtterMastersLeague } from 'pages/Games/Lol/Leagues/Hosts/BlueOtterLeagues/BlueOtterMastersLeague';
import { BlueOtterPlatinumLeague } from 'pages/Games/Lol/Leagues/Hosts/BlueOtterLeagues/BlueOtterPlatinumLeague';
import { CWLLeagues } from 'pages/Games/Lol/Leagues/Hosts/CWLLeagues/CWLLeagues';
import { CWLAscendLeague } from 'pages/Games/Lol/Leagues/Hosts/CWLLeagues/CWLAscendLeague';
import { CWLDefyLeague } from 'pages/Games/Lol/Leagues/Hosts/CWLLeagues/CWLDefyLeague';
import { CWLRiseLeague } from 'pages/Games/Lol/Leagues/Hosts/CWLLeagues/CWLRiseLeague';
import { LowBudgetLCSLeagues } from 'pages/Games/Lol/Leagues/Hosts/LowBudgetLCSLeagues/LowBudgetLCSLeagues';
import { LowBudgetCommercialLeague } from 'pages/Games/Lol/Leagues/Hosts/LowBudgetLCSLeagues/LowBudgetCommercialLeague';
import { LowBudgetExecutiveLeague } from 'pages/Games/Lol/Leagues/Hosts/LowBudgetLCSLeagues/LowBudgetExecutiveLeague';
import { LowBudgetEconomyLeague } from 'pages/Games/Lol/Leagues/Hosts/LowBudgetLCSLeagues/LowBudgetEconomyLeague';
import { LowBudgetFinancialLeague } from 'pages/Games/Lol/Leagues/Hosts/LowBudgetLCSLeagues/LowBudgetFinancialLeague';
import { MetaShiftLeagues } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftLeagues';
import { MetaShiftArgonLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftArgonLeague';
import { MetaShiftKryptonLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftKryptonLeague';
import { MetaShiftNeonLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftNeonLeague';
import { MetaShiftNitrogenLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftNitrogenLeague';
import { MetaShiftRadonLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftRadonLeague';
import { MetaShiftXenonLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftXenonLeague';
import { RisenLeagues } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenLeagues';
import { RisenChampionsLeague } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenChampionsLeague';
import { RisenDominateLeague } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenDominateLeague';
import { RisenDraftLeague } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenDraftLeague';
import { RisenRampageLeague } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenRampageLeague';
import { RisenUnstoppableLeague } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenUnstoppableLeague';
import { TitanEsportsLeagues } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanEsportsLeagues';
import { TitanBerserkerLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanBerserkerLeague';
import { TitanConquerorLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanConquerorLeague';
import { TitanDivinityLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanDivinityLeague';
import { TitanEternalLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanEternalLeague';
import { TitanGladiatorLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanGladiatorLeague';
import { TitanImmortalLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanImmortalLeague';
import { TitanOlympusLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanOlympusLeague';
import { TitanVanquisherLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanVanquisherLeague';
import { BlackTwitchLeague } from 'pages/Games/Lol/Leagues/Hosts/BlackTwitchLeague';
import { CLOLLeague } from 'pages/Games/Lol/Leagues/Hosts/CLOLLeague';
import { CorporateLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/CorporateLoLLeague';
import { ECACEsportsLeague as ECACLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/ECACEsportsLegaue';
import { NationalStudentEsportsLeague as NationalStudentLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/NationalStudentsEsportsLeague';
import { PlayflyCollegeLeague as PlayflyLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/PlayflyCollegeLeague';
import { PlayVSLeague as PlayVSLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/PlayVSLeague';
import { SDCLeague } from 'pages/Games/Lol/Leagues/Hosts/SDCLeague';
import { VantaGGLeague as VantaGGLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/VantaGGLeague';
import { NECCLeague as NECCLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/NECCLeague';
// Wagers
import { LolWagers } from 'pages/Games/Lol/Wagers/LolWagers';
import { DropInGamingWagers as DropInLoLWagers } from 'pages/Games/Lol/Wagers/Hosts/DropInGamingWagers';
import { DubbzWagers as DubbzLoLWagers } from 'pages/Games/Lol/Wagers/Hosts/DubbzWagers';
import { Ewagers as LoLEWagers } from 'pages/Games/Lol/Wagers/Hosts/Ewagers';

// RL Specific Pages minus LANs
import { RL } from 'pages/Games/RL/RL';
// H2H
import { RLHeadToHead } from 'pages/Games/RL/HeadToHead/RLHeadToHead';
import { GanksterH2H as GanksterRLH2H } from 'pages/Games/RL/HeadToHead/Hosts/GanksterH2H';
import { PraccH2H as PraccRLH2H } from 'pages/Games/RL/HeadToHead/Hosts/PraccH2H';
// Leagues
import { RLLeagues } from 'pages/Games/RL/Leagues/RLLeagues';
import { FrontierDoublesLeagues } from 'pages/Games/RL/Leagues/Hosts/FrontierDoublesLeagues/FrontierDoublesLeagues';
import { FrontierEliteLeague } from 'pages/Games/RL/Leagues/Hosts/FrontierDoublesLeagues/FrontierEliteLeague';
import { FrontierExpertLeague } from 'pages/Games/RL/Leagues/Hosts/FrontierDoublesLeagues/FrontierExpertLeague';
import { FrontierOriginLeague } from 'pages/Games/RL/Leagues/Hosts/FrontierDoublesLeagues/FrontierOriginLeague';
import { FrontierStarLeague } from 'pages/Games/RL/Leagues/Hosts/FrontierDoublesLeagues/FrontierStarLeague';
import { ItalianRocketChampLeagues } from 'pages/Games/RL/Leagues/Hosts/ItalianRocketChampLeagues/ItalianRocketChampLeagues';
import { ItalianSerieALeague } from 'pages/Games/RL/Leagues/Hosts/ItalianRocketChampLeagues/ItalianSerieALeague';
import { ItalianSerieBLeague } from 'pages/Games/RL/Leagues/Hosts/ItalianRocketChampLeagues/ItalianSerieBLeague';
import { MinorLeagueEsportsLeagues } from 'pages/Games/RL/Leagues/Hosts/MinorLeagueEsportsLeagues/MinorLeagueEsportsLeagues';
import { MinorLeagueAcademyLeague } from 'pages/Games/RL/Leagues/Hosts/MinorLeagueEsportsLeagues/MinorLeagueAcademyLeague';
import { MinorLeagueChampionLeague } from 'pages/Games/RL/Leagues/Hosts/MinorLeagueEsportsLeagues/MinorLeagueChampionLeague';
import { MinorLeagueFoundationLeague } from 'pages/Games/RL/Leagues/Hosts/MinorLeagueEsportsLeagues/MinorLeagueFoundationLeague';
import { MinorLeagueMasterLeague } from 'pages/Games/RL/Leagues/Hosts/MinorLeagueEsportsLeagues/MinorLeagueMasterLeague';
import { MinorLeaguePremierLeague } from 'pages/Games/RL/Leagues/Hosts/MinorLeagueEsportsLeagues/MinorLeaguePremierLeague';
import { NemesisLeagues } from 'pages/Games/RL/Leagues/Hosts/NemesisLeagues/NemesisLeagues';
import { NemesisChallengerLeague } from 'pages/Games/RL/Leagues/Hosts/NemesisLeagues/NemesisChallengerLeague';
import { NemesisNoviceLeague } from 'pages/Games/RL/Leagues/Hosts/NemesisLeagues/NemesisNoviceLeague';
import { NemesisProspectLeague } from 'pages/Games/RL/Leagues/Hosts/NemesisLeagues/NemesisProspectLeague';
import { NemesisRivalLeague } from 'pages/Games/RL/Leagues/Hosts/NemesisLeagues/NemesisRivalLeague';
import { NemesisTitanLeague } from 'pages/Games/RL/Leagues/Hosts/NemesisLeagues/NemesisTitanLeague';
import { OCEDraftLeagues } from 'pages/Games/RL/Leagues/Hosts/OCEDraftLeagues/OCEDraftLeagues';
import { OCEDivisions } from 'pages/Games/RL/Leagues/Hosts/OCEDraftLeagues/OCEDivisions';
import { RLPCLeagues } from 'pages/Games/RL/Leagues/Hosts/RLPCLeagues/RLPCLeagues';
import { RLPCDoubleALeague } from 'pages/Games/RL/Leagues/Hosts/RLPCLeagues/RLPCDoubleALeague';
import { RLPCSingleALeague } from 'pages/Games/RL/Leagues/Hosts/RLPCLeagues/RLPCSingleALeague';
import { RLPCTripleALeague } from 'pages/Games/RL/Leagues/Hosts/RLPCLeagues/RLPCTripleALeague';
import { RocketSoccarConfederationLeagues } from 'pages/Games/RL/Leagues/Hosts/RocketSoccarConfederationLeagues/RocketSoccarConfederationLeagues';
import { RSC2v2League } from 'pages/Games/RL/Leagues/Hosts/RocketSoccarConfederationLeagues/RSC2v2League';
import { RSC3v3EULeague } from 'pages/Games/RL/Leagues/Hosts/RocketSoccarConfederationLeagues/RSC3v3EULeague';
import { RSC3v3NALeague } from 'pages/Games/RL/Leagues/Hosts/RocketSoccarConfederationLeagues/RSC3v3NALeague';
import { TeamFrontlineLeagues as TeamFrontlineRLLeagues } from 'pages/Games/RL/Leagues/Hosts/TeamFrontlineLeagues/TeamFrontlineLeagues';
import { TeamFrontlineChallengerLeague } from 'pages/Games/RL/Leagues/Hosts/TeamFrontlineLeagues/TeamFrontlineChallengerLeague';
import { TeamFrontlineChampLeague } from 'pages/Games/RL/Leagues/Hosts/TeamFrontlineLeagues/TeamFrontlineChampLeague';
import { TeamFrontlineProspectLeague } from 'pages/Games/RL/Leagues/Hosts/TeamFrontlineLeagues/TeamFrontlineProspectLeague';
import { TeamFrontlineVanguardLeague } from 'pages/Games/RL/Leagues/Hosts/TeamFrontlineLeagues/TeamFrontlineVanguardLeague';
import { UltimateRocketLeagueLeagues } from 'pages/Games/RL/Leagues/Hosts/UltimateRocketLeagueLeagues/UltimateRocketLeagueLeagues';
import { UltimateRL2v2League } from 'pages/Games/RL/Leagues/Hosts/UltimateRocketLeagueLeagues/UltimateRL2v2League';
import { UltimateRL3v3League } from 'pages/Games/RL/Leagues/Hosts/UltimateRocketLeagueLeagues/UltimateRL3v3League';
import { AirforceGamingLeague as AirforceRLLeague } from 'pages/Games/RL/Leagues/Hosts/AirforceGamingLeague';
import { AustralianEsportsHSLeague } from 'pages/Games/RL/Leagues/Hosts/AustralianEsportsHSLeague';
import { AustralianEsportsLeague as AustralianRLEsportsLeague } from 'pages/Games/RL/Leagues/Hosts/AustralianEsportsLeague';
import { CollegeCarballAssociationLeague } from 'pages/Games/RL/Leagues/Hosts/CollegeCarballAssociationLeague';
import { CorporateRLLeague } from 'pages/Games/RL/Leagues/Hosts/CorporateRLLeague';
import { CSMGLeague as CSMGRLLeague } from 'pages/Games/RL/Leagues/Hosts/CSMGLeague';
import { ECACEsportsLeague as ECACRLLeague } from 'pages/Games/RL/Leagues/Hosts/ECACEsportsLeague';
import { EGFCLeague as EGFCRLLeague } from 'pages/Games/RL/Leagues/Hosts/EGFCLeague';
import { EGFHLeague as EGFHRLLeague } from 'pages/Games/RL/Leagues/Hosts/EGFHLeague';
import { FaceitCollegiateLeague as FaceitRLLeague } from 'pages/Games/RL/Leagues/Hosts/FaceitCollegiateLeague';
import { FinalityLeague } from 'pages/Games/RL/Leagues/Hosts/FinalityLeague';
import { HighSchoolEsportsLeague as HighSchoolRLLeague } from 'pages/Games/RL/Leagues/Hosts/HighSchoolEsportsLeague';
import { NASEFLeague as NASEFRLLeague } from 'pages/Games/RL/Leagues/Hosts/NASEFLeague';
import { NationalStudentEsportsLeague as NationalStudentRLLeague } from 'pages/Games/RL/Leagues/Hosts/NationalStudentEsportsLeague';
import { NECCLeague as NECCRLLeague } from 'pages/Games/RL/Leagues/Hosts/NECCLeague';
import { NJCAAELeague as NJCAAERLLeague } from 'pages/Games/RL/Leagues/Hosts/NJCAAELeague';
import { PlayflyCollegeLeague as PlayflyRLLeague } from 'pages/Games/RL/Leagues/Hosts/PlayflyCollegeLeague';
import { PlayVSLeague as PlayVSRLLeague } from 'pages/Games/RL/Leagues/Hosts/PlayVSLeague';
import { RaketLigaenLeague } from 'pages/Games/RL/Leagues/Hosts/RaketLigaenLeague';
import { TheEsportsCompanyLeague } from 'pages/Games/RL/Leagues/Hosts/TheEsportsCompanyLeague';
import { UGCBattleAcademyLeague as UGCRLBattleAcademy } from 'pages/Games/RL/Leagues/Hosts/UGCBattleAcademyLeague';
import { UGCHSBattleAcademyLeague } from 'pages/Games/RL/Leagues/Hosts/UGCHSBattleAcademyLeague';
import { UnitedRogueLeague as UnitedRogueRLLeague } from 'pages/Games/RL/Leagues/Hosts/UnitedRogueLeague';
import { VantaGGLeague as VantaGGRLLeague } from 'pages/Games/RL/Leagues/Hosts/VantaGGLeague';
// Wagers
import { RLWagers } from 'pages/Games/RL/Wagers/RLWagers';
import { CmgWagers as CmgRLWagers } from 'pages/Games/RL/Wagers/Hosts/CmgWagers';
import { DropInGamingWagers as DropInRLWagers } from 'pages/Games/RL/Wagers/Hosts/DropInGamingWagers';
import { DubbzWagers as DubbzRLWagers } from 'pages/Games/RL/Wagers/Hosts/DubbzWagers';
import { Ewagers as RLEWagers } from 'pages/Games/RL/Wagers/Hosts/Ewagers';
import { GamerSaloonWagers as GamerSaloonRLWagers } from 'pages/Games/RL/Wagers/Hosts/GamerSaloonWagers';
import { RLPCMajorLeague } from 'pages/Games/RL/Leagues/Hosts/RLPCLeagues/RLPCMajorLeague';

// Valorant Specific Pages minus LANs
import { Valorant } from 'pages/Games/Valorant/Valorant';
// H2H
import { ValorantHeadToHead } from 'pages/Games/Valorant/HeadToHead/ValorantHeadToHead';
import { CollegiateValorantHubScrimsH2H } from 'pages/Games/Valorant/HeadToHead/Hosts/CollegiateValorantHubScrimsH2H';
import { DropInGamingH2H } from 'pages/Games/Valorant/HeadToHead/Hosts/DropInGamingH2H';
import { EsportsScrimH2H } from 'pages/Games/Valorant/HeadToHead/Hosts/EsportsScrimH2H';
import { GanksterGGH2H as GanksterValH2H } from 'pages/Games/Valorant/HeadToHead/Hosts/GanksterGGH2H';
import { PraccH2H as PraccValH2H } from 'pages/Games/Valorant/HeadToHead/Hosts/PraccH2H';
// Leagues
import { ValorantLeagues } from 'pages/Games/Valorant/Leagues/ValorantLeagues';
import { ECACLeagues as ECACValLeagues } from 'pages/Games/Valorant/Leagues/Hosts/ECACLeagues/ECACLeagues';
import { ECACDivisionALeague } from 'pages/Games/Valorant/Leagues/Hosts/ECACLeagues/ECACDivisionALeague';
import { ECACDivisionBLeague } from 'pages/Games/Valorant/Leagues/Hosts/ECACLeagues/ECACDivisionBLeague';
import { ECACDivisionCLeague } from 'pages/Games/Valorant/Leagues/Hosts/ECACLeagues/ECACDivisionCLeague';
import { LPLLeagues } from 'pages/Games/Valorant/Leagues/Hosts/LPLLeagues/LPLLeagues';
import { LPLBronzeDivisionLeague } from 'pages/Games/Valorant/Leagues/Hosts/LPLLeagues/LPLBronzeDivisionLeague';
import { LPLGoldDivisionLeague } from 'pages/Games/Valorant/Leagues/Hosts/LPLLeagues/LPLGoldDivisionLeague';
import { LPLSilverDivisionLeague } from 'pages/Games/Valorant/Leagues/Hosts/LPLLeagues/LPLSilverDivisionLeague';
import { LPLOpenDivisionLeague } from 'pages/Games/Valorant/Leagues/Hosts/LPLLeagues/LPLOpenDivisionLeague';
import { PlayflyCollegeLeagues } from 'pages/Games/Valorant/Leagues/Hosts/PlayflyCollegeLeagues/PlayflyCollegeLeagues';
import { PlayflyOpenLeague } from 'pages/Games/Valorant/Leagues/Hosts/PlayflyCollegeLeagues/PlayflyOpenLeague';
import { PlayflyVarsityLeague } from 'pages/Games/Valorant/Leagues/Hosts/PlayflyCollegeLeagues/PlayflyVarsityLeague';
import { TeamFrontlineLeagues as TeamFrontlineValLeagues } from 'pages/Games/Valorant/Leagues/Hosts/TeamFrontlineLeagues/TeamFrontlineLeagues';
import { TeamFrontlineAcademyLeague } from 'pages/Games/Valorant/Leagues/Hosts/TeamFrontlineLeagues/TeamFrontlineAcademyLeague';
import { TeamFrontlinePrimeLeague } from 'pages/Games/Valorant/Leagues/Hosts/TeamFrontlineLeagues/TeamFrontlinePrimeLeague';
import { CollegeValorantLeague } from 'pages/Games/Valorant/Leagues/Hosts/CollegeValorantLeague';
import { CorporateValorantLeague } from 'pages/Games/Valorant/Leagues/Hosts/CorporateValorantLeague';
import { CSMGLeague as CSMGValLeague } from 'pages/Games/RL/Leagues/Hosts/CSMGLeague';
import { EGFCLeague as EGFCVALLeague } from 'pages/Games/Valorant/Leagues/Hosts/EGFCLeague';
import { EGFHLeague as EGFHVALLeague } from 'pages/Games/Valorant/Leagues/Hosts/EGFHLeague';
import { EsportsCompanyLeague } from 'pages/Games/Valorant/Leagues/Hosts/EsportsCompanyLeague';
import { FaceitCollegiateLeague as FaceitValLeague } from 'pages/Games/Valorant/Leagues/Hosts/FaceitCollegiateLeague';
import { HighSchoolEsportsLeague as HighSchoolValLeague } from 'pages/Games/Valorant/Leagues/Hosts/HighSchoolEsportsLeague';
import { NASEFLeague as NASEFValLeague } from 'pages/Games/Valorant/Leagues/Hosts/NASEFLeague';
import { NationalStudentEsportsLeague as NationalStudentValLeague } from 'pages/Games/Valorant/Leagues/Hosts/NationalStudentEsportsLeague';
import { NECCLeague as NECCValLeague } from 'pages/Games/Valorant/Leagues/Hosts/NECCLeague';
import { NJCAAELeague as NJCAAEVALLeague } from 'pages/Games/Valorant/Leagues/Hosts/NJCAAELeague';
import { UGCBattleAcademyLeague as UGCValBattleAcademy } from 'pages/Games/Valorant/Leagues/Hosts/UGCBattleAcademyLeague';
import { UnifiedPremierLeague } from 'pages/Games/Valorant/Leagues/Hosts/UnifiedPremierLeague';
import { VantaGGLeague as VantaGGValLeague } from 'pages/Games/Valorant/Leagues/Hosts/VantaGGLeague';
// Wagers
import { ValorantWagers } from 'pages/Games/Valorant/Wagers/ValorantWagers';
import { DropInGamingWagers as DropInValWagers } from 'pages/Games/Valorant/Wagers/Hosts/DropInGamingWagers';
import { Ewagers as ValEwagers } from 'pages/Games/Valorant/Wagers/Hosts/Ewagers';

// Warzone Specific Pages minus LANs
import { Wz } from 'pages/Games/Wz/Wz';
import { WzLans } from 'pages/Games/Wz/Lans/WzLans';
// H2H
import { WzHeadToHead } from 'pages/Games/Wz/HeadToHead/WzHeadToHead';
import { CmgH2H as CmgWzH2H } from 'pages/Games/Wz/HeadToHead/Hosts/CmgH2H';
// Leagues
import { WzLeagues } from 'pages/Games/Wz/Leagues/WzLeagues';
import { AirForceGamingLeague as AirForceWzLeague } from 'pages/Games/Wz/Leagues/Hosts/AirForceGamingLeague';
import { GMHLGamingLeague } from 'pages/Games/Wz/Leagues/Hosts/GMHLGamingLeague';
import { NJCAAELeague as NJCAAEWzLeague } from 'pages/Games/Wz/Leagues/Hosts/NJCAAELeague';
// Wagers
import { WzWagers } from 'pages/Games/Wz/Wagers/WzWagers';
import { OneVOneMeWagers as OneVOneWzWagers } from 'pages/Games/Wz/Wagers/Hosts/1v1MeWagers';
import { CmgWagers as CmgWzWagers } from 'pages/Games/Wz/Wagers/Hosts/CmgWagers';
import { DropInGamingWagers as DropInWzWagers } from 'pages/Games/Wz/Wagers/Hosts/DropInGamingWagers';
import { DubbzWagers as DubbzWzWagers } from 'pages/Games/Wz/Wagers/Hosts/DubbzWagers';
import { Ewagers as WzEwagers } from 'pages/Games/Wz/Wagers/Hosts/Ewagers';
import { GamerSaloonWagers as GamerSaloonWzWagers } from 'pages/Games/Wz/Wagers/Hosts/GamerSaloonWagers';
import { OneUpWagers as OneUpWzWagers } from 'pages/Games/Wz/Wagers/Hosts/OneUpWagers';

// LAN Pages Ordered By Game: CoD, Warzone, Halo, LoL, Conventions

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

      {/* More Pages */}
      <Route path='/more/verification' element={<Verification />} />
      <Route path='/more/eventhost' element={<PostYourEvent />} />
      <Route path='/more/contactus' element={<ContactUs />} />
      <Route path='/more/FAQ' element={<Faqs />} />
      <Route path='/more/articles' element={<Articles />} />

      {/* Articles */}
      <Route path='/more/FAQ/The-Problem-With-Esports' element={<ProblemWithEsports />} />
      <Route path='/more/FAQ/How-Esports-Can-Be-Better' element={<HowEsportsCanBeBetter />} />
      <Route path='/more/FAQ/How-We-Fix-It' element={<HowWeFixIt />} />
      <Route path='/more/FAQ/What-We-Provide' element={<WhatWeProvide />} />
      <Route path='/more/FAQ/How-to-Join-an-Esports-League' element={<JoiningEsportsLeague />} />

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

      {/* Halo Pages Minus LANs */}
      <Route path='/games/halo' element={<Halo />} />
      <Route path='/games/halo/lans' element={<HaloLans />} />
      {/* H2H */}
      <Route path='/games/halo/head-to-head' element={<HaloHeadToHead />} />
      <Route path='/games/halo/head-to-head/ugc-scrim' element={<UGCCollegeHaloScrimsH2H />} />
      <Route path='/games/halo/head-to-head/rec-xp' element={<HaloRecLeagueScrimsH2H />} />
      <Route path='/games/halo/head-to-head/arena' element={<ArenaHaloH2H />} />
      <Route path='/games/halo/head-to-head/sauna' element={<SaunaScrimsH2H />} />
      {/* Leagues */}
      <Route path='/games/halo/leagues' element={<HaloLeagues />} />
      <Route path='/games/halo/leagues/halo-rec-league' element={<HaloRecLeague />} />
      <Route path='/games/halo/leagues/ascending-baseline' element={<AscendingBaselineLeagues />} />
      <Route path='/games/halo/leagues/ascending-baseline/ab' element={<AscendingBaselineABLeague />} />
      <Route path='/games/halo/leagues/ascending-baseline/pandemonium-games' element={<AscendingBaselinePandemoniumGamesLeague />} />
      <Route path='/games/halo/leagues/halo-agent' element={<HaloAgentLeague />} />
      <Route path='/games/halo/leagues/ugc-halo' element={<CollegeHaloLeague />} />
      <Route path='/games/halo/leagues/hsel' element={<HighSchoolHaloLeague />} />
      {/* Wagers */}
      <Route path='/games/halo/wagers' element={<HaloWagers />} />
      <Route path='/games/halo/wagers/cmg' element={<CmgHaloWagers />} />
      <Route path='/games/halo/wagers/oneup' element={<OneUpHaloWagers />} />
      <Route path='/games/halo/wagers/ewagers' element={<HaloEwagers />} />
      
      {/* LoL Pages Minus LANs */}
      <Route path='/games/LoL' element={<Lol />} />
      <Route path='/games/LoL/lans' element={<LolLans />} />
      {/* H2H */}
      <Route path='/games/LoL/head-to-head' element={<LolHeadToHead />} />
      <Route path='/games/LoL/head-to-head/gankster' element={<GanksterLoLH2H />} />
      <Route path='/games/LoL/head-to-head/esport-scrim' element={<LoLEsportsScrim />} />
      <Route path='/games/LoL/head-to-head/pracc' element={<PraccLoLH2H />} />
      {/* Leagues */}
      <Route path='/games/LoL/leagues' element={<LolLeagues />} />
      <Route path='/games/LoL/leagues/titan-leagues' element={<TitanEsportsLeagues />} />
      <Route path='/games/LoL/leagues/titan-leagues/immortal' element={<TitanImmortalLeague />} />
      <Route path='/games/LoL/leagues/titan-leagues/vanquisher' element={<TitanVanquisherLeague />} />
      <Route path='/games/LoL/leagues/titan-leagues/eternal' element={<TitanEternalLeague />} />
      <Route path='/games/LoL/leagues/titan-leagues/conqueror' element={<TitanConquerorLeague />} />
      <Route path='/games/LoL/leagues/titan-leagues/olympus' element={<TitanOlympusLeague />} />
      <Route path='/games/LoL/leagues/titan-leagues/divinity' element={<TitanDivinityLeague />} />
      <Route path='/games/LoL/leagues/titan-leagues/berserker' element={<TitanBerserkerLeague />} />
      <Route path='/games/LoL/leagues/titan-leagues/gladiator' element={<TitanGladiatorLeague />} />
      <Route path='/games/LoL/leagues/risen-leagues' element={<RisenLeagues />} />
      <Route path='/games/LoL/leagues/risen-leagues/champions' element={<RisenChampionsLeague />} />
      <Route path='/games/LoL/leagues/risen-leagues/dominate' element={<RisenDominateLeague />} />
      <Route path='/games/LoL/leagues/risen-leagues/unstoppable' element={<RisenUnstoppableLeague />} />
      <Route path='/games/LoL/leagues/risen-leagues/rampage' element={<RisenRampageLeague />} />
      <Route path='/games/LoL/leagues/risen-leagues/draft' element={<RisenDraftLeague />} />
      <Route path='/games/LoL/leagues/aegis-leagues' element={<AegisLeagues />} />
      <Route path='/games/LoL/leagues/aegis-leagues/champ' element={<AegisChampionsLeague />} />
      <Route path='/games/LoL/leagues/aegis-leagues/marauder' element={<AegisMarauderLeague />} />
      <Route path='/games/LoL/leagues/aegis-leagues/defenders' element={<AegisDefendersLeague />} />
      <Route path='/games/LoL/leagues/aegis-leagues/executioners' element={<AegisExecutionersLeague />} />
      <Route path='/games/LoL/leagues/aegis-leagues/protectors' element={<AegisProtectorsLeague />} />
      <Route path='/games/LoL/leagues/blue-otter-leagues' element={<BlueOtterLeagues />} />
      <Route path='/games/LoL/leagues/blue-otter-leagues/masters' element={<BlueOtterMastersLeague />} />
      <Route path='/games/LoL/leagues/blue-otter-leagues/diamond' element={<BlueOtterDiamondLeague />} />
      <Route path='/games/LoL/leagues/blue-otter-league/emerald' element={<BlueOtterEmeraldLeague />} />
      <Route path='/games/LoL/leagues/blue-otter-leagues/plat' element={<BlueOtterPlatinumLeague />} />
      <Route path='/games/LoL/leagues/blue-otter-leagues/gold' element={<BlueOtterGoldLeague />} />
      <Route path='/games/LoL/leagues/blue-otter-leagues/draft' element={<BlueOtterDraftLeague />} />
      <Route path='/games/LoL/leagues/black-twitch-league' element={<BlackTwitchLeague />} />
      <Route path='/games/LoL/leagues/low-budget-leagues' element={<LowBudgetLCSLeagues />} />
      <Route path='/games/LoL/leagues/low-budget-leagues/executive' element={<LowBudgetExecutiveLeague />} />
      <Route path='/games/LoL/leagues/low-budget-leagues/financial' element={<LowBudgetFinancialLeague />} />
      <Route path='/games/LoL/leagues/low-budget-leagues/commercial' element={<LowBudgetCommercialLeague />} />
      <Route path='/games/LoL/leagues/low-budget-leagues/economy' element={<LowBudgetEconomyLeague />} />
      <Route path='/games/LoL/leagues/meta-shift-leagues' element={<MetaShiftLeagues />} />
      <Route path='/games/LoL/leagues/meta-shift-leagues/radon' element={<MetaShiftRadonLeague />} />
      <Route path='/games/LoL/leagues/meta-shifts-leagues/xenon' element={<MetaShiftXenonLeague />} />
      <Route path='/games/LoL/leagues/meta-shift-leagues/krypton' element={<MetaShiftKryptonLeague />} />
      <Route path='/games/LoL/leagues/meta-shift-leagues/argon' element={<MetaShiftArgonLeague />} />
      <Route path='/games/LoL/leagues/meta-shift-leagues/nitrogen' element={<MetaShiftNitrogenLeague />} />
      <Route path='/games/LoL/leagues/meta-shift-leagues/neon' element={<MetaShiftNeonLeague />} />
      <Route path='/games/LoL/leagues/sdc' element={<SDCLeague />} />
      <Route path='/games/LoL/leagues/cobalt-winds-leagues' element={<CWLLeagues />} />
      <Route path='/games/LoL/leagues/cobalt-winds-leagues/cwl-ascend' element={<CWLAscendLeague />} />
      <Route path='/games/LoL/leagues/cobalt-winds-leagues/cwl-defy' element={<CWLDefyLeague />} />
      <Route path='/games/LoL/leagues/cobalt-winds-leagues/cwl-rise' element={<CWLRiseLeague />} />
      <Route path='/games/LoL/leagues/corporate-league' element={<CorporateLoLLeague />} />
      <Route path='/games/LoL/leagues/clol' element={<CLOLLeague />} />
      <Route path='/games/LoL/leagues/playfly' element={<PlayflyLoLLeague />} />
      <Route path='/games/LoL/leagues/necc' element={<NECCLoLLeague />} />
      <Route path='/games/LoL/leagues/ecac' element={<ECACLoLLeague />} />
      <Route path='/games/LoL/leagues/nse' element={<NationalStudentLoLLeague />} />
      <Route path='/games/LoL/leagues/vantagg' element={<VantaGGLoLLeague />} />
      <Route path='/games/LoL/leagues/playvs' element={<PlayVSLoLLeague />} />
      {/* Wagers */}
      <Route path='/games/LoL/wagers' element={<LolWagers />} />
      <Route path='/games/LoL/wagers/dropingaming' element={<DropInLoLWagers />} />
      <Route path='/games/LoL/wagers/dubbz' element={<DubbzLoLWagers />} />
      <Route path='/games/LoL/wagers/ewagers' element={<LoLEWagers />} />

      {/* RL Pages Minus LANs */}
      <Route path='/games/RocketLeague' element={<RL />} />
      {/* H2H */}
      <Route path='/games/RocketLeague/head-to-head' element={<RLHeadToHead />} />
      <Route path='/games/RocketLeague/head-to-head/gankster' element={<GanksterRLH2H />} />
      <Route path='/games/RocketLeague/head-to-head/pracc' element={<PraccRLH2H />} />
      {/* Leagues */}
      <Route path='/games/RocketLeague/leagues' element={<RLLeagues />} />
      <Route path='/games/RocketLeague/leagues/rlpc-leagues' element={<RLPCLeagues />} />
      <Route path='/games/RocketLeague/leagues/rlpc-leagues/major' element={<RLPCMajorLeague />} />
      <Route path='/games/RocketLeague/leagues/rlpc-leagues/aaa' element={<RLPCTripleALeague />} />
      <Route path='/games/RocketLeague/leagues/rlpc-leagues/aa' element={<RLPCDoubleALeague />} />
      <Route path='/games/RocketLeague/leagues/rlpc-leagues/a' element={<RLPCSingleALeague />} />
      <Route path='/games/RocketLeague/leagues/rsc-leagues' element={<RocketSoccarConfederationLeagues />} />
      <Route path='/games/RocketLeague/leagues/rsc-leagues/3v3-na' element={<RSC3v3NALeague />} />
      <Route path='/games/RocketLeague/leagues/rsc-leagues/3v3-eu' element={<RSC3v3EULeague />} />
      <Route path='/games/RocketLeague/leagues/rsc-leagues/2v2' element={<RSC2v2League />} />
      <Route path='/games/RocketLeague/leagues/frontline-leagues' element={<TeamFrontlineRLLeagues />} />
      <Route path='/games/RocketLeague/leagues/frontline-leagues/champ' element={<TeamFrontlineChampLeague />} />
      <Route path='/games/RocketLeague/leagues/frontline-leagues/vanguard' element={<TeamFrontlineVanguardLeague />} />
      <Route path='/games/RocketLeague/leagues/frontline-leagues/challenger' element={<TeamFrontlineChallengerLeague />} />
      <Route path='/games/RocketLeague/leagues/frontline-leagues/prospect' element={<TeamFrontlineProspectLeague />} />
      <Route path='/games/RocketLeague/leagues/url-leagues' element={<UltimateRocketLeagueLeagues />} />
      <Route path='/games/RocketLeague/leagues/2s' element={<UltimateRL2v2League />} />
      <Route path='/games/RocketLeague/leagues/3s' element={<UltimateRL3v3League />} />
      <Route path='/games/RocketLeague/leagues/mle-leagues' element={<MinorLeagueEsportsLeagues />} />
      <Route path='/games/RocketLeague/leagues/mle-leagues/premier' element={<MinorLeaguePremierLeague />} />
      <Route path='/games/RocketLeague/leagues/mle-leagues/master' element={<MinorLeagueMasterLeague />} />
      <Route path='/games/RocketLeague/leagues/mle-leagues/champ' element={<MinorLeagueChampionLeague />} />
      <Route path='/games/RocketLeague/leagues/mle-leagues/academy' element={<MinorLeagueAcademyLeague />} />
      <Route path='/games/RocketLeague/leagues/mle-leagues/foundation' element={<MinorLeagueFoundationLeague />} />
      <Route path='/games/RoketLeague/leagues/united-rogue' element={<UnitedRogueRLLeague />} />
      <Route path='/games/RocketLeague/leagues/italian-leagues' element={<ItalianRocketChampLeagues />} />
      <Route path='/games/RocketLeague/leagues/italian-leagues/serie-a' element={<ItalianSerieALeague />} />
      <Route path='/games/RocketLeague/leagues/italian-leagues/serie-b' element={<ItalianSerieBLeague />} />
      <Route path='/games/RocketLeague/leagues/nemesis-leagues' element={<NemesisLeagues />} />
      <Route path='/games/RocketLeague/leagues/nemesis-leagues/titan' element={<NemesisTitanLeague />} />
      <Route path='/games/RocketLeague/leagues/nemesis-leagues/rival' element={<NemesisRivalLeague />} />
      <Route path='/games/RocketLeague/leagues/nemesis-leagues/challanger' element={<NemesisChallengerLeague />} />
      <Route path='/games/RocketLeague/leagues/nemesis-leagues/prospect' element={<NemesisProspectLeague />} />
      <Route path='/games/RocketLeague/leagues/nemesis-leagues/novice' element={<NemesisNoviceLeague />} />
      <Route path='/games/RocketLeague/leagues/raket-ligaen' element={<RaketLigaenLeague />} />
      <Route path='/games/RocketLeague/leagues/frontier-doubles-leagues' element={<FrontierDoublesLeagues />} />
      <Route path='/games/RocketLeague/leagues/frontier-doubles-leagues/elite' element={<FrontierEliteLeague />} />
      <Route path='/games/RocketLeague/leagues/frontier-doubles-leagues/star' element={<FrontierStarLeague />} />
      <Route path='/games/RocketLeague/leagues/frontier-doubles-leagues/expert' element={<FrontierExpertLeague />} />
      <Route path='/games/RocketLeague/leagues/frontier-doubles-leagues/origin' element={<FrontierOriginLeague />} />
      <Route path='/games/RocketLeague/leagues/oce-leagues' element={<OCEDraftLeagues />} />
      <Route path='/games/RocketLeague/leagues/oce-leagues/divisions' element={<OCEDivisions />} />
      <Route path='/games/RocketLeague/leagues/finality' element={<FinalityLeague />} />
      <Route path='/games/RocketLeague/leagues/corporate' element={<CorporateRLLeague />} />
      <Route path='/games/RocketLeague/leagues/airforce' element={<AirforceRLLeague />} />
      <Route path='/games/RocketLeague/leagues/cca' element={<CollegeCarballAssociationLeague />} />
      <Route path='/games/RocketLeague/leagues/playfly' element={<PlayflyRLLeague />} />
      <Route path='/games/RocketLeague/leagues/ecac' element={<ECACRLLeague />} />
      <Route path='/games/RocketLeague/leagues/necc' element={<NECCRLLeague />} />
      <Route path='/games/RocketLeague/leagues/csmg' elemente={<CSMGRLLeague />} />
      <Route path='/games/RocketLeague/leagues/njcaae' element={<NJCAAERLLeague />} />
      <Route path='/games/RocketLeague/leagues/egfc' element={<EGFCRLLeague />} />
      <Route path='/games/RocketLeague/leagues/ugc' element={<UGCRLBattleAcademy />} />
      <Route path='/games/RocketLeague/leagues/ael' element={<AustralianRLEsportsLeague />} />
      <Route path='/games/RocketLeague/leagues/faceit' element={<FaceitRLLeague />} />
      <Route path='/games/RocketLeague/leagues/nse' element={<NationalStudentRLLeague />} />
      <Route path='/games/RocketLeague/leagues/hsel' element={<HighSchoolRLLeague />} />
      <Route path='/games/RocketLeague/leagues/playvs' element={<PlayVSRLLeague />} />
      <Route path='/games/RocketLeague/leagues/tec' element={<TheEsportsCompanyLeague />} />
      <Route path='/games/RocketLeague/leagues/vantagg' element={<VantaGGRLLeague />} />
      <Route path='/games/RocketLeague/leagues/nasef' element={<NASEFRLLeague />} />
      <Route path='/games/RocketLeague/leagues/egfh' element={<EGFHRLLeague />} />
      <Route path='/games/RocketLeague/leagues/aelhs' element={<AustralianEsportsHSLeague />} />
      <Route path='/games/RocketLeague/leagues/ugc-hs' element={<UGCHSBattleAcademyLeague />} />
      {/* Wagers */}
      <Route path='/games/RocketLeague/wagers' element={<RLWagers />} />
      <Route path='/games/RocketLeague/wagers/cmg' element={<CmgRLWagers />} />
      <Route path='/games/RocketLeague/wagers/dropingaming' element={<DropInRLWagers />} />
      <Route path='/games/RocketLeague/wagers/gamersaloon' element={<GamerSaloonRLWagers />} />
      <Route path='/games/RocketLeague/wagers/dubbz' element={<DubbzRLWagers />} />
      <Route path='/games/RocketLeague/wagers/ewagers' element={<RLEWagers />} />

      {/* Valorant Pages Minus LANs */}
      <Route path='/games/Valorant' element={<Valorant />} />
      {/* H2H */}
      <Route path='/games/Valorant/head-to-head' element={<ValorantHeadToHead />} />
      <Route path='/games/Valorant/head-to-head/gankster' element={<GanksterValH2H />} />
      <Route path='/games/Valorant/head-to-head/esport-scrim' element={<EsportsScrimH2H />} />
      <Route path='/games/Valorant/head-to-head/dropingaming' element={<DropInGamingH2H />} />
      <Route path='/games/Valorant/head-to-head/college-hub' element={<CollegiateValorantHubScrimsH2H />} />
      <Route path='/games/Valorant/head-to-head/pracc' element={<PraccValH2H />} />
      {/* Leagues */}
      <Route path='/games/Valorant/leagues' element={<ValorantLeagues />} />
      <Route path='/games/Valorant/leagues/lpl-leagues' element={<LPLLeagues />} />
      <Route path='/games/Valorant/leagues/lpl-leagues/gold' element={<LPLGoldDivisionLeague />} />
      <Route path='/games/Valorant/leagues/lpl-leagues/silver' element={<LPLSilverDivisionLeague />} />
      <Route path='/games/Valorant/leagues/lpl-leagues/bronze' element={<LPLBronzeDivisionLeague />} />
      <Route path='/games/Valorant/leagues/lpl-leagues/open' element={<LPLOpenDivisionLeague />} />
      <Route path='/games/Valorant/leagues/frontline-leagues' element={<TeamFrontlineValLeagues />} />
      <Route path='/games/Valorant/leagues/frontline-leagues/prime' element={<TeamFrontlinePrimeLeague />} />
      <Route path='/games/Valorant/leagues/frontline-leagues/academy' element={<TeamFrontlineAcademyLeague />} />
      <Route path='/games/Valorant/leagues/corporate' element={<CorporateValorantLeague />} />
      <Route path='/games/Valorant/leagues/unified' element={<UnifiedPremierLeague />} />
      <Route path='/games/Valorant/leagues/riot' element={<CollegeValorantLeague />} />
      <Route path='/games/Valorant/leagues/ecac-leagues' element={<ECACValLeagues />} />
      <Route path='/games/Valorant/leagues/ecac-leagues/division-a' element={<ECACDivisionALeague />} />
      <Route path='/games/Valorant/leagues/ecac-leagues/division-b' element={<ECACDivisionBLeague />} />
      <Route path='/games/Valorant/leagues/ecac-leagues/division-c' element={<ECACDivisionCLeague />} />
      <Route path='/games/Valorant/leagues/njcaae' element={<NJCAAEVALLeague />} />
      <Route path='/games/Valorant/leagues/necc' element={<NECCValLeague />} />
      <Route path='/games/Valorant/leagues/egfc' element={<EGFCVALLeague />} />
      <Route path='/games/Valorant/leagues/playfly-leagues' element={<PlayflyCollegeLeagues />} />
      <Route path='/games/Valorant/leagues/playfly-leagues/varsity' element={<PlayflyVarsityLeague />} />
      <Route path='/games/Valorant/leagues/playfly-leagues/open' element={<PlayflyOpenLeague />} />
      <Route path='/games/Valorant/leagues/csmg' element={<CSMGValLeague />} />
      <Route path='/games/Valorant/leagues/faceit' element={<FaceitValLeague />} />
      <Route path='/games/Valorant/leagues/nse' element={<NationalStudentValLeague />} />
      <Route path='/games/Valorant/leagues/ugc-college' element={<UGCValBattleAcademy />} />
      <Route path='/games/Valorant/leagues/hsel' element={<HighSchoolValLeague />} />
      <Route path='/games/Valorant/leagues/tec' element={<EsportsCompanyLeague />} />
      <Route path='/games/Valorant/leagues/vantagg' element={<VantaGGValLeague />} />
      <Route path='/games/Valorant/leagues/nasef' element={<NASEFValLeague />} />
      <Route path='/games/Valorant/leagues/egfh' element={<EGFHVALLeague />} />
      {/* Wagers */}
      <Route path='/games/Valorant/wagers' element={<ValorantWagers />} />
      <Route path='/games/Valorant/wagers/dropingaming' element={<DropInValWagers />} />
      <Route path='/games/Valorant/wagers/ewagers' element={<ValEwagers />} />

      {/* Warzone Pages Mins LANs */}
      <Route path='/games/warzone' element={<Wz />} />
      <Route path='/games/warzone/lans' element={<WzLans />} />
      {/* H2H */}
      <Route path='/games/warzone/head-to-head' element={<WzHeadToHead />} />
      <Route path='/games/warzone/cmg' element={<CmgWzH2H />} />
      {/* Leagues */}
      <Route path='/games/warzone/leagues' element={<WzLeagues />} />
      <Route path='/games/warzone/leagues/airforce' element={<AirForceWzLeague />} />
      <Route path='/games/warzone/leagues/ghml' element={<GMHLGamingLeague />} />
      <Route path='/games/warzone/leagues/njcaae' element={<NJCAAEWzLeague />} />
      {/* Wagers */}
      <Route path='/games/warzone/wagers' element={<WzWagers />} />
      <Route path='/games/warzone/wagers/cmg' element={<CmgWzWagers />} />
      <Route path='/games/warzone/wagers/oneup' element={<OneUpWzWagers />} />
      <Route path='/games/warzone/wagers/1v1me' element={<OneVOneWzWagers />} />
      <Route path='/games/warzone/wagers/gamersaloon' element={<GamerSaloonWzWagers />} />
      <Route path='/games/warzone/wagers/dropingaming' element={<DropInWzWagers />} />
      <Route path='/games/warzone/wagers/dubbz' element={<DubbzWzWagers />} />
      <Route path='/games/warzone/wagers/ewagers' element={<WzEwagers />} />

      {/* LANs Ordered By Game: CoD, Warzone, Halo, LoL, Conventions */}


    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
