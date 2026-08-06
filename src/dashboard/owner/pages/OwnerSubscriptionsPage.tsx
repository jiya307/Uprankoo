import { CreditCard, FileText } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_ADMIN_SUBSCRIPTIONS, MOCK_PLATFORM_STATS } from '../../../lib/mockData';

const STATUS_COLOR: Record<string, string> = {
  paid: '#22C55E', 'one-time': '#3B82F6', overdue: '#EF4444', pending: '#F59E0B',
};

export default function OwnerSubscriptionsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Subscriptions</h1>
        <p className="text-sm" style={{ color: 'black' }}>Plans, payments, renewals and invoices across every business</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5 rounded-2xl text-center">
          <p className="font-black text-2xl mb-1" style={{ color: '#8B5CF6' }}>{MOCK_PLATFORM_STATS.mrr}</p>
          <p className="text-xs" style={{ color: 'black' }}>Monthly Recurring Revenue</p>
        </div>
        <div className="glass-card p-5 rounded-2xl text-center">
          <p className="font-black text-2xl mb-1" style={{ color: '#22C55E' }}>{MOCK_PLATFORM_STATS.activeSubscriptions}</p>
          <p className="text-xs" style={{ color: 'black' }}>Active Subscriptions</p>
        </div>
        <div className="glass-card p-5 rounded-2xl text-center">
          <p className="font-black text-2xl mb-1" style={{ color: '#EF4444' }}>{MOCK_PLATFORM_STATS.pendingRenewals}</p>
          <p className="text-xs" style={{ color: 'black' }}>Pending Renewals</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>
              <th className="px-6 py-3 font-semibold">Business</th>
              <th className="px-6 py-3 font-semibold">Plan</th>
              <th className="px-6 py-3 font-semibold">Amount</th>
              <th className="px-6 py-3 font-semibold">Renews</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ADMIN_SUBSCRIPTIONS.map(s => (
              <tr key={s.id} className="border-t" style={{ borderColor: '#F3F4F6' }}>
                <td className="px-6 py-3.5 text-black font-medium flex items-center gap-2"><CreditCard size={14} className="text-gray-400" /> {s.business}</td>
                <td className="px-6 py-3.5 text-black">{s.plan}</td>
                <td className="px-6 py-3.5 text-black">{s.amount}</td>
                <td className="px-6 py-3.5 text-black">{s.renewsOn}</td>
                <td className="px-6 py-3.5">
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: `${STATUS_COLOR[s.status]}18`, color: STATUS_COLOR[s.status] }}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100" title="Download invoice"><FileText size={14} className="text-gray-500" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
