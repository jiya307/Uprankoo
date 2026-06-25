import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Gift } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Premium branded NFC standee',
  'Professional on-site installation',
  'Smart 1-3 star feedback filter',
  'Direct Google review redirection',
  'Owner dashboard access',
  '3 months free backend software',
  'WhatsApp support',
  'Setup within 24 hours',
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 82%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0F0606 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <div className="section-label mx-auto mb-5">Pricing</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-5">
            One Simple{' '}
            <span className="gold-text-animate">Investment</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            No subscriptions. No hidden fees. Just a one-time setup and you're growing on autopilot.
          </p>
        </div>

        <div ref={cardRef} className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(25,8,8,0.95) 0%, rgba(15,10,5,0.95) 100%)',
            border: '1px solid rgba(212,160,23,0.25)',
            boxShadow: '0 40px 100px rgba(196,30,30,0.2), 0 0 0 1px rgba(212,160,23,0.08)',
          }}
        >
          {/* Top gold line */}
          <div className="h-1 w-full"
            style={{ background: 'linear-gradient(90deg, #B91C1C 0%, #D4A017 50%, #B91C1C 100%)' }}
          />

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: price info */}
            <div className="p-10 border-b md:border-b-0 md:border-r border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8"
                style={{ background: 'rgba(196,30,30,0.15)', border: '1px solid rgba(196,30,30,0.3)', color: '#F87171' }}
              >
                Pilot Offer
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-white/40 line-through text-2xl font-medium">₹2,999</span>
                  <span className="text-white/30 text-sm mb-1">one-time</span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-display font-bold text-6xl text-white">₹1,499</span>
                  <span className="text-white/50 text-sm mb-3">one-time setup</span>
                </div>
                <div className="flex items-center gap-2 mt-3 p-3 rounded-xl"
                  style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)' }}
                >
                  <Gift size={16} className="text-brand-gold-400 flex-shrink-0" />
                  <p className="text-brand-gold-400 text-sm font-medium">
                    Backend filtering software — <strong>FREE for 3 months</strong>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="btn-primary text-sm"
                >
                  Claim This Offer
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/918146145161?text=Hi%20Birinder%2C%20I%20want%20to%20get%20upRanko%20for%20my%20business`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-sm"
                >
                  WhatsApp Us
                </a>
              </div>

              <p className="mt-4 text-white/30 text-xs">
                * After the free period, software plans start at an affordable monthly rate. Cancel anytime.
              </p>
            </div>

            {/* Right: features */}
            <div className="p-10">
              <h4 className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-6">Everything Included</h4>
              <ul className="space-y-4">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}
                    >
                      <Check size={11} className="text-brand-gold-400" />
                    </div>
                    <span className="text-white/70 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Urgency note */}
        <p className="text-center mt-8 text-white/40 text-sm">
          Limited to 20 pilot units. Once spots fill, the waitlist opens at full price.
        </p>
      </div>
    </section>
  );
}
