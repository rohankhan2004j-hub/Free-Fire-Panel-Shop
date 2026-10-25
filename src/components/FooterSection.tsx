import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterSectionProps {
  config: SiteConfig;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ config }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-mono font-black text-rose-500 text-base">FF</span>
          <span className="font-bold text-white text-base">PANEL BD STORE</span>
        </div>

        {/* Bengali Support note */}
        <p className="max-w-md text-slate-400 text-xs leading-relaxed">
          আমরা নিশ্চিত করি ১০০% জেনুইন অ্যান্টি-ব্যান ও সেফ গেমিং কনফিগ। যেকোনো তথ্যের জন্য আমাদের হোয়াটসঅ্যাপ হেল্পলাইনে যোগাযোগ করতে পারেন: <span className="font-mono text-emerald-400">{config.sellerWhatsApp}</span>
        </p>

        {/* Payment Badges */}
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
          <span className="px-3 py-1 bg-[#E2136E]/20 border border-[#E2136E]/50 text-[#ff4d9a] rounded-full font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E2136E]" />
            bKash Personal: {config.bkashNumber}
          </span>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-900 w-full flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-2">
          <span>© {new Date().getFullYear()} Free Fire Panel Seller BD. All rights reserved.</span>
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            100% Anti-Ban Guarantee Shield
          </span>
        </div>
      </div>
    </footer>
  );
};
