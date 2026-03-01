import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, User, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { loginUser } from '../services/api';

export default function Login() {
  const [form, setForm]         = useState({ username:'', password:'' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username.trim() || !form.password.trim()) { setError('Please enter both fields.'); return; }
    setLoading(true);
    try { await loginUser(form.username, form.password); navigate('/dashboard'); }
    catch (err) { setError(err.message || 'Login failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#080808] relative overflow-hidden">

      {/* Animated blobs */}
      <div className="absolute w-[520px] h-[520px] rounded-full bg-emerald-600/12 blur-[120px] -top-52 -left-52 animate-blob-1 pointer-events-none" />
      <div className="absolute w-[420px] h-[420px] rounded-full bg-amber-500/8  blur-[120px] -bottom-40 -right-40 animate-blob-2 pointer-events-none" />

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)', backgroundSize:'44px 44px' }} />

      {/* Card */}
      <div className="hover-card relative w-full max-w-md bg-[#111111] border border-white/8 rounded-3xl p-8 shadow-2xl shadow-black/70 animate-scale-in z-10">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="logo-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-amber-500 flex items-center justify-center shadow-xl shadow-emerald-500/35 cursor-pointer">
            <Zap size={26} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black gradient-text tracking-tight">UniPay</h1>
            <p className="text-slate-500 text-sm mt-1">University Payment Portal</p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="flex items-center gap-2.5 bg-emerald-500/8 border border-emerald-500/18 rounded-xl px-4 py-3 mb-6 text-emerald-300 text-xs font-medium">
          <AlertCircle size={14} className="flex-shrink-0 animate-float" />
          Demo mode — enter any username &amp; password to sign in
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Username</label>
            <div className="relative group">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none transition-colors duration-200 group-focus-within:text-emerald-400" />
              <input type="text" placeholder="e.g. student123" value={form.username} autoComplete="username"
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="w-full bg-white/4 border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 focus:-translate-y-px" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Password</label>
            <div className="relative group">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none transition-colors duration-200 group-focus-within:text-emerald-400" />
              <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} autoComplete="current-password"
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full bg-white/4 border border-white/8 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 focus:-translate-y-px" />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 transition-colors duration-200 hover:scale-110">
                {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="animate-scale-in flex items-center gap-2 bg-rose-500/10 border border-rose-500/25 rounded-xl px-4 py-3 text-rose-400 text-sm">
              <AlertCircle size={14}/> {error}
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="btn-glow w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-emerald-500/30 disabled:opacity-60 disabled:cursor-not-allowed mt-1">
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" /> Signing in…</>
              : <>Sign In <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1"/></>
            }
          </button>
        </form>

        <p className="text-center text-slate-700 text-[11px] mt-6">University of Technology · FinTech Payment Portal</p>
      </div>
    </div>
  );
}
