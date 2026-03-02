import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ArrowRight, Star, Clock, MapPin, Plus, Instagram, Facebook, Twitter, Phone, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MENU_DATA } from '../data/menu';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

import { triggerFlyToCart } from '../components/FlyToCart';

export default function Home() {
  const { addToCart } = useCart();
  const specials = MENU_DATA.filter(item => item.isSpecial);

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    addToCart(item);
    triggerFlyToCart(e.clientX, e.clientY);
  };

  return (
    <div className="flex flex-col">
      {/* ... Hero Section ... */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <img
          src="https://picsum.photos/seed/indianfood/800/1200"
          alt="Indian Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        
        <div className="relative p-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gold mb-2 leading-tight">
              Exzibo.com
            </h1>
            <p className="text-cream/90 text-lg font-light italic mb-6">
              Authentic Indian Flavors, Reimagined
            </p>
            
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-saffron text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-xl"
              >
                Explore Menu <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Info Cards */}
      <section className="p-6 grid grid-cols-1 gap-4 -mt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-3xl flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-emerald/10 dark:bg-emerald/20 rounded-2xl flex items-center justify-center text-emerald">
            <Star className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-charcoal dark:text-cream">4.9 Rated</h3>
            <p className="text-xs text-charcoal/60 dark:text-cream/60">Top choice in the city</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-3xl flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-saffron/10 dark:bg-saffron/20 rounded-2xl flex items-center justify-center text-saffron">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-charcoal dark:text-cream">Open Now</h3>
            <p className="text-xs text-charcoal/60 dark:text-cream/60">12:00 PM - 11:00 PM</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-3xl flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-gold/10 dark:bg-gold/20 rounded-2xl flex items-center justify-center text-gold">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-charcoal dark:text-cream">Connaught Place</h3>
            <p className="text-xs text-charcoal/60 dark:text-cream/60">New Delhi, India</p>
          </div>
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-charcoal dark:text-cream">Chef's Specials</h2>
          <Link to="/menu" className="text-saffron text-sm font-bold">View All</Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {specials.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="min-w-[280px] bg-white dark:bg-white/5 rounded-[32px] overflow-hidden shadow-md border border-gold/10 flex flex-col"
            >
              <div className="p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 pt-0 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-charcoal dark:text-cream">{item.name}</h3>
                  <span className="price-text text-saffron">₹{item.price}</span>
                </div>
                <p className="text-xs text-charcoal/60 dark:text-cream/60 mb-4 line-clamp-2 flex-1">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <span className={cn("w-2 h-2 rounded-full", item.isVeg ? "bg-emerald" : "bg-red-600")} />
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider", item.isVeg ? "text-emerald" : "text-red-600")}>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleAddToCart(e, item)}
                    className="bg-saffron text-white p-2 rounded-full shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FDFCF0] dark:bg-charcoal/95 text-charcoal dark:text-cream p-8 pb-32 mt-12 border-t border-gold/10">
        <div className="max-w-md mx-auto space-y-10">
          {/* Brand & Social */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Utensils className="w-6 h-6 text-saffron" />
              <h2 className="text-2xl font-serif font-bold tracking-tight">Exzibo.com</h2>
            </div>
            <p className="text-sm text-charcoal/60 dark:text-cream/60 leading-relaxed max-w-[280px]">
              Redefining the art of dining through passion, precision, and the finest ingredients.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-charcoal/5 dark:bg-white/5 flex items-center justify-center text-charcoal/60 dark:text-cream/60 hover:bg-saffron hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-serif font-bold">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-xs text-charcoal/50 dark:text-cream/50 hover:text-saffron transition-colors">Home</Link></li>
                <li><Link to="/menu" className="text-xs text-charcoal/50 dark:text-cream/50 hover:text-saffron transition-colors">Our Menu</Link></li>
                <li><Link to="/reservations" className="text-xs text-charcoal/50 dark:text-cream/50 hover:text-saffron transition-colors">Reservations</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="space-y-4">
              <h4 className="text-sm font-serif font-bold">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-charcoal/50 dark:text-cream/50">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-saffron/60" />
                  <span className="text-[11px] leading-tight">123 Culinary Avenue, Gastronomy District, NY 10001</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal/50 dark:text-cream/50">
                  <Phone className="w-3.5 h-3.5 text-saffron/60" />
                  <span className="text-[11px]">+91 98305 18927</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold">Newsletter</h4>
            <p className="text-xs text-charcoal/50 dark:text-cream/50">Join our mailing list for exclusive events and seasonal menus.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-white dark:bg-charcoal/50 border border-gold/20 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-saffron/30"
              />
              <button className="bg-[#2D3321] text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-black transition-colors">
                Join
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-10 border-t border-gold/10 text-center">
            <p className="text-[10px] text-charcoal/30 dark:text-cream/30">
              © 2026 Exzibo Gastronomique. All rights reserved.
            </p>
          </div>
        </div>

      </footer>
    </div>
  );
}
