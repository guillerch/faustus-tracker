import React, { useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import styles from './TransactionHistory.module.css';

const TransactionHistory: React.FC = () => {
    const context = useContext(TransactionContext);

    if (!context) {
        return <p>Loading transactions...</p>;
    }

    const { transactions, updateTransactionStatus, openModal } = context;

    return (
        <div className={styles.historyContainer}>
            {/* The h3 is removed as the title is now in the sidebar header */}
            <ul className={styles.transactionList}>
                {transactions.map(t => (
                    <li key={t.id} className={styles.transactionItem}>
                        <div>
                            <span>{t.type.toUpperCase()} {t.quantity} {t.currency} at {t.price}c each</span>
                            <span className={styles.total}>Total: {t.total.toFixed(2)}c</span>
                        </div>
                        <div className={styles.status}>
                            Status: <span className={`${styles.statusText} ${styles[t.status]}`}>{t.status}</span>
                        </div>
                        <div className={styles.actions}>
                            {t.status === 'pending' && (
                                <>
                                    <button onClick={() => updateTransactionStatus(t.id, 'confirmed')} className={`${styles.button} ${styles.confirm}`}>Confirm</button>
                                    <button onClick={() => updateTransactionStatus(t.id, 'cancelled')} className={`${styles.button} ${styles.cancel}`}>Cancel</button>
                                    <button onClick={() => openModal('single', t)} className={`${styles.button} ${styles.editButton}`}>Edit</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;