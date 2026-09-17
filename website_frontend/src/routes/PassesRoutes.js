import { Route, Routes } from 'react-router';

import PassSelection from 'pages/Passes/PassSelection/PassSelection';
import PassPayment from 'pages/Passes/PassPayment/PassPayment';
import PassReceipt from 'pages/Passes/PassReceipt/PassReceipt';

const PassesRoutes = () => (
    <Routes>
        {/* Registration-scoped steps, keyed only by registrationId */}
        <Route path='registration/:registrationId/payment' element={<PassPayment />} />
        <Route path='registration/:registrationId/receipt' element={<PassReceipt />} />

        {/* Generic fallback, powers pass selection for every event (slug may be multi-segment) */}
        <Route path='*' element={<PassSelection />} />
    </Routes>
);

export default PassesRoutes;
