import { MapPin, Star, Gift } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_CUSTOMER_RECENT_VISITS, MOCK_CUSTOMER_REWARDS } from '../../../lib/mockData';
import { useAuth } from '../../../auth/AuthContext';

export default function CustomerDashboardHome() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Welcome back, {user?.name?.split(' ')[0] ?? 'there'} 👋</h1>
        <p className="text-sm" style={{ color: 'black' }}>Here's what's new since your last visit</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Gift size={16} className="text-purple-500" />
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'black' }}>Reward Points</p>
          </div>
          <p className="text-black font-black text-3xl">{MOCK_CUSTOMER_REWARDS.points}</p>
          <p className="text-xs mt-1" style={{ color: '#6B7280' }}>{MOCK_CUSTOMER_REWARDS.tier} tier</p>
        </div>
        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} className="text-amber-500" />
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'black' }}>Reviews Left</p>
          </div>
          <p className="text-black font-black text-3xl">3</p>
          <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Across 3 businesses</p>
        </div>
        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-blue-500" />
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'black' }}>Businesses Visited</p>
          </div>
          <p className="text-black font-black text-3xl">{MOCK_CUSTOMER_RECENT_VISITS.length}</p>
          <p className="text-xs mt-1" style={{ color: '#6B7280' }}>This month</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-black font-bold text-base mb-4">Recent Visits</h3>
        <div className="space-y-3">
          {MOCK_CUSTOMER_RECENT_VISITS.map(v => (
            <div key={v.id} className="flex items-center justify-between">
              <div>
                <p className="text-black text-sm font-semibold">{v.business}</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>{v.date}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${v.reviewed ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>
                {v.reviewed ? 'Reviewed' : 'Leave a review'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
