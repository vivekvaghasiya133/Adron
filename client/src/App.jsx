import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Ingredients from './pages/Ingredients';
import BestSellers from './pages/BestSellers';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsPolicy from './pages/ReturnsPolicy';
import FaqPage from './pages/FaqPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Admin from './pages/Admin';

// Scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {/* Show store header and cart only on customer pages */}
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <CartDrawer />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/bestsellers" element={<BestSellers />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/returns-policy" element={<ReturnsPolicy />} />
          <Route path="/returns-exchange" element={<ReturnsPolicy />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* Show store footer only on customer pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <div className="min-h-screen flex flex-col justify-between bg-[#FAF8F5] text-[#1A221E]">
          <MainLayout />
        </div>
      </ShopProvider>
    </BrowserRouter>
  );
}
