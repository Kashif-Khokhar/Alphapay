import { useState } from 'react';
import { CreditCard, Lock, User, Calendar, Hash, DollarSign, ChevronRight, Sparkles, Shield } from 'lucide-react';

const formatCard   = (v) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
const formatExpiry = (v) => { const c = v.replace(/\D/g,'').slice(0,4); return c.length >= 3 ? `${c.slice(0,2)}/${c.slice(2)}` : c; };

export default function PaymentForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({ name: '', cardNumber: '', expiry: '', cvv: '', amount: '', description: '' });
  const [flipped, setFlip] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState('');
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (form.cardNumber.replace(/\s/g,'').length < 16) e.cardNumber = 'Enter full 16-digit number';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Format: MM/YY';
    if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = '3–4 digits required';
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) e.amount = 'Valid amount required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (!Object.keys(errs).length) onSubmit({ ...form, cardNumber: form.cardNumber.replace(/\s/g,'') });
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 animate-fade-up">
      {/* ── 3D Credit Card ── */}
      <div className="relative w-[360px] h-[210px] cursor-pointer select-none"
        style={{ perspective: '1200px' }}
        onClick={() => setFlip(f => !f)}>
        <div className="relative w-full h-full transition-all duration-700"
          style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

          {/* Front */}
          <div className="absolute inset-0 rounded-[20px] p-6 flex flex-col justify-between shadow-2xl overflow-hidden backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #020617 0%, #1e1b4b 45%, #312e81 70%, #4f46e5 120%)',
              boxShadow: '0 32px 72px rgba(0,0,0,0.35), 0 0 40px var(--primary-glow)',

            }}>
            <div className="absolute inset-0 rounded-[20px]"
              style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.06) 40%, transparent 55%)', pointerEvents: 'none' }} />
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, var(--primary-glow), transparent 70%)', pointerEvents: 'none' }} />


            <div className="flex justify-between items-start relative z-10">
              <div className="w-11 h-8 rounded-md overflow-hidden" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                <div className="h-full grid grid-cols-3 gap-px p-1 opacity-60">
                  {Array(6).fill(null).map((_, i) => <div key={i} className="bg-amber-900/50 rounded-[1px]" />)}
                </div>
              </div>
            </div>
            <div className="font-mono text-xl tracking-[0.22em] text-white/90 font-semibold relative z-10 drop-shadow-lg">
              {form.cardNumber || '●●●● ●●●● ●●●● ●●●●'}
            </div>
            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className="text-[8px] font-bold tracking-widest text-white/40 uppercase mb-1">Card Holder</p>
                <p className="text-sm font-bold text-white/90 uppercase tracking-wider">{form.name || 'Full Name'}</p>
              </div>
              <div>
                <p className="text-[8px] font-bold tracking-widest text-white/40 uppercase mb-1">Expires</p>
                <p className="text-sm font-bold text-white/90">{form.expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 rounded-[20px] flex flex-col justify-center overflow-hidden backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #021409, #042a18, #064e3b)', boxShadow: '0 32px 72px rgba(0,0,0,0.35)' }}>
            <div className="h-12 mb-5" style={{ background: 'rgba(0,0,0,0.4)', margin: '0 -1px' }} />
            <div className="flex items-center justify-end gap-4 px-8">
              <div className="flex-1 h-8 rounded" style={{ background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 4px, transparent 4px, transparent 8px)' }} />
              <span className="text-[8px] font-bold tracking-widest text-white/30 uppercase">CVV</span>
              <div className="glass-premium text-white px-4 py-1.5 rounded-lg font-mono font-black text-base tracking-[0.3em] min-w-[65px] text-center shadow-lg">
                {form.cvv || '●●●'}
              </div>
            </div>
            <p className="text-center text-white/15 text-[10px] mt-4 tracking-widest">CLICK TO FLIP</p>
          </div>
        </div>

        <div className="absolute -bottom-6 left-0 right-0 flex items-center justify-center gap-1.5">
          <Sparkles size={10} className="text-primary" />
          <p className="text-[10px] text-slate-400 font-medium">Click card to reveal CVV</p>

        </div>
      </div>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit}
        className="hover-card holo-card glass-premium w-full max-w-lg rounded-2xl p-8 shadow-lg border border-emerald-100">

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Field label="Card Holder" icon={<User size={13} />} error={errors.name} focused={focused === 'name'}>
            <input type="text" placeholder="John Doe" value={form.name}
              onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
              onChange={e => set('name', e.target.value)} className={inp(errors.name)} />
          </Field>
          <Field label="Amount (PKR)" icon={<DollarSign size={13} />} error={errors.amount} focused={focused === 'amount'}>
            <input type="number" placeholder="0.00" min="1" value={form.amount}
              onFocus={() => setFocused('amount')} onBlur={() => setFocused('')}
              onChange={e => set('amount', e.target.value)} className={inp(errors.amount)} />
          </Field>
        </div>

        <Field label="Card Number" icon={<CreditCard size={13} />} error={errors.cardNumber} cls="mb-4" focused={focused === 'cardNumber'}>
          <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber}
            onFocus={() => setFocused('cardNumber')} onBlur={() => setFocused('')}
            onChange={e => set('cardNumber', formatCard(e.target.value))} className={inp(errors.cardNumber)} />
        </Field>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Field label="Expiry" icon={<Calendar size={13} />} error={errors.expiry} focused={focused === 'expiry'}>
            <input type="text" placeholder="MM/YY" maxLength={5} value={form.expiry}
              onFocus={() => setFocused('expiry')} onBlur={() => setFocused('')}
              onChange={e => set('expiry', formatExpiry(e.target.value))} className={inp(errors.expiry)} />
          </Field>
          <Field label="CVV" icon={<Hash size={13} />} error={errors.cvv} focused={focused === 'cvv'}>
            <input type="password" placeholder="●●●" maxLength={4} value={form.cvv}
              onFocus={() => { setFocused('cvv'); setFlip(true); }}
              onBlur={() => { setFocused(''); setFlip(false); }}
              onChange={e => set('cvv', e.target.value.replace(/\D/g,'').slice(0,4))} className={inp(errors.cvv)} />
          </Field>
        </div>

        <div className="mb-6">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Description (Optional)</label>
          <input type="text" placeholder="e.g. Semester Fee, Lab Fee…" value={form.description}
            onChange={e => set('description', e.target.value)}
            className="glow-input w-full bg-white/5 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none" />
        </div>

        <button type="submit" disabled={isLoading}
          className="btn-glow w-full flex items-center justify-center gap-2.5 text-white font-black py-4 rounded-xl text-base disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', boxShadow: isLoading ? 'none' : '0 12px 28px rgba(99,102,241,0.35)' }}>

          {isLoading ? (
            <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin-slow" /> Processing…</>
          ) : (
            <><Lock size={15} strokeWidth={2.5} /> Pay Now <ChevronRight size={15} /></>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 mt-4">
          <Shield size={10} className="text-slate-400" />
          <p className="text-[11px] text-slate-400">256-bit SSL encrypted · Simulated for demonstration</p>
        </div>
      </form>
    </div>
  );
}

const inp = (err) =>
  `glow-input w-full bg-white/5 border rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200
  ${err ? 'border-rose-300' : 'border-slate-200'}`;

function Field({ label, icon, error, children, cls = '', focused }) {
  return (
    <div className={`space-y-2 ${cls} animate-fade-up`}>
      <label className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 transition-colors duration-200 ${focused ? 'text-primary' : 'text-slate-300'}`}>{label}</label>
      <div className="relative">
        <span className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${focused ? 'text-primary' : 'text-slate-400'}`}>{icon}</span>

        {children}
      </div>
      {error && <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  );
}

