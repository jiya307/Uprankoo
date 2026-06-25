import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import do2 from "../assets/do2.png"

export default function Hero() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    const leftEls = leftRef.current?.querySelectorAll('.hero-el');
    leftEls?.forEach((el, i) => {
      tl.fromTo(el,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        i * 0.1
      );
    });

    tl.fromTo(rightRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      0.15
    );
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0A0808' }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 left-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 40%, rgba(180,20,20,0.08) 0%, transparent 65%)' }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-16 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">

        {/* ── LEFT ────────────────────────────────── */}
        <div ref={leftRef} className="flex flex-col">

          {/* Pill badge */}
          
          <h1
            className="hero-el font-sans font-black leading-[1.0] tracking-tight text-white mb-6"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)' }}
          >
            Stop Negative Reviews Before They Hit Google.
          </h1>

          {/* Subtitle */}
          <p className="hero-el text-white/55 text-base sm:text-lg leading-relaxed mb-9 max-w-[480px]">
            upRanko's premium NFC technology automatically filters 1–3 star feedback
            to your private inbox while pushing 4–5 star reviews directly to your
            Google Business Profile.
          </p>

          {/* CTAs */}
          <div className="hero-el flex flex-wrap gap-3 mb-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #C41E1E 0%, #A01515 100%)',
                boxShadow: '0 4px 20px rgba(196,30,30,0.45)',
              }}
            >
              Claim Your Setup
            </Link>
            <a
              href="https://wa.me/918146145161?text=Hi%20Birinder%2C%20I%20want%20to%20book%20a%20free%20live%20demo%20of%20upRanko"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white/85 transition-all duration-200 hover:text-white hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
            >
              Book a Free Live Demo
            </a>
          </div>

          {/* Tags row */}
          <div className="hero-el flex flex-wrap items-center gap-x-5 gap-y-2">
            {['NFC standee', 'Private complaint inbox', 'Google review routing'].map((tag, i) => (
              <span key={tag} className="flex items-center gap-2 text-xs text-white/35 font-medium">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT ───────────────────────────────── */}
        <div ref={rightRef} className="hidden lg:block">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: '#151010',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
            }}
          >
            {/* Photo */}
            <div className="relative w-full" style={{ paddingBottom: '62%' }}>
              <img
                src={do2}
                alt="Customer tapping NFC standee at a cafe counter"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ borderRadius: '1.4rem 1.4rem 0 0' }}
              />
            </div>

            {/* Smart review routing panel */}
            <div className="px-6 pt-5 pb-6"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <h3 className="font-bold text-white text-lg mb-1">Smart review routing</h3>
              <p className="text-white/45 text-sm mb-5 leading-relaxed">
                1–3 stars go private. 4–5 stars go public. Your reputation stays protected.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* 1-3 private */}
                <div
                  className="flex flex-col items-center justify-center py-4 rounded-2xl"
                  style={{ background: 'rgba(140,20,20,0.45)', border: '1px solid rgba(180,30,30,0.3)' }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-white font-bold text-base">1–3</span>
                    <Star size={13} className="text-white fill-white" />
                  </div>
                  <span className="text-white/60 text-xs font-medium tracking-wide">Private</span>
                </div>

                {/* 4-5 google */}
                <div
                  className="flex flex-col items-center justify-center py-4 rounded-2xl"
                  style={{ background: 'rgba(100,80,10,0.45)', border: '1px solid rgba(180,140,20,0.3)' }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-white font-bold text-base">4–5</span>
                    <Star size={13} className="text-brand-gold-400 fill-brand-gold-400" />
                  </div>
                  <span className="text-white/60 text-xs font-medium tracking-wide">Google</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
