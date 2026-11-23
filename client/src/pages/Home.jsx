import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Heart, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ComparisonSlider from '../components/ComparisonSlider';

export default function Home() {
  const { products, addToCart, wishlist, toggleWishlist, setIsCartOpen } = useShop();
  const [selectedConcern, setSelectedConcern] = useState('dry-hair');
  const [activeBaPage, setActiveBaPage] = useState(0);
  const [activeBlogPage, setActiveBlogPage] = useState(0);
  const [addedIds, setAddedIds] = useState({});

  const handleAddToCart = (prod) => {
    addToCart(prod);
    setAddedIds(prev => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [prod.id]: false }));
    }, 1500);
  };

  // Base Products
  const shampoo = products.find(p => p.id === 'okra-shampoo') || {
    id: 'okra-shampoo',
    name: 'Smooth & Shine Okra Shampoo',
    price: 599,
    category: 'HAIR CARE',
    image: '/figma_landing/prod_shampoo.png'
  };

  const facewash = products.find(p => p.id === 'okra-facewash') || {
    id: 'okra-facewash',
    name: 'Gentle Purifying Okra Facewash',
    price: 399,
    category: 'SKIN CARE',
    image: '/figma_landing/prod_facewash.png'
  };

  const serum = products.find(p => p.id === 'okra-serum') || {
    id: 'okra-serum',
    name: 'Ultra Hydrating Okra Serum',
    price: 799,
    category: 'SERUMS',
    image: '/figma_landing/prod_serum.png'
  };

  const mask = products.find(p => p.id === 'okra-hair-mask') || {
    id: 'okra-hair-mask',
    name: 'Deep Moisture Okra Hair Mask',
    price: 699,
    category: 'HAIR CARE',
    image: '/figma_landing/prod_mask.png'
  };

  // Concern Data Map
  const concernData = {
    'dry-hair': [
      {
        id: 'concern-shampoo',
        tag: 'CONCERN: FRIZZ & DULLNESS',
        title: 'Frizz Control & Shine Hair Shampoo',
        price: 599,
        img: '/figma_landing/concern_shampoo.png',
        desc: 'Specially formulated to detangle coarse strands, eliminate humidity frizz, and seal hair cuticles with natural okra mucilage.',
        path: '/product/okra-shampoo'
      },
      {
        id: 'concern-mask',
        tag: 'CONCERN: DRY DAMAGED HAIR',
        title: 'Deep Moisture Okra Hair Mask',
        price: 699,
        img: '/figma_landing/prod_mask.png',
        desc: 'Intensive weekly treatment to restore bond elasticity, prevent split ends, and inject deep botanical lipo-hydration.',
        path: '/shop'
      },
      {
        id: 'concern-scalp',
        tag: 'CONCERN: DRY SCALP & ROOTS',
        title: 'Botanical Scalp Revitalizing Tonic',
        price: 549,
        img: '/figma_landing/concern_serum.png',
        desc: 'Soothes scalp irritation, balances microbiome flora, and clears micro-flaking without any greasy residue.',
        path: '/product/okra-serum'
      }
    ],
    'dull-skin': [
      {
        id: 'concern-facewash',
        tag: 'CONCERN: ENLARGED PORES',
        title: 'Pore Refining Gentle Cleanser',
        price: 399,
        img: '/figma_landing/concern_facewash.png',
        desc: 'Micro-foam technology lifts away impurities, SPF, and daily pollution without stripping essential acid mantle moisture.',
        path: '/product/okra-facewash'
      },
      {
        id: 'concern-serum',
        tag: 'CONCERN: DEHYDRATION & DULLNESS',
        title: '72h Hydration Active Serum',
        price: 799,
        img: '/figma_landing/concern_serum.png',
        desc: 'High-potency okra mucilage infused with 5% Niacinamide and ethyl ascorbic acid for luminous, glass-skin bounce.',
        path: '/product/okra-serum'
      },
      {
        id: 'concern-glow',
        tag: 'CONCERN: UNEVEN TEXTURE',
        title: 'Pure Radiance Okra Glow Elixir',
        price: 849,
        img: '/figma_landing/prod_serum.png',
        desc: 'Gentle PHA exfoliants paired with botanical mucilage to visibly refine texture and promote even tone.',
        path: '/product/okra-serum'
      }
    ],
    'damaged-barrier': [
      {
        id: 'concern-cleanser-barrier',
        tag: 'CONCERN: REACTIVE SENSITIVE SKIN',
        title: 'Calming Barrier Okra Cleanser',
        price: 399,
        img: '/figma_landing/concern_facewash.png',
        desc: 'Ultra-gentle milk-gel cleanser enriched with soothing cucumber extract and pure cold-pressed Okra mucilage.',
        path: '/product/okra-facewash'
      },
      {
        id: 'concern-barrier-serum',
        tag: 'CONCERN: COMPROMISED BARRIER',
        title: 'Barrier Recovery Okra Serum',
        price: 799,
        img: '/figma_landing/concern_serum.png',
        desc: 'Ceramide-boosting formula that reinforces natural lipid layers and prevents trans-epidermal water loss.',
        path: '/product/okra-serum'
      },
      {
        id: 'concern-hair-barrier',
        tag: 'CONCERN: CHEMICAL & HEAT DAMAGE',
        title: 'Nourish & Shine Hair Mask',
        price: 699,
        img: '/figma_landing/prod_mask.png',
        desc: 'Repairs heat-damaged keratin bonds and seals porous hair cuticles with high-slip natural plant polysaccharides.',
        path: '/shop'
      }
    ]
  };

  return (
    <div className="bg-[#FAF9F5] text-[#153323] overflow-x-hidden space-y-16 sm:space-y-20 pb-16">
      {/* ============================================================== */}
      {/* 1. HERO SECTION - 100% 1:1 Pixel Match to Figma Design         */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden bg-[#F2F4EF] pt-8 sm:pt-12 pb-8">
        {/* Soft bottom-left decorative foliage blur from Figma */}
        <div className="absolute -bottom-6 -left-6 w-48 sm:w-64 pointer-events-none select-none z-0 opacity-70">
          <img
            src="/figma_landing/hero_leaf_blur.png"
            alt=""
            className="w-full h-auto"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-3.5 sm:space-y-4 text-left">
              {/* Huge OKRA + SCIENCE headline */}
              <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-black tracking-tight text-[#6D9424] uppercase font-sans leading-none">
                OKRA + SCIENCE
              </h2>

              {/* PURE BY NATURE. PROVEN BY SCIENCE. */}
              <h1 className="font-sans text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#153323] uppercase leading-[1.12]">
                PURE BY{' '}
                <span className="relative inline-block">
                  NATURE.
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#6D9424] rounded-full"></span>
                </span>
                <br />
                PROVEN BY SCIENCE.
              </h1>

              {/* Exact Description Paragraph */}
              <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#4A5568] max-w-[480px] leading-relaxed font-sans pt-1">
                Discover the power of Okra-infused hydration — deeply nourishing, visibly transforming. Powered by nature, perfected by science, infused with Okra, Cucumber & Licorice Extracts.
              </p>

              {/* SHOP THE SERUM Button */}
              <div className="pt-3">
                <Link
                  to="/product/okra-serum"
                  className="bg-[#151515] hover:bg-[#2C3E33] text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 shadow-sm transition-all inline-flex items-center gap-2 group active:scale-95"
                >
                  SHOP THE SERUM <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Hero Image - Clean Tabletop Pedestal Visual (No Box/Borders) */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-xl select-none">
                <img
                  src="/figma_landing/hero_pedestal_flawless.png"
                  alt="Adron Okra Boost Deep Hydrating Glow Serum on Pedestal"
                  className="w-full h-auto object-contain drop-shadow-sm select-none pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Bottom Pagination Indicators matching Figma */}
          <div className="flex items-center justify-center gap-2.5 pt-6 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]"></span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SHOP BY CATEGORIES - 5 Cards with Bottom Pill Badges        */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            Shop by <span className="text-[#7EA735]">categories</span>
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
              className="group flex flex-col items-center bg-white rounded-2xl overflow-hidden border border-[#EAE6DE] shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5F3EC]">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full py-2.5 px-2 bg-white text-center border-t border-gray-100">
                <span className="text-[11px] font-bold text-[#153323] group-hover:text-[#7EA735] transition-colors block">
                  {cat.name}
                </span>
                <span className="text-[9px] text-[#7EA735] uppercase font-semibold tracking-wider">
                  Explore All ›
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. OUR PRODUCTS - 4 Cards in Pale Mint Container + Sliced Okra */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            Our <span className="text-[#7EA735]">Products</span>
          </h2>
        </div>

        {/* Floating Okra Slices on right edge */}
        <div className="hidden xl:block absolute -right-8 top-1/2 -translate-y-1/2 w-48 pointer-events-none select-none z-10">
          <img
            src="/figma_landing/okra_floating_seeds.png"
            alt=""
            className="w-full h-auto drop-shadow-sm opacity-90"
          />
        </div>

        <div className="bg-[#F3F7F1] rounded-3xl p-6 sm:p-8 border border-[#DEEADE] shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              {
                prod: shampoo,
                badge: 'HAIR CARE',
                size: '250ml / 8.5 fl oz',
                desc: 'Restores cuticle health & mirror glass shine with pure cold-pressed Okra.',
                price: '₹ 599',
                img: '/figma_landing/prod_shampoo.png',
                rating: '4.9 (128)',
                path: '/product/okra-shampoo'
              },
              {
                prod: facewash,
                badge: 'SKIN CARE',
                size: '150ml / 5.1 fl oz',
                desc: 'Deep pore cleanse without stripping natural moisture barrier.',
                price: '₹ 399',
                img: '/figma_landing/prod_facewash.png',
                rating: '4.8 (96)',
                path: '/product/okra-facewash'
              },
              {
                prod: serum,
                badge: 'SERUMS',
                size: '30ml / 1.0 fl oz',
                desc: '72-hr glass skin hydration with 5% Niacinamide & Okra peptides.',
                price: '₹ 799',
                img: '/figma_landing/prod_serum.png',
                rating: '4.9 (214)',
                path: '/product/okra-serum'
              },
              {
                prod: mask,
                badge: 'HAIR CARE',
                size: '200ml / 6.8 fl oz',
                desc: 'Intensive bond repair and frizz elimination for dry textured hair.',
                price: '₹ 699',
                img: '/figma_landing/prod_mask.png',
                rating: '4.9 (84)',
                path: '/shop'
              }
            ].map((item, idx) => {
              const isWish = wishlist.some(w => w.id === item.prod.id);
              const isAdded = addedIds[item.prod.id];

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group"
                >
                  <div>
                    {/* Wishlist Heart Button */}
                    <button
                      onClick={() => toggleWishlist(item.prod)}
                      className="absolute top-6 right-6 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:text-[#C24B4B] transition z-10"
                      title={isWish ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <Heart size={16} className={isWish ? "fill-[#C24B4B] text-[#C24B4B]" : ""} />
                    </button>

                    {/* Product Image */}
                    <Link to={item.path} className="aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center p-2 mb-3 block">
                      <img
                        src={item.img}
                        alt={item.prod.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#7EA735] block mb-1">
                      {item.badge}
                    </span>

                    <Link to={item.path} className="font-serif text-sm font-bold text-[#153323] hover:text-[#7EA735] block line-clamp-1 transition-colors">
                      {item.prod.name}
                    </Link>

                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                      {item.size} • {item.desc}
                    </p>

                    <div className="flex text-[#E5A93C] items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-[#E5A93C]" />
                      ))}
                      <span className="text-[10px] text-gray-400 font-medium ml-1">{item.rating}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-3">
                    <span className="font-serif font-bold text-sm text-[#153323]">{item.price}</span>
                    <button
                      onClick={() => handleAddToCart(item.prod)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-all duration-200 ${
                        isAdded
                          ? 'bg-[#7EA735] text-white'
                          : 'bg-[#122519] hover:bg-[#20402c] text-white'
                      }`}
                    >
                      {isAdded ? 'ADDED ✓' : 'ADD TO CART'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. WHY OKRA BELONGS IN YOUR BEAUTY RITUAL                      */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            <span className="text-[#7EA735]">Why Okra</span> Belongs in Your Beauty Ritual
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-[#7EA735] p-2 bg-[#FAF9F5]">
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

      {/* ============================================================== */}
      {/* 5. EDITORIAL FULL-WIDTH BANNER / MARQUEE                       */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-8 border-y border-[#E0DCCE] flex items-center justify-center text-center gap-4 text-[#153323]">
          <span className="text-xl sm:text-2xl">🌿</span>
          <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-medium tracking-wide">
            Powered by <strong className="font-bold">Naturally Nourishing</strong> • <span className="italic text-[#7EA735]">Deeply Hydrating</span>
          </h3>
          <span className="text-xl sm:text-2xl">🌿</span>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. CONSISTENCY OVER CLAIMS (Before / After Comparison)         */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            <span className="text-[#7EA735]">Consistency</span> Over Claims
          </h2>
          <p className="text-xs text-gray-500 max-w-lg mx-auto">
            Real results from real users after 14-28 days of daily Adron Okra application. No filters, no edits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Face / Pore */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-sm flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-full sm:w-48 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-sm relative">
              <img
                src="/figma_landing/ba_face.png"
                alt="Before & After Face"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow border border-gray-300 flex items-center justify-center text-[10px] text-[#153323] font-bold">
                ‹ ›
              </div>
            </div>
            <div className="space-y-2 text-left">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#7EA735] block">
                GLOW SERUM
              </span>
              <h4 className="font-serif text-sm font-bold text-[#153323]">
                Noticeable pore reduction & glass glow after 14 days
              </h4>
              <p className="text-xs text-gray-500 italic leading-relaxed">
                "My post-acne redness calmed completely and my cheeks have that hydrated dewy shine all day."
              </p>
              <span className="text-[10px] font-bold text-gray-700 block">- Pooja K.</span>
              <Link to="/product/okra-serum" className="text-[11px] font-bold text-[#122519] hover:text-[#7EA735] underline block pt-1">
                VIEW PRODUCT ›
              </Link>
            </div>
          </div>

          {/* Card 2: Eye / Flakes */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-sm flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-full sm:w-48 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-sm relative">
              <img
                src="/figma_landing/ba_eye.png"
                alt="Before & After Eye / Skin"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow border border-gray-300 flex items-center justify-center text-[10px] text-[#153323] font-bold">
                ‹ ›
              </div>
            </div>
            <div className="space-y-2 text-left">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#7EA735] block">
                OKRA FACEWASH
              </span>
              <h4 className="font-serif text-sm font-bold text-[#153323]">
                Hydrated skin barrier with zero dry flakes
              </h4>
              <p className="text-xs text-gray-500 italic leading-relaxed">
                "Unlike typical cleansers, this leaves my dry sensitive skin plump and soft right after washing."
              </p>
              <span className="text-[10px] font-bold text-gray-700 block">- Sneha M.</span>
              <Link to="/product/okra-facewash" className="text-[11px] font-bold text-[#122519] hover:text-[#7EA735] underline block pt-1">
                VIEW PRODUCT ›
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 pt-2">
          <button
            onClick={() => setActiveBaPage(prev => (prev === 0 ? 1 : 0))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#122519] hover:text-white transition"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setActiveBaPage(prev => (prev === 0 ? 1 : 0))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#122519] hover:text-white transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. SHOP BY CONCERN - Interactive Tab Switching                 */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE6DE] pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            <span className="text-[#7EA735]">Shop by</span> Concern
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
          {concernData[selectedConcern].map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-[#EFF5ED] rounded-3xl p-6 border border-[#D7E6D3] flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white p-3 flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#7EA735] block">
                  {item.tag}
                </span>
                <Link to={item.path} className="font-serif text-base font-bold text-[#153323] hover:text-[#7EA735] block transition-colors">
                  {item.title}
                </Link>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="pt-6 border-t border-[#D7E6D3] flex items-center justify-between mt-4">
                <span className="font-serif font-bold text-base text-[#153323]">₹ {item.price}</span>
                <button
                  onClick={() => handleAddToCart({ id: item.id, name: item.title, price: item.price })}
                  className="bg-[#122519] hover:bg-[#20402c] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition active:scale-95"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. NOURISH & SHINE Hair Shampoo Banner matching Figma          */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/product/okra-shampoo" className="block rounded-3xl overflow-hidden border border-[#B8D4B2] shadow-md bg-white hover:shadow-lg transition-all group">
          <img
            src="/figma_landing/nourish_shine_banner.png"
            alt="NOURISH & SHINE Hair Shampoo Flat 50% Off"
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
          />
        </Link>
      </section>

      {/* ============================================================== */}
      {/* 9. TESTED. TRUSTED. Told by YOU. (Customer Review Photos)      */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#153323]">
            <span className="text-[#7EA735]">TESTED. TRUSTED.</span> Told by YOU.
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { img: '/figma_landing/review_1.png', label: 'Okra Shampoo Review', author: 'Aanya S.' },
            { img: '/figma_landing/review_2.png', label: 'Glow Serum Review', author: 'Rhea D.' },
            { img: '/figma_landing/review_3.png', label: 'Okra Facewash Review', author: 'Pooja K.' },
            { img: '/figma_landing/review_4.png', label: 'Hair Care Review', author: 'Sneha M.' }
          ].map((r, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border border-[#E8E4DA] bg-white group relative">
              <img
                src={r.img}
                alt={r.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white text-xs">
                <span className="font-bold">{r.author}</span>
                <span className="text-[10px] text-gray-300">Verified Buyer ★★★★★</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center text-xs text-gray-400">
          <span>•</span>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. OUR LATEST NEWS UPDATES (Blog Articles matching Figma)     */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative">
        <div className="text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#153323]">
            <span className="text-[#7EA735]">OUR LATEST</span> NEWS UPDATES
          </h2>
        </div>

        {/* Floating Okra Slices on left edge */}
        <div className="hidden xl:block absolute -left-10 -bottom-4 w-44 pointer-events-none select-none z-10 -rotate-12">
          <img
            src="/figma_landing/okra_floating_seeds.png"
            alt=""
            className="w-full h-auto drop-shadow-sm opacity-90"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#E8E4DA] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="/figma_landing/news_1.png"
                  alt="Article 1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
              <Link to="/ingredients" className="text-[11px] font-bold text-[#7EA735] uppercase tracking-wider hover:underline">
                READ MORE ›
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-[#E8E4DA] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="/figma_landing/news_2.png"
                  alt="Article 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
              <Link to="/ingredients" className="text-[11px] font-bold text-[#7EA735] uppercase tracking-wider hover:underline">
                READ MORE ›
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-[#E8E4DA] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="/figma_landing/news_3.png"
                  alt="Article 3"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
              <Link to="/ingredients" className="text-[11px] font-bold text-[#7EA735] uppercase tracking-wider hover:underline">
                READ MORE ›
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 pt-2">
          <button
            onClick={() => setActiveBlogPage(prev => (prev === 0 ? 1 : 0))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#122519] hover:text-white transition"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setActiveBlogPage(prev => (prev === 0 ? 1 : 0))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#122519] hover:text-white transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. AdronGlow Instagram Strip matching Figma                   */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center">
          <h3 className="font-serif text-2xl font-bold text-[#153323]">
            Adron<span className="text-[#7EA735]">Glow</span>
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
