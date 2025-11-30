import React, { useState, useEffect } from 'react';
import { X, Trash2, Star, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Button } from './ui/button';
import { getHistoryFromLocalStorage, replaceFullHistoryInLocalStorage } from '../lib/utils';
import { HistoryItem } from '../lib/types';
import { AppState, useAppContext } from '../AppContext';

const ITEMS_PER_PAGE = 10;

const HistoryDrawer: React.FC = () => {
  const { history, setHistory, setSearchQuery, setAppState } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [history.length]);

  useEffect(() => {
    const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [history.length, currentPage]);

  const handleDeleteHistory = (timestamp: string) => {
    const newHistory = history.filter((item) => item.timestamp !== timestamp);
    setHistory(newHistory);
    replaceFullHistoryInLocalStorage(newHistory);
  };

  const restoreQuery = (query: string) => {
    setSearchQuery('');
    setSearchQuery(query);
    setAppState(AppState.SEARCH);
  };
  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedHistory = history.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
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
        <div className="flex flex-col w-full overflow-y-auto h-[calc(100vh-250px)]">
          {paginatedHistory.length > 0 && paginatedHistory.map((item) => {
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
                  <Button variant="ghost" size="icon-sm" className="text-gray-400 hover:text-gray-600">
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => handleDeleteHistory(item.timestamp)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => restoreQuery(item.query)} className="text-gray-400 hover:text-blue-500">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500">No history found</p>
          </div>
        )}
        {history.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 mt-auto">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </DrawerContent>
  );
};

export default HistoryDrawer;
