
import React, { useState } from 'react';
import { User, Transaction } from '../types';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  Plus, 
  MoreVertical,
  Banknote,
  Percent,
  Lock,
  Loader2
} from 'lucide-react';

interface WalletViewProps {
  user: User;
}

const WalletView: React.FC<WalletViewProps> = ({ user }) => {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const mockTransactions: Transaction[] = [
    { id: '1', amount: 3000, type: 'sale', method: 'mobile_money', timestamp: new Date(), status: 'completed', description: 'Voucher Sale - 24h Plan' },
    { id: '2', amount: 300, type: 'commission', method: 'mobile_money', timestamp: new Date(), status: 'completed', description: 'Commission (10%) - Admin Fee' },
    { id: '3', amount: 15000, type: 'withdrawal', method: 'mobile_money', timestamp: new Date(Date.now() - 86400000), status: 'completed', description: 'Withdraw to +256700000000' },
  ];

  const handleWithdraw = () => {
    setLoading(true);
    // Real flow: verify password -> call Mobile Money API for disbursement -> deduct balance
    setTimeout(() => {
      setLoading(false);
      setShowWithdraw(false);
      alert('Withdrawal request initiated successfully!');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Wallet Balance Card */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="relative">
            <p className="text-white/70 text-sm font-medium mb-1">Available Funds</p>
            <h3 className="text-4xl font-black mb-8">UGX {user.walletBalance.toLocaleString()}</h3>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setShowWithdraw(true)}
                className="flex-1 bg-white text-blue-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-lg"
              >
                <ArrowUpRight size={20} />
                Withdraw
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <Percent size={18} className="text-blue-600" />
            Commission Stats
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Today Earned</p>
              <p className="text-lg font-bold text-slate-900">UGX 12,500</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">MTN/Airtel Fee</p>
              <p className="text-lg font-bold text-slate-900">10%</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 italic">
            * 10% commission on Mobile Money, 3% on Cash sales.
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <History size={18} className="text-slate-400" />
            Recent Activity
          </h4>
          <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
        </div>

        <div className="divide-y divide-slate-50">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`
                  p-3 rounded-2xl 
                  ${tx.type === 'sale' ? 'bg-emerald-50 text-emerald-600' : ''}
                  ${tx.type === 'withdrawal' ? 'bg-orange-50 text-orange-600' : ''}
                  ${tx.type === 'commission' ? 'bg-blue-50 text-blue-600' : ''}
                `}>
                  {tx.type === 'sale' && <Plus size={20} />}
                  {tx.type === 'withdrawal' && <ArrowUpRight size={20} />}
                  {tx.type === 'commission' && <Percent size={20} />}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{tx.description}</p>
                  <p className="text-xs text-slate-400 font-medium">
                    {tx.timestamp.toLocaleDateString()} at {tx.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.type === 'sale' || tx.type === 'commission' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {tx.type === 'sale' || tx.type === 'commission' ? '+' : '-'} UGX {tx.amount.toLocaleString()}
                </p>
                <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Withdraw Funds</h3>
                <button onClick={() => setShowWithdraw(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <Plus className="rotate-45" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Amount to Withdraw (UGX)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-slate-400 font-bold">UGX</span>
                    <input 
                      type="number" 
                      placeholder="Min 5,000"
                      className="w-full pl-16 pr-4 py-4 rounded-2xl border-2 border-slate-100 outline-none focus:border-blue-500 text-xl font-black"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Verify Identity</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                    <input 
                      type="password" 
                      placeholder="Your Password"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 outline-none focus:border-blue-500"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-3 items-start">
                  <div className="bg-orange-100 p-1.5 rounded-lg text-orange-600">
                    <Banknote size={16} />
                  </div>
                  <p className="text-xs text-orange-700 leading-relaxed font-medium">
                    Funds will be sent to your registered Mobile Money number: <br/> 
                    <span className="font-bold">{user.phone}</span>
                  </p>
                </div>

                <button 
                  disabled={loading || !amount || !password}
                  onClick={handleWithdraw}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <ArrowUpRight />}
                  {loading ? 'Processing...' : 'Confirm Withdrawal'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletView;
