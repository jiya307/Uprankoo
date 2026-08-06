import { Building2, QrCode, Star, DollarSign, CreditCard, Clock } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import StatCard from '../../components/StatCard';
import { BarChart } from '../../components/MiniChart';
import { MOCK_PLATFORM_STATS, MOCK_PLATFORM_MONTHLY_REVENUE, MOCK_BUSINESSES_ADMIN } from '../../../lib/mockData';
import { useAuth } from '../../../auth/AuthContext';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function OwnerDashboardHome() {
  const { user } = useAuth();
  const s = MOCK_PLATFORM_STATS;
  const recentBusinesses = MOCK_BUSINESSES_ADMIN.slice(0, 5);

  const STATS = [
    { title: 'Total Businesses', value: s.totalBusinesses, icon: <Building2 size={18} />, color: '#3B82F6' },
    { title: 'Total QR Stands', value: s.totalQrStands, icon: <QrCode size={18} />, color: '#22C55E' },
    { title: 'Total QR Scans', value: s.totalQrScans.toLocaleString(), icon: <QrCode size={18} />, color: '#F97316' },
    { title: 'Total Reviews', value: s.totalReviews.toLocaleString(), icon: <Star size={18} />, color: '#F59E0B' },
    { title: 'MRR', value: s.mrr, icon: <DollarSign size={18} />, color: '#8B5CF6' },
    { title: 'Active Subscriptions', value: s.activeSubscriptions, icon: <CreditCard size={18} />, color: '#22C55E' },
    { title: 'Pending Renewals', value: s.pendingRenewals, icon: <Clock size={18} />, color: '#EF4444' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Platform overview, {user?.name?.split(' ')[0] ?? 'Admin'}</h1>
        <p className="text-sm text-black">Everything happening across Upranko right now</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 mb-8">
        {STATS.map((s, i) => <StatCard key={s.title} {...s} delay={i * 0.06} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-black font-bold text-base">Monthly Recurring Revenue</h3>
              <p className="text-xs mt-0.5" style={{ color: 'black' }}>Last 12 months</p>
            </div>
          </div>
          <BarChart data={MOCK_PLATFORM_MONTHLY_REVENUE} labels={MONTHS} />
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-black font-bold text-base mb-4">Recently Onboarded</h3>
          <div className="space-y-3">
            {recentBusinesses.map((b) => (
              <div key={b.id} className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-black text-sm font-semibold truncate">{b.name}</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>{b.plan} plan · {b.reviews} reviews</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${b.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
