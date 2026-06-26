import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) { navigate('/dashboard', { replace: true }); return; }
    gsap.fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
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

  return (
    <div
  className="min-h-screen flex items-center justify-center px-4 py-16"
  style={{
    background: '#ffffff'
  }}
>
      <div className="absolute inset-0 pointer-events-none"
      style={{
  background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 60%)'
}}
       />

       <div className="relative p-10 rounded-[32px] border shadow-2xl overflow-hidden bg-white"
style={{
  borderColor: '#E5E7EB'
}}>

  {/* Glow */}
  <div
    className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20"
  
      style={{ background: '#ffffff' }}

  />

  {error && (
    <div
      className="flex items-center gap-2 p-4 rounded-2xl mb-6 text-sm text-red-400"
      style={{
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.2)',
      }}
    >
      <AlertCircle size={16} />
      {error}
    </div>
  )}

  <form onSubmit={handleSubmit} className="space-y-6">

    {/* Email */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Email Address
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@business.com"
        required
        className="
          w-full
          px-5
          py-4
          rounded-2xl
          bg-white/5
          border
          border-black/10
          text-black
          placeholder:text-black/30
          outline-none
          transition-all
          duration-300
          focus:border-[#C81E3A]
          focus:shadow-[0_0_0_4px_rgba(200,30,58,0.15)]
        "
      />
    </div>

    {/* Password */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Password
      </label>

      <div className="relative">

        <input
          type={showPass ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="
            w-full
            px-5
            py-4
            pr-14
            rounded-2xl
            bg-white/5
            border
            border-black/10
            text-black
            placeholder:text-black/30
            outline-none
            transition-all
            duration-300
            focus:border-[#C81E3A]
            focus:shadow-[0_0_0_4px_rgba(200,30,58,0.15)]
          "
        />

        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-gray-700"
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

      </div>
    </div>

    {/* Login Button */}
    <button
      type="submit"
      disabled={loading}
      className="
        w-full
        py-4
        rounded-2xl
        text-gray-700
        font-semibold
        flex
        items-center
        justify-center
        gap-2
        transition-all
        duration-300
        hover:scale-[1.02]
        disabled:opacity-50
      "
      style={{
        background:
          'linear-gradient(135deg,#C81E3A 0%,#D4AF37 100%)',
      }}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-gray-700 rounded-full animate-spin" />
          Signing In...
        </>
      ) : (
        <>
          <LogIn size={18} />
          Sign In
        </>
      )}
    </button>

  </form>

  <div className="my-8 h-px bg-white/10" />

  <p className="text-center text-sm text-gray-700">
    No account?{' '}
    <Link
      to="/register"
      className="font-medium text-[#D4AF37] hover:text-[#F2B705]"
    >
      Create one free
    </Link>
  </p>

</div>
    </div>
  );
}
