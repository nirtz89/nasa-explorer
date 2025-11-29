import React from 'react';
import { X } from 'lucide-react';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './ui/drawer';

const HistoryDrawer: React.FC = () => {
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
    </DrawerContent>
  );
};

export default HistoryDrawer;
