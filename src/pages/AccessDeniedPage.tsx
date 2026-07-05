import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0A0A0F' }}>
      <div className="glass-card rounded-2xl p-10 max-w-md w-full text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)' }}
        >
          <ShieldAlert size={28} color="#DC2626" />
        </div>
        <h1 className="font-black text-2xl mb-2" style={{ color: 'white' }}>403 · Access Denied</h1>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
          You don't have permission to view this page. This area is restricted to Upranko owners only.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white' }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
