import React from 'react';
import { motion } from 'framer-motion';

const HeroHeading: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-2 items-center justify-center px-4"
    >
      <div className="text-[58px] max-w-[900px] font-normal font-bold text-[#111725] text-center pt-0 -mt-[70px] flex items-center justify-center gap-2">
        What are you searching for today?
      </div>
      <div className="text-lg md:text-xl text-[#B7B7B7] text-center">
        Your vision, with AI without limits.
      </div>
    </motion.div>
  );
};

export default HeroHeading;
