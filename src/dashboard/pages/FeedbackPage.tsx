import { useState } from 'react';
import { CheckCircle, Clock, MessageSquare } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import { MOCK_FEEDBACK } from '../../lib/mockData';

export default function FeedbackPage() {
  const [items, setItems] = useState(MOCK_FEEDBACK);
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');

  const toggle = (id: string) =>
    setItems(prev => prev.map(f => f.id === id ? { ...f, status: f.status === 'resolved' ? 'unresolved' : 'resolved' } : f));

  const shown = items.filter(f => filter === 'all' || f.status === filter);
  const unresolved = items.filter(f => f.status === 'unresolved').length;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Private Feedback</h1>
        <p className="text-sm" style={{ color: 'black' }}>Customer complaints captured privately — not visible on Google</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:'Total', value: items.length, color: '#3B82F6' },
          { label:'Unresolved', value: unresolved, color: '#EF4444' },
          { label:'Resolved', value: items.length - unresolved, color: '#22C55E' },
        ].map(s => (
          <div key={s.label} className="glass-card p-5 rounded-2xl text-center">
            <p className="font-black text-2xl mb-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs" style={{ color: 'black' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ background: 'blue', border: '1px solid rgba(255,255,255,0.08)' }}>
        {(['all','unresolved','resolved'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 capitalize ${filter === f ? 'bg-blue-500 text-black' : 'hover:text-white'}`}
            style={filter === f ? {} : { color: 'black' }}>
            {f} {f === 'unresolved' && unresolved > 0 ? `(${unresolved})` : ''}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {shown.map(item => (
          <div key={item.id} className={`glass-card p-6 rounded-2xl transition-all duration-300 ${item.status === 'resolved' ? 'opacity-55' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-red-400 flex-shrink-0"
                  style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {item.customer.split(' ').map(n=>n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <p className="text-black text-sm font-semibold">{item.customer}</p>
                  <p className="text-xs" style={{ color: 'black' }}>{item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {'★'.repeat(item.rating).split('').map((_,i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                {item.status === 'resolved'
                  ? <span className="badge-success ml-1"><CheckCircle size={10} /> OK</span>
                  : <span className="badge-error ml-1"><Clock size={10} /> Open</span>}
              </div>
            </div>
            <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)' }}>
              <div className="flex items-start gap-2">
                <MessageSquare size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm leading-relaxed" style={{ color: 'black' }}>{item.message}</p>
              </div>
            </div>
            <button onClick={() => toggle(item.id)}
              className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${item.status === 'resolved' ? '' : 'db-btn-primary'}`}
              style={item.status === 'resolved' ? { background: 'white', border: '1px solid rgba(255,255,255,0.08)', color: 'black' } : {}}>
              {item.status === 'resolved' ? '↩ Mark as Unresolved' : '✓ Mark as Resolved'}
            </button>
          </div>
        ))}
        {shown.length === 0 && (
          <div className="col-span-2 py-16 text-center">
            <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>All feedback resolved!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
