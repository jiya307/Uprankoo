import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Coffee, Scissors, Stethoscope } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const businessTypes = [
  { icon: Coffee,      label: 'Cafes & Restaurants' },
  { icon: Scissors,    label: 'Salons & Spas'        },
  { icon: Stethoscope, label: 'Clinics & Wellness'   },
];

const stats = [
  { value: '4.8x',  label: 'More Reviews Generated'  },
  { value: '94%',   label: 'Negative Reviews Filtered' },
  { value: '3 Min', label: 'Setup Time'               },
  { value: '20',    label: 'Pilot Spots Total'        },
];

export default function SocialProof() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const statsRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      const statEls = statsRef.current?.querySelectorAll('.stat-item');
      statEls?.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, delay: i * 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      <div className="divider-gold absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-item text-center p-8 rounded-2xl"
              style={{
                background: 'rgba(0,0,0,0.025)',
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              <div className="font-display font-bold text-4xl sm:text-5xl gold-text mb-2">{s.value}</div>
              <div className="text-sm" style={{ color: 'black' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trusted by section */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="section-label mx-auto mb-5">Built For</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4 text-black">
            Trusted by Top{' '}
            <span className="gold-text-animate">Local Brands</span>
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: '#000000' }}>
            Serving premium cafes, salons, and clinics across the Mohali-Chandigarh tri-city area.
          </p>
        </div>

        {/* Business type icons */}
       <div className="flex flex-wrap justify-center gap-8 mb-16">
  {businessTypes.map(({ icon: Icon, label }) => (
    <div
      key={label}
      className="flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300 group cursor-default"
      style={{
        background: '#E5E5E5',
        border: '2px solid #000000',
        minWidth: '160px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#D4A017';
        e.currentTarget.style.background = '#D6D6D6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#000000';
        e.currentTarget.style.background = '#E5E5E5';
      }}
    >
      {/* Icon Box */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: '#D4A017',
          border: '2px solid #000000',
        }}
      >
        <Icon
          size={24}
          strokeWidth={2.5}
          style={{ color: '#000000' }}
        />
      </div>

      {/* Business Name */}
      <span
        className="text-sm font-semibold"
        style={{ color: '#000000' }}
      >
        {label}
      </span>
    </div>
  ))}
</div>

        {/* Logo placeholder row */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
             background: '#E5E5E5',
             border: '2px dashed #D4A017',
          }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl flex items-center justify-center"
                style={{
                    width: '110px',
                    height: '44px',
                    background: '#D6D6D6',
                    border: '2px solid #000000'
                }}
              >
                <Star size={14} className="text-brand-gold-500/40 mr-2" />
                <span className="text-xs font-medium" style={{ color: '#000000'  }}>Your Brand</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm italic" style={{ color: '#000000'  }}>
            Client logos will appear here as our pilot businesses go live.
          </p>
        </div>
      </div>

      <div className="divider-gold absolute bottom-0 left-0 right-0" />
    </section>
  );
}