import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import upranko from "../assets/upranko.png.jpeg"


const links = [
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Offer', to: '/pricing' },
  { label: 'Benefits', to: '/benefits' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    );
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white backdrop-blur-md border-b border-black/8 shadow-sm'
          : 'bg-white border-b border-black/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <img
            src={upranko}
            alt="upRanko"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-black/10 group-hover:ring-brand-gold-500/60 transition-all duration-300"
          />
          <span className="font-display font-bold text-xl">
            <span className="text-brand-red-600">up</span>
            <span className="gold-text">Ranko</span>
          </span>
        </Link>

        {/* Desktop center links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-black' : 'text-black/55 hover:text-black'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Right CTA */}
        {isAuthenticated ? (
          <Link to="/dashboard"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #C81E3A, #D4AF37)'
            }}>
            <LayoutDashboard size={15} /> Dashboard
          </Link>
        ) : (
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link
              to="/login"
              className="text-sm font-medium transition-colors"
              style={{ color: 'rgba(0,0,0,0.55)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#000000'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.55)'}
            >
              Sign in
            </Link>
            <a
              href="https://wa.me/918146145161?text=Hi%20Birinder%2C%20I%20want%20to%20book%20a%20WhatsApp%20demo%20of%20upRanko"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-black transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #D4830A 0%, #B8700A 100%)', boxShadow: '0 3px 14px rgba(180,100,10,0.4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Demo
            </a>
          </div>
        )}

        {/* Mobile burger */}
        <button
          className="md:hidden p-1 transition-colors"
          style={{ color: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={e => e.currentTarget.style.color = '#000000'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.6)'}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-5 border-t border-black/8"
          style={{ background: '#FFFFFF' }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium transition-colors ${isActive ? 'text-black' : 'text-black/55 hover:text-black'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }}>
              <LayoutDashboard size={15} /> Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="text-base font-medium transition-colors"
                style={{ color: 'rgba(0,0,0,1)' }}
              >
                Sign in
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center py-3 rounded-full text-sm font-bold text-black"
                style={{ background: 'linear-gradient(135deg, #C41E1E, #A01515)' }}>
                Get Started Free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}