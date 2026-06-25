import { useState } from 'react';
import { Download, Copy, RefreshCw, Plus, Check, QrCode as QrIcon, Palette } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import { MOCK_QR_CODES } from '../../lib/mockData';

function QRPreview({ color, bg }: { color: string; bg: string }) {
  return (
    <div className="relative flex items-center justify-center rounded-2xl p-5" style={{ background: bg, width: 192, height: 192 }}>
      <svg viewBox="0 0 180 180" width="148" height="148">
        {[[12,12],[106,12],[12,106]].map(([x,y],i) => (
          <g key={i}>
            <rect x={x} y={y} width="56" height="56" rx="8" fill="none" stroke={color} strokeWidth="6" />
            <rect x={x+13} y={y+13} width="30" height="30" rx="4" fill={color} />
          </g>
        ))}
        {[0,1,2,3,4,5].flatMap(r => [0,1,2,3,4,5].map(c => {
          if ((r<3&&c<3)||(r<3&&c>3)||(r>3&&c<3)) return null;
          return Math.random()>0.4 ? <rect key={`${r}${c}`} x={14+c*27} y={14+r*27} width="20" height="20" rx="3" fill={color} opacity={0.85} /> : null;
        }))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
          <QrIcon size={18} style={{ color }} />
        </div>
      </div>
    </div>
  );
}

export default function QRPage() {
  const [tab, setTab] = useState<'generate' | 'manage'>('generate');
  const [color, setColor] = useState('#3B82F6');
  const [bg, setBg] = useState('#0D0D14');
  const [name, setName] = useState('Main Entrance');
  const [copied, setCopied] = useState(false);

  function copy() { navigator.clipboard.writeText('https://upranko.com/r/demo'); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">QR Code Manager</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Generate, customize and manage your review QR codes</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {(['generate', 'manage'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${t === tab ? 'bg-blue-500 text-white' : 'hover:text-white'}`}
            style={t === tab ? {} : { color: 'rgba(255,255,255,0.4)' }}>
            {t === 'generate' ? '+ Generate QR' : 'Manage QRs'}
          </button>
        ))}
      </div>

      {tab === 'generate' ? (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-5">
            <h3 className="text-white font-bold text-base">Customize Your QR</h3>
            <div className="space-y-2">
  <label className="text-sm font-medium text-white/70">
    QR Name
  </label>

  <input
    value={name}
    onChange={e => setName(e.target.value)}
    placeholder="e.g. Table 1, Counter..."
    className="
      w-full
      px-5
      py-3.5
      rounded-2xl
      bg-white/5
      border
      border-white/10
      text-white
      placeholder:text-white/30
      backdrop-blur-xl
      transition-all
      duration-300
      focus:outline-none
      focus:border-[#C81E3A]
      focus:ring-4
      focus:ring-[#C81E3A]/10
      hover:border-[#D4AF37]/30
    "
  />
</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="db-label flex items-center gap-2"><Palette size={12} /> QR Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0" />
                  <span className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>{color}</span>
                </div>
              </div>
              <div>
                <label className="db-label">Background</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0" />
                  <span className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>{bg}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <button className="db-btn-primary justify-center"><Plus size={15} /> Generate QR Code</button>
              <div className="grid grid-cols-2 gap-2">
                <button className="db-btn-secondary justify-center text-xs"><Download size={13} /> PNG</button>
                <button className="db-btn-secondary justify-center text-xs"><Download size={13} /> SVG</button>
              </div>
              <button onClick={copy} className="db-btn-secondary justify-center text-xs">
                {copied ? <><Check size={13} className="text-green-400" /> Copied!</> : <><Copy size={13} /> Copy Link</>}
              </button>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-5">
            <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Live Preview</p>
            <QRPreview color={color} bg={bg} />
            <div className="text-center">
              <p className="text-white font-semibold text-sm">{name || 'Unnamed QR'}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>upranko.com/r/demo</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <h3 className="text-white font-bold">Active QR Codes</h3>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            {MOCK_QR_CODES.map(qr => (
              <div key={qr.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/2 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <QrIcon size={18} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{qr.name}</p>
                  <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{qr.link}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white font-bold text-sm">{qr.scans.toLocaleString()}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>scans</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="badge-success">{qr.status}</span>
                  <button className="db-btn-secondary text-xs py-1.5 px-3"><RefreshCw size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
