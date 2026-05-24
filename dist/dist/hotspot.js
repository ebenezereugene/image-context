"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { ContextPanel } from "./contextPanel.js";
import styles from "./image-context.module.css";
const Hotspot = ({ x = 10, y = 10, context = "Hotspot Content", triggerIcon, triggerSize = "md", // 👈 2. Destructure size token parameter
 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLockedByClick, setIsLockedByClick] = useState(false);
    const hotspotRef = useRef(null);
    // Close the popup if the user clicks anywhere else outside this hotspot
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (hotspotRef.current &&
                !hotspotRef.current.contains(event.target)) {
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
    const handleTriggerClick = (e) => {
        e.stopPropagation(); // Stop parent triggers from bubbling up
        if (isLockedByClick) {
            setIsVisible(false);
            setIsLockedByClick(false);
        }
        else {
            setIsVisible(true);
            setIsLockedByClick(true);
        }
    };
    // 👈 3. Helper to determine the precise token dimension size values
    const getTriggerPixelSize = () => {
        if (typeof triggerSize === "number")
            return `${triggerSize}px`;
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
    return (_jsxs("div", { ref: hotspotRef, className: "absolute z-40 -translate-x-1/2 -translate-y-1/2", style: {
            left: `${x}%`,
            top: `${y}%`,
            ["--trigger-dimension"]: getTriggerPixelSize(), // 👈 4. Pass layout sizes to your CSS styles sheet
        }, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [triggerIcon ? (_jsx("div", { className: styles.customTriggerWrapper, onClick: handleTriggerClick, children: triggerIcon })) : (_jsx("button", { type: "button", className: `${styles.triggerButton} ${isVisible ? styles.activePing : ""}`, "aria-expanded": isVisible, onClick: handleTriggerClick, children: _jsx("svg", { className: styles.triggerSvg, viewBox: "0 0 8 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M6 0C4.9 0 4 0.9 4 2C4 3.1 4.9 4 6 4C7.1 4 8 3.1 8 2C8 0.9 7.1 0 6 0ZM3 5C1.34 5 0 6.34 0 8H2C2 7.44 2.44 7 3 7C3.56 7 4 7.44 4 8C4 8.56 2 11.28 2 13C2 14.72 3.34 16 5 16C6.66 16 8 14.66 8 13H6C6 13.56 5.56 14 5 14C4.44 14 4 13.56 4 13C4 12.28 6 9.32 6 8C6 6.38 4.66 5 3 5Z", fill: "white" }) }) })), isVisible && (_jsx("div", { className: styles.animationWrapper, children: typeof context === "string" ? (_jsx(ContextPanel, { text: context })) : (context) }))] }));
};
export default Hotspot;
