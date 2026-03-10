import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Package, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface OrderFormData {
  customer_name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  country: string;
  product_name: string;
  product_variant: string;
  quantity: number;
  notes: string;
}

const initialData: OrderFormData = {
  customer_name: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  country: '',
  product_name: '',
  product_variant: '',
  quantity: 1,
  notes: '',
};

export default function PlaceOrder() {
  const [formData, setFormData] = useState<OrderFormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};
    if (!formData.customer_name) newErrors.customer_name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.product_name) newErrors.product_name = 'Product name is required';
    if (formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus('idle');

    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            ...formData,
            status: 'pending',
          },
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData(initialData);
    } catch (err) {
      console.error('Error placing order:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof OrderFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center text-saffron">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-charcoal dark:text-cream">Place Order</h1>
          <p className="text-sm text-charcoal/50 dark:text-cream/50">Submit your order details below</p>
        </div>
      </div>

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-emerald/10 border border-emerald/20 rounded-2xl flex items-center gap-3 text-emerald"
        >
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">Order placed successfully!</p>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">Failed to place order. Please try again.</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 bg-white dark:bg-white/5 p-6 rounded-3xl border border-gold/10 shadow-sm">
          <h2 className="text-sm font-bold text-charcoal/40 dark:text-cream/40 uppercase tracking-widest">Customer Information</h2>
          
          <FormField
            label="Customer Name"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            error={errors.customer_name}
            placeholder="John Doe"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+1 234 567 890"
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              placeholder="New York"
            />
            <FormField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={errors.country}
              placeholder="USA"
            />
          </div>

          <FormField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            placeholder="123 Street Name"
          />
        </div>

        <div className="space-y-4 bg-white dark:bg-white/5 p-6 rounded-3xl border border-gold/10 shadow-sm">
          <h2 className="text-sm font-bold text-charcoal/40 dark:text-cream/40 uppercase tracking-widest">Product Details</h2>
          
          <FormField
            label="Product Name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            error={errors.product_name}
            placeholder="Awesome Product"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Variant"
              name="product_variant"
              value={formData.product_variant}
              onChange={handleChange}
              placeholder="Blue / Large"
            />
            <FormField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity.toString()}
              onChange={handleChange}
              error={errors.quantity}
              min="1"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40 uppercase tracking-widest ml-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Special instructions..."
              className="w-full bg-cream/50 dark:bg-charcoal/50 border border-gold/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all min-h-[100px] resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
            loading 
              ? 'bg-charcoal/10 text-charcoal/40 cursor-not-allowed' 
              : 'bg-saffron text-white hover:bg-saffron/90 active:scale-[0.98]'
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-charcoal/20 border-t-charcoal/60 rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              Place Order
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function FormField({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  type = "text", 
  placeholder,
  min
}: { 
  label: string; 
  name: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  error?: string;
  type?: string;
  placeholder?: string;
  min?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40 uppercase tracking-widest ml-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        className={`w-full bg-cream/50 dark:bg-charcoal/50 border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all ${
          error ? 'border-red-500/50' : 'border-gold/10'
        }`}
      />
      {error && <p className="text-[10px] font-bold text-red-500 ml-1">{error}</p>}
    </div>
  );
}
