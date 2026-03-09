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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #fffbeb 100%)', paddingTop: '100px' }}>
      <div className="relative z-10 w-full px-4 sm:px-6 py-8 pb-40">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Transaction History</p>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <HistoryIcon size={18} className="text-emerald-600" strokeWidth={2} />
              </div>
              Transactions
            </h1>
            <p className="text-slate-500 text-sm mt-2">All your past payments and their statuses.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={() => navigate('/checkout')}
              className="btn btn-primary">
              <CreditCard size={13} /> New Payment
            </button>
            <button onClick={refresh}
              className="btn btn-outline">
              <RefreshCw size={13} /> Refresh
            </button>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mb-6 animate-fade-up animate-delay-100">
          <div className="flex items-center gap-3 w-full sm:flex-1 sm:min-w-[200px] sm:max-w-sm px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
            <Search size={14} className="text-slate-400 flex-shrink-0" />
            <input type="text" placeholder="Search transactions…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none text-sm text-slate-700 placeholder-slate-400 outline-none" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <Filter size={13} className="text-slate-400 shrink-0" />
            {FILTERS.map(({ key, label, Icon, active }) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`filter-pill flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 whitespace-nowrap
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
