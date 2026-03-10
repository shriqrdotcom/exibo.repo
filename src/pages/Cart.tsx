import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, Ticket, ArrowRight, ShoppingBag, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { OptimizedImage } from '../components/OptimizedImage';
import OrderSuccessModal from '../components/OrderSuccessModal';
import { supabase } from '../lib/supabase';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal, gst, discount, grandTotal, applyCoupon, clearCart, placeOrder, customerMobile, setCustomerMobile, customerName, setCustomerName } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isOrdering, setIsOrdering] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [nameError, setNameError] = useState('');
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleApplyCoupon = () => {
    const success = applyCoupon(couponCode);
    setCouponStatus(success ? 'success' : 'error');
  };

  const handlePlaceOrder = async () => {
    setMobileError('');
    setNameError('');
    
    if (!customerName.trim()) {
      setNameError('Full name is required.');
      return;
    }

    if (!customerMobile.trim()) {
      setMobileError('Mobile number is required to confirm your order.');
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(customerMobile)) {
      setMobileError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsOrdering(true);
    
    try {
      // Attempt to send the order data to Supabase, but don't let it block the order
      try {
        const { error: supabaseError } = await supabase.from("orders").insert([
          {
            customer_name: customerName,
            mobile_number: customerMobile,
            items: cart,
            total_price: grandTotal
          }
        ]);
        if (supabaseError) {
          console.warn('Supabase sync failed:', supabaseError);
        }
      } catch (err) {
        console.warn('Supabase connection error:', err);
      }

      // Capture order details before clearing cart
      const currentName = customerName;
      const currentMobile = customerMobile;
      
      const orderId = placeOrder(currentName, currentMobile);
      
      if (orderId) {
        setLastOrderId(orderId);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Order placement failed:', error);
      alert("Something went wrong. Please try again.");
    } finally {
      if (isMounted.current) {
        setIsOrdering(false);
      }
    }
  };

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-48 h-48 bg-gold/10 rounded-full flex items-center justify-center mb-8"
        >
          <ShoppingBag className="w-24 h-24 text-gold/40" />
        </motion.div>
        <h2 className="text-2xl font-bold text-charcoal dark:text-cream mb-2">Your cart is empty</h2>
        <p className="text-charcoal/50 dark:text-cream/50 text-sm mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/menu">
          <button className="bg-saffron text-white px-8 py-4 rounded-full font-bold shadow-lg">
            Browse Menu
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <OrderSuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
        orderId={lastOrderId}
        mobileNumber={customerMobile}
      />
      <h2 className="text-2xl font-bold text-charcoal dark:text-cream px-2">Your Order</h2>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-white/5 rounded-3xl p-4 flex gap-4 shadow-sm border border-gold/5"
          >
            <OptimizedImage
              src={item.image}
              alt={item.name}
              category={item.category}
              className="w-20 h-20 rounded-xl object-cover"
              containerClassName="w-20 h-20 rounded-xl"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-charcoal dark:text-cream text-sm">{item.name}</h3>
                <button onClick={() => removeFromCart(item.id)} className="text-charcoal/20 dark:text-cream/20 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <motion.span 
                  key={item.quantity}
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="price-text text-saffron"
                >
                  ₹{item.price * item.quantity}
                </motion.span>
                <div className="flex items-center gap-3 bg-gold/5 dark:bg-gold/10 rounded-full px-2 py-1 border border-gold/10">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-charcoal/40 dark:text-cream/40 hover:text-saffron">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-charcoal dark:text-cream min-w-[12px] text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-charcoal/40 dark:text-cream/40 hover:text-saffron">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coupon Section */}
      <div className="bg-white dark:bg-white/5 rounded-3xl p-4 shadow-sm border border-gold/5">
        <div className="flex items-center gap-2 mb-3">
          <Ticket className="w-4 h-4 text-saffron" />
          <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 dark:text-cream/60">Apply Coupon</span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter code (SPICE10)"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
              setCouponStatus('idle');
            }}
            className="w-full bg-cream dark:bg-charcoal/50 rounded-2xl pl-4 pr-24 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/20 dark:text-cream border border-gold/10 transition-all"
          />
          <button
            onClick={handleApplyCoupon}
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-saffron text-white px-5 rounded-xl text-xs font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all"
          >
            Apply
          </button>
        </div>
        {couponStatus === 'success' && <p className="text-[10px] text-emerald font-bold mt-2">Coupon applied successfully! 10% off.</p>}
        {couponStatus === 'error' && <p className="text-[10px] text-red-500 font-bold mt-2">Invalid coupon code.</p>}
      </div>

      {/* Customer Info Section */}
      <div className="bg-white dark:bg-white/5 rounded-3xl p-4 shadow-sm border border-gold/5 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-saffron" />
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 dark:text-cream/60">Full Name</span>
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter your full name"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (nameError) setNameError('');
              }}
              className={cn(
                "w-full bg-cream dark:bg-charcoal/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 border transition-all dark:text-cream",
                nameError 
                  ? "border-red-500 focus:ring-red-500/20" 
                  : "border-gold/10 focus:ring-saffron/20"
              )}
            />
            {nameError && (
              <p className="text-[10px] text-red-500 font-bold ml-1">
                {nameError}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Phone className="w-4 h-4 text-saffron" />
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 dark:text-cream/60">Mobile Number</span>
          </div>
          <div className="space-y-2">
            <input
              type="tel"
              placeholder="Enter your 10-digit mobile number"
              value={customerMobile}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                setCustomerMobile(val);
                if (mobileError) setMobileError('');
              }}
              className={cn(
                "w-full bg-cream dark:bg-charcoal/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 border transition-all dark:text-cream",
                mobileError 
                  ? "border-red-500 focus:ring-red-500/20" 
                  : "border-gold/10 focus:ring-saffron/20"
              )}
            />
            {mobileError && (
              <p className="text-[10px] text-red-500 font-bold ml-1">
                {mobileError}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-charcoal dark:bg-white/5 text-cream rounded-[40px] p-8 space-y-4 shadow-2xl border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron via-gold to-saffron opacity-50" />
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-saffron/10 rounded-full blur-3xl group-hover:bg-saffron/20 transition-all duration-700" />
        
        <div className="flex justify-between items-center text-sm relative z-10">
          <span className="opacity-60 font-medium">Subtotal</span>
          <motion.span 
            key={subtotal}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="price-text !text-cream font-bold"
          >
            ₹{subtotal}
          </motion.span>
        </div>
        <div className="flex justify-between items-center text-sm relative z-10">
          <span className="opacity-60 font-medium">GST (5%)</span>
          <motion.span 
            key={gst}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="price-text !text-cream font-bold"
          >
            ₹{gst.toFixed(2)}
          </motion.span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between items-center text-sm text-gold relative z-10">
            <span className="opacity-80 font-medium italic">Discount Applied</span>
            <motion.span 
              key={discount}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="price-text !text-gold font-bold"
            >
              -₹{discount.toFixed(2)}
            </motion.span>
          </div>
        )}
        <div className="h-px bg-white/10 my-2 relative z-10" />
        <div className="flex justify-between items-center text-xl relative z-10">
          <span className="font-bold tracking-tight">Grand Total</span>
          <motion.span 
            key={grandTotal}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="price-text text-gold text-3xl drop-shadow-[0_0_15px_rgba(242,125,38,0.3)]"
          >
            ₹{grandTotal.toFixed(2)}
          </motion.span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlaceOrder}
          disabled={isOrdering}
          className="w-full bg-saffron text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOrdering ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Place Order <ArrowRight className="w-5 h-5" /></>
          )}
        </motion.button>
      </div>
    </div>
  );
}
