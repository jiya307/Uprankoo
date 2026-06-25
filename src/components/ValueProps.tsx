import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, TrendingUp, Zap, MessageSquare, BarChart3, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Shield,
    title: 'Protect Your Reputation',
    description:
      'Resolve customer complaints internally before the public ever sees them. Negative experiences stay in your inbox, not on the internet.',
    accent: '#C41E1E',
  },
  {
    icon: TrendingUp,
    title: 'Boost Local SEO',
    description:
      'More 5-star reviews mean your business ranks higher on Google Maps. Be the first result when locals search for your category.',
    accent: '#D4A017',
  },
  {
    icon: Zap,
    title: 'Fully Automated',
    description:
      'No more manually asking customers for reviews. The NFC standee does all the work — consistently, every single day, on autopilot.',
    accent: '#C41E1E',
  },
  {
    icon: MessageSquare,
    title: 'Private Feedback Loop',
    description:
      "Unhappy customers feel heard because they are. You get real insights to improve your service without public embarrassment.",
    accent: '#D4A017',
  },
  {
    icon: BarChart3,
    title: 'Owner Dashboard',
    description:
      'Track incoming feedback, monitor review trends, and see exactly how your reputation is growing — from one clean dashboard.',
    accent: '#C41E1E',
  },
  {
    icon: Award,
    title: 'Premium Standee Design',
    description:
      'Not a cheap flyer — a sleek, branded NFC standee that signals quality to your customers the moment they see it at the counter.',
    accent: '#D4A017',
  },
];

export default function ValueProps() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      const items = gridRef.current?.querySelectorAll('.benefit-card');
      items?.forEach((item, i) => {
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0F0808 0%, #0A0A0A 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20">
          <div className="section-label mx-auto mb-5">Why Choose upRanko</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-5">
            Built for{' '}
            <span className="gold-text-animate">Local Business</span>{' '}
            Owners
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            One smart device. Six powerful benefits. Zero technical skills required.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="benefit-card group relative p-8 rounded-2xl transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(255,255,255,0.045)';
                  el.style.borderColor = `${b.accent}35`;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = `0 16px 40px ${b.accent}15`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(255,255,255,0.025)';
                  el.style.borderColor = 'rgba(255,255,255,0.06)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${b.accent}15`,
                    border: `1px solid ${b.accent}25`,
                  }}
                >
                  <Icon size={22} style={{ color: b.accent }} />
                </div>
                <h3 className="font-bold text-lg text-white mb-3">{b.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{b.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
