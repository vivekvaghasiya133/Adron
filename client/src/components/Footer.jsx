import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import AdronLogo from './AdronLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#0D1912] text-[#FAF8F5] pt-14 pb-10 border-t border-[#182F22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <AdronLogo light={true} showTagline={true} />
            </Link>
            <p className="text-xs text-[#9DBA95] leading-relaxed max-w-sm">
              Pure botanical formulations crafted with organic cold-pressed okra extract. Ethically sourced, clinically verified, 100% vegan.
            </p>
            <div className="flex items-center gap-3 text-[#A3C79B] pt-1">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-[#182F22] hover:bg-[#254231] rounded-full transition" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-[#182F22] hover:bg-[#254231] rounded-full transition" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-[#182F22] hover:bg-[#254231] rounded-full transition" aria-label="Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-xs font-bold text-white tracking-widest uppercase">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs text-[#9DBA95]">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Shop All</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Best Sellers</Link></li>
              <li><Link to="/ingredients" className="hover:text-white transition">Ingredients</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif text-xs font-bold text-white tracking-widest uppercase">
              Customer Care
            </h5>
            <ul className="space-y-2 text-xs text-[#9DBA95]">
              <li><Link to="/cart" className="hover:text-white transition">Track Order</Link></li>
              <li><Link to="/checkout" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link to="/checkout" className="hover:text-white transition">Returns & Exchange</Link></li>
              <li><Link to="/product/okra-shampoo" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/admin" className="hover:text-white transition text-[#A3C79B] font-semibold">Merchant Admin Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Stay Connected Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif text-xs font-bold text-white tracking-widest uppercase">
              Stay Connected
            </h5>
            <p className="text-xs text-[#9DBA95] leading-relaxed">
              Subscribe to our newsletter for 15% off your first order, clean beauty rituals, and exclusive product drops.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#A7C99E] bg-[#182F22] p-2.5 rounded-lg border border-[#799A70]/30">
                <CheckCircle2 size={15} />
                <span>Subscribed! Use code <strong>ADRON15</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center bg-[#182F22] border border-[#2B4E38] rounded-md overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-gray-400 outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-[#A3C79B] hover:text-white transition"
                  title="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright line matching Figma */}
        <div className="pt-8 border-t border-[#1C3325] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7B9582] gap-3">
          <p>© 2026 Adron Botanical Beauty. All rights reserved.</p>
          <p>Designed & Formulated in India • Worldwide Shipping</p>
        </div>
      </div>
    </footer>
  );
}
