import React, { useState } from 'react';
import { AuroraBackground } from './components/ui/aurora-background';
import Wrapper from './Wrapper';
import { motion } from 'framer-motion';
import NASA_LOGO from './assets/images/nasa.svg';
import { Textarea } from './components/ui/textarea';
import TypingText from './components/ui/shadcn-io/typing-text';
import { History, X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from './components/ui/drawer';

const App: React.FC = () => {

  const [focused, setFocused] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900">
      <Wrapper>
        <Drawer
          direction="left"
        >
          <AuroraBackground>
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-2 items-center justify-center px-4"
            >
              <div className="text-3xl md:text-7xl font-bold dark:text-white text-center mb-0 pb-0">
                <img src={NASA_LOGO} alt="Logo" className="w-[200px]" />
              </div>
              <div className="text-2xl font-normal font-bold text-[#000042] text-center pt-0 -mt-[70px] flex items-center justify-center gap-2">
                Space Explorer
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-5 relative"
            >
              <div className="relative">
                <Textarea
                  placeholder=""
                  className="relative z-10 w-[530px] h-[100px] bg-white dark:bg-white dark:text-black focus:outline-none outline-none ring-0 focus:ring-0 focus-visible:ring-0 rounded-[16px] p-4 resize-none text-lg md:text-xl text-[#000042] placeholder:text-[#000042] shadow-sm"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
                <motion.div
                  animate={{ opacity: focused ? 0 : 1 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  className="absolute top-4 left-4 z-10 pointer-events-none"
                >
                  <TypingText
                    text={[
                      "Red space shuttle...",
                      "Rocket flying in space...",
                      "Topography of the moon...",
                      "Mars rover on the surface of Mars..."
                    ]}
                    className="text-lg md:text-xl text-[#000042]"
                  />
                </motion.div>
                <DrawerTrigger>
                  <History className="absolute right-4 top-4 z-20 w-5 h-5 text-[#000042] opacity-70 animate-pulse" />
                </DrawerTrigger>
              </div>
            </motion.div>
          </AuroraBackground>
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
        </Drawer>
      </Wrapper>
      {/* <Sources /> */}
    </div>
  );
};

export default App; 