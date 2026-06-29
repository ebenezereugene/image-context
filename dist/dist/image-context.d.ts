import React from "react";
import { ImageContextProps } from "./types.js";
type ExtendedImageContextProps = ImageContextProps & {
    children?: React.ReactNode;
    showTrigger?: boolean;
    blurOnOpen?: boolean;
    imageStyle?: React.CSSProperties;
};
declare const ImageContext: React.FC<ExtendedImageContextProps>;
export default ImageContext;
