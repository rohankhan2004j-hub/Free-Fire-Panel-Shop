import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCheck } from 'lucide-react';
import { SiteConfig } from '../types';

interface WhatsAppWidgetProps {
  config: SiteConfig;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const rawPhone = config.sellerWhatsApp.replace(/[^0-9]/g, '');

  const openWhatsApp = (customText?: string) => {
    const textToSend = customText || message || 'আসসালামু আলাইকুম ভাই, ফ্রি ফায়ার প্যানেল নিতে চাই। বিস্তারিত বলবেন?';
    const url = `https://wa.me/${rawPhone}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickQuestion = (q: string) => {
    openWhatsApp(q);
  };

  return (
    <>
      {/* Interactive Quick Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[320px] sm:w-[360px] bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6">
          {/* Header */}
          <div className="bg-emerald-700 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  FF
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-800 rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>Panel Seller Support</span>
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-mono">
                  <CheckCheck className="w-3 h-3" /> WhatsApp: {config.sellerWhatsApp}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors text-emerald-100 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-3.5 bg-slate-950/80 space-y-2.5 text-xs">
            <div className="bg-slate-800 text-slate-100 p-2.5 rounded-lg rounded-tl-none border border-slate-700/60 max-w-[85%]">
              আসসালামু আলাইকুম! ফ্রি ফায়ার মোবাইল বা পিসি প্যানেল সম্পর্কিত যেকোনো তথ্যের জন্য সরাসরি কথা বলুন।
              <span className="block text-[10px] text-slate-400 mt-1">সকাল ৯টা - রাত ১২টা</span>
            </div>

            {/* Quick Questions */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-400 mb-1.5">
                দ্রুত প্রশ্ন বেছে নিন:
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickQuestion('ভাই মোবাইল প্যানেলের অফার প্রাইস কত এবং কীভাবে নেব?')}
                  className="text-left text-emerald-400 hover:text-emerald-300 bg-emerald-950/50 hover:bg-emerald-950/80 border border-emerald-500/30 p-2 rounded-lg transition-colors font-medium text-[11px]"
                >
                  👉 মোবাইল প্যানেলের অফার প্রাইস কত?
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickQuestion('ভাই এটা কি ১০০% অ্যান্টি-ব্যান? মেইন আইডিতে চালানো যাবে?')}
                  className="text-left text-emerald-400 hover:text-emerald-300 bg-emerald-950/50 hover:bg-emerald-950/80 border border-emerald-500/30 p-2 rounded-lg transition-colors font-medium text-[11px]"
                >
                  👉 এটা কি ১০০% অ্যান্টি-ব্যান ও সেফ?
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickQuestion('আমি বিকাশে টাকা পাঠিয়েছি, আমার ট্রানজেকশন ভেরিফাই করে দিন।')}
                  className="text-left text-emerald-400 hover:text-emerald-300 bg-emerald-950/50 hover:bg-emerald-950/80 border border-emerald-500/30 p-2 rounded-lg transition-colors font-medium text-[11px]"
                >
                  👉 বিকাশ/নগদে টাকা পাঠিয়েছি, কী পাঠান
                </button>
              </div>
            </div>

            {/* Input Form */}
            <div className="pt-2 flex items-center gap-1.5">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openWhatsApp();
                }}
                placeholder="এখানে মেসেজ লিখুন..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => openWhatsApp()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition-colors shadow"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Green WhatsApp Button matching screenshot ("How can I help you?") */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.45)] transition-all active:scale-95 border-2 border-white/20 group"
          aria-label="WhatsApp Support"
        >
          {/* WhatsApp SVG Icon */}
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              className="w-5 h-5 fill-current text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.56 20.16 9.12 19.76 7.85 19L7.55 18.82L4.43 19.64L5.26 16.58L5.06 16.27C4.24 14.96 3.8 13.46 3.8 11.92C3.8 7.37 7.5 3.67 12.05 3.67M9.27 7.49C9.07 7.49 8.75 7.56 8.48 7.86C8.21 8.16 7.44 8.88 7.44 10.35C7.44 11.83 8.52 13.25 8.67 13.45C8.82 13.65 10.74 16.76 13.78 17.94C16.31 18.93 16.83 18.73 17.37 18.68C17.91 18.63 19.12 17.96 19.37 17.26C19.62 16.55 19.62 15.95 19.55 15.82C19.47 15.7 19.27 15.63 18.97 15.48C18.67 15.33 17.2 14.61 16.92 14.51C16.65 14.41 16.45 14.36 16.25 14.66C16.05 14.96 15.48 15.63 15.31 15.82C15.13 16.02 14.96 16.05 14.66 15.9C14.36 15.75 13.4 15.44 12.27 14.43C11.39 13.65 10.79 12.68 10.62 12.38C10.45 12.08 10.6 11.92 10.75 11.77C10.89 11.64 11.06 11.41 11.21 11.24C11.36 11.06 11.41 10.94 11.51 10.74C11.61 10.54 11.56 10.36 11.48 10.21C11.41 10.06 10.81 8.59 10.56 7.99C10.32 7.4 10.07 7.48 9.89 7.47C9.72 7.47 9.52 7.49 9.27 7.49Z" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight">How can I help you?</span>
        </button>
      </div>
    </>
  );
};
