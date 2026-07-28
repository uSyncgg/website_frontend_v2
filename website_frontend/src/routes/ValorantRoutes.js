import { Route, Routes } from 'react-router';

// Valorant Specific Pages
import { Valorant } from 'pages/Games/Valorant/Valorant';
// H2H
import { ValorantHeadToHead } from 'pages/Games/Valorant/HeadToHead/ValorantHeadToHead';
import { CollegiateValorantHubScrimsH2H } from 'pages/Games/Valorant/HeadToHead/Hosts/CollegiateValorantHubScrimsH2H';
import { EsportsScrimH2H } from 'pages/Games/Valorant/HeadToHead/Hosts/EsportsScrimH2H';
import { GanksterGGH2H as GanksterValH2H } from 'pages/Games/Valorant/HeadToHead/Hosts/GanksterGGH2H';
import { PraccH2H as PraccValH2H } from 'pages/Games/Valorant/HeadToHead/Hosts/PraccH2H';
// Leagues
import { ValorantLeagues } from 'pages/Games/Valorant/Leagues/ValorantLeagues';
import { PlayflyCollegeLeagues } from 'pages/Games/Valorant/Leagues/Hosts/PlayflyCollegeLeagues/PlayflyCollegeLeagues';
import { PlayflyOpenLeague } from 'pages/Games/Valorant/Leagues/Hosts/PlayflyCollegeLeagues/PlayflyOpenLeague';
import { PlayflyVarsityLeague } from 'pages/Games/Valorant/Leagues/Hosts/PlayflyCollegeLeagues/PlayflyVarsityLeague';
import { CollegeValorantLeague } from 'pages/Games/Valorant/Leagues/Hosts/CollegeValorantLeague';
import { CorporateValorantLeague } from 'pages/Games/Valorant/Leagues/Hosts/CorporateValorantLeague';
import { CECCLeague as CECCValLeague } from 'pages/Games/Valorant/Leagues/Hosts/CECCLeague';
import { EGFCLeague as EGFCVALLeague } from 'pages/Games/Valorant/Leagues/Hosts/EGFCLeague';
import { EGFHLeague as EGFHVALLeague } from 'pages/Games/Valorant/Leagues/Hosts/EGFHLeague';
import { EsportsCompanyLeague } from 'pages/Games/Valorant/Leagues/Hosts/EsportsCompanyLeague';
import { NASEFLeague as NASEFValLeague } from 'pages/Games/Valorant/Leagues/Hosts/NASEFLeague';
import { NationalStudentEsportsLeague as NationalStudentValLeague } from 'pages/Games/Valorant/Leagues/Hosts/NationalStudentEsportsLeague';
import { NECCLeague as NECCValLeague } from 'pages/Games/Valorant/Leagues/Hosts/NECCLeague';
import { NJCAAELeague as NJCAAEVALLeague } from 'pages/Games/Valorant/Leagues/Hosts/NJCAAELeague';
import { UnifiedPremierLeague } from 'pages/Games/Valorant/Leagues/Hosts/UnifiedPremierLeague';
// Wagers
import { ValorantWagers } from 'pages/Games/Valorant/Wagers/ValorantWagers';
import { Ewagers as ValEwagers } from 'pages/Games/Valorant/Wagers/Hosts/Ewagers';

const ValorantRoutes = () => (
    <Routes>
        <Route index element={<Valorant />} />
        {/* H2H */}
        <Route path='head-to-head' element={<ValorantHeadToHead />} />
        <Route path='head-to-head/gankster' element={<GanksterValH2H />} />
        <Route path='head-to-head/esport-scrim' element={<EsportsScrimH2H />} />
        <Route path='head-to-head/college-hub' element={<CollegiateValorantHubScrimsH2H />} />
        <Route path='head-to-head/pracc' element={<PraccValH2H />} />
        {/* Leagues */}
        <Route path='leagues' element={<ValorantLeagues />} />
        <Route path='leagues/corporate' element={<CorporateValorantLeague />} />
        <Route path='leagues/unified' element={<UnifiedPremierLeague />} />
        <Route path='leagues/riot' element={<CollegeValorantLeague />} />
        <Route path='leagues/njcaae' element={<NJCAAEVALLeague />} />
        <Route path='leagues/necc' element={<NECCValLeague />} />
        <Route path='leagues/egfc' element={<EGFCVALLeague />} />
        <Route path='leagues/playfly-leagues' element={<PlayflyCollegeLeagues />} />
        <Route path='leagues/playfly-leagues/varsity' element={<PlayflyVarsityLeague />} />
        <Route path='leagues/playfly-leagues/open' element={<PlayflyOpenLeague />} />
        <Route path='leagues/cecc' element={<CECCValLeague />} />
        <Route path='leagues/nse' element={<NationalStudentValLeague />} />
        <Route path='leagues/tec' element={<EsportsCompanyLeague />} />
        <Route path='leagues/nasef' element={<NASEFValLeague />} />
        <Route path='leagues/egfh' element={<EGFHVALLeague />} />
        {/* Wagers */}
        <Route path='wagers' element={<ValorantWagers />} />
        <Route path='wagers/ewagers' element={<ValEwagers />} />
    </Routes>
);

export default ValorantRoutes;
