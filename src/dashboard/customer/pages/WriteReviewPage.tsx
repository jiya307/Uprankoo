import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_BUSINESSES_ADMIN } from '../../../lib/mockData';

export default function WriteReviewPage() {
  const [business, setBusiness] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const businessOptions = MOCK_BUSINESSES_ADMIN.map(b => b.name);

  function handleSubmit() {
    if (!business) {
      setError('Please select a business.');
      return;
    }

    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }

    if (!text.trim()) {
      setError('Please write a few words about your experience.');
      return;
    }

    setSubmitted(true);
    setError('');
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-black font-black text-2xl mb-1">Write a Review</h1>
          <p className="text-sm" style={{ color: '#374151' }}>
            Share your experience with a business you visited. Submit feedback to help others and improve local service.
          </p>
        </div>

        {submitted ? (
          <div className="glass-card rounded-2xl p-8 text-center" style={{ background: '#FFFFFF' }}>
            <h2 className="text-black font-semibold text-xl mb-3">Review Submitted</h2>
            <p className="text-sm mb-5" style={{ color: '#6B7280' }}>
              Thanks! Your review has been recorded locally. Once reviews are connected to Firestore, this page can persist your feedback directly.
            </p>
            <button
              type="button"
              onClick={() => navigate('/account/reviews')}
              className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              View My Reviews
            </button>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-8" style={{ background: '#FFFFFF' }}>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>
                  Business
                </label>
                <select
                  value={business}
                  onChange={e => setBusiness(e.target.value)}
                  className="w-full rounded-xl border px-3 py-3 text-sm"
                  style={{ borderColor: '#E5E7EB', color: '#111827' }}
                >
                  <option value="">Select a business…</option>
                  {businessOptions.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>
                  Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className="rounded-full p-2"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        size={26}
                        fill={star <= (hoverRating || rating) ? '#F59E0B' : 'none'}
                        color="#F59E0B"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>
                  Review
                </label>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  rows={6}
                  placeholder="Tell us about your experience…"
                  className="w-full rounded-2xl border px-3 py-3 text-sm resize-none"
                  style={{ borderColor: '#E5E7EB', color: '#111827' }}
                />
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate('/account/reviews')}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
