import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import AdronLogo from './AdronLogo';

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen, user, logoutUser } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white transition-all">
      {/* Top Olive Green Announcement Bar - Exact Match to Figma */}
      <div className="bg-[#82AF28] text-white text-[11px] sm:text-xs py-2 px-4 text-center tracking-normal font-medium flex items-center justify-center">
        <span>Free shipping on orders above ₹999 | Use code GLOW20 for 20% off</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Mobile menu toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2D3748] hover:text-[#8DAF3E] transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Brand Logo - Exact Serif Wordmark with Leaf Motif */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <img
              src="/figma_landing/adron_logo_transparent.png"
              alt="Adron"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links - Exact Match to Figma */}
        <div className="hidden lg:flex items-center space-x-7 xl:space-x-8 text-[13px] font-medium text-[#2D3748]">
          <Link
            to="/shop"
            className={`transition-colors ${
              location.pathname === '/shop' ? 'text-[#8DAF3E] font-semibold' : 'hover:text-[#8DAF3E]'
            }`}
          >
            Shop
          </Link>
          <Link
            to="/product/okra-shampoo"
            className={`transition-colors ${
              location.pathname === '/product/okra-shampoo' ? 'text-[#8DAF3E] font-semibold' : 'hover:text-[#8DAF3E]'
            }`}
          >
            Okra Shampoo
          </Link>
          <Link
            to="/product/okra-facewash"
            className={`transition-colors ${
              location.pathname === '/product/okra-facewash' ? 'text-[#8DAF3E] font-semibold' : 'hover:text-[#8DAF3E]'
            }`}
          >
            Okra Facewash
          </Link>
          <Link
            to="/product/okra-serum"
            className={`transition-colors ${
              location.pathname === '/product/okra-serum' ? 'text-[#8DAF3E] font-semibold' : 'hover:text-[#8DAF3E]'
            }`}
          >
            Okra Serum
          </Link>
          <Link
            to="/bestsellers"
            className={`transition-colors ${
              location.pathname === '/bestsellers' || location.pathname === '/best-sellers' || location.search.includes('bestseller') ? 'text-[#8DAF3E] font-semibold' : 'hover:text-[#8DAF3E]'
            }`}
          >
            Best Sellers
          </Link>
          <Link
            to="/ingredients"
            className={`transition-colors ${
              location.pathname === '/ingredients' ? 'text-[#8DAF3E] font-semibold' : 'hover:text-[#8DAF3E]'
            }`}
          >
            Ingredients
          </Link>
        </div>

        {/* Right Action Icons - Exact 4 Clean Icons matching Figma */}
        <div className="flex items-center space-x-4 sm:space-x-5 text-[#2D3748]">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1 hover:text-[#8DAF3E] transition"
            title="Search Products"
          >
            <Search size={19} strokeWidth={1.75} />
          </button>

          {/* User Account / Sign In */}
          {user ? (
            <div className="relative group">
              <button className="p-1 hover:text-[#8DAF3E] transition flex items-center">
                <User size={19} strokeWidth={1.75} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-[#E8E4DA] hidden group-hover:block animate-fade-in z-50">
                <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500">
                  Signed in as <br /><strong className="text-gray-800">{user.email}</strong>
                </div>
                <Link to="/favorites" className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#FAF8F5]">
                  My Saved Items ({wishlist.length})
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-2 text-xs text-[#153323] font-bold hover:bg-[#EAF1E8]">
                    ⚙️ Admin Portal
                  </Link>
                )}
                <button
                  onClick={logoutUser}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="p-1 hover:text-[#8DAF3E] transition"
              title="Sign In / Account"
            >
              <User size={19} strokeWidth={1.75} />
            </Link>
          )}

          {/* Favorites / Wishlist */}
          <Link
            to="/favorites"
            className="p-1 hover:text-[#8DAF3E] transition relative"
            title="Wishlist"
          >
            <Heart size={19} strokeWidth={1.75} className={wishlist.length > 0 ? "fill-[#C24B4B] text-[#C24B4B]" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8DAF3E] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-1 hover:text-[#8DAF3E] transition relative"
            title="Cart"
          >
            <ShoppingBag size={19} strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8DAF3E] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-[#E8E4DA] bg-white px-4 py-3 animate-fade-in shadow-inner">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Okra Shampoo, Face Wash, Glow Serum..."
              className="w-full text-sm outline-none bg-transparent py-1 text-gray-800"
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#153323] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#204b34] transition flex items-center gap-1"
            >
              Search <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-xs text-gray-400 hover:text-gray-700"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E4DA] px-6 py-6 space-y-4 animate-fade-in text-base font-medium">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-[#153323] hover:text-[#5B7E52]">
            Home
          </Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-[#153323] hover:text-[#5B7E52]">
            Shop
          </Link>
          <Link to="/product/okra-shampoo" onClick={() => setMobileMenuOpen(false)} className="block text-[#153323] hover:text-[#5B7E52]">
            Okra Shampoo
          </Link>
          <Link to="/product/okra-facewash" onClick={() => setMobileMenuOpen(false)} className="block text-[#153323] hover:text-[#5B7E52]">
            Okra Facewash
          </Link>
          <Link to="/product/okra-serum" onClick={() => setMobileMenuOpen(false)} className="block text-[#153323] hover:text-[#5B7E52]">
            Okra Serum
          </Link>
          <Link to="/bestsellers" onClick={() => setMobileMenuOpen(false)} className="block text-[#153323] hover:text-[#5B7E52]">
            Best Sellers
          </Link>
          <Link to="/ingredients" onClick={() => setMobileMenuOpen(false)} className="block text-[#153323] hover:text-[#5B7E52]">
            Ingredients
          </Link>
          <Link to="/ingredients" onClick={() => setMobileMenuOpen(false)} className="block text-[#153323] hover:text-[#5B7E52]">
            Ingredients Science
          </Link>
          <Link to="/favorites" onClick={() => setMobileMenuOpen(false)} className="block text-[#153323] hover:text-[#5B7E52]">
            My Favorites ({wishlist.length})
          </Link>
          {!user ? (
            <div className="pt-4 border-t border-gray-200 flex gap-4">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 bg-[#153323] text-white text-center py-2.5 rounded-lg text-sm">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 bg-white border border-[#153323] text-[#153323] text-center py-2.5 rounded-lg text-sm">
                Register
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200">
              <button onClick={() => { logoutUser(); setMobileMenuOpen(false); }} className="w-full text-left py-2 text-sm text-red-600">
                Sign Out ({user.name})
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
