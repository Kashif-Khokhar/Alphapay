import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, CreditCard, RefreshCw } from 'lucide-react';
import TransactionTable from '../components/TransactionTable';
import { getTransactions } from '../services/api';

const FILTERS = [
  { key: 'ALL',     label: 'All',        active: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25 is-active' },
  { key: 'SUCCESS', label: 'Successful', active: 'bg-teal-500/12 text-teal-400 border-teal-500/20 is-active' },
  { key: 'FAILED',  label: 'Failed',     active: 'bg-rose-500/12 text-rose-400 border-rose-500/20 is-active' },
];

export default function History() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(() => getTransactions());
  const [filter, setFilter] = useState('ALL');

  const refresh = () => setTransactions(getTransactions());

  const counts = {
    ALL:     transactions.length,
    SUCCESS: transactions.filter(t => t.status === 'SUCCESS').length,
    FAILED:  transactions.filter(t => t.status === 'FAILED').length,
  };

  const filtered = filter === 'ALL' ? transactions : transactions.filter(t => t.status === filter);

  return (
    <div className="min-h-screen bg-[#080808]" style={{ paddingTop: '64px' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'260px', pointerEvents:'none',
        background:'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 py-10 relative">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">History</p>
            <h1 className="text-3xl font-black text-slate-100 tracking-tight flex items-center gap-3">
              <HistoryIcon size={24} className="text-emerald-400" /> Transactions
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">All your past payments and their statuses.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/checkout')}
              className="btn-glow flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25">
              <CreditCard size={14} /> New Payment
            </button>
            <button onClick={refresh}
              className="btn-glow flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-300 font-semibold text-sm transition-colors">
              <RefreshCw size={14} className="transition-transform duration-500 hover:rotate-180" /> Refresh
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2.5 mb-6 flex-wrap animate-fade-up">
          {FILTERS.map(({ key, label, active }) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`filter-pill flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border
                ${filter===key ? active : 'bg-transparent text-slate-500 border-white/8 hover:border-white/20 hover:text-slate-300'}`}>
              {label}
              <span className={`min-w-[20px] h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${filter===key ? 'bg-white/15' : 'bg-white/6'}`}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        <div className="animate-fade-up">
          <TransactionTable transactions={filtered} />
        </div>
      </div>
    </div>
  );
}
