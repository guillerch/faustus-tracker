import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import TransactionHistory from "../History/TransactionHistory";
import { TransactionContext } from "../../context/TransactionContext";

interface SidebarProps {
	isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const context = useContext(TransactionContext);

    if (!context) {
        return null; // Or a loading state
    }

    const { clearTransactions } = context;

    const handleClearHistory = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete all transaction history? This action cannot be undone.");
        if (isConfirmed) {
            clearTransactions();
        }
    }

	return (
        <>
            <div className={`${styles.sidebarBackdrop} ${isOpen ? styles.open : ''}`} onClick={onClose} />
            <aside
                id="sidebar-history"
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
            >
                <div className={styles.sidebarHeader}>
                    <h2>Transaction History</h2>
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </div>

                <div className={styles.scrollContainer}>
                    <TransactionHistory />
                </div>

                <button className={styles.clearButton} onClick={handleClearHistory}>
                    Clear History
                </button>
            </aside>
        </>
	);
};

export default Sidebar;
