import { CheckCircle, XCircle, Clock, ArrowUpDown } from 'lucide-react';

const STATUS = {
  SUCCESS:    { badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', dot: 'bg-emerald-400', Icon: CheckCircle },
  FAILED:     { badge: 'text-rose-400    bg-rose-400/10    border-rose-400/20',    dot: 'bg-rose-400',    Icon: XCircle },
  PROCESSING: { badge: 'text-amber-400   bg-amber-400/10   border-amber-400/20',   dot: 'bg-amber-400',   Icon: Clock },
};

export default function TransactionTable({ transactions = [] }) {
  if (!transactions.length) {
    return (
      <div className="hover-card bg-[#071a0f]/80 backdrop-blur-xl border border-white/8 rounded-2xl p-16 text-center animate-fade-up">
        <div className="animate-float w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4">
          <ArrowUpDown size={28} />
        </div>
        <h3 className="text-lg font-bold text-slate-200 mb-2">No Transactions Yet</h3>
        <p className="text-slate-500 text-sm">Your history will appear here after your first payment.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#071a0f]/80 backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden animate-fade-up shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/3 border-b border-white/6">
              {['Transaction ID','Description','Card','Amount','Status','Date'].map(h => (
                <th key={h} className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => {
              const cfg = STATUS[tx.status] || STATUS.PROCESSING;
              const { Icon } = cfg;
              return (
                <tr key={tx.transactionId} className="tx-row border-b border-white/4 last:border-0">
                  <td className="px-5 py-4">
                    <span className="badge-pop font-mono text-[12px] text-emerald-400 font-semibold cursor-default inline-block">
                      {tx.transactionId}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-300 max-w-[160px] truncate">{tx.description || 'University Fee'}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-400">{tx.cardNumber}</td>
                  <td className="px-5 py-4 font-bold text-slate-100">PKR {parseFloat(tx.amount).toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`badge-pop inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-default ${cfg.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      <Icon size={10} />
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-[12px] whitespace-nowrap">{tx.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
