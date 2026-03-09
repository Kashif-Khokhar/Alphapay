import { ShieldCheck, Send, Zap, User } from 'lucide-react';
import SendMoneyFlow from '../components/SendMoneyFlow';

export default function Checkout() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #fffbeb 100%)', paddingTop: '140px' }}>
      <div className="relative z-10 w-full px-6 py-10 pb-24">
        {/* Header */}
        <div className="mb-9 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 live-dot" />
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600">AlphaPay Transfer</p>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-teal-100">
              <Send size={20} className="text-teal-600 ml-1" strokeWidth={2.5} />
            </div>
            Send Money
          </h1>
          <p className="text-slate-500 text-sm mt-2 ml-0 md:ml-14">Instantly transfer funds to any bank account in Pakistan.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="animate-slide-left">
            <SendMoneyFlow />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4 animate-slide-right">
            {/* Recent Payees */}
            <div className="sidebar-card bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl -mr-10 -mt-10" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <User size={16} className="text-teal-500" /> Recent Payees
                </h3>
              </div>
              
              <div className="space-y-3 relative z-10">
                {[
                  { name: 'Rohan Ali', bank: 'SadaPay', initial: 'R', color: 'bg-teal-100 text-teal-700' },
                  { name: 'Kashif Khokhar', bank: 'Meezan Bank', initial: 'K', color: 'bg-purple-100 text-purple-700' },
                  { name: 'Ali Hamza', bank: 'HBL', initial: 'A', color: 'bg-emerald-100 text-emerald-700' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm ${p.color}`}>
                        {p.initial}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{p.bank}</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Send size={10} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Limits */}
            <div className="sidebar-card bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <ShieldCheck size={19} className="text-orange-500" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Transfer Limits</h3>
                  <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Verified Account</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs text-slate-500 font-medium">Daily Limit</span>
                    <span className="text-xs font-black text-slate-800">PKR 400,000</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full w-[15%]" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">PKR 60,000 spent today</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs text-slate-500 font-medium">Monthly Limit</span>
                    <span className="text-xs font-black text-slate-800">PKR 1,000,000</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full w-[45%]" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">PKR 450,000 spent this month</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-50 border border-teal-100 mt-2">
              <Zap size={12} className="text-teal-500" />
              <p className="text-[11px] text-teal-600 font-bold tracking-wide">Zero transfer fees across network</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
