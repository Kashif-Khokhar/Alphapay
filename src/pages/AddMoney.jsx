import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowDownLeft, CreditCard, Landmark, Wallet, CheckCircle2 } from 'lucide-react';

export default function AddMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = [
    { id: 'bank', label: 'Bank Transfer', icon: Landmark, desc: 'Free • Instant', color: 'bg-indigo-50 text-indigo-600' },
    { id: 'card', label: 'Debit Card', icon: CreditCard, desc: '2% Fee • Instant', color: 'bg-rose-50 text-rose-600' },
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  return (
    <div className="min-h-screen pb-40 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', paddingTop: '100px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors"
          >
            <ArrowDownLeft size={20} className="rotate-45" />
          </button>
          <h1 className="text-2xl font-black text-secondary tracking-tighter">Add Money</h1>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          {isSuccess ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-black text-secondary mb-2">Money Added!</h2>
              <p className="text-sm text-slate-500">PKR {parseFloat(amount).toLocaleString()} added to your wallet successfully.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleAdd} className="space-y-8">
              <div className="text-center mb-8">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Enter Amount</p>
                <div className="relative inline-block">
                  <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400">PKR</span>
                  <input 
                    type="number" 
                    required
                    autoFocus
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-40 bg-transparent text-5xl font-black text-secondary text-center focus:outline-none placeholder:text-slate-100 tracking-tighter"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Select Method</p>
                {methods.map((method) => (
                  <label 
                    key={method.id}
                    className="flex items-center gap-4 p-5 rounded-2xl border border-slate-50 cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5"
                  >
                    <input type="radio" name="method" defaultChecked={method.id === 'bank'} className="hidden" />
                    <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center`}>
                      <method.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-secondary leading-none mb-1">{method.label}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{method.desc}</p>
                    </div>
                    <div className="ml-auto w-5 h-5 rounded-full border-2 border-slate-200 flex items-center justify-center check-circle transition-all">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary scale-0 transition-transform" />
                    </div>
                  </label>
                ))}
              </div>

              <button type="submit" className="btn btn-dark btn-full mt-4">
                <Plus size={15} /> Add PKR {amount || '0'}
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
               <Wallet size={18} />
            </div>
            <div>
              <p className="text-xs font-black text-secondary uppercase tracking-widest mb-1">Current Limit</p>
              <p className="text-[10px] text-slate-500 leading-relaxed font-bold">You can add up to PKR 150,000 more today to stay within your daily limit.</p>
            </div>
          </div>
        </div>
        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </motion.div>
    </div>
  );
}
