
import React, { useState } from 'react';
import { User, VoucherPlan } from '../types';
import { 
  Ticket, 
  Smartphone, 
  CreditCard, 
  CheckCircle2, 
  Loader2,
  Copy,
  Zap,
  Globe
} from 'lucide-react';

const PLANS: VoucherPlan[] = [
  { id: '1', name: '1 Hour Express', price: 1000, duration: '1h' },
  { id: '2', name: 'Standard Day', price: 3000, duration: '24h' },
  { id: '3', name: 'Weekly Unlimited', price: 15000, duration: '7d' },
  { id: '4', name: 'Monthly Gold', price: 45000, duration: '30d' },
];

interface VoucherSystemProps {
  user: User;
}

const VoucherSystem: React.FC<VoucherSystemProps> = ({ user }) => {
  const [selectedPlan, setSelectedPlan] = useState<VoucherPlan | null>(null);
  const [step, setStep] = useState<'select' | 'payment' | 'success'>('select');
  const [phone, setPhone] = useState(user.phone);
  const [loading, setLoading] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');

  const handleBuy = async () => {
    setLoading(true);
    // 1. Trigger Mobile Money Payment (e.g. Flutterwave)
    // 2. Wait for Webhook/Callback
    // 3. Call MikroTik REST API to create user: /ip/hotspot/user/add
    
    setTimeout(() => {
      const mockCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      setVoucherCode(mockCode);
      setLoading(false);
      setStep('success');
    }, 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(voucherCode);
    alert('Code copied to clipboard!');
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-emerald-600 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-white w-10 h-10" />
          </div>
          <h3 className="text-white text-2xl font-bold">Payment Confirmed!</h3>
          <p className="text-emerald-100 mt-1">Your WiFi voucher is ready to use</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-slate-500 text-sm mb-2 uppercase font-bold tracking-widest">Your Voucher Code</p>
            <div className="text-4xl font-black text-slate-900 tracking-wider mb-4">{voucherCode}</div>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 mx-auto text-blue-600 font-semibold hover:text-blue-700"
            >
              <Copy size={18} />
              Copy Code
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Plan</span>
              <span className="font-bold text-slate-900">{selectedPlan?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Duration</span>
              <span className="font-bold text-slate-900">{selectedPlan?.duration}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Transaction ID</span>
              <span className="font-mono text-slate-400">#NET-{Math.floor(Math.random() * 999999)}</span>
            </div>
          </div>

          <button 
            onClick={() => { setStep('select'); setSelectedPlan(null); }}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Buy Another Voucher
          </button>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
        <button onClick={() => setStep('select')} className="text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-2 font-medium">
          &larr; Back to Plans
        </button>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-600 p-3 rounded-2xl text-white">
            <Smartphone size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-slate-900">Checkout</h3>
            <p className="text-sm text-slate-500">Confirm your Mobile Money details</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-slate-500">Total to Pay</span>
              <span className="text-lg font-bold text-blue-600">UGX {selectedPlan?.price.toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-400">Plan: {selectedPlan?.name}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Phone Number for Prompt</label>
            <input 
              type="tel" 
              className="w-full px-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
            <Zap className="text-blue-600 shrink-0" size={20} />
            <p className="text-xs text-blue-700 leading-relaxed">
              You will receive a popup on your phone to enter your PIN and authorize this payment.
            </p>
          </div>

          <button 
            disabled={loading}
            onClick={handleBuy}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Smartphone />}
            {loading ? 'Processing Payment...' : 'Pay with Mobile Money'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">WiFi Plans</h3>
          <p className="text-slate-500">Select a package to start browsing</p>
        </div>
        <div className="flex items-center gap-2 text-slate-400 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <Globe size={18} />
          <span className="text-sm font-medium">Main Station (Kampala)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => (
          <div 
            key={plan.id}
            className={`
              relative p-6 rounded-3xl border-2 transition-all cursor-pointer group
              ${selectedPlan?.id === plan.id 
                ? 'border-blue-600 bg-blue-50 shadow-blue-100 shadow-lg' 
                : 'border-slate-100 bg-white hover:border-slate-300'}
            `}
            onClick={() => setSelectedPlan(plan)}
          >
            {plan.id === '3' && (
              <div className="absolute -top-3 left-6 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${selectedPlan?.id === plan.id ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                <Ticket size={24} />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{plan.duration}</span>
              </div>
            </div>

            <h4 className="font-bold text-slate-900 text-lg mb-1">{plan.name}</h4>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-sm font-bold text-slate-400">UGX</span>
              <span className="text-2xl font-black text-slate-900">{plan.price.toLocaleString()}</span>
            </div>

            <button 
              className={`
                w-full py-3 rounded-xl font-bold transition-all
                ${selectedPlan?.id === plan.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
              `}
            >
              Select Package
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Order Summary</p>
              <p className="font-bold text-lg">{selectedPlan.name}</p>
            </div>
            <button 
              onClick={() => setStep('payment')}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg"
            >
              Continue to Pay
              <Smartphone size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherSystem;
