import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Bell, Shield, Smartphone, Globe,
  Moon, ChevronRight, User, Palette, Eye,
  ShieldCheck, TrendingUp, ArrowUpRight,
  Lock, FileText, MapPin, BarChart2, Cookie, UserX
} from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Account');

  const accountGroups = [
    {
      title: 'Profile',
      items: [
        { icon: User,    label: 'Account Info',   value: 'Edit',       color: 'bg-indigo-50 text-indigo-600' },
        { icon: Lock,    label: 'Change Password', value: 'Update',     color: 'bg-rose-50 text-rose-600' },
        { icon: Smartphone, label: 'Linked Devices', value: '2 Active', color: 'bg-amber-50 text-amber-600' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell,    label: 'Notifications',  value: 'On',          color: 'bg-blue-50 text-blue-600' },
        { icon: Moon,    label: 'Appearance',      value: 'Light Mode',  color: 'bg-purple-50 text-purple-600' },
        { icon: Globe,   label: 'Region',          value: 'Pakistan',    color: 'bg-teal-50 text-teal-600' },
        { icon: Palette, label: 'Theme Colors',    value: 'Emerald',     color: 'bg-amber-50 text-amber-600' },
      ]
    },
    {
      title: 'Security',
      items: [
        { icon: Shield,     label: 'Face ID / Touch ID', value: 'Active', color: 'bg-emerald-50 text-emerald-600' },
        { icon: Smartphone, label: 'Two-Factor Auth',    value: 'Off',    color: 'bg-rose-50 text-rose-600' },
      ]
    },
  ];

  const privacyGroups = [
    {
      title: 'Data & Tracking',
      items: [
        { icon: Eye,      label: 'Privacy Mode',       value: 'Hidden',   color: 'bg-slate-100 text-slate-600' },
        { icon: Cookie,   label: 'Cookie Preferences', value: 'Essential', color: 'bg-amber-50 text-amber-600' },
        { icon: BarChart2,label: 'Analytics & Usage',  value: 'Off',      color: 'bg-indigo-50 text-indigo-600' },
      ]
    },
    {
      title: 'Permissions',
      items: [
        { icon: MapPin,   label: 'Location Access',    value: 'Denied',   color: 'bg-rose-50 text-rose-600' },
        { icon: FileText, label: 'Activity History',   value: 'Clear',    color: 'bg-purple-50 text-purple-600' },
        { icon: User,     label: 'Data Permissions',   value: 'Managed',  color: 'bg-teal-50 text-teal-600' },
      ]
    },
    {
      title: 'Identity',
      items: [
        { icon: UserX,    label: 'Anonymous Mode',     value: 'Off',      color: 'bg-slate-100 text-slate-500' },
        { icon: Shield,   label: 'Ad Preferences',     value: 'Limited',  color: 'bg-emerald-50 text-emerald-600' },
      ]
    },
  ];

  const DAILY_LIMIT   = 400000;
  const DAILY_SPENT   = 60000;
  const MONTHLY_LIMIT = 1000000;
  const MONTHLY_SPENT = 450000;

  const groups = activeTab === 'Account' ? accountGroups : privacyGroups;

  return (
    <div className="min-h-screen pb-40 px-4 sm:px-6 flex flex-col items-center" style={{ background: 'linear-gradient(135deg, #fcfcfc 0%, #f1f5f9 100%)', paddingTop: '100px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <div className="flex items-center gap-4 mb-10 text-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors absolute left-4 sm:left-auto sm:-translate-x-32"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black text-secondary tracking-tighter">Settings</h1>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100">
           {/* Tabs */}
           <div className="flex p-2 bg-slate-50/50 border-b border-slate-100">
              {['Account', 'Wallet', 'Privacy'].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${activeTab === tab ? 'bg-white text-secondary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   {tab}
                 </button>
              ))}
           </div>

           {/* Account & Privacy tabs — each with own groups */}
           {activeTab !== 'Wallet' && (
             <div className="px-10 pt-12 pb-8 space-y-10">
               {groups.map((group) => (
                 <div key={group.title}>
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">{group.title}</h3>
                   <div className="space-y-2">
                     {group.items.map((item) => (
                       <button key={item.label} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group">
                         <div className="flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                              <item.icon size={20} />
                            </div>
                            <span className="text-sm font-black text-secondary">{item.label}</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.value}</span>
                            <ChevronRight size={16} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
                         </div>
                       </button>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           )}

           {/* Wallet tab — Transfer Limits */}
           {activeTab === 'Wallet' && (
             <div className="px-10 pt-12 pb-8 space-y-6">
               {/* Header */}
               <div className="flex items-center gap-3">
                 <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center">
                   <ShieldCheck size={20} className="text-orange-500" strokeWidth={1.8} />
                 </div>
                 <div>
                   <h3 className="text-sm font-black text-slate-800">Transfer Limits</h3>
                   <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Verified Account</p>
                 </div>
               </div>

               {/* Daily */}
               <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                 <div className="flex items-center gap-2 mb-1">
                   <TrendingUp size={13} className="text-teal-500" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Limit</span>
                 </div>
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-2xl font-black text-slate-800 tracking-tighter">
                       PKR {DAILY_SPENT.toLocaleString()}
                     </p>
                     <p className="text-[10px] text-slate-400 font-medium mt-0.5">spent today</p>
                   </div>
                   <p className="text-xs font-black text-slate-500">of PKR {DAILY_LIMIT.toLocaleString()}</p>
                 </div>
                 <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                   <div
                     className="h-full bg-teal-500 rounded-full transition-all duration-700"
                     style={{ width: `${(DAILY_SPENT / DAILY_LIMIT) * 100}%` }}
                   />
                 </div>
                 <p className="text-[10px] text-slate-400">
                   PKR {(DAILY_LIMIT - DAILY_SPENT).toLocaleString()} remaining today
                 </p>
               </div>

               {/* Monthly */}
               <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                 <div className="flex items-center gap-2 mb-1">
                   <TrendingUp size={13} className="text-indigo-500" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Limit</span>
                 </div>
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-2xl font-black text-slate-800 tracking-tighter">
                       PKR {MONTHLY_SPENT.toLocaleString()}
                     </p>
                     <p className="text-[10px] text-slate-400 font-medium mt-0.5">spent this month</p>
                   </div>
                   <p className="text-xs font-black text-slate-500">of PKR {MONTHLY_LIMIT.toLocaleString()}</p>
                 </div>
                 <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                   <div
                     className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                     style={{ width: `${(MONTHLY_SPENT / MONTHLY_LIMIT) * 100}%` }}
                   />
                 </div>
                 <p className="text-[10px] text-slate-400">
                   PKR {(MONTHLY_LIMIT - MONTHLY_SPENT).toLocaleString()} remaining this month
                 </p>
               </div>

               {/* Request increase */}
               <button className="btn btn-outline btn-full flex items-center gap-2">
                 <ArrowUpRight size={14} /> Request Limit Increase
               </button>
             </div>
           )}

           <div className="bg-rose-50 p-8 flex flex-col items-center">
              <p className="text-xs font-black text-rose-600 uppercase tracking-widest mb-4">Danger Zone</p>
              <button className="w-full bg-white text-rose-500 font-black py-4 rounded-2xl shadow-sm border border-rose-100 hover:bg-rose-500 hover:text-white transition-all">
                Delete Account
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}


