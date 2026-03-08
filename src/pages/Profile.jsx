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
    <div className="min-h-screen pb-32 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #fcfcfc 0%, #f1f5f9 100%)', paddingTop: '140px' }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-black text-secondary tracking-tighter">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar Panel */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center">
               <div className="relative group">
                  <div className="w-32 h-32 rounded-[3.5rem] bg-secondary text-primary flex items-center justify-center font-black text-4xl shadow-2xl relative z-10">
                     {user?.name?.charAt(0) || 'K'}
                  </div>
                  <div className="absolute inset-0 rounded-[3.5rem] bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <button className="absolute bottom-0 right-0 w-10 h-10 rounded-2xl bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-primary transition-all z-20 hover:scale-110 active:scale-95">
                    <Camera size={18} />
                  </button>
               </div>
               <div className="text-center mt-6">
                 <h2 className="text-xl font-black text-secondary">{user?.name}</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Premium Member</p>
                 <div className="flex items-center justify-center gap-1 mt-3">
                   {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                 </div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[32px] p-6 text-white overflow-hidden relative group cursor-default">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-[80px] -mr-16 -mt-16 opacity-20 group-hover:scale-125 transition-transform duration-700" />
               <div className="relative z-10">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Savings</p>
                 <p className="text-2xl font-black tracking-tighter text-primary">PKR {Number(user?.balance).toLocaleString()}</p>
                 <div className="h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      className="h-full bg-primary"
                    />
                 </div>
                 <p className="text-[10px] font-bold text-slate-500 mt-2">65% of your monthly goal</p>
               </div>
            </div>
          </motion.div>

          {/* Details Panel */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
             <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Account Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110">
                       <User size={22} />
                    </div>
                    <div className="flex-1 pb-6 border-b border-slate-50">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Full Name</p>
                       <p className="text-lg font-black text-secondary">{user?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110">
                       <Mail size={22} />
                    </div>
                    <div className="flex-1 pb-6 border-b border-slate-50">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Address</p>
                       <p className="text-lg font-black text-secondary break-all">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
                       <IdCard size={22} />
                    </div>
                    <div className="flex-1 pb-6 border-b border-slate-50">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Student ID</p>
                       <p className="text-lg font-black text-secondary">{user?.studentId}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group !border-none">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center transition-transform group-hover:scale-110">
                       <ShieldCheck size={22} />
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Security Status</p>
                       <div className="flex items-center gap-2 flex-wrap">
                         <p className="text-lg font-black text-secondary">Advanced Recovery Active</p>
                         <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-tighter">Verified</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    Edit Profile
                  </button>
                  <button className="flex-1 bg-slate-50 text-slate-400 font-black py-4 rounded-2xl hover:bg-slate-100 hover:text-secondary transition-all">
                    Reset Data
                  </button>
                </div>
             </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
