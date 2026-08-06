import { Star, Flag } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { DonutChart } from '../../components/MiniChart';
import { MOCK_REVIEWS, MOCK_FLAGGED_REVIEWS, MOCK_PLATFORM_STATS } from '../../../lib/mockData';

export default function OwnerReviewsPage() {
  const distribution = [5, 4, 3, 2, 1].map(r => ({
    value: MOCK_REVIEWS.filter(rv => rv.rating === r).length || 1,
    color: r >= 4 ? '#22C55E' : r === 3 ? '#F59E0B' : '#EF4444',
    label: `${r} star`,
  }));

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Reviews</h1>
        <p className="text-sm" style={{ color: 'black' }}>All reviews across the platform, rating distribution and flagged content</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        <div className="glass-card p-5 rounded-2xl text-center">
          <p className="font-black text-2xl mb-1" style={{ color: '#3B82F6' }}>{MOCK_PLATFORM_STATS.totalReviews.toLocaleString()}</p>
          <p className="text-xs" style={{ color: 'black' }}>Total Reviews</p>
        </div>
        <div className="glass-card p-6 rounded-2xl lg:col-span-2">
          <h3 className="text-black font-bold text-base mb-4">Rating Distribution</h3>
          <DonutChart segments={distribution} />
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden mb-8">
        <div className="px-6 py-4 border-b flex items-center gap-2" style={{ borderColor: '#E5E7EB' }}>
          <Flag size={15} className="text-red-500" />
          <h3 className="text-black font-bold text-base">Flagged Reviews</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>
              <th className="px-6 py-3 font-semibold">Business</th>
              <th className="px-6 py-3 font-semibold">Customer</th>
              <th className="px-6 py-3 font-semibold">Reason</th>
              <th className="px-6 py-3 font-semibold">Rating</th>
              <th className="px-6 py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_FLAGGED_REVIEWS.map(r => (
              <tr key={r.id} className="border-t" style={{ borderColor: '#F3F4F6' }}>
                <td className="px-6 py-3.5 text-black font-medium">{r.business}</td>
                <td className="px-6 py-3.5 text-black">{r.customer}</td>
                <td className="px-6 py-3.5"><span className="text-xs font-semibold px-2 py-1 rounded-lg text-red-600 bg-red-50">{r.reason}</span></td>
                <td className="px-6 py-3.5 text-black flex items-center gap-1"><Star size={12} className="text-amber-400" /> {r.rating}</td>
                <td className="px-6 py-3.5 text-black">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
