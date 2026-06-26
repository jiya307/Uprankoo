import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', businessName: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) { navigate('/dashboard', { replace: true }); return; }
    gsap.fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, [isAuthenticated, navigate]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await register(form);
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally { setLoading(false); }
  }

  return (
   <div
  className="min-h-screen flex items-center justify-center px-4 py-16"
  style={{ background: "#F8FAFC" }}
>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 60%)' }} />

      <div ref={cardRef} className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <span className="font-black text-2xl text-black">up<span className="gold-text">Ranko</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-black mb-2">Start your free trial</h1>
          <p className="text-gray-500 text-sm">Join 20+ businesses in the pilot program</p>
        </div>

      



        <div className="glass-card p-8">
          {error && (
           <div
  className="p-8 rounded-3xl bg-white border shadow-xl"
  style={{
    borderColor: "#E5E7EB",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  }}
>
              <AlertCircle size={15} /> {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">

  <div className="grid grid-cols-2 gap-4">

    <div>
      <label className="block text-sm font-medium text-[#D4AF37] mb-2">
        Full Name
      </label>
      <input
        value={form.name}
        onChange={set('name')}
        placeholder="Your name"
        className="w-full px-4 py-2.5 bg-white text-black placeholder:text-gray-500 border border-[#D4AF37]/60 rounded-xl"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-[#D4AF37] mb-2">
        Business Name
      </label>
      <input
        value={form.businessName}
        onChange={set('businessName')}
        placeholder="Cafe / Restaurant"
        className="w-full px-4 py-2.5 bg-white text-black placeholder:text-gray-500 border border-[#D4AF37]/60 rounded-xl"
        required
      />
    </div>

  </div>

  <div>
    <label className="block text-sm font-medium text-[#D4AF37] mb-2">
      Email Address
    </label>
    <input
      type="email"
      value={form.email}
      onChange={set('email')}
      placeholder="you@business.com"
      className="w-full px-4 py-2.5 bg-white text-black placeholder:text-gray-500 border border-[#D4AF37]/60 rounded-xl"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-[#D4AF37] mb-2">
      Password
    </label>

    <div className="relative">
      <input
        type={showPass ? 'text' : 'password'}
        value={form.password}
        onChange={set('password')}
        placeholder="Min. 6 characters"
        minLength={6}
        className="w-full px-4 py-2.5 pr-12 bg-white text-black placeholder:text-gray-500 border border-[#D4AF37]/60 rounded-xl"
        required
      />

      <button
        type="button"
        onClick={() => setShowPass(!showPass)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]"
      >
        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full py-3 rounded-xl text-black font-semibold flex items-center justify-center gap-2"
    style={{
      background: 'linear-gradient(135deg, #C81E3A 0%, #D4AF37 100%)'
    }}
  >
    {loading ? (
      <>
        <div className="w-4 h-4 border-2 border-white/30 border-black rounded-full animate-spin"></div>
        Creating Account...
      </>
    ) : (
      'Create Account'
    )}
  </button>
            <button type="submit" disabled={loading}
              className="w-full db-btn-primary justify-center py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed mt-2" style={{ borderRadius: '0.75rem' }}>
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-black rounded-full animate-spin" /> Creating account...</> : <><UserPlus size={16} /> Create Free Account</>}
            </button>
          </form>
          <div className="db-divider my-6" />
          <p className="text-center text-sm text-black">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
        <p className="text-center mt-6">
          <Link to="/" className="text-black text-xs hover:text-gray-400 transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
