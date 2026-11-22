import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

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
    <footer className="bg-[#12241A] text-[#FAF8F5] pt-16 pb-12 border-t border-[#1F392B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4 Botanical Guarantees / Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-[#254231] text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#1D3B2B] flex items-center justify-center text-[#9DBA95]">
              <Leaf size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Pure Okra Extract</h4>
              <p className="text-xs text-[#9DBA95]">100% cold-pressed mucilage</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#1D3B2B] flex items-center justify-center text-[#9DBA95]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Clean Science</h4>
              <p className="text-xs text-[#9DBA95]">Dermatologist approved</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#1D3B2B] flex items-center justify-center text-[#9DBA95]">
              <HeartHandshake size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Cruelty-Free</h4>
              <p className="text-xs text-[#9DBA95]">Vegan & Leaping Bunny</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#1D3B2B] flex items-center justify-center text-[#9DBA95]">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Eco Responsible</h4>
              <p className="text-xs text-[#9DBA95]">100% recyclable bottles</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12">
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#799A70] flex items-center justify-center text-[#12241A] font-bold">
                A
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider uppercase text-white">
                Adron
              </span>
            </div>
            <p className="text-xs text-[#B5C7B2] leading-relaxed max-w-sm">
              Pioneering botanical beauty formulations powered by the ultra-hydrating mucilage of organic okra. Restoring cuticle smoothness and radiant skin barrier health naturally.
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
                    className="flex-1 bg-[#193224] border border-[#2B4B38] text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#799A70] placeholder-[#799A70]/60"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#799A70] hover:bg-[#8DB084] text-[#12241A] text-xs font-semibold px-4 py-2.5 rounded-lg transition flex items-center gap-1.5"
                  >
                    Subscribe <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs uppercase tracking-widest font-semibold text-[#8EB285]">Shop</h5>
            <ul className="space-y-2 text-xs text-[#B5C7B2]">
              <li><Link to="/shop" className="hover:text-white transition">All Products</Link></li>
              <li><Link to="/product/okra-shampoo" className="hover:text-white transition">Okra Shampoo</Link></li>
              <li><Link to="/product/okra-facewash" className="hover:text-white transition">Foaming Face Wash</Link></li>
              <li><Link to="/product/okra-serum" className="hover:text-white transition">Okra Glow Serum</Link></li>
              <li><Link to="/product/okra-hair-mask" className="hover:text-white transition">Hydrating Hair Mask</Link></li>
              <li><Link to="/shop?category=Body Care" className="hover:text-white transition">Body Lotion</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs uppercase tracking-widest font-semibold text-[#8EB285]">The Science</h5>
            <ul className="space-y-2 text-xs text-[#B5C7B2]">
              <li><Link to="/ingredients" className="hover:text-white transition">Ingredients Library</Link></li>
              <li><Link to="/ingredients#okra-mucilage" className="hover:text-white transition">Why Okra?</Link></li>
              <li><Link to="/ingredients#biotin" className="hover:text-white transition">Keratin & Biotin</Link></li>
              <li><Link to="/ingredients#niacinamide" className="hover:text-white transition">Niacinamide Synergy</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Clinical Studies</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs uppercase tracking-widest font-semibold text-[#8EB285]">Help & Customer Care</h5>
            <ul className="space-y-2 text-xs text-[#B5C7B2]">
              <li><Link to="/cart" className="hover:text-white transition">View Shopping Cart</Link></li>
              <li><Link to="/favorites" className="hover:text-white transition">Saved Favorites</Link></li>
              <li><span className="cursor-pointer hover:text-white transition">Shipping & Delivery Info</span></li>
              <li><span className="cursor-pointer hover:text-white transition">30-Day Money Back Guarantee</span></li>
              <li><span className="cursor-pointer hover:text-white transition">Contact: support@adronbeauty.com</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-6 border-t border-[#203D2C] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9876] gap-4">
          <p>© 2026 Adron Botanical Beauty Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition">Sustainability Report</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
