import { CheckCircle, XCircle, Clock, ArrowUpDown, TrendingUp } from 'lucide-react';

const STATUS = {
  SUCCESS:    { badgeCls: 'text-emerald-700 bg-emerald-50 border-emerald-200',  dot: 'bg-emerald-500', Icon: CheckCircle },
  FAILED:     { badgeCls: 'text-rose-700    bg-rose-50    border-rose-200',     dot: 'bg-rose-500',    Icon: XCircle    },
  PROCESSING: { badgeCls: 'text-amber-700   bg-amber-50   border-amber-200',    dot: 'bg-amber-500',   Icon: Clock      },
};

export default function TransactionTable({ transactions = [] }) {
  if (!transactions.length) {
    return (
      <div className="hover-card bg-white rounded-2xl p-16 text-center animate-fade-up border border-slate-100 shadow-sm">
        <div className="animate-float w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-5">
          <ArrowUpDown size={28} strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-black text-slate-800 mb-2">No Transactions Found</h3>
        <p className="text-slate-500 text-sm">Try changing your filters or make your first payment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-fade-up shadow-sm border border-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100" style={{ background: 'rgba(240,253,244,0.7)' }}>
              {[
                { label: 'Transaction ID', icon: <TrendingUp size={10} className="text-emerald-500" /> },
                { label: 'Description',   icon: null },
                { label: 'Card',          icon: null },
                { label: 'Amount',        icon: null },
                { label: 'Status',        icon: null },
                { label: 'Date',          icon: null },
              ].map(({ label, icon }) => (
                <th key={label} className="px-5 py-4 text-left whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {icon}{label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const cfg = STATUS[tx.status] || STATUS.PROCESSING;
              const { Icon } = cfg;
              return (
                <tr key={tx.transactionId} className="tx-row border-b border-slate-50 last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                      <span className="badge-pop font-mono text-[11px] text-emerald-700 font-bold cursor-default">{tx.transactionId}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600 max-w-[160px] truncate text-xs">{tx.description || 'University Fee'}</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-400">{tx.cardNumber}</td>
                  <td className="px-5 py-4"><span className="font-black text-slate-800 text-sm">PKR {parseFloat(tx.amount).toLocaleString()}</span></td>
                  <td className="px-5 py-4">
                    <span className={`badge-pop inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border cursor-default ${cfg.badgeCls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                      <Icon size={10} strokeWidth={2.5} />
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-[11px] whitespace-nowrap font-mono">{tx.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 flex items-center justify-between border-t border-slate-50 bg-slate-50/50">
        <p className="text-[10px] text-slate-400 font-medium">
          Showing <span className="text-slate-600 font-bold">{transactions.length}</span> transaction{transactions.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot" />
          <p className="text-[10px] text-slate-400">Live data</p>
        </div>
      </div>
    </div>
  );
}
