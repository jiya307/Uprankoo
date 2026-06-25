import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, AlertCircle, Phone, User, Building2, ChevronDown } from 'lucide-react';
import logo from "../assets/logo2.png.jpeg"
gsap.registerPlugin(ScrollTrigger);

type FormState = 'idle' | 'loading' | 'success' | 'error';

const businessTypes = ['Cafe / Restaurant', 'Salon / Spa', 'Clinic / Wellness', 'Boutique / Retail', 'Other'];
const locations = ['Phase 3B2, Mohali', 'Phase 7, Mohali', 'Phase 8, Mohali', 'Sector 17, Chandigarh', 'Sector 22, Chandigarh', 'Sector 34, Chandigarh', 'Zirakpur', 'Other'];

export default function LeadForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<FormState>('idle');
  const [form, setForm] = useState({
    name: '',
    business_name: '',
    phone: '',
    email: '',
    business_type: '',
    location: '',
    message: '',
  });

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
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 82%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    
  };

  const inputClass = `w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30
    focus:outline-none focus:border-brand-gold-500/50 focus:bg-white/8 transition-all duration-200 text-sm`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0F0606 0%, #0A0A0A 100%)' }}
    >
      <div className="divider-gold absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #D4A017, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto px-6 relative">
        <div ref={titleRef} className="text-center mb-14">
          
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-5">
            Claim Your{' '}
            <span className="gold-text-animate">Pilot Spot</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Fill in your details and Birinder will reach out within a few hours to schedule your free demo.
          </p>

          {/* Direct contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <a
              href="tel:+918146145161"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-brand-gold-400 transition-colors"
            >
              <Phone size={14} className="text-brand-gold-500" />
              +91 81461 45161
            </a>
            <a
              href={`https://wa.me/918146145161?text=Hi%20Birinder%2C%20I%20want%20to%20learn%20more%20about%20upRanko`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div
          ref={cardRef}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(212,160,23,0.15)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          }}
        >
          {/* Card header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-brand-gold-500/30">
                <img src={logo} alt="upRanko" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">upRanko Setup Request</p>
                <p className="text-white/40 text-xs">Usually responds within a few hours</p>
              </div>
            </div>
          </div>

          {formState === 'success' ? (
            <div className="px-8 py-16 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.3)' }}
              >
                <CheckCircle size={28} className="text-brand-gold-400" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">You're on the list!</h3>
              <p className="text-white/60 text-sm max-w-sm mx-auto">
                Birinder will reach out to you on WhatsApp or call within a few hours to schedule your free demo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {formState === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)' }}
                >
                  <AlertCircle size={16} className="text-brand-red-400 flex-shrink-0" />
                  <p className="text-brand-red-300 text-sm">Something went wrong. Please try again or WhatsApp us directly.</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className={`${inputClass} pl-10`}
                  />
                </div>
                <div className="relative">
                  <Building2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    name="business_name"
                    value={form.business_name}
                    onChange={handleChange}
                    placeholder="Business Name"
                    required
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className={`${inputClass} pl-10`}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email (optional)"
                  className={inputClass}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <select
                    name="business_type"
                    value={form.business_type}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-charcoal">Business Type</option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t} className="bg-charcoal">{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-charcoal">Your Location</option>
                    {locations.map((l) => (
                      <option key={l} value={l} className="bg-charcoal">{l}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Anything else you'd like us to know? (optional)"
                rows={3}
                className={`${inputClass} resize-none`}
              />

              <button
                type="submit"
                disabled={formState === 'loading'}
                className="btn-primary w-full justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Book My Free Demo
                  </>
                )}
              </button>

              <p className="text-center text-white/30 text-xs">
                No spam. Birinder Singh will contact you directly on +91 81461 45161.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
