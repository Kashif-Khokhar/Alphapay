import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LifeBuoy, Mail, Phone, MessageSquare, ChevronDown, ChevronUp,
  CheckCircle, Clock, AlertCircle, BookOpen, ExternalLink, ArrowRight
} from 'lucide-react';

const FAQS = [
  { q: 'How do I make a payment?',                 a: 'Go to the Checkout page from the navbar or Dashboard → Pay Fee. Fill in your card details and the amount, then click Pay Now.' },
  { q: 'Is my payment information secure?',         a: 'Yes. All transactions on UniPay are 100% simulated for demonstration purposes. No real card data is transmitted or stored.' },
  { q: 'What cards does UniPay accept?',            a: 'UniPay accepts VISA, Mastercard, and American Express cards in the simulation.' },
  { q: 'How do I view my transaction history?',     a: 'Navigate to the History page from the navbar. You can filter by Successful or Failed transactions.' },
  { q: 'What happens if my payment fails?',         a: 'If a payment fails, you will see a retry option on the status screen. You can also go to History to review past attempts.' },
  { q: 'Can I get a receipt for my payment?',       a: 'After each payment, the status screen shows a full breakdown of the transaction including ID, amount, and date.' },
];

const CONTACT_CARDS = [
  { Icon: Mail,           label: 'Email Support',    value: 'support@university.edu',    sub: 'Response within 24 hours',    color: 'emerald' },
  { Icon: Phone,          label: 'Phone Helpdesk',   value: '+92 21 111 000 001',         sub: 'Mon–Fri, 9AM–5PM',            color: 'amber' },
  { Icon: MessageSquare,  label: 'Live Chat',         value: 'Start a conversation',       sub: 'Available during office hours', color: 'teal' },
];

export default function Support() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }); }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#080808]" style={{ paddingTop: '64px' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'320px', pointerEvents:'none',
        background:'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(251,113,133,0.07) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-16">

        {/* Header */}
        <div className="relative z-10 mb-10 animate-fade-up">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-2">Support</p>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight leading-tight flex items-center gap-3">
            <LifeBuoy size={28} className="text-rose-400" />
            Help &amp; Support
          </h1>
          <p className="text-slate-500 text-sm mt-2">Get help with your payments or contact the university team.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* Left column */}
          <div className="flex flex-col gap-6">

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up">
              {CONTACT_CARDS.map(({ Icon, label, value, sub, color }) => (
                <div key={label} className={`sidebar-card bg-[#111111] border border-white/8 rounded-2xl p-5 flex flex-col gap-3`}>
                  <div className={`w-10 h-10 rounded-xl bg-${color}-500/15 text-${color}-400 flex items-center justify-center`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">{value}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="hover-card bg-[#111111] border border-white/8 rounded-2xl p-6 animate-fade-up">
              <div className="flex items-center gap-2 mb-5">
                <BookOpen size={16} className="text-amber-400" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border border-white/6 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-white/3 transition-colors duration-150">
                      <span className="text-sm font-semibold text-slate-200">{faq.q}</span>
                      {openFaq === i
                        ? <ChevronUp size={15} className="text-emerald-400 flex-shrink-0" />
                        : <ChevronDown size={15} className="text-slate-500 flex-shrink-0" />
                      }
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3 animate-fade-up">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-3 animate-fade-up">
              <button onClick={() => navigate('/checkout')}
                className="btn-glow hover-card bg-[#111111] border border-white/8 rounded-xl p-4 flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-300">Pay Fee</p>
                  <p className="text-[10px] text-slate-600 truncate">Go to checkout</p>
                </div>
                <ArrowRight size={13} className="text-slate-600 ml-auto flex-shrink-0" />
              </button>
              <button onClick={() => navigate('/history')}
                className="btn-glow hover-card bg-[#111111] border border-white/8 rounded-xl p-4 flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Clock size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-300">History</p>
                  <p className="text-[10px] text-slate-600 truncate">View transactions</p>
                </div>
                <ArrowRight size={13} className="text-slate-600 ml-auto flex-shrink-0" />
              </button>
            </div>
          </div>

          {/* Right column — Contact form */}
          <div className="hover-card bg-[#111111] border border-white/8 rounded-2xl p-6 animate-fade-up">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare size={16} className="text-rose-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Send a Message</h2>
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 animate-scale-in">
                <div className="animate-float w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <CheckCircle size={30} />
                </div>
                <p className="text-slate-200 font-bold text-lg">Message Sent!</p>
                <p className="text-slate-500 text-sm text-center">Our support team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { key:'name',    label:'Your Name',     type:'text',  placeholder:'John Doe' },
                  { key:'email',   label:'Email Address', type:'email', placeholder:'you@example.com' },
                  { key:'subject', label:'Subject',       type:'text',  placeholder:'e.g. Payment issue' },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">{label}</label>
                    <input type={type} placeholder={placeholder} value={form[key]} required
                      onChange={e => set(key, e.target.value)}
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 focus:-translate-y-px" />
                  </div>
                ))}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Message</label>
                  <textarea rows={4} placeholder="Describe your issue in detail…" value={form.message} required
                    onChange={e => set('message', e.target.value)}
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 resize-none" />
                </div>

                <button type="submit"
                  className="btn-glow w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-rose-500/25 mt-1">
                  <ExternalLink size={14} /> Send Message
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 mt-1">
                  <AlertCircle size={10} /> Demo mode — messages are not actually sent
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
