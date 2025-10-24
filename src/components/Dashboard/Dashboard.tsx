import React, { useContext, useMemo } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import type { Currency } from '../../interfaces/Transaction';
import styles from './Dashboard.module.css';

interface CurrencyAnalysis {
    currency: Currency;
    totalBought: number;
    totalSold: number;
    chaosSpent: number;
    chaosEarned: number;
    avgBuyPrice: number;
    avgSellPrice: number;
    netProfit: number;
}

const Dashboard: React.FC = () => {
    const context = useContext(TransactionContext);
    const transactions = context?.transactions.filter(t => t.status === 'confirmed') || [];

    const analysis = useMemo(() => {
        const analysisMap = new Map<Currency, CurrencyAnalysis>();

        for (const t of transactions) {
            if (!analysisMap.has(t.currency)) {
                analysisMap.set(t.currency, {
                    currency: t.currency,
                    totalBought: 0, totalSold: 0,
                    chaosSpent: 0, chaosEarned: 0,
                    avgBuyPrice: 0, avgSellPrice: 0,
                    netProfit: 0,
                });
            }
            const stats = analysisMap.get(t.currency)!;

            if (t.type === 'buy') {
                stats.totalBought += t.quantity;
                stats.chaosSpent += t.total;
            } else {
                stats.totalSold += t.quantity;
                stats.chaosEarned += t.total;
            }
        }

        analysisMap.forEach(stats => {
            stats.avgBuyPrice = stats.totalBought > 0 ? stats.chaosSpent / stats.totalBought : 0;
            stats.avgSellPrice = stats.totalSold > 0 ? stats.chaosEarned / stats.totalSold : 0;
            stats.netProfit = stats.chaosEarned - stats.chaosSpent;
        });

        return Array.from(analysisMap.values());
    }, [transactions]);

    if (transactions.length === 0) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.welcomeMessage}>
                    <h2>Welcome to Faustus Tracker</h2>
                    <p>No confirmed transactions yet. Complete some trades to see your analysis.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.analysisGrid}>
                {analysis.map(stats => (
                    <div key={stats.currency} className={styles.currencyCard}>
                        <div className={styles.cardHeader}><h3>{stats.currency}</h3></div>
                        <div className={styles.statGrid}>
                            <div className={styles.stat}><div className={styles.statLabel}>Avg Buy</div><div className={styles.statValue}>{stats.avgBuyPrice.toFixed(2)}c</div></div>
                            <div className={styles.stat}><div className={styles.statLabel}>Avg Sell</div><div className={styles.statValue}>{stats.avgSellPrice.toFixed(2)}c</div></div>
                            <div className={styles.stat}><div className={styles.statLabel}>Total Bought</div><div className={styles.statValue}>{stats.totalBought}</div></div>
                            <div className={styles.stat}><div className={styles.statLabel}>Total Sold</div><div className={styles.statValue}>{stats.totalSold}</div></div>
                            <div className={`${styles.stat} ${styles.fullWidth}`}>
                                <div className={styles.statLabel}>Net Profit</div>
                                <div className={`${styles.statValue} ${stats.netProfit >= 0 ? styles.profit : styles.loss}`}>
                                    {stats.netProfit.toFixed(2)}c
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;