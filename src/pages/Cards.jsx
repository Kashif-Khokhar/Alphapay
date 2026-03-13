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
    <div className="min-h-screen pb-40 px-4 sm:px-8 md:px-12" style={{ paddingTop: '120px' }}>
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Header */}
        <div className="mb-12 animate-fade-up">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-primary live-dot" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Secure Assets</p>
           </div>
           <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tighter">
              Virtual Cards
           </h1>
           <p className="text-slate-500 font-bold text-sm mt-3 max-w-lg">Manage your digital spending with surgical precision. Control limits, freeze instantly, and reveal details with a tap.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Card Presentation */}
          <div className="lg:col-span-7 xl:col-span-6 flex justify-center lg:block">
             <div className="w-full max-w-[500px] perspective-1000">
                <VirtualCard 
                   holderName={user?.name || "KASHIF ALI"} 
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
          <div className="lg:col-span-5 xl:col-span-6 space-y-6">
            
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

            <div className="grid grid-cols-3 gap-4">
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
               <h3 className="font-black text-secondary mb-6 text-sm uppercase tracking-widest text-slate-400">Card Metadata</h3>
               <div className="space-y-5">
                 <div className="flex justify-between items-center pb-5 border-b border-slate-50">
                    <span className="text-sm font-bold text-slate-400">Cardholder</span>
                    <span className="text-sm font-black text-secondary uppercase tracking-tight">{user?.name}</span>
                 </div>
                 <div className="flex justify-between items-center pb-5 border-b border-slate-50">
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
              className="relative w-full max-w-md bg-white rounded-[40px] p-12 shadow-2xl border border-white"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Card Limits</h2>
                <button 
                  onClick={() => setShowLimits(false)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Daily Purchase', value: 'PKR 150,000', used: 'PKR 12,400', percent: 8 },
                  { label: 'Monthly Limit', value: 'PKR 1,500,000', used: 'PKR 12,400', percent: 1 },
                  { label: 'ATM Withdrawal', value: 'PKR 50,000', used: 'PKR 0', percent: 0 },
                  { label: 'Online Payment', value: 'PKR 100,000', used: 'PKR 12,400', percent: 12 }
                ].map((limit) => (
                  <div key={limit.label} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">{limit.label}</span>
                      <span className="text-slate-800">{limit.used} / {limit.value}</span>
                    </div>
                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${limit.percent}%` }}
                        className="h-full bg-teal-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowLimits(false)}
                className="w-full mt-10 bg-slate-900 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
