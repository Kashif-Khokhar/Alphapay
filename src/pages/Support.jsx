import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LifeBuoy, Mail, Phone, MessageSquare, ChevronRight,
  CheckCircle, Clock, AlertCircle, BookOpen, Send, ArrowRight, Sparkles
} from 'lucide-react';

const FAQS = [
  { q: 'How do I make a payment?',                 a: 'Go to the Checkout page from the navbar or Dashboard → Pay Fee. Fill in your card details and the amount, then click Pay Now.' },
  { q: 'Is my payment information secure?',         a: 'Yes. All transactions on AlphaPay are 100% simulated for demonstration purposes. No real card data is transmitted or stored.' },
  { q: 'What cards does AlphaPay accept?',          a: 'AlphaPay accepts VISA, Mastercard, and American Express cards in the simulation.' },
  { q: 'How do I view my transaction history?',     a: 'Navigate to the History page from the navbar. You can filter by Successful or Failed transactions and search by ID.' },
  { q: 'What happens if my payment fails?',         a: 'If a payment fails, you will see a retry option on the status screen. You can also go to History to review past attempts.' },
  { q: 'Can I get a receipt for my payment?',       a: 'After each payment, the status screen shows a full breakdown of the transaction including ID, amount, and date.' },
];

const CONTACT_CARDS = [
  { Icon: Mail,          label: 'Email Support',  value: 'support@university.edu',  sub: 'Within 24 hours',   bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' },
  { Icon: Phone,         label: 'Phone Helpdesk', value: '+92 21 111 000 001',       sub: 'Mon–Fri, 9AM–5PM',  bg: 'bg-amber-100',   text: 'text-amber-600',   border: 'border-amber-200'   },
  { Icon: MessageSquare, label: 'Live Chat',       value: 'Start a conversation',    sub: 'Office hours only', bg: 'bg-teal-100',    text: 'text-teal-600',    border: 'border-teal-200'    },
];

export default function Support() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }, 3500);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #fffbeb 100%)', paddingTop: '100px' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-40">
        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 live-dot" />
            <p className="text-xs font-bold uppercase tracking-widest text-rose-600">Help Center</p>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center">
              <LifeBuoy size={20} className="text-rose-600" strokeWidth={2} />
            </div>
            Help &amp; Support
          </h1>
          <p className="text-slate-500 text-sm mt-2 ml-0 md:ml-14">Get help with your payments or contact the university team.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="flex flex-col gap-6">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up animate-delay-100">
              {CONTACT_CARDS.map(({ Icon, label, value, sub, bg, text, border }) => (
                <div key={label} className={`sidebar-card bg-white rounded-2xl p-5 flex flex-col gap-4 cursor-default border shadow-sm ${border}`}>
                  <div className={`w-11 h-11 rounded-xl ${bg} ${text} flex items-center justify-center`}>
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                    <p className="text-sm font-bold text-slate-800">{value}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="hover-card holo-card bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-fade-up animate-delay-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <BookOpen size={14} className="text-amber-600" />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border transition-colors duration-200"
                    style={{ borderColor: openFaq === i ? 'rgba(16,185,129,0.3)' : 'rgba(226,232,240,1)' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-colors duration-200"
                      style={{ background: openFaq === i ? 'rgba(16,185,129,0.04)' : 'transparent' }}>
                      <span className={`text-sm font-semibold transition-colors duration-200 ${openFaq === i ? 'text-emerald-700' : 'text-slate-700'}`}>{faq.q}</span>
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                        ${openFaq === i ? 'bg-emerald-100 text-emerald-600 rotate-90' : 'bg-slate-100 text-slate-400'}`}>
                        <ChevronRight size={13} />
                      </div>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 pt-2 text-sm text-slate-500 leading-relaxed animate-fade-down border-t border-slate-100">
                        <div className="flex gap-2.5">
                          <AlertCircle size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          {faq.a}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-3 animate-fade-up animate-delay-300">
              {[
                { label: 'Pay Fee', sub: 'Go to checkout', Icon: CheckCircle, bg: 'bg-emerald-100', text: 'text-emerald-600', to: '/checkout' },
                { label: 'History',  sub: 'View transactions', Icon: Clock, bg: 'bg-amber-100', text: 'text-amber-600', to: '/history' },
              ].map(({ label, sub, Icon, bg, text, to }) => (
                <button key={label} onClick={() => navigate(to)}
                  className="btn-glow hover-card bg-white rounded-xl p-4 flex items-center gap-3 text-left border border-slate-100 shadow-sm">
                  <div className={`w-9 h-9 rounded-lg ${bg} ${text} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-700">{label}</p>
                    <p className="text-[10px] text-slate-400 truncate">{sub}</p>
                  </div>
                  <ArrowRight size={12} className="text-slate-400 ml-auto flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="hover-card holo-card bg-white rounded-2xl p-6 border border-rose-100 shadow-sm animate-slide-right">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                <MessageSquare size={14} className="text-rose-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800">Send a Message</h2>
                <p className="text-[10px] text-rose-600 font-semibold">We'll respond within 24 hours</p>
              </div>
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-14 gap-4 animate-scale-in">
                <div className="animate-float w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600">
                  <CheckCircle size={36} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <p className="text-slate-800 font-black text-xl">Message Sent!</p>
                  <p className="text-slate-500 text-sm mt-1">Our team will get back to you within 24 hours.</p>
                </div>
                <div className="flex gap-1 mt-2">
                  {[0,1,2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { key: 'name',    label: 'Your Name',     type: 'text',  placeholder: 'John Doe' },
                  { key: 'email',   label: 'Email Address', type: 'email', placeholder: 'you@university.edu' },
                  { key: 'subject', label: 'Subject',       type: 'text',  placeholder: 'e.g. Payment issue' },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>
                    <input type={type} placeholder={placeholder} value={form[key]} required
                      onChange={e => set(key, e.target.value)}
                      className="glow-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none" />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Message</label>
                  <textarea rows={4} placeholder="Describe your issue in detail…" value={form.message} required
                    onChange={e => set('message', e.target.value)}
                    className="glow-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none resize-none" />
                </div>
                <button type="submit" className="btn btn-primary btn-full mt-1">
                  <Send size={13} /> Send Message <Sparkles size={11} className="opacity-70" />
                </button>
                <p className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 mt-1">
                  <AlertCircle size={10} /> Demo mode — messages are not actually sent
                </p>
              </form>
            )}
          </div>
        </div>
        
        {/* Mobile Spacer to clear the bottom dock */}
        <div className="h-40 md:hidden" />
      </div>
    </div>
  );
}
