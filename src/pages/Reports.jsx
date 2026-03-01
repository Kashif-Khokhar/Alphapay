import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, CheckCircle, XCircle, Clock,
  Banknote, CreditCard, ArrowRight, BarChart2, PieChart, Activity
} from 'lucide-react';
import { getTransactions, getCurrentUser } from '../services/api';

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
    { label: 'Total Transactions', value: transactions.length, Icon: Activity,     bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-l-emerald-500' },
    { label: 'Total Spent',        value: `PKR ${totalSpent.toLocaleString()}`, Icon: Banknote,     bg: 'bg-amber-500/15',   text: 'text-amber-400',   border: 'border-l-amber-500' },
    { label: 'Success Rate',       value: `${successRate}%`, Icon: TrendingUp,   bg: 'bg-teal-500/15',    text: 'text-teal-400',    border: 'border-l-teal-500' },
    { label: 'Avg. Payment',       value: `PKR ${avgTx.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, Icon: BarChart2,    bg: 'bg-rose-500/15',    text: 'text-rose-400',    border: 'border-l-rose-500' },
  ];

  const breakdown = [
    { label: 'Successful', count: success.length,    amount: totalSpent,                                                                Icon: CheckCircle, color: 'emerald', bar: 'bg-emerald-500', pct: transactions.length ? (success.length / transactions.length * 100) : 0 },
    { label: 'Failed',     count: failed.length,     amount: failed.reduce((s,t) => s + parseFloat(t.amount), 0),                     Icon: XCircle,     color: 'rose',    bar: 'bg-rose-500',    pct: transactions.length ? (failed.length / transactions.length * 100) : 0 },
    { label: 'Processing', count: processing.length, amount: processing.reduce((s,t) => s + parseFloat(t.amount), 0),                 Icon: Clock,       color: 'amber',   bar: 'bg-amber-500',   pct: transactions.length ? (processing.length / transactions.length * 100) : 0 },
  ];

  return (
    <div className="min-h-screen bg-[#080808]" style={{ paddingTop: '64px' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'320px', pointerEvents:'none',
        background:'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(20,184,166,0.09) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-16">

        {/* Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-10 animate-fade-up">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-2">Reports</p>
            <h1 className="text-3xl font-black text-slate-100 tracking-tight leading-tight flex items-center gap-3">
              <BarChart2 size={28} className="text-teal-400" />
              Payment Analytics
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {user?.name} · <span className="text-teal-400 font-semibold">{user?.studentId}</span>
            </p>
          </div>
          <button onClick={() => navigate('/checkout')}
            className="btn-glow flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/30">
            <CreditCard size={16} /> Make Payment <ArrowRight size={14} />
          </button>
        </div>

        {/* Stat Cards */}
        <div className="relative z-0 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, Icon, bg, text, border }) => (
            <div key={label} className={`stat-card bg-[#111111] border border-white/8 border-l-2 ${border} rounded-2xl p-5 flex items-center gap-4 shadow-lg cursor-default`}>
              <div className={`stat-icon w-11 h-11 rounded-xl ${bg} ${text} flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">{label}</p>
                <p className="text-lg font-black text-slate-100 truncate leading-tight">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Status Breakdown */}
          <div className="hover-card bg-[#111111] border border-white/8 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <PieChart size={16} className="text-teal-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Status Breakdown</h2>
            </div>
            <div className="space-y-5">
              {breakdown.map(({ label, count, amount, Icon, color, bar, pct }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={`text-${color}-400`} />
                      <span className="text-sm font-semibold text-slate-300">{label}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold text-${color}-400`}>{count} txn</span>
                      <span className="text-slate-600 mx-1.5">·</span>
                      <span className="text-xs text-slate-400">PKR {amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${bar} rounded-full transition-all duration-1000`}
                      style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-600 mt-1">{pct.toFixed(1)}% of total</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payment Summary */}
          <div className="hover-card bg-[#111111] border border-white/8 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={16} className="text-emerald-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Recent Activity</h2>
            </div>
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <div className="animate-float w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-3">
                  <BarChart2 size={20} />
                </div>
                <p className="text-slate-400 text-sm font-medium">No data yet</p>
                <p className="text-slate-600 text-xs mt-1">Make a payment to see analytics</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.slice(0, 6).map((tx) => (
                  <div key={tx.transactionId} className="tx-row flex items-center gap-3 px-3 py-2.5 rounded-xl">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${tx.status==='SUCCESS' ? 'bg-emerald-400' : tx.status==='FAILED' ? 'bg-rose-400' : 'bg-amber-400'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-300 truncate">{tx.description || 'University Fee'}</p>
                      <p className="text-[10px] text-slate-600 font-mono">{tx.transactionId}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-slate-200">PKR {parseFloat(tx.amount).toLocaleString()}</p>
                      <p className="text-[10px] text-slate-600">{tx.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => navigate('/history')}
              className="mt-5 w-full flex items-center justify-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold transition-all duration-200 py-2 border border-white/6 hover:border-teal-500/25 rounded-xl">
              View Full History <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={() => navigate('/checkout')}
            className="btn-glow hover-card bg-[#111111] border border-white/8 rounded-2xl p-5 flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CreditCard size={22} />
            </div>
            <div>
              <p className="font-bold text-slate-200">Make a Payment</p>
              <p className="text-xs text-slate-500 mt-0.5">Pay your university fees securely</p>
            </div>
            <ArrowRight size={16} className="text-slate-600 ml-auto" />
          </button>
          <button onClick={() => navigate('/history')}
            className="btn-glow hover-card bg-[#111111] border border-white/8 rounded-2xl p-5 flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Banknote size={22} />
            </div>
            <div>
              <p className="font-bold text-slate-200">Transaction History</p>
              <p className="text-xs text-slate-500 mt-0.5">View all past payments</p>
            </div>
            <ArrowRight size={16} className="text-slate-600 ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
