import { useContext, useState, useEffect } from 'react';
import type { CallBackProps } from 'react-joyride';
import AppLayout from './components/Layout/AppLayout';
import SingleTransactionForm from './components/Forms/SingleTransactionForm';
import TradeTransactionForm from './components/Forms/TradeTransactionForm';
import Dashboard from './components/Dashboard/Dashboard';
import { TransactionContext } from './context/TransactionContext';
import Tour from './components/Tour/Tour';

function App() {
    const context = useContext(TransactionContext);
    const [runTour, setRunTour] = useState(false);

    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
            setRunTour(true);
        }
    }, []);

    const startTour = () => {
        setRunTour(true);
    };

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;
        if (['finished', 'skipped'].includes(status)) {
            setRunTour(false);
            localStorage.setItem('hasVisited', 'true');
        }
    };



    if (!context) return null; // Or a loading spinner

    const { modalState, openModal } = context;

    return (
        <AppLayout 
            onNewTradeClick={() => openModal('trade')} 
            onNewSingleClick={() => openModal('single')}
            onStartTour={startTour}
        >
            <Tour run={runTour} callback={handleJoyrideCallback} />
            <Dashboard />

            {modalState.type === 'single' && <SingleTransactionForm />}
            {modalState.type === 'trade' && <TradeTransactionForm />}
        </AppLayout>
    );
}

export default App;
