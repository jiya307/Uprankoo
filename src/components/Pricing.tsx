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
     style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <div className="section-label mx-auto mb-5">Pricing</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-5 text-black">
            One Simple{' '}
            <span className="gold-text-animate">Investment</span>
          </h2>
          <p className="text-gray-700 text-lg max-w-xl mx-auto">
            No subscriptions. No hidden fees. Just a one-time setup and you're growing on autopilot.
          </p>
        </div>

        <div ref={cardRef} className="relative rounded-3xl overflow-hidden"
          style={{
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
}}
        >
          {/* Top gold line */}
          <div className="h-1 w-full"
           
           style={{

  border: 'black',
}}
          />

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: price info */}
            <div className="p-10 border-b md:border-b-0 md:border-r border-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8"
                style={{ background: 'rgba(196,30,30,0.15)', border: '1px solid rgba(196,30,30,0.3)', color: '#F87171' }}
              >
                Pilot Offer
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-black line-through text-2xl font-medium">₹2,999</span>
                  <span className="text-black text-sm mb-1">one-time</span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-display font-bold text-6xl text-black">₹1,499</span>
                  <span className="text-black text-sm mb-3">one-time setup</span>
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

              <p className="mt-4 text-black text-xs">
                * After the free period, software plans start at an affordable monthly rate. Cancel anytime.
              </p>
            </div>

            {/* Right: features */}
            <div className="p-10">
              <h4 className="text-black text-sm font-semibold uppercase tracking-widest mb-6">Everything Included</h4>
              <ul className="space-y-4">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}
                    >
                      <Check size={11} className="text-brand-gold-400" />
                    </div>
                    <span className="text-black text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Urgency note */}
        <p className="text-center mt-8 text-black text-sm">
          Limited to 20 pilot units. Once spots fill, the waitlist opens at full price.
        </p>
      </div>
    </section>
  );
}
