
import React, { useState, useEffect } from 'react';
import { User, MikroTikStats } from '../types.ts';
import { 
  Users, 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  Signal, 
  Wifi, 
  TrendingUp,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface DashboardProps {
  user: User;
}

const mockChartData = [
  { time: '08:00', rx: 24, tx: 18 },
  { time: '10:00', rx: 45, tx: 32 },
  { time: '12:00', rx: 78, tx: 54 },
  { time: '14:00', rx: 62, tx: 48 },
  { time: '16:00', rx: 89, tx: 72 },
  { time: '18:00', rx: 120, tx: 94 },
  { time: '20:00', rx: 85, tx: 64 },
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [stats, setStats] = useState<MikroTikStats>({
    activeUsers: 42,
    rxRate: '24.5 Mbps',
    txRate: '8.2 Mbps',
    uptime: '14d 06h 22m',
    signalStrength: '-64 dBm'
  });

  // Simulated live updates from MikroTik API
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 20) + 30,
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { label: 'Active Users', value: stats.activeUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Download Rate', value: stats.rxRate, icon: ArrowDown, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Upload Rate', value: stats.txRate, icon: ArrowUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Signal Avg.', value: stats.signalStrength, icon: Signal, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Router Monitor</h3>
          <p className="text-slate-500">Real-time performance from Main Router #1</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          System Online
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-slate-900">Network Traffic (MB/s)</h4>
              <p className="text-sm text-slate-500">Last 12 hours</p>
            </div>
            <Activity className="text-slate-300" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorRx" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="rx" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRx)" strokeWidth={2} />
                <Area type="monotone" dataKey="tx" stroke="#9333ea" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panel Stats */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <Wifi className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Clock size={18} className="text-blue-400" />
              Uptime Details
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-slate-400 text-sm">System Uptime</span>
                <span className="font-mono text-sm">{stats.uptime}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-slate-400 text-sm">CPU Load</span>
                <span className="font-mono text-sm text-blue-400">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Memory Free</span>
                <span className="font-mono text-sm text-green-400">184 MB</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" />
              Daily Earnings
            </h4>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              UGX 125,000
            </div>
            <div className="text-sm text-emerald-600 flex items-center gap-1 font-medium">
              +12.4% from yesterday
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex gap-4">
              <div>
                <p className="text-xs text-slate-400 uppercase">Cash</p>
                <p className="text-sm font-bold">UGX 45k</p>
              </div>
              <div className="w-px bg-slate-100"></div>
              <div>
                <p className="text-xs text-slate-400 uppercase">Mobile Money</p>
                <p className="text-sm font-bold">UGX 80k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
