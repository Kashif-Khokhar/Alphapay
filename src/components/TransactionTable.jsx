import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Receipt, TrendingUp, X } from 'lucide-react';
import StatusMessage from './StatusMessage';

const STATUS = {
  SUCCESS:    { badgeCls: 'icon-success icon-bg-emerald border-emerald-100',  dot: 'bg-emerald-500', Icon: CheckCircle },
  FAILED:     { badgeCls: 'icon-danger  icon-bg-rose    border-rose-100',     dot: 'bg-rose-500',    Icon: XCircle    },
  PROCESSING: { badgeCls: 'icon-warning icon-bg-amber   border-amber-100',    dot: 'bg-amber-500',   Icon: Clock      },
};

export default function TransactionTable({ transactions = [], onSelectTx }) {

  return (
    <>
      <div className="glass-premium rounded-[56px] p-8 animate-fade-up shadow-xl shadow-slate-200/40 border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10" style={{ background: 'rgba(240,253,244,0.7)' }}>
                {[
                  { label: 'Transaction ID', icon: <TrendingUp size={10} className="text-emerald-500" /> },
                  { label: 'Description',   icon: null },
                  { label: 'Card',          icon: null },
                  { label: 'Amount',        icon: null },
                  { label: 'Status',        icon: null },
                  { label: 'Date',          icon: null },
                ].map(({ label, icon }) => (
                  <th key={label} className={`px-14 py-6 text-left whitespace-nowrap ${label === 'Transaction ID' ? 'w-[200px]' : ''}`}>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-secondary">
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
                    <div className="w-16 h-16 rounded-full bg-primary/5 border-2 border-primary/5 flex items-center justify-center text-primary mx-auto mb-5">
                       <Receipt size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-black text-secondary mb-2">No Transactions Found</h3>
                    <p className="text-muted text-sm">Try changing your filters or make your first payment.</p>
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => {
                  const cfg = STATUS[tx.status] || STATUS.PROCESSING;
                  const { Icon } = cfg;
                  return (
                    <tr 
                      key={tx.transactionId} 
                      onClick={() => onSelectTx?.(tx)}
                      className="tx-row border-b border-primary/5 last:border-0 cursor-pointer hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-14 py-6 w-[200px] tx-indicator-cell">
                        <div className="flex items-center gap-1.5 px-1">
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                          <span className="badge-pop font-mono text-[11px] text-secondary font-bold cursor-default whitespace-nowrap">{tx.transactionId}</span>
                        </div>
                      </td>
                      <td className="px-14 py-6 text-muted max-w-[200px] truncate text-xs">{tx.description || 'Account Payment'}</td>
                      <td className="px-14 py-6 font-mono text-[11px] text-muted">{tx.cardNumber}</td>
                      <td className="px-14 py-6"><span className="font-black text-secondary text-sm">PKR {parseFloat(tx.amount).toLocaleString()}</span></td>
                      <td className="px-14 py-6">
                        <span className={`badge-pop inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border cursor-default ${cfg.badgeCls}`}>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                          <Icon size={10} strokeWidth={2.5} />
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-14 py-6 text-muted text-[11px] whitespace-nowrap font-mono">{tx.date}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-14 py-6 flex items-center justify-between border-t border-white/5 bg-slate-50/50">
          <p className="text-[10px] text-muted font-medium">
            Showing <span className="text-secondary font-bold">{transactions.length}</span> transaction{transactions.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot" />
            <p className="text-[10px] text-muted">Live data</p>
          </div>
        </div>
      </div>

    </>
  );
}

