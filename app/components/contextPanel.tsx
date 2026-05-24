import { ContextPanelProps } from "./types";
import styles from "./image-context.module.css";

export const ContextPanel: React.FC<ContextPanelProps> = ({ text }) => {
  return (
    <div className={styles.contextPanel}>
      <p className={styles.truncatedText}>{text}</p>
    </div>
  );
};