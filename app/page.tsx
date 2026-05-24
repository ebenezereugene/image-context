"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { Hotspot, ImageContext } from "@/dist";

function StaggeredContext({ isVisible }: { isVisible: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer0: ReturnType<typeof setTimeout> | undefined;
    let timer1: ReturnType<typeof setTimeout> | undefined;
    let timer2: ReturnType<typeof setTimeout> | undefined;

    if (isVisible) {
      timer0 = setTimeout(() => setStep(1), 0);
      timer1 = setTimeout(() => setStep(2), 450);
      timer2 = setTimeout(() => setStep(3), 900);
    } else {
      timer0 = setTimeout(() => setStep(0), 0);
    }

    return () => {
      if (timer0) clearTimeout(timer0);
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [isVisible]);

  return (
    <div className="flex flex-col gap-2 bg-transparent text-white w-full max-w-60 p-3 text-sm">
      <p
        className={`text-sm transform transition-all duration-300 ease-out ${
          step >= 1
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-95 pointer-events-none"
        }`}
      >
        This is a custom component context example.
      </p>

      <Link
        href="#"
        className={`text-sm font-bold p-2 bg-[#0000004e] rounded-2xl transform transition-all duration-300 ease-out ${
          step >= 2
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-95 pointer-events-none"
        }`}
      >
        @instagram_username1
      </Link>

      <Link
        href="#"
        className={`text-sm font-bold p-2 bg-[#0000004e] rounded-2xl transform transition-all duration-300 ease-out ${
          step >= 3
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-95 pointer-events-none"
        }`}
      >
        @instagram_username2
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row p-4 md:p-6  lg:p-12 gap-6 lg:gap-24 justify-start overflow-y-auto lg:overflow-hidden bg-gray-50 relative">
      {/* 1. Universal Hidden Scrollbar CSS Engine Injector */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .mask-scroll::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
        `,
        }}
      />

      {/* 2. Attribution Link - Fixed at the very bottom on mobile, absolute top corner on desktop */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-50/90 backdrop-blur-sm py-3 text-center border-t border-gray-100 lg:border-none lg:bg-transparent lg:py-0 lg:backdrop-blur-none lg:absolute lg:top-6 lg:right-6 lg:bottom-auto lg:left-auto lg:text-right z-30">
        <Link
          href="https://x.com/eugeneebenezer"
          className="text-xs md:text-sm underline text-black hover:text-gray-700 transition-colors font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          By Eugene Ebenezer
        </Link>
      </div>

      {/* 3. Left Pane: Sticky Text Block (Preserved mt-115 for desktop, safe for mobile) */}
      <div className="flex flex-col justify-center w-full lg:max-w-[400px] mt-6 lg:mt-115 h-fit order-2 lg:order-1 mb-20 lg:mb-0 pb-12 lg:pb-0 px-2 lg:px-0">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-grey-900">
          A Way to Add Context Layers to Your Images
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          Image Context allows you to add more context to your images, telling
          richer stories and sharing more information in a non-intrusive way.
        </p>
        <div className="flex flex-row gap-3 mt-6">
          <Link
            href="/link to github"
            className="px-6 py-2.5 text-center text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
          >
            Github
          </Link>
          <Link
            href="#"
            className="px-6 py-2.5 text-center text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Documentation
          </Link>
        </div>
      </div>

      {/* 4. Right Pane: Fixed container height (lg:h-[580px]) safely breaks Card 2 into view */}
      <div
        className="w-full max-w-[680px] lg:max-w-[580px] h-auto lg:h-[580px] mt-4 lg:mt-12  flex flex-col gap-6 overflow-y-auto order-1 lg:order-2 rounded-xl mask-scroll select-none"
        style={{
          msOverflowStyle: "none" /* IE and Edge */,
          scrollbarWidth: "none" /* Firefox */,
        }}
      >
        {/* Card 1 */}
        <div className="w-full aspect-[135.75/150.5] md:h-[600px] lg:h-[540px] md:w-auto self-center rounded-lg bg-amber-300 overflow-hidden flex-shrink-0 shadow-md">
          <ImageContext
            triggerSize={"md"}
            context="This is the basic usage of Image Context, where the context is just a simple string."
            src="https://images.pexels.com/photos/18934604/pexels-photo-18934604/free-photo-of-ancient-monument-in-karnak-temple-complex-in-luxor-egypt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>

        {/* Card 2 */}
        <div className="w-full aspect-[135.75/150.5] md:h-[600px] lg:h-[540px] md:w-auto self-center rounded-lg bg-amber-300 overflow-hidden flex-shrink-0 shadow-md">
          <ImageContext
            triggerSize={"md"}
            context={({ isVisible }: { isVisible: boolean }) => (
              <StaggeredContext isVisible={isVisible} />
            )}
            src="https://images.pexels.com/photos/7108682/pexels-photo-7108682.jpeg"
          />
        </div>

        {/* Card 3 */}
        <div className="w-full aspect-[135.75/150.5] md:h-[600px] lg:h-[540px] md:w-auto self-center rounded-lg bg-amber-400 overflow-hidden flex-shrink-0 shadow-md">
          <ImageContext
            triggerSize={"md"}
            context="You can also add multiple hotspots to the same image, each with its own context."
            src="https://images.pexels.com/photos/6210611/pexels-photo-6210611.jpeg"
          >
            <Hotspot
              context="This is one context hotspot. It can be triggered by hovering or clicking on the trigger icon."
              triggerSize={"sm"}
              x={25}
              y={60}
            />
            <Hotspot
              context="This is another context hotspot"
              triggerSize={"sm"}
              x={50}
              y={80}
            />
          </ImageContext>
        </div>
      </div>
    </div>
  );
}
