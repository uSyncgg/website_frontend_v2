import { Route, Routes } from 'react-router';

// RL Specific Pages
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
import { FrontierAdeptLeague } from 'pages/Games/RL/Leagues/Hosts/FrontierDoublesLeagues/FrontierAdeptLeague';
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
import { NemesisProvisionalLeague } from 'pages/Games/RL/Leagues/Hosts/NemesisLeagues/NemesisProvisionalLeague';
import { RLPCLeagues } from 'pages/Games/RL/Leagues/Hosts/RLPCLeagues/RLPCLeagues';
import { RLPCDoubleALeague } from 'pages/Games/RL/Leagues/Hosts/RLPCLeagues/RLPCDoubleALeague';
import { RLPCSingleALeague } from 'pages/Games/RL/Leagues/Hosts/RLPCLeagues/RLPCSingleALeague';
import { RLPCTripleALeague } from 'pages/Games/RL/Leagues/Hosts/RLPCLeagues/RLPCTripleALeague';
import { RLPCMajorLeague } from 'pages/Games/RL/Leagues/Hosts/RLPCLeagues/RLPCMajorLeague';
import { RocketSoccarConfederationLeagues } from 'pages/Games/RL/Leagues/Hosts/RocketSoccarConfederationLeagues/RocketSoccarConfederationLeagues';
import { RSC3v3EULeague } from 'pages/Games/RL/Leagues/Hosts/RocketSoccarConfederationLeagues/RSC3v3EULeague';
import { RSC3v3NALeague } from 'pages/Games/RL/Leagues/Hosts/RocketSoccarConfederationLeagues/RSC3v3NALeague';
import { AirforceGamingLeague as AirforceRLLeague } from 'pages/Games/RL/Leagues/Hosts/AirforceGamingLeague';
import { AustralianEsportsHSLeague } from 'pages/Games/RL/Leagues/Hosts/AustralianEsportsHSLeague';
import { AustralianEsportsLeague as AustralianRLEsportsLeague } from 'pages/Games/RL/Leagues/Hosts/AustralianEsportsLeague';
import { CollegeCarballAssociationLeague } from 'pages/Games/RL/Leagues/Hosts/CollegeCarballAssociationLeague';
import { CorporateRLLeague } from 'pages/Games/RL/Leagues/Hosts/CorporateRLLeague';
import { CECCLeague as CECCRLLeague } from 'pages/Games/RL/Leagues/Hosts/CECCLeague';
import { ECACEsportsLeague as ECACRLLeague } from 'pages/Games/RL/Leagues/Hosts/ECACEsportsLeague';
import { EGFCLeague as EGFCRLLeague } from 'pages/Games/RL/Leagues/Hosts/EGFCLeague';
import { EGFHLeague as EGFHRLLeague } from 'pages/Games/RL/Leagues/Hosts/EGFHLeague';
import { NECCLeague as NECCRLLeague } from 'pages/Games/RL/Leagues/Hosts/NECCLeague';
import { NJCAAELeague as NJCAAERLLeague } from 'pages/Games/RL/Leagues/Hosts/NJCAAELeague';
import { PlayflyCollegeLeague as PlayflyRLLeague } from 'pages/Games/RL/Leagues/Hosts/PlayflyCollegeLeague';
import { PlayVSLeague as PlayVSRLLeague } from 'pages/Games/RL/Leagues/Hosts/PlayVSLeague';
import { TheEsportsCompanyLeague } from 'pages/Games/RL/Leagues/Hosts/TheEsportsCompanyLeague';
import { UnitedRogueLeague as UnitedRogueRLLeague } from 'pages/Games/RL/Leagues/Hosts/UnitedRogueLeague';
// Wagers
import { RLWagers } from 'pages/Games/RL/Wagers/RLWagers';
import { CmgWagers as CmgRLWagers } from 'pages/Games/RL/Wagers/Hosts/CmgWagers';
import { Ewagers as RLEWagers } from 'pages/Games/RL/Wagers/Hosts/Ewagers';
import { GamerSaloonWagers as GamerSaloonRLWagers } from 'pages/Games/RL/Wagers/Hosts/GamerSaloonWagers';

const RLRoutes = () => (
    <Routes>
        <Route index element={<RL />} />
        {/* H2H */}
        <Route path='head-to-head' element={<RLHeadToHead />} />
        <Route path='head-to-head/gankster' element={<GanksterRLH2H />} />
        <Route path='head-to-head/pracc' element={<PraccRLH2H />} />
        {/* Leagues */}
        <Route path='leagues' element={<RLLeagues />} />
        <Route path='leagues/rlpc-leagues' element={<RLPCLeagues />} />
        <Route path='leagues/rlpc-leagues/major' element={<RLPCMajorLeague />} />
        <Route path='leagues/rlpc-leagues/aaa' element={<RLPCTripleALeague />} />
        <Route path='leagues/rlpc-leagues/aa' element={<RLPCDoubleALeague />} />
        <Route path='leagues/rlpc-leagues/a' element={<RLPCSingleALeague />} />
        <Route path='leagues/mle-leagues' element={<MinorLeagueEsportsLeagues />} />
        <Route path='leagues/mle-leagues/premier' element={<MinorLeaguePremierLeague />} />
        <Route path='leagues/mle-leagues/master' element={<MinorLeagueMasterLeague />} />
        <Route path='leagues/mle-leagues/champ' element={<MinorLeagueChampionLeague />} />
        <Route path='leagues/mle-leagues/academy' element={<MinorLeagueAcademyLeague />} />
        <Route path='leagues/mle-leagues/foundation' element={<MinorLeagueFoundationLeague />} />
        <Route path='leagues/united-rogue' element={<UnitedRogueRLLeague />} />
        <Route path='leagues/italian-leagues' element={<ItalianRocketChampLeagues />} />
        <Route path='leagues/italian-leagues/serie-a' element={<ItalianSerieALeague />} />
        <Route path='leagues/italian-leagues/serie-b' element={<ItalianSerieBLeague />} />
        <Route path='leagues/nemesis-leagues' element={<NemesisLeagues />} />
        <Route path='leagues/nemesis-leagues/titan' element={<NemesisTitanLeague />} />
        <Route path='leagues/nemesis-leagues/rival' element={<NemesisRivalLeague />} />
        <Route path='leagues/nemesis-leagues/challenger' element={<NemesisChallengerLeague />} />
        <Route path='leagues/nemesis-leagues/prospect' element={<NemesisProspectLeague />} />
        <Route path='leagues/nemesis-leagues/novice' element={<NemesisNoviceLeague />} />
        <Route path='leagues/nemesis-leagues/provisional' element={<NemesisProvisionalLeague />} />
        <Route path='leagues/frontier-doubles-leagues' element={<FrontierDoublesLeagues />} />
        <Route path='leagues/frontier-doubles-leagues/elite' element={<FrontierEliteLeague />} />
        <Route path='leagues/frontier-doubles-leagues/star' element={<FrontierStarLeague />} />
        <Route path='leagues/frontier-doubles-leagues/expert' element={<FrontierExpertLeague />} />
        <Route path='leagues/frontier-doubles-leagues/origin' element={<FrontierOriginLeague />} />
        <Route path='leagues/frontier-doubles-leagues/adept' element={<FrontierAdeptLeague />} />
        <Route path='leagues/corporate' element={<CorporateRLLeague />} />
        <Route path='leagues/airforce' element={<AirforceRLLeague />} />
        <Route path='leagues/cca' element={<CollegeCarballAssociationLeague />} />
        <Route path='leagues/playfly' element={<PlayflyRLLeague />} />
        <Route path='leagues/ecac' element={<ECACRLLeague />} />
        <Route path='leagues/necc' element={<NECCRLLeague />} />
        <Route path='leagues/cecc' element={<CECCRLLeague />} />
        <Route path='leagues/njcaae' element={<NJCAAERLLeague />} />
        <Route path='leagues/egfc' element={<EGFCRLLeague />} />
        <Route path='leagues/ael' element={<AustralianRLEsportsLeague />} />
        <Route path='leagues/playvs' element={<PlayVSRLLeague />} />
        <Route path='leagues/tec' element={<TheEsportsCompanyLeague />} />
        <Route path='leagues/egfh' element={<EGFHRLLeague />} />
        <Route path='leagues/aelhs' element={<AustralianEsportsHSLeague />} />
        <Route path='leagues/rsc-leagues' element={<RocketSoccarConfederationLeagues />} />
        <Route path='leagues/rsc-leagues/3v3-na' element={<RSC3v3NALeague />} />
        <Route path='leagues/rsc-leagues/3v3-eu' element={<RSC3v3EULeague />} />
        {/* Wagers */}
        <Route path='wagers' element={<RLWagers />} />
        <Route path='wagers/cmg' element={<CmgRLWagers />} />
        <Route path='wagers/gamersaloon' element={<GamerSaloonRLWagers />} />
        <Route path='wagers/ewagers' element={<RLEWagers />} />
    </Routes>
);

export default RLRoutes;
