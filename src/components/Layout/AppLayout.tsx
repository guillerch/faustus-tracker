import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import { TopBar } from './TopBar';
import '../../App.css';

interface AppLayoutProps {
  children: React.ReactNode;
  onNewTradeClick: () => void;
  onNewSingleClick: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, onNewTradeClick, onNewSingleClick }) => {
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
      />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main className={"main-content"}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;