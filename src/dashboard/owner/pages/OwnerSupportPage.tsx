import { useState } from 'react';
import { LifeBuoy, Clock, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_SUPPORT_TICKETS } from '../../../lib/mockData';

const PRIORITY_COLOR: Record<string, string> = { high: '#EF4444', medium: '#F59E0B', low: '#3B82F6' };

export default function OwnerSupportPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const shown = MOCK_SUPPORT_TICKETS.filter(t => filter === 'all' || t.status === filter);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Support</h1>
        <p className="text-sm" style={{ color: 'black' }}>Support tickets and contact requests from businesses</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ background: '#F3F4F6' }}>
        {(['all', 'open', 'resolved'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-white shadow text-black' : 'text-gray-500'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {shown.map(t => (
          <div key={t.id} className="glass-card p-5 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,0.12)' }}>
                <LifeBuoy size={16} className="text-blue-500" />
              </div>
              <div>
                <p className="text-black font-semibold text-sm">{t.subject}</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>{t.business} · {t.created}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: `${PRIORITY_COLOR[t.priority]}18`, color: PRIORITY_COLOR[t.priority] }}>
                {t.priority}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg"
                style={{ background: t.status === 'open' ? '#FEF3C7' : '#DCFCE7', color: t.status === 'open' ? '#B45309' : '#15803D' }}>
                {t.status === 'open' ? <Clock size={11} /> : <CheckCircle2 size={11} />} {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
