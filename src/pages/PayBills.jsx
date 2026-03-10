import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowDownLeft, CheckCircle2, Search, Smartphone, Globe, Home } from 'lucide-react';

export default function PayBills() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const categories = [
    { id: 'electricity', label: 'Electricity', icon: Zap, color: 'bg-amber-100 text-amber-600' },
    { id: 'mobile', label: 'Mobile Postpaid', icon: Smartphone, color: 'bg-blue-100 text-blue-600' },
    { id: 'internet', label: 'Internet', icon: Globe, color: 'bg-teal-100 text-teal-600' },
    { id: 'gas', label: 'Gas', icon: Home, color: 'bg-rose-100 text-rose-600' },
  ];

  const handlePay = (e) => {
    e.preventDefault();
    setIsPaid(true);
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
          <h1 className="text-2xl font-black text-secondary tracking-tighter">Pay Bills</h1>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          {!selectedCategory ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus-within:ring-2 focus-within:ring-teal-500 transition-all">
                <Search size={17} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search biller..."
                  className="flex-1 bg-transparent border-none text-sm font-bold text-secondary outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className="flex flex-col items-center gap-4 p-6 rounded-[2rem] border border-slate-50 hover:border-primary/30 hover:bg-slate-50 transition-all group"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <cat.icon size={28} />
                    </div>
                    <span className="text-[11px] font-black text-secondary uppercase tracking-wide text-center leading-tight">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : isPaid ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-black text-secondary mb-2">Bill Paid!</h2>
              <p className="text-sm text-slate-500">Your payment of PKR 4,500 was successful.</p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className={`w-12 h-12 rounded-xl ${selectedCategory.color} flex items-center justify-center`}>
                  <selectedCategory.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Paying For</p>
                  <p className="text-sm font-black text-secondary">{selectedCategory.label}</p>
                </div>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="ml-auto text-[10px] font-black text-primary uppercase tracking-widest"
                >
                  Change
                </button>
              </div>

              <form onSubmit={handlePay} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 px-1">Consumer ID</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter 14-digit number"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-secondary focus:bg-white focus:border-primary/50 outline-none transition-all"
                  />
                </div>

                <div className="p-5 bg-slate-900 rounded-[2rem] text-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount Due</span>
                    <span className="text-xs font-bold text-primary">Due: Mar 15</span>
                  </div>
                  <p className="text-2xl font-black tracking-tighter">PKR 4,500.00</p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                >
                  Confirm &amp; Pay Now
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
