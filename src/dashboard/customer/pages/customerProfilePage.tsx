import { useState } from 'react';
import { Save, User } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { useAuth } from '../../../auth/AuthContext';

export default function CustomerProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Profile</h1>
        <p className="text-sm" style={{ color: 'black' }}>Your personal details</p>
      </div>

      <div className="glass-card p-6 rounded-2xl max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }}>
            {name?.[0] ?? <User size={18} />}
          </div>
          <div>
            <p className="text-black font-semibold text-sm">{name}</p>
            <p className="text-xs" style={{ color: '#6B7280' }}>{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-black" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Email</label>
            <input value={user?.email ?? ''} disabled className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Phone</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-black" />
          </div>
        </div>

        <button onClick={save} className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#2563EB' }}>
          <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </DashboardLayout>
  );
}
