import React, { useState } from 'react';
import { MessageSquare, X, Users, PhoneCall, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/polymerData';

interface FloatingWhatsAppProps {
  onOpenQuote: (type: 'buy' | 'sell' | 'quote') => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenQuote }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Card Header */}
          <div className="bg-[#0b1e36] text-white p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Trading Desk Online</span>
            </div>
            <h4 className="font-bold text-base tracking-tight">Newways Polymer Network</h4>
            <p className="text-slate-300 text-xs mt-0.5">
              Instant prices, verified stock, and active sourcing desk.
            </p>
          </div>

          {/* Quick Action Options */}
          <div className="p-3 space-y-2 bg-slate-50">
            {/* Join Community Option */}
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-3 bg-emerald-50 hover:bg-emerald-100/80 rounded-xl border border-emerald-200 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 group-hover:text-emerald-700">
                    Join WhatsApp Network
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-emerald-800 mt-0.5 leading-snug">
                  Get daily stock updates, buying requirements & import lots.
                </p>
              </div>
            </a>

            {/* Direct One-on-One Desk */}
            <a
              href={COMPANY_INFO.directWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0b1e36] text-white flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-sky-700">
                    Direct WhatsApp Desk
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">+91 98797 47777</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  Chat directly with our polymer sourcing executives in Gujarat.
                </p>
              </div>
            </a>

            {/* In-app Quote Trigger */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenQuote('buy');
              }}
              className="w-full text-center py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold tracking-wide transition-colors"
            >
              Submit Buying Requirement
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Newways WhatsApp Desk"
        className="relative group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        {/* Pulsing beacon */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white"></span>

        {/* WhatsApp Icon */}
        <svg 
          className="w-6 h-6 fill-current" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.954.558 3.784 1.527 5.342L2 22l4.82-1.488A9.972 9.972 0 0 0 12.03 22c5.537 0 10.031-4.495 10.031-10.031C22.062 6.495 17.568 2 12.031 2zm5.836 14.199c-.244.686-1.223 1.328-1.745 1.41-.497.079-1.12.112-1.808-.109-.434-.14-1.002-.328-1.728-.643-3.048-1.32-5.041-4.417-5.195-4.621-.153-.204-1.242-1.654-1.242-3.155 0-1.502.787-2.241 1.066-2.528.279-.287.61-.359.814-.359.204 0 .408.002.585.012.188.01.442-.07.69.528.256.619.865 2.112.941 2.265.076.153.127.332.025.536-.102.204-.153.332-.305.511-.153.179-.32.4-.457.537-.153.153-.312.319-.134.625.178.306.791 1.303 1.696 2.109 1.166 1.037 2.148 1.359 2.454 1.512.306.153.484.127.662-.077.178-.204.764-.891.968-1.196.204-.306.408-.255.687-.153.28.102 1.778.839 2.083.992.305.153.508.23.585.357.076.128.076.738-.168 1.424z" />
        </svg>

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider leading-none opacity-90">Polymer Desk</span>
          <span className="text-xs font-black tracking-tight leading-tight">Chat on WhatsApp</span>
        </div>
      </button>
    </div>
  );
};
