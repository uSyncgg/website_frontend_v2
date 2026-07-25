import { Route, Routes } from 'react-router';

import { Articles } from 'pages/More/Articles';
import { ProblemWithEsports } from 'pages/More/Articles/ProblemWithEsports';
import { HowEsportsCanBeBetter } from 'pages/More/Articles/HowEsportsCanBeBetter';
import { HowWeFixIt } from 'pages/More/Articles/HowWeFixIt';
import { WhatWeProvide } from 'pages/More/Articles/WhatWeProvide';
import { JoiningEsportsLeague } from 'pages/More/Articles/JoiningEsportsLeague';
import { WhyUsyncIsUnique } from 'pages/More/Articles/WhyUsyncIsUnique';
import { BlackOps7Settings } from 'pages/More/Articles/BlackOps7Settings';
import { ValorantDPI } from 'pages/More/Articles/ValorantDPI';
import { PS5_120Hz } from 'pages/More/Articles/PS5_120Hz';
import { EsportsTournamentsNearMe } from 'pages/More/Articles/EsportsTournamentsNearMe';
import { JoinOnlineTournament } from 'pages/More/Articles/JoinOnlineTournament';

const ArticleRoutes = () => (
    <Routes>
        <Route index element={<Articles />} />
        <Route path='The-Problem-With-Esports' element={<ProblemWithEsports />} />
        <Route path='How-Esports-Can-Be-Better' element={<HowEsportsCanBeBetter />} />
        <Route path='How-We-Fix-It' element={<HowWeFixIt />} />
        <Route path='What-We-Provide' element={<WhatWeProvide />} />
        <Route path='How-to-Join-an-Esports-League' element={<JoiningEsportsLeague />} />
        <Route path='why-usync-is-unique' element={<WhyUsyncIsUnique />} />
        <Route path='black-ops-7-best-controller-settings' element={<BlackOps7Settings />} />
        <Route path='best-dpi-valorant-sensitivity' element={<ValorantDPI />} />
        <Route path='how-to-enable-120hz-ps5' element={<PS5_120Hz />} />
        <Route path='esports-tournaments-near-me' element={<EsportsTournamentsNearMe />} />
        <Route path='how-to-join-online-gaming-tournaments' element={<JoinOnlineTournament />} />
    </Routes>
);

export default ArticleRoutes;
