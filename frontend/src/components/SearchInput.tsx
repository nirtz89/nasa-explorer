import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from './ui/textarea';
import TypingText from './ui/shadcn-io/typing-text';
import { AppState, useAppContext } from '../AppContext';

const SearchInput: React.FC = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const { setAppState } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (e.nativeEvent instanceof InputEvent && e.nativeEvent.inputType === "insertLineBreak") {
      setAppState(AppState.SEARCH);
      e.preventDefault();
      return;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="mt-5 relative"
    >
      <div className="relative bg-white/30 backdrop-blur-sm p-2 rounded-[24px] border border-[#EDF1F6]">
        <Textarea
          placeholder=""
          className="relative z-10 w-[792px] h-[150px] bg-white dark:bg-white dark:text-black focus:outline-none outline-none ring-0 focus:ring-0 focus-visible:ring-0 rounded-[16px] p-6 resize-none text-lg md:text-xl text-[#000042] placeholder:text-[#000042] shadow-sm border-none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => handleChange(e)}
        />
        <motion.div
          animate={{ opacity: focused || (!focused && value.length > 0) ? 0 : 1 }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
          className="absolute top-8 left-8 z-10 pointer-events-none"
        >
          <TypingText
            text={[
              "Red space shuttle...",
              "Rocket flying in space...",
              "Topography of the moon...",
              "Mars rover on the surface of Mars..."
            ]}
            className="text-lg md:text-xl text-[#B7B7B7]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SearchInput;
