import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet, CreditCard, TrendingUp, Clock,
  ArrowRight, CheckCircle, XCircle, AlertCircle, Banknote
} from 'lucide-react';
import { getCurrentUser, getTransactions } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [transactions] = useState(() => getTransactions());

  const success    = transactions.filter(t => t.status === 'SUCCESS').length;
  const failed     = transactions.filter(t => t.status === 'FAILED').length;
  const totalSpent = transactions.filter(t => t.status === 'SUCCESS').reduce((s, t) => s + parseFloat(t.amount), 0);
  const recent     = transactions.slice(0, 5);

  const stats = [
    { label: 'Wallet Balance', value: `PKR ${parseFloat(user?.balance || 0).toLocaleString()}`, Icon: Wallet,      bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-l-emerald-500' },
    { label: 'Total Spent',    value: `PKR ${totalSpent.toLocaleString()}`,                      Icon: TrendingUp,  bg: 'bg-amber-500/15',   text: 'text-amber-400',   border: 'border-l-amber-500' },
    { label: 'Successful',     value: success,                                                   Icon: CheckCircle, bg: 'bg-teal-500/15',    text: 'text-teal-400',    border: 'border-l-teal-500' },
    { label: 'Failed',         value: failed,                                                    Icon: XCircle,     bg: 'bg-rose-500/15',    text: 'text-rose-400',    border: 'border-l-rose-500' },
  ];

  const quickActions = [
    { label: 'Pay Fee',  Icon: CreditCard,  onClick: () => navigate('/checkout'), active: true, cls: 'bg-emerald-600/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30', iconBg: 'bg-emerald-500/20', iconClr: 'text-emerald-400' },
    { label: 'History',  Icon: Clock,       onClick: () => navigate('/history'),  active: true, cls: 'bg-amber-600/20  border-amber-500/30  text-amber-300  hover:bg-amber-600/30',   iconBg: 'bg-amber-500/20',   iconClr: 'text-amber-400'   },
    { label: 'Reports',  Icon: TrendingUp,  onClick: () => navigate('/reports'),  active: true, cls: 'bg-teal-600/20   border-teal-500/30   text-teal-300   hover:bg-teal-600/30',    iconBg: 'bg-teal-500/20',    iconClr: 'text-teal-400'    },
    { label: 'Support',  Icon: AlertCircle, onClick: () => navigate('/support'),  active: true, cls: 'bg-rose-600/20   border-rose-500/30   text-rose-300   hover:bg-rose-600/30',    iconBg: 'bg-rose-500/20',    iconClr: 'text-rose-400'    },
  ];

  return (
    <div className="min-h-screen bg-[#040d08]" style={{ paddingTop: '64px' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'360px', pointerEvents:'none',
        background:'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-16">

        {/* Header — always on top of animated cards below */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-10 animate-fade-up">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2">Dashboard</p>
            <h1 className="text-3xl font-black text-slate-100 tracking-tight leading-tight">
              Welcome back,&nbsp;<span className="gradient-text">{user?.name}!</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {user?.email}&nbsp;·&nbsp;<span className="text-emerald-400 font-semibold">{user?.studentId}</span>
            </p>
          </div>
          {/* Primary CTA */}
          <button onClick={() => navigate('/checkout')}
            className="btn-glow flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white
              bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/30">
            <CreditCard size={16} className="transition-transform duration-200 group-hover:rotate-12" />
            Make Payment
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Stat Cards — z-0 so they slide behind header on hover */}
        <div className="relative z-0 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, Icon, bg, text, border }) => (
            <div key={label}
              className={`stat-card bg-[#071a0f]/80 backdrop-blur-lg border border-white/8 border-l-2 ${border} rounded-2xl p-5 flex items-center gap-4 shadow-lg cursor-default`}>
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

        {/* Quick Actions — action-btn gives spring + radial glow */}
        <div className="hover-card bg-[#071a0f]/80 backdrop-blur-lg border border-white/8 rounded-2xl p-6 mb-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-5">Quick Actions</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map(({ label, Icon, onClick, active, cls, iconBg, iconClr }) => (
              <button key={label} onClick={onClick || undefined} disabled={!active}
                className={`action-btn flex flex-col items-center justify-center gap-3 p-5 rounded-xl border font-semibold text-sm ${cls}`}>
                <div className={`w-11 h-11 rounded-xl ${iconBg} ${iconClr} flex items-center justify-center transition-transform duration-300`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        {recent.length > 0 ? (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Recent Transactions</p>
              <button onClick={() => navigate('/history')}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-all duration-200 hover:gap-2">
                View all <ArrowRight size={12} />
              </button>
            </div>
            <div className="bg-[#071a0f]/80 backdrop-blur-lg border border-white/8 rounded-2xl overflow-hidden">
              {recent.map((tx, i) => (
                <div key={tx.transactionId}
                  className={`tx-row flex items-center gap-4 px-6 py-4 ${i !== recent.length-1 ? 'border-b border-white/5' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center text-emerald-400 flex-shrink-0 transition-transform duration-200 hover:scale-110">
                    <Banknote size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-200 truncate">{tx.description || 'University Fee Payment'}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">{tx.transactionId} · {tx.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-slate-100">PKR {parseFloat(tx.amount).toLocaleString()}</p>
                    <span className={`badge-pop text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block cursor-default
                      ${tx.status==='SUCCESS' ? 'bg-emerald-500/15 text-emerald-400' : tx.status==='FAILED' ? 'bg-rose-500/15 text-rose-400' : 'bg-amber-500/15 text-amber-400'}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="hover-card bg-[#071a0f]/80 backdrop-blur-lg border border-white/8 rounded-2xl p-12 text-center animate-scale-in">
            <div className="animate-float w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <Banknote size={24} />
            </div>
            <h3 className="text-slate-200 font-bold mb-1">No Transactions Yet</h3>
            <p className="text-slate-500 text-sm mb-5">Make your first payment to see history here.</p>
            <button onClick={() => navigate('/checkout')}
              className="btn-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25">
              <CreditCard size={14} /> Make First Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
