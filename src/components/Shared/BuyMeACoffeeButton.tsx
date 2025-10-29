import React from 'react';
import styles from './BuyMeACoffeeButton.module.css';

const BUY_ME_LINK = 'https://www.buymeacoffee.com/guillerch';

const IconCoffee: React.FC = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 7h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7z" fill="white" opacity="0.95"/>
    <path d="M17 8a3 3 0 0 0 0 6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BuyMeACoffeeButton: React.FC = () => {
  return (
    <a
      className={styles.floatingButton}
      href={BUY_ME_LINK}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label="Buy me a coffee"
      title="Buy me a coffee"
    >
      <IconCoffee />
      <span className={styles.label}>Buy me a coffee</span>
    </a>
  );
};

export default BuyMeACoffeeButton;
