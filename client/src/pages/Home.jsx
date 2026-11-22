import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Droplet, Leaf, Star, Heart, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products, addToCart } = useShop();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sliderPos, setSliderPos] = useState(50);

  const heroShampoo = products.find(p => p.id === 'okra-shampoo') || products[0];
  const heroFacewash = products.find(p => p.id === 'okra-facewash') || products[1];
  const heroSerum = products.find(p => p.id === 'okra-serum') || products[2];
  const heroMask = products.find(p => p.id === 'okra-hair-mask') || products[3];

  const bestSellerList = [heroShampoo, heroFacewash, heroSerum, heroMask].filter(Boolean);

  // 5 Category avatars matching Figma
  const categories = [
    { name: 'All Products', path: '/shop', image: '/figma/hero_pedestal.png', fallback: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' },
    { name: 'Hair Care', path: '/product/okra-shampoo', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Skin Care', path: '/product/okra-facewash', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80' },
    { name: 'Serums', path: '/product/okra-serum', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80' },
    { name: 'Body Care', path: '/shop?category=Body Care', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 bg-[#FAF8F5]">
      {/* 1. HERO SECTION - Matching Figma "OKRA + SCIENCE" */}
      <section className="relative overflow-hidden bg-[#FAF8F5] pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-[#E8E4DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF2E9] border border-[#799A70]/30 text-[#153323] text-xs font-bold uppercase tracking-widest">
                <Leaf size={14} className="text-[#5B7E52]" />
                <span>OKRA + SCIENCE</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#153323] leading-[1.12] tracking-tight">
                  Powered by <span className="italic font-normal text-[#5B7E52]">Naturally</span> Nourishing Beauty.
                </h1>
                <p className="text-base sm:text-lg text-[#556358] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                  Discover the deep cellular hydration of cold-pressed Okra mucilage extract. Clinically formulated to detangle hair with weightless slip, seal damaged cuticles, and impart glass-skin luminosity.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto bg-[#153323] hover:bg-[#204b34] text-white text-sm font-semibold px-8 py-4 rounded-full shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2 group active:scale-95"
                >
                  Shop Now
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/ingredients"
                  className="w-full sm:w-auto bg-white border border-[#153323] text-[#153323] hover:bg-[#EBF2E9] text-sm font-semibold px-8 py-4 rounded-full transition-all text-center"
                >
                  Why Okra?
                </Link>
              </div>

              {/* Mini Social proof */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#556358]">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#E5A93C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#E5A93C] text-[#E5A93C]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#153323]">4.9 / 5.0</span>
                </div>
                <span>•</span>
                <span>12,000+ Happy Customers</span>
              </div>
            </div>

            {/* Right Hero Image matching Figma Pedestal visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="bg-gradient-to-b from-[#EFF5ED] to-white p-4 rounded-3xl shadow-xl border border-[#E8E4DA] overflow-hidden">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative flex items-center justify-center bg-[#F4EFE6]">
                    <img
                      src="/figma/hero_pedestal.png"
                      onError={(e) => { e.currentTarget.src = heroShampoo.image; }}
                      alt="Adron Okra Botanicals Hero Showcase"
                      className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-700"
                    />
                    
                    {/* Floating Product Badge */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#5B7E52] block">
                          Formulation Breakthrough
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#153323]">
                          Okra Botanical Trinity
                        </h4>
                        <span className="text-xs font-semibold text-[#5B7E52]">Shampoo • Face Wash • Glow Serum</span>
                      </div>
                      <Link
                        to="/shop"
                        className="bg-[#153323] text-white p-2.5 rounded-full hover:bg-[#204b34] transition"
                        title="Shop All"
                      >
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY (5 Circular Cards matching Figma) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
            Curated Beauty
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#153323]">
            Shop by <span className="text-[#5B7E52]">Category</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 justify-center">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              className="group flex flex-col items-center space-y-3 transition-transform hover:-translate-y-1"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#E8E4DA] group-hover:border-[#5B7E52] shadow-sm group-hover:shadow-lg transition-all duration-300 relative bg-[#F5F2EB]">
                <img
                  src={cat.image}
                  onError={(e) => { e.currentTarget.src = cat.fallback; }}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="font-serif text-sm font-bold text-[#153323] group-hover:text-[#5B7E52] transition-colors text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION (Matching Figma Cream Card Container) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F7F2] rounded-3xl p-6 sm:p-10 border border-[#E1EADF] relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block mb-1">
                Highest Rated Formulations
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#153323]">
                Best <span className="text-[#5B7E52]">Sellers</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-[#153323] hover:text-[#5B7E52] border-b border-[#153323] pb-0.5 inline-flex items-center gap-1 self-start sm:self-auto"
            >
              View All Catalog <ArrowRight size={14} />
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellerList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY OKRA BELONGS IN YOUR BEAUTY RITUAL - Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E8E4DA] p-6 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Dewy Okra Bottle Image */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/4] rounded-2xl overflow-hidden bg-[#EFF5ED] relative shadow-md">
              <img
                src="/figma/daily_ritual_bottle.png"
                onError={(e) => { e.currentTarget.src = heroSerum.image; }}
                alt="Dewy Okra Botanical Ritual"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-sm text-[11px] font-bold text-[#153323]">
                ✨ 100% Organic
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block mb-1">
                The Science of Okra Mucilage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153323] leading-tight">
                Why Okra Belongs in Your Beauty Ritual
              </h2>
            </div>

            <p className="text-sm text-[#556358] leading-relaxed">
              Okra (Abelmoschus Esculentus) produces a natural botanical mucilage rich in galacturonic acid, pectins, and essential polysaccharides. Unlike synthetic silicones that build up and suffocate strands, okra mucilage forms a flexible, breathable shield that seals cuticles and delivers deep cellular slip.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DA]">
                <div className="w-8 h-8 rounded-full bg-[#EBF2E9] text-[#153323] flex items-center justify-center shrink-0 mt-0.5">
                  <Droplet size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#153323]">500x Moisture Binding</h4>
                  <p className="text-[11px] text-gray-500">Natural mucilage locks hydration deep within hair cuticles and skin pores.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DA]">
                <div className="w-8 h-8 rounded-full bg-[#EBF2E9] text-[#153323] flex items-center justify-center shrink-0 mt-0.5">
                  <Leaf size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#153323]">Natural Silicone Shield</h4>
                  <p className="text-[11px] text-gray-500">Miraculous slip detangles coarse hair without greasy residue or heavy buildup.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DA]">
                <div className="w-8 h-8 rounded-full bg-[#EBF2E9] text-[#153323] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#153323]">Scalp Barrier Balance</h4>
                  <p className="text-[11px] text-gray-500">Calms itchiness, balances sebum, and restores natural microbiome pH.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DA]">
                <div className="w-8 h-8 rounded-full bg-[#EBF2E9] text-[#153323] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#153323]">Glass-Skin Glow</h4>
                  <p className="text-[11px] text-gray-500">High concentrations of Vitamin A & C visibly illuminate skin texture.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/ingredients"
                className="inline-flex items-center gap-2 bg-[#153323] hover:bg-[#204b34] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition shadow-md"
              >
                Explore The Ingredient Science <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FULL-WIDTH BOTANICAL GREEN BANNER matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF5ED] py-6 sm:py-8 px-6 rounded-3xl border border-[#D7E6D3] text-center flex items-center justify-center gap-4 sm:gap-6 shadow-sm">
          <span className="text-2xl sm:text-3xl">🌿</span>
          <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold text-[#153323] tracking-wide">
            Powered by <span className="italic font-normal text-[#5B7E52]">Naturally Nourishing</span> Beauty.
          </h3>
          <span className="text-2xl sm:text-3xl">🌿</span>
        </div>
      </section>

      {/* 6. BEFORE & AFTER CLINICAL TRANSFORMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
            Clinical Efficacy
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#153323]">
            Clinically Proven <span className="text-[#5B7E52]">Real Results</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
            Witness the transformative power of okra mucilage on skin clarity, pore refinement, and deep cuticle hydration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Skin Pore & Clarity Comparison */}
          <div className="bg-white rounded-3xl border border-[#E8E4DA] p-6 shadow-sm space-y-4">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden relative bg-[#F5F2EB]">
              <img
                src="/figma/skin_before_after.png"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1512290900672-1f4142f10b75?auto=format&fit=crop&w=800&q=80'; }}
                alt="Okra Skin Transformation Before and After"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#153323]/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                DAY 1: Enlarged Pores & Redness
              </div>
              <div className="absolute bottom-3 right-3 bg-[#5B7E52]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                DAY 14: Luminous Glass Skin
              </div>
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#153323]">
                Pore Refinement & Glass Skin Radiance
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                94% of clinical participants reported visibly smaller pores and balanced hydration after 14 days of the Okra Glow Serum.
              </p>
            </div>
          </div>

          {/* Card 2: Scalp & Cuticle Health Comparison */}
          <div className="bg-white rounded-3xl border border-[#E8E4DA] p-6 shadow-sm space-y-4">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden relative bg-[#F5F2EB]">
              <img
                src="/figma/scalp_before_after.png"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'; }}
                alt="Okra Scalp Transformation Before and After"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#153323]/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                BEFORE: Dry & Flaky Scalp
              </div>
              <div className="absolute bottom-3 right-3 bg-[#5B7E52]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                AFTER: Calmed & Hydrated Barrier
              </div>
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#153323]">
                Cuticle Seal & Scalp Irritation Relief
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                96% noticed an immediate reduction in frizz and scalp flaking following their first wash with Smooth & Shine Okra Shampoo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TARGETED BOTANICAL SOLUTIONS (3 Mint Showcase Cards matching Figma) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
            Our Star Trio
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#153323]">
            Targeted Botanical <span className="text-[#5B7E52]">Solutions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Okra Shampoo (Pink / Botanical) */}
          <div className="bg-[#EFF5ED] rounded-3xl p-6 sm:p-7 border border-[#D7E6D3] flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white p-3 flex items-center justify-center">
                <img
                  src="/figma/shampoo_product.png"
                  onError={(e) => { e.currentTarget.src = heroShampoo.image; }}
                  alt="Smooth & Shine Okra Shampoo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D35269] block mb-1">
                  Hair Care • 250ml
                </span>
                <h3 className="font-serif text-lg font-bold text-[#153323]">
                  Smooth & Shine Okra Shampoo
                </h3>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Infused with pure cold-pressed okra mucilage and hibiscus water to detangle, smooth cuticles, and provide weightless mirror shine.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-[#D7E6D3] flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-[#153323]">$28.00</span>
              <button
                onClick={() => addToCart(heroShampoo)}
                className="bg-[#153323] hover:bg-[#204b34] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition shadow-sm"
              >
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Card 2: Okra Face Wash (Lilac / Gentle) */}
          <div className="bg-[#EFF5ED] rounded-3xl p-6 sm:p-7 border border-[#D7E6D3] flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white p-3 flex items-center justify-center">
                <img
                  src="/figma/facewash_product.png"
                  onError={(e) => { e.currentTarget.src = heroFacewash.image; }}
                  alt="Gentle Foaming Okra Face Wash"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7B61A6] block mb-1">
                  Skin Care • 150ml
                </span>
                <h3 className="font-serif text-lg font-bold text-[#153323]">
                  Gentle Foaming Okra Face Wash
                </h3>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Cloud-soft gentle foam powered by okra polysaccharides and green tea. Melts impurities while preserving skin moisture barrier.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-[#D7E6D3] flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-[#153323]">$22.00</span>
              <button
                onClick={() => addToCart(heroFacewash)}
                className="bg-[#153323] hover:bg-[#204b34] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition shadow-sm"
              >
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Card 3: Okra Glow Serum (Sage Green / Radiance) */}
          <div className="bg-[#EFF5ED] rounded-3xl p-6 sm:p-7 border border-[#D7E6D3] flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white p-3 flex items-center justify-center">
                <img
                  src="/figma/serum_product.png"
                  onError={(e) => { e.currentTarget.src = heroSerum.image; }}
                  alt="Okra Glow Serum"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#5B7E52] block mb-1">
                  Serums • 30ml
                </span>
                <h3 className="font-serif text-lg font-bold text-[#153323]">
                  Okra Glow Serum (Niacinamide + Vit C)
                </h3>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  72% pure okra mucilage extract combined with 5% Niacinamide and 3% Vitamin C for glass-skin clarity and deep elasticity.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-[#D7E6D3] flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-[#153323]">$36.00</span>
              <button
                onClick={() => addToCart(heroSerum)}
                className="bg-[#153323] hover:bg-[#204b34] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition shadow-sm"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WIDE PROMO BANNER: "NOURISH & SHINE" matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#D7E6D3] rounded-3xl overflow-hidden p-6 sm:p-12 border border-[#B8D4B2] relative shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Promo text */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="bg-[#153323] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                Special Limited Offer
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#153323] leading-tight">
                NOURISH & SHINE
              </h2>
              <p className="text-sm sm:text-base text-[#2C4A38] max-w-lg leading-relaxed">
                Elevate your daily haircare ritual with cold-pressed okra mucilage. Detangle with effortless slip and lock in 72-hour glass hair shine.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  to="/product/okra-shampoo"
                  className="bg-[#153323] hover:bg-[#204b34] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-lg"
                >
                  SHOP NOW — $28.00
                </Link>
                <span className="text-xs font-semibold text-[#153323] bg-white/70 px-4 py-2 rounded-full border border-white">
                  Use Code: <strong>ADRON15</strong> for 15% Off
                </span>
              </div>
            </div>

            {/* Right Smiling Model with Pink Shampoo Bottle */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="max-w-sm rounded-2xl overflow-hidden shadow-xl border-2 border-white/80 bg-white">
                <img
                  src="/figma/nourish_shine_banner.png"
                  onError={(e) => { e.currentTarget.src = heroShampoo.image; }}
                  alt="Nourish & Shine Campaign"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. REAL CUSTOMER REVIEWS (4 Photo Cards matching Figma) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
            Real Results
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#153323]">
            What Our Customers <span className="text-[#5B7E52]">Say</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Over 12,000+ customers experiencing the pure hydration of cold-pressed okra.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-[#5B7E52] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                  alt="Reviewer Aanya"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#E5A93C] text-[#E5A93C]" />
                ))}
              </div>
              <h4 className="font-serif text-sm font-bold text-[#153323] text-center">
                "Instant slip on 3C curls"
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed text-center">
                "I was skeptical about okra in shampoo, but the slip is unbelievable! Detangled my dense curls in 60 seconds with zero crunch."
              </p>
            </div>
            <div className="text-center pt-3 border-t border-gray-100">
              <span className="text-xs font-bold text-[#153323] block">Aanya Sharma</span>
              <span className="text-[10px] text-[#5B7E52] font-semibold">Verified Buyer • Okra Shampoo</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-[#5B7E52] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Reviewer Rhea"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#E5A93C] text-[#E5A93C]" />
                ))}
              </div>
              <h4 className="font-serif text-sm font-bold text-[#153323] text-center">
                "Faded acne marks in 3 weeks"
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed text-center">
                "The Okra Glow Serum is so gentle yet so potent. My post-breakout dark marks faded and my skin has that glassy dewy bounce."
              </p>
            </div>
            <div className="text-center pt-3 border-t border-gray-100">
              <span className="text-xs font-bold text-[#153323] block">Rhea Desai</span>
              <span className="text-[10px] text-[#5B7E52] font-semibold">Verified Buyer • Okra Glow Serum</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-[#5B7E52] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
                  alt="Reviewer Meera"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#E5A93C] text-[#E5A93C]" />
                ))}
              </div>
              <h4 className="font-serif text-sm font-bold text-[#153323] text-center">
                "Zero tightness or dryness"
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed text-center">
                "Most cleansers strip my sensitive skin, but this Okra Face Wash feels like a hydrating hug. Clean, supple, and very refreshing."
              </p>
            </div>
            <div className="text-center pt-3 border-t border-gray-100">
              <span className="text-xs font-bold text-[#153323] block">Meera Patel</span>
              <span className="text-[10px] text-[#5B7E52] font-semibold">Verified Buyer • Okra Face Wash</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-[#5B7E52] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
                  alt="Reviewer Tanvi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#E5A93C] text-[#E5A93C]" />
                ))}
              </div>
              <h4 className="font-serif text-sm font-bold text-[#153323] text-center">
                "Real mirror glass hair shine"
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed text-center">
                "I stopped using expensive salon serums. This shampoo + hair mask gave my coarse frizzy hair shiny movement without feeling greasy."
              </p>
            </div>
            <div className="text-center pt-3 border-t border-gray-100">
              <span className="text-xs font-bold text-[#153323] block">Tanvi Kapoor</span>
              <span className="text-[10px] text-[#5B7E52] font-semibold">Verified Buyer • Okra Hair Mask</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. THE SCIENCE BEHIND OKRA (3 Macro Texture Cards matching Figma) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF5ED] rounded-3xl p-6 sm:p-10 border border-[#D7E6D3]">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
              Microscopic Efficacy
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#153323]">
              The Science Behind <span className="text-[#5B7E52]">Okra Mucilage</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl overflow-hidden p-4 shadow-sm border border-[#E8E4DA] space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF8F5]">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
                  alt="Scalp Follicle Health"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-serif text-sm font-bold text-[#153323]">
                Scalp Barrier Health
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Rebalances natural pH, soothes itching, and removes flaking without stripping protective natural lipids.
              </p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden p-4 shadow-sm border border-[#E8E4DA] space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF8F5]">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
                  alt="Serum Droplet on Skin"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-serif text-sm font-bold text-[#153323]">
                Weightless Absorption
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Bioactive polysaccharides penetrate epidermal layers to hydrate deeply without sticky or oily residue.
              </p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden p-4 shadow-sm border border-[#E8E4DA] space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF8F5]">
                <img
                  src="/figma/okra_sliced_seeds.png"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'; }}
                  alt="Natural Okra Mucilage"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-serif text-sm font-bold text-[#153323]">
                100% Pure Botanical Mucilage
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Cold-pressed from whole organic okra pods, preserving active vitamins A, C, iron, and antioxidant flavonoids.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. INSTAGRAM GALLERY (#AdronBeauty) matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
            #AdronBeauty
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#153323]">
            Follow Our Clean Rituals on Instagram
          </h3>
          <p className="text-xs text-gray-500">Tag @adron.beauty to be featured</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {[
            'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80'
          ].map((url, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group shadow-sm bg-[#FAF8F5]">
              <img
                src={url}
                alt="Adron Community"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#153323]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                @adron.beauty
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
