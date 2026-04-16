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
    btnBg: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    btnShadow: 'rgba(99,102,241,0.3)',

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
    btnBg: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    btnShadow: 'rgba(99,102,241,0.3)',

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
    btnBg: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    btnShadow: 'rgba(99,102,241,0.3)',

  },
};

export default function StatusMessage({ transaction, onRetry, onClose }) {
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
    { label: 'Card Number',    value: transaction.cardNumber,                                  mono: true,  copyable: false },
    { label: 'Description',    value: transaction.description || 'University Fee Payment',     mono: false, copyable: false },
    { label: 'Transaction Date', value: transaction.date,                                      mono: false, copyable: false },
  ];

  return (
    <div className="w-full animate-fade-down">
      <div className="glass-premium rounded-[32px] overflow-hidden border border-white/10 shadow-2xl relative">
        <div className="p-6 md:p-10 flex flex-col items-start gap-8">
          
          {/* Compact Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-6">
            <div className="flex items-center gap-5">
              <div className={`w-16 h-16 rounded-2xl border-2 ${cfg.ringBorder} ${cfg.ringBg} ${cfg.textColor} flex items-center justify-center relative flex-shrink-0 animate-scale-in`}>
                <Icon size={32} strokeWidth={1.5} className={transaction.status === 'PROCESSING' ? 'animate-spin-slow' : ''} />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-black text-white tracking-tight leading-tight">{cfg.title}</h2>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{cfg.subtitle}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className={`badge-pop inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[10px] font-black border cursor-default bg-white/5 ${cfg.textColor} border-white/10`}>
                <div className={`w-1.5 h-1.5 rounded-full ${transaction.status === 'SUCCESS' ? 'bg-emerald-500' : transaction.status === 'FAILED' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                {transaction.status}
              </span>
              <button 
                onClick={() => { navigate('/dashboard'); onClose?.(); }}
                className="btn-glow flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-white font-black text-[10px] uppercase tracking-widest"
                style={{ background: cfg.btnBg }}>
                <LayoutDashboard size={12} /> Dashboard
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* 2-Column Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full">
            {rows.map(({ label, value, mono, copyable }) => (
              <div key={label} className="group relative flex items-center justify-between animate-fade-up">
                <div className="space-y-1">
                  <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-black tracking-tight ${mono ? 'font-mono text-primary text-[11px]' : 'text-secondary text-sm'}`}>{value}</span>
                    {copyable && (
                      <button onClick={copyId} className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all
                        ${copied ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}>
                        {copied ? <CheckCircle size={10} /> : <Copy size={10} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Area with Action Close */}
          <div className="w-full flex justify-end pt-2">
             <button onClick={onClose} className="px-6 py-2 rounded-xl text-slate-400 font-bold text-[11px] uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all border border-white/5">
                Close Details
             </button>
          </div>
        </div>
        
        {/* Receipt Edge Styling */}
        <div className="h-1.5 w-full flex items-center justify-center gap-1 px-4 opacity-10">
           {Array.from({length: 40}).map((_, i) => (
             <div key={i} className="h-full w-4 bg-slate-300 rounded-full flex-shrink-0" />
           ))}
        </div>
      </div>
    </div>
  );
}

