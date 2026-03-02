import { ReactNode, useRef } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Home, Utensils, ShoppingCart, Calendar, Package, ChevronRight, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

import FlyToCart from './FlyToCart';

export default function Layout({ children }: { children: ReactNode }) {
  const { totalItems, subtotal } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';
  const constraintsRef = useRef(null);

  return (
    <div ref={constraintsRef} className="min-h-screen flex flex-col max-w-md mx-auto bg-cream dark:bg-charcoal shadow-2xl relative overflow-x-hidden transition-colors duration-300">
      <FlyToCart />
      {/* Header */}
      <header className="sticky top-0 z-50 h-[53px] bg-white/90 dark:bg-charcoal/90 backdrop-blur-md border-b border-gold/20 px-4 flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center text-white font-bold italic">E</div>
          <span className="text-xl font-bold text-charcoal dark:text-cream tracking-tight">Exzibo.com</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gold/10 rounded-full transition-colors text-charcoal dark:text-cream"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <NavLink to="/cart" id="header-cart-icon" className="relative p-2 hover:bg-gold/10 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6 text-charcoal dark:text-cream" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 bg-saffron w-2.5 h-2.5 rounded-full border-2 border-white dark:border-charcoal shadow-sm"
              />
            )}
          </NavLink>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mandala-pattern pb-24">
        {children}
      </main>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {totalItems > 0 && !isCartPage && (
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-24 right-6 z-50 cursor-grab active:cursor-grabbing"
          >
            <Link to="/cart" onClick={(e) => {
              // Prevent navigation if dragging occurred
              // This is a simple way to handle drag vs click
            }}>
              <div className="w-14 h-14 bg-saffron text-white rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(255,37,37,0.4)] hover:bg-red-600 transition-colors relative">
                <ShoppingCart className="w-6 h-6" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-white w-3 h-3 rounded-full border-2 border-saffron shadow-sm"
                />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-charcoal border-t border-gold/20 px-4 py-3 flex items-center justify-between z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors duration-300">
        <NavItem to="/" icon={<Home className="w-5 h-5" />} label="Home" />
        <NavItem to="/menu" icon={<Utensils className="w-5 h-5" />} label="Menu" />
        <NavItem to="/cart" icon={<ShoppingCart className="w-5 h-5" />} label="Cart" badge={totalItems} />
        <NavItem to="/orders" icon={<Package className="w-5 h-5" />} label="Orders" />
        <NavItem to="/reservations" icon={<Calendar className="w-5 h-5" />} label="Book" />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, badge }: { to: string; icon: ReactNode; label: string; badge?: number }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex flex-col items-center gap-1 transition-all duration-300",
        isActive ? "text-saffron scale-110" : "text-charcoal/50 dark:text-cream/40 hover:text-charcoal dark:hover:text-cream"
      )}
    >
      <div className="relative">
        {icon}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-saffron w-2 h-2 rounded-full border border-white dark:border-charcoal" />
        )}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </NavLink>
  );
}
