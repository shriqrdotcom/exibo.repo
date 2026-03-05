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

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc,
  category,
  ...props
}) => {
  const finalFallback = fallbackSrc || (category ? FALLBACKS[category] : FALLBACKS.default) || FALLBACKS.default;
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentSrc, setCurrentSrc] = React.useState(src || finalFallback);

  React.useEffect(() => {
    setCurrentSrc(src || finalFallback);
    setIsLoading(true);
  }, [src, finalFallback]);

  const handleError = () => {
    // If the primary image fails and we're not already showing the fallback, switch to fallback
    if (currentSrc !== finalFallback) {
      console.warn(`Image failed to load: ${currentSrc}. Switching to fallback.`);
      setCurrentSrc(finalFallback);
    } else {
      // If the fallback also fails, or we started with the fallback and it failed, stop loading
      console.error(`Fallback image failed to load: ${currentSrc}`);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn("relative overflow-hidden bg-charcoal/5 dark:bg-white/5", containerClassName)}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-charcoal/10 dark:bg-white/10 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <motion.img
        src={currentSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager" // Use eager for detail page and critical UI
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};
