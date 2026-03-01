import { useState } from 'react';
import { CreditCard, Lock, User, Calendar, Hash, DollarSign, ChevronRight } from 'lucide-react';

const formatCard   = (v) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
const formatExpiry = (v) => { const c = v.replace(/\D/g,'').slice(0,4); return c.length>=3 ? `${c.slice(0,2)}/${c.slice(2)}` : c; };

export default function PaymentForm({ onSubmit, isLoading }) {
  const [form, setForm]     = useState({ name:'', cardNumber:'', expiry:'', cvv:'', amount:'', description:'' });
  const [flipped, setFlip]  = useState(false);
  const [errors, setErrors] = useState({});
  const set = (k,v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (form.cardNumber.replace(/\s/g,'').length<16) e.cardNumber = 'Enter 16-digit number';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Format: MM/YY';
    if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = '3–4 digits';
    if (!form.amount||isNaN(form.amount)||parseFloat(form.amount)<=0) e.amount = 'Valid amount required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (!Object.keys(errs).length) onSubmit({ ...form, cardNumber: form.cardNumber.replace(/\s/g,'') });
  };

  const raw   = form.cardNumber.replace(/\s/g,'');
  const brand = raw.startsWith('4') ? 'VISA' : raw.startsWith('5') ? 'MC' : raw.startsWith('3') ? 'AMEX' : '····';

  return (
    <div className="w-full flex flex-col items-center gap-8 animate-fade-up">

      {/* 3D Credit Card */}
      <div className="w-[340px] h-[200px] cursor-pointer select-none group"
        style={{ perspective:'1000px' }}
        onClick={() => setFlip(f => !f)}>
        <div className="relative w-full h-full transition-all duration-700"
          style={{ transformStyle:'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

          {/* Front — lifts on hover */}
          <div className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_32px_64px_rgba(0,0,0,0.7),0_0_40px_rgba(16,185,129,0.3)]"
            style={{ backfaceVisibility:'hidden', background:'linear-gradient(135deg,#064e3b 0%,#065f46 40%,#10b981 100%)' }}>
            <div className="flex justify-between items-start">
              <div className="w-10 h-7 rounded bg-gradient-to-br from-yellow-400 to-amber-500 flex flex-col justify-evenly px-1.5 py-1">
                <div className="h-px bg-amber-900/40 rounded" />
                <div className="h-px bg-amber-900/40 rounded" />
                <div className="h-px bg-amber-900/40 rounded" />
              </div>
              <span className="text-xs font-black tracking-widest text-white/80">{brand}</span>
            </div>
            <div className="font-mono text-lg tracking-[0.18em] text-white/90 font-medium">
              {form.cardNumber || '●●●● ●●●● ●●●● ●●●●'}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] font-bold tracking-widest text-white/50 uppercase mb-0.5">Card Holder</p>
                <p className="text-sm font-semibold text-white/90 uppercase tracking-wide">{form.name || 'Full Name'}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-bold tracking-widest text-white/50 uppercase mb-0.5">Expires</p>
                <p className="text-sm font-semibold text-white/90">{form.expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 rounded-2xl flex flex-col justify-center shadow-2xl overflow-hidden"
            style={{ backfaceVisibility:'hidden', transform:'rotateY(180deg)', background:'linear-gradient(135deg,#052e16,#064e3b)' }}>
            <div className="h-10 bg-black/60 mb-6" />
            <div className="flex items-center justify-end gap-3 px-6">
              <span className="text-[9px] font-bold tracking-widest text-white/40 uppercase">CVV</span>
              <div className="bg-white text-slate-900 px-4 py-1 rounded font-mono font-bold text-base tracking-widest min-w-[60px] text-center">
                {form.cvv || '●●●'}
              </div>
            </div>
            <p className="text-center text-white/20 text-[10px] mt-4">Click to flip</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="hover-card w-full max-w-lg bg-[#111111] border border-white/8 rounded-2xl p-8 shadow-2xl">

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Field label="Card Holder" icon={<User size={14}/>} error={errors.name}>
            <input type="text" placeholder="John Doe" value={form.name} onChange={e=>set('name',e.target.value)} className={inp(errors.name)} />
          </Field>
          <Field label="Amount (PKR)" icon={<DollarSign size={14}/>} error={errors.amount}>
            <input type="number" placeholder="0.00" min="1" value={form.amount} onChange={e=>set('amount',e.target.value)} className={inp(errors.amount)} />
          </Field>
        </div>

        <Field label="Card Number" icon={<CreditCard size={14}/>} error={errors.cardNumber} cls="mb-4">
          <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber} onChange={e=>set('cardNumber',formatCard(e.target.value))} className={inp(errors.cardNumber)} />
        </Field>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Field label="Expiry" icon={<Calendar size={14}/>} error={errors.expiry}>
            <input type="text" placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={e=>set('expiry',formatExpiry(e.target.value))} className={inp(errors.expiry)} />
          </Field>
          <Field label="CVV" icon={<Hash size={14}/>} error={errors.cvv}>
            <input type="password" placeholder="●●●" maxLength={4} value={form.cvv} onFocus={()=>setFlip(true)} onBlur={()=>setFlip(false)} onChange={e=>set('cvv',e.target.value.replace(/\D/g,'').slice(0,4))} className={inp(errors.cvv)} />
          </Field>
        </div>

        <div className="mb-6">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Description (Optional)</label>
          <input type="text" placeholder="e.g. Semester Fee, Lab Fee…" value={form.description} onChange={e=>set('description',e.target.value)}
            className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 focus:-translate-y-px" />
        </div>

        <button type="submit" disabled={isLoading}
          className="btn-glow w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-emerald-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading
            ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" /> Processing…</>
            : <><Lock size={15}/> Pay Now <ChevronRight size={15}/></>
          }
        </button>

        <p className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-slate-600">
          <Lock size={10}/> 256-bit SSL encrypted · Simulated for demonstration
        </p>
      </form>
    </div>
  );
}

const inp = (err) =>
  `w-full bg-white/4 border rounded-xl pl-9 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:-translate-y-px
  ${err ? 'border-rose-500/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-white/8 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'}`;

function Field({ label, icon, error, children, cls='' }) {
  return (
    <div className={cls}>
      <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">{icon}</span>
        {children}
      </div>
      {error && <p className="mt-1 text-[11px] text-rose-400">{error}</p>}
    </div>
  );
}
