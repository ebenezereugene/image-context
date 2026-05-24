import { ReactNode } from "react";
export interface Hotspot {
    id: string;
    /**
     * Horizontal position as a percentage (0-100)
     */
    x: number;
    /**
     * Vertical position as a percentage (0-100)
     */
    y: number;
    /**
     * Custom icon element for the hotspot pin marker
     */
    icon?: ReactNode;
    /**
     * Accessibility label text
     */
    label?: string;
    /**
     * Content inside the hotspot popover
     */
    context: ReactNode | string;
    /**
     * Custom click event override
     */
    position?: "top" | "right" | "bottom" | "left";
    /**
     * Custom click event override
     */
    onClick?: () => void;
}
export interface ImageContextProps {
    /**
     * Image source URL string
     */
    src: string;
    /**
     * Image alt text for accessibility and screen readers
     */
    alt?: string;
    /**
     * Main context content. Can be a string, custom React nodes, or a
     * function revealing internal visibility states back to the consumer.
     */
    context: string | ReactNode | ((renderProps: {
        isVisible: boolean;
        setIsVisible: (visible: boolean) => void;
    }) => ReactNode);
    /**
     * Custom trigger icon node to replace the fallback button layout element
     */
    triggerIcon?: ReactNode;
    /**
     * Controlled visibility state mapping
     */
    open?: boolean;
    /**
     * Callback event emitted when internal visibility shifts
     */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * Uncontrolled lifecycle initial mounting fallback open toggle configuration parameter
     */
    defaultOpen?: boolean;
    /**
     * Fires tracking when actions physically execute across runtime state environments
     */
    onTrigger?: (isOpen: boolean) => void;
    /**
     * Array configuration objects for rendering element hot-link overlays
     */
    hotspots?: Hotspot[];
    /**
     * Toggles off global pointer action triggers completely
     */
    disabled?: boolean;
    /**
     * Root layout element width constraint value properties
     */
    width?: number | string;
    /**
     * Root layout element height constraint value properties
     */
    height?: number | string;
    /**
     * Optional custom style override hook targets
     */
    className?: string;
    /**
     * Positional quadrant anchoring options tracking layout alignments
     */
    position?: "top" | "right" | "bottom" | "left";
    /**
     * Adjusts the default round trigger button sizing layout dimensions
     * @default "md"
     */
    triggerSize?: "sm" | "md" | "lg" | number;
    /**
     * Forces display fallback triggers when custom graphics are omitted
     */
    showDefaultTrigger?: boolean;
    /**
     * Animation execution window length values measured directly in milliseconds
     */
    animationDuration?: number;
}
export interface ContextPanelProps {
    /**
     * Simple inline content display string variable definitions
     */
    text: string;
}
