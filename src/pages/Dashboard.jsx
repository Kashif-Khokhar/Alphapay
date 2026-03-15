import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownLeft, Zap, CreditCard, 
  ShieldCheck, Activity, Plus, MoreHorizontal,
  ChevronRight, Wallet, TrendingUp, X
} from 'lucide-react';
import StatusMessage from '../components/StatusMessage';
import { getCurrentUser, getTransactions, logoutUser } from '../services/api';

function AnimatedBalance({ value }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-black flex items-baseline gap-1 tracking-tighter text-slate-900"
    >
      <span className="text-xl font-bold opacity-70">PKR</span>
      {value.toLocaleString()}
    </motion.div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [transactions] = useState(() => getTransactions());
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'header' | 'savings' | null
  const [selectedTx, setSelectedTx] = useState(null);
  
  useEffect(() => { 
    setMounted(true); 
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.menu-container')) {
        setActiveMenu(null);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

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
    <div className="min-h-screen pb-40 px-8 sm:px-12 md:px-20 lg:px-24" style={{ paddingTop: '120px' }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto space-y-12"
      >
        
        <motion.div variants={itemVariants} className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-secondary tracking-tighter">
              Hello, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-slate-500 font-bold text-sm mt-1">Welcome back to your premium vault.</p>
          </div>
        </motion.div>

        {/* Main Card Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-12 lg:col-span-8">
             {/* Large Balance Display */}
             <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-50 relative overflow-hidden group flex flex-col items-center text-center">
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-slate-500/5 rounded-full blur-[80px] -ml-20 -mb-20" />
                
                <div className="relative z-10 flex flex-col items-center gap-10 w-full">
                  <div className="w-14 h-14 rounded-2xl icon-bg-emerald flex items-center justify-center shadow-lg border border-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    <Wallet size={36} className="icon-success" strokeWidth={2.5} />
                  </div>

                  <div className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Total Liquid Assets</p>
                    <div className="text-secondary">
                       <AnimatedBalance value={user?.balance || 0} />
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                     <button onClick={() => navigate('/checkout')} className="h-12 px-6 rounded-2xl bg-secondary text-primary flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all font-black text-sm uppercase tracking-widest">
                        <Plus size={20} strokeWidth={3} /> Add Funds
                     </button>
                     <button onClick={() => navigate('/card')} className="w-12 h-12 rounded-2xl bg-slate-50 text-secondary border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition-all">
                        <CreditCard size={20} strokeWidth={2.5} />
                     </button>
                  </div>
                </div>

                <div className="mt-10 w-full max-w-md flex justify-center gap-8 items-center border-t border-slate-100 pt-8">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Monthly Spent</p>
                      <p className="text-secondary font-black text-xl tracking-tighter">PKR 42,850</p>
                   </div>
                   <div className="w-px h-10 bg-slate-100" />
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Savings Growth</p>
                      <p className="text-emerald-500 font-black text-xl tracking-tighter">+12.4%</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
             {/* Insights Card */}
               <div 
                onClick={() => navigate('/reports')}
                className="flex-1 bg-white rounded-3xl p-8 shadow-xl border border-slate-50 cursor-pointer group hover:border-primary/20 transition-all flex flex-col items-center text-center justify-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl icon-bg-purple flex items-center justify-center shadow-lg border border-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                  <TrendingUp size={36} className="icon-premium" strokeWidth={2.5} />
                </div>
                <div>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Analysis</p>
                   <p className="text-2xl font-black text-secondary tracking-tight uppercase">Finance<br/>Insights</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                   <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex justify-between items-center px-10">
               <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Vault Services</h2>
            </div>
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: 'Transfer', icon: ArrowUpRight, color: 'icon-bg-emerald', text: 'icon-success', onClick: () => navigate('/checkout') },
                { label: 'Request', icon: ArrowDownLeft, color: 'icon-bg-teal',    text: 'icon-action',  onClick: () => navigate('/request') },
                { label: 'Payments', icon: Zap, color: 'icon-bg-amber', text: 'icon-warning', onClick: () => navigate('/bills') },
                { label: 'Statements', icon: Activity, color: 'icon-bg-rose', text: 'icon-danger', onClick: () => navigate('/history') },
              ].map((btn, i) => (
                <button key={btn.label} onClick={btn.onClick} className="premium-card flex flex-col items-center gap-4 group">
                    <div className={`w-14 h-14 ${btn.color} rounded-2xl flex items-center justify-center shadow-lg border border-white/50 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-active:scale-95`}>
                       <btn.icon size={24} className={btn.text} strokeWidth={3} />
                    </div>
                   <span className="text-[11px] font-black text-secondary uppercase tracking-widest">{btn.label}</span>
                </button>
              ))}
           </div>
        </motion.div>

        {/* Transactions Feed */}
        <motion.div variants={itemVariants} className="space-y-8 pb-20">
            <div className="flex justify-between items-center px-10">
               <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Recent Activity</h2>
              <button onClick={() => navigate('/history')} className="text-xs font-black text-primary hover:opacity-75 transition-opacity uppercase tracking-widest">Full Ledger</button>
           </div>

           <div className="space-y-3">
              {recent.length > 0 ? recent.map((tx, i) => (
                <div 
                  key={tx.transactionId} 
                  onClick={() => setSelectedTx(tx)}
                  className="premium-card flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer"
                >
                   <div className="flex items-center gap-6">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${tx.status === 'SUCCESS' ? 'icon-bg-emerald icon-success' : 'icon-bg-rose icon-danger'} group-hover:scale-110`}>
                          {tx.status === 'SUCCESS' ? <ArrowUpRight size={24} strokeWidth={3} /> : <Activity size={24} strokeWidth={3} />}
                       </div>
                      <div>
                         <p className="text-base font-black text-secondary tracking-tight">{tx.description}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">{tx.date}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-lg font-black text-secondary tracking-tighter">
                         {tx.status === 'SUCCESS' ? '-' : ''}PKR {parseFloat(tx.amount || 0).toLocaleString()}
                      </p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mt-2 ${tx.status === 'SUCCESS' ? 'bg-primary/10 text-primary' : 'bg-rose-50 text-rose-500'}`}>
                         {tx.status}
                      </div>
                   </div>
                </div>
              )) : (
                <div className="premium-card p-20 text-center border-dashed">
                   <Activity size={40} className="mx-auto text-slate-200 mb-6" />
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">The vault is empty</p>
                </div>
              )}
           </div>
        </motion.div>

        <AnimatePresence>
          {selectedTx && (
            <div 
              className="fixed inset-0 z-[10000] overflow-y-auto no-scrollbar bg-slate-900/60 backdrop-blur-md px-4 py-8 flex justify-center items-center"
              onClick={() => setSelectedTx(null)}
            >
              <div className="w-full flex justify-center py-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-lg bg-white rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]"
                  onClick={e => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setSelectedTx(null)}
                    className="absolute top-5 right-5 z-[60] w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-100"
                  >
                    <X size={20} />
                  </button>
                  <div className="w-full pb-8">
                    <StatusMessage transaction={selectedTx} onClose={() => setSelectedTx(null)} />
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </motion.div>
    </div>
  );
}
