import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { MOCK_BUSINESSES_ADMIN } from '../../../lib/mockData';

export interface NewReview {
  business: string;
  rating: number;
  text: string;
}

interface WriteReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: NewReview) => void;
  /** Pre-select a business, e.g. when opened from "Review this business" on a specific card. */
  defaultBusiness?: string;
}

// Full list of businesses on the platform a customer can leave a review for.
// Swap this out for a real Firestore query (e.g. all businesses the customer
// has a scanned-visit record with) once reviews are wired to a backend.
const BUSINESS_OPTIONS = MOCK_BUSINESSES_ADMIN.map(b => b.name);

export default function WriteReviewModal({ open, onClose, onSubmit, defaultBusiness }: WriteReviewModalProps) {
  const [business, setBusiness] = useState(defaultBusiness ?? '');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

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
    onSubmit({ business, rating, text: text.trim() });
    // Reset for next time this modal is opened.
    setBusiness(defaultBusiness ?? '');
    setRating(0);
    setText('');
    setError('');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="glass-card w-full max-w-md rounded-2xl p-6 relative"
        style={{ background: '#FFFFFF' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={18} className="text-gray-500" />
        </button>

        <h2 className="text-black font-black text-xl mb-1">Write a Review</h2>
        <p className="text-sm mb-5" style={{ color: '#6B7280' }}>
          Share your experience with a business you've visited.
        </p>

        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>
          Business
        </label>
        <select
          value={business}
          onChange={e => setBusiness(e.target.value)}
          disabled={!!defaultBusiness}
          className="w-full rounded-xl border px-3 py-2.5 text-sm mb-4 text-black disabled:opacity-60"
          style={{ borderColor: '#E5E7EB' }}
        >
          <option value="">Select a business…</option>
          {BUSINESS_OPTIONS.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>
          Your rating
        </label>
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
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

        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>
          Your feedback
        </label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
          placeholder="Tell us about your experience…"
          className="w-full rounded-xl border px-3 py-2.5 text-sm mb-2 text-black resize-none"
          style={{ borderColor: '#E5E7EB' }}
        />

        {error && <p className="text-xs mb-3" style={{ color: '#DC2626' }}>{error}</p>}

        <div className="flex gap-3 mt-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border"
            style={{ borderColor: '#E5E7EB', color: '#374151' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: '#111827' }}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}