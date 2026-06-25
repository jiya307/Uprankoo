import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Zap, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PilotBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(bannerRef.current,
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: bannerRef.current, start: 'top 88%' },
      }
    );
  }, []);

  return (
    <section className="relative py-16 overflow-hidden"
      style={{ background: '#0F0808' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div
          ref={bannerRef}
          className="relative rounded-3xl overflow-hidden px-8 py-10 sm:px-12 sm:py-12"
          style={{
            background: 'linear-gradient(135deg, rgba(196,30,30,0.12) 0%, rgba(212,160,23,0.08) 100%)',
            border: '1px solid rgba(212,160,23,0.25)',
            boxShadow: '0 20px 60px rgba(196,30,30,0.15), inset 0 1px 0 rgba(212,160,23,0.1)',
          }}
        >
          {/* Glow spots */}
          <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #C41E1E, transparent 70%)' }}
          />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #D4A017, transparent 70%)' }}
          />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center animate-pulse-glow"
                style={{
                  background: 'linear-gradient(135deg, rgba(196,30,30,0.3), rgba(212,160,23,0.2))',
                  border: '1px solid rgba(212,160,23,0.4)',
                }}
              >
                <Zap size={26} className="text-brand-gold-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-brand-red-400"
                    style={{ background: 'rgba(196,30,30,0.15)', border: '1px solid rgba(196,30,30,0.3)' }}
                  >
                    Exclusive Pilot
                  </span>
                  <span className="text-brand-gold-500 text-xs font-semibold">Limited Slots</span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                  Only{' '}
                  <span className="gold-text">20 Spots</span>{' '}
                  Available in Tri-City
                </h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-lg">
                  We're rolling out an exclusive pilot batch for the top premium businesses in
                  Mohali &amp; Chandigarh. Phase 3B2, Phase 8, Sector 17 — get in before your competitor does.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  {['Phase 3B2', 'Phase 8', 'Sector 17', 'Sector 22'].map((area) => (
                    <div key={area} className="flex items-center gap-1.5 text-xs text-white/50">
                      <MapPin size={11} className="text-brand-gold-500" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="btn-gold flex-shrink-0 text-sm"
            >
              Reserve My Spot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
