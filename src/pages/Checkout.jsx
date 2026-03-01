import { useState } from 'react';
import { Lock, ShieldCheck, CreditCard as CardIcon } from 'lucide-react';
import PaymentForm from '../components/PaymentForm';
import StatusMessage from '../components/StatusMessage';
import { makePayment } from '../services/api';

const FEE_ITEMS = [
  { label: 'Semester Fee', amount: 'PKR 35,000' },
  { label: 'Lab Fee',      amount: 'PKR 5,000' },
  { label: 'Exam Fee',     amount: 'PKR 3,500' },
  { label: 'Library Fee',  amount: 'PKR 1,200' },
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
    <div className="min-h-screen bg-[#080808]" style={{ paddingTop: '64px' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'300px', pointerEvents:'none',
        background:'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(16,185,129,0.09) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 py-10 relative">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">Checkout</p>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight flex items-center gap-3">
            <Lock size={24} className="text-emerald-400" /> Secure Payment
          </h1>
          <p className="text-slate-500 text-sm mt-1.5">All transactions are fully simulated — no real charges.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8 items-start">
          {/* Main */}
          <div>
            {status === 'done'
              ? <StatusMessage transaction={transaction} onRetry={() => { setTransaction(null); setStatus('idle'); }} />
              : <PaymentForm onSubmit={handleSubmit} isLoading={status === 'loading'} />
            }
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="sidebar-card bg-[#111111] border border-white/8 rounded-2xl p-5">
              <div className="animate-float w-10 h-10 rounded-xl bg-emerald-500/12 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-200 mb-3">Payment Safety</h3>
              <ul className="space-y-2">
                {['🔒 256-bit SSL encryption','🏦 PCI-DSS compliant simulation','⚡ Instant status update','📋 Auto-saved to history','🔄 Retry on failure'].map(i => (
                  <li key={i} className="text-xs text-slate-400 hover:text-slate-300 transition-colors cursor-default">{i}</li>
                ))}
              </ul>
            </div>

            <div className="sidebar-card bg-[#111111] border border-white/8 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/12 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 transition-transform duration-300 hover:rotate-12">
                <CardIcon size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-200 mb-3">Accepted Cards</h3>
              <div className="flex gap-2 flex-wrap">
                {['VISA','MASTERCARD','AMEX'].map(c => (
                  <span key={c} className="badge-pop px-2.5 py-1 bg-white/4 border border-white/8 rounded-lg text-[11px] font-bold text-slate-400 tracking-widest cursor-default">{c}</span>
                ))}
              </div>
            </div>

            <div className="sidebar-card bg-[#111111] border border-white/8 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-200 mb-3">University Fee Schedule</h3>
              <div className="space-y-2.5">
                {FEE_ITEMS.map(({ label, amount }) => (
                  <div key={label} className="tx-row flex justify-between items-center text-xs border-b border-white/5 pb-2.5 last:border-0 last:pb-0 px-1 rounded">
                    <span className="text-slate-400">{label}</span>
                    <span className="font-bold text-slate-200">{amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
