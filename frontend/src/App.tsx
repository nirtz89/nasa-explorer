import React from 'react';
import { AuroraBackground } from './components/ui/aurora-background';
import Wrapper from './Wrapper';
import { Drawer } from './components/ui/drawer';
import Navbar from './components/Navbar';
import HeroHeading from './components/HeroHeading';
import SearchInput from './components/SearchInput';
import HistoryDrawer from './components/HistoryDrawer';
import Gallery from './components/Gallery';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative pb-10">
      <AuroraBackground className="fixed inset-0 z-0">
        <div></div>
      </AuroraBackground>
      <Drawer direction="left">
        <Wrapper className="relative z-10">
          <Navbar />
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] relative">
            <HeroHeading />
            <SearchInput />
          </div>
          <Gallery />
          <HistoryDrawer />
        </Wrapper>
      </Drawer>
    </div>
  );
};

export default App; 