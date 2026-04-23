import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, User, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Shield, TrendingUp, Users, Globe } from 'lucide-react';
import { loginUser } from '../services/api';

const FEATURES = [
  { icon: Shield,    text: '256-bit SSL Encrypted' },
  { icon: TrendingUp, text: 'Real-time Analytics' },
  { icon: Users,     text: '50,000+ Users' },
  { icon: Globe,     text: 'Nationwide Network' },
];

function Particle({ delay, duration, x, y, size }) {
  return (
    <div className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: `${x}%`, top: `${y}%`,
        background: 'radial-gradient(circle, rgba(16,185,129,0.5), transparent)',
        animation: `particle-rise ${duration}s ease-out ${delay}s infinite`,
      }} />
  );
}

export default function Login() {
  const [form, setForm]       = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [focused, setFocused] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate  = useNavigate();

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username.trim() || !form.password.trim()) { setError('Please enter both fields.'); return; }
    setLoading(true);
    try { await loginUser(form.username, form.password); navigate('/dashboard'); }
    catch (err) { setError(err.message || 'Login failed.'); }
    finally { setLoading(false); }
  };

  const particles = [
    { delay: 0,   duration: 4,   x: 10,  y: 80, size: '4px' },
    { delay: 1.2, duration: 5,   x: 20,  y: 70, size: '3px' },
    { delay: 0.6, duration: 3.5, x: 80,  y: 85, size: '5px' },
    { delay: 2,   duration: 4.5, x: 60,  y: 75, size: '3px' },
    { delay: 0.8, duration: 5.5, x: 40,  y: 90, size: '4px' },
    { delay: 1.8, duration: 4,   x: 90,  y: 65, size: '3px' },
  ];

  return (
    <div className="min-h-screen flex overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 40%, #f5f3ff 100%)' }}>

      {/* Light decorative blobs */}
      <div className="absolute w-[700px] h-[700px] rounded-full -top-80 -left-80 animate-blob-1 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute w-[500px] h-[500px] rounded-full -bottom-60 -right-60 animate-blob-2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.4) 1px,transparent 1px)', backgroundSize: '52px 52px' }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      {/* Left panel */}
      <div className={`hidden lg:flex flex-col justify-between w-[45%] p-12 relative transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
            <Zap size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black gradient-text tracking-tighter">AlphaPay</h1>
            <p className="text-[10px] font-black text-muted uppercase tracking-[0.4em]">Digital Banking</p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-300/60 bg-indigo-50 mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-500 live-dot" />
              <span className="text-xs font-bold text-indigo-700">System Online</span>
            </div>
            <h1 className="text-5xl font-black text-secondary leading-[1.1] tracking-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Banking Made<br />
              <span className="gradient-text">Simple.</span>
            </h1>
            <p className="text-muted font-bold text-sm mt-2 max-w-lg">Control your spending, set limits, and manage your finances with ease and security.</p>
          </div>

          {/* Feature pills */}
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ icon: Icon, text }, i) => (
              <div key={i}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/70 border border-indigo-100 shadow-sm animate-fade-up animate-delay-${(i + 1) * 100}`}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-100">
                  <Icon size={14} className="text-indigo-600" />
                </div>
                <span className="text-xs font-semibold text-slate-700">{text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Secure Environment</p>
              <p className="text-xs text-indigo-400/60 leading-relaxed font-medium">Enter your credentials to access your account securely.</p>
            </div>
          </div>
        </div>

        <p className="text-muted text-xs">AlphaPay · Digital Banking Division · 2026</p>
      </div>

      {/* Vertical divider */}
      <div className="hidden lg:block w-px self-stretch my-8"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.25), rgba(236,72,153,0.15), transparent)' }} />

      {/* Right panel — form */}
      <div className={`flex-1 flex items-center justify-center px-6 py-10 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
        <div className="w-full max-w-md">
          <div className="rounded-3xl p-8 animate-scale-in"
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(99,102,241,0.2)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(99,102,241,0.08)',
            }}>

            {/* Mobile logo */}
            <div className="lg:hidden flex flex-col items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5, #ec4899)', boxShadow: '0 0 24px rgba(99,102,241,0.4)' }}>
                <Zap size={26} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="mb-10 text-center lg:text-left">
              <h3 className="text-3xl font-black text-secondary tracking-tight mb-2">Sign In</h3>
              <p className="text-muted font-medium">Access your secure account</p>
            </div>
            </div>

            <div className="mb-7">
              <h2 className="text-2xl font-black text-black tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Welcome back</h2>
              <p className="text-slate-600 text-sm mt-1">Sign in to access your payment dashboard</p>
            </div>

            {/* Demo hint */}
            <div className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-6 bg-indigo-50 border border-indigo-200">
              <AlertCircle size={13} className="text-indigo-600 flex-shrink-0 animate-float" />
              <p className="text-indigo-700 text-xs font-medium">
                <strong>Demo mode</strong> — Enter any username &amp; password to sign in
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Username */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">Username</label>
                <div className="relative">
                  <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200
                    ${focused === 'username' ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                    <User size={13} className={`pointer-events-none transition-colors duration-200 ${focused === 'username' ? 'text-indigo-600' : 'text-muted'}`} />
                  </div>
                  <input type="text" placeholder="e.g. student123" value={form.username} autoComplete="username"
                    onFocus={() => setFocused('username')} onBlur={() => setFocused('')}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    className="glow-input w-full bg-white/20 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-500 outline-none focus:border-indigo-500 transition-all" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">Password</label>
                <div className="relative">
                  <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200
                    ${focused === 'password' ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                    <Lock size={13} className={`pointer-events-none transition-colors duration-200 ${focused === 'password' ? 'text-indigo-600' : 'text-muted'}`} />
                  </div>
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} autoComplete="current-password"
                    onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="glow-input w-full bg-white/20 border border-slate-200 rounded-xl pl-12 pr-12 py-3.5 text-sm text-slate-900 placeholder-slate-500 outline-none focus:border-indigo-500 transition-all" />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                    {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="animate-scale-in flex items-center gap-2.5 rounded-xl px-4 py-3 text-rose-600 text-sm bg-rose-50 border border-rose-200">
                  <AlertCircle size={14} className="flex-shrink-0" /> {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="btn btn-primary btn-full mt-1">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full animate-spin-slow" />Signing in…</>
                ) : (
                  <>Sign In <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></>
                )}
              </button>
            </form>

            <div className="gradient-line mt-7 mb-4" />
            <p className="text-center text-muted text-[11px]">University of Technology · FinTech Payment Portal · v2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}


