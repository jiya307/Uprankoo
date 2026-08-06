import { Gift, Tag, Sparkles } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_CUSTOMER_REWARDS } from '../../../lib/mockData';

export default function RewardsPage() {
  const r = MOCK_CUSTOMER_REWARDS;
  const progress = Math.min(100, Math.round((r.points / r.nextTierAt) * 100));

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Rewards</h1>
        <p className="text-sm" style={{ color: 'black' }}>Loyalty points, coupons and offers</p>
      </div>

      <div className="glass-card p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Gift size={18} className="text-purple-500" />
            <p className="text-black font-bold">{r.points} points · {r.tier} tier</p>
          </div>
          <p className="text-xs" style={{ color: '#6B7280' }}>{r.nextTierAt - r.points} points to next tier</p>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
          <div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#8B5CF6,#6366F1)' }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tag size={15} className="text-blue-500" />
            <h3 className="text-black font-bold text-base">My Coupons</h3>
          </div>
          <div className="space-y-3">
            {r.coupons.map(c => (
              <div key={c.id} className="glass-card p-4 rounded-2xl">
                <p className="font-mono text-sm font-bold text-blue-600 mb-1">{c.code}</p>
                <p className="text-sm text-black mb-1">{c.description}</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>Expires {c.expires}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={15} className="text-amber-500" />
            <h3 className="text-black font-bold text-base">Offers For You</h3>
          </div>
          <div className="space-y-3">
            {r.offers.map(o => (
              <div key={o.id} className="glass-card p-4 rounded-2xl">
                <p className="text-sm font-semibold text-black mb-1">{o.title}</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>{o.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
