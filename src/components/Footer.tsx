import { Link } from 'react-router-dom';
import { MapPin, Phone, Star } from 'lucide-react';
import logo from "../assets/logo2.png.jpeg"

const links = [
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Benefits', to: '/benefits' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer
      className="relative pt-16 pb-8 overflow-hidden"
      style={{ background: '#080808', borderTop: '1px solid rgba(212,160,23,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="upRanko"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-gold-500/30"
              />
              <span className="font-display font-bold text-xl">
                <span className="text-brand-red-600">up</span>
                <span className="gold-text">Ranko</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Smart NFC review management for premium local businesses in Mohali &amp; Chandigarh.
            </p>
            <div className="flex items-center gap-1 mt-4">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={13} className="text-brand-gold-500 fill-brand-gold-500" />
              ))}
              <span className="text-white/40 text-xs ml-2">Pilot Program 2024</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/40 text-sm hover:text-brand-gold-400 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-5">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Phone size={14} className="text-brand-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/60 text-sm">Birinder Singh</p>
                  <a
                    href="tel:+918146145161"
                    className="text-brand-gold-400 text-sm font-medium hover:text-brand-gold-300 transition-colors"
                  >
                    +91 81461 45161
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brand-gold-500 mt-0.5 flex-shrink-0" />
                <p className="text-white/40 text-sm">Mohali &amp; Chandigarh, Punjab</p>
              </div>
              <a
                href={`https://wa.me/918146145161?text=Hi%20Birinder%2C%20I%20want%20to%20learn%20more%20about%20upRanko`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mt-2 transition-all duration-200"
                style={{
                  background: 'rgba(37,211,102,0.1)',
                  border: '1px solid rgba(37,211,102,0.2)',
                  color: '#25D366',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="divider-gold mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <p>© 2024 upRanko. All rights reserved.</p>
          <p>Serving Mohali · Chandigarh · Zirakpur</p>
        </div>
      </div>
    </footer>
  );
}
