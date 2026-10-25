import React, { useState } from 'react';
import { ShieldAlert, Crosshair, Eye, Cpu, Smartphone, Monitor, CheckCircle, Zap } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const [deviceFilter, setDeviceFilter] = useState<'all' | 'mobile' | 'pc'>('all');

  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-900/60 border-y border-slate-800 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-rose-500 font-bold tracking-widest text-xs uppercase">
            প্রিমিয়াম ফিচারসমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            কেন আমাদের প্যানেল ১০০% বেস্ট এবং নিরাপদ?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            সর্বাধুনিক অ্যান্টি-ডিটেকশন কোডিং ও বাইপাস প্রযুক্তি যা আপনার ফ্রি ফায়ার আইডিকে রাখে ব্যান-মুক্ত
          </p>

          {/* Device Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-lg border border-slate-700/60 mt-5">
            <button
              onClick={() => setDeviceFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                deviceFilter === 'all'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              সব ফিচার
            </button>
            <button
              onClick={() => setDeviceFilter('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                deviceFilter === 'mobile'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>মোবাইল (Android / iOS)</span>
            </button>
            <button
              onClick={() => setDeviceFilter('pc')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                deviceFilter === 'pc'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>পিসি (BlueStacks / MSI)</span>
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Anti-Ban Shield (Large) */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 rounded-lg shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">
                    ১০০% অ্যান্টি-ব্যান & অ্যান্টি-ব্লকলিস্ট প্রোটেকশন
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
                    VVIP BYPASS
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  প্যানেলের ভেতরে থাকা মেমোরি ইন্জেক্টর গেমের রিয়েল-টাইম প্যাকেটে কোনো অসঙ্গতি তৈরি করে না। সার্ভার রিপোর্ট করলেও ব্লকলিস্ট শিল্ড আপনার মেইন আইডিকে সুরক্ষিত রাখে।
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>মেইন আইডি ১০০% সেফ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>কোনো ব্লকলিস্ট ওয়ার্নিং নেই</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>অটো ক্ল্যাউড সিকিউরিটি কি</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>গ্র্যান্ডমাস্টার র‍্যাঙ্ক পুশিং সেফ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: AimLock & Headshot */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-rose-500/30 p-6 rounded-xl relative overflow-hidden group">
            <div className="p-3 bg-rose-950/80 border border-rose-500/30 text-rose-400 rounded-lg w-fit mb-3">
              <Crosshair className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              ৯৯% অটো হেডশট ড্র্যাগ
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              যেকোনো গানে (MP40, M1887, Woodpecker) ফায়ার বাটনে সামান্য টাচ করলেই অটো হেড লক হয়ে যাবে। স্মুথ ড্র্যাগ ও হাই অ্যাকুরেসি।
            </p>
          </div>

          {/* Card 3: ESP Location & Radar */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/30 p-6 rounded-xl relative overflow-hidden group">
            <div className="p-3 bg-blue-950/80 border border-blue-500/30 text-blue-400 rounded-lg w-fit mb-3">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              ESP লাইন, বক্স ও এনিমি লোকেশন
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              দেওয়ালের ওপাশে থাকা শত্রুর নাম, হেলথ ও দূরত্ব ১০০ মিটার দূর থেকেই স্ক্রিনে লেজার লাইনে দেখা যাবে। সারপ্রাইজ অ্যাটাকের ভয় নেই।
            </p>
          </div>

          {/* Card 4: No Root Required */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/30 p-6 rounded-xl relative overflow-hidden group">
            <div className="p-3 bg-purple-950/80 border border-purple-500/30 text-purple-400 rounded-lg w-fit mb-3">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              রুট ছাড়া সহজ ইনস্টল
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              মোবাইলের কোনো ওয়ারেন্টি নষ্ট হবে না। সাধারণ অ্যাপের মতো ইন্সটল করে জাস্ট এক ক্লিকে "স্টার্ট" দিলেই কানেক্ট হয়ে যাবে।
            </p>
          </div>

          {/* Card 5: Instant Delivery & VIP Support */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 p-6 rounded-xl relative overflow-hidden group">
            <div className="p-3 bg-amber-950/80 border border-amber-500/30 text-amber-400 rounded-lg w-fit mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              ইনস্ট্যান্ট অ্যাক্টিভেশন & সাপোর্ট
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              পেমেন্ট কনফার্ম হলেই স্বয়ংক্রিয়ভাবে লাইসেন্স কী এবং ইনস্টলেশন ভিডিও গাইড পাঠানো হয়। কোনো সমস্যা হলে রয়েছে লাইভ হোয়াটসঅ্যাপ সাপোর্ট।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
