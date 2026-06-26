import { useState } from 'react';
import { Star, Search, Filter } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import { MOCK_REVIEWS } from '../../lib/mockData';

const PER = 5;

export default function ReviewsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rFilter, setRFilter] = useState<number | null>(null);

  const filtered = MOCK_REVIEWS.filter(r => {
    const s = r.customer.toLowerCase().includes(search.toLowerCase()) || r.preview.toLowerCase().includes(search.toLowerCase());
    return s && (rFilter === null || r.rating === rFilter);
  });

  const total = Math.ceil(filtered.length / PER);
  const rows = filtered.slice((page - 1) * PER, page * PER);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Reviews</h1>
        <p className="text-sm" style={{ color: 'black' }}>All customer reviews — public and private</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total', value: MOCK_REVIEWS.length, color: '#3B82F6' },
          { label: 'Published', value: MOCK_REVIEWS.filter(r => r.status === 'published').length, color: '#22C55E' },
          { label: 'Private / Pending', value: MOCK_REVIEWS.filter(r => r.status !== 'published').length, color: '#EF4444' },
        ].map(s => (
          <div key={s.label} className="glass-card p-5 rounded-2xl text-center">
            <p className="font-black text-2xl mb-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs" style={{ color: 'black' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b" style={{ borderColor: 'black' }}>
          <div className="relative flex-1 min-w-[180px] max-w-xs">
  <Search
    size={14}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
  />

  <input
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    placeholder="Search reviews..."
    className="
      w-full
      pl-9
      pr-3
      py-2
      rounded-lg
      bg-white
      text-black
      placeholder:text-black
      border
      border-blue-500
      outline-none
    "
  />
</div>
          <div className="flex items-center gap-1.5">
            <Filter size={13} style={{ color: 'black' }} />
            {[null, 5, 4, 3, 2, 1].map(r => (
              <button key={String(r)} onClick={() => { setRFilter(r); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${rFilter === r ? 'bg-blue-500 text-black' : 'hover:bg-white'}`}
                style={rFilter === r ? {} : { color: 'black' }}>
                {r === null ? 'All' : `${r}★`}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: 'black' }}>
          {rows.map(r => (
            <div key={r.id} className="flex items-start gap-4 px-6 py-4 hover:bg-blue-200 transition-colors">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0"
                style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
                {r.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-black text-sm font-semibold">{r.customer}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_,i) => <Star key={i} size={11} className={i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-black'} />)}
                  </div>
                </div>
                <p className="text-xs truncate" style={{ color: 'black' }}>{r.preview}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <span className="text-xs" style={{ color: 'black' }}>{r.date}</span>
                <span className={r.status === 'published' ? 'badge-success' : r.status === 'private' ? 'badge-error' : 'badge-warning'}>{r.status}</span>
              </div>
            </div>
          ))}
          {rows.length === 0 && <div className="px-6 py-12 text-center text-sm" style={{ color: 'black' }}>No reviews match your filters.</div>}
        </div>

        {total > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: 'black' }}>
            <p className="text-xs" style={{ color: 'black' }}>{filtered.length} results</p>
            <div className="flex gap-1">
              {Array.from({ length: total }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 ${page === p ? 'bg-blue-500 text-black' : 'hover:bg-blue'}`}
                  style={page === p ? {} : { color: 'black' }}>{p}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
