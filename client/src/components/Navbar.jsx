import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen, user, logoutUser } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E4DA] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#153323] text-[#EAF1E8] text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span>✨ 100% Cold-Pressed Organic Okra Formulation — Free Shipping on Orders Over $50! Use code <strong className="text-white underline">ADRON15</strong> for 15% off</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#153323] hover:text-[#799A70] transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            {/* Botanical Okra/Leaf SVG emblem matching Figma */}
            <div className="w-9 h-9 rounded-full bg-[#153323] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L9 7c-2 3.5-1 8 2 11 3-3 4-7.5 2-11L12 2z" fill="#799A70" stroke="#FAF8F5" />
                <path d="M12 22V11" />
                <path d="M12 11l-3-3" />
                <path d="M12 15l3-3" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-wider text-[#153323] font-bold uppercase">
                Adron
              </span>
              <span className="text-[9px] tracking-widest text-[#799A70] uppercase font-semibold -mt-1">
                Okra Botanical Science
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#2C3E33]">
          <Link to="/" className="hover:text-[#153323] transition pb-1 border-b-2 border-transparent hover:border-[#153323]">
            Home
          </Link>
          <Link to="/shop" className="hover:text-[#153323] transition pb-1 border-b-2 border-transparent hover:border-[#153323]">
            Shop All
          </Link>
          <Link to="/shop?category=Hair Care" className="hover:text-[#153323] transition pb-1 border-b-2 border-transparent hover:border-[#153323]">
            Hair Care
          </Link>
          <Link to="/shop?category=Skin Care" className="hover:text-[#153323] transition pb-1 border-b-2 border-transparent hover:border-[#153323]">
            Skin Care
          </Link>
          <Link to="/ingredients" className="hover:text-[#153323] transition pb-1 border-b-2 border-transparent hover:border-[#153323]">
            Ingredients
          </Link>
          <Link to="/about" className="hover:text-[#153323] transition pb-1 border-b-2 border-transparent hover:border-[#153323]">
            About Us
          </Link>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-4 sm:space-x-5 text-[#153323]">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-[#EAF1E8] rounded-full transition"
            title="Search Products"
          >
            <Search size={20} />
          </button>

          {/* Favorites / Wishlist */}
          <Link
            to="/favorites"
            className="p-2 hover:bg-[#EAF1E8] rounded-full transition relative"
            title="Wishlist"
          >
            <Heart size={20} className={wishlist.length > 0 ? "fill-[#C24B4B] text-[#C24B4B]" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#153323] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon & Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 hover:bg-[#EAF1E8] rounded-full transition relative flex items-center gap-1.5"
            title="Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#799A70] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#EAF1E8] transition text-xs font-semibold text-[#153323]">
                <div className="w-7 h-7 rounded-full bg-[#153323] text-white flex items-center justify-center text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-[#E8E4DA] hidden group-hover:block animate-fade-in">
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
              className="p-2 hover:bg-[#EAF1E8] rounded-full transition flex items-center gap-1 text-xs font-medium"
              title="Sign In"
            >
              <User size={20} />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
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
              placeholder="Search for Okra Shampoo, Face Wash, Glow Serum, Hair Mask..."
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
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#153323] hover:text-[#799A70]"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#153323] hover:text-[#799A70]"
          >
            Shop All
          </Link>
          <Link
            to="/shop?category=Hair Care"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#153323] hover:text-[#799A70]"
          >
            Hair Care
          </Link>
          <Link
            to="/shop?category=Skin Care"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#153323] hover:text-[#799A70]"
          >
            Skin Care
          </Link>
          <Link
            to="/ingredients"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#153323] hover:text-[#799A70]"
          >
            Ingredients Science
          </Link>
          <Link
            to="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#153323] hover:text-[#799A70]"
          >
            My Favorites ({wishlist.length})
          </Link>
          {!user ? (
            <div className="pt-4 border-t border-gray-200 flex gap-4">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 bg-[#153323] text-white text-center py-2.5 rounded-lg text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 bg-white border border-[#153323] text-[#153323] text-center py-2.5 rounded-lg text-sm"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  logoutUser();
                  setMobileMenuOpen(false);
                }}
                className="text-red-600 text-sm font-semibold"
              >
                Sign Out ({user.name})
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
