import { useState } from 'react';
import { ShieldCheck, Snowflake, Eye, EyeOff, Settings, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VirtualCard from '../components/VirtualCard';
import { getCurrentUser } from '../services/api';

export default function Cards() {
  const user = getCurrentUser();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [showLimits, setShowLimits] = useState(false);

  return (
    <div className="min-h-screen pb-32 px-4 sm:px-8 md:px-12" style={{ paddingTop: '100px' }}>
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8 animate-fade-up">
           <div className="flex items-center gap-3 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary live-dot" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Secure Assets</p>
           </div>
           <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tighter">
              Virtual Cards
           </h1>
           <p className="text-slate-500 font-bold text-sm mt-2 max-w-lg">Manage your digital spending with surgical precision. Control limits, freeze instantly, and reveal details with a tap.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card Presentation */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:block">
             <div className="w-full max-w-[500px] perspective-1000">
                <VirtualCard 
                   holderName={user?.name || "ADMIN"} 
                   fullNumber={user?.cardNumber}
                   expiry={user?.expiry}
                   cvv={user?.cvv}
                   isRevealed={isRevealed}
                   isFrozen={isFrozen}
                   onToggle={() => setIsRevealed(!isRevealed)}
                />
             </div>
          </div>

          {/* Controls & Stats */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-2">
            
            <div className={`premium-card flex items-center justify-between group transition-all duration-500 ${isFrozen ? 'bg-rose-50/30' : ''}`}>
              <div className="flex items-center gap-6">
                 <div className={`w-16 h-16 ${isFrozen ? 'bg-rose-50 text-rose-500' : 'bg-primary/10 text-primary'} rounded-3xl flex items-center justify-center transition-all group-hover:scale-110`}>
                    <ShieldCheck size={28} strokeWidth={3} />
                 </div>
                 <div>
                    <h3 className="font-black text-secondary text-base tracking-tight">Vault Security</h3>
                    <p className={`text-[10px] font-black tracking-[0.2em] uppercase mt-1 ${isFrozen ? 'text-rose-500' : 'text-primary'}`}>
                      {isFrozen ? 'Locked & Secured' : 'Operational'}
                    </p>
                 </div>
              </div>
              <div className={`h-3 w-3 ${isFrozen ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]' : 'bg-primary shadow-[0_0_15px_rgba(16,185,129,0.6)]'} rounded-full animate-pulse`} />
            </div>

            <div className="grid grid-cols-3 gap-2">
               {[
                 { label: isFrozen ? 'Unfreeze' : 'Freeze', icon: Snowflake, onClick: () => setIsFrozen(!isFrozen), active: isFrozen, color: 'text-blue-500', bg: 'bg-blue-50/50' },
                 { label: isRevealed ? 'Hide' : 'Reveal', icon: isRevealed ? EyeOff : Eye, onClick: () => setIsRevealed(!isRevealed), active: isRevealed, color: 'text-primary', bg: 'bg-primary/10' },
                 { label: 'Limits', icon: Settings, onClick: () => setShowLimits(true), active: false, color: 'text-secondary', bg: 'bg-slate-50' }
               ].map((ctrl) => (
                 <button 
                   key={ctrl.label}
                   onClick={ctrl.onClick}
                   className={`premium-card flex flex-col items-center gap-3 group active:scale-95 ${ctrl.active ? ctrl.bg : ''}`}
                 >
                    <ctrl.icon size={22} strokeWidth={3} className={`transition-all group-hover:scale-110 ${ctrl.active ? ctrl.color : 'text-slate-400 group-hover:text-secondary'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${ctrl.active ? 'text-secondary' : 'text-slate-500 group-hover:text-secondary'}`}>
                      {ctrl.label}
                    </span>
                 </button>
               ))}
            </div>

            <div className="premium-card">
               <h3 className="font-black text-secondary mb-4 text-sm uppercase tracking-widest text-slate-400">Card Metadata</h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <span className="text-sm font-bold text-slate-400">Cardholder</span>
                    <span className="text-sm font-black text-secondary uppercase tracking-tight">{user?.name}</span>
                 </div>
                 <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <span className="text-sm font-bold text-slate-400">Region</span>
                    <span className="text-sm font-black text-secondary tracking-tight">Lahore, Pakistan</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-400">Payment Network</span>
                    <div className="px-4 py-1.5 bg-secondary rounded-full">
                       <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase italic">VISA Premium</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </div>

      {/* Limits Modal */}
      <AnimatePresence>
        {showLimits && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLimits(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-white overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-white">
                     <Settings size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-secondary tracking-tight">Card Limits</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Control your spending</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLimits(false)}
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-100 transition-all shadow-sm"
                >
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Daily Purchase', value: 'PKR 150,000', used: 'PKR 12,400', percent: 8, colorCls: 'bg-emerald-500', textCls: 'text-emerald-500', bgLight: 'bg-emerald-50', shadowCls: 'shadow-[0_0_10px_rgba(16,185,129,0.3)]' },
                  { label: 'Monthly Limit', value: 'PKR 1,500,000', used: 'PKR 12,400', percent: 1, colorCls: 'bg-indigo-500', textCls: 'text-indigo-500', bgLight: 'bg-indigo-50', shadowCls: 'shadow-[0_0_10px_rgba(99,102,241,0.3)]' },
                  { label: 'ATM Withdrawal', value: 'PKR 50,000', used: 'PKR 0', percent: 0, colorCls: 'bg-amber-500', textCls: 'text-amber-500', bgLight: 'bg-amber-50', shadowCls: 'shadow-[0_0_10px_rgba(245,158,11,0.3)]' },
                  { label: 'Online Payment', value: 'PKR 100,000', used: 'PKR 12,400', percent: 12, colorCls: 'bg-violet-500', textCls: 'text-violet-500', bgLight: 'bg-violet-50', shadowCls: 'shadow-[0_0_10px_rgba(139,92,246,0.3)]' }
                ].map((limit) => (
                  <div key={limit.label} className="group cursor-pointer">
                    <div className="flex justify-between items-end mb-2">
                       <div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">{limit.label}</span>
                         <span className="text-sm font-black text-secondary tracking-tight">{limit.used} <span className="text-slate-400 font-bold text-xs">/ {limit.value}</span></span>
                       </div>
                       <span className={`text-[10px] font-black ${limit.textCls} ${limit.bgLight} px-2 py-1 rounded-md uppercase tracking-widest`}>{limit.percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner flex items-center">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${limit.percent}%` }}
                        className={`h-full ${limit.colorCls} rounded-full ${limit.shadowCls} group-hover:scale-y-110 transition-transform`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 mt-2">
                 <button 
                   onClick={() => setShowLimits(false)}
                   className="w-full bg-secondary text-primary py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl hover:shadow-2xl"
                 >
                   Save & Apply Limits
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
