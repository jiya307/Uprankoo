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
      style={{
  background: '#FFFFFF',
  borderColor: '#E5E7EB',
}}>
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuToggle} className="lg:hidden p-1 transition-colors" style={{ color: '#374151' }} >
          <Menu size={20} />
        </button>
        <div className="relative hidden sm:flex items-center max-w-xs w-full">
          <Search size={14} className="absolute left-3.5" style={{ color: '#374151' }} />
<input
  placeholder="Search reviews, customers..."
  className="
    w-full
    pl-10
    pr-4
    py-2.5
    rounded-xl
    bg-white
    border
    border-gray-300
    text-black
    placeholder:text-gray-400
    focus:outline-none
    focus:border-[#2563EB]
  "
/>  </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-xl transition-all duration-200 hover:bg-white"
          style={{ color: '#374151' }}>
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500" />
        </button>

        <div ref={dropdownRef} className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white transition-all duration-200">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }}>
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-black text-xs font-semibold leading-tight">{user?.name}</p>
              <p className="text-xs leading-tight truncate max-w-[110px]" style={{ color: '#374151' }}>{user?.businessName}</p>
            </div>
            <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} style={{ color: '#374151' }} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl py-1 z-50"
             style={{
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
}}>
              <div className="px-4 py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
                <p className="text-black text-sm font-semibold">{user?.name}</p>
                <p className="text-gray-500 text-xs">{user?.email}</p>
              </div>
              <div className="py-1">
                <Link to="/dashboard/settings" onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-black hover:bg-gray-100 transition-all">
                  <Settings size={14} /> Settings
                </Link>
                <Link to="/dashboard" onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-black hover:bg-gray-100 transition-all">
                  <User size={14} /> Profile
                </Link>
              </div>
              <div className="border-t py-1" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <button onClick={() => { logout(); navigate('/'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500 transition-all">
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
