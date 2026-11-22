import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCat = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [maxPrice, setMaxPrice] = useState(50);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Hair Care', 'Skin Care', 'Serums', 'Body Care'];

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const catMatch = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const priceMatch = p.price <= maxPrice;
        const ratingMatch = p.rating >= minRating;
        return catMatch && priceMatch && ratingMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, maxPrice, minRating, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2 border-b border-[#E8E4DA] pb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">
          Clean Botanical Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#153323]">
          All Formulations
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
          Every formulation is centered on organic cold-extracted Okra mucilage, designed to replenish, hydrate, and fortify without compromise.
        </p>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-[#E8E4DA] h-fit">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="font-serif font-bold text-base text-[#153323] flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setMaxPrice(50);
                setMinRating(0);
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
              className="text-xs text-[#799A70] hover:underline font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Categories</h4>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`w-full text-left text-xs py-1.5 px-3 rounded-lg transition flex justify-between items-center ${
                    selectedCategory === cat
                      ? 'bg-[#153323] text-white font-semibold'
                      : 'text-gray-600 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-70">
                    {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs">
              <h4 className="font-bold uppercase tracking-wider text-gray-700">Max Price</h4>
              <span className="font-bold text-[#153323]">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="15"
              max="50"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#153323] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>$15</span>
              <span>$50</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Rating</h4>
            <div className="space-y-1.5">
              {[
                { label: 'All Ratings', value: 0 },
                { label: '4.8 ★ & above', value: 4.8 },
                { label: '4.5 ★ & above', value: 4.5 }
              ].map((r) => (
                <label key={r.value} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === r.value}
                    onChange={() => setMinRating(r.value)}
                    className="accent-[#153323]"
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E8E4DA]">
            <span className="text-xs text-gray-500 font-medium">
              Showing <strong className="text-[#153323]">{filteredProducts.length}</strong> formulations
            </span>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs font-semibold text-[#153323] bg-[#EAF1E8] px-3.5 py-2 rounded-lg"
              >
                <SlidersHorizontal size={15} /> Filters
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#E8E4DA] rounded-lg px-3 py-1.5 text-xs font-medium text-[#153323] outline-none"
                >
                  <option value="featured">Featured / Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E8E4DA] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#153323]">No matching products found</h3>
              <p className="text-xs text-gray-500">Try adjusting your filters or search criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMaxPrice(50);
                  setMinRating(0);
                }}
                className="bg-[#153323] text-white text-xs font-semibold px-5 py-2.5 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="font-serif font-bold text-lg text-[#153323]">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-gray-500">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-gray-700">Categories</h4>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    handleCategorySelect(cat);
                    setMobileFilterOpen(false);
                  }}
                  className={`block w-full text-left text-xs py-2 px-3 rounded-lg ${
                    selectedCategory === cat ? 'bg-[#153323] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-[#153323] text-white text-xs font-semibold py-3 rounded-xl"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
