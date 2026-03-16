import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, History, BarChart2, Bell, User, Settings, CheckCircle2, AlertCircle, Info, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser } from '../services/api';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Home',    icon: LayoutDashboard, color: 'icon-success' },
  { to: '/card',      label: 'Card',    icon: CreditCard,      color: 'icon-action'  },
  { to: '/checkout',  label: 'Pay',     icon: Wallet,          color: 'icon-warning' },
  { to: '/history',   label: 'History', icon: History,         color: 'icon-action'    },
  { to: '/reports',   label: 'Stats',   icon: BarChart2,       color: 'icon-premium' },
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'Payment Successful',
    message: 'Utility bill payment to AlphaPay has been processed.',
    time: '2 mins ago',
    icon: CheckCircle2,
    color: 'icon-success',
    bgColor: 'icon-bg-emerald'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Low Balance',
    message: 'Your account balance is below PKR 1,000.',
    time: '1 hour ago',
    icon: AlertCircle,
    color: 'icon-danger',
    bgColor: 'icon-bg-rose'
  },
  {
    id: 3,
    type: 'info',
    title: 'New Feature',
    message: 'Try our new Virtual Card feature for online shopping.',
    time: '5 hours ago',
    icon: Info,
    color: 'icon-action',
    bgColor: 'icon-bg-teal'
  }
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const user      = getCurrentUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-menu-container') && !e.target.closest('.notifications-container')) {
        setShowProfileMenu(false);
        setShowNotifications(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Top Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1400px] h-20 rounded-[32px] glass-premium shadow-2xl transition-all duration-500 hidden md:flex items-center px-10">
        <div className="w-full flex items-center justify-between h-full">
          <Link to="/dashboard" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
              <span className="text-primary font-black text-3xl italic">α</span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-secondary">
              Alpha<span className="text-primary">Pay</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const { to, label, icon: Icon } = link;
              const active = location.pathname === to;
              return (
                <li key={to}>
                  <Link to={to} className="relative px-6 py-3 flex items-center group">
                    <div className={`flex items-center gap-2.5 text-[15px] font-bold transition-all duration-300 ${active ? 'text-secondary' : 'text-slate-500 group-hover:text-slate-800'}`}>
                      <Icon 
                        size={18} 
                        strokeWidth={active ? 3 : 2} 
                        className={active ? link.color : 'opacity-80 group-hover:opacity-100 group-hover:text-primary'} 
                      />
                      <span className="tracking-tight">{label}</span>
                    </div>
                    {active && (
                      <motion.div 
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-6">
            <div className="relative notifications-container">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${showNotifications ? 'bg-secondary text-primary' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <Bell size={22} className={showNotifications ? 'animate-none' : 'group-hover:animate-swing'} />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white"></span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute top-[120%] right-0 w-80 glass-premium rounded-[32px] shadow-2xl p-2 z-[60] origin-top-right"
                  >
                    <div className="px-5 py-4 border-b border-slate-100/50 flex items-center justify-between">
                      <h3 className="font-black text-secondary text-sm">Notifications</h3>
                      <span className="px-2.5 py-1 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-wider rounded-full">3 New</span>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto p-1 space-y-1">
                      {NOTIFICATIONS.map((notif) => (
                        <div key={notif.id} className="p-4 hover:bg-white/50 rounded-2xl transition-colors flex items-start gap-4 cursor-pointer group">
                          <div className={`w-12 h-12 rounded-2xl ${notif.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${notif.color}`}>
                            <notif.icon size={20} strokeWidth={3} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-extrabold text-secondary text-[13px] truncate">{notif.title}</h4>
                            <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">{notif.message}</p>
                            <span className="text-[10px] text-slate-400 font-bold mt-1.5 inline-block uppercase tracking-wider">{notif.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="relative profile-menu-container">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                }}
                className={`w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center font-black text-xl shadow-lg hover:scale-105 transition-all outline outline-4 outline-white/50 outline-offset-0 ${showProfileMenu ? 'ring-4 ring-primary/20' : ''}`}
              >
                {user?.name?.charAt(0) || 'A'}
              </button>
              
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute top-[120%] right-0 w-60 glass-premium rounded-[32px] shadow-2xl p-2 z-[60] origin-top-right"
                  >
                     <button onClick={() => { setShowProfileMenu(false); navigate('/profile'); }} className="w-full text-left px-4 py-4 text-sm font-black text-secondary hover:bg-white/50 rounded-2xl transition-colors flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800">
                          <User size={18} strokeWidth={3} />
                        </div>
                        Profile
                     </button>
                     <button onClick={() => { setShowProfileMenu(false); navigate('/settings'); }} className="w-full text-left px-4 py-4 text-sm font-black text-secondary hover:bg-white/50 rounded-2xl transition-colors flex items-center gap-4 mt-1">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800">
                          <Settings size={18} strokeWidth={3} />
                        </div>
                        Settings
                      </button>
                      <div className="h-px bg-slate-100/50 my-1 mx-2" />
                      <button className="w-full text-left px-4 py-4 text-sm font-black text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                            <AlertCircle size={18} strokeWidth={3} />
                         </div>
                         Logout
                      </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav (Floating Dock) */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-20 glass-premium rounded-[32px] shadow-2xl flex items-center justify-around px-4 z-50">
        {NAV_LINKS.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link key={to} to={to} className="relative flex flex-col items-center justify-center gap-1 group">
              <div 
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${
                  active 
                    ? 'bg-secondary text-primary shadow-xl -translate-y-4 scale-110' 
                    : 'text-slate-500 hover:text-secondary'
                }`}
              >
                <Icon size={22} strokeWidth={active ? 3 : 2} />
              </div>
              
              {!active && (
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {label}
                </span>
              )}
            </Link>
          );
        })}

        {/* Mobile Profile Trigger */}
        <div className="relative profile-menu-container">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               setShowProfileMenu(!showProfileMenu);
             }}
             className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${
               showProfileMenu 
                 ? 'bg-secondary text-primary shadow-xl -translate-y-4 scale-110' 
                 : 'text-slate-500'
             }`}
           >
             <User size={22} strokeWidth={showProfileMenu ? 3 : 2} />
           </button>

           <AnimatePresence>
             {showProfileMenu && (
               <motion.div 
                 initial={{ opacity: 0, y: -20, scale: 0.9 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: -20, scale: 0.9 }}
                 className="absolute bottom-[130%] right-0 w-48 glass-premium rounded-[24px] shadow-2xl p-2 origin-bottom-right"
               >
                  <button onClick={() => { setShowProfileMenu(false); navigate('/profile'); }} className="w-full text-left px-4 py-3 text-xs font-black text-secondary hover:bg-slate-50 rounded-xl flex items-center gap-3">
                     <User size={16} strokeWidth={2.5} /> Profile
                  </button>
                  <button onClick={() => { setShowProfileMenu(false); navigate('/settings'); }} className="w-full text-left px-4 py-3 text-xs font-black text-secondary hover:bg-slate-50 rounded-xl flex items-center gap-3 mt-1">
                     <Settings size={16} strokeWidth={2.5} /> Settings
                  </button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
