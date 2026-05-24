"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { ContextPanel } from "./contextPanel";
import styles from "./image-context.module.css";

interface HotspotProps {
  x?: number; // Horizontal percentage (0-100)
  y?: number; // Vertical percentage (0-100)
  context?: string | ReactNode;
  triggerIcon?: ReactNode;
  triggerSize?: "sm" | "md" | "lg" | number; // 👈 1. Added size property definitions
}

const Hotspot: React.FC<HotspotProps> = ({
  x = 10,
  y = 10,
  context = "Hotspot Content",
  triggerIcon,
  triggerSize = "md", // 👈 2. Destructure size token parameter
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLockedByClick, setIsLockedByClick] = useState<boolean>(false);
  const hotspotRef = useRef<HTMLDivElement>(null);

  // Close the popup if the user clicks anywhere else outside this hotspot
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hotspotRef.current &&
        !hotspotRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
        setIsLockedByClick(false);
      }
    };

    if (isVisible) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isVisible]);

  // Hover triggers visibility but doesn't lock it down
  const handleMouseEnter = () => {
    if (!isLockedByClick) {
      setIsVisible(true);
    }
  };

  // Hover leaves close it ONLY if it wasn't locked open by a physical click
  const handleMouseLeave = () => {
    if (!isLockedByClick) {
      setIsVisible(false);
    }
  };

  // Clicking acts as an intentional toggle lock mechanism
  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop parent triggers from bubbling up
    if (isLockedByClick) {
      setIsVisible(false);
      setIsLockedByClick(false);
    } else {
      setIsVisible(true);
      setIsLockedByClick(true);
    }
  };

  // 👈 3. Helper to determine the precise token dimension size values
  const getTriggerPixelSize = (): string => {
    if (typeof triggerSize === "number") return `${triggerSize}px`;
    switch (triggerSize) {
      case "sm":
        return "24px";
      case "lg":
        return "42px";
      case "md":
      default:
        return "32px";
    }
  };

  return (
    <div
      ref={hotspotRef}
      className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        ["--trigger-dimension" as never]: getTriggerPixelSize(), // 👈 4. Pass layout sizes to your CSS styles sheet
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hotspot Pin Element Trigger Group */}
      {triggerIcon ? (
        <div
          className={styles.customTriggerWrapper}
          onClick={handleTriggerClick}
        >
          {triggerIcon}
        </div>
      ) : (
        <button
          type="button"
          className={`${styles.triggerButton} ${isVisible ? styles.activePing : ""}`}
          aria-expanded={isVisible}
          onClick={handleTriggerClick}
        >
          <svg
            className={styles.triggerSvg}
            viewBox="0 0 8 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 0C4.9 0 4 0.9 4 2C4 3.1 4.9 4 6 4C7.1 4 8 3.1 8 2C8 0.9 7.1 0 6 0ZM3 5C1.34 5 0 6.34 0 8H2C2 7.44 2.44 7 3 7C3.56 7 4 7.44 4 8C4 8.56 2 11.28 2 13C2 14.72 3.34 16 5 16C6.66 16 8 14.66 8 13H6C6 13.56 5.56 14 5 14C4.44 14 4 13.56 4 13C4 12.28 6 9.32 6 8C6 6.38 4.66 5 3 5Z"
              fill="white"
            />
          </svg>
        </button>
      )}

      {/* Floating Popover Panel displaying your context */}
      {isVisible && (
        <div className={styles.animationWrapper}>
          {typeof context === "string" ? (
            <ContextPanel text={context} />
          ) : (
            context
          )}
        </div>
      )}
    </div>
  );
};

export default Hotspot;
