import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, CreditCard, RefreshCw, TrendingUp, CheckCircle, XCircle, Search, Filter, Plus } from 'lucide-react';
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
    <div className="min-h-screen pb-40 px-4 sm:px-8 md:px-12" style={{ paddingTop: '120px' }}>
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-fade-up">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-primary live-dot" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Digital Ledger</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tighter">
              History
            </h1>
            <p className="text-slate-500 font-bold text-sm mt-3">A complete record of your vault's activity and transactions.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <button onClick={refresh}
              className="h-12 px-6 rounded-xl bg-white border border-slate-100 flex items-center gap-2 font-black text-xs uppercase tracking-widest text-secondary hover:bg-slate-50 transition-all">
              <RefreshCw size={18} /> Sync
            </button>
            <button onClick={() => navigate('/checkout')}
              className="h-12 px-6 rounded-xl bg-primary flex items-center gap-2 font-black text-xs uppercase tracking-widest text-secondary shadow-lg hover:scale-105 active:scale-95 transition-all">
              <Plus size={18} /> New Entry
            </button>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-10">
          <div className="flex-1 max-w-xl group">
             <div className="relative">
                <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Filter by description or ID..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white rounded-xl border border-slate-50 shadow-sm shadow-slate-200/40 text-sm font-bold text-secondary placeholder-slate-300 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
            {FILTERS.map(({ key, label, Icon }) => (
              <button 
                key={key} 
                onClick={() => setFilter(key)}
                className={`h-12 px-6 rounded-xl flex items-center gap-3 transition-all duration-500 whitespace-nowrap ${
                  filter === key 
                    ? 'bg-secondary text-white shadow-md scale-105' 
                    : 'bg-white text-slate-400 border border-slate-50 hover:border-primary/20 hover:text-secondary'
                }`}
              >
                <Icon size={18} strokeWidth={3} className={filter === key ? 'text-primary' : ''} />
                <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black ${
                  filter === key ? 'bg-white/10 text-primary' : 'bg-slate-50 text-slate-400'
                }`}>
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {search && (
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">
            Refining by <span className="text-primary italic">"{search}"</span> — Found {filtered.length} matches
          </p>
        )}

        <div className="animate-fade-up">
           <TransactionTable transactions={filtered} />
        </div>

        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </div>
    </div>
  );
}
