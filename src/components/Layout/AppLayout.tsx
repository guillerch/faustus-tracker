import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import { TopBar } from './TopBar';
import '../../App.css';
import BuyMeACoffeeButton from '../Shared/BuyMeACoffeeButton';
import MobileNewFab from '../Shared/MobileNewFab';
import HelpButton from '../Shared/HelpButton';

interface AppLayoutProps {
  children: React.ReactNode;
  onNewTradeClick: () => void;
  onNewSingleClick: () => void;
  onStartTour?: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, onNewTradeClick, onNewSingleClick, onStartTour }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className={"app-container"}>
      <TopBar 
        onMenuClick={toggleSidebar} 
        onNewTradeClick={onNewTradeClick} 
        onNewSingleClick={onNewSingleClick}
        onStartTour={onStartTour}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main className={"main-content"}>
        {children}
      </main>
      <BuyMeACoffeeButton />
      <MobileNewFab />
      <HelpButton onStart={onStartTour} />
    </div>
  );
};

export default AppLayout;