import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Calendar, ChevronRight, Package, Clock, CheckCircle2, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Orders() {
  const { orders, bookings } = useCart();
  const [activeTab, setActiveTab] = useState<'orders' | 'bookings'>('orders');

  return (
    <div className="flex flex-col min-h-full">
      {/* Tabs */}
      <div className="sticky top-[53px] z-40 bg-white/90 dark:bg-charcoal/90 backdrop-blur-md border-b border-gold/10 flex px-2 overflow-x-auto no-scrollbar shadow-sm transition-colors duration-300">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 px-6 py-4 text-sm font-bold transition-all relative ${activeTab === 'orders' ? 'text-saffron' : 'text-charcoal/40 dark:text-cream/40'}`}
        >
          Orders
          {activeTab === 'orders' && (
            <motion.div layoutId="activeOrderTab" className="absolute bottom-0 left-0 right-0 h-1 bg-saffron rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 px-6 py-4 text-sm font-bold transition-all relative ${activeTab === 'bookings' ? 'text-saffron' : 'text-charcoal/40 dark:text-cream/40'}`}
        >
          Bookings
          {activeTab === 'bookings' && (
            <motion.div layoutId="activeOrderTab" className="absolute bottom-0 left-0 right-0 h-1 bg-saffron rounded-t-full" />
          )}
        </button>
      </div>

      <div className="p-4 space-y-4">
        <AnimatePresence mode="wait">
          {activeTab === 'orders' ? (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {orders.length === 0 ? (
                <EmptyState icon={<Package className="w-12 h-12" />} title="No orders yet" description="Your order history will appear here once you place an order." />
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white dark:bg-white/5 rounded-3xl p-5 shadow-sm border border-gold/5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40 uppercase tracking-widest block mb-1">Order ID</span>
                        <span className="text-sm font-bold text-charcoal dark:text-cream">{order.id}</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-emerald/10 text-emerald text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {order.status}
                        </div>
                        <div className="bg-saffron/10 text-saffron text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5" />
                          {order.mobileNumber}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-charcoal/60 dark:text-cream/60">
                      <Clock className="w-3 h-3" />
                      {order.date}
                    </div>

                    <div className="border-t border-gold/5 pt-4">
                      <div className="flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, i) => (
                            <img key={i} src={item.image} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-cream flex items-center justify-center text-[10px] font-bold text-charcoal/40">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="price-text text-lg text-saffron">₹{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {bookings.length === 0 ? (
                <EmptyState icon={<Calendar className="w-12 h-12" />} title="No bookings yet" description="Your table reservations will appear here." />
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-white dark:bg-white/5 rounded-3xl p-5 shadow-sm border border-gold/5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40 uppercase tracking-widest block mb-1">Booking ID</span>
                        <span className="text-sm font-bold text-charcoal dark:text-cream">{booking.id}</span>
                      </div>
                      <div className="bg-saffron/10 text-saffron text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {booking.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-charcoal/30 dark:text-cream/30 uppercase tracking-widest block">Date</span>
                        <span className="text-xs font-bold text-charcoal dark:text-cream">{booking.date}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-charcoal/30 dark:text-cream/30 uppercase tracking-widest block">Time</span>
                        <span className="text-xs font-bold text-charcoal dark:text-cream">{booking.time}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-charcoal/30 dark:text-cream/30 uppercase tracking-widest block">Guests</span>
                        <span className="text-xs font-bold text-charcoal dark:text-cream">{booking.guests} People</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[50vh]">
      <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-6 text-gold/40 dark:text-gold/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-charcoal dark:text-cream mb-2">{title}</h3>
      <p className="text-sm text-charcoal/50 dark:text-cream/50 max-w-[200px]">{description}</p>
      <Link to="/menu" className="mt-8">
        <button className="bg-saffron text-white px-8 py-3 rounded-full font-bold shadow-lg">
          Explore Menu
        </button>
      </Link>
    </div>
  );
}
