import { useState } from 'react';
import { Lock, ShieldCheck, CreditCard as CardIcon, Sparkles, Zap } from 'lucide-react';
import PaymentForm from '../components/PaymentForm';
import StatusMessage from '../components/StatusMessage';
import { makePayment } from '../services/api';

const FEE_ITEMS = [
  { label: 'Semester Fee', amount: 'PKR 35,000', color: 'text-emerald-700' },
  { label: 'Lab Fee',      amount: 'PKR 5,000',  color: 'text-teal-700'    },
  { label: 'Exam Fee',     amount: 'PKR 3,500',  color: 'text-amber-700'   },
  { label: 'Library Fee',  amount: 'PKR 1,200',  color: 'text-cyan-700'    },
];

export default function Checkout() {
  const [status, setStatus]           = useState('idle');
  const [transaction, setTransaction] = useState(null);

  const handleSubmit = async (formData) => {
    setStatus('loading');
    const result = await makePayment(formData);
    setTransaction(result);
    setStatus('done');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #fffbeb 100%)', paddingTop: '64px' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-9 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Secure Checkout</p>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-100">
              <Lock size={20} className="text-emerald-600" strokeWidth={2} />
            </div>
            Secure Payment
          </h1>
          <p className="text-slate-500 text-sm mt-2 ml-14">All transactions are fully simulated — no real charges.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="animate-slide-left">
            {status === 'done'
              ? <StatusMessage transaction={transaction} onRetry={() => { setTransaction(null); setStatus('idle'); }} />
              : <PaymentForm onSubmit={handleSubmit} isLoading={status === 'loading'} />
            }
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4 animate-slide-right">
            {/* Safety */}
            <div className="sidebar-card bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="animate-float w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <ShieldCheck size={19} className="text-emerald-600" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Payment Safety</h3>
                  <p className="text-[10px] text-emerald-600 font-semibold">Bank-grade security</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { emoji: '🔒', text: '256-bit SSL encryption' },
                  { emoji: '🏦', text: 'PCI-DSS compliant' },
                  { emoji: '⚡', text: 'Instant status update' },
                  { emoji: '📋', text: 'Auto-saved to history' },
                  { emoji: '🔄', text: 'Retry on failure' },
                ].map(({ emoji, text }) => (
                  <div key={text} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                    <span className="text-sm">{emoji}</span>
                    <span className="text-xs text-slate-500">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div className="sidebar-card bg-white rounded-2xl p-5 border border-amber-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                  <CardIcon size={19} className="text-amber-600" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Accepted Cards</h3>
                  <p className="text-[10px] text-amber-600 font-semibold">All major networks</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { name: 'VISA', cls: 'text-blue-700 border-blue-200 bg-blue-50' },
                  { name: 'MC',   cls: 'text-orange-700 border-orange-200 bg-orange-50' },
                  { name: 'AMEX', cls: 'text-sky-700 border-sky-200 bg-sky-50' },
                ].map(({ name, cls }) => (
                  <span key={name} className={`badge-pop px-3 py-1.5 rounded-xl text-[11px] font-black tracking-widest cursor-default border ${cls}`}>{name}</span>
                ))}
              </div>
            </div>

            {/* Fee schedule */}
            <div className="sidebar-card bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-teal-500" />
                <h3 className="text-sm font-bold text-slate-800">University Fee Schedule</h3>
              </div>
              {FEE_ITEMS.map(({ label, amount, color }, i) => (
                <div key={label} className={`tx-row flex justify-between items-center px-1 py-3 text-xs ${i !== FEE_ITEMS.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <span className="text-slate-500">{label}</span>
                  <span className={`font-black ${color}`}>{amount}</span>
                </div>
              ))}
              <div className="flex justify-between items-center px-1 pt-3 text-xs border-t border-slate-100 mt-1">
                <span className="text-slate-700 font-bold">Total</span>
                <span className="text-slate-900 font-black text-sm">PKR 44,700</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <Zap size={12} className="text-emerald-500" />
              <p className="text-[11px] text-emerald-600 font-medium">Powered by AlphaPay Secure™</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
