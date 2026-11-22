import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Home() {
  const { products, addToCart } = useShop();
  const [selectedConcern, setSelectedConcern] = useState('dry-hair');

  // Products from context or fallback mapping
  const shampoo = products.find(p => p.id === 'okra-shampoo') || {
    id: 'okra-shampoo',
    name: 'Smooth & Shine Okra Shampoo',
    price: 599,
    category: 'HAIR CARE'
  };

  const facewash = products.find(p => p.id === 'okra-facewash') || {
    id: 'okra-facewash',
    name: 'Gentle Purifying Okra Facewash',
    price: 399,
    category: 'SKIN CARE'
  };

  const serum = products.find(p => p.id === 'okra-serum') || {
    id: 'okra-serum',
    name: 'Ultra Hydrating Okra Serum',
    price: 799,
    category: 'SERUMS'
  };

  const mask = products.find(p => p.id === 'okra-hair-mask') || {
    id: 'okra-hair-mask',
    name: 'Deep Moisture Okra Hair Mask',
    price: 699,
    category: 'HAIR CARE'
  };

  return (
    <div className="bg-[#FAF9F5] text-[#153323] overflow-x-hidden space-y-16 sm:space-y-20 pb-16">
      {/* 1. HERO SECTION - Exact Match to Figma */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-14 border-b border-[#EAE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <span className="text-sm sm:text-base font-bold tracking-wider text-[#5B7E52] uppercase block font-sans">
                OKRA + SCIENCE
              </span>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-[#153323] leading-[1.15]">
                PURE BY NATURE.<br />
                PROVEN BY SCIENCE.
              </h1>

              <p className="text-xs sm:text-sm text-[#556358] max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans">
                Harness the natural power of Okra mucilage, clinically proven to deeply hydrate, strengthen hair bonds, and restore youthful elasticity to your skin and scalp.
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="bg-[#122519] hover:bg-[#20402c] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm shadow-md transition-all flex items-center gap-2 group active:scale-95"
                >
                  EXPLORE SHOP <span className="group-hover:translate-x-1 transition-transform">›</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-lg rounded-2xl overflow-hidden bg-transparent">
                <img
                  src="/figma_landing/hero_pedestal.png"
                  alt="Adron Okra + Science Hero Formulation"
                  className="w-full h-auto object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORIES - Exact 5 cards with bottom pill badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            Shop by <span className="text-[#5B7E52]">categories</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 justify-center">
          {[
            { name: 'All Products', path: '/shop', img: '/figma_landing/cat_all.png' },
            { name: 'Hair Care', path: '/product/okra-shampoo', img: '/figma_landing/cat_hair.png' },
            { name: 'Face Wash', path: '/product/okra-facewash', img: '/figma_landing/cat_facewash.png' },
            { name: 'Glow Serums', path: '/product/okra-serum', img: '/figma_landing/cat_serum.png' },
            { name: 'Hair Routine', path: '/shop?category=Hair Care', img: '/figma_landing/cat_routine.png' }
          ].map((cat, i) => (
            <Link
              key={i}
              to={cat.path}
              className="group flex flex-col items-center bg-white rounded-2xl overflow-hidden border border-[#EAE6DE] shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5F3EC]">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full py-2.5 px-2 bg-white text-center border-t border-gray-100">
                <span className="text-[11px] font-bold text-[#153323] group-hover:text-[#5B7E52] transition-colors block">
                  {cat.name}
                </span>
                <span className="text-[9px] text-[#5B7E52] uppercase font-semibold tracking-wider">
                  Explore All ›
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. OUR PRODUCTS - 4 Cards in Pale Mint Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            Our <span className="text-[#5B7E52]">Products</span>
          </h2>
        </div>

        <div className="bg-[#F3F7F1] rounded-3xl p-6 sm:p-8 border border-[#DEEADE] shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Shampoo */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center p-2 mb-3">
                  <img
                    src="/figma_landing/prod_shampoo.png"
                    alt="Smooth & Shine Okra Shampoo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#5B7E52] block mb-1">
                  HAIR CARE
                </span>
                <Link to="/product/okra-shampoo" className="font-serif text-sm font-bold text-[#153323] hover:text-[#5B7E52] block line-clamp-1">
                  Smooth & Shine Okra Shampoo
                </Link>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                  250ml / 8.5 fl oz • Restores cuticle health & mirror glass shine with pure cold-pressed Okra.
                </p>
                <div className="flex text-[#E5A93C] items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-[#E5A93C]" />
                  ))}
                  <span className="text-[10px] text-gray-400 font-medium ml-1">4.9 (128)</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-3">
                <span className="font-serif font-bold text-sm text-[#153323]">₹ 599</span>
                <button
                  onClick={() => addToCart(shampoo)}
                  className="bg-[#122519] hover:bg-[#20402c] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition"
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Card 2: Facewash */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center p-2 mb-3">
                  <img
                    src="/figma_landing/prod_facewash.png"
                    alt="Gentle Purifying Okra Facewash"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#5B7E52] block mb-1">
                  SKIN CARE
                </span>
                <Link to="/product/okra-facewash" className="font-serif text-sm font-bold text-[#153323] hover:text-[#5B7E52] block line-clamp-1">
                  Gentle Purifying Okra Facewash
                </Link>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                  150ml / 5.1 fl oz • Deep pore cleanse without stripping natural moisture barrier.
                </p>
                <div className="flex text-[#E5A93C] items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-[#E5A93C]" />
                  ))}
                  <span className="text-[10px] text-gray-400 font-medium ml-1">4.8 (96)</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-3">
                <span className="font-serif font-bold text-sm text-[#153323]">₹ 399</span>
                <button
                  onClick={() => addToCart(facewash)}
                  className="bg-[#122519] hover:bg-[#20402c] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition"
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Card 3: Serum */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center p-2 mb-3">
                  <img
                    src="/figma_landing/prod_serum.png"
                    alt="Ultra Hydrating Okra Serum"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#5B7E52] block mb-1">
                  SERUMS
                </span>
                <Link to="/product/okra-serum" className="font-serif text-sm font-bold text-[#153323] hover:text-[#5B7E52] block line-clamp-1">
                  Ultra Hydrating Okra Serum
                </Link>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                  30ml / 1.0 fl oz • 72-hr glass skin hydration with 5% Niacinamide & Okra peptides.
                </p>
                <div className="flex text-[#E5A93C] items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-[#E5A93C]" />
                  ))}
                  <span className="text-[10px] text-gray-400 font-medium ml-1">4.9 (214)</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-3">
                <span className="font-serif font-bold text-sm text-[#153323]">₹ 799</span>
                <button
                  onClick={() => addToCart(serum)}
                  className="bg-[#122519] hover:bg-[#20402c] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition"
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Card 4: Mask */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center p-2 mb-3">
                  <img
                    src="/figma_landing/prod_mask.png"
                    alt="Deep Moisture Okra Hair Mask"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#5B7E52] block mb-1">
                  HAIR CARE
                </span>
                <Link to="/shop" className="font-serif text-sm font-bold text-[#153323] hover:text-[#5B7E52] block line-clamp-1">
                  Deep Moisture Okra Hair Mask
                </Link>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                  200ml / 6.8 fl oz • Intensive bond repair and frizz elimination for dry textured hair.
                </p>
                <div className="flex text-[#E5A93C] items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-[#E5A93C]" />
                  ))}
                  <span className="text-[10px] text-gray-400 font-medium ml-1">4.9 (84)</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-3">
                <span className="font-serif font-bold text-sm text-[#153323]">₹ 699</span>
                <button
                  onClick={() => addToCart(mask)}
                  className="bg-[#122519] hover:bg-[#20402c] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY OKRA BELONGS IN YOUR BEAUTY RITUAL - Exact Match to Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            <span className="text-[#5B7E52]">Why Okra</span> Belongs in Your Beauty Ritual
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E4DA] shadow-sm">
          {/* Left Visual Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-sm">
              <img
                src="/figma_landing/why_okra_visual.png"
                alt="Why Okra in Your Ritual"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Text & Circular Badge */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Dotted Circular Emblem matching Figma */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-[#5B7E52] p-2 bg-[#FAF9F5]">
              <span className="font-serif font-bold text-base text-[#153323] tracking-wider uppercase">
                Adron
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#556358] leading-relaxed font-sans max-w-lg mx-auto lg:mx-0">
              Okra mucilage is nature's answer to synthetic silicones. Packed with galacturonic acid and essential pectins, it forms a protective, breathable moisture barrier over skin and hair fibers that locks in hydration without clogging pores or weighing down curls.
            </p>

            <div className="pt-2 flex justify-center lg:justify-start">
              <Link
                to="/ingredients"
                className="bg-[#122519] hover:bg-[#20402c] text-white text-xs font-bold uppercase tracking-widest px-7 py-3 rounded-sm transition shadow-md inline-flex items-center gap-1.5"
              >
                LEARN MORE <span>›</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL FULL-WIDTH BANNER matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-8 border-y border-[#E0DCCE] flex items-center justify-center text-center gap-4 text-[#153323]">
          <span className="text-xl sm:text-2xl">🌿</span>
          <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-medium tracking-wide">
            Powered by <strong className="font-bold">Naturally Nourishing</strong> • <span className="italic text-[#5B7E52]">Deeply Hydrating</span>
          </h3>
          <span className="text-xl sm:text-2xl">🌿</span>
        </div>
      </section>

      {/* 6. CONSISTENCY OVER CLAIMS (Before / After Comparison) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            <span className="text-[#5B7E52]">Consistency</span> Over Claims
          </h2>
          <p className="text-xs text-gray-500 max-w-lg mx-auto">
            Real results from real users after 14-28 days of daily Adron Okra application. No filters, no edits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Face / Pore */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-sm flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-full sm:w-48 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-sm">
              <img
                src="/figma_landing/ba_face.png"
                alt="Before & After Face"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 text-left">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#5B7E52] block">
                GLOW SERUM
              </span>
              <h4 className="font-serif text-sm font-bold text-[#153323]">
                Noticeable pore reduction & glass glow after 14 days
              </h4>
              <p className="text-xs text-gray-500 italic leading-relaxed">
                "My post-acne redness calmed completely and my cheeks have that hydrated dewy shine all day."
              </p>
              <span className="text-[10px] font-bold text-gray-700 block">- Pooja K.</span>
              <Link to="/product/okra-serum" className="text-[11px] font-bold text-[#122519] hover:text-[#5B7E52] underline block pt-1">
                VIEW PRODUCT ›
              </Link>
            </div>
          </div>

          {/* Card 2: Eye / Flakes */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-sm flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-full sm:w-48 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-sm">
              <img
                src="/figma_landing/ba_eye.png"
                alt="Before & After Eye / Skin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 text-left">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#5B7E52] block">
                OKRA FACEWASH
              </span>
              <h4 className="font-serif text-sm font-bold text-[#153323]">
                Hydrated skin barrier with zero dry flakes
              </h4>
              <p className="text-xs text-gray-500 italic leading-relaxed">
                "Unlike typical cleansers, this leaves my dry sensitive skin plump and soft right after washing."
              </p>
              <span className="text-[10px] font-bold text-gray-700 block">- Sneha M.</span>
              <Link to="/product/okra-facewash" className="text-[11px] font-bold text-[#122519] hover:text-[#5B7E52] underline block pt-1">
                VIEW PRODUCT ›
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 pt-2">
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#122519] hover:text-white transition">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#122519] hover:text-white transition">
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* 7. SHOP BY CONCERN (3 Cards with floral splash graphics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE6DE] pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            <span className="text-[#5B7E52]">Shop by</span> Concern
          </h2>

          <div className="flex gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <button
              onClick={() => setSelectedConcern('dry-hair')}
              className={`pb-1 transition-all ${selectedConcern === 'dry-hair' ? 'text-[#122519] font-bold border-b-2 border-[#122519]' : 'hover:text-[#122519]'}`}
            >
              FOR DRY HAIR
            </button>
            <button
              onClick={() => setSelectedConcern('dull-skin')}
              className={`pb-1 transition-all ${selectedConcern === 'dull-skin' ? 'text-[#122519] font-bold border-b-2 border-[#122519]' : 'hover:text-[#122519]'}`}
            >
              FOR DULL SKIN
            </button>
            <button
              onClick={() => setSelectedConcern('damaged-barrier')}
              className={`pb-1 transition-all ${selectedConcern === 'damaged-barrier' ? 'text-[#122519] font-bold border-b-2 border-[#122519]' : 'hover:text-[#122519]'}`}
            >
              FOR DAMAGED BARRIER
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Frizz Control Shampoo */}
          <div className="bg-[#EFF5ED] rounded-3xl p-6 border border-[#D7E6D3] flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white p-3 flex items-center justify-center">
                <img
                  src="/figma_landing/concern_shampoo.png"
                  alt="Frizz Control & Shine Shampoo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#5B7E52] block">
                CONCERN: FRIZZ & DULLNESS
              </span>
              <h3 className="font-serif text-base font-bold text-[#153323]">
                Frizz Control & Shine Hair Shampoo
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Specially formulated to detangle coarse strands, eliminate humidity frizz, and seal hair cuticles with natural okra mucilage.
              </p>
            </div>
            <div className="pt-6 border-t border-[#D7E6D3] flex items-center justify-between mt-4">
              <span className="font-serif font-bold text-base text-[#153323]">₹ 599</span>
              <button
                onClick={() => addToCart(shampoo)}
                className="bg-[#122519] hover:bg-[#20402c] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition"
              >
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Card 2: Pore Refining Gentle Cleanser */}
          <div className="bg-[#EFF5ED] rounded-3xl p-6 border border-[#D7E6D3] flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white p-3 flex items-center justify-center">
                <img
                  src="/figma_landing/concern_facewash.png"
                  alt="Pore Refining Gentle Cleanser"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#5B7E52] block">
                CONCERN: ENLARGED PORES
              </span>
              <h3 className="font-serif text-base font-bold text-[#153323]">
                Pore Refining Gentle Cleanser
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Micro-foam technology lifts away impurities, SPF, and daily pollution without stripping essential acid mantle moisture.
              </p>
            </div>
            <div className="pt-6 border-t border-[#D7E6D3] flex items-center justify-between mt-4">
              <span className="font-serif font-bold text-base text-[#153323]">₹ 399</span>
              <button
                onClick={() => addToCart(facewash)}
                className="bg-[#122519] hover:bg-[#20402c] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition"
              >
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Card 3: 72h Hydration Active Serum */}
          <div className="bg-[#EFF5ED] rounded-3xl p-6 border border-[#D7E6D3] flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white p-3 flex items-center justify-center">
                <img
                  src="/figma_landing/concern_serum.png"
                  alt="72h Hydration Active Serum"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#5B7E52] block">
                CONCERN: DEHYDRATION & DULLNESS
              </span>
              <h3 className="font-serif text-base font-bold text-[#153323]">
                72h Hydration Active Serum
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                High-potency okra mucilage infused with 5% Niacinamide and ethyl ascorbic acid for luminous, glass-skin bounce.
              </p>
            </div>
            <div className="pt-6 border-t border-[#D7E6D3] flex items-center justify-between mt-4">
              <span className="font-serif font-bold text-base text-[#153323]">₹ 799</span>
              <button
                onClick={() => addToCart(serum)}
                className="bg-[#122519] hover:bg-[#20402c] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NOURISH & SHINE Hair Shampoo Banner matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden border border-[#B8D4B2] shadow-md bg-white">
          <img
            src="/figma_landing/nourish_shine_banner.png"
            alt="NOURISH & SHINE Hair Shampoo Flat 50% Off"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* 9. TESTED. TRUSTED. Told by YOU. (Customer Review Photos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#153323]">
            <span className="text-[#5B7E52]">TESTED. TRUSTED.</span> Told by YOU.
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { img: '/figma_landing/review_1.png', label: 'Okra Shampoo Review' },
            { img: '/figma_landing/review_2.png', label: 'Glow Serum Review' },
            { img: '/figma_landing/review_3.png', label: 'Okra Facewash Review' },
            { img: '/figma_landing/review_4.png', label: 'Hair Care Review' }
          ].map((r, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border border-[#E8E4DA] bg-white group">
              <img
                src={r.img}
                alt={r.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center text-xs text-gray-400">
          <span>•</span>
        </div>
      </section>

      {/* 10. OUR LATEST NEWS UPDATES (Blog Articles matching Figma) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#153323]">
            <span className="text-[#5B7E52]">OUR LATEST</span> NEWS UPDATES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#E8E4DA] shadow-sm flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="/figma_landing/news_1.png"
                  alt="Article 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#153323] leading-snug">
                  How Okra Mucilage Outperforms Hyaluronic Acid for Deep Skin Moisture
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Discover the bio-chemical mechanisms that make cold-pressed okra mucilage a superior long-term humectant.
                </p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link to="/ingredients" className="text-[11px] font-bold text-[#5B7E52] uppercase tracking-wider hover:underline">
                READ MORE ›
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-[#E8E4DA] shadow-sm flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="/figma_landing/news_2.png"
                  alt="Article 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#153323] leading-snug">
                  The 5-Step Daily Ritual for Glass Skin Using Natural Botanicals
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  A dermatologist-backed morning and night sequence to lock in hydration and restore lipid barrier health.
                </p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link to="/ingredients" className="text-[11px] font-bold text-[#5B7E52] uppercase tracking-wider hover:underline">
                READ MORE ›
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-[#E8E4DA] shadow-sm flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="/figma_landing/news_3.png"
                  alt="Article 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#153323] leading-snug">
                  Why Silicones Ruin Curls and What Nature Offers Instead
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Learn how plant-based pectins provide extreme detangling slip without suffocating cuticle buildup.
                </p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link to="/ingredients" className="text-[11px] font-bold text-[#5B7E52] uppercase tracking-wider hover:underline">
                READ MORE ›
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 pt-2">
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#122519] hover:text-white transition">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#122519] hover:text-white transition">
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* 11. AdronGlow Instagram Strip matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center">
          <h3 className="font-serif text-2xl font-bold text-[#153323]">
            Adron<span className="text-[#5B7E52]">Glow</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            '/figma_landing/insta_1.png',
            '/figma_landing/insta_2.png',
            '/figma_landing/insta_3.png',
            '/figma_landing/insta_4.png',
            '/figma_landing/insta_5.png',
            '/figma_landing/insta_6.png'
          ].map((url, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-sm bg-white border border-[#E8E4DA] group">
              <img
                src={url}
                alt="AdronGlow"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#153323] text-[#153323] hover:bg-[#153323] hover:text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-sm transition"
          >
            FOLLOW US ON INSTAGRAM ›
          </a>
        </div>
      </section>
    </div>
  );
}
