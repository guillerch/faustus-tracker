import React, { useState, useContext, useEffect } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import { CURRENCY_OPTIONS } from '../../interfaces/Transaction';
import styles from './SingleTransactionForm.module.css'; // Reusing styles

const TradeTransactionForm: React.FC = () => {
  const context = useContext(TransactionContext);
  if (!context) return null;

  const { addTrade, closeModal } = context;

  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [quantity, setQuantity] = useState<number | string>('');
  const [buyPrice, setBuyPrice] = useState<number | string>('');
  const [sellPrice, setSellPrice] = useState<number | string>('');
  const [error, setError] = useState<string | null>(null);

  // Reset form state when it becomes visible
  useEffect(() => {
      setCurrency(CURRENCY_OPTIONS[0]);
      setQuantity('');
      setBuyPrice('');
      setSellPrice('');
      setError(null);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const quantityNum = parseFloat(quantity.toString());
    const buyPriceNum = parseFloat(buyPrice.toString());
    const sellPriceNum = parseFloat(sellPrice.toString());

    if (isNaN(quantityNum) || quantityNum <= 0) return setError('Invalid quantity.');
    if (isNaN(buyPriceNum) || buyPriceNum <= 0) return setError('Invalid buy price.');
    if (isNaN(sellPriceNum) || sellPriceNum <= 0) return setError('Invalid sell price.');

    try {
      const buyTransaction = { currency, quantity: quantityNum, price: buyPriceNum, total: quantityNum * buyPriceNum, type: 'buy' as const };
      const sellTransaction = { currency, quantity: quantityNum, price: sellPriceNum, total: quantityNum * sellPriceNum, type: 'sell' as const };
      addTrade(buyTransaction, sellTransaction);
    } catch (err) {
      setError('Error adding trade.');
    }
  };

  const potentialProfit = (parseFloat(sellPrice.toString()) > 0 && parseFloat(buyPrice.toString()) > 0 && parseFloat(quantity.toString()) > 0) 
    ? (parseFloat(sellPrice.toString()) - parseFloat(buyPrice.toString())) * parseFloat(quantity.toString()) 
    : 0;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2 className={styles.formTitle}>Create New Trade</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="currency" className={styles.label}>Currency:</label>
            <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value as any)} required className={styles.select}>
              {CURRENCY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="quantity" className={styles.label}>Quantity:</label>
            <input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="0.01" step="any" required className={styles.input} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.fieldGroup}>
              <label htmlFor="buyPrice" className={styles.label}>Buy Price (per unit):</label>
              <input id="buyPrice" type="number" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} min="0.01" step="any" required className={styles.input} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="sellPrice" className={styles.label}>Sell Price (per unit):</label>
              <input id="sellPrice" type="number" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} min="0.01" step="any" required className={styles.input} />
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <h3>Potential Profit: <span style={{ color: potentialProfit > 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>{potentialProfit.toFixed(2)}c</span></h3>
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" onClick={closeModal} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Add Trade</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeTransactionForm;
