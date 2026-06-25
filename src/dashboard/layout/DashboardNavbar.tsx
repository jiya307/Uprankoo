import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

export default function DashboardNavbar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    }
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, []);

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? 'U';

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b flex-shrink-0"
      style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuToggle} className="lg:hidden p-1 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <Menu size={20} />
        </button>
        <div className="relative hidden sm:flex items-center max-w-xs w-full">
          <Search size={14} className="absolute left-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
<input
  placeholder="Search reviews, customers..."
  className="
    w-full
    pl-10
    pr-4
    py-2.5
    rounded-xl
    bg-white/5
    border
    border-white/10
    text-white
    placeholder:text-white/30
    focus:outline-none
    focus:border-[#250875]
  "
/>        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-xl transition-all duration-200 hover:bg-white/5"
          style={{ color: 'rgba(255,255,255,0.4)' }}>
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500" />
        </button>

        <div ref={dropdownRef} className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white/5 transition-all duration-200">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }}>
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-white text-xs font-semibold leading-tight">{user?.name}</p>
              <p className="text-xs leading-tight truncate max-w-[110px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{user?.businessName}</p>
            </div>
            <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} style={{ color: 'rgba(255,255,255,0.3)' }} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl py-1 z-50"
              style={{ background: '#1A1A24', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <p className="text-white text-sm font-semibold">{user?.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{user?.email}</p>
              </div>
              <div className="py-1">
                <Link to="/dashboard/settings" onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-all"
                  style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <Settings size={14} /> Settings
                </Link>
                <Link to="/dashboard" onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-all"
                  style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <User size={14} /> Profile
                </Link>
              </div>
              <div className="border-t py-1" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <button onClick={() => { logout(); navigate('/'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all">
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
