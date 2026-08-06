import { useState } from 'react';
import { Search, User, Shield, Building2 } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_PLATFORM_USERS } from '../../../lib/mockData';

const ROLE_META: Record<string, { label: string; color: string; icon: typeof User }> = {
  owner: { label: 'Admin', color: '#8B5CF6', icon: Shield },
  business: { label: 'Business Owner', color: '#3B82F6', icon: Building2 },
  user: { label: 'Customer', color: '#22C55E', icon: User },
};

export default function OwnerUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'owner' | 'business' | 'user'>('all');

  const filtered = MOCK_PLATFORM_USERS.filter(u =>
    (roleFilter === 'all' || u.role === roleFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Users</h1>
        <p className="text-sm" style={{ color: 'black' }}>Manage business owners, customers and admins</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB]" />
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#F3F4F6' }}>
          {(['all', 'owner', 'business', 'user'] as const).map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${roleFilter === r ? 'bg-white shadow text-black' : 'text-gray-500'}`}>
              {r === 'all' ? 'All' : ROLE_META[r].label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Role</th>
              <th className="px-6 py-3 font-semibold">Joined</th>
              <th className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const meta = ROLE_META[u.role];
              const Icon = meta.icon;
              return (
                <tr key={u.id} className="border-t" style={{ borderColor: '#F3F4F6' }}>
                  <td className="px-6 py-3.5 text-black font-medium">{u.name}</td>
                  <td className="px-6 py-3.5 text-black">{u.email}</td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg"
                      style={{ background: `${meta.color}18`, color: meta.color }}>
                      <Icon size={12} /> {meta.label}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-black">{u.joined}</td>
                  <td className="px-6 py-3.5">
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg text-green-600 bg-green-50">{u.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
