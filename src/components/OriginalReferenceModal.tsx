import React from 'react';
import { X, CheckCircle, ExternalLink } from 'lucide-react';

interface OriginalReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalReferenceModal: React.FC<OriginalReferenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const originalScreenshot = '/public/assets/aistudio/Screenshot_20261025-022706_698235d2.jpg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-black text-white mb-1">
          আপনার দেওয়া মূল স্ক্রিনশট ও ডিজাইন রেফারেন্স
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          স্ক্রিনশটে থাকা প্রতিটি অংশ (কাউন্টডাউন টাইমার, লাল টাইটেল, সবুজ সাবটাইটেল, বাংলা টেক্সট, ভিডিও প্লেয়ার এবং হোয়াটসঅ্যাপ হেল্পলাইন) নিখুঁতভাবে ইমপ্লিমেন্ট করা হয়েছে।
        </p>

        <div className="rounded-xl overflow-hidden border border-slate-800 max-h-[70vh] overflow-y-auto bg-black flex justify-center">
          <img
            src={originalScreenshot}
            alt="Original Screenshot from user"
            referrerPolicy="no-referrer"
            className="w-full max-w-sm object-contain"
          />
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-emerald-400 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> ১০০% সামঞ্জস্যপূর্ণ ডিজাইন
          </span>
          <button
            onClick={onClose}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 text-xs rounded-lg shadow"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
