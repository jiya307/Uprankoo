import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Wifi, Mail, ArrowLeftRight, ArrowRight } from 'lucide-react';

const FEATURES = [
  { icon: Wifi, label: 'NFC Standee' },
  { icon: Mail, label: 'Private Inbox' },
  { icon: ArrowLeftRight, label: 'Smart Review Routing' },
];

export default function Hero() {
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const featsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    tl.fromTo(labelRef.current,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
      0
    );
    tl.fromTo(headingRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.12
    );
    tl.fromTo(paraRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      0.32
    );
    tl.fromTo(btnsRef.current,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
      0.46
    );
    tl.fromTo(featsRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      0.6
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(196,30,30,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-[1200px] mx-auto px-6 lg:px-12 pt-28 pb-20 flex flex-col items-center text-center">
        {/* Label */}
        <div ref={labelRef} className="mb-6">
          <span
            className="text-xs font-bold uppercase"
            style={{
              color: '#E11D1D',
              letterSpacing: '0.32em',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            UPRANKO
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="font-black leading-[1.02] tracking-tight text-white mb-8"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 6.25rem)',
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontWeight: 900,
            letterSpacing: '-0.02em',
          }}
        >
          Stop Negative<br />
          Reviews Before<br />
          They Hit <span style={{ color: '#E11D1D' }}>Google.</span>
        </h1>

        {/* Paragraph */}
        <p
          ref={paraRef}
          className="text-base sm:text-lg leading-relaxed mb-12"
          style={{
            color: 'rgba(255,255,255,0.62)',
            maxWidth: 640,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          upRanko's premium NFC technology automatically filters 1–3 star
          feedback to your private inbox while pushing 4–5 star reviews
          directly to your Google Business Profile.
        </p>

        {/* Buttons */}
        <div ref={btnsRef} className="flex flex-wrap justify-center gap-4 mb-14">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-base text-white transition-all duration-200 hover:opacity-95 hover:-translate-y-0.5 group"
            style={{
              background: '#E11D1D',
              boxShadow: '0 8px 28px rgba(225,29,29,0.4)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Claim Your Setup
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <a
            href="https://wa.me/918146145161?text=Hi%20Birinder%2C%20I%20want%20to%20book%20a%20free%20live%20demo%20of%20upRanko"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-base text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/5 group"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.28)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Book a Free Live Demo
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Feature row */}
        <div ref={featsRef} className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <Icon size={16} style={{ color: '#E11D1D' }} />
              </div>
              <span
                className="text-sm font-medium"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
