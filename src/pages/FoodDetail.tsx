import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Plus, 
  Minus, 
  ArrowLeft, 
  Clock, 
  Flame, 
  ShoppingBag, 
  ChevronRight,
  Star
} from 'lucide-react';
import { MENU_DATA } from '../data/menu';
import { useCart } from '../context/CartContext';
import { triggerFlyToCart } from '../components/FlyToCart';
import { cn } from '../lib/utils';
import { OptimizedImage } from '../components/OptimizedImage';

export default function FoodDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, addToCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Try to get item from location state first, fallback to MENU_DATA
  const item = (location.state as any) || MENU_DATA.find(i => i.id === id);
  
  // Find if item is already in cart to sync quantity if needed, 
  // but for detail page we usually start with 1 or current cart qty
  const cartItem = cart.find(i => i.id === id);
  
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
        <h2 className="text-2xl font-bold text-charcoal dark:text-cream mb-4">Item not found</h2>
        <button 
          onClick={() => navigate('/menu')}
          className="bg-saffron text-white px-8 py-3 rounded-full font-bold shadow-lg"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    // If item already in cart, we just update to the selected quantity
    // But addToCart currently adds +1. Let's adjust logic or use updateQuantity
    if (cartItem) {
      const diff = quantity - cartItem.quantity;
      if (diff !== 0) {
        updateQuantity(item.id, diff);
      }
    } else {
      // Add multiple quantities if not in cart
      // Since addToCart only adds 1, we can call it once then update
      addToCart(item);
      if (quantity > 1) {
        updateQuantity(item.id, quantity - 1);
      }
    }
    triggerFlyToCart(e.clientX, e.clientY);
  };

  const totalPrice = item.price * quantity;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-cream dark:bg-charcoal"
    >
      {/* Header Image Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <OptimizedImage
          src={item.image} 
          alt={item.name}
          category={item.category}
          fallbackSrc={item.fallbackImage}
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
          loading="eager"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Veg/Non-Veg Badge */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2">
          <div className={cn(
            "w-4 h-4 rounded-full border-2 border-white shadow-sm",
            item.isVeg ? "bg-emerald" : "bg-red-600"
          )} />
          <span className="text-white text-xs font-bold uppercase tracking-widest drop-shadow-md">
            {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-white dark:bg-charcoal rounded-t-[40px] -mt-10 relative z-10 p-8 shadow-2xl border-t border-gold/10">
        <div className="max-w-2xl mx-auto">
          {/* Title & Category */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold text-saffron uppercase tracking-[0.2em] block mb-1">
                {item.category}
              </span>
              <h1 className="text-3xl font-bold text-charcoal dark:text-cream leading-tight">
                {item.name}
              </h1>
            </div>
            <div className="flex items-center gap-1 bg-gold/10 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-saffron fill-current" />
              <span className="text-sm font-bold text-charcoal dark:text-cream">4.8</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 mb-8 py-4 border-y border-gold/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald/10 rounded-lg flex items-center justify-center text-emerald">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40 uppercase block">Delivery</span>
                <span className="text-xs font-bold text-charcoal dark:text-cream">30 min</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-saffron/10 rounded-lg flex items-center justify-center text-saffron">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40 uppercase block">Spice Level</span>
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <Flame 
                      key={i} 
                      className={cn(
                        "w-2.5 h-2.5",
                        i < item.spiceLevel ? "text-saffron fill-current" : "text-charcoal/10 dark:text-cream/10"
                      )} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-sm font-bold text-charcoal dark:text-cream uppercase tracking-widest mb-3">About this dish</h3>
            <p className="text-charcoal/60 dark:text-cream/60 leading-relaxed text-sm">
              {item.description} Our {item.name} is prepared using authentic recipes and the finest ingredients. 
              Slow-cooked to perfection to ensure every bite is packed with flavor and tradition.
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-10 bg-cream dark:bg-white/5 p-6 rounded-[32px] border border-gold/5">
            <div>
              <span className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40 uppercase tracking-widest block mb-1">Quantity</span>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-full bg-white dark:bg-charcoal shadow-md flex items-center justify-center text-charcoal dark:text-cream hover:text-saffron transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-bold text-charcoal dark:text-cream min-w-[24px] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-10 h-10 rounded-full bg-white dark:bg-charcoal shadow-md flex items-center justify-center text-charcoal dark:text-cream hover:text-saffron transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40 uppercase tracking-widest block mb-1">Total Price</span>
              <span className="text-2xl font-bold text-saffron price-text">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="sticky bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-charcoal/80 backdrop-blur-xl border-t border-gold/10 z-20">
        <div className="max-w-2xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-saffron text-white py-5 rounded-[24px] font-bold shadow-xl shadow-saffron/20 flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItem ? 'Update Cart' : 'Add to Cart'}
            <ChevronRight className="w-4 h-4 opacity-50" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
