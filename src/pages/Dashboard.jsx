import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet, CreditCard, TrendingUp, Clock,
  ArrowRight, CheckCircle, XCircle, AlertCircle, Banknote, Activity, Zap, Star
} from 'lucide-react';
import { getCurrentUser, getTransactions } from '../services/api';

function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    const target = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, '')) || 0;
    if (target === 0) { setDisplay(0); return; }
    startRef.current = null;
    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const prog = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setDisplay(Math.round(eased * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);
  return <>{display.toLocaleString()}</>;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [transactions] = useState(() => getTransactions());
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const success    = transactions.filter(t => t.status === 'SUCCESS').length;
  const failed     = transactions.filter(t => t.status === 'FAILED').length;
  const totalSpent = transactions.filter(t => t.status === 'SUCCESS').reduce((s, t) => s + parseFloat(t.amount), 0);
  const recent     = transactions.slice(0, 5);

  const stats = [
    { label: 'Wallet Balance', value: parseFloat(user?.balance || 0), prefix: 'PKR ', Icon: Wallet,      bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-l-emerald-400', cardBg: 'bg-white',  change: '+2.4%', trend: 'up' },
    { label: 'Total Spent',    value: totalSpent,                      prefix: 'PKR ', Icon: TrendingUp,  bg: 'bg-amber-100',   text: 'text-amber-600',   border: 'border-l-amber-400',   cardBg: 'bg-white',  change: 'Semester', trend: 'neutral' },
    { label: 'Successful',     value: success,                         prefix: '',     Icon: CheckCircle, bg: 'bg-teal-100',    text: 'text-teal-600',    border: 'border-l-teal-400',    cardBg: 'bg-white',  change: success ? '100%' : 'None', trend: 'up' },
    { label: 'Failed',         value: failed,                          prefix: '',     Icon: XCircle,     bg: 'bg-rose-100',    text: 'text-rose-600',    border: 'border-l-rose-400',    cardBg: 'bg-white',  change: failed > 0 ? 'Review' : 'All clear!', trend: failed > 0 ? 'down' : 'up' },
  ];

  const quickActions = [
    { label: 'Pay Fee',  desc: 'Make a payment',  Icon: CreditCard,  onClick: () => navigate('/checkout'), active: true, gradient: 'from-emerald-50 to-teal-50',   border: 'border-emerald-200', text: 'text-emerald-700', iconBg: 'bg-emerald-100', iconClr: 'text-emerald-600' },
    { label: 'History',  desc: 'View all txns',   Icon: Clock,       onClick: () => navigate('/history'),  active: true, gradient: 'from-amber-50 to-orange-50',   border: 'border-amber-200',   text: 'text-amber-700',   iconBg: 'bg-amber-100',   iconClr: 'text-amber-600'   },
    { label: 'Reports',  desc: 'Analytics',        Icon: TrendingUp,  onClick: () => navigate('/reports'),  active: true, gradient: 'from-teal-50 to-cyan-50',     border: 'border-teal-200',    text: 'text-teal-700',    iconBg: 'bg-teal-100',    iconClr: 'text-teal-600'    },
    { label: 'Support',  desc: 'Get help',         Icon: AlertCircle, onClick: () => navigate('/support'),  active: true, gradient: 'from-rose-50 to-pink-50',     border: 'border-rose-200',    text: 'text-rose-700',    iconBg: 'bg-rose-100',    iconClr: 'text-rose-600'    },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #fffbeb 100%)', paddingTop: '64px' }}>
      {/* Subtle top glow */}
      <div className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 65%)', zIndex: 0 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20">

        {/* Header */}
        <div className={`flex flex-wrap items-end justify-between gap-4 mb-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Dashboard</p>
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Welcome back,&nbsp;<span className="gradient-text">{user?.name}!</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 flex items-center gap-2">
              <span>{user?.email}</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-600 font-semibold font-mono">{user?.studentId}</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">Active</span>
            </p>
          </div>
          <button onClick={() => navigate('/checkout')}
            className="btn-glow group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm text-white"
            style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 10px 28px rgba(16,185,129,0.35)' }}>
            <CreditCard size={16} className="transition-transform duration-300 group-hover:rotate-6" />
            Make Payment
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, prefix, Icon, bg, text, border, change, trend }, idx) => (
            <div key={label}
              className={`stat-card card-shine bg-white border border-l-4 ${border} rounded-2xl p-5 flex flex-col gap-3 cursor-default shadow-sm
                animate-fade-up animate-delay-${(idx + 1) * 100}`}>
              <div className="flex items-start justify-between">
                <div className={`stat-icon w-11 h-11 rounded-xl ${bg} ${text} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                  ${trend === 'up' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                    trend === 'down' ? 'text-rose-700 bg-rose-50 border-rose-200' :
                    'text-slate-500 bg-slate-100 border-slate-200'}`}>
                  {change}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                <p className={`text-xl font-black text-slate-800 leading-tight`}>
                  {prefix}<AnimatedNumber value={value} duration={1000 + idx * 200} />
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-100 shadow-sm animate-fade-up animate-delay-500">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-emerald-500" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Quick Actions</p>
            </div>
            <Star size={12} className="text-slate-300" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map(({ label, desc, Icon, onClick, active, gradient, border, text, iconBg, iconClr }) => (
              <button key={label} onClick={onClick} disabled={!active}
                className={`action-btn holo-card flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border font-semibold text-sm bg-gradient-to-br ${gradient} ${border} ${text}`}>
                <div className={`w-12 h-12 rounded-xl ${iconBg} ${iconClr} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold">{label}</p>
                  <p className="text-[10px] opacity-70 mt-0.5">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        {recent.length > 0 ? (
          <div className="animate-fade-up animate-delay-600">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-emerald-500" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Recent Transactions</p>
              </div>
              <button onClick={() => navigate('/history')}
                className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-bold transition-all duration-200 hover:gap-2.5">
                View all <ArrowRight size={12} />
              </button>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              {recent.map((tx, i) => (
                <div key={tx.transactionId}
                  className={`tx-row flex items-center gap-4 px-6 py-4 ${i !== recent.length - 1 ? 'border-b border-slate-50' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 transition-all duration-200 hover:scale-110">
                    <Banknote size={16} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{tx.description || 'University Fee Payment'}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{tx.transactionId} · {tx.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black text-slate-800">PKR {parseFloat(tx.amount).toLocaleString()}</p>
                    <span className={`badge-pop text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1 inline-block cursor-default border
                      ${tx.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        tx.status === 'FAILED'  ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="hover-card bg-white rounded-2xl p-16 text-center animate-scale-in border border-slate-100 shadow-sm">
            <div className="animate-float w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-5">
              <Banknote size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-slate-800 font-black text-lg mb-2">No Transactions Yet</h3>
            <p className="text-slate-500 text-sm mb-6">Make your first payment to see history here.</p>
            <button onClick={() => navigate('/checkout')}
              className="btn-glow inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 10px 24px rgba(16,185,129,0.3)' }}>
              <CreditCard size={15} strokeWidth={1.8} /> Make First Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
