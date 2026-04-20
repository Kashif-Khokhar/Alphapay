import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Bell, Shield, Smartphone, Globe,
  Moon, Sun, ChevronRight, User, Palette, Eye,
  ShieldCheck, TrendingUp, ArrowUpRight,
  Lock, FileText, MapPin, BarChart2, Cookie, UserX
} from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';


export default function Settings() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Account');

  const accountGroups = [
    {
      title: 'Profile',
      items: [
        { icon: User,    label: 'Account Info',   value: 'Edit',       color: 'icon-bg-teal icon-action' },
        { icon: Lock,    label: 'Change Password', value: 'Update',     color: 'icon-bg-rose icon-danger' },
        { icon: Smartphone, label: 'Linked Devices', value: '2 Active', color: 'icon-bg-amber icon-warning' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell,    label: 'Notifications',  value: 'On',          color: 'icon-bg-teal icon-action' },
        { 
          icon: isDarkMode ? Moon : Sun,    
          label: 'Appearance',      
          value: isDarkMode ? 'Dark Mode' : 'Light Mode',  
          color: 'icon-bg-purple icon-premium',
          onClick: toggleTheme 
        },
        { icon: Globe,   label: 'Region',          value: 'Pakistan',    color: 'icon-bg-teal icon-action' },
        { 
          icon: Palette, 
          label: 'Theme Colors',    
          value: 'Royal Indigo',     
          color: 'icon-bg-amber icon-warning',
          onClick: () => alert('Color customization coming soon!') 
        },
      ]
    },
    {
      title: 'Security',
      items: [
        { icon: Shield,     label: 'Face ID / Touch ID', value: 'Active', color: 'icon-bg-emerald icon-success' },
        { icon: Smartphone, label: 'Two-Factor Auth',    value: 'Off',    color: 'icon-bg-rose icon-danger' },
      ]
    },
  ];

  const privacyGroups = [
    {
      title: 'Data & Tracking',
      items: [
        { icon: Eye,      label: 'Privacy Mode',       value: 'Hidden',   color: 'icon-bg-violet icon-info' },
        { icon: Cookie,   label: 'Cookie Preferences', value: 'Essential', color: 'icon-bg-amber icon-warning' },
        { icon: BarChart2,label: 'Analytics & Usage',  value: 'Off',      color: 'icon-bg-teal icon-action' },
      ]
    },
    {
      title: 'Permissions',
      items: [
        { icon: MapPin,   label: 'Location Access',    value: 'Denied',   color: 'icon-bg-rose icon-danger' },
        { icon: FileText, label: 'Activity History',   value: 'Clear',    color: 'icon-bg-purple icon-premium' },
        { icon: User,     label: 'Data Permissions',   value: 'Managed',  color: 'icon-bg-teal icon-action' },
      ]
    },
    {
      title: 'Identity',
      items: [
        { icon: UserX,    label: 'Anonymous Mode',     value: 'Off',      color: 'icon-bg-violet icon-info' },
        { icon: Shield,   label: 'Ad Preferences',     value: 'Limited',  color: 'icon-bg-emerald icon-success' },
      ]
    },
  ];


  const DAILY_LIMIT   = 400000;
  const DAILY_SPENT   = 60000;
  const MONTHLY_LIMIT = 1000000;
  const MONTHLY_SPENT = 450000;

  const groups = activeTab === 'Account' ? accountGroups : privacyGroups;

  return (
    <div className="min-h-screen pb-40 px-4 sm:px-8 md:px-12 flex flex-col items-center" style={{ paddingTop: '100px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[850px] mx-auto"
      >
        <div className="flex items-center gap-4 mb-10 text-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full glass-premium flex items-center justify-center text-white hover:bg-white/10 transition-colors absolute left-4 sm:left-auto sm:-translate-x-32"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black text-secondary tracking-tighter">Settings</h1>
        </div>

        <div className="glass-premium rounded-3xl shadow-xl overflow-hidden">
           {/* Tabs */}
           <div className="flex p-2 bg-white/5 border-b border-white/10">
              {['Account', 'Limits', 'Privacy'].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest rounded-3xl transition-all ${activeTab === tab ? 'glass-premium text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                 >
                   {tab}
                 </button>
              ))}
           </div>

           {/* Account & Privacy tabs — each with own groups */}
           {activeTab !== 'Limits' && (
             <div className="px-6 md:px-10 pt-10 pb-8 space-y-10">
               {groups.map((group) => (
                 <div key={group.title}>
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 px-4">{group.title}</h3>
                   <div className="space-y-3">
                     {group.items.map((item) => (
                       <button 
                         key={item.label} 
                         onClick={item.onClick}
                         className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/10"
                       >
                         <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                              <item.icon size={24} strokeWidth={2.5} />
                            </div>
                            <span className="text-base font-black text-secondary">{item.label}</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.value}</span>
                            <ChevronRight size={18} className="text-slate-200 group-hover:text-slate-400 transition-colors group-hover:translate-x-1" />
                         </div>
                       </button>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           )}

           {/* Limits tab — Transfer Limits */}
           {activeTab === 'Limits' && (
             <div className="px-6 md:px-10 pt-10 pb-8 space-y-8">
               {/* Header */}
               <div className="flex items-center gap-4 px-4">
                 <div className="w-14 h-14 rounded-2xl icon-bg-orange flex items-center justify-center shadow-sm">
                   <ShieldCheck size={28} className="icon-spending" strokeWidth={2.5} />
                 </div>
                 <div>
                   <h3 className="text-base font-black text-secondary uppercase tracking-tight">Transfer Limits</h3>
                   <p className="text-[10px] icon-spending font-black uppercase tracking-[0.3em] mt-1">Verified Account</p>
                 </div>
               </div>

               {/* Daily */}
               <div className="bg-white/5 rounded-3xl p-6 space-y-5 border border-white/10 flex flex-col items-center sm:items-stretch">
                 <div className="flex items-center gap-3">
                   <TrendingUp size={16} className="icon-success" strokeWidth={3} />
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Daily Limit</span>
                 </div>
                 <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 text-center sm:text-left">
                   <div>
                     <p className="text-3xl font-black text-secondary tracking-tighter">
                       PKR {DAILY_SPENT.toLocaleString()}
                     </p>
                     <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-1 px-2">Total spent today</p>
                   </div>
                   <p className="text-sm font-black text-slate-400 uppercase tracking-widest">of PKR {DAILY_LIMIT.toLocaleString()}</p>
                 </div>
                 <div className="h-2 w-full bg-white/20/50 rounded-full overflow-hidden">
                   <div
                     className="h-full bg-emerald-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                     style={{ width: `${(DAILY_SPENT / DAILY_LIMIT) * 100}%` }}
                   />
                 </div>
                 <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-2">
                   PKR {(DAILY_LIMIT - DAILY_SPENT).toLocaleString()} remaining today
                 </p>
               </div>

               {/* Monthly */}
               <div className="bg-white/5 rounded-3xl p-6 space-y-5 border border-white/10 flex flex-col items-center sm:items-stretch">
                 <div className="flex items-center gap-3">
                   <TrendingUp size={16} className="icon-action" strokeWidth={3} />
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Monthly Limit</span>
                 </div>
                 <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 text-center sm:text-left">
                   <div>
                     <p className="text-3xl font-black text-secondary tracking-tighter">
                       PKR {MONTHLY_SPENT.toLocaleString()}
                     </p>
                     <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-1 px-2">Total spent this month</p>
                   </div>
                   <p className="text-sm font-black text-slate-400 uppercase tracking-widest">of PKR {MONTHLY_LIMIT.toLocaleString()}</p>
                 </div>
                 <div className="h-2 w-full bg-white/20/50 rounded-full overflow-hidden">
                   <div
                     className="h-full bg-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                     style={{ width: `${(MONTHLY_SPENT / MONTHLY_LIMIT) * 100}%` }}
                   />
                 </div>
                 <p className="text-[11px] font-black text-indigo-600 uppercase tracking-widest px-2">
                   PKR {(MONTHLY_LIMIT - MONTHLY_SPENT).toLocaleString()} remaining this month
                 </p>
               </div>

                {/* Request increase */}
                <button className="w-full bg-secondary text-primary py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-3">
                  <ArrowUpRight size={18} strokeWidth={3} /> Request Limit Increase
                </button>
             </div>
           )}

             <div className="bg-rose-500/10 p-8 flex flex-col items-center border-t border-rose-500/20">
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.5em] mb-6">Account Security</p>
                <button className="w-full max-w-sm glass-premium text-rose-500 font-black py-5 rounded-[24px] shadow-lg border border-rose-500/20 hover:bg-rose-500 hover:text-white hover:scale-[1.02] hover:border-rose-500 transform transition-all duration-300 uppercase tracking-widest text-xs">
                  Deactivate Account
                </button>
             </div>
         </div>
         {/* Mobile Spacer to clear the bottom dock */}
         <div className="h-40 md:hidden" />
      </motion.div>
    </div>
  );
}
