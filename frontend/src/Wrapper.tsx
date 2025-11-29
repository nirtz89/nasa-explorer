import React from 'react';
import { cn } from './lib/utils';

const Wrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={cn("wrapper", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
