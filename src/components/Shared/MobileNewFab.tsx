import React, { useState, useContext } from 'react';
import styles from './MobileNewFab.module.css';
import { TransactionContext } from '../../context/TransactionContext';

const MobileNewFab: React.FC = () => {
  const [open, setOpen] = useState(false);
  const context = useContext(TransactionContext);

  if (!context) return null;

  const { openModal } = context;

  const toggle = () => setOpen(prev => !prev);

  const handleNewTrade = () => {
    openModal('trade');
    setOpen(false);
  };

  const handleNewSingle = () => {
    openModal('single');
    setOpen(false);
  };

  return (
    <div className={styles.fabContainer} aria-hidden={false}>
      {/* actions positioned absolutely so they expand upwards from the FAB */}
      <div className={open ? styles.actions : styles.hidden} role="menu" aria-hidden={!open}>
        <button className={styles.actionButton} onClick={handleNewTrade} aria-label="New trade">New Trade</button>
        <button className={styles.actionButton} onClick={handleNewSingle} aria-label="New single">New Single</button>
      </div>

      <button className={styles.fabButton} onClick={toggle} aria-haspopup="menu" aria-expanded={open} aria-label="Open new transaction menu">+</button>
    </div>
  );
};

export default MobileNewFab;
