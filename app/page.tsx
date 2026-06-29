/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import React from "react";
import ImageContext from "./components/image-context";
import AIModelContextCard from "./playground/AIModelContextCard";
import Hotspot from "./components/hotspot";

interface ContextState {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalContexts = 3;

  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();

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
      if (Math.abs(e.deltaY) < 15) return;

      e.preventDefault();

      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      setActiveIndex((prevIndex) => {
        if (e.deltaY > 0) {
          return (prevIndex + 1) % totalContexts;
        } else {
          return (prevIndex - 1 + totalContexts) % totalContexts;
        }
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1400);
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
      className="relative h-screen w-full bg-white overflow-hidden font-sans select-none flex flex-col justify-between p-6 md:p-8"
      style={{
        backgroundImage: "radial-gradient(#e5e5e5 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* HEADER SECTION: Left Title Info & Right Github Icon */}
      <header className="w-full flex items-start justify-between z-30 pointer-events-none">
        {/* Left Informational Sidebar Block */}
        <div className="max-w-[300px] flex flex-col gap-2.5 text-left pointer-events-auto">
          <h1 className="text-xs font-black tracking-wider text-black uppercase">
            Image Context Component
          </h1>
          <div className="text-[12px] leading-relaxed text-neutral-600 font-medium">
            <p>
              Image Context allows you to add more context to your images,
              telling richer stories and sharing more information in a
              non-intrusive way.
            </p>
          </div>
          <Link
            href="#"
            className="group flex items-center gap-2 text-[11px] font-bold text-black border-b border-black w-max pb-0.5 mt-1 hover:opacity-70 transition-opacity duration-200"
          >
            My Writeup About Its Future Application
            <svg
              className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        {/* Right Github Action Badge */}
        <div className="pointer-events-auto">
          <Link
            href="#"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-xs font-semibold text-neutral-900 hover:bg-neutral-50 active:scale-[0.98] transition-all duration-200"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Github
          </Link>
        </div>
      </header>

      {/* CORE PRESENTATION CANVAS STAGE */}
      <main className="w-full flex flex-col items-center justify-center my-auto py-4 z-10">
        {/* Frame Wrapper */}
        <div className="relative h-[480px] w-[480px] bg-transparent overflow-visible perspective-[2000px]">
          {/* CONTEXT INDEX 0 (Formerly Index 1) */}
          <div
            className="absolute inset-0 w-full h-full [will-change:transform,opacity,filter]"
            style={{
              transformOrigin: "center center",
              backfaceVisibility: "hidden",
              transitionProperty: "transform, opacity, filter",
              transitionDuration:
                activeIndex === 0
                  ? "1300ms, 800ms, 1300ms"
                  : "900ms, 600ms, 900ms",
              transitionTimingFunction:
                activeIndex === 0
                  ? "cubic-bezier(0.16, 1, 0.3, 1), ease-out, cubic-bezier(0.16, 1, 0.3, 1)"
                  : "cubic-bezier(0.3, 0, 0.2, 1), ease-in, cubic-bezier(0.3, 0, 0.2, 1)",
              opacity: activeIndex === 0 ? 1 : 0,
              filter: activeIndex === 0 ? "none" : "blur(12px)",
              transform:
                activeIndex === 0
                  ? "scale(1) translateY(0px) rotate(0deg)"
                  : activeIndex > 0
                    ? "scale(0.88) translateY(24px) rotate(-1deg)"
                    : "scale(1.12) translateY(-24px) rotate(1deg)",
              pointerEvents: activeIndex === 0 ? "auto" : "none",
              zIndex: activeIndex === 0 ? 10 : 0,
            }}
          >
            <ImageContext
              triggerSize={"md"}
              imageStyle={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "16px",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.02)",
              }}
              context="A high-angle interior view of a modern building's glass facade, featuring vibrant translucent rainbow-colored glass panels in bright neon pink, lime green, yellow, electric blue, and purple."
              src="img1.png"
            />
          </div>

          {/* CONTEXT INDEX 1 (Formerly Index 0) */}
          <div
            className="absolute inset-0 w-full h-full [will-change:transform,opacity,filter]"
            style={{
              transformOrigin: "center center",
              backfaceVisibility: "hidden",
              transitionProperty: "transform, opacity, filter",
              transitionDuration:
                activeIndex === 1
                  ? "1300ms, 800ms, 1300ms"
                  : "900ms, 600ms, 900ms",
              transitionTimingFunction:
                activeIndex === 1
                  ? "cubic-bezier(0.16, 1, 0.3, 1), ease-out, cubic-bezier(0.16, 1, 0.3, 1)"
                  : "cubic-bezier(0.3, 0, 0.2, 1), ease-in, cubic-bezier(0.3, 0, 0.2, 1)",
              opacity: activeIndex === 1 ? 1 : 0,
              filter: activeIndex === 1 ? "none" : "blur(12px)",
              transform:
                activeIndex === 1
                  ? "scale(1) translateY(0px) rotate(0deg)"
                  : activeIndex > 1
                    ? "scale(0.88) translateY(24px) rotate(-1deg)"
                    : "scale(1.12) translateY(-24px) rotate(1deg)",
              pointerEvents: activeIndex === 1 ? "auto" : "none",
              zIndex: activeIndex === 1 ? 10 : 0,
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
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.02)",
              }}
              context={({ isVisible }: ContextState) => (
                <AIModelContextCard isVisible={isVisible} />
              )}
              src="https://images.pexels.com/photos/17791531/pexels-photo-17791531.jpeg"
            />
          </div>

          {/* CONTEXT INDEX 2 */}
          <div
            className="absolute inset-0 w-full h-full [will-change:transform,opacity,filter]"
            style={{
              transformOrigin: "center center",
              backfaceVisibility: "hidden",
              transitionProperty: "transform, opacity, filter",
              transitionDuration:
                activeIndex === 2
                  ? "1300ms, 800ms, 1300ms"
                  : "900ms, 600ms, 900ms",
              transitionTimingFunction:
                activeIndex === 2
                  ? "cubic-bezier(0.16, 1, 0.3, 1), ease-out, cubic-bezier(0.16, 1, 0.3, 1)"
                  : "cubic-bezier(0.3, 0, 0.2, 1), ease-in, cubic-bezier(0.3, 0, 0.2, 1)",
              opacity: activeIndex === 2 ? 1 : 0,
              filter: activeIndex === 2 ? "none" : "blur(12px)",
              transform:
                activeIndex === 2
                  ? "scale(1) translateY(0px) rotate(0deg)"
                  : "scale(1.12) translateY(-24px) rotate(1deg)",
              pointerEvents: activeIndex === 2 ? "auto" : "none",
              zIndex: activeIndex === 2 ? 10 : 0,
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
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.02)",
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
      </main>

      {/* FOOTER BADGE SECTION */}
      <footer className="w-full flex justify-center z-30 pointer-events-none pb-2">
        <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-black/10 bg-white/80 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.04)] pointer-events-auto">
          <div className="flex items-center gap-2 text-neutral-800 text-[11px] font-medium tracking-normal">
            <span>Scroll or</span>
            <div className="flex gap-1">
              <span className="px-1.5 py-0.5 rounded border border-neutral-300 bg-neutral-50 text-[10px] font-mono font-bold text-neutral-600 shadow-[0_1px_0px_rgba(0,0,0,0.1)]">
                ←
              </span>
              <span className="px-1.5 py-0.5 rounded border border-neutral-300 bg-neutral-50 text-[10px] font-mono font-bold text-neutral-600 shadow-[0_1px_0px_rgba(0,0,0,0.1)]">
                →
              </span>
            </div>
          </div>
          <span className="h-3 w-px bg-neutral-300"></span>
          <p className="text-[11px] font-medium text-neutral-600 tracking-normal">
            Use wheel or arrow keys to slide between layers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
