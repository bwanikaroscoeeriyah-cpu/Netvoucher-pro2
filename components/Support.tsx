
import React from 'react';
import { MessageCircle, Phone, Mail, FileText, ExternalLink } from 'lucide-react';

const SupportView: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-slate-900 mb-2">Need Assistance?</h3>
        <p className="text-slate-500">Our support team is available 24/7 to help with your router setup or payments.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a 
          href="https://wa.me/256700000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-emerald-500 text-white p-8 rounded-[32px] shadow-xl shadow-emerald-100 flex flex-col items-center gap-4 group hover:bg-emerald-600 transition-all"
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageCircle size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">WhatsApp Chat</p>
            <p className="text-emerald-50 text-sm">Instant technical support</p>
          </div>
        </a>

        <a 
          href="tel:+256700000000"
          className="bg-blue-600 text-white p-8 rounded-[32px] shadow-xl shadow-blue-100 flex flex-col items-center gap-4 group hover:bg-blue-700 transition-all"
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">Call Support</p>
            <p className="text-blue-50 text-sm">Speak with an agent</p>
          </div>
        </a>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
        <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <FileText className="text-blue-600" />
          Frequently Asked Questions
        </h4>
        
        <div className="space-y-4">
          {[
            "How do I connect my MikroTik router?",
            "What are the commission rates?",
            "Can I use my own Mobile Money account?",
            "How to reset my password?"
          ].map((q, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 cursor-pointer group">
              <span className="font-medium text-slate-700">{q}</span>
              <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center p-8 bg-slate-50 rounded-[32px] border border-slate-100">
        <Mail className="mx-auto mb-4 text-slate-300" size={32} />
        <p className="text-slate-500 mb-1">Send us an email</p>
        <p className="text-xl font-bold text-slate-900">support@netvoucher.pro</p>
      </div>
    </div>
  );
};

export default SupportView;
