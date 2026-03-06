import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Bell, Shield, Smartphone, Globe, 
  Moon, ChevronRight, User, Palette, Eye
} from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Account');

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', value: 'On', color: 'bg-blue-50 text-blue-600' },
        { icon: Moon, label: 'Appearance', value: 'Light Mode', color: 'bg-purple-50 text-purple-600' },
        { icon: Globe, label: 'Region', value: 'Pakistan', color: 'bg-teal-50 text-teal-600' },
      ]
    },
    {
      title: 'Security',
      items: [
        { icon: Shield, label: 'Face ID / Touch ID', value: 'Active', color: 'bg-emerald-50 text-emerald-600' },
        { icon: Smartphone, label: 'Two-Factor Auth', value: 'Off', color: 'bg-rose-50 text-rose-600' },
        { icon: Eye, label: 'Privacy Mode', value: 'Hidden', color: 'bg-slate-100 text-slate-600' },
      ]
    },
    {
      title: 'System',
      items: [
        { icon: Palette, label: 'Theme Colors', value: 'Emerald', color: 'bg-amber-50 text-amber-600' },
        { icon: User, label: 'Data Permissions', value: 'Managed', color: 'bg-indigo-50 text-indigo-600' },
      ]
    }
  ];

  return (
    <div className="min-h-screen pb-32 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #fcfcfc 0%, #f1f5f9 100%)', paddingTop: '140px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto"
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

        <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
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

           <div className="p-8 space-y-10">
              {settingsGroups.map((group) => (
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
