import { useState } from 'react';
import { Bell, Lock, Save } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';

export default function CustomerSettingsPage() {
  const [saved, setSaved] = useState(false);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Settings</h1>
        <p className="text-sm" style={{ color: 'black' }}>Password and notification preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-3xl">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={15} className="text-black" />
            <h3 className="text-black font-bold text-base">Password</h3>
          </div>
          <div className="space-y-3">
            <input type="password" placeholder="Current password" className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-black" />
            <input type="password" placeholder="New password" className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-black" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={15} className="text-black" />
            <h3 className="text-black font-bold text-base">Notifications</h3>
          </div>
          <div className="space-y-3">
            {['New offers & coupons', 'Reward point updates', 'Review reminders'].map(n => (
              <label key={n} className="flex items-center justify-between p-3 rounded-xl cursor-pointer" style={{ background: '#F9FAFB' }}>
                <span className="text-sm text-black">{n}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-500" />
              </label>
            ))}
          </div>
        </div>
      </div>

      <button onClick={save} className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#2563EB' }}>
        <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </DashboardLayout>
  );
}
