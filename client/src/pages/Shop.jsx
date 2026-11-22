import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Check, ArrowRight, X } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 bg-[#FAF8F5]">
      {/* Page Header with Botanical Graphic matching Figma */}
      <div className="bg-[#EFF5ED] rounded-3xl p-8 sm:p-12 border border-[#D7E6D3] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block">
            Cold-Pressed Formulations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#153323]">
            Best <span className="text-[#5B7E52]">Sellers</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#4E6354] leading-relaxed">
            Formulated with nature's most potent natural hydrator: pure cold-extracted Okra mucilage. Experience weightless detangling, cuticle repair, and glass-skin radiance.
          </p>
        </div>

        <div className="w-36 h-36 rounded-2xl overflow-hidden bg-white p-2 shadow-sm border border-[#D7E6D3] shrink-0">
          <img
            src="/figma/okra_sliced_seeds.png"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=400&q=80'; }}
            alt="Cold Pressed Okra Pods"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-[#E8E4DA] h-fit shadow-sm">
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
              className="text-xs text-[#5B7E52] hover:underline font-semibold"
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
                  className={`w-full text-left text-xs py-2 px-3 rounded-full transition flex justify-between items-center ${
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
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8E4DA] shadow-sm">
            <span className="text-xs text-gray-500 font-medium">
              Showing <strong className="text-[#153323]">{filteredProducts.length}</strong> formulations
            </span>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs font-semibold text-[#153323] bg-[#EBF2E9] px-3.5 py-2 rounded-full"
              >
                <SlidersHorizontal size={15} /> Filters
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#E8E4DA] rounded-full px-3 py-1.5 text-xs font-medium text-[#153323] outline-none"
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
            <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E4DA] space-y-4 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#153323]">No matching products found</h3>
              <p className="text-xs text-gray-500">Try adjusting your filters or search criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMaxPrice(50);
                  setMinRating(0);
                }}
                className="bg-[#153323] text-white text-xs font-semibold px-6 py-2.5 rounded-full"
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

      {/* FORMULATION COMPARISON TABLE matching Figma */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E4DA] shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block mb-1">
            Clinical Comparison
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#153323]">
            Compare Adron Formulations
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E4DA] text-[#5B7E52] uppercase font-bold tracking-wider">
                <th className="py-3 px-4">Formulation</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Hydration Index</th>
                <th className="py-3 px-4">Primary Active</th>
                <th className="py-3 px-4">Texture</th>
                <th className="py-3 px-4">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3.5 px-4 font-bold text-[#153323]">Smooth & Shine Okra Shampoo</td>
                <td className="py-3.5 px-4">Hair Care</td>
                <td className="py-3.5 px-4"><span className="text-[#5B7E52] font-bold">500x Moisture</span> (Level 5)</td>
                <td className="py-3.5 px-4">Okra Mucilage + Hydrolyzed Pea Protein</td>
                <td className="py-3.5 px-4">Velvety Creamy Foam</td>
                <td className="py-3.5 px-4 font-bold text-[#153323]">$28.00</td>
              </tr>
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3.5 px-4 font-bold text-[#153323]">Gentle Foaming Okra Face Wash</td>
                <td className="py-3.5 px-4">Skin Care</td>
                <td className="py-3.5 px-4"><span className="text-[#5B7E52] font-bold">Barrier Balance</span> (Level 4)</td>
                <td className="py-3.5 px-4">Okra Extract + Green Tea + Centella</td>
                <td className="py-3.5 px-4">Cloud-Soft Microfoam</td>
                <td className="py-3.5 px-4 font-bold text-[#153323]">$22.00</td>
              </tr>
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3.5 px-4 font-bold text-[#153323]">Okra Glow Serum (Niacinamide + Vit C)</td>
                <td className="py-3.5 px-4">Serums</td>
                <td className="py-3.5 px-4"><span className="text-[#5B7E52] font-bold">72-Hour Glass Lock</span> (Level 5)</td>
                <td className="py-3.5 px-4">72% Okra Mucilage + 5% Niacinamide</td>
                <td className="py-3.5 px-4">Silky Fast-Absorb Elixir</td>
                <td className="py-3.5 px-4 font-bold text-[#153323]">$36.00</td>
              </tr>
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3.5 px-4 font-bold text-[#153323]">Deep Moisture Okra Hair Mask</td>
                <td className="py-3.5 px-4">Hair Care</td>
                <td className="py-3.5 px-4"><span className="text-[#5B7E52] font-bold">Intense Reconstruct</span> (Level 5)</td>
                <td className="py-3.5 px-4">Okra Mucilage + Shea Butter + Keratin</td>
                <td className="py-3.5 px-4">Rich Whipped Butter</td>
                <td className="py-3.5 px-4 font-bold text-[#153323]">$32.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

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
                  className={`block w-full text-left text-xs py-2 px-3 rounded-full ${
                    selectedCategory === cat ? 'bg-[#153323] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-[#153323] text-white text-xs font-semibold py-3 rounded-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
