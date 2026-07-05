import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Filter, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Smartphone,
    title: 'Tap & Scan',
    description:
      'The customer taps their phone on the premium upRanko NFC standee at your billing counter. Zero friction — no app download required.',
    color: 'from-brand-red-700/20 to-brand-red-900/10',
    accent: '#C41E1E',
    badge: 'NFC Powered',
  },
  {
    number: '02',
    icon: Filter,
    title: 'Smart Filtering',
    description:
      'Unhappy customers (1–3 stars) are redirected to a private feedback form that goes directly to your owner dashboard — never public.',
    color: 'from-brand-gold-500/20 to-brand-gold-700/10',
    accent: '#D4A017',
    badge: 'AI Filtered',
  },
  {
    number: '03',
    icon: Star,
    title: 'Instant Growth',
    description:
      'Happy customers (4–5 stars) are instantly redirected to leave a public review on your Google Business Profile. Reputation soars on autopilot.',
    color: 'from-brand-red-700/20 to-brand-gold-700/10',
    accent: '#D4A017',
    badge: 'Google Boost',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.step-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 70, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Decorative top divider */}
      <div className="divider-gold absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20">
          <div className="section-label mx-auto mb-5">How It Works</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-5 text-black">
            Three Steps to a{' '}
            <span className="gold-text-animate">Perfect Reputation</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(0,0,0,0.55)' }}>
            No technical skills required. Place the standee. Let it work. Your reputation takes care of itself.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector lines */}
          <div className="hidden md:block absolute top-20 left-[32%] right-[32%] h-0.5"
            style={{ background: 'linear-gradient(90deg, rgba(212,160,23,0.3) 0%, rgba(212,160,23,0.6) 50%, rgba(212,160,23,0.3) 100%)' }}
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="step-card group relative rounded-3xl p-8 transition-all duration-500 cursor-default"
                style={{
                  background: 'rgba(0,0,0,0.025)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${step.accent}40`;
                  e.currentTarget.style.background   = 'rgba(0,0,0,0.04)';
                  e.currentTarget.style.transform    = 'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                  e.currentTarget.style.background   = 'rgba(0,0,0,0.025)';
                  e.currentTarget.style.transform    = 'translateY(0)';
                }}
              >
                {/* Step number */}
                <div className="absolute top-6 right-6 font-display font-bold text-6xl leading-none select-none"
                  style={{ color: 'rgba(0,0,0,0.06)' }}>
                  {step.number}
                </div>

                {/* Badge */}
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6"
                  style={{ background: `${step.accent}18`, border: `1px solid ${step.accent}35`, color: step.accent }}
                >
                  {step.badge}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `${step.accent}15`,
                    border: `1px solid ${step.accent}30`,
                    boxShadow: `0 4px 20px ${step.accent}20`,
                  }}
                >
                  <Icon size={24} style={{ color: step.accent }} />
                </div>

                <h3 className="font-bold text-xl mb-3 text-black">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.55)' }}>
                  {step.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="divider-gold absolute bottom-0 left-0 right-0" />
    </section>
  );
}