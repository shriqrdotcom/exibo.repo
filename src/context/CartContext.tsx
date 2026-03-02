import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Main Course' | 'Drinks';
  isVeg: boolean;
  spiceLevel: 0 | 1 | 2 | 3;
  image: string;
  isSpecial?: boolean;
};

export type CartItem = MenuItem & {
  quantity: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Preparing' | 'Out for Delivery' | 'Delivered';
  mobileNumber: string;
};

export type Booking = {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
};

type CartContextType = {
  cart: CartItem[];
  orders: Order[];
  bookings: Booking[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: (mobileNumber: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  totalItems: number;
  subtotal: number;
  gst: number;
  grandTotal: number;
  discount: number;
  applyCoupon: (code: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('exzibo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('exzibo_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('exzibo_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('exzibo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('exzibo_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('exzibo_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = subtotal * 0.05;
  const discountAmount = subtotal * discount;
  const grandTotal = subtotal + gst - discountAmount;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (mobileNumber: string) => {
    if (cart.length === 0) return;
    
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: [...cart],
      total: grandTotal,
      date: new Date().toLocaleString(),
      status: 'Preparing',
      mobileNumber: mobileNumber
    };
    
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `BKG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'Confirmed'
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const applyCoupon = (code: string) => {
    if (code.toUpperCase() === 'SPICE10') {
      setDiscount(0.1);
      return true;
    }
    return false;
  };

  return (
    <CartContext.Provider value={{
      cart,
      orders,
      bookings,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
      addBooking,
      totalItems,
      subtotal,
      gst,
      grandTotal,
      discount: discountAmount,
      applyCoupon,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
