import { ShieldCheck, Send, Zap, User } from 'lucide-react';
import { motion } from 'framer-motion';
import SendMoneyFlow from '../components/SendMoneyFlow';

export default function Checkout() {
  return (
    <div className="min-h-screen pb-40 px-4 sm:px-8 md:px-12" style={{ paddingTop: '120px' }}>
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-fade-up">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-2.5 h-2.5 rounded-full bg-primary live-dot" />
               <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Vault Transfer</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tighter">
              Send Money
            </h1>
            <p className="text-slate-500 font-bold text-sm mt-3">Instantly transfer assets across the global banking mesh.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 animate-slide-left">
            <SendMoneyFlow />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6 animate-slide-right">
            {/* Recent Payees */}
            <div className="premium-card p-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary alert-glow -mr-16 -mt-16 opacity-10 group-hover:opacity-20 transition-opacity" />
               <h3 className="text-[11px] font-black text-secondary uppercase tracking-[0.4em] mb-10">Recent Stream</h3>
               
               <div className="space-y-4 relative z-10">
                 {[
                   { name: 'Rohan Ali', bank: 'SadaPay', initial: 'R', color: 'bg-emerald-500/10 text-emerald-500' },
                   { name: 'Kashif Khokhar', bank: 'Meezan Bank', initial: 'K', color: 'bg-primary/10 text-primary' },
                   { name: 'Ali Hamza', bank: 'HBL', initial: 'A', color: 'bg-violet-500/10 text-violet-500' },
                 ].map((p, i) => (
                   <div key={i} className="flex items-center justify-between p-5 rounded-[32px] border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group/item">
                     <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base ${p.color} transition-transform group-hover/item:scale-110`}>
                         {p.initial}
                       </div>
                       <div>
                         <p className="text-sm font-black text-secondary group-hover/item:text-primary transition-colors">{p.name}</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{p.bank}</p>
                       </div>
                     </div>
                     <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 opacity-0 group-hover/item:opacity-100 transition-all">
                       <Send size={14} />
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Limits */}
            <div className="bg-secondary rounded-[48px] p-10 text-white relative group overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-48 h-48 bg-primary rounded-full blur-[100px] -mr-24 -mt-24 opacity-20" />
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                   <ShieldCheck size={24} strokeWidth={3} />
                 </div>
                 <div>
                   <h3 className="text-sm font-black uppercase tracking-widest text-white">Vault Limits</h3>
                   <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">Alpha Secure</p>
                 </div>
               </div>
               
               <div className="space-y-8">
                 <div className="space-y-3">
                   <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                     <span>Daily Limit</span>
                     <span className="text-white">PKR 400,000</span>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '15%' }}
                        className="h-full bg-primary shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                     />
                   </div>
                 </div>
                 
                 <div className="space-y-3">
                   <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                     <span>Monthly Limit</span>
                     <span className="text-white">PKR 1,000,000</span>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '45%' }}
                        className="h-full bg-primary shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                     />
                   </div>
                 </div>
               </div>

                <div className="mt-10 flex items-center justify-center gap-2 py-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                  <Zap size={14} className="text-primary" />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Network Fees &middot; 0.00%</p>
                </div>
            </div>
          </div>
        </div>

        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </div>
    </div>
  );
}
