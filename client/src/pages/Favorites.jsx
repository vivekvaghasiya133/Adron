import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function Favorites() {
  const { wishlist } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="border-b border-[#E8E4DA] pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">Curated Wishlist</span>
        <h1 className="font-serif text-3xl font-bold text-[#153323]">Saved Formulations ({wishlist.length})</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 space-y-4 bg-white rounded-3xl border border-[#E8E4DA] p-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF8F5] flex items-center justify-center text-gray-400">
            <Heart size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#153323]">Your Wishlist is Empty</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Save your favorite Okra formulations here while you explore the collection.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#153323] text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-[#204b34] transition"
          >
            Explore Best Sellers <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
