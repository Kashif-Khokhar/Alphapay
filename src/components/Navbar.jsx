import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, History, LogOut, Zap, BarChart2, LifeBuoy } from 'lucide-react';
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
  const handleLogout = () => { logoutUser(); navigate('/login'); };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#04100a]/85 backdrop-blur-xl border-b border-white/6 shadow-2xl">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center gap-6">

        {/* Logo — spin on hover */}
        <Link to="/dashboard" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="logo-icon w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-500/35 group-hover:shadow-emerald-500/60 transition-shadow duration-300">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-black text-lg tracking-tight gradient-text group-hover:opacity-80 transition-opacity duration-200">UniPay</span>
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-1 flex-1">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <li key={to}>
                <Link to={to} className={`nav-link flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium
                  ${active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.18)]'
                    : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/8 border border-transparent hover:border-emerald-500/15'
                  }`}>
                  <Icon size={14} className="transition-transform duration-200 group-hover:scale-110" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-3 ml-auto">
          {user && (
            <div className="flex items-center gap-2.5 cursor-default">
              <div className="avatar-glow w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-300 hidden sm:block">{user.name}</span>
            </div>
          )}
          <button onClick={handleLogout}
            className="btn-glow flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-400 border border-white/8 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/8">
            <LogOut size={14} className="transition-transform duration-200 hover:rotate-12" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
