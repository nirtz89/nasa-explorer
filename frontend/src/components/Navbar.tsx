import React from 'react';
import { User, History } from 'lucide-react';
import NASA_LOGO from '../assets/images/nasa.svg';
import { Button } from './ui/button';
import { DrawerTrigger } from './ui/drawer';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent backdrop-blur supports-[backdrop-filter]:bg-transparent">
      <div className="px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={NASA_LOGO} 
              alt="NASA Logo" 
              className="h-[22px] w-auto"
            />
            <DrawerTrigger>
            <Button variant="outline" size="icon">
              <History className="w-5 h-5" />
            </Button>
            </DrawerTrigger>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full bg-white hover:bg-gray-100 border-gray-300">
              <User className="w-5 h-5 text-gray-800" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
