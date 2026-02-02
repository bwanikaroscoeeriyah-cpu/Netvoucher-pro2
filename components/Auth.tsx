
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Mail, Phone, Lock, Wifi, ArrowRight } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, call Firebase Auth
    onAuthSuccess({
      id: 'mock-123',
      email: email || 'admin@wifi.pro',
      phone: phone || '+256700000000',
      role: UserRole.MASTER_ADMIN,
      walletBalance: 250000
    });
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 pb-0 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Wifi className="text-blue-600 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">NetVoucher Pro</h2>
          <p className="text-slate-500 mt-2">Manage your WiFi business with ease</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="email" 
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="tel" 
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="+256 7xx xxx xxx"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="password" 
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="p-6 bg-slate-50 text-center border-t border-slate-100">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold text-sm hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
