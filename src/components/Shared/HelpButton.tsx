import React from 'react';
import styles from './HelpButton.module.css';

interface HelpButtonProps {
  onStart?: () => void;
}

const IconHelp: React.FC = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="rgba(255,255,255,0.06)"/>
    <path d="M11 17h2v-2h-2v2zm1-14a6 6 0 0 0-6 6h2a4 4 0 1 1 4 4v2h2v-1.5A6 6 0 0 0 12 3z" fill="white"/>
  </svg>
);

const HelpButton: React.FC<HelpButtonProps> = ({ onStart }) => {
  return (
    <div className={styles.helpFloating}>
      {/* icon-only button with tooltip via data-tooltip attribute */}
      <button
        className={styles.button}
        onClick={onStart}
        aria-label="Help"
        data-tooltip="Help"
        title="Help"
      >
        <IconHelp />
      </button>
    </div>
  );
};

export default HelpButton;
