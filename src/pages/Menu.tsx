import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_DATA } from '../data/menu';
import { useCart, MenuItem } from '../context/CartContext';
import { Plus, Minus, ShoppingBag, Flame } from 'lucide-react';
import { cn } from '../lib/utils';

import { triggerFlyToCart } from '../components/FlyToCart';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<'Starters' | 'Main Course' | 'Drinks'>('Starters');
  const { cart, addToCart, updateQuantity } = useCart();

  const handleAdd = (e: React.MouseEvent, item: MenuItem) => {
    addToCart(item);
    triggerFlyToCart(e.clientX, e.clientY);
  };

  const categories = ['Starters', 'Main Course', 'Drinks'] as const;
  const filteredItems = MENU_DATA.filter(item => item.category === activeCategory);

  // Scroll to top when category changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-full">
      {/* Category Tabs */}
      <div className="sticky top-[53px] z-40 bg-white/40 dark:bg-charcoal/40 backdrop-blur-xl border-b border-white/20 dark:border-white/10 p-4 flex justify-center transition-all duration-300">
        <div className="bg-white dark:bg-white/5 p-1.5 rounded-[20px] shadow-lg border border-gold/10 flex w-full max-w-sm relative">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all relative z-10",
                activeCategory === cat ? "text-white" : "text-charcoal/50 dark:text-cream/50"
              )}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-saffron rounded-[14px] -z-10 shadow-md shadow-saffron/20"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-4 min-h-[60vh]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {filteredItems.map((item) => {
              const qty = cart.find(i => i.id === item.id)?.quantity ?? 0;
              return (
                <MenuCard
                  key={item.id}
                  item={item}
                  cartQuantity={qty}
                  onAdd={(e) => handleAdd(e, item)}
                  onUpdate={(delta) => updateQuantity(item.id, delta)}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

interface MenuCardProps {
  key?: string | number;
  item: MenuItem;
  cartQuantity: number;
  onAdd: (e: React.MouseEvent) => void;
  onUpdate: (delta: number) => void;
}

function MenuCard({ item, cartQuantity, onAdd, onUpdate }: MenuCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-white/5 rounded-3xl p-4 flex gap-4 shadow-sm border border-gold/5 hover:shadow-md transition-all duration-300"
    >
      {/* Image / Gradient Placeholder */}
      <div className={cn(
        "w-32 h-24 rounded-xl overflow-hidden relative flex-shrink-0 bg-cream dark:bg-charcoal/50 shadow-inner",
        item.category === 'Starters' ? "bg-red-50 dark:bg-red-900/10" : 
        item.category === 'Main Course' ? "bg-red-50 dark:bg-red-900/10" : "bg-blue-50 dark:bg-blue-900/10"
      )}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover opacity-90 transition-transform hover:scale-110 duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2">
          <div className={cn(
            "w-3 h-3 rounded-full border-2 border-white shadow-sm",
            item.isVeg ? "bg-emerald" : "bg-red-600"
          )} />
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-charcoal dark:text-cream leading-tight">{item.name}</h3>
            <div className="flex gap-0.5">
              {[...Array(item.spiceLevel)].map((_, i) => (
                <Flame key={i} className="w-3 h-3 text-saffron fill-current" />
              ))}
            </div>
          </div>
          <p className="text-[10px] text-charcoal/50 dark:text-cream/50 mt-1 line-clamp-1">{item.description}</p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <motion.span 
            key={cartQuantity}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="price-text text-lg text-charcoal dark:text-cream"
          >
            ₹{item.price}
          </motion.span>
          
          <AnimatePresence initial={false}>
            {cartQuantity === 0 ? (
              <motion.button
                key="add"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => onAdd(e)}
                className="bg-saffron text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md"
              >
                <Plus className="w-3 h-3" /> Add
              </motion.button>
            ) : (
              <motion.div
                key="quantity"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3 bg-gold/10 dark:bg-gold/20 rounded-full px-2 py-1 border border-gold/20"
              >
                <button onClick={() => onUpdate(-1)} className="p-1 text-saffron hover:bg-white dark:hover:bg-charcoal rounded-full transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-charcoal dark:text-cream min-w-[12px] text-center">{cartQuantity}</span>
                <button 
                  onClick={(e) => {
                    onUpdate(1);
                    triggerFlyToCart(e.clientX, e.clientY);
                  }} 
                  className="p-1 text-saffron hover:bg-white dark:hover:bg-charcoal rounded-full transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
