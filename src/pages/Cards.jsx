import { useState } from 'react';
import { ShieldCheck, Snowflake, Eye, EyeOff, Settings } from 'lucide-react';
import VirtualCard from '../components/VirtualCard';
import { getCurrentUser } from '../services/api';

export default function Cards() {
  const user = getCurrentUser();
  const [isRevealed, setIsRevealed] = useState(false);

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
                onToggle={() => setIsRevealed(!isRevealed)}
             />
          </div>

          {/* Controls & Stats */}
          <div className="flex-1 w-full max-w-md animate-slide-left space-y-6">
            
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-800">Card Status</h3>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-teal-500">Active & Secure</p>
                 </div>
              </div>
              <div className="h-3 w-3 bg-teal-500 rounded-full shadow-[0_0_12px_rgba(20,184,166,0.6)] animate-pulse" />
            </div>

            <div className="bg-white rounded-[24px] p-2 shadow-sm border border-slate-100 grid grid-cols-3 divide-x divide-slate-50">
               <button className="flex flex-col items-center gap-2 p-4 group hover:bg-slate-50 transition-colors rounded-xl">
                  <Snowflake size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Freeze</span>
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
               <button className="flex flex-col items-center gap-2 p-4 group hover:bg-slate-50 transition-colors rounded-xl">
                  <Settings size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Limits</span>
               </button>
            </div>

            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
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
    </div>
  );
}
