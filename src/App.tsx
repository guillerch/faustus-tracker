import { useContext } from 'react';
import AppLayout from './components/Layout/AppLayout';
import SingleTransactionForm from './components/Forms/SingleTransactionForm';
import TradeTransactionForm from './components/Forms/TradeTransactionForm';
import Dashboard from './components/Dashboard/Dashboard';
import { TransactionContext } from './context/TransactionContext';

function App() {
    const context = useContext(TransactionContext);
    if (!context) return null; // Or a loading spinner

    const { modalState, openModal } = context;

    return (
        <AppLayout 
            onNewTradeClick={() => openModal('trade')} 
            onNewSingleClick={() => openModal('single')}
        >
            <Dashboard />

            {modalState.type === 'single' && <SingleTransactionForm />}
            {modalState.type === 'trade' && <TradeTransactionForm />}
        </AppLayout>
    );
}

export default App;
