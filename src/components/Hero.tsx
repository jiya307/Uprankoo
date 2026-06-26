import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Star, Clock, BarChart2 } from 'lucide-react';

/* ─── Feature cards data (4 items matching screenshot) ─── */
const FEATURES = [
  {
    icon: Shield,
    title: 'Protect Your Reputation',
    desc: 'Filter out harmful reviews automatically.',
  },
  {
    icon: Star,
    title: 'Boost 4–5 Star Reviews',
    desc: 'Get more positive reviews on Google, effortlessly.',
  },
  {
    icon: Clock,
    title: 'Real-time Notifications',
    desc: 'Receive negative feedback instantly in your inbox.',
  },
  {
    icon: BarChart2,
    title: 'Grow Your Business',
    desc: 'Better reviews. More trust. More customers.',
  },
];

/* ─── Fake avatar bubbles (5 overlapping circles) ─── */
const AVATARS = ['#c0392b', '#e67e22', '#27ae60', '#2980b9', '#8e44ad'];

export default function Hero() {
  const labelRef   = useRef(null);
  const headingRef = useRef(null);
  const paraRef    = useRef(null);
  const btnsRef    = useRef(null);
  const featsRef   = useRef(null);
  const trustRef   = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    tl.fromTo(
      labelRef.current,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
      0,
    );
    tl.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.12,
    );
    tl.fromTo(
      paraRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      0.32,
    );
    tl.fromTo(
      btnsRef.current,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
      0.46,
    );
    tl.fromTo(
      featsRef.current,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
      0.62,
    );
    tl.fromTo(
      trustRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      0.78,
    );
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >

      {/* ── Subtle red radial dot pattern — left side ── */}
      <div
        className="absolute left-0 top-1/4 w-40 h-80 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(225,29,29,0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '14px 14px',
          maskImage: 'radial-gradient(ellipse at left center, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at left center, black 30%, transparent 80%)',
        }}
      />
      <div
        className="absolute right-0 top-1/4 w-40 h-80 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(225,29,29,0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '14px 14px',
          maskImage: 'radial-gradient(ellipse at right center, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at right center, black 30%, transparent 80%)',
        }}
      />

      {/* ── Main content column ── */}
      <div className="relative z-10 w-full max-w-[820px] mx-auto px-6 pt-28 pb-6 flex flex-col items-center text-center">

        {/* Label pill */}
        <div ref={labelRef} className="mb-7">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.28em] px-5 py-2 rounded-full"
            style={{
              color: '#E11D1D',
              border: '1.5px solid rgba(225,29,29,0.35)',
              background: 'rgba(225,29,29,0.04)',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.28em',
            }}
          >
            UPRANKO
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="leading-[1.04] tracking-tight text-black mb-7"
          style={{
            fontSize: 'clamp(2.8rem, 7.5vw, 6.25rem)',
           
            fontFamily: ' Arial, Helvetica, sans-serif',
            fontWeight: 400,

            
            letterSpacing: '-0.025em',
          }}
        >
          Stop Negative<br />
          Reviews Before<br />
          They Hit{' '}
          <span style={{ color: '#E11D1D' }}>Google.</span>
        </h1>

        {/* Paragraph */}
        <p
          ref={paraRef}
          className="text-base sm:text-lg leading-relaxed mb-11"
          style={{
            color: 'rgba(0,0,0,0.52)',
            maxWidth: 580,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          upRanko's premium NFC technology automatically filters 1–3 star
          feedback to your private inbox while pushing 4–5 star reviews
          directly to your Google Business Profile.
        </p>

        {/* Buttons */}
        <div
          ref={btnsRef}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          {/* Primary — filled red pill */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 font-bold text-base text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 group"
            style={{
              background: '#E11D1D',
              boxShadow: '0 8px 28px rgba(225,29,29,0.38)',
              borderRadius: 9999,
              padding: '1rem 2.25rem',
              fontFamily: "'Inter', sans-serif",
              textDecoration: 'none',
            }}
          >
            Claim Your Setup
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          {/* Secondary — outline dark pill */}
          <a
            href="https://wa.me/918146145161?text=Hi%20Birinder%2C%20I%20want%20to%20book%20a%20free%20live%20demo%20of%20upRanko"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-bold text-base text-black transition-all duration-200 hover:-translate-y-0.5 group"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(0,0,0,0.22)',
              borderRadius: 9999,
              padding: '1rem 2.25rem',
              fontFamily: "'Inter', sans-serif",
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            Book a Free Live Demo
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* ── Feature cards row ── */}
      <div
        ref={featsRef}
        className="relative z-10 w-full max-w-[900px] mx-auto px-6 mb-10"
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            background: '#FAFAFA',
          }}
        >
          {FEATURES.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={title}
              className="flex flex-col items-center text-center px-6 py-7 relative"
              style={{
                borderRight:
                  idx < FEATURES.length - 1
                    ? '1px solid rgba(0,0,0,0.07)'
                    : 'none',
              }}
            >
              {/* Icon */}
              <div className="mb-4">
                <Icon
                  size={26}
                  strokeWidth={1.6}
                  style={{ color: '#E11D1D' }}
                />
              </div>

              {/* Title */}
              <p
                className="font-bold text-sm text-black mb-1.5 leading-snug"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {title}
              </p>

              {/* Desc */}
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: 'rgba(0,0,0,0.48)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trust row ── */}
      <div
        ref={trustRef}
        className="relative z-10 flex flex-col items-center gap-3 pb-6"
      >
        <p
          className="text-sm font-medium"
          style={{
            color: 'rgba(0,0,0,0.55)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Trusted by smart businesses
        </p>

        <div className="flex items-center gap-3">
          {/* Overlapping avatars */}
          <div className="flex items-center">
            {AVATARS.map((bg, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold ring-2 ring-white"
                style={{
                  background: bg,
                  marginLeft: i === 0 ? 0 : -10,
                  zIndex: AVATARS.length - i,
                  fontSize: 11,
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#F59E0B"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          <span
            className="text-sm font-medium"
            style={{
              color: 'rgba(0,0,0,0.6)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            500+ businesses trust upRanko
          </span>
        </div>
      </div>

      {/* ── Bottom wavy red gradient (matches screenshot) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120 }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(225,29,29,0)"   />
              <stop offset="60%" stopColor="rgba(225,29,29,0.12)" />
              <stop offset="100%" stopColor="rgba(225,29,29,0.22)" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
            fill="url(#waveGrad)"
          />
        </svg>
      </div>

    </section>
  );
}