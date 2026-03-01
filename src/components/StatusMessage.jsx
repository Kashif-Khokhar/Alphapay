import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, LayoutDashboard, RefreshCw, ArrowRight, Copy, Sparkles } from 'lucide-react';
import { useState } from 'react';

const CONFIG = {
  SUCCESS: {
    Icon: CheckCircle,
    title: 'Payment Successful!',
    subtitle: 'Your transaction has been processed.',
    ringBg: 'bg-emerald-100',
    ringBorder: 'border-emerald-300',
    textColor: 'text-emerald-600',
    badgeCls: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    glow: '0 0 40px rgba(16,185,129,0.15)',
    btnBg: 'linear-gradient(135deg, #059669, #10b981)',
    btnShadow: 'rgba(16,185,129,0.3)',
  },
  FAILED: {
    Icon: XCircle,
    title: 'Payment Failed',
    subtitle: 'Your transaction could not be processed.',
    ringBg: 'bg-rose-100',
    ringBorder: 'border-rose-300',
    textColor: 'text-rose-600',
    badgeCls: 'bg-rose-50 text-rose-700 border-rose-200',
    glow: '0 0 40px rgba(244,63,94,0.1)',
    btnBg: 'linear-gradient(135deg, #059669, #10b981)',
    btnShadow: 'rgba(16,185,129,0.3)',
  },
  PROCESSING: {
    Icon: Clock,
    title: 'Processing…',
    subtitle: 'Please wait while we process your payment.',
    ringBg: 'bg-amber-100',
    ringBorder: 'border-amber-300',
    textColor: 'text-amber-600',
    badgeCls: 'bg-amber-50 text-amber-700 border-amber-200',
    glow: '0 0 40px rgba(245,158,11,0.1)',
    btnBg: 'linear-gradient(135deg, #059669, #10b981)',
    btnShadow: 'rgba(16,185,129,0.3)',
  },
};

export default function StatusMessage({ transaction, onRetry }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  if (!transaction) return null;

  const cfg = CONFIG[transaction.status] || CONFIG.PROCESSING;
  const { Icon } = cfg;

  const copyId = () => {
    navigator.clipboard?.writeText(transaction.transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rows = [
    { label: 'Transaction ID', value: transaction.transactionId,                              mono: true,  copyable: true  },
    { label: 'Amount',         value: `PKR ${parseFloat(transaction.amount).toLocaleString()}`, mono: false, copyable: false },
    { label: 'Card',           value: transaction.cardNumber,                                  mono: true,  copyable: false },
    { label: 'Description',    value: transaction.description || 'University Fee Payment',     mono: false, copyable: false },
    { label: 'Date',           value: transaction.date,                                        mono: false, copyable: false },
  ];

  return (
    <div className="hover-card holo-card bg-white w-full max-w-lg mx-auto rounded-2xl p-8 flex flex-col items-center gap-6 animate-scale-in shadow-xl border border-slate-100"
      style={{ boxShadow: cfg.glow }}>

      {/* Status icon */}
      <div className="relative">
        <div className={`absolute inset-[-12px] rounded-full animate-pulse-glow opacity-30 ${cfg.ringBg} border ${cfg.ringBorder}`} />
        <div className={`animate-float w-24 h-24 rounded-full border-2 ${cfg.ringBorder} ${cfg.ringBg} ${cfg.textColor} flex items-center justify-center relative z-10`}>
          {transaction.status === 'PROCESSING'
            ? <Icon size={44} className="animate-spin-slow" strokeWidth={1.5} />
            : <Icon size={44} strokeWidth={1.5} />
          }
        </div>
        {transaction.status === 'SUCCESS' && (
          <Sparkles size={14} className="absolute -top-1 -right-1 text-amber-500 animate-float" style={{ animationDelay: '0.5s' }} />
        )}
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {cfg.title}
        </h2>
        <p className="text-slate-500 text-sm mt-1">{cfg.subtitle}</p>
        <span className={`badge-pop inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full text-xs font-bold border cursor-default ${cfg.badgeCls}`}>
          <Icon size={10} /> {transaction.status}
        </span>
      </div>

      {/* Details table */}
      <div className="w-full rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
        {rows.map(({ label, value, mono, copyable }, i) => (
          <div key={label} className={`tx-row flex justify-between items-center px-5 py-3.5 text-sm ${i !== rows.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <span className="text-slate-400 font-medium text-xs uppercase tracking-wide">{label}</span>
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-right max-w-[55%] truncate ${mono ? 'font-mono text-emerald-600 text-xs' : 'text-slate-700'}`}>{value}</span>
              {copyable && (
                <button onClick={copyId} className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200
                  ${copied ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}>
                  <Copy size={10} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 w-full justify-center">
        <button onClick={() => navigate('/dashboard')}
          className="btn-glow flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm"
          style={{ background: cfg.btnBg, boxShadow: `0 8px 20px ${cfg.btnShadow}` }}>
          <LayoutDashboard size={14} /> Dashboard
        </button>
        {transaction.status === 'FAILED' && onRetry && (
          <button onClick={onRetry}
            className="btn-glow flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 shadow-sm hover:border-slate-300">
            <RefreshCw size={14} /> Try Again
          </button>
        )}
        <button onClick={() => navigate('/history')}
          className="btn-glow flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-500 hover:text-emerald-600 font-bold text-sm bg-white border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors">
          History <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
