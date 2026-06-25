import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color?: string;
  delay?: number;
}

export default function StatCard({ title, value, change, changeLabel, icon, color = '#3B82F6', delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay });
  }, [delay]);

  const positive = change !== undefined && change > 0;

  return (
    <div ref={ref} className="glass-card-hover p-5 rounded-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}28` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        {change !== undefined && (
          <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
            positive ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
          }`}>
            {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{title}</p>
      <p className="text-white font-black text-3xl leading-none mb-1">{value}</p>
      {changeLabel && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{changeLabel}</p>}
    </div>
  );
}
