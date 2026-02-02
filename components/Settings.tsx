
import React, { useState } from 'react';
import { User } from '../types';
import { 
  Server, 
  Settings as SettingsIcon, 
  Globe, 
  ShieldCheck, 
  Database,
  Save,
  Trash2,
  Plus
} from 'lucide-react';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [routers, setRouters] = useState([
    { id: '1', name: 'Main Shop Router', ip: '192.168.88.1', status: 'online' },
    { id: '2', name: 'Branch 2 WiFi', ip: '41.210.144.12', status: 'offline' }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Router Configuration</h3>
          <p className="text-slate-500">Manage your MikroTik device endpoints (v7+ REST API)</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
          <Plus size={20} />
          Add Router
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routers.map((router) => (
          <div key={router.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group overflow-hidden">
            <div className={`absolute top-0 right-0 p-1 px-3 text-[10px] font-black uppercase rounded-bl-xl ${router.status === 'online' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
              {router.status}
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Server size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{router.name}</h4>
                <p className="text-xs font-mono text-slate-400">{router.ip}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Globe size={14} /> REST API Endpoint</span>
                <span className="font-mono text-slate-900">/rest/v1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><ShieldCheck size={14} /> TLS Port</span>
                <span className="font-mono text-slate-900">443</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-slate-50 text-slate-600 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                Edit Config
              </button>
              <button className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Database size={20} className="text-blue-600" />
          General SaaS Settings
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Business Name</label>
            <input type="text" defaultValue="NetVoucher Ltd" className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Voucher Prefix</label>
            <input type="text" defaultValue="NET-" className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Currency Code</label>
            <select className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500">
              <option>UGX</option>
              <option>KES</option>
              <option>TZS</option>
              <option>GHS</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Auto-Withdrawals</label>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium text-slate-600">Enable Daily Disbursement</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-50">
          <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
