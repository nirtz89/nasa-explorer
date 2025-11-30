import React, { createContext, useContext, ReactNode, useState } from 'react';

export enum AppState {
  INITIAL = 'INITIAL',
  SEARCH = 'SEARCH',
}

interface AppContextType {
  appState: AppState;
  setAppState: (appState: AppState) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);

  const value: AppContextType = {
    appState,
    setAppState: (appState: AppState) => {
      setAppState(appState);
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
