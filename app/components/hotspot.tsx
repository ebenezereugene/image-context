"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { ContextPanel } from "./contextPanel";
import styles from "./image-context.module.css";

interface HotspotProps {
  x?: number;
  y?: number;
  context?: string | ReactNode;
  triggerIcon?: ReactNode;
  triggerSize?: "sm" | "md" | "lg" | number;
}

const Hotspot: React.FC<HotspotProps> = ({
  x = 10,
  y = 10,
  context = "Hotspot Content",
  triggerIcon,
  triggerSize = "md",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLockedByClick, setIsLockedByClick] = useState<boolean>(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const hotspotRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | HTMLDivElement | null>(null);

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

  const updatePanelPosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const gap = 12;
    const PANEL_WIDTH = 260; // fixed comfortable width

    // Look for parent container boundary
    const container = hotspotRef.current?.closest(
      '[class*="contextContainer"]',
    ) as HTMLElement | null;
    const containerRect = container?.getBoundingClientRect();

    // Establish safe absolute horizontal boundaries
    const containerLeft = containerRect ? containerRect.left + 16 : 16;
    const containerRight = containerRect
      ? containerRect.right - 16
      : window.innerWidth - 16;

    // 1. Default to growing rightward from the trigger's left edge
    let left = rect.left;

    // 2. Flip leftward if it would overflow the right safe zone
    if (left + PANEL_WIDTH > containerRight) {
      left = rect.right - PANEL_WIDTH;
    }

    // 3. Absolute safety clamp: ensure it never squeezes past left or right padding bounds
    left = Math.max(
      containerLeft,
      Math.min(left, containerRight - PANEL_WIDTH),
    );

    const preferAbove = rect.top > 220;

    setPanelStyle({
      position: "fixed",
      top: preferAbove ? undefined : rect.bottom + gap,
      bottom: preferAbove ? window.innerHeight - rect.top + gap : undefined,
      left,
      width: PANEL_WIDTH,
      minWidth: PANEL_WIDTH, // Prevent any hidden browser flex/shrink behavior
      zIndex: 9999,
    });
  };

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

  const handleMouseEnter = () => {
    if (!isLockedByClick) {
      updatePanelPosition();
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isLockedByClick) setIsVisible(false);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLockedByClick) {
      setIsVisible(false);
      setIsLockedByClick(false);
    } else {
      updatePanelPosition();
      setIsVisible(true);
      setIsLockedByClick(true);
    }
  };

  const panel = isVisible
    ? createPortal(
        <div className={styles.animationWrapper} style={panelStyle}>
          {typeof context === "string" ? (
            <ContextPanel text={context} />
          ) : (
            context
          )}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div
        ref={hotspotRef}
        className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          ["--trigger-dimension" as never]: getTriggerPixelSize(),
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {triggerIcon ? (
          <div
            ref={buttonRef as React.RefObject<HTMLDivElement>}
            className={styles.customTriggerWrapper}
            onClick={handleTriggerClick}
          >
            {triggerIcon}
          </div>
        ) : (
          <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
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
      </div>

      {panel}
    </>
  );
};

export default Hotspot;
