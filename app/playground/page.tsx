/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import React from "react";
import ImageContext from "../components/image-context";
import Hotspot from "../components/hotspot";
import AIModelContextCard from "./AIModelContextCard";

interface ContextState {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const totalContexts = 3;

  // Throttle lock extended to seamlessly shield the sequential layout gap
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 800);
    const hideTimer = setTimeout(() => setShowTooltip(false), 6000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        setShowTooltip(false);

        setActiveIndex((prevIndex) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            return (prevIndex + 1) % totalContexts;
          } else {
            return (prevIndex - 1 + totalContexts) % totalContexts;
          }
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 15) return; // Disregard trackpad micro-friction

      e.preventDefault();

      if (isScrollingRef.current) return;
      isScrollingRef.current = true;
      setShowTooltip(false);

      setActiveIndex((prevIndex) => {
        if (e.deltaY > 0) {
          return (prevIndex + 1) % totalContexts;
        } else {
          return (prevIndex - 1 + totalContexts) % totalContexts;
        }
      });

      // Locked to completely clear the 500ms delay + 1400ms entry travel window
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1900);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-neutral-950 bg-cover bg-center bg-no-repeat overflow-hidden select-none"
      style={{ backgroundImage: "url('/bg-img.png')" }}
    >
      {/* FLOATING INSTRUCTIONAL TOOLTIP */}
      {showTooltip && (
        <div className="absolute top-10 z-50 pointer-events-none animate-in fade-in slide-in-from-top-3 duration-[1600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-900/40 border border-white/[0.05] backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-1.5 opacity-70">
              <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-neutral-300 border border-white/[0.03]">
                Scroll
              </span>
              <span className="text-[10px] text-neutral-500 font-medium">
                or
              </span>
              <div className="flex gap-0.5">
                <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-neutral-300 border border-white/[0.03]">
                  ←
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-neutral-300 border border-white/[0.03]">
                  →
                </span>
              </div>
            </div>
            <p className="text-xs font-medium text-neutral-300 tracking-normal">
              Use wheel or arrow keys to slide between layers
            </p>
          </div>
        </div>
      )}

      {/* Frame Wrapper - Zero Borders Sequential Layer Canvas */}
      <div className="relative h-[550px] w-[500px] bg-transparent overflow-visible perspective-[1800px]">
        {/* CONTEXT INDEX 0 (Swapped) */}
        <div
          className={`absolute inset-0 w-full h-full transform transition-all [will-change:transform,opacity,filter] ${
            activeIndex === 0
              ? "opacity-100 scale-100 translate-y-0 rotate-0 z-10 blur-none pointer-events-auto duration-[1400ms] delay-[500ms] [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)]"
              : activeIndex > 0
                ? "opacity-0 scale-[0.85] translate-y-8 rotate-[-1deg] z-0 blur-[16px] duration-[700ms] delay-0 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
                : "opacity-0 scale-[1.12] -translate-y-8 rotate-[1deg] z-0 blur-[16px] duration-[700ms] delay-0 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
          }`}
          style={{
            transformOrigin: "center center",
            backfaceVisibility: "hidden",
          }}
        >
          <ImageContext
            triggerSize={"md"}
            imageStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "16px",
            }}
            context="A high-angle interior view of a modern building's glass facade, featuring vibrant translucent rainbow-colored glass panels in bright neon pink, lime green, yellow, electric blue, and purple."
            src="img1.png"
          />
        </div>

        {/* CONTEXT INDEX 1 (Swapped) */}
        <div
          className={`absolute inset-0 w-full h-full transform transition-all [will-change:transform,opacity,filter] ${
            activeIndex === 1
              ? "opacity-100 scale-100 translate-y-0 rotate-0 z-10 blur-none pointer-events-auto duration-[1400ms] delay-[500ms] [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)]"
              : "opacity-0 scale-[0.85] translate-y-8 rotate-[-1deg] z-0 blur-[16px] duration-[700ms] delay-0 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
          }`}
          style={{
            transformOrigin: "center bottom",
            backfaceVisibility: "hidden",
          }}
        >
          <ImageContext
            triggerSize={"md"}
            blurOnOpen={true}
            imageStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "16px",
            }}
            context={({ isVisible }: ContextState) => (
              <AIModelContextCard isVisible={isVisible} />
            )}
            src="https://images.pexels.com/photos/17791531/pexels-photo-17791531.jpeg"
          />
        </div>

        {/* CONTEXT INDEX 2 */}
        <div
          className={`absolute inset-0 w-full h-full transform transition-all [will-change:transform,opacity,filter] ${
            activeIndex === 2
              ? "opacity-100 scale-100 translate-y-0 rotate-0 z-10 blur-none pointer-events-auto duration-[1400ms] delay-[500ms] [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)]"
              : "opacity-0 scale-[1.12] -translate-y-8 rotate-[1deg] z-0 blur-[16px] duration-[700ms] delay-0 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
          }`}
          style={{
            transformOrigin: "center top",
            backfaceVisibility: "hidden",
          }}
        >
          <ImageContext
            triggerSize={"md"}
            context="A high-angle interior view of a modern building's glass facade, featuring vibrant translucent rainbow-colored glass panels in bright neon pink, lime green, yellow, electric blue, and purple."
            imageStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "16px",
            }}
            src="https://images.pexels.com/photos/5384438/pexels-photo-5384438.jpeg"
          >
            <Hotspot
              context="Amar, grinning at Bayo, while cracking a joke."
              triggerSize={"sm"}
              x={25}
              y={60}
            />
            <Hotspot
              context="Bayo, laughing heartily at a joke Amar made, while holding his laptop"
              triggerSize={"sm"}
              x={75}
              y={40}
            />
          </ImageContext>
        </div>
      </div>
    </div>
  );
};

export default Page;
