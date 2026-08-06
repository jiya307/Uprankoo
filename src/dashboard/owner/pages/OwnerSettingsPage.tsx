import { useState } from 'react';
import { User, Globe, Key, Bell, Save, ChevronRight } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { useAuth } from '../../../auth/AuthContext';

export default function OwnerSettingsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<'profile' | 'platform' | 'api' | 'notifications'>('profile');
  const [saved, setSaved] = useState(false);

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  const tabs = [
    { id: 'profile', icon: <User size={15} />, label: 'Profile' },
    { id: 'platform', icon: <Globe size={15} />, label: 'Platform Settings' },
    { id: 'api', icon: <Key size={15} />, label: 'API Keys' },
    { id: 'notifications', icon: <Bell size={15} />, label: 'Notifications' },
  ] as const;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Settings</h1>
        <p className="text-sm" style={{ color: 'black' }}>Admin profile, platform configuration, API keys and notifications</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="glass-card rounded-2xl p-2 w-full lg:w-56 flex-shrink-0">
          <div className="flex lg:flex-col gap-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left ${tab === t.id ? 'bg-blue-500/15 text-blue-600' : ''}`}
                style={tab !== t.id ? { color: '#4B5563' } : {}}>
                {t.icon}<span className="flex-1">{t.label}</span>
                <ChevronRight size={14} className="hidden lg:block" />
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 flex-1">
          {tab === 'profile' && (
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Name</label>
                <input defaultValue={user?.name} className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-black" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Email</label>
                <input defaultValue={user?.email} className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-black" />
              </div>
            </div>
          )}
          {tab === 'platform' && (
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Platform Name</label>
                <input defaultValue="Upranko" className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-black" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Support Email</label>
                <input defaultValue="support@upranko.com" className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-black" />
              </div>
            </div>
          )}
          {tab === 'api' && (
            <div className="space-y-3 max-w-md">
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F9FAFB' }}>
                <div>
                  <p className="text-black text-sm font-semibold">Production Key</p>
                  <p className="text-xs font-mono" style={{ color: '#6B7280' }}>upr_live_••••••••••••3f2a</p>
                </div>
                <button className="text-xs font-semibold text-blue-600">Rotate</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F9FAFB' }}>
                <div>
                  <p className="text-black text-sm font-semibold">Test Key</p>
                  <p className="text-xs font-mono" style={{ color: '#6B7280' }}>upr_test_••••••••••••9c1d</p>
                </div>
                <button className="text-xs font-semibold text-blue-600">Rotate</button>
              </div>
            </div>
          )}
          {tab === 'notifications' && (
            <div className="space-y-3 max-w-md">
              {['New business signups', 'Failed payments', 'Support tickets', 'Weekly platform summary'].map(n => (
                <label key={n} className="flex items-center justify-between p-3 rounded-xl cursor-pointer" style={{ background: '#F9FAFB' }}>
                  <span className="text-sm text-black">{n}</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-500" />
                </label>
              ))}
            </div>
          )}

          <button onClick={save} className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#2563EB' }}>
            <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
