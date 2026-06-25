import { QrCode, Star, TrendingUp, ThumbsUp, MessageSquare, Percent, ExternalLink } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import StatCard from '../components/StatCard';
import { BarChart } from '../components/MiniChart';
import { MOCK_STATS, MOCK_REVIEWS, MOCK_WEEKLY_SCANS } from '../../lib/mockData';
import { useAuth } from '../../auth/AuthContext';
import { Link } from 'react-router-dom';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const STATS = [
  { title: 'Total QR Scans',      value: '1,284',  change: 12,  changeLabel: 'vs last month', icon: <QrCode size={18} />,      color: '#3B82F6' },
  { title: 'Google Reviews',       value: 347,       change: 18,  changeLabel: 'vs last month', icon: <Star size={18} />,        color: '#F59E0B' },
  { title: 'Average Rating',       value: '4.7★',    change: 5,   changeLabel: 'vs last month', icon: <TrendingUp size={18} />,  color: '#22C55E' },
  { title: 'Positive Reviews',     value: 312,       change: 22,  changeLabel: 'this month',    icon: <ThumbsUp size={18} />,    color: '#8B5CF6' },
  { title: 'Private Feedback',     value: 35,        change: -8,  changeLabel: 'vs last month', icon: <MessageSquare size={18} />, color: '#EF4444' },
  { title: 'Conversion Rate',      value: '27%',     change: 4,   changeLabel: 'scan → review', icon: <Percent size={18} />,    color: '#F97316' },
];

export default function DashboardHome() {
  const { user } = useAuth();
  const recent = MOCK_REVIEWS.filter(r => r.platform === 'google').slice(0, 5);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">Good morning, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{user?.businessName} · Dashboard overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {STATS.map((s, i) => <StatCard key={s.title} {...s} delay={i * 0.07} />)}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-bold text-base">Weekly QR Scans</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Last 7 days</p>
            </div>
            <div className="text-right">
              <p className="text-white font-black text-2xl">{MOCK_STATS.scansThisWeek}</p>
              <p className="text-green-400 text-xs">↑ 12% this week</p>
            </div>
          </div>
          <BarChart data={MOCK_WEEKLY_SCANS} labels={DAYS} color="#3B82F6" height={140} />
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-white font-bold text-base mb-1">Rating Split</h3>
          <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Public vs. Private</p>
          <div className="space-y-3">
            {[
              { s: '5★', c: 185, col: '#22C55E', p: 53 }, { s: '4★', c: 98, col: '#84CC16', p: 28 },
              { s: '3★', c: 35, col: '#F59E0B', p: 10 }, { s: '2★', c: 20, col: '#F97316', p: 6 },
              { s: '1★', c: 9, col: '#EF4444', p: 3 },
            ].map(row => (
              <div key={row.s} className="flex items-center gap-3">
                <span className="w-5 flex-shrink-0 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{row.s}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${row.p}%`, background: row.col }} />
                </div>
                <span className="w-6 text-right text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{row.c}</span>
              </div>
            ))}
          </div>
          <div className="db-divider mt-5 mb-4" />
          <div className="flex justify-between">
            <span className="badge-success">312 Public</span>
            <span className="badge-error">35 Private</span>
          </div>
        </div>
      </div>

      {/* Recent reviews */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-bold text-base">Recent Reviews</h3>
          <Link to="/dashboard/reviews" className="flex items-center gap-1.5 text-xs font-medium transition-colors text-blue-400 hover:text-blue-300">
            View all <ExternalLink size={12} />
          </Link>
        </div>
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          {recent.map(r => (
            <div key={r.id} className="flex items-start gap-4 px-6 py-4 hover:bg-white/2 transition-colors">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 text-blue-400"
                style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
                {r.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white text-sm font-semibold">{r.customer}</span>
                  <div className="flex gap-0.5">
                    {[...Array(r.rating)].map((_, i) => <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
                <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>{r.preview}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{r.date}</span>
                <span className={r.status === 'published' ? 'badge-success' : 'badge-warning'}>{r.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
