import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Plus, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isFav = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#EAE6DD] hover:border-[#799A70]/60 transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-[#F6F4ED]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
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
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-[#B54A3B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              Save ${(product.originalPrice - product.price).toFixed(0)}
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
          <Heart size={16} className={isFav ? "fill-[#C24B4B] text-[#C24B4B]" : "text-gray-600"} />
        </button>

        {/* Quick Add Button on Hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-[#153323] hover:bg-[#204b34] text-white text-xs font-semibold py-2.5 rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
          >
            <Plus size={15} /> Quick Add to Cart
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#799A70] font-semibold block mb-1">
            {product.category}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="font-serif text-base font-bold text-[#153323] hover:text-[#799A70] transition line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-[#DDA743]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < Math.floor(product.rating) ? "fill-[#DDA743]" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#153323]">
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
            className="text-xs font-bold text-[#153323] hover:text-[#799A70] p-1 underline underline-offset-4 flex items-center gap-1"
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}
