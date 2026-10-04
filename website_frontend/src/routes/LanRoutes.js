import { Route, Routes } from 'react-router';

// All LANs
import { AllLans } from 'pages/Games/Conventions/AllLans';
import { LanDetail } from 'pages/Games/Shared/LanDetail';

const LanRoutes = () => (
    <Routes>
        {/* All LANs */}
        <Route path='all' element={<AllLans />} />

        {/* Generic fallback, powers every LAN event */}
        <Route path='*' element={<LanDetail />} />
    </Routes>
);

export default LanRoutes;
