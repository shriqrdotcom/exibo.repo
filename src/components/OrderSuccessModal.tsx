import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Package, Phone, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  mobileNumber: string;
}

export default function OrderSuccessModal({ isOpen, onClose, orderId, mobileNumber }: OrderSuccessModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  const handleTrackOrder = () => {
    onClose();
    navigate('/orders');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-white dark:bg-charcoal rounded-[40px] p-8 shadow-2xl border border-gold/10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-charcoal/20 dark:text-cream/20 hover:text-saffron transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              {/* Animated Checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 bg-emerald/10 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-charcoal dark:text-cream mb-2"
              >
                Order Placed Successfully!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-charcoal/60 dark:text-cream/60 mb-8"
              >
                Thank you for your order. We are preparing your delicious food!
              </motion.p>

              {/* Info Cards */}
              <div className="w-full space-y-3 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-cream dark:bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-gold/5"
                >
                  <div className="w-10 h-10 bg-saffron/10 rounded-xl flex items-center justify-center text-saffron">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40 uppercase tracking-widest block">Order ID</span>
                    <span className="text-sm font-bold text-charcoal dark:text-cream">{orderId}</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-cream dark:bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-gold/5"
                >
                  <div className="w-10 h-10 bg-emerald/10 rounded-xl flex items-center justify-center text-emerald">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40 uppercase tracking-widest block">Mobile Number</span>
                    <span className="text-sm font-bold text-charcoal dark:text-cream">{mobileNumber}</span>
                  </div>
                </motion.div>
              </div>

              {/* Actions */}
              <div className="w-full space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTrackOrder}
                  className="w-full bg-saffron text-white py-4 rounded-2xl font-bold shadow-lg shadow-saffron/20 flex items-center justify-center gap-2"
                >
                  Track Order <ArrowRight className="w-4 h-4" />
                </motion.button>
                <button
                  onClick={onClose}
                  className="w-full py-4 text-sm font-bold text-charcoal/40 dark:text-cream/40 hover:text-charcoal dark:hover:text-cream transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
