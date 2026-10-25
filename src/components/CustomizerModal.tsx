import React, { useState } from 'react';
import { X, Save, RotateCcw, Sliders, DollarSign, MessageCircle, Phone } from 'lucide-react';
import { SiteConfig, PricingPlan } from '../types';
import { initialSiteConfig, defaultPlans } from '../data/defaultConfig';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSaveConfig: (newConfig: SiteConfig) => void;
  plans: PricingPlan[];
  onSavePlans: (newPlans: PricingPlan[]) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  plans,
  onSavePlans,
}) => {
  const [formData, setFormData] = useState<SiteConfig>(config);
  const [editablePlans, setEditablePlans] = useState<PricingPlan[]>(plans);
  const [activeTab, setActiveTab] = useState<'content' | 'payment' | 'pricing'>('content');
  const [showSavedNotification, setShowSavedNotification] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    onSavePlans(editablePlans);
    setShowSavedNotification(true);
    setTimeout(() => {
      setShowSavedNotification(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (confirm('আপনি কি ডিফল্ট সেটিংসে ফিরে যেতে চান?')) {
      setFormData(initialSiteConfig);
      onSaveConfig(initialSiteConfig);
      setEditablePlans(defaultPlans);
      onSavePlans(defaultPlans);
    }
  };

  const handlePlanPriceChange = (id: string, field: 'discountPrice' | 'originalPrice', value: number) => {
    setEditablePlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1 text-rose-500 font-bold text-xs uppercase tracking-wider">
          <Sliders className="w-4 h-4" />
          <span>লাইভ ওয়েবসাইট কাস্টমাইজার</span>
        </div>
        <h3 className="text-xl font-black text-white">
          আপনার ইচ্ছা মতো ওয়েবসাইট সাজিয়ে নিন
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          এখানে আপনি আপনার বিকাশ/নগদ নম্বর, হোয়াটসঅ্যাপ নম্বর, টাইটেল ও প্যাকেজের মূল্য সরাসরি পরিবর্তন করতে পারবেন।
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 my-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`py-2 px-3 border-b-2 transition-colors ${
              activeTab === 'content'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            টাইটেল ও টেক্সট
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('payment')}
            className={`py-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'payment'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>পেমেন্ট নম্বর ও হোয়াটসঅ্যাপ</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`py-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'pricing'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>প্যাকেজ ও রেট (টাকা)</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {activeTab === 'content' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  প্রধান হেডিং (Main Title):
                </label>
                <input
                  type="text"
                  value={formData.siteTitle}
                  onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  সাব-টাইটেল (Sub Kicker):
                </label>
                <input
                  type="text"
                  value={formData.subTitle}
                  onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  বাংলা ডেসক্রিপশন (স্ক্রিনশটের মতো আকর্ষণীয় লেখা):
                </label>
                <textarea
                  rows={3}
                  value={formData.taglineBengali}
                  onChange={(e) => setFormData({ ...formData, taglineBengali: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  টপ অফার ব্যানার নোটিস:
                </label>
                <input
                  type="text"
                  value={formData.noticeBanner}
                  onChange={(e) => setFormData({ ...formData, noticeBanner: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  আপনার হোয়াটসঅ্যাপ নম্বর (যাতে কাস্টমার নক দিবে):
                </label>
                <input
                  type="text"
                  value={formData.sellerWhatsApp}
                  onChange={(e) => setFormData({ ...formData, sellerWhatsApp: e.target.value })}
                  placeholder="+88017XXXXXXXX"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  বিকাশ পার্সোনাল নম্বর (Send Money):
                </label>
                <input
                  type="text"
                  value={formData.bkashNumber}
                  onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-yellow-300 font-mono font-bold"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  💡 কাস্টমাররা এই বিকাশ নম্বরে Send Money করবেন।
                </p>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {editablePlans.map((plan) => (
                <div key={plan.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p className="font-bold text-xs text-white mb-2">{plan.name}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-1">আগের দাম (৳):</span>
                      <input
                        type="number"
                        value={plan.originalPrice}
                        onChange={(e) =>
                          handlePlanPriceChange(plan.id, 'originalPrice', Number(e.target.value))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                      />
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">অফার দাম (৳):</span>
                      <input
                        type="number"
                        value={plan.discountPrice}
                        onChange={(e) =>
                          handlePlanPriceChange(plan.id, 'discountPrice', Number(e.target.value))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-emerald-400 font-bold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showSavedNotification && (
            <div className="p-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs rounded-lg text-center font-bold">
              ✓ পরিবর্তন সফলভাবে সংরক্ষণ করা হয়েছে!
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ডিফল্টে ফিরিয়ে আনুন</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-300 hover:text-white"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 text-xs rounded-lg shadow"
              >
                <Save className="w-3.5 h-3.5" />
                <span>সেভ করুন</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
