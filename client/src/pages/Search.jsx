import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products } = useShop();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.benefits && p.benefits.some(b => b.toLowerCase().includes(q)))
    );
  }, [products, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="border-b border-[#E8E4DA] pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">Search Results</span>
        <h1 className="font-serif text-3xl font-bold text-[#153323]">
          {query ? `Results for "${query}"` : 'Search Formulations'}
        </h1>
        <p className="text-xs text-gray-500">
          Showing {results.length} botanical products matching your criteria
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E4DA] p-8 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF8F5] flex items-center justify-center text-gray-400">
            <SearchIcon size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#153323]">No Formulations Found</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            We couldn't find matches for "{query}". Try searching for "shampoo", "facewash", "serum", or "hair mask".
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#153323] text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-[#204b34] transition"
          >
            Browse All Products <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
