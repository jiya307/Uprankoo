import { useState } from 'react';
import { Download, Copy, RefreshCw, Plus, Check, QrCode as QrIcon, Palette } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import { MOCK_QR_CODES } from '../../lib/mockData';

function QRPreview({ color, bg }: { color: 'black'; bg: 'white' }) {
  return (
    <div className="relative flex items-center justify-center rounded-2xl p-5" style={{ background: 'white', width: 192, height: 192 }}>
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
        <h1 className="text-black font-black text-2xl mb-1">QR Code Manager</h1>
        <p className="text-sm" style={{ color: 'black' }}>Generate, customize and manage your review QR codes</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ background: 'white', border: '1px solid blue' }}>
        {(['generate', 'manage'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${t === tab ? 'bg-blue-500 text-black' : 'hover:text-black'}`}
            style={t === tab ? {} : { color: 'black' }}>
            {t === 'generate' ? '+ Generate QR' : 'Manage QRs'}
          </button>
        ))}
      </div>

      {tab === 'generate' ? (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-5">
            <h3 className="text-black font-bold text-base">Customize Your QR</h3>
            <div className="space-y-2">
  <label className="text-sm font-medium text-black">
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
      bg-white
      border
      border-black
      text-black
      placeholder:text-gray-400
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
                  <span className="text-sm font-mono" style={{ color: 'black' }}>{color}</span>
                </div>
              </div>
              <div>
                <label className="db-label">Background</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0" />
                  <span className="text-sm font-mono" style={{ color: 'black' }}>{bg}</span>
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
                {copied ? <><Check size={13} className="text-black" /> Copied!</> : <><Copy size={13} /> Copy Link</>}
              </button>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-5">
            <p className="text-xs uppercase tracking-widest" style={{ color: 'black' }}>Live Preview</p>
            <QRPreview color={'black'} bg={'white'} />
            <div className="text-center">
              <p className="text-black font-semibold text-sm">{name || 'Unnamed QR'}</p>
              <p className="text-xs mt-1" style={{ color: 'black' }}>upranko.com/r/demo</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <h3 className="text-black font-bold">Active QR Codes</h3>
          </div>
          <div className="divide-y" style={{ borderColor: 'black' }}>
            {MOCK_QR_CODES.map(qr => (
              <div key={qr.id} className="flex items-center gap-4 px-6 py-4 hover:bg-black transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'black', border: '1px solid blue' }}>
                  <QrIcon size={18} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-black text-sm font-semibold">{qr.name}</p>
                  <p className="text-xs truncate" style={{ color: 'black' }}>{qr.link}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-black font-bold text-sm">{qr.scans.toLocaleString()}</p>
                  <p className="text-xs" style={{ color: 'black' }}>scans</p>
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
