import React, { useEffect, useState } from 'react';
import { CheckCircle2, X, MessageCircle, ExternalLink } from 'lucide-react';
import { ToastItem } from '../types';

interface ToastNotificationProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onDismiss,
}) => {
  const duration = toast.duration || 6000;
  const [progress, setProgress] = useState<number>(100);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onDismiss(toast.id);
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [duration, isPaused, onDismiss, toast.id]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-md sm:max-w-lg bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] p-3.5 sm:p-4 text-slate-100 flex flex-col gap-2.5 transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left Icon with pulse */}
        <div className="relative shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-emerald-950/90 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping pointer-events-none" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm text-white leading-tight">
              {toast.title}
            </span>
            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
              #{toast.orderId}
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-1 leading-snug">
            {toast.message}
          </p>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
            <span className="font-medium text-slate-200">{toast.packageName}</span>
            <span>•</span>
            <span className="font-bold text-emerald-400">৳{toast.amount} পরিশোধিত</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss notification"
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Action Footer Button if WhatsApp link exists */}
      {toast.whatsappLink && (
        <div className="pt-1 flex items-center justify-between gap-2 border-t border-slate-800/80">
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            সরাসরি সেলারের হোয়াটসঅ্যাপে পাঠান:
          </span>
          <a
            href={toast.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow transition-all active:scale-95 ml-auto"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>হোয়াটসঅ্যাপে পাঠান</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      )}

      {/* Progress countdown bar */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-800 rounded-b-2xl overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
}) => {
  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2.5 items-center w-[calc(100%-2rem)] max-w-lg pointer-events-none"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full">
          <ToastNotification toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </aside>
  );
};
