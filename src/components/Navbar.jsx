import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, History, LogOut, Zap, BarChart2, LifeBuoy, Bell, ChevronDown } from 'lucide-react';
import { logoutUser, getCurrentUser } from '../services/api';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/checkout',  label: 'Checkout',  icon: CreditCard },
  { to: '/history',   label: 'History',   icon: History },
  { to: '/reports',   label: 'Reports',   icon: BarChart2 },
  { to: '/support',   label: 'Support',   icon: LifeBuoy },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const user      = getCurrentUser();
  const initial   = user?.name?.charAt(0).toUpperCase() || 'U';
  const handleLogout = () => { logoutUser(); navigate('/login'); };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(16,185,129,0.15)',
        boxShadow: '0 2px 24px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(16,185,129,0.1)',
      }}>

      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, #10b981, #f59e0b, transparent)' }} />

      <div className="max-w-7xl mx-auto h-full px-6 flex items-center gap-4">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 flex-shrink-0 group mr-2">
          <div className="logo-icon relative w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669, #f59e0b)',
              boxShadow: '0 0 14px rgba(16,185,129,0.4), 0 4px 12px rgba(0,0,0,0.15)',
            }}>
            <Zap size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg tracking-tight gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AlphaPay
            </span>
            <span className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase">Portal</span>
          </div>
        </Link>

        {/* Separator */}
        <div className="h-6 w-px bg-slate-200 mx-1 flex-shrink-0" />

        {/* Nav Links */}
        <ul className="flex items-center gap-1 flex-1">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <li key={to}>
                <Link to={to}
                  className={`nav-link relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold overflow-hidden
                    ${active
                      ? 'active-link text-emerald-700 border border-emerald-400/40'
                      : 'text-slate-500 hover:text-emerald-700 border border-transparent hover:border-emerald-200 hover:bg-emerald-50'
                    }`}>
                  <Icon size={14} className={`flex-shrink-0 transition-transform duration-200 ${active ? 'text-emerald-500' : ''}`} />
                  <span className="hidden md:inline">{label}</span>
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500 animate-pulse-glow" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Notification bell */}
          <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-600 border border-transparent hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-200">
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 live-dot" />
          </button>

          <div className="h-6 w-px bg-slate-200" />

          {/* User */}
          {user && (
            <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-emerald-50 transition-colors duration-200 cursor-default group">
              <div className="avatar-glow relative w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm shadow flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669, #f59e0b)' }}>
                {initial}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-xs font-bold text-slate-700">{user.name}</span>
                <span className="text-[10px] text-emerald-600 font-semibold">{user.studentId}</span>
              </div>
              <ChevronDown size={12} className="text-slate-400 group-hover:text-slate-600 transition-colors duration-200 hidden sm:block" />
            </div>
          )}

          {/* Logout */}
          <button onClick={handleLogout}
            className="btn-glow flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-500 border border-slate-200 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all duration-200">
            <LogOut size={13} />
            <span className="hidden sm:inline text-xs font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
