import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, CreditCard, RefreshCw, TrendingUp, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import TransactionTable from '../components/TransactionTable';
import { getTransactions } from '../services/api';

const FILTERS = [
  { key: 'ALL',     label: 'All',        Icon: TrendingUp,  active: 'bg-emerald-100 text-emerald-700 border-emerald-300 is-active' },
  { key: 'SUCCESS', label: 'Successful', Icon: CheckCircle, active: 'bg-teal-100 text-teal-700 border-teal-300 is-active' },
  { key: 'FAILED',  label: 'Failed',     Icon: XCircle,     active: 'bg-rose-100 text-rose-700 border-rose-300 is-active' },
];

export default function History() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(() => getTransactions());
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const refresh = () => setTransactions(getTransactions());

  const counts = {
    ALL:     transactions.length,
    SUCCESS: transactions.filter(t => t.status === 'SUCCESS').length,
    FAILED:  transactions.filter(t => t.status === 'FAILED').length,
  };

  const filtered = (filter === 'ALL' ? transactions : transactions.filter(t => t.status === filter))
    .filter(t => !search || t.transactionId?.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #fffbeb 100%)', paddingTop: '140px' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Transaction History</p>
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                <HistoryIcon size={20} className="text-emerald-600" strokeWidth={2} />
              </div>
              Transactions
            </h1>
            <p className="text-slate-500 text-sm mt-2 ml-0 md:ml-14">All your past payments and their statuses.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/checkout')}
              className="btn-glow flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 8px 22px rgba(16,185,129,0.3)' }}>
              <CreditCard size={14} /> New Payment
            </button>
            <button onClick={refresh}
              className="btn-glow flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 hover:text-emerald-700 bg-white border border-slate-200 shadow-sm transition-colors">
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-up animate-delay-100">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input type="text" placeholder="Search by ID or description…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="glow-input w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none shadow-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-slate-400" />
            {FILTERS.map(({ key, label, Icon, active }) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`filter-pill flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200
                  ${filter === key ? active : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700 shadow-sm'}`}>
                <Icon size={11} />
                {label}
                <span className={`min-w-[20px] h-5 flex items-center justify-center rounded-full text-[10px] font-black
                  ${filter === key ? 'bg-white/60' : 'bg-slate-100'}`}>
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {search && (
          <p className="text-xs text-slate-400 mb-4 animate-fade-in">
            Showing <span className="text-slate-700 font-bold">{filtered.length}</span> results for
            <span className="text-emerald-600 font-bold"> "{search}"</span>
          </p>
        )}

        <div className="animate-fade-up animate-delay-200">
          <TransactionTable transactions={filtered} />
        </div>
      </div>
    </div>
  );
}
