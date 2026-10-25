import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialDays?: number;
  initialHours?: number;
  initialMinutes?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialDays = 2,
  initialHours = 5,
  initialMinutes = 3,
}) => {
  // Total seconds remaining calculation
  const [totalSeconds, setTotalSeconds] = useState<number>(() => {
    return initialDays * 86400 + initialHours * 3600 + initialMinutes * 60 + 45;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const format2 = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
      {/* Days */}
      <div className="bg-[#FFE500] text-black w-20 sm:w-24 py-2 sm:py-3 rounded-md shadow-lg flex flex-col items-center justify-center border-2 border-yellow-300">
        <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight leading-none">
          {format2(days)}
        </span>
        <span className="text-xs sm:text-sm font-bold uppercase mt-1 tracking-wide">
          Days
        </span>
      </div>

      {/* Hours */}
      <div className="bg-[#FFE500] text-black w-20 sm:w-24 py-2 sm:py-3 rounded-md shadow-lg flex flex-col items-center justify-center border-2 border-yellow-300">
        <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight leading-none">
          {format2(hours)}
        </span>
        <span className="text-xs sm:text-sm font-bold uppercase mt-1 tracking-wide">
          Hours
        </span>
      </div>

      {/* Minutes */}
      <div className="bg-[#FFE500] text-black w-20 sm:w-24 py-2 sm:py-3 rounded-md shadow-lg flex flex-col items-center justify-center border-2 border-yellow-300">
        <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight leading-none">
          {format2(minutes)}
        </span>
        <span className="text-xs sm:text-sm font-bold uppercase mt-1 tracking-wide">
          Minutes
        </span>
      </div>

      {/* Seconds (live tick) */}
      <div className="bg-[#FFE500] text-black w-20 sm:w-24 py-2 sm:py-3 rounded-md shadow-lg flex flex-col items-center justify-center border-2 border-yellow-300">
        <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight leading-none animate-pulse">
          {format2(seconds)}
        </span>
        <span className="text-xs sm:text-sm font-bold uppercase mt-1 tracking-wide">
          Sec
        </span>
      </div>
    </div>
  );
};
