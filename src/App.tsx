/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialSiteConfig, defaultPlans, defaultReviews } from './data/defaultConfig';
import { SiteConfig, PricingPlan, CustomerReview, OrderSubmission, ToastItem } from './types';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { PackagesSection } from './components/PackagesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { CheckoutModal } from './components/CheckoutModal';
import { OriginalReferenceModal } from './components/OriginalReferenceModal';
import { GoogleDriveManagerModal } from './components/GoogleDriveManagerModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { ToastContainer } from './components/ToastNotification';

export default function App() {
  // Load configuration with localStorage persistence
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('ff_site_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          bkashNumber: '01926071592',
          sellerWhatsApp: '+8801926071592',
        };
      }
    } catch {
      // fallback
    }
    return initialSiteConfig;
  });

  const [plans, setPlans] = useState<PricingPlan[]>(() => {
    try {
      const saved = localStorage.getItem('ff_plans_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((p: PricingPlan) => p.id === 'plan-m1nx')) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return defaultPlans;
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('ff_reviews_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return defaultReviews;
  });

  // UI state
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState<boolean>(false);
  const [isDriveManagerOpen, setIsDriveManagerOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderSubmission[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Toast handlers
  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOrderSuccess = (order: OrderSubmission) => {
    setOrders((prev) => [order, ...prev]);

    // Format WhatsApp link for fast seller notification
    const rawNum = config.sellerWhatsApp.replace(/[^0-9]/g, '');
    const text = encodeURI(
      `আসসালামু আলাইকুম ভাই,\nআমি ওয়েবসাইটে অর্ডার করেছি!\n\n📌 অর্ডার আইডি: ${order.id}\n📦 প্যাকেজ: ${order.packageName}\n💰 মূল্য: ৳${order.price}\n🔑 TrxID: ${order.trxId}\n📱 ফোন এর মডেল: ${order.customerName}\n📞 ফোন: ${order.whatsappPhone}`
    );
    const whatsappLink = `https://wa.me/${rawNum}?text=${text}`;

    const newToast: ToastItem = {
      id: 'toast-' + order.id + '-' + Date.now(),
      title: 'পেমেন্ট ও অর্ডার সফলভাবে গৃহীত হয়েছে!',
      message: 'আপনার অর্ডারটি নিরাপদে প্রসেসিংয়ে রয়েছে। অল্প সময়ের মধ্যে হোয়াটসঅ্যাপে অ্যাক্টিভেশন কোড পৌঁছে যাবে।',
      orderId: order.id,
      amount: order.price,
      packageName: order.packageName,
      whatsappLink,
      duration: 7500,
      createdAt: Date.now(),
    };

    setToasts((prev) => [newToast, ...prev]);
  };

  // Persist handlers
  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('ff_site_config', JSON.stringify(newConfig));
    } catch {
      // safe
    }
  };

  const handleSavePlans = (newPlans: PricingPlan[]) => {
    setPlans(newPlans);
    try {
      localStorage.setItem('ff_plans_config', JSON.stringify(newPlans));
    } catch {
      // safe
    }
  };

  const handleAddReview = (newRev: CustomerReview) => {
    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('ff_reviews_config', JSON.stringify(updated));
    } catch {
      // safe
    }
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const scrollToPackages = () => {
    const el = document.getElementById('packages-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsAppDirect = () => {
    const rawNum = config.sellerWhatsApp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${rawNum}?text=${encodeURIComponent(
      'আসসালামু আলাইকুম ভাই, ফ্রি ফায়ার প্যানেল কিনতে চাই।'
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Hind_Siliguri',sans-serif]">
      {/* Top Utility and Navigation */}
      <TopBar
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onOpenReference={() => setIsReferenceOpen(true)}
        onOrderClick={scrollToPackages}
        onOpenDriveManager={() => setIsDriveManagerOpen(true)}
      />

      {/* Main View Wrapper (Handles Mobile Preview Frame or Full Desktop) */}
      <div
        className={
          viewMode === 'mobile'
            ? 'flex-1 py-8 px-4 flex justify-center bg-slate-950/90'
            : 'flex-1 w-full'
        }
      >
        <div
          className={
            viewMode === 'mobile'
              ? 'w-full max-w-[420px] bg-[#0c081e] rounded-[36px] border-[6px] border-slate-700 shadow-2xl overflow-hidden relative'
              : 'w-full'
          }
        >
          {/* Mobile phone mock status bar when in mobile view */}
          {viewMode === 'mobile' && (
            <div className="bg-black/90 text-slate-300 px-5 py-2.5 flex items-center justify-between text-[11px] font-mono border-b border-slate-800">
              <span className="font-bold">2:27</span>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <span>99bazarbd.shop</span>
                <span>🔒</span>
              </div>
              <div className="flex items-center gap-1">
                <span>LTE</span>
                <span>88%</span>
              </div>
            </div>
          )}

          {/* Actual Landing Page Sections */}
          <main>
            {/* Hero Section with Yellow Countdown Timer, Bengali Pitch, and Gameplay Video Player */}
            <HeroSection
              config={config}
              onOrderClick={scrollToPackages}
              onWhatsAppClick={openWhatsAppDirect}
            />

            {/* Anti-Ban & Features Bento Grid */}
            <div id="features-section">
              <FeaturesSection />
            </div>

            {/* Pricing Plans & Packages (bKash/Nagad checkout triggers) */}
            <div id="packages-section">
              <PackagesSection plans={plans} onSelectPlan={handleSelectPlan} />
            </div>

            {/* Customer Testimonials & Reviews */}
            <div id="reviews-section">
              <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />
            </div>

            {/* Frequently Asked Questions */}
            <div id="faq-section">
              <FaqSection />
            </div>
          </main>

          {/* Footer */}
          <FooterSection config={config} />
        </div>
      </div>

      {/* Floating Green WhatsApp Button matching the screenshot */}
      <WhatsAppWidget config={config} />

      {/* Bangladeshi Payment Checkout Modal */}
      <CheckoutModal
        plan={selectedPlan}
        config={config}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Original Screenshot Reference Inspector */}
      <OriginalReferenceModal
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
      />

      {/* Google Drive Workspace File Manager Modal */}
      <GoogleDriveManagerModal
        isOpen={isDriveManagerOpen}
        onClose={() => setIsDriveManagerOpen(false)}
      />

      {/* Floating Toast Notification Confirming Payment Receipt */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
