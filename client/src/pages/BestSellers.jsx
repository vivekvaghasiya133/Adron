import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function BestSellers() {
  const { addToCart } = useShop();

  // 3 FAQs interactive state
  const [openFaq, setOpenFaq] = useState(0);

  const bestSellerProducts = [
    {
      id: 'okra-shampoo',
      name: 'Okra Shampoo',
      subtitle: 'Nourish & Shine',
      category: 'HAIR CARE',
      price: 1299,
      image: '/figma_landing/bs_card_shampoo.png',
      desc: 'Gently cleanses and nourishes hair for a softer, smoother feel and natural-looking shine.',
      tags: 'Gentle cleanse • Softness • Shine',
      link: '/product/okra-shampoo'
    },
    {
      id: 'okra-serum',
      name: 'Okra Serum',
      subtitle: 'Okra Boost Glow',
      category: 'SKIN CARE',
      price: 1299,
      image: '/figma_landing/bs_card_serum.png',
      desc: 'Okra-infused hydration with cucumber and licorice extracts for your everyday skincare ritual.',
      tags: 'Hydration • Botanical nourishment',
      link: '/product/okra-serum'
    },
    {
      id: 'okra-facewash',
      name: 'Okra Facewash',
      subtitle: 'Hydra Glow Creamy Face Wash',
      category: 'SKIN CARE',
      price: 999,
      image: '/figma_landing/bs_card_facewash.png',
      desc: 'A creamy daily cleanse to remove dirt and impurities, leaving skin feeling soft and refreshed.',
      tags: 'Deep cleanse • Hydration • Fresh feel',
      link: '/product/okra-facewash'
    }
  ];

  const faqs = [
    {
      q: 'Which essential should I start with?',
      a: 'Choose Okra Shampoo for hair care, Okra Serum for facial hydration, or Okra Facewash for a fresh daily cleanse. Compare their care focus above to find your starting point.'
    },
    {
      q: 'Where can I find ingredients and directions?',
      a: 'Open the product details for ingredients and how to use. Always check the product label for the final ingredient list and any allergens before use.'
    },
    {
      q: 'How do I qualify for free shipping?',
      a: 'Free shipping is available on orders above ₹999. Check the delivery details at checkout before placing your order.'
    }
  ];

  const scrollToTable = () => {
    const el = document.getElementById('everyday-care');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white text-[#1C201D] font-sans antialiased selection:bg-[#84A338]/20">
      {/* ========================================================= */}
      {/* SECTION 1: TOP HERO BANNER (#F4F7EE)                      */}
      {/* ========================================================= */}
      <section className="relative w-full bg-[#F4F7EE] pt-6 pb-14 lg:pb-16 overflow-hidden">
        {/* Decorative subtle leaf lines */}
        <div className="absolute left-6 top-16 pointer-events-none opacity-30 hidden md:block">
          <svg width="120" height="240" viewBox="0 0 120 240" fill="none" stroke="#7A9330" strokeWidth="1.2">
            <path d="M10 220 Q 50 150, 40 80 Q 70 40, 110 10" />
            <path d="M40 80 Q 20 60, 10 70 Q 20 90, 40 80" />
            <path d="M45 130 Q 75 120, 95 135 Q 70 150, 45 130" />
            <path d="M25 180 Q 5 170, 0 185 Q 15 200, 25 180" />
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-normal mb-8">
            <Link to="/" className="hover:text-[#1C201D] transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#1C201D] font-medium">Best Sellers</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Text & Info */}
            <div className="lg:col-span-7 space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#1C201D] tracking-tight leading-none">
                Best <span className="text-[#84A338]">Sellers</span>
              </h1>

              <h2 className="text-base sm:text-lg font-bold text-[#1C201D] pt-2">
                Botanical care. Everyday essentials.
              </h2>

              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed max-w-lg font-normal">
                Meet three essentials for skin and hair. Explore okra-inspired care and find the
                right place to start your ritual.
              </p>
            </div>

            {/* Right: Fresh Okra Graphic with Pods and Leaves */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[480px]">
                <img
                  src="/figma_landing/bs_hero_okra_exact.png"
                  alt="Fresh Okra Pods and Slices"
                  className="w-full h-auto object-contain drop-shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: 3 BEST SELLER PRODUCT CARDS (White)            */}
      {/* ========================================================= */}
      <section className="w-full bg-white py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sub-header Filter Bar */}
          <div className="flex items-center justify-between pb-8 border-b border-gray-100 mb-10">
            <div className="flex items-center gap-3">
              <span className="bg-[#1C201D] text-white text-xs font-semibold px-4 py-2 rounded-full">
                All products
              </span>
              <span className="text-xs text-gray-500 font-medium">3 essentials</span>
            </div>

            <button
              onClick={scrollToTable}
              className="text-xs text-gray-700 font-medium hover:text-[#84A338] transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Find your everyday care</span>
              <ArrowDown size={13} />
            </button>
          </div>

          {/* 3 Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {bestSellerProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col justify-between group space-y-4"
              >
                {/* Product Image Container (#F4F7EE) */}
                <div className="relative w-full aspect-[408/360] rounded-2xl overflow-hidden bg-[#F4F7EE] flex items-center justify-center transition-all group-hover:shadow-md">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1.5 flex-1 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#84A338] block">
                    {prod.category}
                  </span>

                  <div className="flex items-baseline justify-between pt-0.5">
                    <h3 className="font-bold text-lg sm:text-xl text-[#1C201D] tracking-tight">
                      {prod.name}
                    </h3>
                    <span className="font-bold text-base sm:text-lg text-[#1C201D]">
                      ₹{prod.price.toLocaleString()}
                    </span>
                  </div>

                  <span className="text-xs font-medium text-gray-600 block">
                    {prod.subtitle}
                  </span>

                  <p className="text-xs text-gray-500 leading-relaxed font-normal pt-1 line-clamp-2">
                    {prod.desc}
                  </p>

                  <span className="text-[11px] text-gray-400 block pt-1 font-normal">
                    {prod.tags}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={() =>
                      addToCart(
                        {
                          id: prod.id,
                          name: prod.name,
                          price: prod.price,
                          image: prod.image,
                          category: prod.category
                        },
                        '250 ml',
                        1
                      )
                    }
                    className="w-full bg-[#1C201D] hover:bg-[#2C332E] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
                  >
                    <span>Add to Cart</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <Link
                    to={prod.link}
                    className="block text-center text-xs text-gray-600 hover:text-black font-medium transition py-1"
                  >
                    View product details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: COMPARISON TABLE (#FAF7F2)                     */}
      {/* ========================================================= */}
      <section id="everyday-care" className="w-full bg-[#FAF7F2] py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C201D] tracking-tight">
              Find your <span className="text-[#84A338]">everyday care</span>
            </h2>
            <span className="text-xs text-gray-500 font-medium">
              Three essentials. Different roles in your routine.
            </span>
          </div>

          {/* Table Container */}
          <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="bg-[#EDF2E8] border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                      Your essential
                    </th>
                    <th className="py-4 px-6 font-bold text-sm text-[#1C201D] w-1/4">
                      Okra Shampoo
                    </th>
                    <th className="py-4 px-6 font-bold text-sm text-[#1C201D] w-1/4">
                      Okra Serum
                    </th>
                    <th className="py-4 px-6 font-bold text-sm text-[#1C201D] w-1/4">
                      Okra Facewash
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-700">Made for</td>
                    <td className="py-4 px-6 font-normal">Hair & scalp</td>
                    <td className="py-4 px-6 font-normal">Facial skincare</td>
                    <td className="py-4 px-6 font-normal">Facial cleansing</td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-700">Care focus</td>
                    <td className="py-4 px-6 font-normal">Cleanse, nourish & soften</td>
                    <td className="py-4 px-6 font-normal">Hydration & nourishment</td>
                    <td className="py-4 px-6 font-normal">Cleanse & refresh</td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-700">Botanical highlights</td>
                    <td className="py-4 px-6 font-normal">Okra, hibiscus & shikakai</td>
                    <td className="py-4 px-6 font-normal">Okra, cucumber & licorice</td>
                    <td className="py-4 px-6 font-normal">Hibiscus, cucumber & aloe vera</td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-700">Explore</td>
                    <td className="py-4 px-6">
                      <Link
                        to="/product/okra-shampoo"
                        className="text-[#1C201D] font-bold hover:text-[#84A338] transition inline-flex items-center gap-1"
                      >
                        <span>Shop Shampoo</span>
                        <span>→</span>
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        to="/product/okra-serum"
                        className="text-[#1C201D] font-bold hover:text-[#84A338] transition inline-flex items-center gap-1"
                      >
                        <span>Shop Serum</span>
                        <span>→</span>
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        to="/product/okra-facewash"
                        className="text-[#1C201D] font-bold hover:text-[#84A338] transition inline-flex items-center gap-1"
                      >
                        <span>Shop Facewash</span>
                        <span>→</span>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: BOTANICAL RITUAL BANNER (White)                */}
      {/* ========================================================= */}
      <section className="w-full bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Okra Pods & Slices Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[420px]">
                <img
                  src="/figma_landing/bs_ritual_okra_exact.png"
                  alt="Natural Okra Pods"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right: Text & Details */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#84A338] block">
                ROOTED IN BOTANICAL CARE
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1C201D] leading-[1.18] tracking-tight">
                A little nature.<br />
                <span className="text-[#84A338]">A ritual of your own.</span>
              </h2>

              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed max-w-xl font-normal pt-1">
                Discover the natural power of okra—a nutrient-rich botanical that helps hydrate,
                nourish, and care for your skin and hair. Thoughtfully blended with modern beauty
                science, it brings gentle care to your everyday ritual.
              </p>

              <div className="pt-2">
                <Link
                  to="/ingredients"
                  className="inline-flex items-center gap-1.5 font-bold text-xs text-[#1C201D] hover:text-[#84A338] transition"
                >
                  <span>Explore our ingredients</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: FAQ & GUIDANCE (White)                         */}
      {/* ========================================================= */}
      <section className="w-full bg-white py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Heading & Contact Link */}
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C201D] tracking-tight leading-tight">
                A little guidance<br />
                for your ritual.
              </h2>

              <p className="text-xs text-gray-500 max-w-xs font-normal">
                Get to know your essentials before adding them to your everyday care.
              </p>

              <div className="pt-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C201D] hover:text-[#84A338] transition"
                >
                  <span>Contact us</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right: 3 Accordion Items */}
            <div className="lg:col-span-7 divide-y divide-gray-100">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1C201D] hover:text-[#84A338] transition-colors py-1"
                  >
                    <span>{faq.q}</span>
                    <span className="text-gray-400 font-normal text-base shrink-0">
                      {openFaq === idx ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="pt-2 text-xs text-gray-600 leading-relaxed font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
