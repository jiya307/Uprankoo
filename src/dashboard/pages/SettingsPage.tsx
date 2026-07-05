import { useState } from 'react';
import { User, Building2, Bell, Shield, Globe, Save, ChevronRight } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';

export default function SettingsPage() {
  const [tab, setTab] = useState<'profile' | 'business' | 'notifications' | 'security'>('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({ name: 'Birinder Singh', email: 'demo@upranko.com', phone: '+91 98765 43210' });
  const [business, setBusiness] = useState({ name: 'Upranko Cafe', type: 'Café', address: '123 Main Street, Delhi 110001', website: 'upranko.com' });
  const [notifications, setNotifications] = useState({ email: true, push: true, weekly: false });

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  const tabs = [
    { id: 'profile', icon: <User size={15} />, label: 'Profile' },
    { id: 'business', icon: <Building2 size={15} />, label: 'Business' },
    { id: 'notifications', icon: <Bell size={15} />, label: 'Notifications' },
    { id: 'security', icon: <Shield size={15} />, label: 'Security' },
  ] as const;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Settings</h1>
        <p className="text-sm" style={{ color: 'black' }}>Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="glass-card rounded-2xl p-2 w-full lg:w-56 flex-shrink-0">
          <div className="flex lg:flex-col gap-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left ${tab === t.id ? 'bg-blue-500/15 text-blue-400' : ''}`}
               style={tab !== t.id ? { color: '#4B5563' } : {}}>
                {t.icon}
                <span className="flex-1">{t.label}</span>
                <ChevronRight size={14} className="hidden lg:block" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {tab === 'profile' && (
            <div className="glass-card p-6 rounded-2xl space-y-5">
              <h3 className="text-black font-bold text-base">Profile Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
                  style={{ background: 'white', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.3)' }}>
                  {profile.name.split(' ').map(n=>n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <p className="text-black font-semibold">{profile.name}</p>
                  <p className="text-xs" style={{ color: 'black' }}>{profile.email}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
            <div>
  <label className="db-label">Full Name</label>
  <input
    value={profile.name}
    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
    className="w-full px-4 py-2 bg-white text-black border border-blue-500 rounded-lg"
  />
</div>

<div>
  <label className="db-label">Email</label>
  <input
    value={profile.email}
    onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
    className="w-full px-4 py-2 bg-white text-black border border-blue-500 rounded-lg"
  />
</div>

<div className="md:col-span-2">
  <label className="db-label">Phone</label>
  <input
    value={profile.phone}
    onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
    className="w-full px-4 py-2 bg-white text-black border border-blue-500 rounded-lg"
  />
</div>
              </div>
              <button onClick={save} className=" bg-white text-black border border-blue-500 w-fit">
                {saved ? <>✓ Saved!</> : <><Save size={14} /> Save Changes</>}
              </button>
            </div>
          )}

          {tab === 'business' && (
        <div
  className="p-8 rounded-[32px] space-y-6"
  style={{
    background: 'white',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.35)'
  }}
>
              <h3 className="text-black font-bold text-base">Business Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="db-label">Business Name</label>
                  <div>
  <label className="block text-sm font-medium text-black mb-2">
    QR Card Name
  </label>

  <input
    type="text"
    placeholder="e.g. Upranko Cafe QR"
    className="
      w-full
      px-5
      py-4
      rounded-2xl
      bg-white
      border
      border-black
      text-black
      placeholder:text-black
      backdrop-blur-xl
      shadow-lg
      transition-all
      duration-300
      focus:outline-none
      focus:border-[#D4AF37]
      focus:ring-4
      focus:ring-[#D4AF37]/10
    "
  />
</div>
                </div> 
                <div>
                  <label className="db-label text-black placeholder:text-black border-black">Business Type</label>
                  <select value={business.type} onChange={e => setBusiness(b => ({ ...b, type: e.target.value }))} className=" bg-white text-black border border-blue-500">
                    <option>Café</option><option>Restaurant</option><option>Retail</option><option>Salon</option><option>Hotel</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className=" bg-white text-black">Address</label>
                  <input value={business.address} onChange={e => setBusiness(b => ({ ...b, address: e.target.value }))} className=" bg-white text-black border border-blue-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="db-label flex items-center gap-2"><Globe size={12} /> Website</label>
                  <input value={business.website} onChange={e => setBusiness(b => ({ ...b, website: e.target.value }))} className=" bg-white text-black border border-blue-500" />
                </div>
              </div>
              <button onClick={save} className=" bg-white text-black border border-blue-500 w-fit">
                {saved ? <>✓ Saved!</> : <><Save size={14} /> Save Changes</>}
              </button>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="glass-card p-6 rounded-2xl space-y-5">
              <h3 className="text-black font-bold text-base">Notification Preferences</h3>
              {[
                { key: 'email', title: 'Email Notifications', desc: 'Receive updates about new reviews via email' },
                { key: 'push', title: 'Push Notifications', desc: 'Get instant alerts on your device' },
                { key: 'weekly', title: 'Weekly Summary', desc: 'Receive a weekly performance report' },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'lightblue', border: '1px solid blue' }}>
                  <div>
                    <p className="text-black text-sm font-semibold">{n.title}</p>
                    <p className="text-xs" style={{ color: 'black' }}>{n.desc}</p>
                  </div>
                  <button onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                    className={`w-12 h-6 rounded-full transition-all duration-200 ${notifications[n.key as keyof typeof notifications] ? 'bg-blue-500' : ''}`}
                    style={!notifications[n.key as keyof typeof notifications] ? { background: 'white' } : {}}>
                    <div className={`w-5 h-5 rounded-full bg-blue-900 shadow-md transition-all duration-200 ${notifications[n.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === 'security' && (
            <div className="glass-card p-6 rounded-2xl space-y-5">
              <h3 className="text-black font-bold text-base">Security Settings</h3>
              <div className="p-5 rounded-xl" style={{ background: 'white', border: '1px solid blue' }}>
                <p className="text-black text-sm font-semibold mb-1">Change Password</p>
                <p className="text-xs mb-4" style={{ color: 'black' }}>Update your password regularly for better security</p>
                <div className="space-y-3">
                  <input type="password" placeholder="Current password" className=" bg-white text-black border border-blue-500 w-full" />
                  <input type="password" placeholder="New password" className=" bg-white text-black border border-blue-500 w-full" />
                  <input type="password" placeholder="Confirm new password" className=" bg-white text-black border border-blue-500 w-full" />
                  <button className="db-btn-primary w-fit" style={{ background: 'white', border: '1px solid blue border: 2px' }}>
                    Update Password
                  </button>
                </div>
              </div>
              <div className="p-5 rounded-xl" style={{ background: 'white', border: '1px solid blue ' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={16} className="text-green-400" />
                  <p className="text-black text-sm font-semibold">Two-Factor Authentication</p>
                </div>
                <p className="text-xs mb-3" style={{ color: 'black' }}>Add an extra layer of security to your account</p>
                <button className="db-btn-secondary text-xs">Enable 2FA</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
