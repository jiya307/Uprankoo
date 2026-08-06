import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import BenefitsPage from './pages/BenefitsPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RegisterPage from './pages/RegisterPage';
import RoleRoute from './auth/RoleRoute';
import AccessDeniedPage from './pages/AccessDeniedPage';

// Business Owner dashboard (role: 'business') — unchanged content, now scoped to that role only.
import DashboardHome from './dashboard/pages/DashboardHome';
import ReviewsPage from './dashboard/pages/ReviewesPage';
import AnalyticsPage from './dashboard/pages/AnalyticsPage';
import QRPage from './dashboard/pages/QRPage';
import CustomersPage from './dashboard/pages/CustomesPage';
import FeedbackPage from './dashboard/pages/FeedbackPage';
import AIReviewPage from './dashboard/pages/AIReviewingPage';
import SubscriptionPage from './dashboard/pages/SubscriptionPage';
import SettingsPage from './dashboard/pages/SettingsPage';

// Admin dashboard (role: 'owner') — platform-wide.
import OwnerAdminPage from './dashboard/pages/OwnerAdminPage';
import OwnerDashboardHome from './dashboard/owner/pages/OwnerDashboardHome';
import OwnerBusinessesPage from './dashboard/owner/pages/OwnerBusinessesPage';
import OwnerUsersPage from './dashboard/owner/pages/OwnerUserPage';
import OwnerQRManagementPage from './dashboard/owner/pages/OwnerQRManagementPage';
import OwnerReviewsPage from './dashboard/owner/pages/OwnerReviewsPage';
import OwnerAIAutoReplyPage from './dashboard/owner/pages/OwnerAIAutoReplyPage';
import OwnerSubscriptionsPage from './dashboard/owner/pages/OwnerSubscriptionsPage';
import OwnerAnalyticsPage from './dashboard/owner/pages/OwnerAnalyticsPage';
import OwnerSupportPage from './dashboard/owner/pages/OwnerSupportPage';
import OwnerSettingsPage from './dashboard/owner/pages/OwnerSettingsPage';

// Customer dashboard (role: 'user').
import CustomerDashboardHome from './dashboard/customer/pages/customerDashboardHome';
import MyReviewsPage from './dashboard/customer/pages/MyReviewsPage';
import WriteReviewPage from './dashboard/customer/pages/WriteReviewPage';
import RewardsPage from './dashboard/customer/pages/RewardsPage';
import MyActivityPage from './dashboard/customer/pages/MyActivityPage';
import CustomerProfilePage from './dashboard/customer/pages/customerProfilePage';
import CustomerSettingsPage from './dashboard/customer/pages/customerSettingsPage';

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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Business Owner dashboard — role: 'business' only */}
        <Route path="/dashboard" element={<RoleRoute allowedRoles={['business']}><DashboardHome /></RoleRoute>} />
        <Route path="/dashboard/reviews" element={<RoleRoute allowedRoles={['business']}><ReviewsPage /></RoleRoute>} />
        <Route path="/dashboard/analytics" element={<RoleRoute allowedRoles={['business']}><AnalyticsPage /></RoleRoute>} />
        <Route path="/dashboard/qr-codes" element={<RoleRoute allowedRoles={['business']}><QRPage /></RoleRoute>} />
        <Route path="/dashboard/customers" element={<RoleRoute allowedRoles={['business']}><CustomersPage /></RoleRoute>} />
        <Route path="/dashboard/feedback" element={<RoleRoute allowedRoles={['business']}><FeedbackPage /></RoleRoute>} />
        <Route path="/dashboard/ai-review" element={<RoleRoute allowedRoles={['business']}><AIReviewPage /></RoleRoute>} />
        <Route path="/dashboard/subscription" element={<RoleRoute allowedRoles={['business']}><SubscriptionPage /></RoleRoute>} />
        <Route path="/dashboard/settings" element={<RoleRoute allowedRoles={['business']}><SettingsPage /></RoleRoute>} />

        {/* Admin dashboard — role: 'owner' only */}
        <Route path="/owner" element={<RoleRoute allowedRoles={['owner']}><OwnerDashboardHome /></RoleRoute>} />
        <Route path="/owner/businesses" element={<RoleRoute allowedRoles={['owner']}><OwnerBusinessesPage /></RoleRoute>} />
        <Route path="/owner/users" element={<RoleRoute allowedRoles={['owner']}><OwnerUsersPage /></RoleRoute>} />
        <Route path="/owner/qr-management" element={<RoleRoute allowedRoles={['owner']}><OwnerQRManagementPage /></RoleRoute>} />
        <Route path="/owner/reviews" element={<RoleRoute allowedRoles={['owner']}><OwnerReviewsPage /></RoleRoute>} />
        <Route path="/owner/ai-auto-reply" element={<RoleRoute allowedRoles={['owner']}><OwnerAIAutoReplyPage /></RoleRoute>} />
        <Route path="/owner/subscriptions" element={<RoleRoute allowedRoles={['owner']}><OwnerSubscriptionsPage /></RoleRoute>} />
        <Route path="/owner/analytics" element={<RoleRoute allowedRoles={['owner']}><OwnerAnalyticsPage /></RoleRoute>} />
        <Route path="/owner/support" element={<RoleRoute allowedRoles={['owner']}><OwnerSupportPage /></RoleRoute>} />
        <Route path="/owner/tools" element={<RoleRoute allowedRoles={['owner']}><OwnerAdminPage /></RoleRoute>} />
        <Route path="/owner/settings" element={<RoleRoute allowedRoles={['owner']}><OwnerSettingsPage /></RoleRoute>} />

        {/* Customer dashboard — role: 'user' only */}
        <Route path="/account" element={<RoleRoute allowedRoles={['user']}><CustomerDashboardHome /></RoleRoute>} />
        <Route path="/account/reviews" element={<RoleRoute allowedRoles={['user']}><MyReviewsPage /></RoleRoute>} />
        <Route path="/account/write-review" element={<RoleRoute allowedRoles={['user']}><WriteReviewPage /></RoleRoute>} />
        <Route path="/account/rewards" element={<RoleRoute allowedRoles={['user']}><RewardsPage /></RoleRoute>} />
        <Route path="/account/activity" element={<RoleRoute allowedRoles={['user']}><MyActivityPage /></RoleRoute>} />
        <Route path="/account/profile" element={<RoleRoute allowedRoles={['user']}><CustomerProfilePage /></RoleRoute>} />
        <Route path="/account/settings" element={<RoleRoute allowedRoles={['user']}><CustomerSettingsPage /></RoleRoute>} />

        {/* Access denied */}
       <Route path="/403" element={<AccessDeniedPage />} />
      </Routes>
    </BrowserRouter>
  );
}
