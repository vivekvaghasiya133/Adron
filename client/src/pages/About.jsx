import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">The Adron Story</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#153323] leading-tight">
          Where Ancient Botanical Wisdom Meets Modern Hair & Skin Science
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Adron was founded on a singular clinical revelation: that the humble Okra plant produces one of nature's most extraordinary hydration compounds.
        </p>
      </div>

      {/* Split Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-5 text-sm text-gray-700 leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">
            Rethinking Silicones and Synthetic Thickeners
          </h2>
          <p>
            For decades, personal care brands relied on synthetic silicones (dimethicone, cyclomethicone) to fake smoothness. While silicones feel smooth initially, they coat the cuticle, suffocating hair shafts and creating heavy, greasy buildup over time.
          </p>
          <p>
            At Adron, we engineered a clean alternative. Using a proprietary cold-press extraction method, we isolate pure Okra mucilage—a nutrient-dense bio-polymer packed with polysaccharides, amino acids, and vitamins A and C. It forms a breathable, microscopic shield that detangles effortlessly and locks in deep cellular hydration without ever weighing hair down.
          </p>
          <div className="pt-2">
            <Link
              to="/ingredients"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#153323] underline"
            >
              Explore our full ingredients philosophy →
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#E8E4DA]">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
              alt="Botanical Extraction Laboratory"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 3 Core Commitments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        <div className="bg-white p-8 rounded-3xl border border-[#E8E4DA] space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
            <Leaf size={22} />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#153323]">Sustainable Farming</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            All okra is grown using regenerative agricultural practices, supporting local organic farming communities with fair compensation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E8E4DA] space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
            <Award size={22} />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#153323]">Clinical Precision</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every formula is tested through independent dermatological panels to ensure compatibility with hypersensitive scalps and delicate skin.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E8E4DA] space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
            <HeartHandshake size={22} />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#153323]">100% Recyclable</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            From our aluminum caps to amber glass dropper bottles, every package is chosen to minimize environmental footprint.
          </p>
        </div>
      </div>
    </div>
  );
}
