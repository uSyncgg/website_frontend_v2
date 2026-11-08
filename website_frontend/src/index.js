import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

// Navbar & Footer
import { Navbar, Footer, ScrollToTop, ErrorBoundary } from 'components';

// Account Setup
import { SignUpFormWizard } from 'components';

// 404 fallback
import { NotFound } from 'pages/NotFound';

// Home + Top Level Pages
import { Home } from 'pages/Home';
import { Games } from 'pages/Games';
import { Leagues } from 'pages/Leagues';
import { Lans } from 'pages/Lans';
import { Tournaments } from 'pages/Tournaments';

// More Pages
import { ContactUs } from 'pages/More/ContactUs';
import { Faqs } from 'pages/More/Faqs';
import { PostYourEventEntry } from 'pages/More/PostYourEventEntry';
import { Verification } from 'pages/More/Verification';
import { ReportProblem } from 'pages/More/ReportProblem';
import { ComingSoon } from 'pages/More/ComingSoon';
import { TermsOfService } from 'pages/More/TermsOfService';
import { PrivacyPolicy } from 'pages/More/PrivacyPolicy';

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
import PassesRoutes from './routes/PassesRoutes';
import ArticleRoutes from './routes/ArticleRoutes';
import TournamentRoutes from './routes/TournamentRoutes';

// Authentication Routes
import { AuthPage } from 'pages/Accounts/Authentication/AuthPage';
import { ForgotPassword } from 'pages/Accounts/Authentication/ForgotPassword';
import { ResetPassword } from 'pages/Accounts/Authentication/ResetPassword';
import { RequireCompleteProfile, RedirectIfProfileComplete, RequireBracketHost } from 'components';
import { EventDashboard } from 'pages/Host/EventDashboard';
import { EVENT_DASHBOARD_PATH, HOSTING_DASHBOARD_PATH } from 'utils/hostEvents';
import { CreateEvent } from 'pages/Host/CreateEvent';
import { ManageEvent, EventOverview } from 'pages/Host/ManageEvent';
import { EventEntrants } from 'pages/Host/EventEntrants';
import { EventSeeding } from 'pages/Host/EventSeeding';
import { EventBracket } from 'pages/Host/EventBracket';
import { PublicBracket } from 'pages/Host/PublicBracket';
import { MatchPage } from 'pages/Host/MatchPage';
// MOCK chat preview pages - delete with src/pages/Mock.
import { ChatMock } from 'pages/Mock/ChatMock';
import { ChatNotificationsMock } from 'pages/Mock/ChatNotificationsMock';
import { TeamPage } from 'pages/Teams/TeamPage';
import { Profile, MyProfile } from 'pages/Accounts/Profile/Profile';
import { ProfileSettings, ProfileSettingsHome, AddProfile } from 'pages/Accounts/Settings/ProfileSettings';
import { ClaimEvent } from 'pages/Accounts/ClaimEvent/ClaimEvent';
import { CurrentUserProvider } from 'hooks';

const root = document.getElementById('root');

const app = (
  // <React.StrictMode>
  <BrowserRouter>
    <CurrentUserProvider>
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
            <Route path='/more/eventhost' element={<PostYourEventEntry />} />
            <Route path='/more/contactus' element={<ContactUs />} />
            <Route path='/more/FAQ' element={<Faqs />} />
            <Route path='/more/articles/*' element={<ArticleRoutes />} />
            <Route path='/more/terms-of-service' element={<TermsOfService />} />
            <Route path='/more/privacy-policy' element={<PrivacyPolicy />} />
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

            {/* Event Pass Portal */}
            <Route path='/passes/*' element={<PassesRoutes />} />

            {/* LANs */}
            <Route path='/other-lans' element={<Conventions />} />
            <Route path='/lans/*' element={<LanRoutes />} />

            {/* Authentication Routes */}
            <Route path='/login' element={<AuthPage mode="login" />} />
            <Route path='/signup' element={<AuthPage mode="signup" />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />

            {/* Public Profiles */}
            {/* The signed in user's own profile: forwards to their default profile, or shows a
                blank "incomplete" profile before sign-up is finished. */}
            <Route path='/profile' element={<RequireCompleteProfile />}>
              <Route index element={<MyProfile />} />
            </Route>
            {/* :username is optional - the page corrects it to the profile's current name. */}
            <Route path='/profile/:publicId/:username?' element={<Profile />} />
            <Route path='/profile/:publicId/:username/stats/:game?' element={<Profile stats />} />

            {/* Profile Completion — the destination RequireCompleteProfile redirects to,
                so it must not be wrapped by that same guard (that would redirect to itself). */}
            <Route element={<RequireCompleteProfile />}>
              <Route element={<RedirectIfProfileComplete />}>
                <Route path='/complete-profile' element={<SignUpFormWizard />} />
              </Route>
            </Route>

            {/* Profile Settings — logged-in users only; RequireCompleteProfile sends everyone else to /login.
                Each profile (player, host, venue) has its own settings; /add/:type adds a new one. */}
            <Route path='/settings/profile' element={<RequireCompleteProfile />}>
              <Route index element={<ProfileSettingsHome />} />
              <Route path='add/:type' element={<AddProfile />} />
              <Route path=':type' element={<ProfileSettings />} />
            </Route>

            {/* Event Dashboard - every signed-in account: events entered, and (as a host) events run. */}
            <Route path={EVENT_DASHBOARD_PATH} element={<RequireCompleteProfile />}>
              <Route index element={<EventDashboard />} />
            </Route>

            {/* A team's page: roster, owner, and (for the owner) managing it. Public. */}
            <Route path='/teams/:teamId' element={<TeamPage />} />


            {/* Bracket hosting - accounts with bracket hosting turned on (see RequireBracketHost). Mock data for now. */}
            <Route path='/host/events' element={<RequireBracketHost />}>
              <Route index element={<Navigate to={HOSTING_DASHBOARD_PATH} replace />} />
              <Route path='new' element={<CreateEvent />} />
              <Route path=':eventId' element={<ManageEvent />}>
                <Route index element={<EventOverview />} />
                <Route path='entrants' element={<EventEntrants />} />
                <Route path='seeding' element={<EventSeeding />} />
                <Route path='bracket' element={<EventBracket />} />
              </Route>
            </Route>
            {/* Public, read-only bracket page players are sent to. */}
            <Route path='/brackets/:eventId' element={<PublicBracket />} />
            {/* One match: opponents, rosters, rules, maps, reporting. Public. */}
            <Route path='/brackets/:eventId/matches/:matchId' element={<MatchPage />} />
            {/* MOCK pages for reviewing the match chat. Delete these two routes and src/pages/Mock. */}
            <Route path='/mock/chat' element={<ChatMock />} />
            <Route path='/mock/chat/notifications' element={<ChatNotificationsMock />} />

            {/* Hosts claim an existing event listing as theirs. Logged-out visitors go through
                /login (RequireCompleteProfile) and come back here afterwards. */}
            <Route path='/claim-event/:eventId' element={<RequireCompleteProfile />}>
              <Route index element={<ClaimEvent />} />
            </Route>

          </Routes>
        </ErrorBoundary>
      </main>
      
      <Footer />
    </div>
    </CurrentUserProvider>
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
