/* eslint-disable react-hooks/set-state-in-effect */
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AIModelContextCard({ isVisible }: { isVisible: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (isVisible) {
      // Synchronized staggered arrival to anchor interface text inside the snapping card
      timers.push(setTimeout(() => setStep(1), 400));
      timers.push(setTimeout(() => setStep(2), 750));
      timers.push(setTimeout(() => setStep(3), 1100));
    } else {
      setStep(0);
    }

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const animateIn = (targetStep: number) =>
    `transform transition-all duration-[1500ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
      step >= targetStep
        ? "opacity-100 translate-y-0 scale-100 filter-none"
        : "opacity-0 translate-y-4 scale-[0.97] pointer-events-none blur-[4px]"
    }`;

  return (
    <div className="flex flex-col gap-3.5 text-white w-full p-0.5 font-sans select-none text-left">
      {/* STEP 1: AI Agent Status Header */}
      <div className={animateIn(1)}>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xs font-medium tracking-tight text-neutral-100">
                Elena Rostova
              </h3>
              <span className="text-[8px] uppercase tracking-widest text-blue-400/90 font-bold">
                AI Vision Indexed
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white/[0.06] rounded text-neutral-300">
            99.4% Match
          </span>
        </div>
      </div>

      {/* STEP 2: Intelligent Object Detection Vectors */}
      <div className={`grid grid-cols-12 gap-4 items-start ${animateIn(2)}`}>
        <div className="col-span-7 flex flex-col gap-2">
          <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">
            Detected Wardrobe
          </span>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] bg-white/[0.04] text-neutral-200 px-2 py-0.5 rounded border border-white/[0.03]">
              Linen Blazer
            </span>
            <span className="text-[10px] bg-white/[0.04] text-neutral-200 px-2 py-0.5 rounded border border-white/[0.03]">
              Silver Choker
            </span>
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-2 border-l border-white/[0.08] pl-4">
          <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">
            Verified Profiles
          </span>
          <div className="flex flex-col gap-1">
            <Link
              href="#"
              className="text-xs text-neutral-300 hover:text-blue-400 truncate transition-colors duration-200"
            >
              @elena_rostova
            </Link>
          </div>
        </div>
      </div>

      {/* STEP 3: Compact Action Hub */}
      <div className={animateIn(3)}>
        <div className="flex gap-2 border-t border-white/[0.08] pt-3 mt-0.5">
          <Link
            href="#"
            className="flex items-center justify-center gap-1.5 text-xs font-medium text-center w-full py-1.5 bg-neutral-100 text-neutral-950 hover:bg-white active:scale-[0.98] rounded-md transition-all duration-200 shadow-sm"
          >
            Shop Visual Look
          </Link>
          <button
            type="button"
            className="flex items-center justify-center p-1.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.04] text-neutral-300 rounded-md transition-all duration-200 active:scale-[0.95]"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 21l8.904-4.473L21 9l-3.482-3.482M9.813 15.904L21 4.5M9.813 15.904L4.5 21"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default AIModelContextCard;
