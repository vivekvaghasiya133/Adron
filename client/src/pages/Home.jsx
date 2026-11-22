import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Droplet, Leaf, Star, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useShop();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const heroShampoo = products.find(p => p.id === 'okra-shampoo') || products[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION - Matching Figma "OKRA + SCIENCE" */}
      <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-[#E8E4DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF1E8] border border-[#799A70]/30 text-[#153323] text-xs font-semibold uppercase tracking-widest animate-fade-in">
                <Leaf size={14} className="text-[#799A70]" />
                <span>The Clean Okra Breakthrough</span>
              </div>

              <div className="space-y-3">
                <span className="font-serif text-sm tracking-widest text-[#799A70] uppercase font-bold block">
                  Okra + Science
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#153323] leading-[1.15] tracking-tight">
                  Powered by <span className="italic font-normal text-[#486b42]">Naturally</span> Nourishing Beauty.
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#556358] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover the deep cellular hydration of pure Okra mucilage extract. Clinically balanced with active botanicals to seal hair cuticles, eliminate frizz, and reveal dewy, luminous skin.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto bg-[#153323] hover:bg-[#204b34] text-white text-sm font-semibold px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Shop the Collection
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/ingredients"
                  className="w-full sm:w-auto bg-white border border-[#153323] text-[#153323] hover:bg-[#EAF1E8] text-sm font-semibold px-8 py-4 rounded-xl transition-all text-center"
                >
                  Explore The Science
                </Link>
              </div>

              {/* Mini Social proof */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#556358]">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#DDA743]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#DDA743]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#153323]">4.9 / 5.0</span>
                </div>
                <span>•</span>
                <span>Over 12,000+ Happy Customers</span>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background shape */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#799A70]/30 to-[#153323]/10 rounded-3xl transform -rotate-2 -z-10 blur-sm" />
                
                <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-2xl border border-[#E8E4DA] overflow-hidden">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl relative bg-[#F4EFE6]">
                    <img
                      src={heroShampoo.image}
                      alt="Adron Okra Botanicals Hero"
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Floating Hero Badge */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#799A70] block">
                          Star Formulation
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#153323]">
                          Smooth & Shine Okra Shampoo
                        </h4>
                        <span className="text-xs font-semibold text-[#153323]">$28.00</span>
                      </div>
                      <Link
                        to="/product/okra-shampoo"
                        className="bg-[#153323] text-white p-2.5 rounded-xl hover:bg-[#204b34] transition"
                        title="View Product"
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

      {/* 4 BOTANICAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-[#E8E4DA] shadow-sm">
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
              <Droplet size={22} className="text-[#153323]" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#153323]">500x Moisture Lock</h4>
            <p className="text-xs text-gray-500">Natural Okra mucilage binds hydration deep into hair and skin.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
              <Leaf size={22} className="text-[#153323]" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#153323]">100% Vegan & Clean</h4>
            <p className="text-xs text-gray-500">No sulfates, parabens, silicones, or synthetic dyes.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
              <ShieldCheck size={22} className="text-[#153323]" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#153323]">Derm Approved</h4>
            <p className="text-xs text-gray-500">Clinically tested for sensitive skin and color-treated hair.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
              <Sparkles size={22} className="text-[#153323]" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#153323]">Visible Radiance</h4>
            <p className="text-xs text-gray-500">Noticeable glass shine and soft frizz control within 1 use.</p>
          </div>
        </div>
      </section>

      {/* BEST SELLERS SECTION - Matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#799A70] block mb-1">
              Curated Formulations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153323]">
              Best Selling Essentials
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Hair Care', 'Skin Care', 'Serums'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-[#153323] text-white shadow-md'
                    : 'bg-white text-[#556358] border border-[#E8E4DA] hover:border-[#153323]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#153323] hover:text-[#799A70] border-b-2 border-[#153323] pb-1 transition-colors"
          >
            Explore All Formulations ({products.length}) <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* WHY OKRA? - SCIENCE SECTION - Matching Figma */}
      <section className="bg-[#153323] text-white py-16 sm:py-24 rounded-3xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9DBA95] block">
              The Botanical Breakthrough
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Why Okra? Nature's Secret to Weightless Moisture.
            </h2>
            <p className="text-sm sm:text-base text-[#D4E3D0] leading-relaxed">
              Okra (Abelmoschus Esculentus) produces a natural botanical mucilage rich in galacturonic acid, pectins, and essential polysaccharides. Unlike synthetic silicones that build up and suffocate strands, okra mucilage forms a flexible, breathable shield that seals cuticles and delivers deep slip.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#9DBA95] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#E2ECE0]">
                  <strong>Rich in Vitamins A & C:</strong> Stimulates collagen production and protects against free-radical oxidative damage.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#9DBA95] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#E2ECE0]">
                  <strong>Natural Silicone Replacement:</strong> Exceptional slip detangles textured and coarse hair effortlessly.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#9DBA95] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#E2ECE0]">
                  <strong>Scalp Barrier Soothing:</strong> Calms flaking, itchiness, and restores natural microbiome balance.
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/ingredients"
                className="bg-[#799A70] hover:bg-[#8DB084] text-[#12241A] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition"
              >
                Read The Ingredient Encyclopedia <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="bg-[#1C3B2A] p-6 sm:p-8 rounded-3xl border border-[#2F5A41] space-y-6">
              <h3 className="font-serif text-xl font-bold text-white border-b border-[#2F5A41] pb-4">
                Clinical Comparison
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1 text-[#E2ECE0]">
                    <span>Hydration Retention (72 Hours)</span>
                    <span className="text-[#9DBA95]">96%</span>
                  </div>
                  <div className="w-full bg-[#132A1E] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#799A70] h-full rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1 text-[#E2ECE0]">
                    <span>Frizz Reduction in 85% Humidity</span>
                    <span className="text-[#9DBA95]">91%</span>
                  </div>
                  <div className="w-full bg-[#132A1E] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#799A70] h-full rounded-full" style={{ width: '91%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1 text-[#E2ECE0]">
                    <span>Scalp Barrier Soothing Response</span>
                    <span className="text-[#9DBA95]">98%</span>
                  </div>
                  <div className="w-full bg-[#132A1E] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#799A70] h-full rounded-full" style={{ width: '98%' }} />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#142C1F] rounded-2xl border border-[#2A523A] text-xs text-[#B5D1AF] italic">
                "In clinical tests, okra extract demonstrated significantly higher humectant efficacy than standard plant glycerin without causing protein buildup."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL CUSTOMER REVIEWS / TESTIMONIALS - Matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">
            Real Results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153323]">
            Loved by Over 12,000+ Customers
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            See how Adron Okra formulations transformed daily beauty rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#DDA743]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#DDA743]" />
                ))}
              </div>
              <h4 className="font-serif font-bold text-base text-[#153323]">
                "Tamed my 3C curls like magic"
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                "I was skeptical about okra in shampoo, but the slip is unbelievable! Detangled in minutes and my curls are defined and shiny with zero crunch."
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#153323] block">Aanya Sharma</span>
                <span className="text-gray-400">Verified Buyer • Mumbai</span>
              </div>
              <span className="text-[11px] font-semibold text-[#799A70] bg-[#EAF1E8] px-2 py-0.5 rounded-full">
                Okra Shampoo
              </span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#DDA743]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#DDA743]" />
                ))}
              </div>
              <h4 className="font-serif font-bold text-base text-[#153323]">
                "My dark spots faded in 3 weeks"
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                "The Okra Glow Serum is so gentle yet so effective. My acne marks faded and my skin has that glassy dewy bounce without looking oily."
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#153323] block">Rhea Desai</span>
                <span className="text-gray-400">Verified Buyer • Ahmedabad</span>
              </div>
              <span className="text-[11px] font-semibold text-[#799A70] bg-[#EAF1E8] px-2 py-0.5 rounded-full">
                Okra Glow Serum
              </span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#DDA743]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#DDA743]" />
                ))}
              </div>
              <h4 className="font-serif font-bold text-base text-[#153323]">
                "Never buying commercial face wash again"
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                "Leaves skin feeling hydrated and soft instead of squeaky and tight. The foam is light as air and the faint herbal smell is so calming."
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#153323] block">Meera Patel</span>
                <span className="text-gray-400">Verified Buyer • Surat</span>
              </div>
              <span className="text-[11px] font-semibold text-[#799A70] bg-[#EAF1E8] px-2 py-0.5 rounded-full">
                Gentle Face Wash
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM / COMMUNITY GALLERY - Matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">
            #AdronBeauty
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#153323]">
            Follow Our Clean Rituals on Instagram
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80"
              alt="Adron Community"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
              alt="Adron Community"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
              alt="Adron Community"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
              alt="Adron Community"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
