import { Star, MapPin, Gift, Activity as ActivityIcon } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_CUSTOMER_ACTIVITY } from '../../../lib/mockData';

const TYPE_META: Record<string, { icon: typeof Star; color: string }> = {
  review: { icon: Star, color: '#F59E0B' },
  visit: { icon: MapPin, color: '#3B82F6' },
  reward: { icon: Gift, color: '#8B5CF6' },
};

export default function MyActivityPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">My Activity</h1>
        <p className="text-sm" style={{ color: 'black' }}>Businesses visited and your review history</p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <ActivityIcon size={16} className="text-black" />
          <h3 className="text-black font-bold text-base">Timeline</h3>
        </div>
        <div className="space-y-5">
          {MOCK_CUSTOMER_ACTIVITY.map(a => {
            const meta = TYPE_META[a.type];
            const Icon = meta.icon;
            return (
              <div key={a.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${meta.color}18` }}>
                  <Icon size={14} style={{ color: meta.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-black text-sm font-medium">{a.description}</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>{a.business} · {a.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
