import { useState } from 'react';
import { Search, Building2, Ban, CheckCircle2, Eye } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_BUSINESSES_ADMIN } from '../../../lib/mockData';

export default function OwnerBusinessesPage() {
  const [search, setSearch] = useState('');
  const [businesses, setBusinesses] = useState(MOCK_BUSINESSES_ADMIN);

  const filtered = businesses.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) || b.owner.toLowerCase().includes(search.toLowerCase())
  );

  function toggleStatus(id: string) {
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'active' ? 'suspended' : 'active' } : b));
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-black font-black text-2xl mb-1">Businesses</h1>
          <p className="text-sm" style={{ color: 'black' }}>Add, edit, suspend or view every business on the platform</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#2563EB' }}>
          + Add Business
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search businesses or owners..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB]" />
          </div>
          <span className="text-xs text-gray-500 ml-auto">{filtered.length} businesses</span>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>
              <th className="px-6 py-3 font-semibold">Business</th>
              <th className="px-6 py-3 font-semibold">Owner</th>
              <th className="px-6 py-3 font-semibold">Plan</th>
              <th className="px-6 py-3 font-semibold">QR Stands</th>
              <th className="px-6 py-3 font-semibold">Reviews</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="border-t" style={{ borderColor: '#F3F4F6' }}>
                <td className="px-6 py-3.5 text-black font-medium flex items-center gap-2">
                  <Building2 size={14} className="text-gray-400" /> {b.name}
                </td>
                <td className="px-6 py-3.5 text-black">{b.owner}</td>
                <td className="px-6 py-3.5 text-black">{b.plan}</td>
                <td className="px-6 py-3.5 text-black">{b.qrStands}</td>
                <td className="px-6 py-3.5 text-black">{b.reviews}</td>
                <td className="px-6 py-3.5">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${b.status === 'active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100" title="View details"><Eye size={14} className="text-gray-500" /></button>
                    <button onClick={() => toggleStatus(b.id)} className="p-1.5 rounded-lg hover:bg-gray-100"
                      title={b.status === 'active' ? 'Suspend' : 'Activate'}>
                      {b.status === 'active' ? <Ban size={14} className="text-red-500" /> : <CheckCircle2 size={14} className="text-green-500" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
