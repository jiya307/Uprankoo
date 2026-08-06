import {
  LayoutDashboard, QrCode, Star, BarChart3, Users, Sparkles, MessageSquare,
  CreditCard, Settings, ShieldCheck, Building2, LifeBuoy, Gift, History, UserCircle, Wrench,
} from 'lucide-react';
import type { AuthUser } from '../auth/AuthContext';

export interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}

// Business Owner dashboard — unchanged from the original nav.
export const BUSINESS_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, exact: true },
  { label: 'QR Codes', to: '/dashboard/qr-codes', icon: QrCode },
  { label: 'Reviews', to: '/dashboard/reviews', icon: Star },
  { label: 'Analytics', to: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Customers', to: '/dashboard/customers', icon: Users },
  { label: 'AI Review Generator', to: '/dashboard/ai-review', icon: Sparkles },
  { label: 'Feedback', to: '/dashboard/feedback', icon: MessageSquare },
  { label: 'Subscription', to: '/dashboard/subscription', icon: CreditCard },
  { label: 'Settings', to: '/dashboard/settings', icon: Settings },
];

// Admin / Owner dashboard — platform-wide, per the Upranko Dashboard Structure spec.
export const OWNER_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/owner', icon: LayoutDashboard, exact: true },
  { label: 'Businesses', to: '/owner/businesses', icon: Building2 },
  { label: 'Users', to: '/owner/users', icon: Users },
  { label: 'QR Management', to: '/owner/qr-management', icon: QrCode },
  { label: 'Reviews', to: '/owner/reviews', icon: Star },
  { label: 'AI Auto Reply', to: '/owner/ai-auto-reply', icon: Sparkles },
  { label: 'Subscriptions', to: '/owner/subscriptions', icon: CreditCard },
  { label: 'Analytics', to: '/owner/analytics', icon: BarChart3 },
  { label: 'Support', to: '/owner/support', icon: LifeBuoy },
  { label: 'Admin Tools', to: '/owner/tools', icon: Wrench },
  { label: 'Settings', to: '/owner/settings', icon: Settings },
];

// Customer dashboard — the "optional" role from the spec.
export const CUSTOMER_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/account', icon: LayoutDashboard, exact: true },
  { label: 'My Reviews', to: '/account/reviews', icon: Star },
  { label: 'Rewards', to: '/account/rewards', icon: Gift },
  { label: 'My Activity', to: '/account/activity', icon: History },
  { label: 'Profile', to: '/account/profile', icon: UserCircle },
  { label: 'Settings', to: '/account/settings', icon: Settings },
];

export function getNavItemsForRole(role: AuthUser['role'] | undefined): NavItem[] {
  if (role === 'owner') return OWNER_NAV_ITEMS;
  if (role === 'user') return CUSTOMER_NAV_ITEMS;
  return BUSINESS_NAV_ITEMS;
}

// Where each role should land immediately after logging in.
export function getHomePathForRole(role: AuthUser['role'] | undefined): string {
  if (role === 'owner') return '/owner';
  if (role === 'user') return '/account';
  if (role === 'business') return '/dashboard';
  return '/';
}

export const OWNER_ROLE_LABEL = 'Platform Admin';
export { ShieldCheck };

// Shared "who is this" label used in the sidebar pill and the navbar dropdown trigger.
export function getIdentityLabel(user: AuthUser | null | undefined): string {
  if (!user) return 'User';
  if (user.role === 'owner') return OWNER_ROLE_LABEL;
  if (user.role === 'user') return user.name || 'My Account';
  return user.businessName || 'Business';
}
