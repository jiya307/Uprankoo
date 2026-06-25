import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import BenefitsPage from './pages/BenefitsPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './auth/ProtectedRoute';
import DashboardHome from './dashboard/pages/DashboardHome';
import ReviewsPage from './dashboard/pages/ReviewesPage';
import AnalyticsPage from './dashboard/pages/AnalyticsPage';
import QRPage from './dashboard/pages/QRPage';
import CustomersPage from './dashboard/pages/CustomesPage';
import FeedbackPage from './dashboard/pages/FeedbackPage';
import AIReviewPage from './dashboard/pages/AIReviewingPage';
import SubscriptionPage from './dashboard/pages/SubscriptionPage';
import SettingsPage from './dashboard/pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/benefits" element={<BenefitsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected dashboard routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
        <Route path="/dashboard/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} />
        <Route path="/dashboard/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/dashboard/qr-codes" element={<ProtectedRoute><QRPage /></ProtectedRoute>} />
        <Route path="/dashboard/customers" element={<ProtectedRoute><CustomersPage /></ProtectedRoute>} />
        <Route path="/dashboard/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
        <Route path="/dashboard/ai-review" element={<ProtectedRoute><AIReviewPage /></ProtectedRoute>} />
        <Route path="/dashboard/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      
      </Routes>
    </BrowserRouter>
  );
}




