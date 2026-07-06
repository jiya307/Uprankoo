import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Mail, AlertCircle, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { resetPassword } = useAuth();

  useEffect(() => {
    gsap.fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
     setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: '#F8FAFC' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 60%)' }} />

      <div ref={cardRef} className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <span className="font-black text-2xl text-black">up<span className="gold-text">Ranko</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-black mb-2">Forgot your password?</h1>
          <p className="text-gray-500 text-sm">
            {sent ? 'Check your inbox for a reset link' : 'Enter your email and we\'ll send you a reset link'}
          </p>
        </div>

        <div className="glass-card p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}>
                <CheckCircle2 size={26} color="#16A34A" />
              </div>
              <p className="text-black font-semibold mb-2">Reset link sent</p>
              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                If an account exists for <span className="font-medium text-black">{email}</span>, you'll receive an email with instructions to reset your password shortly.
              </p>
              <Link to="/login"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold w-full"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white' }}>
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl text-sm" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">Email address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="you@business.com" required
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-orange-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.1)]"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-xl text-black font-semibold flex items-center justify-center gap-2 transition hover:opacity-95 hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: 'linear-gradient(90deg,#EF4444 0%,#F97316 100%)', boxShadow: '0 10px 25px -10px rgba(239,68,68,0.6)' }}>
                  {loading ? 'Sending...' : (<><ArrowRight size={18} /> Send Reset Link</>)}
                </button>

                <p className="text-center text-sm text-neutral-500 pt-2">
                  Remembered it?{' '}
                  <Link to="/login" className="font-semibold" style={{ color: '#E11D48' }}>Back to Sign In</Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
