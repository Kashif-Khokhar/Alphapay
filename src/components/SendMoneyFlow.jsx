import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building2, User, Landmark, DollarSign, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import StatusMessage from './StatusMessage';
import { makeTransfer } from '../services/api';

const POPULAR_BANKS = [
  { id: 'sadapay', name: 'SadaPay', color: 'bg-teal-500', icon: <img src="https://ui-avatars.com/api/?name=SadaPay&background=14b8a6&color=fff&rounded=true&bold=true" alt="SadaPay" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'nayapay', name: 'NayaPay', color: 'bg-orange-500', icon: <img src="https://ui-avatars.com/api/?name=NayaPay&background=f97316&color=fff&rounded=true&bold=true" alt="NayaPay" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'meezan',  name: 'Meezan Bank', color: 'bg-purple-800', icon: <img src="https://ui-avatars.com/api/?name=Meezan&background=6b21a8&color=fff&rounded=true&bold=true" alt="Meezan" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'faysal',  name: 'Faysal Bank', color: 'bg-blue-600', icon: <img src="https://ui-avatars.com/api/?name=Faysal&background=2563eb&color=fff&rounded=true&bold=true" alt="Faysal" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'hbl',     name: 'HBL', color: 'bg-emerald-700', icon: <img src="https://ui-avatars.com/api/?name=HBL&background=047857&color=fff&rounded=true&bold=true" alt="HBL" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'other',   name: 'Other Banks...', color: 'bg-slate-200', icon: <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shadow-sm border border-slate-200"><Building2 size={18} /></div> },
];

const fadeInVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { type: 'spring', bounce: 0, duration: 0.4 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

export default function SendMoneyFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bank: null,
    accountNumber: '',
    accountTitle: 'Searching...',
    amount: '',
    purpose: '',
  });
  
  const [status, setStatus] = useState('idle'); // idle, checking, paying, done
  const [transaction, setTransaction] = useState(null);

  const set = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleBankSelect = (bank) => {
    set('bank', bank);
    nextStep();
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    if (formData.accountNumber.length > 8) {
      // Simulate title fetch
      setStatus('checking');
      setTimeout(() => {
        set('accountTitle', 'Rohan Ali'); // Simulated name
        setStatus('idle');
        nextStep();
      }, 800);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!formData.amount || formData.amount <= 0) return;
    
    setStatus('paying');
    try {
      const result = await makeTransfer(formData);
      setTransaction(result);
      setStatus('done');
    } catch (err) {
      setStatus('idle');
    }
  };

  const resetFlow = () => {
    setStep(1);
    setFormData({ bank: null, accountNumber: '', accountTitle: 'Searching...', amount: '', purpose: '' });
    setStatus('idle');
    setTransaction(null);
  };

  if (status === 'done' && transaction) {
    return (
      <div className="w-full max-w-lg mx-auto bg-white rounded-3xl p-8 shadow-xl border border-slate-100 animate-fade-up">
        <StatusMessage transaction={transaction} onRetry={resetFlow} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative min-h-[500px] flex flex-col">
      
      {/* Header / Back Button */}
      <div className="p-6 border-b border-slate-50 flex items-center justify-between pb-4">
        {step > 1 ? (
          <button onClick={prevStep} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
            <ChevronLeft size={20} />
          </button>
        ) : <div className="w-10 h-10" />}
        
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-teal-500' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
        <div className="w-10 h-10" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative p-6 flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SELECT BANK */}
          {step === 1 && (
            <motion.div key="step1" variants={fadeInVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Send Money</h2>
                <p className="text-slate-500 text-sm">Select the receiver's bank to begin transfer.</p>
              </div>
              
              <div className="relative mb-6">
                <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search by bank name..." className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none placeholder:text-slate-400 transition-all" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {POPULAR_BANKS.map(bank => (
                  <button key={bank.id} onClick={() => handleBankSelect(bank)} className="bg-white border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 hover:shadow-md p-4 flex flex-col items-center gap-3 rounded-[20px] transition-all duration-200 active:scale-95 group">
                    <div className="transition-transform group-hover:-translate-y-1 duration-300">
                      {bank.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-700 text-center">{bank.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: ENTER ACCOUNT */}
          {step === 2 && (
            <motion.div key="step2" variants={fadeInVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                {formData.bank?.icon}
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sending to</p>
                  <p className="font-bold text-slate-800">{formData.bank?.name}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Account Details</h2>
                <p className="text-slate-500 text-sm">Enter the receiver's IBAN or Account Number.</p>
              </div>

              <form onSubmit={handleAccountSubmit} className="flex-1 flex flex-col">
                <div className="relative mb-8">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-500" size={20} />
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="PK35 SADA 0000 0000 0000" 
                    value={formData.accountNumber}
                    onChange={e => set('accountNumber', e.target.value)}
                    className="w-full pl-12 pr-4 py-5 bg-white border-2 border-slate-200 rounded-2xl text-lg font-bold font-mono text-slate-800 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all uppercase" 
                    required 
                  />
                </div>
                
                <div className="mt-auto">
                  <button 
                    type="submit" 
                    disabled={formData.accountNumber.length < 8 || status === 'checking'}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 transition-colors hover:bg-slate-800 active:scale-95"
                  >
                    {status === 'checking' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Continue'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3: ENTER AMOUNT */}
          {step === 3 && (
            <motion.div key="step3" variants={fadeInVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col text-center">
              <div className="flex flex-col items-center justify-center mb-8 bg-slate-50 py-4 px-6 rounded-3xl mx-auto border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-2 z-10 -mt-8 border border-slate-100">
                  <User size={20} className="text-slate-400" />
                </div>
                <p className="text-slate-800 font-bold text-lg">{formData.accountTitle}</p>
                <p className="text-slate-400 text-xs font-mono">{formData.bank?.name} • {formData.accountNumber.slice(-4)}</p>
              </div>

              <form onSubmit={handleSend} className="flex-1 flex flex-col">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <span className="text-3xl font-bold text-slate-300">PKR</span>
                  <input 
                    type="number" 
                    autoFocus
                    placeholder="0" 
                    value={formData.amount}
                    onChange={e => set('amount', e.target.value)}
                    className="w-full max-w-[200px] bg-transparent border-none text-6xl md:text-7xl font-black text-slate-800 focus:ring-0 outline-none text-center p-0 tracking-tighter" 
                    required 
                  />
                </div>

                <div className="mb-8 max-w-[280px] mx-auto w-full">
                  <input 
                    type="text" 
                    placeholder="Add a note (optional)" 
                    value={formData.purpose}
                    onChange={e => set('purpose', e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-center text-sm font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 outline-none" 
                  />
                </div>

                <div className="mt-auto pb-2">
                  <button 
                    type="submit" 
                    disabled={!formData.amount || formData.amount <= 0 || status === 'paying'}
                    className="w-full flex items-center justify-center gap-3 text-white font-black py-4 rounded-[20px] text-lg disabled:opacity-50 transition-all hover:-translate-y-1 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #12b894, #17e0b5)', boxShadow: '0 10px 25px -5px rgba(23,224,181,0.4)' }}
                  >
                    {status === 'paying' ? (
                      <span className="w-6 h-6 border-3 border-white/40 border-t-white rounded-full animate-spin-slow" />
                    ) : (
                      <><Send size={18} strokeWidth={2.5} /> Send Money</>
                    )}
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  <ShieldCheck size={12} className="text-teal-500" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instant & Secure Transfer</p>
                </div>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
