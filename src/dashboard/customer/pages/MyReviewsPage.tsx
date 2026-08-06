import { useState } from 'react';
import { Star, Edit2, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_CUSTOMER_REVIEWS } from '../../../lib/mockData';

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState(MOCK_CUSTOMER_REVIEWS);

  function remove(id: string) {
    setReviews(prev => prev.filter(r => r.id !== id));
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-black font-black text-2xl mb-1">My Reviews</h1>
          <p className="text-sm" style={{ color: 'black' }}>Reviews you've submitted — edit or delete where allowed</p>
        </div>
        <Link
          to="/account/write-review"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0"
          style={{ background: '#111827' }}
        >
          <Plus size={16} />
          Write a Review
        </Link>
      </div>

      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="glass-card p-5 rounded-2xl flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-black font-semibold text-sm">{r.business}</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < r.rating ? '#F59E0B' : 'none'} color="#F59E0B" />
                  ))}
                </div>
              </div>
              <p className="text-sm" style={{ color: '#374151' }}>{r.text}</p>
              <p className="text-xs mt-1.5" style={{ color: '#6B7280' }}>{r.date}</p>
            </div>
            {r.editable && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="p-1.5 rounded-lg hover:bg-gray-100" title="Edit"><Edit2 size={14} className="text-gray-500" /></button>
                <button onClick={() => remove(r.id)} className="p-1.5 rounded-lg hover:bg-gray-100" title="Delete"><Trash2 size={14} className="text-red-500" /></button>
              </div>
            )}
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="glass-card p-8 rounded-2xl text-center text-sm" style={{ color: '#6B7280' }}>
            You haven't left any reviews yet.
          </div>
        )}
      </div>

    </DashboardLayout>
  );
}