import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Mail, AlertCircle, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { loginWithGoogle } from '../auth/GoggleLogin';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isGoogleAccount, setIsGoogleAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { resetPassword, loginWithSocial } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsGoogleAccount(false);
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      setIsGoogleAccount(message.includes('Google Sign-In'));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleContinue() {
    setError('');
    setGoogleLoading(true);
    try {
      const fbUser = await loginWithGoogle();
      await loginWithSocial({ name: fbUser.displayName ?? '', email: fbUser.email ?? '' });
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    } finally {
      setGoogleLoading(false);
    }
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
            {sent ? 'Check your inbox for a reset link' : "Enter your email and we'll send you a reset link"}
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
                If an account exists for <span className="font-medium text-black">{email}</span>, you'll receive an email with instructions to reset your password shortly. Be sure to check your spam folder.
              </p>
              <Link to="/login"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold w-full"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white' }}>
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              {error && !isGoogleAccount && (
                <div className="flex items-center gap-2 mb-5 p-3 rounded-xl text-sm" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              {isGoogleAccount && (
                <div className="mb-5 p-4 rounded-xl text-sm" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8' }}>
                  <p className="mb-3">{error}</p>
                  <button
                    type="button"
                    onClick={handleGoogleContinue}
                    disabled={googleLoading}
                    className="w-full py-2.5 rounded-lg border border-neutral-200 bg-white font-medium text-neutral-700 flex items-center justify-center gap-2 hover:bg-neutral-50 transition disabled:opacity-60"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    {googleLoading ? 'Signing in...' : 'Continue with Google'}
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">Email address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="email" value={email}
                      onChange={e => { setEmail(e.target.value); setIsGoogleAccount(false); setError(''); }}
                      placeholder="you@business.com" required
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-orange-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.1)]"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-xl text-black font-semibold flex items-center justify-center gap-2 transition hover:opacity-95 hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: 'linear-gradient(90deg,#EF4444 0%,#F97316 100%)', boxShadow: '0 10px 25px -10px rgba(239,68,68,0.6)' }}>
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><ArrowRight size={18} /> Send Reset Link</>
                  )}
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