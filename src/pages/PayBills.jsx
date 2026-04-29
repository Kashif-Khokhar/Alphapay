import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowDownLeft, CheckCircle2, Search, Smartphone, Globe, Home } from 'lucide-react';

export default function PayBills() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const categories = [
    { id: 'electricity', label: 'Electricity', icon: Zap, color: 'bg-amber-500/10 text-amber-500' },
    { id: 'mobile', label: 'Mobile Postpaid', icon: Smartphone, color: 'bg-violet-500/10 text-violet-500' },
    { id: 'internet', label: 'Internet', icon: Globe, color: 'bg-teal-500/10 text-teal-500' },
    { id: 'gas', label: 'Gas', icon: Home, color: 'bg-rose-500/10 text-rose-500' },
  ];

  const handlePay = (e) => {
    e.preventDefault();
    setIsPaid(true);
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  return (
    <div className="min-h-screen pb-40 px-4 sm:px-8 md:px-12" style={{ paddingTop: '120px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl glass-premium border border-white/10 flex items-center justify-center text-muted hover:text-secondary hover:bg-white/5 transition-all shadow-sm"
          >
            <ArrowDownLeft size={22} className="rotate-45" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-secondary tracking-tighter">Bill Payments</h1>
            <p className="text-muted font-bold text-sm mt-1">Pay your utility bills quickly and securely.</p>
          </div>
        </div>

        <div className="premium-card p-6 max-w-4xl mx-auto">
          {!selectedCategory ? (
            <div className="space-y-10">
              <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus-within:border-primary/50 focus-within:glass-premium transition-all">
                <Search size={20} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search billers..."
                  className="flex-1 bg-transparent border-none text-sm font-black text-secondary outline-none placeholder:text-muted tracking-tight"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/5 hover:border-primary/20 hover:bg-white/5 transition-all group active:scale-95"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg`}>
                      <cat.icon size={32} strokeWidth={2.5} />
                    </div>
                    <span className="text-[11px] font-black text-muted uppercase tracking-widest text-center leading-tight group-hover:text-secondary transition-colors">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : isPaid ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-black text-secondary mb-3">Payment Successful</h2>
              <p className="text-muted font-bold">Your payment of PKR 4,500 has been processed.</p>
            </motion.div>
          ) : (
            <div className="space-y-10">
              <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                <div className={`w-14 h-14 rounded-2xl ${selectedCategory.color} flex items-center justify-center shadow-lg`}>
                  <selectedCategory.icon size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Biller Category</p>
                  <p className="font-black text-secondary tracking-tight text-lg">{selectedCategory.label}</p>
                </div>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="ml-auto px-5 py-2.5 glass-premium border border-white/10 hover:bg-white/5 rounded-xl text-[10px] font-black text-muted hover:text-secondary uppercase tracking-widest transition-all shadow-sm"
                >
                  Change
                </button>
              </div>

              <form onSubmit={handlePay} className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-muted uppercase tracking-[0.4em] block mb-4 px-2">Consumer Number</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your consumer number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-black text-secondary placeholder:text-muted focus:glass-premium focus:border-primary/50 outline-none transition-all tracking-tight shadow-sm"
                  />
                </div>

                <div className="p-6 bg-secondary rounded-3xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary rounded-full blur-[100px] -mr-24 -mt-24 opacity-10" />
                  <div className="flex justify-between items-center mb-2 relative z-10">
                    <span className="text-[10px] font-black text-muted uppercase tracking-widest">Amount Payable</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Due: Mar 15</span>
                  </div>
                  <p className="text-4xl font-black tracking-tighter relative z-10">PKR 4,500.00</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-secondary py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
                >
                  Pay Now
                </button>
              </form>
            </div>
          )}
        </div>
        
        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </motion.div>
    </div>
  );
}

