import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, QrCode, Star, BarChart3, Users,
  Sparkles, MessageSquare, CreditCard, Settings, LogOut, X, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

const NAV_ITEMS = [
  { label: 'Dashboard',          to: '/dashboard',              icon: LayoutDashboard, exact: true },
  { label: 'QR Codes',           to: '/dashboard/qr-codes',    icon: QrCode },
  { label: 'Reviews',            to: '/dashboard/reviews',      icon: Star },
  { label: 'Analytics',          to: '/dashboard/analytics',    icon: BarChart3 },
  { label: 'Customers',          to: '/dashboard/customers',    icon: Users },
  { label: 'AI Review Generator', to: '/dashboard/ai-review',  icon: Sparkles },
  { label: 'Feedback',           to: '/dashboard/feedback',     icon: MessageSquare },
  { label: 'Subscription',       to: '/dashboard/subscription', icon: CreditCard },
  { label: 'Settings',           to: '/dashboard/settings',     icon: Settings },
];

interface SidebarProps { open: boolean; onClose: () => void; }

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() { logout(); navigate('/'); }

  const content = (
    <div className="flex flex-col h-full" style={{ background: '#0D0D14' }}>
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <span className="font-black text-xl text-white">up<span className="gold-text">Ranko</span></span>
        <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white transition-colors p-1"><X size={18} /></button>
      </div>

      {/* Business pill */}
      <div className="px-4 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 px-2.5 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 text-white"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }}>
            {user?.businessName?.[0] ?? 'B'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user?.businessName}</p>
            <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, to, icon: Icon, exact }) => (
          <NavLink key={to} to={to} end={exact}
            onClick={() => { if (window.innerWidth < 1024) onClose(); }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive ? 'text-white' : 'hover:bg-white/5'
              }`
            }
            style={({ isActive }) => isActive
              ? { background: 'rgba(59,130,246,0.14)', border: '1px solid rgba(59,130,246,0.2)', color: 'white' }
              : { color: 'rgba(255,255,255,0.45)' }
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} style={{ color: isActive ? '#60A5FA' : undefined }} className={isActive ? '' : 'text-white/35 group-hover:text-white/60'} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={13} className="text-blue-400/60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.cssText = 'color:#F87171;background:rgba(239,68,68,0.08);'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.cssText = ''; }}>
          <LogOut size={16} /><span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 border-r" style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0D0D14' }}>
        {content}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <aside className="relative z-10 w-64 flex-shrink-0 border-r" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
