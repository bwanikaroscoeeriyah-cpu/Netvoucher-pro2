
import React, { useState } from 'react';
import { User, Transaction } from '../types.ts';
import { 
  ArrowUpRight, 
  History, 
  Plus, 
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
  ];

  const handleWithdraw = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowWithdraw(false);
      alert('Withdrawal request initiated successfully!');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden">
          <div className="relative">
            <p className="text-white/70 text-sm font-medium mb-1">Available Funds</p>
            <h3 className="text-4xl font-black mb-8">UGX {user.walletBalance.toLocaleString()}</h3>
            <button onClick={() => setShowWithdraw(true)} className="w-full bg-white text-blue-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-lg">
              <ArrowUpRight size={20} /> Withdraw
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-bold text-slate-900 flex items-center gap-2"><History size={18} /> Recent Activity</h4>
        </div>
        <div className="divide-y divide-slate-50">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${tx.type === 'sale' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {tx.type === 'sale' ? <Plus size={20} /> : <Percent size={20} />}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{tx.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-600">+ UGX {tx.amount.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showWithdraw && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden">
            <div className="p-8 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Withdraw Funds</h3>
              <input type="number" placeholder="Amount" className="w-full p-4 rounded-2xl border-2 border-slate-100" value={amount} onChange={e => setAmount(e.target.value)} />
              <input type="password" placeholder="Verify Password" className="w-full p-4 rounded-2xl border-2 border-slate-100" value={password} onChange={e => setPassword(e.target.value)} />
              <button onClick={handleWithdraw} disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black">
                {loading ? <Loader2 className="animate-spin" /> : 'Confirm Withdrawal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletView;
