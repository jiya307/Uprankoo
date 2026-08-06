import { useState } from 'react';
import { Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_BUSINESSES_ADMIN } from '../../../lib/mockData';

const TEMPLATES = [
  { id: 'tp1', name: 'Warm & Grateful', preview: 'Thank you so much for your kind words! We\u2019re thrilled you enjoyed your visit.' },
  { id: 'tp2', name: 'Professional & Concise', preview: 'Thank you for taking the time to share your feedback. We appreciate your support.' },
  { id: 'tp3', name: 'Apologetic (negative reviews)', preview: 'We\u2019re sorry to hear this. Please reach out so we can make it right.' },
];

export default function OwnerAIAutoReplyPage() {
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(
    Object.fromEntries(MOCK_BUSINESSES_ADMIN.map(b => [b.id, b.plan !== 'Starter']))
  );

  const toggle = (id: string) => setEnabledMap(prev => ({ ...prev, [id]: !prev[id] }));
  const enabledCount = Object.values(enabledMap).filter(Boolean).length;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">AI Auto Reply</h1>
        <p className="text-sm" style={{ color: 'black' }}>Enable/disable per business, monitor usage and manage templates</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5 rounded-2xl text-center">
          <p className="font-black text-2xl mb-1" style={{ color: '#22C55E' }}>{enabledCount}</p>
          <p className="text-xs" style={{ color: 'black' }}>Businesses Enabled</p>
        </div>
        <div className="glass-card p-5 rounded-2xl text-center">
          <p className="font-black text-2xl mb-1" style={{ color: '#3B82F6' }}>{MOCK_BUSINESSES_ADMIN.length - enabledCount}</p>
          <p className="text-xs" style={{ color: 'black' }}>Businesses Disabled</p>
        </div>
        <div className="glass-card p-5 rounded-2xl text-center">
          <p className="font-black text-2xl mb-1" style={{ color: '#8B5CF6' }}>{TEMPLATES.length}</p>
          <p className="text-xs" style={{ color: 'black' }}>Reply Templates</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>
              <th className="px-6 py-3 font-semibold">Business</th>
              <th className="px-6 py-3 font-semibold">Plan</th>
              <th className="px-6 py-3 font-semibold text-right">Auto Reply</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_BUSINESSES_ADMIN.map(b => (
              <tr key={b.id} className="border-t" style={{ borderColor: '#F3F4F6' }}>
                <td className="px-6 py-3.5 text-black font-medium">{b.name}</td>
                <td className="px-6 py-3.5 text-black">{b.plan}</td>
                <td className="px-6 py-3.5 text-right">
                  <button onClick={() => toggle(b.id)} className="inline-flex items-center gap-1.5 text-xs font-semibold">
                    {enabledMap[b.id]
                      ? <ToggleRight size={22} className="text-green-500" />
                      : <ToggleLeft size={22} className="text-gray-300" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-purple-500" />
          <h3 className="text-black font-bold text-base">Reply Templates</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {TEMPLATES.map(t => (
            <div key={t.id} className="rounded-xl p-4" style={{ background: '#F9FAFB' }}>
              <p className="text-black text-sm font-semibold mb-1.5">{t.name}</p>
              <p className="text-xs" style={{ color: '#6B7280' }}>{t.preview}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
