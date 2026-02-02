import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  Wallet, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Wifi,
  Smartphone
} from 'lucide-react';
import { User, UserRole } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import VoucherSystem from './components/VoucherSystem.tsx';
import WalletView from './components/WalletView.tsx';
import SettingsView from './components/Settings.tsx';
import SupportView from './components/Support.tsx';
import Auth from './components/Auth.tsx';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Mock initial session
  useEffect(() => {
    // Check local storage or firebase auth state here
  }, []);

  if (!user) {
    return <Auth onAuthSuccess={(u) => setUser(u)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'vouchers': return <VoucherSystem user={user} />;
      case 'wallet': return <WalletView user={user} />;
      case 'settings': return <SettingsView user={user} />;
      case 'support': return <SupportView />;
      default: return <Dashboard user={user} />;
    }
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'vouchers', icon: Ticket, label: 'Buy Voucher' },
    { id: 'wallet', icon: Wallet, label: 'My Wallet' },
    { id: 'settings', icon: Settings, label: 'Router Setup' },
    { id: 'support', icon: HelpCircle, label: 'Support' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Wifi className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">NetVoucher <span className="text-blue-600">Pro</span></h1>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl mb-4">
              <p className="text-xs text-slate-500 mb-1">Current Balance</p>
              <p className="text-lg font-bold text-slate-900">UGX {user.walletBalance.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => setUser(null)}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900">{user.email.split('@')[0]}</p>
                <p className="text-xs text-slate-500 uppercase">{user.role.replace('_', ' ')}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                {user.email[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;