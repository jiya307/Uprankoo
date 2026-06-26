import { useState } from 'react';
import { Search, Star, Users } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import { MOCK_CUSTOMERS } from '../../lib/mockData';

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Customers</h1>
        <p className="text-sm" style={{ color: 'gray' }}>Customers who left a review via your QR code</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Customers', value: MOCK_CUSTOMERS.length, color: '#3B82F6' },
          { label: 'Repeat Visitors', value: MOCK_CUSTOMERS.filter(c => c.visits > 3).length, color: '#22C55E' },
          { label: 'Avg Rating', value: (MOCK_CUSTOMERS.reduce((s,c) => s+c.avgRating,0)/MOCK_CUSTOMERS.length).toFixed(1)+'★', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="glass-card p-5 rounded-2xl text-center">
            <p className="font-black text-2xl mb-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs" style={{ color: 'black' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b" style={{ borderColor: 'black' }}>
        <div className="relative flex-1 max-w-sm">
  <Search
    size={14}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
  />

  <input
    value={search}
    onChange={e => setSearch(e.target.value)}
    placeholder="Search customers..."
    className="
      w-full
      pl-9
      pr-3
      py-2
      text-sm
      bg-white
      text-black
      placeholder:text-black/50
      border
      border-blue-500
      rounded-lg
      outline-none
    "
  />
</div>
          <div className="flex items-center gap-2" style={{ color: 'black' }}>
            <Users size={14} /><span className="text-xs">{filtered.length} customers</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: 'black' }}>
                {['Customer','Visits','Avg Rating','Last Visit','Total Spend'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'black' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'black' }}>
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: 'rgba(139,92,246,0.15)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.2)' }}>
                        {c.name.split(' ').map(n=>n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <p className="text-black text-sm font-semibold">{c.name}</p>
                        <p className="text-xs" style={{ color: 'black' }}>{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium" style={{ color: 'black' }}>{c.visits}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-black text-sm font-semibold">{c.avgRating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs" style={{ color: 'black' }}>{c.lastVisit}</td>
                  <td className="px-6 py-4 text-sm font-mono" style={{ color: 'black' }}>{c.totalSpend}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-sm" style={{ color: 'black' }}>No customers found.</div>}
        </div>
      </div>
    </DashboardLayout>
  );
}
