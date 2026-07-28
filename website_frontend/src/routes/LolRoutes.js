import { Route, Routes } from 'react-router';

// LoL Specific Pages
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
import { AegisChallengerLeague } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisChallengerLeague';
import { AegisDefendersLeague } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisDefendersLeague';
import { AegisExecutionersLeague } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisExecutionersLeague';
import { AegisMarauderLeague } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisMarauderLeague';
import { AegisVanguardLeague } from 'pages/Games/Lol/Leagues/Hosts/AegisLeagues/AegisVanguardLeague';
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
import { LowBudgetCEOLeague } from 'pages/Games/Lol/Leagues/Hosts/LowBudgetLCSLeagues/LowBudgetCEOLeague';
import { LowBudgetLTALeague } from 'pages/Games/Lol/Leagues/Hosts/LowBudgetLCSLeagues/LowBudgetLTALeague';
import { MetaShiftLeagues } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftLeagues';
import { MetaShiftCyanideLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftCyanideLeague';
import { MetaShiftEmeraldLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftEmeraldLeague';
import { MetaShiftDraftLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftDraftLeague';
import { MetaShiftPlatinumLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftPlatinumLeague';
import { MetaShiftNobleLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftNobleLeague';
import { MetaShiftDiamondLeague } from 'pages/Games/Lol/Leagues/Hosts/MetaShiftLeagues/MetaShiftDiamondLeague';
import { RisenLeagues } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenLeagues';
import { RisenChampionsLeague } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenChampionsLeague';
import { RisenDominateLeague } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenDominateLeague';
import { RisenDraftLeague } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenDraftLeague';
import { RisenRampageLeague } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenRampageLeague';
import { RisenUnstoppableLeague } from 'pages/Games/Lol/Leagues/Hosts/RisenLeagues/RisenUnstoppableLeague';
import { TitanEsportsLeagues } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanEsportsLeagues';
import { TitanConquerorLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanConquerorLeague';
import { TitanDivinityLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanDivinityLeague';
import { TitanEternalLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanEternalLeague';
import { TitanGladiatorLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanGladiatorLeague';
import { TitanImmortalLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanImmortalLeague';
import { TitanOlympusLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanOlympusLeague';
import { TitanVanquisherLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanVanquisherLeague';
import { TitanAscendantLeague } from 'pages/Games/Lol/Leagues/Hosts/TitanEsportsLeagues/TitanAscendantLeague ';
import { CLOLLeague } from 'pages/Games/Lol/Leagues/Hosts/CLOLLeague';
import { CorporateLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/CorporateLoLLeague';
import { ECACEsportsLeague as ECACLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/ECACEsportsLegaue';
import { NationalStudentEsportsLeague as NationalStudentLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/NationalStudentsEsportsLeague';
import { PlayflyCollegeLeague as PlayflyLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/PlayflyCollegeLeague';
import { PlayVSLeague as PlayVSLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/PlayVSLeague';
import { SDCLeague } from 'pages/Games/Lol/Leagues/Hosts/SDCLeague';
import { NECCLeague as NECCLoLLeague } from 'pages/Games/Lol/Leagues/Hosts/NECCLeague';
import { BlackTwitchLeague } from 'pages/Games/Lol/Leagues/Hosts/BlackTwitchLeague';
// Wagers
import { LolWagers } from 'pages/Games/Lol/Wagers/LolWagers';
import { Ewagers as LoLEWagers } from 'pages/Games/Lol/Wagers/Hosts/Ewagers';

const LolRoutes = () => (
    <Routes>
        <Route index element={<Lol />} />
        <Route path='lans' element={<LolLans />} />
        {/* H2H */}
        <Route path='head-to-head' element={<LolHeadToHead />} />
        <Route path='head-to-head/gankster' element={<GanksterLoLH2H />} />
        <Route path='head-to-head/esport-scrim' element={<LoLEsportsScrim />} />
        <Route path='head-to-head/pracc' element={<PraccLoLH2H />} />
        {/* Leagues */}
        <Route path='leagues' element={<LolLeagues />} />
        <Route path='leagues/titan-leagues' element={<TitanEsportsLeagues />} />
        <Route path='leagues/titan-leagues/immortal' element={<TitanImmortalLeague />} />
        <Route path='leagues/titan-leagues/vanquisher' element={<TitanVanquisherLeague />} />
        <Route path='leagues/titan-leagues/eternal' element={<TitanEternalLeague />} />
        <Route path='leagues/titan-leagues/conqueror' element={<TitanConquerorLeague />} />
        <Route path='leagues/titan-leagues/olympus' element={<TitanOlympusLeague />} />
        <Route path='leagues/titan-leagues/divinity' element={<TitanDivinityLeague />} />
        <Route path='leagues/titan-leagues/gladiator' element={<TitanGladiatorLeague />} />
        <Route path='leagues/titan-leagues/ascendant' element={<TitanAscendantLeague />} />
        <Route path='leagues/risen-leagues' element={<RisenLeagues />} />
        <Route path='leagues/risen-leagues/champions' element={<RisenChampionsLeague />} />
        <Route path='leagues/risen-leagues/dominate' element={<RisenDominateLeague />} />
        <Route path='leagues/risen-leagues/unstoppable' element={<RisenUnstoppableLeague />} />
        <Route path='leagues/risen-leagues/rampage' element={<RisenRampageLeague />} />
        <Route path='leagues/risen-leagues/draft' element={<RisenDraftLeague />} />
        <Route path='leagues/aegis-leagues' element={<AegisLeagues />} />
        <Route path='leagues/aegis-leagues/challenger' element={<AegisChallengerLeague />} />
        <Route path='leagues/aegis-leagues/marauder' element={<AegisMarauderLeague />} />
        <Route path='leagues/aegis-leagues/defenders' element={<AegisDefendersLeague />} />
        <Route path='leagues/aegis-leagues/executioners' element={<AegisExecutionersLeague />} />
        <Route path='leagues/aegis-leagues/vanguard' element={<AegisVanguardLeague />} />
        <Route path='leagues/blue-otter-leagues' element={<BlueOtterLeagues />} />
        <Route path='leagues/blue-otter-leagues/masters' element={<BlueOtterMastersLeague />} />
        <Route path='leagues/blue-otter-leagues/diamond' element={<BlueOtterDiamondLeague />} />
        <Route path='leagues/blue-otter-leagues/emerald' element={<BlueOtterEmeraldLeague />} />
        <Route path='leagues/blue-otter-leagues/plat' element={<BlueOtterPlatinumLeague />} />
        <Route path='leagues/blue-otter-leagues/gold' element={<BlueOtterGoldLeague />} />
        <Route path='leagues/blue-otter-leagues/draft' element={<BlueOtterDraftLeague />} />
        <Route path='leagues/low-budget-leagues' element={<LowBudgetLCSLeagues />} />
        <Route path='leagues/low-budget-leagues/executive' element={<LowBudgetExecutiveLeague />} />
        <Route path='leagues/low-budget-leagues/financial' element={<LowBudgetFinancialLeague />} />
        <Route path='leagues/low-budget-leagues/commercial' element={<LowBudgetCommercialLeague />} />
        <Route path='leagues/low-budget-leagues/economy' element={<LowBudgetEconomyLeague />} />
        <Route path='leagues/low-budget-leagues/ceo' element={<LowBudgetCEOLeague />} />
        <Route path='leagues/low-budget-leagues/lta' element={<LowBudgetLTALeague />} />
        <Route path='leagues/meta-shift-leagues' element={<MetaShiftLeagues />} />
        <Route path='leagues/meta-shift-leagues/noble' element={<MetaShiftNobleLeague />} />
        <Route path='leagues/meta-shift-leagues/diamond' element={<MetaShiftDiamondLeague />} />
        <Route path='leagues/meta-shift-leagues/emerald' element={<MetaShiftEmeraldLeague />} />
        <Route path='leagues/meta-shift-leagues/cyanide' element={<MetaShiftCyanideLeague />} />
        <Route path='leagues/meta-shift-leagues/platinum' element={<MetaShiftPlatinumLeague />} />
        <Route path='leagues/meta-shift-leagues/draft' element={<MetaShiftDraftLeague />} />
        <Route path='leagues/sdc' element={<SDCLeague />} />
        <Route path='leagues/cobalt-winds-leagues' element={<CWLLeagues />} />
        <Route path='leagues/cobalt-winds-leagues/cwl-ascend' element={<CWLAscendLeague />} />
        <Route path='leagues/cobalt-winds-leagues/cwl-defy' element={<CWLDefyLeague />} />
        <Route path='leagues/cobalt-winds-leagues/cwl-rise' element={<CWLRiseLeague />} />
        <Route path='leagues/corporate-league' element={<CorporateLoLLeague />} />
        <Route path='leagues/clol' element={<CLOLLeague />} />
        <Route path='leagues/playfly' element={<PlayflyLoLLeague />} />
        <Route path='leagues/necc' element={<NECCLoLLeague />} />
        <Route path='leagues/ecac' element={<ECACLoLLeague />} />
        <Route path='leagues/nse' element={<NationalStudentLoLLeague />} />
        <Route path='leagues/playvs' element={<PlayVSLoLLeague />} />
        <Route path='leagues/black-twitch-league' element={<BlackTwitchLeague />} />
        {/* Wagers */}
        <Route path='wagers' element={<LolWagers />} />
        <Route path='wagers/ewagers' element={<LoLEWagers />} />
    </Routes>
);

export default LolRoutes;
