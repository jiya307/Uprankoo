import DashboardLayout from '../layout/DashboardLayout';
import { BarChart, DonutChart } from '../components/MiniChart';
import { MOCK_WEEKLY_SCANS, MOCK_MONTHLY_REVIEWS } from '../../lib/mockData';
import { TrendingUp, Activity, BarChart3 } from 'lucide-react';

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">Analytics</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Performance insights and trends</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Scan → Review Rate', value: '27%', change: '+4%', color: '#3B82F6' },
          { label: 'Avg Reviews / Week', value: '11.2', change: '+2.1', color: '#22C55E' },
          { label: 'Private Rate', value: '10%', change: '-2%', color: '#F59E0B' },
          { label: 'Peak Hour', value: '7–9 PM', change: 'Consistent', color: '#8B5CF6' },
        ].map(m => (
          <div key={m.label} className="glass-card-hover p-5 rounded-2xl">
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{m.label}</p>
            <p className="text-white font-black text-2xl mb-1">{m.value}</p>
            <p className="text-xs font-medium" style={{ color: m.color }}>{m.change} vs last period</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-1"><Activity size={15} className="text-blue-400" /><h3 className="text-white font-bold text-base">QR Scans — This Week</h3></div>
          <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Total: {MOCK_WEEKLY_SCANS.reduce((a,b)=>a+b,0)} scans</p>
          <BarChart data={MOCK_WEEKLY_SCANS} labels={DAYS} color="#3B82F6" height={150} />
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-1"><TrendingUp size={15} className="text-green-400" /><h3 className="text-white font-bold text-base">Google Reviews — 12 Months</h3></div>
          <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Total: {MOCK_MONTHLY_REVIEWS.reduce((a,b)=>a+b,0)} reviews</p>
          <BarChart data={MOCK_MONTHLY_REVIEWS} labels={MONTHS} color="#22C55E" height={150} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-5"><BarChart3 size={15} className="text-purple-400" /><h3 className="text-white font-bold text-base">Sentiment Split</h3></div>
          <DonutChart segments={[
            { value: 312, color: '#22C55E', label: 'Positive (4–5★)' },
            { value: 35,  color: '#EF4444', label: 'Negative (1–3★)' },
          ]} />
        </div>
        <div className="glass-card p-6 rounded-2xl lg:col-span-2">
          <h3 className="text-white font-bold text-base mb-5">Conversion Funnel</h3>
          <div className="space-y-4">
            {[
              { label: 'Total QR Scans',   count: 1284, color: '#3B82F6', pct: 100 },
              { label: 'Review Page Opens', count: 987,  color: '#8B5CF6', pct: 77 },
              { label: 'Reviews Started',   count: 524,  color: '#F59E0B', pct: 41 },
              { label: 'Published Google',  count: 347,  color: '#22C55E', pct: 27 },
            ].map(row => (
              <div key={row.label} className="flex items-center gap-4">
                <div className="w-36 flex-shrink-0">
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{row.label}</p>
                  <p className="text-white font-bold text-sm">{row.count.toLocaleString()}</p>
                </div>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                </div>
                <span className="text-xs w-9 text-right" style={{ color: 'rgba(255,255,255,0.4)' }}>{row.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
