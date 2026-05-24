import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./image-context.module.css";
export const ContextPanel = ({ text }) => {
    return (_jsx("div", { className: styles.contextPanel, children: _jsx("p", { className: styles.truncatedText, children: text }) }));
};
