import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, LayoutDashboard, RefreshCw, ArrowRight } from 'lucide-react';

const CONFIG = {
  SUCCESS: {
    Icon: CheckCircle, title: 'Payment Successful!', subtitle: 'Your transaction has been processed.',
    ring: 'text-emerald-400 border-emerald-400/35 bg-emerald-400/6 shadow-[0_0_45px_rgba(52,211,153,0.2)]',
    badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    btn: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
  },
  FAILED: {
    Icon: XCircle, title: 'Payment Failed', subtitle: 'Your transaction could not be processed.',
    ring: 'text-rose-400 border-rose-400/35 bg-rose-400/6 shadow-[0_0_45px_rgba(251,113,133,0.2)]',
    badge: 'bg-rose-400/10 text-rose-400 border-rose-400/20',
    btn: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
  },
  PROCESSING: {
    Icon: Clock, title: 'Processing…', subtitle: 'Please wait while we process your payment.',
    ring: 'text-amber-400 border-amber-400/35 bg-amber-400/6 shadow-[0_0_45px_rgba(251,191,36,0.2)]',
    badge: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
    btn: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
  },
};

export default function StatusMessage({ transaction, onRetry }) {
  const navigate = useNavigate();
  if (!transaction) return null;
  const cfg = CONFIG[transaction.status] || CONFIG.PROCESSING;
  const { Icon } = cfg;

  const rows = [
    { label: 'Transaction ID', value: transaction.transactionId,                              mono: true  },
    { label: 'Amount',         value: `PKR ${parseFloat(transaction.amount).toLocaleString()}`, mono: false },
    { label: 'Card',           value: transaction.cardNumber,                                  mono: true  },
    { label: 'Description',    value: transaction.description || 'University Fee Payment',     mono: false },
    { label: 'Date',           value: transaction.date,                                        mono: false },
  ];

  return (
    <div className="hover-card w-full max-w-lg mx-auto bg-[#111111] border border-white/8 rounded-2xl p-8 flex flex-col items-center gap-6 animate-scale-in shadow-2xl">

      {/* Floating icon ring */}
      <div className={`animate-float w-24 h-24 rounded-full border-2 flex items-center justify-center ${cfg.ring}`}>
        <Icon size={42} />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-100 tracking-tight">{cfg.title}</h2>
        <p className="text-slate-400 text-sm mt-1">{cfg.subtitle}</p>
        <span className={`badge-pop inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold border cursor-default ${cfg.badge}`}>
          <Icon size={10} /> {transaction.status}
        </span>
      </div>

      {/* Details table */}
      <div className="w-full bg-white/3 border border-white/6 rounded-xl overflow-hidden">
        {rows.map(({ label, value, mono }, i) => (
          <div key={label} className={`tx-row flex justify-between items-center px-5 py-3 text-sm ${i !== rows.length-1 ? 'border-b border-white/5' : ''}`}>
            <span className="text-slate-400 font-medium">{label}</span>
            <span className={`font-semibold text-right max-w-[55%] truncate ${mono ? 'font-mono text-emerald-400 text-xs' : 'text-slate-100'}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 w-full justify-center">
        <button onClick={() => navigate('/dashboard')}
          className={`btn-glow flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${cfg.btn} text-white font-semibold text-sm shadow-lg shadow-emerald-500/25`}>
          <LayoutDashboard size={14} /> Dashboard
        </button>
        {transaction.status === 'FAILED' && onRetry && (
          <button onClick={onRetry}
            className="btn-glow flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-emerald-500/30 text-slate-300 font-semibold text-sm">
            <RefreshCw size={14} /> Try Again
          </button>
        )}
        <button onClick={() => navigate('/history')}
          className="btn-glow flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/8 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-300 font-semibold text-sm">
          History <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
