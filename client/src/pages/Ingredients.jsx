import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sparkles, Droplets, CheckCircle, ArrowRight, ShieldCheck, Check, X } from 'lucide-react';

const fallbackIngredients = [
  {
    id: "okra-mucilage",
    name: "Okra Fruit Mucilage (Pectins & Polysaccharides)",
    source: "Organic Abelmoschus Esculentus pods",
    primaryFunction: "Hydration Lock & Cuticle Smoothing",
    description: "Known as nature's botanical hyaluronic acid, Okra mucilage contains high concentrations of galacturonic acid, pectin, and water-soluble polysaccharides. It creates an invisible, weightless protective film over hair cuticles and skin epidermis, locking in moisture 500x its weight while delivering natural silicone-like glide without buildup.",
    benefits: [
      "Natural slip and detangling power without synthetic silicones",
      "Locks in deep cellular hydration for 72 hours",
      "High natural content of Vitamin A, C, and antioxidant flavonoids",
      "Calms inflammation and accelerates skin barrier recovery"
    ],
    foundIn: ["Smooth & Shine Shampoo", "Gentle Face Wash", "Okra Glow Serum", "Deep Moisture Hair Mask"],
    image: "/figma/okra_sliced_seeds.png"
  },
  {
    id: "biotin",
    name: "Pure Biotin (Vitamin B7)",
    source: "Fermented Plant Extract",
    primaryFunction: "Follicle Strengthening & Elasticity",
    description: "A water-soluble B-complex vitamin essential for cellular energy and keratin production. By reinforcing the structural integrity of keratin bonds, Biotin reduces strand breakage and helps maintain voluminous, thicker-looking hair.",
    benefits: [
      "Reduces hair thinning caused by environmental stress",
      "Improves hair cortex tensile strength",
      "Protects against split ends and mechanical damage"
    ],
    foundIn: ["Smooth & Shine Shampoo", "Revitalizing Scalp Oil"],
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "niacinamide",
    name: "Niacinamide (Vitamin B3 5%)",
    source: "Bio-Synthesized Active",
    primaryFunction: "Pore Refinement & Brightening",
    description: "A gold-standard skincare vitamin clinically proven to enhance barrier lipid synthesis, minimize the appearance of enlarged pores, and regulate sebum production while fading post-acne marks.",
    benefits: [
      "Tightens pore walls and balances oil production",
      "Fades hyperpigmentation and dark spots",
      "Works synergistically with Okra polysaccharides for glowing clarity"
    ],
    foundIn: ["Okra Glow Serum"],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "aloe-vera",
    name: "Organic Aloe Barbadensis Juice",
    source: "Cold-Pressed Inner Leaf Gel",
    primaryFunction: "Soothing & Anti-Redness",
    description: "Harvested from organically cultivated Aloe leaves, this soothing extract contains over 75 active vitamins, enzymes, and amino acids to calm sensitive skin and itchy, inflamed scalps.",
    benefits: [
      "Provides instant cooling relief to sun-stressed or irritated skin",
      "Restores scalp pH balance after washing",
      "Natural humectant that attracts ambient moisture"
    ],
    foundIn: ["Smooth & Shine Shampoo", "Gentle Face Wash", "Silky Body Lotion"],
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "argan-oil",
    name: "Cold-Pressed Moroccan Argan Oil",
    source: "Hand-Harvested Argania Spinosa Nuts",
    primaryFunction: "Nourishing Lipid Replenishment",
    description: "Rich in oleic and linoleic essential fatty acids and natural Vitamin E, Moroccan Argan Oil envelopes dry hair strands and rough skin in rich nourishment, preventing moisture loss and leaving a mirror-like shine.",
    benefits: [
      "Seals moisture inside the hair shaft without greasy heaviness",
      "Protects against daily heat styling and oxidative stress",
      "Softens brittle ends and restores natural bounce"
    ],
    foundIn: ["Smooth & Shine Shampoo", "Deep Moisture Hair Mask"],
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hyaluronic-acid",
    name: "Multi-Molecular Hyaluronic Acid",
    source: "Biotechnological Fermentation",
    primaryFunction: "Multi-Depth Hydration",
    description: "Combines high, medium, and low molecular weights of Hyaluronic Acid to hydrate all skin layers—from surface smoothing to deep cellular plumping.",
    benefits: [
      "Instantly plumps fine dry lines",
      "Creates a moisture reservoir that lasts all day",
      "Smooths skin texture for effortless makeup application"
    ],
    foundIn: ["Gentle Face Wash", "Okra Glow Serum"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
  }
];

export default function Ingredients() {
  const [ingredients, setIngredients] = useState(fallbackIngredients);

  useEffect(() => {
    fetch('/api/ingredients')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.ingredients?.length > 0) {
          setIngredients(data.ingredients);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 bg-[#FAF8F5]">
      {/* Hero Banner - Matching Figma "Goodness begins with ingredients" */}
      <div className="bg-[#EFF5ED] rounded-3xl p-8 sm:p-12 border border-[#D7E6D3] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block">
            Clean Botanical Pharmacy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#153323] leading-tight">
            Goodness Begins With <span className="text-[#5B7E52]">Ingredients</span>
          </h1>
          <p className="text-sm sm:text-base text-[#4E6354] leading-relaxed">
            We believe in complete formulation transparency. Every single botanical extract in our Adron formulations is sustainably sourced, cold-extracted, and backed by clinical research.
          </p>
        </div>

        <div className="w-48 h-48 rounded-2xl overflow-hidden bg-white p-2 shadow-md border border-[#D7E6D3] shrink-0">
          <img
            src="/figma/okra_sliced_seeds.png"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80'; }}
            alt="Sliced Okra Pods"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Featured Botanical Card: OKRA MUCILAGE */}
      <div className="bg-[#153323] text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-[#234d35] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#204b34] text-[#9DBA95] text-xs font-semibold uppercase">
            <Leaf size={14} /> Star Ingredient
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Abelmoschus Esculentus (Okra Mucilage Extract)
          </h2>
          <p className="text-sm text-[#D4E3D0] leading-relaxed">
            The secret to Adron's transformative slip. The mucilaginous pectins found in organic okra form a flexible moisture matrix that locks hydration directly into the hair cuticle and skin stratum corneum. It delivers all the glide and mirror shine of cosmetic silicones — with 0% buildup and 100% natural biodegradability.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
            <div className="bg-[#1C3B2A] p-3.5 rounded-xl border border-[#2F5A41]">
              <span className="font-bold text-white block">500x Weight</span>
              <span className="text-[#9DBA95]">In water-binding capacity</span>
            </div>
            <div className="bg-[#1C3B2A] p-3.5 rounded-xl border border-[#2F5A41]">
              <span className="font-bold text-white block">Vitamin A, C & K</span>
              <span className="text-[#9DBA95]">Antioxidant cellular defense</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-sm">
            <img
              src="/figma/daily_ritual_bottle.png"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80'; }}
              alt="Fresh Organic Okra"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="space-y-8">
        <div className="border-b border-[#E8E4DA] pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block mb-1">
            Active Phytochemicals
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#153323]">
            Active Botanical Catalog
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ingredients.map((ing) => (
            <div
              key={ing.id}
              id={ing.id}
              className="bg-white rounded-3xl border border-[#E8E4DA] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={ing.image}
                    alt={ing.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B7E52] block">
                      {ing.primaryFunction}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#153323]">
                      {ing.name}
                    </h4>
                    <span className="text-xs text-gray-400 block">Source: {ing.source}</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {ing.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-gray-700 uppercase">Key Benefits:</span>
                    {ing.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <CheckCircle size={13} className="text-[#5B7E52] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] border-t border-gray-100 text-[11px] text-[#153323] flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0 pr-2 leading-relaxed">
                  <span className="text-gray-500 font-normal">Featured in: </span>
                  <strong className="font-semibold text-[#153323]">{ing.foundIn.slice(0, 2).join(', ')}</strong>
                </div>
                <Link
                  to="/shop"
                  className="text-[#5B7E52] font-bold hover:underline shrink-0 whitespace-nowrap inline-flex items-center gap-1 group"
                >
                  <span>Shop</span>
                  <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT WE FORMULATE WITHOUT - Checklist matching Figma */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E4DA] shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
            Our Safety Promise
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#153323]">
            What We Formulate WITHOUT
          </h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            100% clean, non-toxic, and biocompatible ingredients only.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          {[
            { label: '0% Sulfates (SLS / SLES)', desc: 'No harsh stripping detergents' },
            { label: '0% Synthetic Silicones', desc: 'No suffocating plastic build-up' },
            { label: '0% Parabens & Phthalates', desc: 'No endocrine disruptors' },
            { label: '0% Synthetic Dyes & Fragrance', desc: '100% naturally scented' },
            { label: '0% Formaldehyde Donors', desc: 'Zero carcinogenic preservatives' },
            { label: '0% Mineral Oils & Petrolatum', desc: 'Non-comedogenic botanicals' },
            { label: '0% Animal-Derived Ingredients', desc: '100% Vegan Leaping Bunny' },
            { label: '0% Microplastics', desc: 'Fully biodegradable formulas' },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E4DA] text-center space-y-1">
              <span className="font-bold text-xs text-[#153323] block">{item.label}</span>
              <span className="text-[10px] text-gray-500 block">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Botanical Standard Callout */}
      <div className="bg-[#EFF5ED] p-8 sm:p-12 rounded-3xl border border-[#D7E6D3] text-center space-y-4 max-w-4xl mx-auto shadow-sm">
        <h3 className="font-serif text-2xl font-bold text-[#153323]">
          Experience The Okra Difference
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 max-w-xl mx-auto leading-relaxed">
          Discover why thousands are switching to pure cold-extracted Okra mucilage for weightless hair slip and glowing glass skin.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="bg-[#153323] text-white text-xs font-semibold px-8 py-3.5 rounded-full hover:bg-[#204b34] transition inline-block shadow-md"
          >
            Shop The Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
