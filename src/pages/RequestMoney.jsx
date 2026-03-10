import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDownLeft, Send, Sparkles, User, ShieldCheck } from 'lucide-react';

export default function RequestMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isRequested, setIsRequested] = useState(false);

  const handleRequest = (e) => {
    e.preventDefault();
    setIsRequested(true);
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  return (
    <div className="min-h-screen pb-40 px-4 sm:px-8 md:px-12" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', paddingTop: '100px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1600px] mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors"
          >
            <ArrowDownLeft size={20} className="rotate-45" />
          </button>
          <h1 className="text-2xl font-black text-secondary tracking-tighter">Request Money</h1>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-[2.5rem] bg-secondary flex items-center justify-center text-primary mb-4 shadow-lg">
              <ArrowDownLeft size={36} strokeWidth={2.5} />
            </div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Generate Request</p>
          </div>

          {isRequested ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-xl font-black text-secondary mb-2">Request Sent!</h2>
              <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleRequest} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2 px-1">Amount (PKR)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-black text-slate-500">PKR</span>
                  <input 
                    type="number" 
                    required
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-16 pr-5 text-lg font-black text-secondary focus:bg-white focus:border-primary/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2 px-1">From (Username/Tag)</label>
                <div className="relative">
                  <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    required
                    placeholder="@username"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-5 text-sm font-bold text-secondary focus:bg-white focus:border-primary/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2 px-1">Note (Optional)</label>
                <textarea 
                  placeholder="What's this for?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-secondary focus:bg-white focus:border-primary/50 outline-none transition-all resize-none h-24"
                />
              </div>

              <button type="submit" className="btn btn-dark btn-full">
                <Send size={15} /> Send Request
              </button>
            </form>
          )}
        </div>
        
        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </motion.div>
    </div>
  );
}
