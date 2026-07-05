interface BarChartProps { data: number[]; labels?: string[]; color?: string; height?: number; }

export function BarChart({ data, labels, color = 'blue', height = 140 }: BarChartProps) {
  const max = Math.max(...data) || 1;
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((v, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
          <div className="w-full rounded-t-md relative group transition-all duration-300"
            style={{ height: `${(v / max) * 100}%`, background: 'black', minHeight: 4 }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-black"
              style={{ background: 'black', border: '1px solid blue' }}>{v}</div>
          </div>
          {labels?.[i] && <p className="text-xs truncate w-full text-center" style={{ color: 'black', fontSize: 10 }}>{labels[i]}</p>}
        </div>
      ))}
    </div>
  );
}

interface DonutProps { segments: { value: number; color: string; label: string }[]; size?: number; }

export function DonutChart({ segments, size = 110 }: DonutProps) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const r = 42, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="blue" strokeWidth="11" />
        {segments.map((seg, i) => {
          const dash = (seg.value / total) * circ, gap = circ - dash;
          const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth="11"
            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset} strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />;
          offset += dash; return el;
        })}
      </svg>
      <div className="space-y-2">
        {segments.map(seg => (
          <div key={seg.label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background:'black' }} />
            <span className="text-xs" style={{ color: 'black' }}>{seg.label}</span>
            <span className="text-black text-xs font-semibold ml-1">{Math.round((seg.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
