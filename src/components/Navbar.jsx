import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, History, BarChart2, Bell, User, Settings, CheckCircle2, AlertCircle, Info, Wallet, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser, logoutUser } from '../services/api';
import { useTheme } from './ThemeProvider';


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
  const { isDarkMode, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  
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
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1400px] h-20 rounded-[32px] bg-solid-premium shadow-2xl transition-all duration-500 hidden md:flex items-center px-10">
        <div className="w-full flex items-center justify-between h-full">
          <Link to="/dashboard" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 group-hover:rotate-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 logo-glow">
              <span className="text-secondary font-black text-3xl italic">α</span>
            </div>
            <span className="font-black text-2xl tracking-tighter gradient-text">
              AlphaPay
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
                    <div className={`flex items-center gap-2.5 text-[15px] font-bold transition-all duration-300 ${active ? 'text-secondary' : 'text-muted group-hover:text-primary'}`}>
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
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="w-12 h-12 flex items-center justify-center rounded-2xl text-slate-400 hover:bg-secondary/10 hover:text-secondary transition-all"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative notifications-container">

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${showNotifications ? 'bg-secondary text-primary' : 'text-slate-400 hover:bg-secondary/10'}`}
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
                    className="absolute top-[120%] right-0 w-[420px] bg-solid-premium rounded-[48px] p-3 z-[60] origin-top-right shadow-2xl"
                  >
                    <div className="px-8 py-7 flex items-center justify-between">
                      <div>
                         <h3 className="font-black text-secondary text-xl tracking-tight leading-none mb-1.5">Notifications</h3>
                         <p className="text-[10px] font-black text-muted uppercase tracking-[0.4em]">Recent Updates</p>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">3 New</span>
                      </div>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto p-1 space-y-2 custom-scrollbar">
                      {NOTIFICATIONS.map((notif) => (
                        <div key={notif.id} className="p-5 hover:bg-secondary/5 rounded-[32px] transition-all flex items-start gap-5 cursor-pointer group border border-transparent hover:border-secondary/10">
                          <div className={`w-14 h-14 rounded-2xl ${notif.bgColor} bg-secondary/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${notif.color} border border-secondary/10 shadow-lg`}>
                            <notif.icon size={24} strokeWidth={2.5} />
                          </div>
                          <div className="flex-1 min-w-0 py-1">
                            <div className="flex justify-between items-start gap-2">
                               <h4 className="font-black text-secondary text-base tracking-tight">{notif.title}</h4>
                               <span className="text-[9px] text-muted font-bold uppercase tracking-widest shrink-0 mt-1">{notif.time}</span>
                            </div>
                            <p className="text-muted text-xs leading-relaxed mt-2 font-medium">{notif.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 mt-2">
                       <button className="w-full py-4 rounded-2xl bg-secondary/5 text-[10px] font-black text-muted uppercase tracking-[0.3em] hover:bg-secondary/10 hover:text-secondary transition-all border border-secondary/10">
                          Clear Notifications
                       </button>
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
                className={`w-12 h-12 rounded-2xl bg-[var(--user-avatar-bg)] text-white flex items-center justify-center font-black text-xl shadow-lg hover:scale-105 transition-all outline outline-4 outline-primary/20 outline-offset-0 ${showProfileMenu ? 'ring-4 ring-primary/20' : ''}`}
              >
                {user?.name?.charAt(0) || 'A'}
              </button>
              
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute top-[120%] right-0 w-[280px] bg-solid-premium rounded-[40px] p-3 z-[60] origin-top-right shadow-2xl"
                  >
                     <div className="px-6 py-5 border-b border-secondary/10 mb-2">
                        <p className="text-[9px] font-black text-muted uppercase tracking-[0.4em] mb-1">Identity</p>
                        <h4 className="text-secondary font-black text-base truncate">{user?.name || "Administrator"}</h4>
                     </div>
                     <button onClick={() => { setShowProfileMenu(false); navigate('/profile'); }} className="w-full text-left px-5 py-4 text-xs font-black text-secondary hover:bg-secondary/5 rounded-3xl transition-all flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-2xl bg-secondary/5 flex items-center justify-center text-muted group-hover:scale-110 group-hover:rotate-3 transition-all border border-secondary/10">
                          <User size={18} strokeWidth={3} />
                        </div>
                        My Profile
                      </button>
                      <button onClick={() => { setShowProfileMenu(false); navigate('/settings'); }} className="w-full text-left px-5 py-4 text-xs font-black text-secondary hover:bg-secondary/5 rounded-3xl transition-all flex items-center gap-4 mt-1 group">
                         <div className="w-10 h-10 rounded-2xl bg-secondary/5 flex items-center justify-center text-muted group-hover:scale-110 group-hover:rotate-3 transition-all border border-secondary/10">
                           <Settings size={18} strokeWidth={3} />
                         </div>
                         Settings
                       </button>
                       <div className="h-px bg-secondary/10 my-2 mx-4" />
                       <button onClick={handleLogout} className="w-full text-left px-5 py-4 text-xs font-black text-rose-500 hover:bg-rose-500/10 rounded-3xl transition-all flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 group-hover:scale-110 transition-all">
                             <AlertCircle size={18} strokeWidth={3} />
                          </div>
                          Log Out
                       </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav (Floating Dock) */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-20 bg-solid-premium rounded-[32px] shadow-2xl flex items-center justify-around px-4 z-50">
        {NAV_LINKS.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link key={to} to={to} className="relative flex flex-col items-center justify-center gap-1 group">
              <div 
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${
                  active 
                    ? 'bg-[var(--user-avatar-bg)] text-[var(--user-avatar-text)] shadow-xl -translate-y-4 scale-110' 
                    : 'text-slate-400 hover:text-secondary'
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
                 ? 'bg-[var(--user-avatar-bg)] text-[var(--user-avatar-text)] shadow-xl -translate-y-4 scale-110' 
                 : 'text-slate-400'
             }`}
           >
             <User size={22} strokeWidth={showProfileMenu ? 3 : 2} />
           </button>

           {/* Mobile Theme Toggle */}
           <button 
             onClick={toggleTheme}
             className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all text-slate-400"
           >
             {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
           </button>

           <AnimatePresence>

             {showProfileMenu && (
               <motion.div 
                 initial={{ opacity: 0, y: -20, scale: 0.9 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: -20, scale: 0.9 }}
                 className="absolute bottom-[130%] right-0 w-48 bg-solid-premium rounded-[24px] shadow-2xl p-2 origin-bottom-right"
               >
                  <button onClick={() => { setShowProfileMenu(false); navigate('/profile'); }} className="w-full text-left px-4 py-3 text-xs font-black text-secondary hover:bg-secondary/10 rounded-xl flex items-center gap-3">
                     <User size={16} strokeWidth={2.5} /> My Profile
                  </button>
                  <button onClick={() => { setShowProfileMenu(false); navigate('/settings'); }} className="w-full text-left px-4 py-3 text-xs font-black text-secondary hover:bg-secondary/10 rounded-xl flex items-center gap-3 mt-1">
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

