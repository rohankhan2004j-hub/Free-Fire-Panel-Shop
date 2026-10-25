import React from 'react';
import { Smartphone, Monitor, HardDrive, Image as ImageIcon } from 'lucide-react';

interface TopBarProps {
  viewMode: 'desktop' | 'mobile';
  onToggleViewMode: (mode: 'desktop' | 'mobile') => void;
  onOpenReference: () => void;
  onOrderClick: () => void;
  onOpenDriveManager: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  viewMode,
  onToggleViewMode,
  onOpenReference,
  onOrderClick,
  onOpenDriveManager,
}) => {
  const [copiedLink, setCopiedLink] = React.useState<boolean>(false);
  const activeUrl =
    typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
      ? window.location.origin
      : 'https://ais-dev-gyjsibpiqqohbel6voewy2-687119814403.asia-northeast1.run.app';

  const handleCopyPublicLink = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <>
      {/* Top Utility Control Strip (For Builder / Customer Review) */}
      <div className="bg-slate-950 border-b border-slate-800 text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">ভিউ মোড:</span>
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5">
            <button
              onClick={() => onToggleViewMode('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors font-medium ${
                viewMode === 'mobile'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>মোবাইল ভিউ</span>
            </button>
            <button
              onClick={() => onToggleViewMode('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors font-medium ${
                viewMode === 'desktop'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>ডেস্কটপ ভিউ</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Public Website Share Link Button */}
          <button
            onClick={handleCopyPublicLink}
            className="flex items-center gap-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg font-bold transition-all shadow-sm active:scale-95 border border-emerald-400/40"
            title="এই লিংকটি কপি করে আপনার ফেসবুক পেজ বা বিজ্ঞাপনে দিন"
          >
            {copiedLink ? (
              <>
                <span className="text-white">✓</span>
                <span>লিংক কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <span>🔗</span>
                <span>পাবলিক লিংক কপি করুন</span>
              </>
            )}
          </button>

          {/* Google Drive Files Manager Button */}
          <button
            onClick={onOpenDriveManager}
            className="flex items-center gap-1.5 bg-blue-600/90 hover:bg-blue-500 text-white px-3 py-1 rounded-lg font-bold transition-all shadow-sm active:scale-95 border border-blue-400/40"
            title="গুগল ড্রাইভ প্যানেল ফাইল আপলোড ও পরিচালনা করুন"
          >
            <HardDrive className="w-3.5 h-3.5 text-yellow-300" />
            <span>গুগল ড্রাইভ</span>
          </button>

          <button
            onClick={onOpenReference}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700/80 transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5 text-yellow-400" />
            <span>স্ক্রিনশট দেখুন</span>
          </button>
        </div>
      </div>

      {/* Primary Top Bar Contract */}
      <header className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-black tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span className="text-rose-500 font-mono">FF</span>
            <span>PANEL STORE</span>
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#packages-section" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              প্যাকেজসমূহ
            </a>
            <a href="#features-section" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              ফিচারসমূহ
            </a>
            <a href="#reviews-section" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              রিভিউ ও প্রুফ
            </a>
            <a href="#faq-section" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              প্রশ্নোত্তর
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOrderClick}
              className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow transition-colors whitespace-nowrap shrink-0"
            >
              এখনই কিনুন
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
