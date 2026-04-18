import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, IdCard, Wallet, ArrowLeft, Camera, ShieldCheck, Star } from 'lucide-react';
import { getCurrentUser } from '../services/api';

export default function Profile() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 400 } }
  };

  return (
    <div className="min-h-screen pb-40 px-4 sm:px-8 md:px-12" style={{ paddingTop: '120px' }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-2.5 h-2.5 rounded-full bg-primary live-dot" />
               <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Identity Vault</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tighter">My Profile</h1>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="w-14 h-14 rounded-2xl glass-premium border border-white/10 flex items-center justify-center text-secondary hover:bg-white/5 transition-all shadow-xl shadow-slate-200/40"
          >
            <ArrowLeft size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Avatar Panel */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
            <div className="premium-card flex flex-col items-center">
               <div className="relative group perspective-1000">
                  <div className="w-24 h-24 rounded-3xl bg-secondary text-primary flex items-center justify-center font-black text-4xl shadow-xl relative z-10 border-4 border-white/5 transition-transform duration-700 group-hover:rotate-y-12">
                     {user?.name?.charAt(0) || 'A'}
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <button className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl glass-premium shadow-2xl flex items-center justify-center text-secondary hover:text-primary transition-all z-20 hover:scale-110 active:scale-95 border border-white/5">
                    <Camera size={20} strokeWidth={3} />
                  </button>
               </div>
               <div className="text-center mt-10">
                 <h2 className="text-2xl font-black text-secondary tracking-tight">{user?.name}</h2>
                 <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mt-2">Alpha Member Since 2024</p>
                 <div className="flex items-center justify-center gap-1.5 mt-5">
                   {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-primary text-primary" />)}
                 </div>
               </div>
            </div>

            <div className="bg-secondary rounded-3xl p-8 text-white relative group overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 w-48 h-48 bg-primary rounded-full blur-[100px] -mr-24 -mt-24 opacity-30 group-hover:scale-125 transition-transform duration-1000" />
               <div className="relative z-10 flex flex-col items-center text-center">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Vault Balance</p>
                 <p className="text-4xl font-black tracking-tighter text-white">PKR {Number(user?.balance).toLocaleString()}</p>
                 <div className="h-1.5 bg-white/5 rounded-full mt-8 overflow-hidden w-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-primary shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                    />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-6 italic">Secure Asset Allocation</p>
               </div>
            </div>
          </motion.div>

          {/* Details Panel */}
          <motion.div variants={itemVariants} className="lg:col-span-8 space-y-8">
             <div className="premium-card">
                <h3 className="text-[11px] font-black text-muted uppercase tracking-[0.4em] mb-12 text-center">Validated Security Data</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2 group">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 rounded-xl bg-white/5 text-secondary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary">
                          <User size={22} strokeWidth={3} />
                       </div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                    </div>
                    <p className="text-xl font-black text-secondary pl-20">{user?.name}</p>
                  </div>

                  <div className="space-y-2 group">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 rounded-xl bg-white/5 text-secondary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary">
                          <Mail size={22} strokeWidth={3} />
                       </div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Access</p>
                    </div>
                    <p className="text-xl font-black text-secondary pl-20 break-all">{user?.email}</p>
                  </div>

                  <div className="space-y-2 group">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 rounded-xl bg-white/5 text-secondary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary">
                          <IdCard size={22} strokeWidth={3} />
                       </div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Credentials</p>
                    </div>
                    <p className="text-xl font-black text-secondary pl-20">{user?.studentId}</p>
                  </div>

                  <div className="space-y-2 group">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 rounded-xl bg-white/5 text-secondary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary">
                          <ShieldCheck size={22} strokeWidth={3} />
                       </div>
                       <p className="text-[10px] font-black text-muted uppercase tracking-widest">Security Level</p>
                    </div>
                    <div className="pl-20 flex items-center gap-3">
                       <p className="text-xl font-black text-secondary">Verified</p>
                       <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest animate-pulse">Alpha Secure</span>
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex flex-col sm:flex-row gap-6 border-t border-white/5 pt-10">
                  <button onClick={() => navigate('/settings')} className="flex-1 h-16 bg-secondary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-800 transition-all hover:scale-[1.02] shadow-2xl active:scale-[0.98]">
                    Modify Portfolio
                  </button>
                    <button 
                    onClick={() => {
                      localStorage.removeItem('uniPay_user');
                      window.location.reload();
                    }}
                    className="flex-1 h-16 glass-premium border border-white/10 text-muted font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all"
                  >
                    Reset Environment
                  </button>
                </div>
             </div>
          </motion.div>

        </div>
        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </motion.div>
    </div>
  );
}

