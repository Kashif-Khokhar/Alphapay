import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownLeft, Zap, CreditCard, 
  ShieldCheck, Activity, Plus, MoreHorizontal,
  ChevronRight, Wallet, TrendingUp
} from 'lucide-react';
import { getCurrentUser, getTransactions, logoutUser } from '../services/api';
import { User, Settings, LogOut } from 'lucide-react';

function AnimatedBalance({ value }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-black flex items-baseline gap-1 tracking-tighter"
    >
      <span className="text-xl font-bold opacity-60">PKR</span>
      {value.toLocaleString()}
    </motion.div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [transactions] = useState(() => getTransactions());
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { setMounted(true); }, []);

  const recent = transactions.slice(0, 3);
  const totalSpent = transactions.filter(t => t.status === 'SUCCESS').reduce((s, t) => s + parseFloat(t.amount || 0), 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 400 } }
  };

  return (
    <div className="min-h-screen pb-32 px-4 sm:px-6" style={{ paddingTop: '140px' }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-12"
      >
        
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-secondary tracking-tighter">
              Hello, {user?.name?.split(' ')[0]} 👋
            </h1>
          </div>
          <div className="relative group/header-menu">
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-secondary border border-white/40 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all">
              <MoreHorizontal size={20} />
            </div>
            
            {/* Header Menu List */}
            <div className="absolute top-full right-0 mt-3 w-48 bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white opacity-0 group-hover/header-menu:opacity-100 pointer-events-none group-hover/header-menu:pointer-events-auto transition-all duration-200 transform translate-y-3 group-hover/header-menu:translate-y-0 p-2 z-50">
               <button onClick={() => navigate('/profile')} className="w-full text-left px-4 py-3 text-[13px] font-black text-secondary hover:bg-slate-50 rounded-2xl transition-colors flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <User size={16} strokeWidth={2.5} />
                  </div>
                  Profile
               </button>
               <button onClick={() => navigate('/settings')} className="w-full text-left px-4 py-3 text-[13px] font-black text-secondary hover:bg-slate-50 rounded-2xl transition-colors flex items-center gap-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Settings size={16} strokeWidth={2.5} />
                  </div>
                  Settings
               </button>
               <div className="h-px bg-slate-100 mx-2 my-2" />
               <button 
                 onClick={() => {
                   logoutUser();
                   navigate('/login');
                 }} 
                 className="w-full text-left px-4 py-3 text-[13px] font-black text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors flex items-center gap-3"
               >
                  <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                    <LogOut size={16} strokeWidth={2.5} />
                  </div>
                  Logout
               </button>
            </div>
          </div>
        </motion.div>

        {/* Main Card Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6">
             {/* Large Balance Display */}
             <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Total Balance</p>
                  <AnimatedBalance value={user?.balance || 0} />
                  
                  <div className="mt-8 flex gap-3">
                     <button onClick={() => navigate('/checkout')} className="bg-teal-50 text-teal-600 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-teal-100 transition-colors">
                        Add Funds
                     </button>
                     <button onClick={() => navigate('/card')} className="bg-slate-50 text-slate-600 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors flex items-center gap-2">
                        <Wallet size={14} /> View Card
                     </button>
                  </div>
                </div>
             </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-6">
             {/* Insights Card (Clickable to /reports) */}
             <div 
               onClick={() => navigate('/reports')}
               className="bg-[#f8fafc] rounded-[32px] p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden h-[200px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group border border-white/60"
             >
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-14 h-14 rounded-[20px] bg-white flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-slate-800 transition-transform duration-300 group-hover:scale-110">
                    <TrendingUp size={24} strokeWidth={2.5} />
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 group-hover:text-slate-600 transition-all duration-300" />
                </div>
                <div className="relative z-10 mt-6">
                   <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Insights</p>
                   <p className="text-[19px] font-black text-slate-800 tracking-tight">Monthly Plan</p>
                </div>
             </div>
             
             {/* Savings Card with ... Dropdown */}
             <div className="bg-[#f8fafc] rounded-[32px] p-6 flex flex-col justify-between relative h-[200px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60">
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-14 h-14 rounded-[20px] bg-white flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-slate-800">
                    <Wallet size={24} strokeWidth={2.5} />
                  </div>
                  
                  {/* Dropdown Menu Container */}
                  <div className="relative group/menu">
                    <button className="w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-colors">
                      <MoreHorizontal size={20} strokeWidth={3} />
                    </button>
                    
                    {/* The Menu List */}
                    <div className="absolute top-full right-0 mt-3 w-40 bg-white/95 backdrop-blur-xl rounded-[20px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white opacity-0 group-hover/menu:opacity-100 pointer-events-none group-hover/menu:pointer-events-auto transition-all duration-200 transform translate-y-3 group-hover/menu:translate-y-0 p-2 z-50">
                       <button onClick={() => navigate('/history')} className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
                          View Details
                       </button>
                       <button onClick={() => navigate('/checkout')} className="w-full text-left px-3 py-2 text-xs font-bold text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors mt-1">
                          Add Funds
                       </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                   <p className="text-[11px] font-black text-slate-400/80 uppercase tracking-[0.2em] mb-1">Saving</p>
                   <p className="text-[20px] font-black text-[#131720] tracking-tight">PKR 12,400</p>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Quick Actions Redesign */}
        <motion.div variants={itemVariants} className="space-y-6">
           <div className="flex justify-between items-center px-2">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Quick Access</h2>
              <MoreHorizontal size={16} className="text-slate-300" />
           </div>
           <div className="grid grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: 'Send', icon: ArrowUpRight, color: 'bg-[#17e0b5]', text: 'text-secondary', onClick: () => navigate('/checkout') },
                { label: 'Request', icon: ArrowDownLeft, color: 'bg-white', text: 'text-secondary', onClick: () => navigate('/request') },
                { label: 'Bill', icon: Zap, color: 'bg-amber-400', text: 'text-secondary', onClick: () => navigate('/bills') },
                { label: 'Add', icon: Plus, color: 'bg-white', text: 'text-secondary', border: 'border-2 border-slate-900', onClick: () => navigate('/add-money') },
              ].map((btn, i) => (
                <button key={btn.label} onClick={btn.onClick} className="flex flex-col items-center gap-3 group">
                   <div className={`w-16 h-16 sm:w-20 sm:h-20 ${btn.color} ${btn.border || ''} rounded-[2rem] flex items-center justify-center shadow-xl shadow-slate-200/50 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-active:scale-95 border border-transparent`}>
                      <btn.icon size={28} className={btn.text} strokeWidth={2.5} />
                   </div>
                   <span className="text-[10px] sm:text-xs font-black text-secondary uppercase tracking-widest">{btn.label}</span>
                </button>
              ))}
           </div>
        </motion.div>

        {/* Transactions Feed */}
        <motion.div variants={itemVariants} className="space-y-6 pb-12">
           <div className="flex justify-between items-center px-2">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Activity</h2>
              <button onClick={() => navigate('/history')} className="text-xs font-black text-primary hover:opacity-70 transition-opacity">View History</button>
           </div>

           <div className="space-y-4">
              {recent.length > 0 ? recent.map((tx, i) => (
                <div key={tx.transactionId} className="premium-card p-5 flex items-center justify-between group hover:border-primary/40 active:scale-[0.99] transition-all">
                   <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${tx.status === 'SUCCESS' ? 'bg-primary/10 text-primary' : 'bg-rose-50 text-rose-500'}`}>
                         {tx.status === 'SUCCESS' ? <ArrowDownLeft size={24} /> : <Activity size={24} />}
                      </div>
                      <div>
                         <p className="text-sm font-black text-secondary">{tx.description}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{tx.date}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-black text-secondary">
                         {tx.status === 'SUCCESS' ? '-' : ''}PKR {parseFloat(tx.amount || 0).toLocaleString()}
                      </p>
                      <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter mt-1 ${tx.status === 'SUCCESS' ? 'bg-primary/20 text-secondary' : 'bg-rose-100 text-rose-600'}`}>
                         {tx.status}
                      </div>
                   </div>
                </div>
              )) : (
                <div className="premium-card p-16 text-center bg-slate-50/50 border-dashed border-slate-200 shadow-none">
                   <Activity size={32} className="mx-auto text-slate-200 mb-4" />
                   <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">No Activity Yet</p>
                </div>
              )}
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
