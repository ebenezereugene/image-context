/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./image-context.module.css";
import { ContextPanelProps, ImageContextProps } from "./types";
import { ContextPanel } from "./contextPanel";

// 👈 Added showTrigger to the temporary type extension here
type ExtendedImageContextProps = ImageContextProps & {
  children?: React.ReactNode;
  showTrigger?: boolean;
};

const ImageContext: React.FC<ExtendedImageContextProps> = ({
  src,
  alt = "",
  context,
  triggerIcon,
  triggerSize = "md",
  open = false,
  showTrigger = true, // 👈 1. Added prop with a safe default value of true
  children,
  onVisibleChange,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(open);
  const [isLockedByClick, setIsLockedByClick] = useState<boolean>(false);

  const triggerGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(open);
    if (open) setIsLockedByClick(true);
  }, [open]);

  const updateVisibility = (visible: boolean, lockState: boolean = false) => {
    setIsVisible(visible);
    setIsLockedByClick(lockState);
    if (onVisibleChange) onVisibleChange(visible);
  };

  const handleMouseEnter = () => {
    if (!isLockedByClick) {
      updateVisibility(true, false);
    }
  };

  const handleMouseLeave = () => {
    if (!isLockedByClick) {
      updateVisibility(false, false);
    }
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLockedByClick) {
      updateVisibility(false, false);
    } else {
      updateVisibility(true, true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerGroupRef.current &&
        !triggerGroupRef.current.contains(event.target as Node)
      ) {
        updateVisibility(false, false);
      }
    };

    if (isVisible) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isVisible]);

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

  const renderContext = () => {
    if (typeof context === "string") {
      return <ContextPanel text={context} />;
    }
    if (typeof context === "function") {
      return context({
        isVisible,
        setIsVisible: (v) => updateVisibility(v, v),
      });
    }
    return context;
  };

  return (
    <div className={styles.contextContainer}>
      <img src={src} alt={alt} className={styles.contextImage} />

      {/* 👈 2. Wrap the trigger group block inside the conditional gate statement */}
      {showTrigger && (
        <div
          ref={triggerGroupRef}
          className={styles.triggerGroup}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            ["--trigger-dimension" as never]: getTriggerPixelSize(),
          }}
        >
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
              className={styles.triggerButton}
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

          {isVisible && (
            <div className={styles.animationWrapper}>{renderContext()}</div>
          )}
        </div>
      )}

      {/* 3. Hotspots render out down here freely regardless of whether the main banner trigger is hidden */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { triggerSize } as never);
        }
        return child;
      })}
    </div>
  );
};

export default ImageContext;
