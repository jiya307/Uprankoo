import { useState } from 'react';
import { Sparkles, Copy, RefreshCw, Check } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';

const SAMPLES = [
  "Had an amazing experience at this café! The staff were incredibly warm and welcoming. The cappuccino was perfectly made — rich, creamy, and just the right temperature. The cozy atmosphere made it perfect for a quick meeting. Highly recommend to everyone!",
  "Absolutely fantastic place! From the moment you walk in, you're greeted with a smile. The food quality is outstanding and the service is impressively fast. I especially loved the freshly baked pastries. This is now my go-to spot in the city!",
  "What a gem! Every detail here speaks to quality — from the premium ingredients to the thoughtful interiors. My latte was the best I've had in a long time. The staff clearly take pride in their work. 5 stars, no question!",
];

const TYPES = ['Café / Coffee Shop','Restaurant','Bakery','Salon / Spa','Fitness Studio','Retail Store','Hotel'];

export default function AIReviewPage() {
  const [type, setType] = useState('');
  const [keywords, setKeywords] = useState('');
  const [experience, setExperience] = useState('');
  const [generated, setGenerated] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!type) return;
    setLoading(true); setGenerated('');
    await new Promise(r => setTimeout(r, 1500));
    setGenerated(SAMPLES[Math.floor(Math.random() * SAMPLES.length)]);
    setLoading(false);
  }

  function copy() { navigator.clipboard.writeText(generated); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)' }}>
            <Sparkles size={16} className="text-purple-400" />
          </div>
          <h1 className="text-black font-black text-2xl">AI Review Generator</h1>
        </div>
        <p className="text-sm ml-11" style={{ color: 'black' }}>Generate authentic review templates to inspire your customers</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-5">
          <h3 className="text-black font-bold text-base">Tell us about your business</h3>
          <div>
  <label className="db-label">Business Type *</label>
  <select
    value={type}
    onChange={e => setType(e.target.value)}
    className="w-full px-4 py-2 bg-white text-black border border-blue-500 rounded-lg"
  >
    <option value="">Select type</option>
    {TYPES.map(t => (
      <option key={t}>{t}</option>
    ))}
  </select>
</div>

<div>
  <label className="db-label">Keywords / Highlights</label>
  <input
    value={keywords}
    onChange={e => setKeywords(e.target.value)}
    placeholder="e.g. fast service, great coffee, cozy ambiance"
    className="w-full px-4 py-2 bg-white text-black placeholder:text-black/50 border border-blue-500 rounded-lg"
  />
</div>

<div>
  <label className="db-label">Customer Experience</label>
  <textarea
    value={experience}
    onChange={e => setExperience(e.target.value)}
    placeholder="Describe the experience to highlight..."
    className="w-full px-4 py-2 h-24 resize-none bg-white text-black placeholder:text-black/50 border border-blue-500 rounded-lg"
  />
</div>
          <div className="flex flex-col gap-2">
            
            {generated && <button onClick={generate} className="db-btn-secondary justify-center text-xs"><RefreshCw size={13} /> Regenerate</button>}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-black font-bold text-base">Generated Review</h3>
            {generated && (
              <button onClick={copy} className="db-btn-secondary text-xs py-1.5 px-3">
                {copied ? <><Check size={12} className="text-green-400" />Copied!</> : <><Copy size={12} />Copy</>}
              </button>
            )}
          </div>
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: 'rgba(139,92,246,0.15)' }}>
                <Sparkles size={20} className="text-purple-400" />
              </div>
              <div className="space-y-2 w-full">
                {[100,90,95,70].map((w,i) => <div key={i} className="h-3 rounded-full animate-pulse" style={{ width:`${w}%`, background:'rgba(255,255,255,0.06)' }} />)}
              </div>
            </div>
          ) : generated ? (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-5 rounded-xl" style={{ background: 'black', border: '1px solid rgba(139,92,246,0.15)' }}>
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_,i) => <span key={i} className="text-yellow-700">★</span>)}</div>
                <p className="italic text-sm leading-relaxed" style={{ color: 'black' }}>&ldquo;{generated}&rdquo;</p>
              </div>
              <p className="text-xs text-center mt-4" style={{ color: 'black' }}>Share this template to inspire authentic reviews</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'white', border: '1px solid blue' }}>
                <Sparkles size={22} style={{ color: 'black' }} />
              </div>
              <p className="text-sm" style={{ color: 'black' }}>Fill in the form and click Generate</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
