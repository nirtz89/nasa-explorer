import React from 'react';
import { X, Trash2, Star, RotateCcw } from 'lucide-react';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './ui/drawer';
import { getHistoryFromLocalStorage, replaceFullHistoryInLocalStorage } from '../lib/utils';
import { HistoryItem } from '../lib/types';
import { AppState, useAppContext } from '../AppContext';

const HistoryDrawer: React.FC = () => {
  const { history, setHistory, setSearchQuery, setAppState } = useAppContext();

  const handleDeleteHistory = (timestamp: string) => {
    const newHistory = history.filter((item) => item.timestamp !== timestamp);
    setHistory(newHistory);
    replaceFullHistoryInLocalStorage(newHistory);
  };

  const restoreQuery = (query: string) => {
    setSearchQuery('');
    setSearchQuery(query);
  };

  return (
    <DrawerContent className="bg-white dark:bg-white dark:text-black shadow-lg z-[1000]">
      <DrawerHeader>
        <DrawerTitle>History</DrawerTitle>
        <DrawerDescription>
          Your search history will be displayed here.
        </DrawerDescription>
        <DrawerClose className="absolute right-4 top-4 z-20 w-5 h-5 text-[#000042] opacity-70 animate-pulse">
          <X className="w-4 h-4" />
        </DrawerClose>
      </DrawerHeader>
      <div className="flex flex-col w-full p-4">
        <div className="flex items-center px-4 py-2 mb-3">
          <input
            type="text"
            placeholder="Search history..."
            className="text-sm border border-gray-200 rounded-md px-3 py-1 w-full focus:outline-none focus:border-blue-400 text-black bg-white"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              const filtered = getHistoryFromLocalStorage().filter((item: HistoryItem) =>
                item.query.toLowerCase().includes(searchTerm)
              );
              setHistory(filtered);
            }}
          />
        </div>
        {history.length > 0 && history.map((item) => {
          const timestampParts = item.timestamp.split(' at ');
          const dateOnly = timestampParts[0];

          return (
            <div key={item.timestamp} className="flex flex-row items-start justify-between w-full px-4 py-6 gap-4 hover:bg-gray-100 rounded-md">
              <p className="text-gray-500 text-sm flex-1 line-clamp-2 overflow-hidden text-ellipsis">
                {item.query}
              </p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-gray-500 text-xs whitespace-nowrap">
                  {dateOnly}
                </span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Star className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteHistory(item.timestamp)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button onClick={() => restoreQuery(item.query)} className="text-gray-400 hover:text-blue-500 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500">No history found</p>
          </div>
        )}
      </div>
    </DrawerContent>
  );
};

export default HistoryDrawer;
