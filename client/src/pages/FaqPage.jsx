import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, HelpCircle, ArrowRight, Sparkles, Truck, RotateCcw, ShieldCheck } from 'lucide-react';

const allFaqs = [
  {
    category: 'Orders & Shipping',
    items: [
      {
        q: 'How long does shipping take across India?',
        a: 'Orders are dispatched within 24 hours from our facility in Gujarat. Metro cities receive parcels within 2 to 3 business days, while non-metro locations take 3 to 5 business days.'
      },
      {
        q: 'How can I track my shipment?',
        a: 'You will receive an automated SMS and WhatsApp update with your BlueDart / Delhivery tracking number as soon as the parcel leaves our hub. You can also visit our Track Order page anytime.'
      },
      {
        q: 'Do you offer Cash on Delivery (COD)?',
        a: 'Yes, Cash on Delivery is available for all serviceable pin codes across India on orders up to ₹3,000 at zero additional charge.'
      },
      {
        q: 'How do I qualify for free delivery?',
        a: 'All orders with a cart subtotal above ₹999 qualify for 100% free express delivery. For orders under ₹999, a nominal flat rate of ₹99 is added at checkout.'
      }
    ]
  },
  {
    category: 'Botanical Science & Formulations',
    items: [
      {
        q: 'Why is Okra the star ingredient in Adron formulations?',
        a: 'Okra fruit contains an extraordinary botanical mucilage packed with natural pectins, polysaccharides, and vitamins A & C. It acts as nature’s organic hyaluronic acid, coating hair cuticles and skin with a breathable weightless moisture shield without synthetic silicones.'
      },
      {
        q: 'Are your products 100% free from sulfates, parabens, and silicones?',
        a: 'Yes! We strictly formulate WITHOUT sodium lauryl sulfates (SLS/SLES), synthetic silicones (dimethicone), parabens, phthalates, synthetic artificial dyes, or mineral oils.'
      },
      {
        q: 'Are your formulations cruelty-free and vegan?',
        a: '100% yes. We never test on animals and our formulations carry zero animal-derived ingredients, proudly certified cruelty-free and vegan.'
      },
      {
        q: 'Where are your raw botanicals sourced?',
        a: 'We partner directly with organic certified farming cooperatives in Gujarat, India to harvest fresh, pesticide-free Okra pods, cold-extracted under strict pharmaceutical-grade GMP conditions.'
      }
    ]
  },
  {
    category: 'Routine & Compatibility',
    items: [
      {
        q: 'Is Okra Shampoo suitable for color-treated and chemically treated hair?',
        a: 'Yes. Because our shampoo is sulfate-free and pH-balanced (5.5), it will not strip salon dyes, keratin treatments, or hair highlights. In fact, the natural mucilage prolongs color vibrancy.'
      },
      {
        q: 'Can I use Okra Boost Glow Serum on sensitive or acne-prone skin?',
        a: 'Yes, the serum is oil-free, non-comedogenic, and water-based. It pairs cold-pressed okra with cooling cucumber water and licorice root, which naturally calm active redness and soothe breakouts.'
      },
      {
        q: 'In what order should I apply the Okra products?',
        a: 'For skincare: Cleanse with Hydra Glow Creamy Face Wash, apply 3–4 drops of Okra Boost Glow Serum, and seal with your favorite moisturizer or sunscreen. For haircare: Lather with Okra Shampoo, rinse thoroughly, and style.'
      }
    ]
  },
  {
    category: 'Returns & Guarantees',
    items: [
      {
        q: 'What is your 15-day return policy?',
        a: 'If a product does not agree with your hair or skin type, contact us at care@adronbotanicals.com within 15 days of delivery. We will arrange a free reverse pickup and issue a full refund or exchange.'
      },
      {
        q: 'How long does a refund take to process?',
        a: 'Prepaid orders are refunded back to your original bank/card/UPI within 3 to 5 business days upon pickup confirmation. COD refunds are sent via instant UPI or NEFT.'
      }
    ]
  }
];

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState('All Questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = allFaqs
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          (activeTab === 'All Questions' || cat.category === activeTab) &&
          (item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#1C201D] font-sans antialiased selection:bg-[#84A338]/20">
      {/* Hero Header */}
      <section className="relative w-full bg-[#F4F7EE] py-12 lg:py-16 border-b border-[#E8EDE0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#84A338] block">
            HOW CAN WE HELP YOU?
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1C201D] tracking-tight leading-tight max-w-2xl mx-auto">
            Frequently Asked <span className="text-[#84A338]">Questions</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal max-w-xl mx-auto">
            Everything you need to know about our cold-pressed Okra mucilage formulations, delivery timelines, routines, and guarantees.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto pt-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. shipping, ingredients, return)..."
                className="w-full bg-white border border-gray-200 rounded-full pl-11 pr-4 py-3 text-xs outline-none focus:border-[#84A338] shadow-sm transition"
              />
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {['All Questions', 'Orders & Shipping', 'Botanical Science & Formulations', 'Routine & Compatibility', 'Returns & Guarantees'].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#1C201D] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* FAQs list */}
        <div className="space-y-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 p-8 space-y-3">
              <HelpCircle size={32} className="mx-auto text-gray-400" />
              <h3 className="text-sm font-bold text-[#1C201D]">No matching questions found</h3>
              <p className="text-xs text-gray-500">Try searching with a different keyword or reach out to our team directly.</p>
              <Link to="/contact" className="inline-block text-xs font-bold text-[#84A338] hover:underline">
                Contact Customer Care →
              </Link>
            </div>
          ) : (
            filteredCategories.map((cat, cIdx) => (
              <div key={cIdx} className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#84A338] px-1">
                  {cat.category}
                </h3>

                <div className="space-y-2.5">
                  {cat.items.map((item, iIdx) => {
                    const key = `${cIdx}-${iIdx}`;
                    const isOpen = openItems[key];
                    return (
                      <div
                        key={iIdx}
                        className="bg-white border border-[#E8EDE0] rounded-2xl overflow-hidden transition-all shadow-2xs"
                      >
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1C201D] hover:text-[#84A338] transition cursor-pointer"
                        >
                          <span>{item.q}</span>
                          <span
                            className={`w-6 h-6 rounded-full bg-[#FAF8F5] flex items-center justify-center text-gray-500 transition-transform duration-200 shrink-0 ${
                              isOpen ? 'rotate-180 text-[#84A338]' : ''
                            }`}
                          >
                            <ChevronDown size={14} />
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-50 animate-fade-in">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Still Have Questions Banner */}
        <div className="p-8 rounded-3xl bg-[#F4F7EE] border border-[#E8EDE0] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-base text-[#1C201D]">Still have questions?</h3>
            <p className="text-xs text-gray-600">Our botanical advisors are available on email and WhatsApp to assist you.</p>
          </div>
          <Link
            to="/contact"
            className="bg-[#1C201D] hover:bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition"
          >
            <span>Ask a Question</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
