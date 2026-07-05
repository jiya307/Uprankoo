import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  crumb?: string;
}

export default function PageHeader({ label, title, subtitle, crumb }: PageHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.ph-animate');
    els?.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1 + 0.15, ease: 'power3.out' }
      );
    });
  }, []);

  return (
    
      
      <div
  ref={ref}
  className="relative pt-32 pb-20 overflow-hidden"
  style={{ background: "#ffffff" }}
>
      
    
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
       style={{
  backgroundImage: `
    linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
}}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-8"
        style={{ background: 'radial-gradient(ellipse, rgba(196,30,30,0.15) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Breadcrumb */}
        <div className="ph-animate flex items-center justify-center gap-1.5 text-xs text-gray-500 mb-5">
          <Link to="/" className="text-gray-500 hover:text-[#C81E3A] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-700">{crumb ?? label}</span>
        </div>

        <div className="ph-animate section-label mx-auto mb-5">{label}</div>

        <h1 className="ph-animate font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-5 text-black">
          {title}
        </h1>

        {subtitle && (
          <p className="ph-animate text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>

      <div className="divider-gold absolute bottom-0 left-0 right-0" />
    </div>
  );
}
