import { useContext } from 'react';
import { usePoeNinja } from '../../hooks/usePoeNinja';
import { TransactionContext } from '../../context/TransactionContext';
import styles from './TopBar.module.css';

interface TopBarProps {
  onMenuClick: () => void; // For opening sidebar
  onNewTradeClick: () => void;
  onNewSingleClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, onNewTradeClick, onNewSingleClick }) => {
    const { divinePrice } = usePoeNinja();
    const context = useContext(TransactionContext);

    const totalProfit = context?.transactions
        .filter(t => t.status === 'confirmed')
        .reduce((acc, t) => t.type === 'sell' ? acc + t.total : acc - t.total, 0) || 0;

    return (
        <header className={styles.topBar}>
            <div className={styles.leftControls}>
                <div className={styles.logo}>Faustus Tracker</div>
            </div>

            <div className={styles.centerControls}>
                <button className={styles.actionButton} onClick={onNewTradeClick}>
                    New Trade
                </button>
                <button className={styles.actionButton} onClick={onNewSingleClick}>
                    New Single
                </button>
            </div>

            <div className={styles.rightControls}>
                <div className={styles.info}>
                    <div className={styles.divinePrice}>
                        {divinePrice ? `1 Divine = ${divinePrice}c` : 'Loading...'}
                    </div>
                    <div className={styles.profitTracker}>
                        Profit: {totalProfit.toFixed(0)}c
                    </div>
                </div>
                <button className={`${styles.actionButton} ${styles.historyButton}`} onClick={onMenuClick}>
                    History
                </button>
                <button className={styles.menuButton} onClick={onMenuClick}>
                    &#9776;
                </button>
            </div>
        </header>
    );
};