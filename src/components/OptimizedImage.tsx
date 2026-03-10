import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../lib/utils';

interface OptimizedImageProps extends HTMLMotionProps<"img"> {
  fallbackSrc?: string;
  containerClassName?: string;
  category?: string;
}

const FALLBACKS: Record<string, string> = {
  'Starters': 'https://picsum.photos/seed/starter/800/600',
  'Main Course': 'https://picsum.photos/seed/main/800/600',
  'Drinks': 'https://picsum.photos/seed/drink/800/600',
  'default': 'https://picsum.photos/seed/food/800/600'
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  'Starters': 'from-emerald/20 to-teal/20',
  'Main Course': 'from-saffron/20 to-orange/20',
  'Drinks': 'from-blue/20 to-indigo/20',
  'default': 'from-gold/20 to-saffron/20'
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc,
  category,
  initial,
  animate,
  transition,
  ...props
}) => {
  const finalFallback = fallbackSrc || (category ? FALLBACKS[category] : FALLBACKS.default) || FALLBACKS.default;
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState(src || finalFallback);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const gradientClass = category ? CATEGORY_GRADIENTS[category] : CATEGORY_GRADIENTS.default;

  // Handle source changes
  React.useEffect(() => {
    const newSrc = src || finalFallback;
    if (newSrc !== currentSrc) {
      setCurrentSrc(newSrc);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src, finalFallback, currentSrc]);

  // Immediate check for cached images
  React.useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoading(false);
    }
    
    // Safety timeout: if image hasn't loaded in 5 seconds, show fallback or error
    const timer = setTimeout(() => {
      if (isLoading) {
        console.warn(`Image load timed out for: ${currentSrc}. Attempting fallback.`);
        handleError();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSrc, isLoading]);

  const handleError = () => {
    if (currentSrc !== finalFallback) {
      console.warn(`Image failed to load: ${currentSrc}. Switching to fallback.`);
      setCurrentSrc(finalFallback);
      setIsLoading(true);
    } else {
      console.error(`Fallback image failed to load: ${currentSrc}`);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className={cn(
      "relative overflow-hidden bg-gradient-to-br transition-all duration-500", 
      gradientClass,
      !isLoading && "bg-none",
      containerClassName
    )}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/10 dark:bg-black/10 backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-charcoal/5 dark:bg-white/5">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mb-1">
            <span className="text-xs">🍽️</span>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-tighter opacity-40">Image Unavailable</span>
        </div>
      )}

      <motion.img
        ref={imgRef}
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        initial={{ opacity: 0, ...(initial as any) }}
        animate={{ 
          opacity: isLoading ? 0 : 1, 
          ...(animate as any) 
        }}
        transition={{ 
          opacity: { duration: 0.4 },
          ...(transition as any)
        }}
        className={cn(
          "object-cover w-full h-full",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={props.loading || "lazy"}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};
