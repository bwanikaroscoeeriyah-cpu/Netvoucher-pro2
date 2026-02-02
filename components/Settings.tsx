
import React, { useState } from 'react';
import { User } from '../types.ts';
import { 
  Server, 
  Globe, 
  ShieldCheck, 
  Database,
  Save,
  Trash2,
  Plus,
  Cloud,
  CheckCircle,
  Zap
} from 'lucide-react';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [routers, setRouters] = useState([
    { id: '1', name: 'Main Shop Router', ip: '192.168.88.1', status: 'online' }
  ]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">System Configuration</h3>
          <p className="text-slate-500">Manage your MikroTik endpoints and production environment</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><Plus size={20} /> Add Router</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {routers.map((router) => (
            <div key={router.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400"><Server size={24} /></div>
                <div><h4 className="font-bold text-slate-900">{router.name}</h4><p className="text-xs font-mono text-slate-400">{router.ip}</p></div>
              </div>
            </div>
          ))}

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Database size={20} /> SaaS Settings</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <input type="text" defaultValue="NetVoucher Ltd" className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50" />
              <input type="text" defaultValue="NET-" className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50" />
            </div>
            <button className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2"><Save size={20} /> Save Changes</button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Cloud size={20} /> Hosting</h4>
          <div className="p-4 bg-slate-50 rounded-2xl space-y-3">
             <p className="text-sm font-bold text-emerald-600 flex items-center gap-2"><CheckCircle size={14} /> Production Live</p>
             <p className="text-xs text-slate-500 font-mono">Build Pipeline: Vite v6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
