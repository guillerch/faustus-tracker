import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Transaction } from '../interfaces/Transaction';

export type ModalType = 'single' | 'trade' | 'none';

interface ModalState {
    type: ModalType;
    transaction?: Transaction;
}

interface TransactionContextType {
    transactions: Transaction[];
    modalState: ModalState;
    openModal: (type: ModalType, transaction?: Transaction) => void;
    closeModal: () => void;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'status' | 'createdAt'>) => void;
    addTrade: (buy: Omit<Transaction, 'id' | 'status' | 'createdAt'>, sell: Omit<Transaction, 'id' | 'status' | 'createdAt'>) => void;
    updateTransactionStatus: (id: string, status: 'confirmed' | 'cancelled') => void;
    clearTransactions: () => void;
    updateTransaction: (id: string, data: Partial<Omit<Transaction, 'id'>>) => void;
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        try {
            const saved = localStorage.getItem('transactions');
            return saved ? JSON.parse(saved).map((t: any) => ({ ...t, createdAt: new Date(t.createdAt) })) : [];
        } catch (e) { return []; }
    });

    const [modalState, setModalState] = useState<ModalState>({ type: 'none' });

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const openModal = (type: ModalType, transaction?: Transaction) => {
        setModalState({ type, transaction });
    };

    const closeModal = () => {
        setModalState({ type: 'none' });
    };

    const addTransaction = (transaction: Omit<Transaction, 'id' | 'status' | 'createdAt'>) => {
        const newTransaction: Transaction = { ...transaction, id: crypto.randomUUID(), status: 'pending', createdAt: new Date() };
        setTransactions(prev => [newTransaction, ...prev]);
        closeModal();
    };

    const addTrade = (buy: Omit<Transaction, 'id' | 'status' | 'createdAt'>, sell: Omit<Transaction, 'id' | 'status' | 'createdAt'>) => {
        const newBuy: Transaction = { ...buy, id: crypto.randomUUID(), status: 'pending', createdAt: new Date() };
        const newSell: Transaction = { ...sell, id: crypto.randomUUID(), status: 'pending', createdAt: new Date() };
        setTransactions(prev => [newSell, newBuy, ...prev]);
        closeModal();
    };

    const updateTransaction = (id: string, data: Partial<Omit<Transaction, 'id'>>) => {
        setTransactions(prev => prev.map(t => (t.id === id ? { ...t, ...data, total: data.quantity! * data.price! } as Transaction : t)));
        closeModal();
    };

    const updateTransactionStatus = (id: string, status: 'confirmed' | 'cancelled') => {
        setTransactions(prev => prev.map(t => (t.id === id ? { ...t, status } : t)));
    };

    const clearTransactions = () => setTransactions([]);

    return (
        <TransactionContext.Provider value={{
            transactions,
            modalState,
            openModal,
            closeModal,
            addTransaction,
            addTrade,
            updateTransactionStatus,
            clearTransactions,
            updateTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    );
};
