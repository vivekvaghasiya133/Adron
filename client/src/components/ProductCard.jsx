import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isFav = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#E8E4DA] hover:border-[#799A70] transition-all duration-300 hover:shadow-xl flex flex-col justify-between p-4 sm:p-5">
      {/* Image container */}
      <div className="relative aspect-[4/4] overflow-hidden rounded-2xl bg-[#F6F4ED] flex items-center justify-center p-3">
        <Link to={`/product/${product.id}`} className="block w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span className="bg-[#153323] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md backdrop-blur-sm transition-transform hover:scale-110"
          title={isFav ? "Remove from Favorites" : "Save to Favorites"}
        >
          <Heart size={16} className={isFav ? "fill-[#C24B4B] text-[#C24B4B]" : "text-gray-500"} />
        </button>
      </div>

      {/* Info Container */}
      <div className="pt-4 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#5B7E52] font-bold block mb-1">
            {product.category}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="font-serif text-base font-bold text-[#153323] hover:text-[#5B7E52] transition line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-[#E5A93C]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className="fill-[#E5A93C] text-[#E5A93C]"
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              ({product.reviewsCount || 128})
            </span>
          </div>
        </div>

        {/* Price & Pill Add to Cart */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#153323]">
              ${Number(product.price).toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-[#153323] hover:bg-[#204b34] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition hover:shadow-md active:scale-95 whitespace-nowrap"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
