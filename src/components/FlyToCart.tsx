import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart } from 'lucide-react';

interface FlyItem {
  id: number;
  startX: number;
  startY: number;
}

export default function FlyToCart() {
  const [items, setItems] = useState<FlyItem[]>([]);

  const triggerFly = useCallback((e: any) => {
    const { x, y } = e.detail;
    const id = Date.now();
    setItems((prev) => [...prev, { id, startX: x, startY: y }]);
    
    // Cleanup after animation
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    window.addEventListener('fly-to-cart' as any, triggerFly);
    return () => window.removeEventListener('fly-to-cart' as any, triggerFly);
  }, [triggerFly]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {items.map((item) => (
          <FlyParticle key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function FlyParticle(props: { item: FlyItem; key?: any }) {
  const { item } = props;
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cartIcon = document.getElementById('header-cart-icon');
    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect();
      setTargetPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, []);

  if (targetPos.x === 0) return null;

  return (
    <motion.div
      initial={{ 
        x: item.startX - 12, 
        y: item.startY - 12, 
        scale: 1, 
        opacity: 1 
      }}
      animate={{ 
        x: targetPos.x - 12, 
        y: targetPos.y - 12, 
        scale: 0.2, 
        opacity: 0.5 
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      className="absolute w-6 h-6 bg-saffron rounded-full flex items-center justify-center text-white shadow-lg"
    >
      <ShoppingCart className="w-3 h-3" />
    </motion.div>
  );
}

export function triggerFlyToCart(x: number, y: number) {
  const event = new CustomEvent('fly-to-cart', { detail: { x, y } });
  window.dispatchEvent(event);
}
