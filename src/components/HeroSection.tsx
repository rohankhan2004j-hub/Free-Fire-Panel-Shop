import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ShieldCheck, Zap, Crosshair, Sparkles, CheckCircle2, Maximize2, BadgeCheck, Lock } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { SiteConfig } from '../types';

interface HeroSectionProps {
  config: SiteConfig;
  onOrderClick: () => void;
  onWhatsAppClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOrderClick,
  onWhatsAppClick,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'hud' | 'original'>('video');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const videoFilePrimary = '/public/assets/aistudio/IMG_20260402_223043_396_e2b31fe2.mp4';
  const videoFileAlt = '/assets/aistudio/IMG_20260402_223043_396_e2b31fe2.mp4';
  const hudImg = '/src/assets/images/ff_hud_interface_1792874518765.jpg';
  const originalScreenshot = '/public/assets/aistudio/Screenshot_20261025-022706_698235d2.jpg';

  // Synchronize play/pause
  useEffect(() => {
    if (!videoRef.current || activeMediaTab !== 'video') return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, activeMediaTab]);

  // Synchronize volume / mute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 px-4 sm:px-6">
      {/* Background glow matching the screenshot's crimson-to-deep-navy gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a0808] via-[#1a0f30] to-[#0a071b] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-rose-600/15 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Urgent Notice Banner */}
        {config.noticeBanner && (
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-950/80 via-rose-900/60 to-red-950/80 border border-red-500/30 px-4 py-1.5 rounded-full text-xs sm:text-sm text-yellow-300 font-medium mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{config.noticeBanner}</span>
          </div>
        )}

        {/* Authentic Top Yellow Countdown Timer from Screenshot */}
        <div className="mb-4">
          <CountdownTimer
            initialDays={config.urgencyDays}
            initialHours={config.urgencyHours}
            initialMinutes={config.urgencyMinutes}
          />
        </div>

        {/* Main Title: Free Fire Panel Seller (matching screenshot's bold red typeface) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#E11D48] tracking-tight uppercase drop-shadow-[0_4px_12px_rgba(225,29,72,0.4)] my-1">
          {config.siteTitle}
        </h1>

        {/* Sub-kicker: Paid Panel (matching screenshot's spaced green text) */}
        <p className="text-emerald-400 font-extrabold tracking-[0.4em] sm:tracking-[0.6em] text-sm sm:text-lg uppercase my-2 drop-shadow-[0_2px_8px_rgba(52,211,153,0.4)]">
          {config.subTitle}
        </p>

        {/* High-converting Bengali pitch headline from screenshot */}
        <p className="text-slate-100 text-base sm:text-xl md:text-2xl font-bold leading-relaxed max-w-2xl mx-auto my-4 text-balance px-2">
          {config.taglineBengali}
        </p>

        {/* Value pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-5 text-xs sm:text-sm font-semibold">
          <span className="inline-flex items-center gap-1.5 bg-slate-900/80 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ১০০% অ্যান্টি-ব্যান গ্যারান্টি
          </span>
          <span className="inline-flex items-center gap-1.5 bg-slate-900/80 border border-rose-500/40 text-rose-300 px-3 py-1 rounded-md">
            <Crosshair className="w-4 h-4 text-rose-400" />
            অটো হেডশট ড্র্যাগ & এইমলক
          </span>
          <span className="inline-flex items-center gap-1.5 bg-slate-900/80 border border-blue-500/40 text-blue-300 px-3 py-1 rounded-md">
            <Zap className="w-4 h-4 text-blue-400" />
            মোবাইল & পিসি দুটিই সাপোর্টেড
          </span>
        </div>

        {/* Video / Gameplay Showcase Player (User's Attached Video) */}
        <div className="my-6 max-w-2xl mx-auto">
          {/* Media switcher tabs */}
          <div className="flex items-center justify-between mb-2 px-1 text-xs text-slate-400">
            <span className="font-medium text-slate-300">ভিডিও ও প্রুফ গ্যালারি:</span>
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveMediaTab('video')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeMediaTab === 'video'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                লাইভ ভিডিও প্লেয়ার
              </button>
              <button
                onClick={() => setActiveMediaTab('original')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeMediaTab === 'original'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                মূল স্ক্রিনশট
              </button>
              <button
                onClick={() => setActiveMediaTab('hud')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeMediaTab === 'hud'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                প্যানেল HUD
              </button>
            </div>
          </div>

          {/* Player Container */}
          <div className="relative rounded-xl overflow-hidden border-2 border-rose-500/40 bg-black shadow-2xl aspect-video group">
            {activeMediaTab === 'video' ? (
              /* Real User Video Element */
              <video
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={() => setIsPlaying(!isPlaying)}
                loop
                muted={isMuted}
                playsInline
                autoPlay
                className="w-full h-full object-cover cursor-pointer"
              >
                <source src={videoFilePrimary} type="video/mp4" />
                <source src={videoFileAlt} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            ) : (
              /* Image display when switching to Original Screenshot or HUD */
              <img
                src={activeMediaTab === 'hud' ? hudImg : originalScreenshot}
                alt="Free Fire Panel Showcase"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}

            {/* Video overlay badge matching the screenshot ("PNAL panel seller") */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10 pointer-events-none">
              <div className="bg-black/85 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider border border-white/20">
                PNAL
              </div>
              <div className="bg-black/80 backdrop-blur-sm text-yellow-400 px-2 py-0.5 rounded text-[10px] font-bold tracking-tight">
                panel seller
              </div>
            </div>

            {/* Status indicator in player */}
            <div className="absolute top-3 right-3 bg-emerald-950/85 border border-emerald-500/60 text-emerald-300 text-[10px] px-2.5 py-1 rounded font-mono font-bold flex items-center gap-1.5 shadow z-10 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              BYPASS ACTIVE
            </div>

            {/* Big center play icon if paused */}
            {!isPlaying && activeMediaTab === 'video' && (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95"
                aria-label="Play Video"
              >
                <Play className="w-7 h-7 fill-current ml-1" />
              </button>
            )}

            {/* Player Controls Bar at Bottom */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-3 pt-6 flex items-center justify-between text-white text-xs z-20">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-white transition-transform active:scale-95 shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>
                <div className="font-mono text-[11px] text-slate-300 whitespace-nowrap">
                  {formatTime(currentTime)} / {formatTime(duration || 88)}
                </div>
              </div>

              {/* Progress Timeline (Clickable to seek) */}
              <div
                onClick={handleSeek}
                className="flex-1 mx-3 h-2 bg-slate-700/80 hover:h-2.5 rounded-full overflow-hidden relative cursor-pointer transition-all"
                title="ক্লিক করে ভিডিও এগিয়ে বা পিছিয়ে নিন"
              >
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-red-500 transition-all duration-100"
                  style={{
                    width: `${duration > 0 ? (currentTime / duration) * 100 : isPlaying ? 45 : 0}%`,
                  }}
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="p-1.5 hover:text-rose-400 hover:bg-white/10 rounded-md transition-colors"
                  title={isMuted ? 'আনমিউট করুন' : 'মিউট করুন'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-yellow-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
                <button
                  onClick={handleFullscreen}
                  aria-label="Fullscreen"
                  className="p-1.5 hover:text-rose-400 hover:bg-white/10 rounded-md transition-colors"
                  title="ফুলস্ক্রিন করুন"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <span className="font-black text-yellow-300 font-mono text-[10px] bg-slate-800/80 px-1.5 py-0.5 rounded border border-yellow-400/30">
                  HD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
          <button
            onClick={onOrderClick}
            className="w-full sm:w-auto flex-1 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-600 text-white font-black text-lg py-3.5 px-6 rounded-lg shadow-[0_0_20px_rgba(225,29,72,0.5)] transition-all active:scale-[0.98] border border-rose-400/40 uppercase tracking-wide flex items-center justify-center gap-2"
          >
            <span>আপনার প্যাকেজ সিলেক্ট করুন</span>
            <span className="text-yellow-300 text-sm">৳৮০০ থেকে</span>
          </button>

          <button
            onClick={onWhatsAppClick}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base py-3.5 px-6 rounded-lg shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 border border-emerald-400/40"
          >
            <svg
              className="w-5 h-5 fill-current text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.56 20.16 9.12 19.76 7.85 19L7.55 18.82L4.43 19.64L5.26 16.58L5.06 16.27C4.24 14.96 3.8 13.46 3.8 11.92C3.8 7.37 7.5 3.67 12.05 3.67M9.27 7.49C9.07 7.49 8.75 7.56 8.48 7.86C8.21 8.16 7.44 8.88 7.44 10.35C7.44 11.83 8.52 13.25 8.67 13.45C8.82 13.65 10.74 16.76 13.78 17.94C16.31 18.93 16.83 18.73 17.37 18.68C17.91 18.63 19.12 17.96 19.37 17.26C19.62 16.55 19.62 15.95 19.55 15.82C19.47 15.7 19.27 15.63 18.97 15.48C18.67 15.33 17.2 14.61 16.92 14.51C16.65 14.41 16.45 14.36 16.25 14.66C16.05 14.96 15.48 15.63 15.31 15.82C15.13 16.02 14.96 16.05 14.66 15.9C14.36 15.75 13.4 15.44 12.27 14.43C11.39 13.65 10.79 12.68 10.62 12.38C10.45 12.08 10.6 11.92 10.75 11.77C10.89 11.64 11.06 11.41 11.21 11.24C11.36 11.06 11.41 10.94 11.51 10.74C11.61 10.54 11.56 10.36 11.48 10.21C11.41 10.06 10.81 8.59 10.56 7.99C10.32 7.4 10.07 7.48 9.89 7.47C9.72 7.47 9.52 7.49 9.27 7.49Z" />
            </svg>
            <span>হোয়াটসঅ্যাপ হেল্পলাইন: {config.sellerWhatsApp}</span>
          </button>
        </div>

        {/* Verified Seller & Secure Payment Trust Badges Section */}
        <div className="mt-7 mb-4 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
          {/* Badge 1: Verified Seller */}
          <div className="relative group bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-emerald-500/40 hover:border-emerald-500/70 rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-sm transition-all duration-300">
            <div className="absolute -top-2.5 right-4 bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AUTHENTIC</span>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600/30 to-emerald-950/70 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                <BadgeCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                    Verified Seller
                  </h3>
                  <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    ✓ ভেরিফাইড
                  </span>
                </div>
                <p className="text-xs text-emerald-300/90 font-medium mt-0.5">
                  ১০০% বিশ্বস্ত ও জেনুইন ফ্রি ফায়ার প্যানেল সেলার
                </p>
                <div className="mt-2.5 space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>৫,২০০+ সফল ডেলিভারি ও রিয়েল গেমার রিভিউ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>সরাসরি হোয়াটসঅ্যাপ সাপোর্ট: <strong className="text-white font-mono">{config.sellerWhatsApp}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Badge 2: Secure Payment */}
          <div className="relative group bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-pink-500/40 hover:border-pink-500/70 rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-sm transition-all duration-300">
            <div className="absolute -top-2.5 right-4 bg-pink-950/90 text-pink-300 border border-pink-500/50 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Lock className="w-2.5 h-2.5 text-pink-300" />
              <span>BKASH SAFE</span>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600/30 to-pink-950/70 border border-pink-500/50 flex items-center justify-center text-pink-400 shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6 text-pink-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                    Secure Payment
                  </h3>
                  <span className="bg-pink-950/80 text-pink-300 border border-pink-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    নিরাপদ লেনদেন
                  </span>
                </div>
                <p className="text-xs text-pink-300/90 font-medium mt-0.5">
                  বিকাশ পার্সোনাল সুরক্ষায় ১০০% নিশ্চিত পেমেন্ট
                </p>
                <div className="mt-2.5 space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>বিকাশ পার্সোনাল নম্বর: <strong className="text-pink-300 font-mono">{config.bkashNumber}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>TrxID যাচাইয়ের পর তাৎক্ষণিক ফাইল ও কোড প্রদান</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Trust Checklist */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 mt-4">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>১০০% নিরাপদ অ্যান্টি-ব্যান মেথড</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>কোনো প্রকার রুট বা জেলব্রেক লাগবে না</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>বিকাশ পার্সোনাল ইনস্ট্যান্ট পেমেন্ট</span>
          </div>
        </div>
      </div>
    </section>
  );
};
