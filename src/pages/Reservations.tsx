import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Star, CheckCircle2, CalendarPlus, ChevronRight, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

type ReservationData = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  requests: string;
  seating: 'Indoor' | 'Outdoor' | 'Private';
};

export default function Reservations() {
  const { addBooking, customerMobile } = useCart();
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: customerMobile || '',
    email: '',
    date: '',
    time: '7:00 PM',
    guests: 2,
    occasion: 'Casual Dining',
    requests: '',
    seating: 'Indoor'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Attempt to send reservation data to Supabase, but don't let it block the local booking
      try {
        const { error: supabaseError } = await supabase.from("reservations").insert([
          {
            name: formData.name,
            phone: formData.phone,
            guests: formData.guests,
            date: formData.date,
            time: formData.time,
            notes: formData.requests
          }
        ]);
        if (supabaseError) {
          console.warn('Supabase reservation sync failed:', supabaseError);
        }
      } catch (err) {
        console.warn('Supabase connection error:', err);
      }

      const id = Math.floor(100000 + Math.random() * 900000).toString();
      setBookingId(id);
      
      addBooking({
        date: formData.date,
        time: formData.time,
        guests: formData.guests
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Reservation failed:', error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[80vh] text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-white/5 rounded-[40px] p-8 shadow-2xl border border-gold/20 w-full max-w-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron via-gold to-saffron" />
          
          <div className="w-20 h-20 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h2 className="text-3xl font-bold text-charcoal dark:text-cream mb-2">Table Reserved!</h2>
          <p className="text-charcoal/50 dark:text-cream/50 text-sm mb-8">We've sent a confirmation email to {formData.email}</p>

          <div className="bg-cream dark:bg-charcoal/50 rounded-3xl p-6 space-y-4 text-left mb-8">
            <div className="flex justify-between items-center border-b border-gold/10 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40">Booking ID</span>
              <span className="font-mono font-bold text-saffron">#{bookingId}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 block">Date</span>
                <span className="text-sm font-bold text-charcoal dark:text-cream">{formData.date}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 block">Time</span>
                <span className="text-sm font-bold text-charcoal dark:text-cream">{formData.time}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 block">Guests</span>
                <span className="text-sm font-bold text-charcoal dark:text-cream">{formData.guests} People</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 block">Seating</span>
                <span className="text-sm font-bold text-charcoal dark:text-cream">{formData.seating}</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-charcoal text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg mb-4">
            <CalendarPlus className="w-5 h-5" /> Add to Calendar
          </button>
          
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-saffron font-bold text-sm"
          >
            Make another reservation
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-charcoal dark:text-cream mb-2">Book a Table</h2>
        <p className="text-charcoal/50 dark:text-cream/50 text-sm italic">Join us for an unforgettable culinary journey.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 pb-12">
        <div className="space-y-4">
          <input
            required
            type="text"
            placeholder="Full Name"
            className="w-full bg-white dark:bg-white/5 border border-gold/20 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all dark:text-cream"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            required
            type="tel"
            placeholder="+91 Phone Number"
            className="w-full bg-white dark:bg-white/5 border border-gold/20 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all dark:text-cream"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Email Address"
            className="w-full bg-white dark:bg-white/5 border border-gold/20 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all dark:text-cream"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="bg-white dark:bg-white/5 rounded-[32px] p-6 shadow-sm border border-gold/10 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 ml-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-saffron opacity-50" />
                <input
                  required
                  type="date"
                  className="w-full bg-white dark:bg-white/5 border border-gold/20 rounded-xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all dark:text-cream"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 ml-1">Time</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-saffron opacity-50" />
                <select
                  className="w-full bg-white dark:bg-white/5 border border-gold/20 rounded-xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all appearance-none dark:text-cream"
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                >
                  {['12:00 PM', '1:00 PM', '2:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'].map(t => (
                    <option key={t} value={t} className="dark:bg-charcoal">{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 ml-1 flex justify-between">
              Number of Guests <span>{formData.guests}</span>
            </label>
            <div className="flex items-center gap-4 bg-white dark:bg-white/5 border border-gold/20 rounded-2xl p-2">
              <button 
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                className="w-10 h-10 bg-cream dark:bg-charcoal/30 rounded-xl flex items-center justify-center text-saffron shadow-sm hover:bg-white transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center font-bold text-charcoal dark:text-cream">
                <Users className="w-4 h-4 inline-block mr-2 opacity-30" />
                {formData.guests}
              </div>
              <button 
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, guests: Math.min(20, prev.guests + 1) }))}
                className="w-10 h-10 bg-cream dark:bg-charcoal/30 rounded-xl flex items-center justify-center text-saffron shadow-sm hover:bg-white transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 ml-1">Occasion</label>
            <div className="relative">
              <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-saffron opacity-50" />
              <select
                className="w-full bg-white dark:bg-white/5 border border-gold/20 rounded-xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all appearance-none dark:text-cream"
                value={formData.occasion}
                onChange={e => setFormData({ ...formData, occasion: e.target.value })}
              >
                {['Casual Dining', 'Birthday 🎂', 'Anniversary 💍', 'Business 💼', 'Other'].map(o => (
                  <option key={o} value={o} className="dark:bg-charcoal">{o}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 ml-1">Seating Preference</label>
          <div className="flex gap-2">
            {(['Indoor', 'Outdoor', 'Private'] as const).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setFormData({ ...formData, seating: s })}
                className={cn(
                  "flex-1 py-3 rounded-2xl text-xs font-bold transition-all border",
                  formData.seating === s 
                    ? "bg-charcoal dark:bg-saffron text-white border-charcoal dark:border-saffron shadow-lg" 
                    : "bg-white dark:bg-white/5 text-charcoal/40 dark:text-cream/40 border-gold/10"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 ml-1">Special Requests</label>
          <textarea
            placeholder="Any allergies or special requirements?"
            rows={3}
            className="w-full bg-white dark:bg-white/5 border border-gold/20 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all resize-none dark:text-cream"
            value={formData.requests}
            onChange={e => setFormData({ ...formData, requests: e.target.value })}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-saffron to-gold text-white py-5 rounded-3xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>Reserve My Table <ChevronRight className="w-5 h-5" /></>
          )}
        </motion.button>
      </form>
    </div>
  );
}
