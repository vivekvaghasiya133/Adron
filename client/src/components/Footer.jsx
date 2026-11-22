import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import AdronLogo from './AdronLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0E1B13] text-[#FAF8F5] pt-16 pb-12 border-t border-[#1C3325]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4 Botanical Guarantees / Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#1C3325] text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#182F22] flex items-center justify-center text-[#9DBA95]">
              <Leaf size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Pure Okra Extract</h4>
              <p className="text-xs text-[#9DBA95]">100% cold-pressed mucilage</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#182F22] flex items-center justify-center text-[#9DBA95]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Clean Science</h4>
              <p className="text-xs text-[#9DBA95]">Dermatologist approved</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#182F22] flex items-center justify-center text-[#9DBA95]">
              <HeartHandshake size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Cruelty-Free</h4>
              <p className="text-xs text-[#9DBA95]">100% Vegan & Leaping Bunny</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#182F22] flex items-center justify-center text-[#9DBA95]">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Eco Responsible</h4>
              <p className="text-xs text-[#9DBA95]">Recyclable glass & bottles</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12">
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="inline-block">
              <AdronLogo light={true} showTagline={true} />
            </Link>
            <p className="text-xs text-[#B5C7B2] leading-relaxed max-w-sm">
              Adron harnesses the clinical power of cold-pressed okra mucilage and active bio-botanicals to deliver weightless deep cellular hydration for hair and skin.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#EAF1E8] block mb-2">
                Join the Clean Beauty Circle — Get 15% Off
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#A7C99E] bg-[#1B3626] p-3 rounded-lg border border-[#799A70]/30">
                  <CheckCircle2 size={16} />
                  <span>Success! Use promo code <strong>ADRON15</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-[#182F22] border border-[#2B4E38] rounded-full px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#799A70]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#5B7E52] hover:bg-[#6C9461] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition flex items-center gap-1.5"
                  >
                    <span>{loading ? 'Subscribing...' : 'Join'}</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">
              Shop
            </h5>
            <ul className="space-y-2 text-xs text-[#9DBA95]">
              <li><Link to="/shop?category=Hair Care" className="hover:text-white transition">Hair Care</Link></li>
              <li><Link to="/shop?category=Skin Care" className="hover:text-white transition">Skin Care</Link></li>
              <li><Link to="/shop?category=Serums" className="hover:text-white transition">Serums & Elixirs</Link></li>
              <li><Link to="/shop?category=Body Care" className="hover:text-white transition">Body Care</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">All Formulations</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">
              Science
            </h5>
            <ul className="space-y-2 text-xs text-[#9DBA95]">
              <li><Link to="/ingredients" className="hover:text-white transition">Why Okra?</Link></li>
              <li><Link to="/ingredients" className="hover:text-white transition">Ingredients Index</Link></li>
              <li><Link to="/ingredients" className="hover:text-white transition">Clinical Efficacy</Link></li>
              <li><Link to="/ingredients" className="hover:text-white transition">Ethical Sourcing</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Our Story</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">
              Customer Care
            </h5>
            <ul className="space-y-2 text-xs text-[#9DBA95]">
              <li><Link to="/cart" className="hover:text-white transition">View Shopping Bag</Link></li>
              <li><Link to="/favorites" className="hover:text-white transition">Saved Favorites</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Customer Account</Link></li>
              <li><Link to="/admin" className="hover:text-white transition text-[#A3C79B] font-semibold">Merchant Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C3325] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7B9582] gap-4">
          <p>© 2026 Adron Botanical Science. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Free Carbon Neutral Delivery</span>
            <span>•</span>
            <span>256-Bit SSL Encrypted</span>
            <span>•</span>
            <span>Made with Clean Botanicals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
