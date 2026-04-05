import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDownLeft, Send, Sparkles, User, ShieldCheck } from 'lucide-react';

export default function RequestMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isRequested, setIsRequested] = useState(false);

  const handleRequest = (e) => {
    e.preventDefault();
    setIsRequested(true);
    setTimeout(() => navigate('/dashboard'), 2000);
  };

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
    <div className="min-h-screen pb-40 px-4 sm:px-8 md:px-12 lg:px-24" style={{ paddingTop: '120px' }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-primary live-dot" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Request Terminal</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tighter">
              Generate Request
            </h1>
            <p className="text-slate-400 font-bold text-sm mt-3">Request funds from any AlphaPay user securely.</p>
          </div>
          <div className="flex gap-4 shrink-0">
             <button 
              onClick={() => navigate(-1)}
              className="h-12 px-6 rounded-xl glass-premium border border-white/10 flex items-center gap-2 font-black text-xs uppercase tracking-widest text-secondary hover:bg-white/5 transition-all"
            >
              <ArrowDownLeft size={18} className="rotate-45" /> Cancel
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full">
          <div className="glass-premium rounded-[2.5rem] p-8 sm:p-12 border border-white/10 relative overflow-hidden group">
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-primary/5 rounded-full blur-[80px] -ml-20 -mb-20" />

            <div className="relative z-10">
              <div className="flex flex-col items-center mb-12">
                <div className="w-20 h-20 rounded-3xl icon-bg-teal flex items-center justify-center shadow-2xl border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 mb-6">
                  <ArrowDownLeft size={40} className="icon-action" strokeWidth={2.5} />
                </div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Vault Transfer Request</p>
              </div>

              {isRequested ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 icon-bg-emerald text-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <ShieldCheck size={48} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl font-black text-secondary mb-3 tracking-tighter">Request Broadcasted!</h2>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Securing vault redirect...</p>
                </motion.div>
              ) : (
                <form onSubmit={handleRequest} className="space-y-8">
                  <motion.div variants={itemVariants}>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-3 px-2">Amount (PKR)</label>
                    <div className="flex items-center gap-4 h-16 bg-white/5 border border-white/5 rounded-2xl px-6 group/input focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all">
                      <span className="text-lg font-black text-slate-500 group-focus-within/input:text-primary transition-colors shrink-0">PKR</span>
                      <input 
                        type="number" 
                        required
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full h-full bg-transparent text-xl font-black text-secondary placeholder-slate-600 outline-none"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-3 px-2">Recipient Handle</label>
                    <div className="flex items-center gap-4 h-16 bg-white/5 border border-white/5 rounded-2xl px-6 group/input focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all">
                      <User size={20} className="text-slate-500 group-focus-within/input:text-primary transition-colors shrink-0" />
                      <input 
                        type="text" 
                        required
                        placeholder="@username or tag"
                        className="w-full h-full bg-transparent text-sm font-bold text-secondary placeholder-slate-600 outline-none uppercase tracking-widest"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-3 px-2">Transaction Memo</label>
                    <textarea 
                      placeholder="What is this request for?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-sm font-bold text-secondary placeholder-slate-600 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none h-32"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4">
                    <button type="submit" className="btn-glow w-full h-16 bg-secondary text-primary font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                      <Send size={20} strokeWidth={3} /> Dispatch Request
                    </button>
                  </motion.div>
                </form>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Encrypted Request</span>
          </div>
        </motion.div>
        
        {/* Mobile Spacer */}
        <div className="h-40 md:hidden" />
      </motion.div>
    </div>
  );
}

