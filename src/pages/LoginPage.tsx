import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  Eye, EyeOff, ArrowRight, AlertCircle, Mail, Lock,
  QrCode, BarChart3, MessageCircle, Shield, Zap, Headphones, Star,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import upranko from "../assets/upranko.png.jpeg"

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) { navigate('/dashboard', { replace: true }); return; }
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally { setLoading(false); }
  }

  const features = [
    { Icon: QrCode, color: '#FECACA', iconColor: '#E11D48', title: 'Smart QR Codes', desc: 'Generate beautiful QR codes and get more reviews effortlessly.' },
    { Icon: BarChart3, color: '#FED7AA', iconColor: '#EA580C', title: 'Track & Analyze', desc: 'Real-time insights to monitor reviews and improve your reputation.' },
    { Icon: MessageCircle, color: '#E9D5FF', iconColor: '#7C3AED', title: 'Respond & Engage', desc: 'Reply to reviews and turn happy customers into loyal fans.' },
  ];

  const trustItems = [
    { Icon: Shield, color: '#FECACA', iconColor: '#E11D48', title: 'Secure & Trusted', desc: 'Your data is safe with us. We never share your data.' },
    { Icon: Zap, color: '#FED7AA', iconColor: '#EA580C', title: 'Easy to Use', desc: 'Simple tools designed to save time and get better results.' },
    { Icon: Headphones, color: '#E9D5FF', iconColor: '#7C3AED', title: '24/7 Support', desc: "We're here to help you anytime, anywhere." },
  ];

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(180deg,#FAFAFA 0%,#F5F5F4 100%)', fontFamily: "'Inter',sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'white' }}>
                 <img
                                src={upranko}
                                alt="upRanko"
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-gold-500/30"
                              />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-brand-red-600">up</span>
                <span className="gold-text">Ranko</span>
              </span>
            </div>

            <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-5"
              style={{ background: '#FEE2E2', color: '#E11D48' }}>
              Review Management Simplified
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 mb-6">
              Collect. Manage.<br />
              <span style={{ color: '#EF4444' }}>Grow.</span>
            </h1>

            <p className="text-neutral-500 text-lg mb-10 max-w-md">
              Upranko helps businesses collect, manage, and showcase reviews that build trust and drive more customers.
            </p>

            <div className="space-y-6 mb-10">
              {features.map(({ Icon, color, iconColor, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: color }}>
                    <Icon size={22} color={iconColor} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">{title}</h3>
                    <p className="text-neutral-500 text-sm max-w-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 max-w-md mb-10">
              <div className="flex gap-4">
                <img src="https://i.pravatar.cc/80?img=47" alt="Priya" className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
                  </div>
                  <p className="text-sm text-neutral-600 italic mb-3">
                    "Upranko has completely changed how we manage reviews. It's simple, powerful, and really works!"
                  </p>
                  <p className="font-semibold text-sm text-neutral-900">Priya S.</p>
                  <p className="text-xs text-neutral-400">Coffee House</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-neutral-500 mb-4">Trusted by businesses worldwide</p>
              <div className="flex items-center gap-8 text-neutral-400 font-semibold">
                <span>Google</span><span>facebook</span><span>yelp</span><span>G2</span>
              </div>
            </div>
          </div>

          {/* RIGHT - CARD */}
          <div ref={cardRef} className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 lg:p-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-2">
              Welcome back <span>👋</span>
            </h2>
            <p className="text-neutral-500 mb-8">Sign in to continue to your account</p>

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

              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="••••••••••••" required
                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-orange-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.1)]"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded accent-orange-500" />
                  <span className="text-sm text-neutral-700">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm font-semibold" style={{ color: '#E11D48' }}>
                  Forgot password?
                </Link>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl text-black font-semibold flex items-center justify-center gap-2 transition hover:opacity-95 hover:-translate-y-0.5 disabled:opacity-60"
                style={{ background: 'linear-gradient(90deg,#EF4444 0%,#F97316 100%)', boxShadow: '0 10px 25px -10px rgba(239,68,68,0.6)' }}>
                {loading ? 'Signing In...' : (<><ArrowRight size={18} /> Sign In</>)}
              </button>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-neutral-200" />
                <span className="text-sm text-neutral-400">or continue with</span>
                <div className="flex-1 h-px bg-neutral-200" />
              </div>

              <button type="button" className="w-full py-3.5 rounded-xl border border-neutral-200 bg-white font-medium text-neutral-700 flex items-center justify-center gap-3 hover:bg-neutral-50 transition">
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>

              <button type="button" className="w-full py-3.5 rounded-xl border border-neutral-200 bg-white font-medium text-neutral-700 flex items-center justify-center gap-3 hover:bg-neutral-50 transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12c0-6.63-5.37-12-12-12S0 5.37 0 12c0 5.99 4.39 10.95 10.13 11.85V15.47H7.08V12h3.05V9.36c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.96h-1.52c-1.49 0-1.96.93-1.96 1.87V12h3.33l-.53 3.47h-2.8v8.38C19.61 22.95 24 17.99 24 12z"/></svg>
                Continue with Facebook
              </button>

              <p className="text-center text-sm text-neutral-500 pt-2">
                No account?{' '}
                <Link to="/signup" className="font-semibold" style={{ color: '#E11D48' }}>Create one free</Link>
              </p>
            </form>
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
          {trustItems.map(({ Icon, color, iconColor, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: color }}>
                <Icon size={22} color={iconColor} />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 text-sm">{title}</h4>
                <p className="text-xs text-neutral-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
