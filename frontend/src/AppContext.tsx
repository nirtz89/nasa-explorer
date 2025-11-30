import React, { createContext, useContext, ReactNode, useState } from 'react';
import { HistoryItem } from './lib/types';

export enum AppState {
  INITIAL = 'INITIAL',
  SEARCH = 'SEARCH',
}

interface AppContextType {
  appState: AppState;
  setAppState: (appState: AppState) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const value: AppContextType = {
    appState,
    setAppState: (appState: AppState) => {
      setAppState(appState);
    },
    searchQuery,
    setSearchQuery: (searchQuery: string) => {
      setSearchQuery(searchQuery);
    },
    history,
    setHistory: (history: HistoryItem[]) => {
      setHistory(history);
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
