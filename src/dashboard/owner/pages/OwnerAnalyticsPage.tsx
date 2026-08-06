import DashboardLayout from '../../layout/DashboardLayout';
import { BarChart } from '../../components/MiniChart';
import { MOCK_PLATFORM_MONTHLY_REVENUE, MOCK_WEEKLY_SCANS, MOCK_MONTHLY_REVIEWS } from '../../../lib/mockData';
import { TrendingUp } from 'lucide-react';

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function OwnerAnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Platform Analytics</h1>
        <p className="text-sm" style={{ color: 'black' }}>Review and scan trends across the entire platform</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={15} className="text-blue-500" />
            <h3 className="text-black font-bold text-base">Platform QR Scans (7 days)</h3>
          </div>
          <BarChart data={MOCK_WEEKLY_SCANS} labels={DAYS} />
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={15} className="text-green-500" />
            <h3 className="text-black font-bold text-base">Platform Reviews (12 months)</h3>
          </div>
          <BarChart data={MOCK_MONTHLY_REVIEWS} labels={MONTHS} color="green" />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-black font-bold text-base mb-4">Revenue Growth</h3>
        <BarChart data={MOCK_PLATFORM_MONTHLY_REVENUE} labels={MONTHS} />
      </div>
    </DashboardLayout>
  );
}
