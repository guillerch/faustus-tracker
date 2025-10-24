import React, { useState, useContext, useEffect } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import { CURRENCY_OPTIONS } from '../../interfaces/Transaction';
import type { Transaction, TransactionType } from '../../interfaces/Transaction';
import styles from './SingleTransactionForm.module.css';

const SingleTransactionForm: React.FC = () => {
  const context = useContext(TransactionContext);
  if (!context) return null;

  // The context stores modal state under `modalState.transaction` and exposes `closeModal`.
  const { modalState, addTransaction, updateTransaction, closeModal } = context as any;
  const transactionToEdit: Transaction | null | undefined = modalState?.transaction ?? null;

  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [quantity, setQuantity] = useState<number | string>('');
  const [price, setPrice] = useState<number | string>('');
  const [type, setType] = useState<TransactionType>('buy');
  const [error, setError] = useState<string | null>(null);

  const isEditMode = transactionToEdit !== undefined && transactionToEdit !== null;

  useEffect(() => {
    if (isEditMode && transactionToEdit) {
      setCurrency(transactionToEdit.currency);
      setQuantity(transactionToEdit.quantity);
      setPrice(transactionToEdit.price);
      setType(transactionToEdit.type);
    } else {
      // Reset form when modal opens for creation
      setCurrency(CURRENCY_OPTIONS[0]);
      setQuantity('');
      setPrice('');
      setType('buy');
    }
    // We intentionally depend on modalState.transaction (transactionToEdit) so the form
    // resets or pre-fills when the modal opens/closes or when editing a transaction.
  }, [transactionToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const quantityNum = parseFloat(quantity.toString());
    const priceNum = parseFloat(price.toString());

    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError('Please enter a valid quantity.');
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price.');
      return;
    }

    const transactionData = {
      currency,
      quantity: quantityNum,
      price: priceNum,
      total: quantityNum * priceNum,
      type,
    };

    try {
      if (isEditMode && transactionToEdit) {
        updateTransaction(transactionToEdit.id, transactionData);
      } else {
        addTransaction(transactionData);
      }
      closeModal(); // Close modal on success
    } catch (err) {
      setError('Error processing transaction.');
      console.error(err);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2 className={styles.formTitle}>{isEditMode ? 'Edit Transaction' : 'Create Single Transaction'}</h2>
        
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

          <div className={styles.fieldGroup}>
            <label htmlFor="price" className={styles.label}>Price per unit (in Chaos):</label>
            <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0.01" step="any" required className={styles.input} />
          </div>
          
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Type:</label>
            <div className={styles.switchContainer}>
              <label className={styles.switchLabel} style={{ backgroundColor: type === 'buy' ? 'var(--success-color)' : 'var(--surface-color)' }}>
                <input type="radio" name="type" value="buy" checked={type === 'buy'} onChange={() => setType('buy')} className={styles.radio} />
                Buy
              </label>
              <label className={styles.switchLabel} style={{ backgroundColor: type === 'sell' ? 'var(--danger-color)' : 'var(--surface-color)' }}>
                <input type="radio" name="type" value="sell" checked={type === 'sell'} onChange={() => setType('sell')} className={styles.radio} />
                Sell
              </label>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" onClick={closeModal} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
              {isEditMode ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleTransactionForm;
