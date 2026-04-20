import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building2, User, Search, DollarSign, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import StatusMessage from './StatusMessage';
import { makeTransfer } from '../services/api';

const POPULAR_BANKS = [
  { id: 'sadapay', name: 'SadaPay', color: 'bg-teal-500', icon: <img src="https://ui-avatars.com/api/?name=SadaPay&background=14b8a6&color=fff&rounded=true&bold=true" alt="SadaPay" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'nayapay', name: 'NayaPay', color: 'bg-orange-500', icon: <img src="https://ui-avatars.com/api/?name=NayaPay&background=f97316&color=fff&rounded=true&bold=true" alt="NayaPay" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'meezan',  name: 'Meezan Bank', color: 'bg-purple-800', icon: <img src="https://ui-avatars.com/api/?name=Meezan&background=6b21a8&color=fff&rounded=true&bold=true" alt="Meezan" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'faysal',  name: 'Faysal Bank', color: 'bg-blue-600', icon: <img src="https://ui-avatars.com/api/?name=Faysal&background=2563eb&color=fff&rounded=true&bold=true" alt="Faysal" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'hbl',     name: 'HBL', color: 'bg-emerald-700', icon: <img src="https://ui-avatars.com/api/?name=HBL&background=047857&color=fff&rounded=true&bold=true" alt="HBL" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'ubl',     name: 'UBL', color: 'bg-sky-600', icon: <img src="https://ui-avatars.com/api/?name=UBL&background=0284c7&color=fff&rounded=true&bold=true" alt="UBL" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'allied',  name: 'Allied Bank', color: 'bg-sky-700', icon: <img src="https://ui-avatars.com/api/?name=Allied&background=0369a1&color=fff&rounded=true&bold=true" alt="Allied" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'mcb',     name: 'MCB Bank', color: 'bg-green-600', icon: <img src="https://ui-avatars.com/api/?name=MCB&background=16a34a&color=fff&rounded=true&bold=true" alt="MCB" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'alfalah', name: 'Bank Alfalah', color: 'bg-red-800', icon: <img src="https://ui-avatars.com/api/?name=Alfalah&background=991b1b&color=fff&rounded=true&bold=true" alt="Alfalah" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'habibmetro', name: 'Habib Metro', color: 'bg-blue-900', icon: <img src="https://ui-avatars.com/api/?name=HabibM&background=1e3a8a&color=fff&rounded=true&bold=true" alt="HabibMetro" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'scb',     name: 'Standard Chartered', color: 'bg-blue-700', icon: <img src="https://ui-avatars.com/api/?name=SCB&background=1d4ed8&color=fff&rounded=true&bold=true" alt="SCB" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'bop',     name: 'Bank of Punjab', color: 'bg-amber-600', icon: <img src="https://ui-avatars.com/api/?name=BOP&background=d97706&color=fff&rounded=true&bold=true" alt="BOP" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'askari',  name: 'Askari Bank', color: 'bg-emerald-900', icon: <img src="https://ui-avatars.com/api/?name=Askari&background=064e3b&color=fff&rounded=true&bold=true" alt="Askari" className="w-10 h-10 rounded-full shadow-sm" /> },
  { id: 'other',   name: 'Other Banks...', color: 'bg-white/20', icon: <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-400 shadow-sm border border-slate-200"><Building2 size={18} /></div> },
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
  const [bankSearch, setBankSearch] = useState('');

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


  return (
    <div className="w-full glass-premium rounded-[40px] shadow-2xl relative min-h-[550px] flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      
      {/* Header / Back Button */}
      <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
        {step > 1 ? (
          <button onClick={prevStep} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
            <ChevronLeft size={20} />
          </button>
        ) : <div className="w-12 h-12" />}
        
        <div className="flex gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-10 bg-primary' : 'w-2 bg-white/10'}`} />
          ))}
        </div>
        <div className="w-12 h-12" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative px-10 py-8 flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SELECT BANK */}
          {step === 1 && (
            <motion.div key="step1" variants={fadeInVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
              <div className="mb-10">
                <h2 className="text-2xl font-black text-secondary tracking-tight mb-2">Select Bank</h2>
                <p className="text-slate-400 font-bold text-sm">Choose a bank for your money transfer.</p>
              </div>
              
              <div className="flex items-center gap-4 mb-8 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 focus-within:border-primary/50 focus-within:bg-white/10 transition-all">
                <Search size={20} className="text-slate-300" />
                <input
                  type="text"
                  placeholder="Search bank..."
                  value={bankSearch}
                  onChange={e => setBankSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none text-sm font-black text-secondary outline-none placeholder:text-slate-300 tracking-tight"
                />
              </div>

              {(() => {
                const q = bankSearch.trim().toLowerCase();
                const sorted = q
                  ? [...POPULAR_BANKS].sort((a, b) => {
                      const an = a.name.toLowerCase();
                      const bn = b.name.toLowerCase();
                      const aStarts = an.startsWith(q);
                      const bStarts = bn.startsWith(q);
                      if (aStarts && !bStarts) return -1;
                      if (!aStarts && bStarts) return 1;
                      return 0;
                    })
                  : POPULAR_BANKS;
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sorted.map(bank => (
                      <button
                        key={bank.id}
                        onClick={() => { setBankSearch(''); handleBankSelect(bank); }}
                        className="bg-white/5 border border-white/10 p-5 flex flex-row items-center gap-4 rounded-[28px] transition-all hover:bg-white/10 hover:border-primary/20 hover:scale-[1.02] active:scale-95 group shadow-sm"
                      >
                        <div className="transition-transform group-hover:scale-110 duration-500">
                          {bank.icon}
                        </div>
                        <span className="text-sm font-black text-secondary tracking-tight">{bank.name}</span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* STEP 2: ENTER ACCOUNT */}
          {step === 2 && (
            <motion.div key="step2" variants={fadeInVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
              <div className="flex items-center gap-5 mb-10 p-6 bg-white/5 rounded-[32px] border border-white/10 shadow-sm">
                {formData.bank?.icon}
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Bank</p>
                  <p className="font-black text-secondary tracking-tight">{formData.bank?.name}</p>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-black text-secondary tracking-tight mb-2">Account Details</h2>
                <p className="text-slate-400 font-bold text-sm">Enter the IBAN or account number of the recipient.</p>
              </div>

              <form onSubmit={handleAccountSubmit} className="flex-1 flex flex-col">
                <div className="flex items-center gap-5 mb-10 px-8 py-6 bg-white/5 border-2 border-white/10 rounded-[32px] focus-within:border-primary focus-within:bg-white/10 transition-all shadow-sm">
                  <User className="text-primary" size={24} />
                  <input
                    type="text"
                    autoFocus
                    placeholder="PK00 XXXX 0000 0000 0000"
                    value={formData.accountNumber}
                    onChange={e => set('accountNumber', e.target.value)}
                    className="flex-1 bg-transparent border-none text-xl font-black font-mono text-secondary outline-none uppercase placeholder:text-slate-200"
                    required
                  />
                </div>
                
                <div className="mt-auto">
                  <button
                    type="submit"
                    disabled={formData.accountNumber.length < 8 || status === 'checking'}
                    className="w-full bg-primary text-secondary py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {status === 'checking' ? <div className="w-5 h-5 border-3 border-secondary/30 border-t-secondary rounded-full animate-spin mx-auto" /> : 'Verify Account'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3: ENTER AMOUNT */}
          {step === 3 && status !== 'done' && (
            <motion.div key="step3" variants={fadeInVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col text-center">
              <div className="flex items-center gap-6 mb-12 bg-white/5 py-6 px-10 rounded-[40px] border border-white/10 shadow-sm max-w-sm mx-auto w-full group">
                <div className="w-14 h-14 glass-premium rounded-2xl shadow-xl flex-shrink-0 flex items-center justify-center border border-white/10 transition-transform group-hover:scale-110">
                  <User size={24} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-secondary font-black text-xl tracking-tight mb-1">{formData.accountTitle}</p>
                  <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">{formData.bank?.name} &bull; {formData.accountNumber.slice(-4)}</p>
                </div>
              </div>

              <form onSubmit={handleSend} className="flex-1 flex flex-col">
                <div className="flex items-center justify-center gap-4 mb-12">
                  <span className="text-4xl font-black text-slate-700 tracking-tighter">PKR</span>
                  <input 
                    type="number" 
                    autoFocus
                    placeholder="0" 
                    value={formData.amount}
                    onChange={e => set('amount', e.target.value)}
                    className="w-full max-w-[300px] bg-transparent border-none text-7xl md:text-8xl font-black text-secondary focus:ring-0 outline-none text-center p-0 tracking-tighter" 
                    required 
                  />
                </div>

                <div className="mb-12 max-w-sm mx-auto w-full group">
                  <input 
                    type="text" 
                    placeholder="Transfer Memo (optional)" 
                    value={formData.purpose}
                    onChange={e => set('purpose', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-center text-sm font-black text-secondary placeholder:text-slate-400 focus:bg-white/10 focus:border-primary/30 outline-none transition-all shadow-sm" 
                  />
                </div>

                <div className="mt-auto pb-4">
                  <button
                    type="submit"
                    disabled={!formData.amount || formData.amount <= 0 || status === 'paying'}
                    className="w-full bg-primary text-secondary py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {status === 'paying' ? (
                      <div className="w-6 h-6 border-3 border-secondary/30 border-t-secondary rounded-full animate-spin mx-auto" />
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Send size={20} strokeWidth={3} /> Send Money
                      </div>
                    )}
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <ShieldCheck size={14} className="text-primary" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Transfer Service</p>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 4: DONE */}
          {status === 'done' && transaction && (
            <motion.div key="done" variants={fadeInVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col items-center justify-center py-4">
              <StatusMessage transaction={transaction} onRetry={resetFlow} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

