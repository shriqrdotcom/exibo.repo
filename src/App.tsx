import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Reservations from './pages/Reservations';
import Orders from './pages/Orders';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}
