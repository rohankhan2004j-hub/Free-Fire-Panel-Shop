import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, ThumbsUp } from 'lucide-react';
import { CustomerReview } from '../types';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: CustomerReview) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [device, setDevice] = useState<string>('Mobile (Android)');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: CustomerReview = {
      id: 'rev-' + Date.now(),
      name: name.trim(),
      rating,
      date: 'আজকে মাত্র',
      device,
      comment: comment.trim(),
      verified: true,
    };

    onAddReview(newRev);
    setName('');
    setComment('');
    setShowAddModal(false);
  };

  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-rose-500 font-bold tracking-widest text-xs uppercase">
              কাস্টমার ফিডব্যাক ও প্রুফ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              প্লেয়ারদের বাস্তব অভিজ্ঞতা ও রিভিউ
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              আমাদের ১০০+ অ্যাক্টিভ প্লেয়ারদের দেওয়া শতভাগ জেনুইন মতামত
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 px-3.5 rounded-lg border border-slate-700 transition-colors shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-rose-400" />
            <span>আপনার রিভিউ দিন</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-white">{rev.name}</span>
                        {rev.verified && (
                          <span className="flex items-center gap-0.5 text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-1 rounded">
                            <CheckCircle className="w-2.5 h-2.5" /> ভেরিফাইড
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.device}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed my-2">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 mt-3 text-[11px] text-slate-500">
                <span>{rev.date}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <ThumbsUp className="w-3 h-3 text-rose-400" /> সাহায্যকারী
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-3">
                আপনার মূল্যবান অভিজ্ঞতা শেয়ার করুন
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">আপনার নাম:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: Sabbir"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">ডিভাইস মডেল:</label>
                  <input
                    type="text"
                    required
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    placeholder="যেমন: Xiaomi / iPhone / PC"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">রেটিং:</label>
                  <div className="flex gap-2">
                    {[5, 4, 3, 2, 1].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className={`px-3 py-1 text-xs rounded border ${
                          rating === num
                            ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 font-bold'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {num} ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">আপনার মন্তব্য:</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="প্যানেল কেমন কাজ করছে লিখুন..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 text-xs rounded-lg shadow"
                  >
                    পোস্ট করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
