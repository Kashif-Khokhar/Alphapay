import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, History, BarChart2, Bell, User, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentUser } from '../services/api';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/card',      label: 'Card', icon: CreditCard },
  { to: '/checkout',  label: 'Pay',  icon: CreditCard },
  { to: '/history',   label: 'History', icon: History },
  { to: '/reports',   label: 'Stats', icon: BarChart2 },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const user      = getCurrentUser();

  return (
    <>
      {/* Desktop Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-[20px] saturate-150 h-20 border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hidden md:flex">
        <div className="max-w-6xl mx-auto w-full px-8 flex items-center justify-between h-full">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
              <span className="text-[#17e0b5] font-black text-2xl italic">α</span>
            </div>
            <span className="font-extrabold text-xl tracking-tighter text-secondary">
              Alpha<span className="text-primary">Pay</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="flex items-center gap-1 h-full">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <li key={to} className="h-full flex items-center">
                  <Link to={to} className="relative h-full px-5 flex items-center group">
                    <div className={`flex items-center gap-2 text-[15px] font-bold transition-all duration-300 ${active ? 'text-secondary' : 'text-slate-400 group-hover:text-slate-800 group-hover:-translate-y-[1px]'}`}>
                      <Icon size={18} strokeWidth={active ? 2.5 : 2} className={active ? '' : 'opacity-80 group-hover:opacity-100'} />
                      <span>{label}</span>
                    </div>
                    {/* Glowing Active Underline */}
                    {active && (
                      <motion.div 
                        layoutId="desktop-nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-[3px] bg-primary rounded-t-full shadow-[0_-2px_8px_rgba(23,224,181,0.6)]"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-5">
            {/* Animated Notification Bell */}
            <button className="p-2 text-slate-400 hover:text-secondary group relative transition-colors">
              <Bell size={22} className="group-hover:origin-top group-hover:animate-swing" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white shadow-sm ring-2 ring-accent/20"></span>
            </button>
            
            <div className="group relative">
              <div className="w-[42px] h-[42px] rounded-2xl bg-secondary text-primary flex items-center justify-center font-black text-lg shadow-[0_4px_12px_rgba(13,18,84,0.15)] cursor-pointer hover:scale-105 transition-all outline outline-2 outline-white outline-offset-[3px]">
                {user?.name?.charAt(0) || 'K'}
              </div>
              
              <div className="absolute top-[120%] right-0 w-52 bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 p-2 z-[60] origin-top-right scale-95 group-hover:scale-100 overflow-hidden">
                 <button onClick={() => navigate('/profile')} className="w-full text-left px-4 py-3 text-sm font-black text-secondary hover:bg-slate-50 rounded-2xl transition-colors flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
                      <User size={18} strokeWidth={2.5} />
                    </div>
                    Profile
                 </button>
                 <button onClick={() => navigate('/settings')} className="w-full text-left px-4 py-3 text-sm font-black text-secondary hover:bg-slate-50 rounded-2xl transition-colors flex items-center gap-4 mt-0.5">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
                      <Settings size={18} strokeWidth={2.5} />
                    </div>
                    Settings
                  </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav (Floating Dock) */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-sm bg-white/90 backdrop-blur-[24px] saturate-[180%] rounded-[2rem] h-[68px] shadow-[0_12px_40px_-12px_rgba(23,224,181,0.3)] flex items-end justify-around px-3 pb-2 border border-white/60 z-50">
        {NAV_LINKS.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link key={to} to={to} className="relative flex-1 flex flex-col items-center justify-end gap-0.5 pb-0.5 h-full group">
              <div 
                className={`relative flex items-center justify-center w-11 h-9 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  active 
                    ? 'bg-secondary text-primary shadow-md -translate-y-3' 
                    : 'text-slate-400 group-active:scale-90 hover:text-slate-600'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              </div>
              
              <span 
                className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 ${
                  active ? 'text-secondary' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
