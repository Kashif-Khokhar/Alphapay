import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Receipt, TrendingUp, X } from 'lucide-react';
import StatusMessage from './StatusMessage';

const STATUS = {
  SUCCESS:    { badgeCls: 'text-emerald-700 bg-emerald-50 border-emerald-200',  dot: 'bg-emerald-500', Icon: CheckCircle },
  FAILED:     { badgeCls: 'text-rose-700    bg-rose-50    border-rose-200',     dot: 'bg-rose-500',    Icon: XCircle    },
  PROCESSING: { badgeCls: 'text-amber-700   bg-amber-50   border-amber-200',    dot: 'bg-amber-500',   Icon: Clock      },
};

export default function TransactionTable({ transactions = [] }) {
  const [selectedTx, setSelectedTx] = useState(null);

  return (
    <>
      <div className="bg-white rounded-2xl animate-fade-up shadow-sm border border-slate-100">
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
                  <th key={label} className={`px-5 py-4 text-left whitespace-nowrap ${label === 'Transaction ID' ? 'w-[180px]' : ''}`}>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {icon}{label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-teal-500 mx-auto mb-5">
                      <Receipt size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-black text-slate-800 mb-2">No Transactions Found</h3>
                    <p className="text-slate-500 text-sm">Try changing your filters or make your first payment.</p>
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => {
                  const cfg = STATUS[tx.status] || STATUS.PROCESSING;
                  const { Icon } = cfg;
                  return (
                    <tr 
                      key={tx.transactionId} 
                      onClick={() => setSelectedTx(tx)}
                      className="tx-row border-b border-slate-50 last:border-0 cursor-pointer hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-5 py-4 w-[180px] tx-indicator-cell">
                        <div className="flex items-center gap-1.5 px-1">
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                          <span className="badge-pop font-mono text-[11px] text-emerald-700 font-bold cursor-default whitespace-nowrap">{tx.transactionId}</span>
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
                })
              )}
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

      <AnimatePresence>
        {selectedTx && (
          <div 
            className="fixed inset-0 z-[10000] overflow-y-auto no-scrollbar bg-slate-900/60 backdrop-blur-md px-4 py-8 flex justify-center items-center"
            onClick={() => setSelectedTx(null)}
          >
            <div className="w-full flex justify-center py-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedTx(null)}
                  className="absolute top-5 right-5 z-[60] w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-100"
                >
                  <X size={20} />
                </button>
                <div className="w-full pb-8">
                  <StatusMessage transaction={selectedTx} onClose={() => setSelectedTx(null)} />
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
