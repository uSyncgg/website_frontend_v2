import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router';

// Navbar & Footer
import { Navbar, Footer, ScrollToTop, ErrorBoundary } from 'components';

// Home + Top Level Pages
import { Home } from 'pages/Home';
import { Games } from 'pages/Games';
import { Leagues } from 'pages/Leagues';
import { Lans } from 'pages/Lans';
import { Tournaments } from 'pages/Tournaments';

// More Pages
import { ContactUs } from 'pages/More/ContactUs';
import { Faqs } from 'pages/More/Faqs';
import { PostYourEvent } from 'pages/More/PostYourEvent';
import { Verification } from 'pages/More/Verification';
import { ReportProblem } from 'pages/More/ReportProblem';
import { ComingSoon } from 'pages/More/ComingSoon';

// Payment Imports
import GeneralPaymentForm from 'pages/Payment/GeneralPaymentForm/GeneralPaymentForm';
import Checkout from 'pages/Payment/Checkout';
import GeneralPaymentReceipt from 'pages/Payment/Receipts/GeneralPaymentReceipt';
// PAYMENT IS A TESTING PAGE - NOT MEANT FOR PRODUCTION
import Payment from 'pages/Payment/PaymentCheckouts/Payment';

// LAN Pages
import { Conventions } from 'pages/Games/Conventions/Conventions';

// Game & Section Routes
import CodRoutes from './routes/CodRoutes';
import CSRoutes from './routes/CSRoutes';
import HaloRoutes from './routes/HaloRoutes';
import LolRoutes from './routes/LolRoutes';
import RLRoutes from './routes/RLRoutes';
import ValorantRoutes from './routes/ValorantRoutes';
import WzRoutes from './routes/WzRoutes';
import LanRoutes from './routes/LanRoutes';
import ArticleRoutes from './routes/ArticleRoutes';
import TournamentRoutes from './routes/TournamentRoutes';

const root = document.getElementById('root');

const app = (
  // <React.StrictMode>
  <BrowserRouter>
    <ScrollToTop />
    <div className='app-container'>
      <Navbar />

      <main className='main-content'>
        <ErrorBoundary>
          <Routes>
            {/* Home Page */}
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />

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
            <Route path='/more/articles/*' element={<ArticleRoutes />} />
            <Route path='/reportproblem' element={<ReportProblem />} />
            <Route path='/Comingsoon' element={<ComingSoon />} />

            {/* Game Pages Minus LANs and Tournaments */}
            <Route path='/games/call-of-duty/*' element={<CodRoutes />} />
            <Route path='/games/CS2/*' element={<CSRoutes />} />
            <Route path='/games/halo/*' element={<HaloRoutes />} />
            <Route path='/games/LoL/*' element={<LolRoutes />} />
            <Route path='/games/RocketLeague/*' element={<RLRoutes />} />
            <Route path='/games/Valorant/*' element={<ValorantRoutes />} />
            <Route path='/games/warzone/*' element={<WzRoutes />} />

            {/* Tournaments */}
            <Route path='/tournaments/*' element={<TournamentRoutes />} />

            {/* Payment Routes */}
            <Route path='/paymentform' element={<GeneralPaymentForm review={false} />} />
            <Route path='/paymentform/review' element={<GeneralPaymentForm review={true} />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/paymentform/test/receipt' element={<GeneralPaymentReceipt />} />
            {/* PAYMENT IS A TESTING PAGE NOT MEANT FOR PRODUCTION */}
            <Route path='/payment' element={<Payment />} />

            {/* LANs */}
            <Route path='/other-lans' element={<Conventions />} />
            <Route path='/lans/*' element={<LanRoutes />} />

          </Routes>
        </ErrorBoundary>
      </main>
      
      <Footer />
    </div>
  </BrowserRouter>
  // </React.StrictMode>
);

if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
