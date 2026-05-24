import React, { ReactNode } from "react";
interface HotspotProps {
    x?: number;
    y?: number;
    context?: string | ReactNode;
    triggerIcon?: ReactNode;
    triggerSize?: "sm" | "md" | "lg" | number;
}
declare const Hotspot: React.FC<HotspotProps>;
export default Hotspot;
