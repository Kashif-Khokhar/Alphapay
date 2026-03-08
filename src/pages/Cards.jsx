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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #fffbeb 100%)', paddingTop: '140px' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 pb-24">
        
        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 live-dot" />
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600">Your AlphaPay Wallet</p>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Virtual Card
          </h1>
          <p className="text-slate-500 text-sm mt-2">Manage your active card, view limits, and adjust security settings.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start justify-center">
          
          {/* Card Presentation */}
          <div className="animate-slide-up mx-auto md:mx-0">
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

          {/* Controls & Stats */}
          <div className="flex-1 w-full max-w-md animate-slide-left space-y-8">
            
            <div className={`bg-white rounded-[24px] p-6 shadow-sm border ${isFrozen ? 'border-rose-100' : 'border-slate-100'} flex items-center justify-between transition-colors duration-500`}>
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 ${isFrozen ? 'bg-rose-50 text-rose-500' : 'bg-teal-50 text-teal-600'} rounded-full flex items-center justify-center transition-colors`}>
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-800">Card Status</h3>
                    <p className={`text-[11px] font-bold tracking-widest uppercase ${isFrozen ? 'text-rose-500' : 'text-teal-500'} transition-colors`}>
                      {isFrozen ? 'Frozen & Locked' : 'Active & Secure'}
                    </p>
                 </div>
              </div>
              <div className={`h-3 w-3 ${isFrozen ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]' : 'bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.6)]'} rounded-full animate-pulse transition-all duration-500`} />
            </div>

            <div className="bg-white rounded-[24px] p-4 shadow-sm border border-slate-100 grid grid-cols-3 divide-x divide-slate-50">
               <button 
                 onClick={() => setIsFrozen(!isFrozen)}
                 className="flex flex-col items-center gap-2 p-4 group hover:bg-slate-50 transition-colors rounded-xl"
               >
                  <Snowflake size={20} className={`${isFrozen ? 'text-blue-500' : 'text-slate-400 group-hover:text-blue-500'} transition-colors`} />
                  <span className={`text-xs font-bold ${isFrozen ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                    {isFrozen ? 'Unfreeze' : 'Freeze'}
                  </span>
               </button>
               <button 
                  onClick={() => setIsRevealed(!isRevealed)}
                  className="flex flex-col items-center gap-2 p-4 group hover:bg-slate-50 transition-colors rounded-xl"
               >
                  {isRevealed ? (
                    <EyeOff size={20} className="text-teal-500" />
                  ) : (
                    <Eye size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                  )}
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">
                    {isRevealed ? "Hide Details" : "Show Details"}
                  </span>
               </button>
               <button 
                 onClick={() => setShowLimits(true)}
                 className="flex flex-col items-center gap-2 p-4 group hover:bg-slate-50 transition-colors rounded-xl"
               >
                  <Settings size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Limits</span>
               </button>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-4">Card Details</h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <span className="text-sm font-medium text-slate-500">Name on card</span>
                    <span className="text-sm font-bold text-slate-800 truncate max-w-[180px]">{user?.name}</span>
                 </div>
                 <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <span className="text-sm font-medium text-slate-500">Billing Address</span>
                    <span className="text-sm font-bold text-slate-800 truncate max-w-[150px]">Lahore, Pakistan</span>
                 </div>
                 <div className="flex justify-between items-center pb-2">
                    <span className="text-sm font-medium text-slate-500">Network</span>
                    <span className="text-xs font-black tracking-widest text-slate-800 bg-slate-100 px-3 py-1 rounded-full">VISA</span>
                 </div>
               </div>
            </div>

          </div>
        </div>

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
              className="relative w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl border border-white"
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
