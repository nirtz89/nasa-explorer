import { cn } from '../../lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './button';
import { X, Loader2 } from 'lucide-react';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl w-full grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridLightBox = ({
  image,
  thumbnail,
  width,
  height,
  isOpen,
  onClose,
  className,
  title,
  description,
}: {
  image?: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  title?: string;
  description?: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [displaySize, setDisplaySize] = useState<{ width: string; height: string }>({
    width: '90vw',
    height: '90vh',
  });

  const calculateDisplaySize = useCallback(() => {
    if (!width || !height) {
      return { width: '90vw', height: '90vh' };
    }

    const maxViewportWidth = window.innerWidth * 0.9;
    const maxViewportHeight = window.innerHeight * 0.9;
    const aspectRatio = width / height;

    let displayWidth = maxViewportWidth;
    let displayHeight = displayWidth / aspectRatio;

    if (displayHeight > maxViewportHeight) {
      displayHeight = maxViewportHeight;
      displayWidth = displayHeight * aspectRatio;
    }

    return {
      width: `${displayWidth}px`,
      height: `${displayHeight}px`,
    };
  }, [width, height]);

  useEffect(() => {
    if (isOpen) {
      setDisplaySize(calculateDisplaySize());

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      const handleResize = () => {
        setDisplaySize(calculateDisplaySize());
      };

      document.addEventListener('keydown', handleEscape);
      window.addEventListener('resize', handleResize);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        window.removeEventListener('resize', handleResize);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, calculateDisplaySize]);

  useEffect(() => {
    if (isOpen && image) {
      setImageLoaded(false);
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.onerror = () => {
        // If image fails to load, show placeholder
        setImageLoaded(false);
      };
      img.src = image;
    } else {
      setImageLoaded(false);
    }
  }, [isOpen, image]);

  if (!isOpen || !image) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm",
        className
      )}
      onClick={onClose}
    >
      <div
        className="relative p-4 transition-all duration-200 ease-out"
        style={{
          opacity: 0,
          transform: 'scale(0.95)',
          animation: 'fadeInScale 0.2s ease-out forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 z-10 rounded-full bg-white/90 text-black shadow-lg transition-opacity hover:opacity-80 dark:bg-black/90 dark:text-white"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </Button>
        <div
          className="relative rounded-lg overflow-hidden"
          style={displaySize}
        >

          {thumbnail && (
            <img
              src={thumbnail}
              alt=""
              className={cn(
                "absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-300",
                imageLoaded ? "opacity-0" : "opacity-100"
              )}
              style={{
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
              }}
            />
          )}

          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-[1500]">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}

          <img
            src={image}
            alt="Lightbox"
            className={cn(
              "relative w-full h-full rounded-lg object-contain transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            style={displaySize}
            onLoad={() => setImageLoaded(true)}
          />

          {(title || description) && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md border-t border-white/10 p-6 text-white transition-opacity duration-300 hover:bg-black/40">
              {title && (
                <h3 className="mb-2 text-xl font-bold leading-tight text-white drop-shadow-md">
                  {title}
                </h3>
              )}
              {description && (
                <p className="line-clamp-3 text-sm text-white/90 drop-shadow-sm">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-[#111725] dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
