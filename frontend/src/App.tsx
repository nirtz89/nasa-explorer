import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuroraBackground } from './components/ui/aurora-background';
import Wrapper from './Wrapper';
import { Drawer } from './components/ui/drawer';
import Navbar from './components/Navbar';
import HeroHeading from './components/HeroHeading';
import SearchInput from './components/SearchInput';
import HistoryDrawer from './components/HistoryDrawer';
import Gallery from './components/Gallery';
import SearchWrapper from './components/SearchWrapper';
import { AppState, useAppContext } from './AppContext';

const App: React.FC = () => {

  const { appState } = useAppContext();

  return (
    <div className="min-h-screen relative">
      <AuroraBackground className="fixed inset-0 z-0">
        <div></div>
      </AuroraBackground>
      <Drawer direction="left">
        <Wrapper className="relative z-10">
          <Navbar />
          <AnimatePresence mode="wait">
            {appState === AppState.INITIAL && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex flex-col items-center justify-center mt-[250px] relative">
                  <HeroHeading />
                  <SearchInput />
                </div>
                <Gallery />
              </motion.div>
            )}
            {appState === AppState.SEARCH && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <SearchWrapper />
              </motion.div>
            )}
          </AnimatePresence>
          <HistoryDrawer />
        </Wrapper>
      </Drawer>
    </div>
  );
};

export default App; 