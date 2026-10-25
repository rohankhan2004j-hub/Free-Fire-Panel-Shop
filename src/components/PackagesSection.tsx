import React from 'react';
import { Check, Star, Sparkles, ShieldCheck } from 'lucide-react';
import { PricingPlan } from '../types';

interface PackagesSectionProps {
  plans: PricingPlan[];
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  plans,
  onSelectPlan,
}) => {
  return (
    <section id="packages-section" className="py-14 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-rose-500 font-bold tracking-widest text-xs uppercase">
            মূল্য তালিকা ও প্যাকেজ
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            আপনার পছন্দের ফ্রি ফায়ার প্যানেল প্যাকেজ বেছে নিন
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            বিকাশ, নগদ অথবা রকেটের মাধ্যমে মাত্র ১ মিনিটে পেমেন্ট করে তাৎক্ষণিক অ্যাক্টিভেশন কী গ্রহণ করুন
          </p>
        </div>

        {/* Pricing Cards Grid */}
        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {plans.map((plan) => {
            const discountPct = Math.round(
              ((plan.originalPrice - plan.discountPrice) / plan.originalPrice) * 100
            );

            return (
              <div
                key={plan.id}
                className={`relative rounded-xl transition-all duration-300 flex flex-col justify-between ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-rose-950/80 via-slate-900 to-slate-950 border-2 border-rose-500 shadow-[0_0_25px_rgba(225,29,72,0.35)] ring-1 ring-rose-500/50'
                    : 'bg-slate-900/90 border border-slate-800 hover:border-slate-700'
                } p-4 sm:p-5`}
              >
                {/* Popular Ribbon */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 to-red-600 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider py-0.5 px-3 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>প্রো লেভেল</span>
                  </div>
                )}

                <div>
                  {/* Title & Device Tag */}
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <h3 className="text-base font-black text-white leading-tight">
                      {plan.name}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-emerald-500/20 whitespace-nowrap">
                      {plan.deviceLabel || plan.deviceType}
                    </span>
                  </div>

                  {/* Headshot highlight rate if present */}
                  {plan.headshotRate && (
                    <div className="inline-flex items-center gap-1 bg-rose-950/80 border border-rose-500/40 text-rose-300 px-2 py-0.5 rounded text-[11px] font-bold mb-2">
                      <span>🎯</span>
                      <span>{plan.headshotRate}</span>
                    </div>
                  )}

                  {/* Price Block */}
                  <div className="my-3 pb-3 border-b border-slate-800/80">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        ৳{plan.discountPrice}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 line-through">
                        ৳{plan.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-1 py-0.2 rounded">
                        -{discountPct}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      মেয়াদ: <span className="text-slate-200 font-semibold">{plan.duration}</span>
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 my-4 text-xs text-slate-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-slate-800/60 mt-2">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>অর্ডার করুন</span>
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-emerald-400 font-semibold mt-2">
                    বিকাশে ইনস্ট্যান্ট পেমেন্ট (Send Money)
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner below pricing */}
        <div className="mt-12 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 rounded-full shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                ১০০% মানিব্যাক ও আইডি সেফটি গ্যারান্টি
              </h4>
              <p className="text-xs text-slate-400">
                কোনো কারণে প্যানেল আপনার ডিভাইসে কাজ না করলে কিংবা টেকনিক্যাল প্রবলেম হলে ফুল সাপোর্ট অথবা রিপ্লেসমেন্ট দেওয়া হবে।
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-lg shrink-0">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span>৪.৯/৫ রেটিং (৫০০+ সফল অর্ডার)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
