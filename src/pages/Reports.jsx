import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, CheckCircle, XCircle, Clock, Banknote, CreditCard, ArrowRight, BarChart2, Activity, Zap } from 'lucide-react';
import { getTransactions, getCurrentUser } from '../services/api';

function AnimatedBar({ pct, color, delay = 0 }) {
  return (
    <div className="h-2.5 rounded-full overflow-hidden bg-slate-100">
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #fffbeb 100%)', paddingTop: '100px' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-40">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-teal-500 live-dot" />
              <p className="text-xs font-bold uppercase tracking-widest text-teal-600">Analytics</p>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                <BarChart2 size={18} className="text-teal-600" strokeWidth={2} />
              </div>
              Payment Analytics
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {user?.name} · <span className="text-teal-600 font-semibold font-mono">{user?.studentId}</span>
            </p>
          </div>
          <button onClick={() => navigate('/checkout')}
            className="btn-glow flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 10px 24px rgba(16,185,129,0.3)' }}>
            <CreditCard size={15} /> Make Payment <ArrowRight size={13} />
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {statCards.map(({ label, value, Icon, bg, text, border }, i) => (
            <div key={label}
              className={`stat-card card-shine bg-white border border-l-4 ${border} rounded-2xl p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 cursor-default shadow-sm
                animate-fade-up animate-delay-${(i + 1) * 100}`}>
              <div className={`stat-icon w-9 h-9 sm:w-11 sm:h-11 rounded-xl ${bg} ${text} flex items-center justify-center`}>
                <Icon size={17} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                <p className="text-base sm:text-xl font-black text-slate-800 leading-tight break-all">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Status Breakdown */}
          <div className="hover-card holo-card bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-fade-up animate-delay-500">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <BarChart2 size={14} className="text-teal-600" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Status Breakdown</h2>
            </div>
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <div className="animate-float w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-3">
                  <BarChart2 size={18} />
                </div>
                <p className="text-slate-500 text-sm font-medium">No data yet</p>
                <p className="text-slate-400 text-xs mt-1">Make a payment to see analytics</p>
              </div>
            ) : (
              <div className="space-y-5">
                {breakdown.map(({ label, count, amount, Icon, color, bar, pct }, i) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-${color}-50 border border-${color}-200`}>
                        <Icon size={13} className={`text-${color}-600`} />
                        <span className="text-sm font-bold text-slate-700">{label}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-black text-${color}-700`}>{count} txns</span>
                        <span className="text-slate-300 mx-2">·</span>
                        <span className="text-xs text-slate-400">PKR {amount.toLocaleString()}</span>
                      </div>
                    </div>
                    <AnimatedBar pct={pct} color={bar} delay={i * 200} />
                    <div className="flex justify-between mt-1.5">
                      <p className="text-[10px] text-slate-400">{pct.toFixed(1)}% of total</p>
                      <p className="text-[10px] text-slate-400">{count}/{transactions.length}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="hover-card holo-card bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-fade-up animate-delay-600">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Activity size={14} className="text-emerald-600" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Recent Activity</h2>
            </div>
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <div className="animate-float w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                  <Zap size={18} />
                </div>
                <p className="text-slate-500 text-sm">No data yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.slice(0, 6).map((tx) => (
                  <div key={tx.transactionId} className="tx-row flex items-center gap-3 px-3 py-2.5 rounded-xl">
                    <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${tx.status === 'SUCCESS' ? 'bg-emerald-500' : tx.status === 'FAILED' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 truncate">{tx.description || 'University Fee'}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{tx.transactionId}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-black text-slate-800">PKR {parseFloat(tx.amount).toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400">{tx.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => navigate('/history')}
              className="mt-4 w-full flex items-center justify-center gap-2 text-xs text-teal-600 hover:text-teal-700 font-bold py-2.5 rounded-xl hover:bg-teal-50 border border-teal-100 transition-all">
              View Full History <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up">
          {[
            { label: 'Make a Payment', sub: 'Pay your university fees securely', Icon: CreditCard, bg: 'bg-emerald-100', text: 'text-emerald-600', to: '/checkout' },
            { label: 'Transaction History', sub: 'View all past payments and statuses', Icon: Banknote, bg: 'bg-amber-100', text: 'text-amber-600', to: '/history' },
          ].map(({ label, sub, Icon, bg, text, to }) => (
            <button key={label} onClick={() => navigate(to)}
              className="btn-glow hover-card holo-card bg-white rounded-2xl p-5 flex items-center gap-4 text-left border border-slate-100 shadow-sm">
              <div className={`w-12 h-12 rounded-xl ${bg} ${text} flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
              </div>
              <ArrowRight size={16} className="text-slate-400 flex-shrink-0" />
            </button>
          ))}
        </div>
        
        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </div>
    </div>
  );
}
