import React, { useState } from 'react';
import { X, Check, Copy, ShieldCheck, ArrowRight, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PricingPlan, SiteConfig, OrderSubmission } from '../types';

interface CheckoutModalProps {
  plan: PricingPlan | null;
  config: SiteConfig;
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: OrderSubmission) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  plan,
  config,
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [customerName, setCustomerName] = useState<string>('');
  const [whatsappPhone, setWhatsappPhone] = useState<string>('');
  const [senderPhone, setSenderPhone] = useState<string>('');
  const [trxId, setTrxId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submittedOrder, setSubmittedOrder] = useState<OrderSubmission | null>(null);

  if (!isOpen || !plan) return null;

  const currentNumber =
    paymentMethod === 'bKash'
      ? config.bkashNumber
      : paymentMethod === 'Nagad'
      ? config.nagadNumber
      : config.rocketNumber;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(currentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার ফোন এর মডেল লিখুন (যেমন: Xiaomi/iPhone/Samsung/PC)');
      return;
    }
    if (!whatsappPhone.trim() || whatsappPhone.length < 10) {
      setErrorMsg('সঠিক হোয়াটসঅ্যাপ নম্বর দিন (যাতে কী ও ফাইল পাঠানো যায়)');
      return;
    }
    if (!senderPhone.trim() || senderPhone.length < 4) {
      setErrorMsg('টাকা পাঠানোর সেন্ডার নম্বর দিন');
      return;
    }
    if (!trxId.trim() || trxId.length < 4) {
      setErrorMsg('সঠিক TrxID / ট্রানজেকশন আইডি দিন');
      return;
    }

    const orderId = 'FF-BD-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder: OrderSubmission = {
      id: orderId,
      packageName: plan.name,
      price: plan.discountPrice,
      deviceType: plan.deviceType,
      paymentMethod,
      senderPhone,
      trxId: trxId.toUpperCase(),
      customerName,
      whatsappPhone,
      timestamp: new Date().toLocaleTimeString('bn-BD'),
      status: 'pending',
    };

    setSubmittedOrder(newOrder);
    onOrderSuccess(newOrder);

    // Multi-angle celebratory confetti animation
    try {
      // Center burst
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.55 },
        zIndex: 99999,
        colors: ['#E11D48', '#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#FFE500'],
      });

      // Left angle cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.65 },
          zIndex: 99999,
          colors: ['#E11D48', '#FFE500', '#10B981'],
        });
      }, 200);

      // Right angle cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.65 },
          zIndex: 99999,
          colors: ['#E11D48', '#FFE500', '#10B981'],
        });
      }, 400);
    } catch (err) {
      console.error('Confetti error:', err);
    }
  };

  // WhatsApp formatted direct link
  const generateWhatsAppOrderLink = (order: OrderSubmission) => {
    const rawNum = config.sellerWhatsApp.replace(/[^0-9]/g, '');
    const text = encodeURI(
      `আসসালামু আলাইকুম ভাই,\nআমি ওয়েবসাইটে অর্ডার করেছি!\n\n📌 অর্ডার আইডি: ${order.id}\n📦 প্যাকেজ: ${order.packageName}\n💰 মূল্য: ৳${order.price}\n💳 পেমেন্ট মেথড: ${order.paymentMethod}\n📱 সেন্ডার নম্বর: ${order.senderPhone}\n🔑 TrxID: ${order.trxId}\n📱 ফোন এর মডেল: ${order.customerName}\n📞 হোয়াটসঅ্যাপ: ${order.whatsappPhone}\n\nঅনুগ্রহ করে আমার অ্যাক্টিভেশন কী এবং ফাইলটি দ্রুত পাঠিয়ে দিন।`
    );
    return `https://wa.me/${rawNum}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedOrder ? (
          /* Success Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">
              অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              ফোন মডেল: <span className="font-bold text-white">{submittedOrder.customerName}</span>, আপনার পেমেন্ট ভেরিফিকেশনের জন্য প্রসেসিংয়ে আছে।
            </p>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 my-5 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">অর্ডার ট্র্যাকিং আইডি:</span>
                <span className="font-mono font-bold text-yellow-400">{submittedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">নির্বাচিত প্যাকেজ:</span>
                <span className="font-bold text-white">{submittedOrder.packageName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">ফোন এর মডেল:</span>
                <span className="font-bold text-emerald-400">{submittedOrder.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">পরিশোধিত অ্যামাউন্ট:</span>
                <span className="font-bold text-emerald-400">৳{submittedOrder.price}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">পেমেন্ট মেথড:</span>
                <span className="font-bold text-slate-200">{submittedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ট্রানজেকশন TrxID:</span>
                <span className="font-mono font-bold text-slate-200">{submittedOrder.trxId}</span>
              </div>
            </div>

            {/* Generated Temporary Demo Key Notice */}
            <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-lg text-xs text-rose-200 mb-5 text-left">
              <span className="font-bold block mb-1">⚡ ইনস্ট্যান্ট সিকিউরিটি আপডেট:</span>
              অটোমেটিক সিস্টেমে আপনার হোয়াটসঅ্যাপ নম্বর ({submittedOrder.whatsappPhone}) এ ২-৫ মিনিটের মধ্যে আসল কী এবং ফুল ভিডিও টিউটোরিয়াল পাঠানো হবে। দ্রুত ডেলিভারির জন্য নিচে হোয়াটসঅ্যাপে একটি মেসেজ পাঠান।
            </div>

            <div className="space-y-3">
              <a
                href={generateWhatsAppOrderLink(submittedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>হোয়াটসঅ্যাপে ট্রানজেকশন প্রুফ পাঠান</span>
              </a>

              <button
                onClick={onClose}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
              >
                পেইজ বন্ধ করুন
              </button>
            </div>
          </div>
        ) : (
          /* Step 1 & 2: Payment Form */
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>নিরাপদ পেমেন্ট গেটওয়ে</span>
            </div>
            <h3 className="text-xl font-black text-white">
              পেমেন্ট সম্পন্ন করে প্যানেল নিশ্চিত করুন
            </h3>

            {/* Package Summary */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 my-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">প্যাকেজ:</p>
                <p className="font-bold text-sm text-white">{plan.name}</p>
                <p className="text-[11px] text-slate-400">মেয়াদ: {plan.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">মোট মূল্য:</p>
                <p className="text-2xl font-black text-emerald-400">৳{plan.discountPrice}</p>
              </div>
            </div>

            {/* bKash Payment Banner */}
            <div className="mb-4 bg-[#E2136E]/15 border border-[#E2136E]/40 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#E2136E] text-white flex items-center justify-center font-bold text-sm shadow">
                  বিকাশ
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>বিকাশ পার্সোনাল</span>
                    <span className="text-[10px] bg-[#E2136E] text-white font-mono px-1.5 py-0.5 rounded font-bold">
                      Send Money
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    অটো ভেরিফিকেশন ও তাৎক্ষণিক কী ডেলিভারি
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-yellow-300 font-mono">
                ৳{plan.discountPrice}
              </span>
            </div>

            {/* Account Number Box with 1-Click Copy */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">
                  বিকাশ নম্বর (Send Money):
                </span>
                <span className="text-[11px] font-bold text-emerald-400">
                  পরিশোধ: ৳{plan.discountPrice}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2">
                <span className="font-mono text-xl font-black tracking-wider text-yellow-300">
                  {currentNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="flex items-center gap-1 bg-[#E2136E] hover:bg-[#c90f61] text-white text-xs font-bold py-1.5 px-3.5 rounded-md transition-all active:scale-95 shadow"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>নম্বর কপি করুন</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                💡 আপনার বিকাশ অ্যাপ ওপেন করে <span className="text-white font-semibold">Send Money</span> অপশনে গিয়ে উপরের নম্বরে ঠিক <span className="text-yellow-400 font-bold">৳{plan.discountPrice}</span> টাকা পাঠান। তারপর নিচের ফর্মটি পূরণ করুন।
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-2.5 mb-3 bg-red-950/70 border border-red-500/40 text-red-300 text-xs rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Customer Inputs Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  ফোন এর মডেল:
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: Xiaomi Note 12 / iPhone 13 / Samsung A54"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    হোয়াটসঅ্যাপ নম্বর (ডেলিভারির জন্য):
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    যে নম্বর থেকে টাকা পাঠিয়েছেন:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="লাস্ট ৪ ডিজিট বা পুরো নম্বর"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  ট্রানজেকশন আইডি (TrxID):
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: 9J4K8L2P বা BKASH TrxID"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 uppercase font-mono tracking-wider"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-600 text-white font-black py-3 px-4 rounded-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
              >
                <span>অর্ডার কনফার্ম করুন (৳{plan.discountPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
