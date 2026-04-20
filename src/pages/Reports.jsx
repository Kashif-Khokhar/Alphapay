import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, XCircle, Clock, Banknote, CreditCard, ArrowRight, BarChart2, Activity, Zap } from 'lucide-react';
import { getTransactions, getCurrentUser } from '../services/api';

function AnimatedBar({ pct, color, delay = 0 }) {
  return (
    <div className="h-2.5 rounded-full overflow-hidden bg-white/10">
      <div className={`h-full ${color} rounded-full animate-bar-grow relative overflow-hidden`}
        style={{ width: `${Math.max(pct, 0)}%`, animationDelay: `${delay}ms` }}>
        <div className="progress-stripes absolute inset-0 opacity-30" />
      </div>
    </div>
  );
}

export default function Reports() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [transactions] = useState(() => getTransactions());

  const success    = transactions.filter(t => t.status === 'SUCCESS');
  const failed     = transactions.filter(t => t.status === 'FAILED');
  const processing = transactions.filter(t => t.status === 'PROCESSING');
  const totalSpent = success.reduce((s, t) => s + parseFloat(t.amount), 0);
  const avgTx      = success.length ? (totalSpent / success.length) : 0;
  const successRate = transactions.length ? ((success.length / transactions.length) * 100).toFixed(1) : '0.0';

  const statCards = [
    { label: 'Total Transactions', value: transactions.length,  Icon: Activity,   bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-l-emerald-400' },
    { label: 'Total Spent',        value: `PKR ${totalSpent.toLocaleString()}`, Icon: Banknote,  bg: 'bg-amber-100',   text: 'text-amber-600',   border: 'border-l-amber-400'   },
    { label: 'Success Rate',       value: `${successRate}%`,    Icon: TrendingUp, bg: 'bg-teal-100',    text: 'text-teal-600',    border: 'border-l-teal-400'    },
    { label: 'Avg. Payment',       value: `PKR ${avgTx.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, Icon: BarChart2, bg: 'bg-violet-100', text: 'text-violet-600', border: 'border-l-violet-400' },
  ];

  const breakdown = [
    { label: 'Successful', count: success.length,    amount: totalSpent, Icon: CheckCircle, color: 'emerald', bar: 'bg-gradient-to-r from-emerald-400 to-teal-400', pct: transactions.length ? (success.length / transactions.length * 100) : 0 },
    { label: 'Failed',     count: failed.length,     amount: failed.reduce((s, t) => s + parseFloat(t.amount), 0),    Icon: XCircle, color: 'rose', bar: 'bg-gradient-to-r from-rose-400 to-pink-400', pct: transactions.length ? (failed.length / transactions.length * 100) : 0 },
    { label: 'Processing', count: processing.length, amount: processing.reduce((s, t) => s + parseFloat(t.amount), 0), Icon: Clock, color: 'amber', bar: 'bg-gradient-to-r from-amber-400 to-orange-400', pct: transactions.length ? (processing.length / transactions.length * 100) : 0 },
  ];

  return (
    <div className="min-h-screen pb-40 px-4 sm:px-8 md:px-12" style={{ paddingTop: '120px' }}>
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-fade-up">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-primary live-dot" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Transaction History</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tighter">
              History
            </h1>
            <p className="text-slate-300 font-bold text-sm mt-3">Search and view all your past transactions here.</p>
          </div>
           <button onClick={() => navigate('/checkout')}
             className="h-12 px-6 rounded-xl bg-primary text-white flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">
             <CreditCard size={18} /> Send Money
           </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map(({ label, value, Icon, text }, i) => (
            <div key={label}
              className="premium-card flex flex-col gap-6 animate-fade-up"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}>
              <div className={`w-14 h-14 rounded-2xl bg-white/5 ${text} flex items-center justify-center`}>
                <Icon size={24} strokeWidth={3} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">{label}</p>
                <p className="text-2xl font-black text-secondary tracking-tighter">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Status Breakdown */}
          <div className="premium-card p-6 animate-fade-up">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <BarChart2 size={24} strokeWidth={3} />
              </div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Payment Summary</h2>
            </div>
            {transactions.length === 0 ? (
              <div className="text-center py-20">
                <BarChart2 size={40} className="mx-auto text-slate-100 mb-4" />
                <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">No transaction data available</p>
              </div>
            ) : (
              <div className="space-y-8">
                {breakdown.map(({ label, count, amount, Icon, color, pct }, i) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Icon size={18} className={`text-${color}-500`} strokeWidth={3} />
                        <span className="text-xs font-black text-secondary uppercase tracking-widest">{label}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-secondary tracking-tighter">PKR {amount.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${pct}%` }}
                         transition={{ duration: 1, delay: i * 0.2 }}
                         className={`h-full bg-${color}-500 rounded-full`}
                       />
                    </div>
                    <div className="flex justify-between mt-3">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{pct.toFixed(1)}% weight</p>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{count} txns</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity Mini */}
          <div className="premium-card p-6 animate-fade-up">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-white">
                <Activity size={24} strokeWidth={3} />
              </div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Recent Transactions</h2>
            </div>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((tx) => (
                <div key={tx.transactionId} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:bg-slate-50/50 transition-all group">
                   <div className="flex items-center gap-5">
                      <div className={`w-3 h-3 rounded-full ${tx.status === 'SUCCESS' ? 'bg-primary' : 'bg-rose-500'} animate-pulse`} />
                      <div>
                         <p className="text-xs font-black text-secondary uppercase tracking-tight truncate max-w-[150px]">{tx.description || 'Entry'}</p>
                         <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-1">{tx.date}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-black text-secondary tracking-tighter">PKR {parseFloat(tx.amount).toLocaleString()}</p>
                   </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/history')}
              className="mt-8 w-full h-14 rounded-2xl border border-white/10 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-secondary hover:bg-white/5 transition-all">
              View All History
            </button>
          </div>
        </div>
        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 mb-8 animate-fade-up">
          {[
            { label: 'Send Money', sub: 'Transfer funds to any account', Icon: CreditCard, to: '/checkout' },
            { label: 'View History', sub: 'See all your past transactions', Icon: Banknote, to: '/history' },
          ].map(({ label, sub, Icon, to }) => (
            <button key={label} onClick={() => navigate(to)}
              className="premium-card flex items-center gap-8 text-left group">
              <div className="w-16 h-16 rounded-3xl bg-white/5 text-secondary flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary">
                <Icon size={24} strokeWidth={3} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-secondary tracking-widest uppercase">{label}</p>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{sub}</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-slate-200 group-hover:text-primary group-hover:border-primary/20 transition-all">
                <ArrowRight size={20} strokeWidth={3} />
              </div>
            </button>
          ))}
        </div>

        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </div>
    </div>
  );
}

