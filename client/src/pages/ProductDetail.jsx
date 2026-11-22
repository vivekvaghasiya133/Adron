import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Plus, Minus, ShieldCheck, Leaf, Sparkles, Check, ArrowRight, ChevronRight, ChevronDown, ChevronUp, Droplet } from 'lucide-react';
import { useShop, fallbackProducts } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();

  const [product, setProduct] = useState(() => {
    return products.find(p => p.id === id) || fallbackProducts.find(p => p.id === id) || fallbackProducts[0];
  });
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);

  // Reviews state
  const [reviewsList, setReviewsList] = useState([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.id === id) || fallbackProducts.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
      setSelectedSize(found.sizes ? found.sizes[0] : 'Standard');
      setQuantity(1);
    }
    // Fetch live reviews from backend
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.product) {
          setProduct(data.product);
          if (data.product.reviews && data.product.reviews.length > 0) {
            setReviewsList(data.product.reviews);
          }
        }
      })
      .catch(() => {});
  }, [id, products]);

  const isFav = isInWishlist(product.id);

  // Dynamic content based on product type to match Figma slices
  const isShampoo = product.id === 'okra-shampoo';
  const isFacewash = product.id === 'okra-facewash';
  const isSerum = product.id === 'okra-serum';

  const heroFeatureTitle = isShampoo
    ? "Why Okra Shampoo is Your Ultimate Haircare Hero?"
    : isFacewash
    ? "Why Okra Face Wash is Your Skin Barrier Savior"
    : isSerum
    ? "Why Okra Glow Serum is the Holy Grail of Glass Skin"
    : `Why ${product.name} is Your Daily Ritual Hero`;

  const heroFeatureStats = isShampoo
    ? [
        { pct: "96%", label: "Reported less frizz & immediate slip" },
        { pct: "92%", label: "Noticeable increase in gloss & shine" },
        { pct: "88%", label: "Healthier scalp with reduced flaking" }
      ]
    : isFacewash
    ? [
        { pct: "98%", label: "Skin feels soft without stripped dryness" },
        { pct: "94%", label: "Noticeable pore refinement in 14 days" },
        { pct: "91%", label: "Calmed redness and balanced sebum" }
      ]
    : [
        { pct: "97%", label: "Reported radiant glass-skin glow" },
        { pct: "93%", label: "Visible reduction in hyperpigmentation" },
        { pct: "95%", label: "72-hour deep epidermal moisture lock" }
      ];

  const modelImage = isShampoo
    ? "/figma/model_shampoo.png"
    : isFacewash
    ? "/figma/model_facewash.png"
    : "/figma/model_serum.png";

  const actionImage = isShampoo
    ? "/figma/shower_lather.png"
    : isFacewash
    ? "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
    : "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80";

  const beforeAfterImage = isShampoo
    ? "/figma/scalp_before_after.png"
    : "/figma/skin_before_after.png";

  // Product specific FAQs matching Figma
  const faqs = isShampoo
    ? [
        { q: "Is this shampoo safe for keratin-treated or color-treated hair?", a: "Yes, absolutely! Our formula is 100% sulfate-free and formulated at a scalp-neutral pH of 5.5, which preserves hair color vibrancy and protects keratin bonds from degradation." },
        { q: "Does it leave any sticky okra residue in hair?", a: "Not at all. We utilize a micro-filtered cold extraction process that isolates pure soluble polysaccharides. It rinses completely clean with water, leaving only lightweight slip and glossy movement." },
        { q: "How often should I use the Okra Shampoo?", a: "Because it is gentle and devoid of harsh sulfates or stripping detergents, it is safe for daily use or 2-3 times per week according to your wash routine." },
        { q: "Is it suitable for an oily scalp with dry ends?", a: "Yes! Okra mucilage balances sebum production at the roots while hydrating and sealing brittle cuticles along the ends." },
        { q: "What gives it that smooth slip without synthetic silicones?", a: "Pure okra mucilage naturally mimics the lubricating glide of silicones thanks to galacturonic acid and pectin, detangling effortlessly without heavy plastic buildup." }
      ]
    : isFacewash
    ? [
        { q: "Will this cleanser strip my skin or leave it feeling tight?", a: "No. The combination of gentle plant glucosides and cold-pressed okra mucilage preserves your acid mantle, leaving skin plump, supple, and hydrated." },
        { q: "Can I use it to remove daily sunscreen and light makeup?", a: "Yes. The dense botanical lather effortlessly breaks down water-resistant sunscreen, sebum, and daily pollutants without harsh tugging." },
        { q: "Is it safe for acne-prone and sensitive skin?", a: "Yes! Okra mucilage contains natural anti-inflammatory bioflavonoids paired with green tea and cica to soothe active breakouts and redness." }
      ]
    : [
        { q: "How soon can I expect to see visible glass skin results?", a: "Most users notice enhanced bounce and dewy hydration within 24 hours. Clinically, dark spots and pore texture visibly improve after 14 to 21 days of daily use." },
        { q: "Can I layer this serum with other actives like retinol or AHAs?", a: "Yes. Our stabilized formula features 5% Niacinamide and ethyl ascorbic acid buffered by soothing okra mucilage, making it gentle enough to layer morning and evening." },
        { q: "Does it feel sticky after absorption?", a: "No. It absorbs in under 30 seconds to a soft, velvety petal finish that sits beautifully under moisturizer and makeup." }
      ];

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          author: newReviewAuthor,
          rating: newReviewRating,
          comment: newReviewComment
        })
      });
      const data = await res.json();
      if (data.success) {
        setReviewsList(prev => [data.review, ...prev]);
        setReviewSubmitted(true);
        setNewReviewAuthor('');
        setNewReviewComment('');
      }
    } catch {
      const mock = {
        id: 'rev-' + Date.now(),
        productId: product.id,
        author: newReviewAuthor,
        rating: newReviewRating,
        comment: newReviewComment,
        date: new Date().toISOString().split('T')[0],
        verified: true
      };
      setReviewsList(prev => [mock, ...prev]);
      setReviewSubmitted(true);
      setNewReviewAuthor('');
      setNewReviewComment('');
    }
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 bg-[#FAF8F5]">
      {/* 1. TOP HERO PURCHASE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-6">
          <Link to="/" className="hover:text-[#153323] transition">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-[#153323] transition">Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#153323] transition">
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#153323] font-bold line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Product Images & Thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-[#E8E4DA] relative shadow-md p-4 flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#153323] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-md text-gray-700 transition"
                title={isFav ? "Saved in Favorites" : "Add to Favorites"}
              >
                <Heart size={20} className={isFav ? "fill-[#C24B4B] text-[#C24B4B]" : "text-gray-500"} />
              </button>
            </div>

            {/* Thumbnails row */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[product.image, ...product.gallery].filter((v, i, a) => a.indexOf(v) === i).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white p-1 ${
                      selectedImage === img ? 'border-[#153323] ring-2 ring-[#5B7E52]/30' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Add to Cart */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block mb-1">
                {product.category} • Okra Botanical Science
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#153323] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex text-[#E5A93C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#E5A93C] text-[#E5A93C]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#153323]">
                  5.0 ({product.reviewsCount || 128} Verified Reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-2 border-b border-gray-200">
              <span className="text-3xl font-serif font-bold text-[#153323]">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ${Number(product.originalPrice).toFixed(2)}
                  </span>
                  <span className="text-xs font-bold bg-[#EBF2E9] text-[#153323] px-2.5 py-0.5 rounded-full">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Select Size: <span className="text-[#153323] font-semibold">{selectedSize}</span>
                </span>
                <div className="flex gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs font-bold px-5 py-2.5 rounded-xl border transition-all ${
                        selectedSize === s
                          ? 'bg-[#153323] text-white border-[#153323] shadow-md'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#153323]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Pill Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-gray-300 rounded-full bg-white px-4 py-2.5 w-full sm:w-36">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-gray-600 hover:text-black transition"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="text-sm font-bold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-gray-600 hover:text-black transition"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Pill Add to Cart Button matching Figma */}
                <button
                  onClick={() => addToCart(product, selectedSize, quantity)}
                  className="flex-1 bg-[#153323] hover:bg-[#204b34] text-white text-sm font-semibold py-3.5 px-8 rounded-full shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                >
                  ADD TO CART • ${(product.price * quantity).toFixed(2)}
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product, selectedSize, quantity);
                  navigate('/checkout');
                }}
                className="w-full bg-[#EBF2E9] hover:bg-[#D7E6D3] text-[#153323] text-xs font-bold uppercase tracking-wider py-3 rounded-full transition border border-[#5B7E52]/30"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Guarantees Box */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 text-center text-[11px] text-gray-500">
              <div className="flex flex-col items-center gap-1">
                <Leaf size={16} className="text-[#5B7E52]" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={16} className="text-[#5B7E52]" />
                <span>Cruelty-Free & Vegan</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Sparkles size={16} className="text-[#5B7E52]" />
                <span>30-Day Money Back</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE SPLIT BANNER: "Why Okra Shampoo is Your Ultimate Haircare Hero?" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF5ED] rounded-3xl p-6 sm:p-12 border border-[#D7E6D3] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left stats & text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block">
              Clinical Clinical Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153323] leading-tight">
              {heroFeatureTitle}
            </h2>
            <p className="text-sm text-[#4E6354] leading-relaxed">
              Powered by high concentrations of cold-pressed okra mucilage. Pectins and natural bio-polysaccharides create a weightless moisture shield that smooths hair cuticles, calms irritation, and locks in long-lasting bounce.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              {heroFeatureStats.map((st, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-[#D7E6D3] text-center space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#5B7E52] block">
                    {st.pct}
                  </span>
                  <span className="text-[11px] text-gray-600 font-medium block leading-tight">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Model Holding Product */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="max-w-xs rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white">
              <img
                src={modelImage}
                onError={(e) => { e.currentTarget.src = product.image; }}
                alt="Product Hero Model"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT DESCRIPTION & BOTANICAL ICONS (Mint Card matching Figma) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF5ED] rounded-3xl p-6 sm:p-10 border border-[#D7E6D3] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-around md:flex-col md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white text-[#153323] flex items-center justify-center shadow-sm">
                <Leaf size={22} className="text-[#5B7E52]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#153323]">100% Vegan</h4>
                <p className="text-[11px] text-gray-500">Pure plant-derived</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white text-[#153323] flex items-center justify-center shadow-sm">
                <Droplet size={22} className="text-[#5B7E52]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#153323]">Sulfate-Free</h4>
                <p className="text-[11px] text-gray-500">Zero harsh chemicals</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white text-[#153323] flex items-center justify-center shadow-sm">
                <ShieldCheck size={22} className="text-[#5B7E52]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#153323]">Cruelty-Free</h4>
                <p className="text-[11px] text-gray-500">Leaping bunny certified</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#153323]">
              Product Description
            </h3>
            <p className="text-sm text-[#4E6354] leading-relaxed">
              {product.description}
            </p>
            <p className="text-sm text-[#4E6354] leading-relaxed">
              Our unique gentle processing retains the delicate galacturonic acid molecules that mimic cosmetic silicones naturally. It coats strands with weightless slip, enhances combability, and seals down rough cuticle scales to reflect pristine ambient light.
            </p>
          </div>
        </div>
      </section>

      {/* 4. APPLICATION EXPERIENCE / IN-SHOWER LATHER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E8E4DA] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block">
              The Daily Ritual
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#153323]">
              {isShampoo ? "How It Transforms Your Wash Day" : "The Cleanse Ritual in Action"}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Experience a rich, creamy lather that feels velvety and luxurious in your hands. Unlike commercial detergents that strip natural lipids, our okra formula leaves hair and skin feeling supple, soft, and balanced immediately after rinsing.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#5B7E52] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-700">
                  <strong>Zero Silicone Build-up:</strong> Leaves hair airy with natural bounce and zero residue.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#5B7E52] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-700">
                  <strong>Scalp Barrier Soothing:</strong> Calms irritation, balances natural oils, and prevents dryness.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#5B7E52] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-700">
                  <strong>Instant Comb Slip:</strong> Wet fingers or combs glide effortlessly through tangles.
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-[#E8E4DA] w-full max-w-md bg-[#FAF8F5]">
              <img
                src={actionImage}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'; }}
                alt="Product in Action"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. SCALP TRANSFORMATION & HOW TO USE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E8E4DA] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#E8E4DA] bg-[#FAF8F5]">
              <img
                src={beforeAfterImage}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1512290900672-1f4142f10b75?auto=format&fit=crop&w=600&q=80'; }}
                alt="Before & After Transformation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block">
              Step-by-Step Instructions
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#153323]">
              How to Use
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
              <div className="flex gap-4 items-start p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DA]">
                <span className="w-7 h-7 rounded-full bg-[#153323] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </span>
                <div>
                  <h5 className="font-bold text-[#153323]">Wet Thoroughly</h5>
                  <p className="text-xs text-gray-500">Soak hair or skin completely with warm water to open cuticles and pores.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DA]">
                <span className="w-7 h-7 rounded-full bg-[#153323] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </span>
                <div>
                  <h5 className="font-bold text-[#153323]">Massage & Emulsify</h5>
                  <p className="text-xs text-gray-500">Work formula gently into a dense lather using your fingertips for 60 seconds.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DA]">
                <span className="w-7 h-7 rounded-full bg-[#153323] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </span>
                <div>
                  <h5 className="font-bold text-[#153323]">Rinse Clean</h5>
                  <p className="text-xs text-gray-500">Rinse with cool water to seal the botanical mucilage barrier and lock in mirror shine.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. KEY INGREDIENTS WITH TEST TUBES VISUAL matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF5ED] rounded-3xl p-6 sm:p-12 border border-[#D7E6D3] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52] block">
              Formulation Purity
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#153323]">
              Key Ingredients
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-white rounded-2xl border border-[#D7E6D3]">
                <strong className="text-[#153323] block text-sm font-serif">Pure Cold-Pressed Okra Extract (Abelmoschus Esculentus)</strong>
                <p className="text-xs text-gray-600 mt-1">Rich in natural pectins and polysaccharides that coat strands with weightless moisture and detangling slip.</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-[#D7E6D3]">
                <strong className="text-[#153323] block text-sm font-serif">Hydrolyzed Pea Protein</strong>
                <p className="text-xs text-gray-600 mt-1">Penetrates cortex to rebuild broken keratin bonds, restoring hair tensile strength and elasticity.</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-[#D7E6D3]">
                <strong className="text-[#153323] block text-sm font-serif">Hibiscus Sabdariffa Flower Water</strong>
                <p className="text-xs text-gray-600 mt-1">Stimulates microcirculation at the roots, imparts a natural floral fragrance, and enhances natural gloss.</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-[#D7E6D3]">
                <strong className="text-[#153323] block text-sm font-serif">Organic Moroccan Argan Oil</strong>
                <p className="text-xs text-gray-600 mt-1">Seals outer cuticle layers against humidity-induced frizz and UV environmental oxidative damage.</p>
              </div>
            </div>

            <Link
              to="/ingredients"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#153323] hover:text-[#5B7E52] underline"
            >
              Explore Full Ingredients Encyclopedia →
            </Link>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-md bg-white p-4 border border-[#D7E6D3]">
              <img
                src="/figma/test_tubes.png"
                onError={(e) => { e.currentTarget.src = heroSerum.image; }}
                alt="Laboratory Test Tubes Extraction"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ Accordion matching Figma) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
            Questions & Answers
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#153323]">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E8E4DA] overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-[#153323] hover:text-[#5B7E52]"
              >
                <span>{faq.q}</span>
                <span className="text-gray-400 shrink-0">
                  {activeFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
              {activeFaq === i && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS & RATING DISTRIBUTION CHART matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
            Verified Customer Reviews
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#153323]">
            Customer Feedback
          </h3>
        </div>

        {/* Rating Chart Bar Container matching Figma */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E4DA] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center md:text-left space-y-2">
            <span className="font-serif text-5xl font-bold text-[#153323]">4.9</span>
            <div className="flex justify-center md:justify-start text-[#E5A93C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-[#E5A93C] text-[#E5A93C]" />
              ))}
            </div>
            <span className="text-xs text-gray-500 block">Based on 240+ verified ratings</span>
          </div>

          <div className="md:col-span-8 space-y-2.5 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-14 text-gray-500 font-medium">5 Star</span>
              <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#5B7E52] h-full rounded-full" style={{ width: '85%' }} />
              </div>
              <span className="w-10 text-right font-bold text-[#153323]">85%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-14 text-gray-500 font-medium">4 Star</span>
              <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#5B7E52] h-full rounded-full" style={{ width: '12%' }} />
              </div>
              <span className="w-10 text-right font-bold text-[#153323]">12%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-14 text-gray-500 font-medium">3 Star</span>
              <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#5B7E52] h-full rounded-full" style={{ width: '2%' }} />
              </div>
              <span className="w-10 text-right font-bold text-[#153323]">2%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-14 text-gray-500 font-medium">2 Star</span>
              <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#5B7E52] h-full rounded-full" style={{ width: '1%' }} />
              </div>
              <span className="w-10 text-right font-bold text-[#153323]">1%</span>
            </div>
          </div>
        </div>

        {/* Review Submission Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E4DA] space-y-4">
          <h4 className="font-serif text-lg font-bold text-[#153323]">
            Write a Review for {product.name}
          </h4>

          {reviewSubmitted ? (
            <div className="p-4 bg-[#EBF2E9] text-[#153323] rounded-2xl text-xs font-semibold">
              Thank you! Your verified review has been posted.
            </div>
          ) : (
            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Maya S."
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-3 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Rating</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-3 rounded-xl outline-none font-semibold text-gray-700"
                  >
                    <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                    <option value="4">★★★★☆ (4 Stars - Great)</option>
                    <option value="3">★★★☆☆ (3 Stars - Average)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Your Review</label>
                <textarea
                  required
                  rows="3"
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share your experience with this okra formulation..."
                  className="w-full bg-[#FAF8F5] border border-gray-200 p-3 rounded-xl outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#153323] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#204b34] transition"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>

        {/* Existing Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(reviewsList.length > 0 ? reviewsList : [
            { id: '1', author: 'Aanya S.', date: '2 days ago', rating: 5, comment: 'The detangling slip on this shampoo is unlike anything I have ever used. My curls were defined with zero frizz.' },
            { id: '2', author: 'Rhea D.', date: '1 week ago', rating: 5, comment: 'No plastic buildup or sticky feeling! Scalp feels so fresh and calm.' }
          ]).map((rev) => (
            <div key={rev.id} className="p-5 bg-white rounded-3xl border border-[#E8E4DA] space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#153323] text-sm">{rev.author}</span>
                <span className="text-[11px] text-gray-400">{rev.date}</span>
              </div>
              <div className="flex text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < rev.rating ? "fill-[#E5A93C] text-[#E5A93C]" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. EXPLORE RELATED RITUALS (3 Product Cards matching Figma) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
            Complete The Ritual
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#153323]">
            You May Also Like
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 10. INSTAGRAM GRID matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B7E52]">
            #AdronBeauty
          </span>
          <h4 className="font-serif text-xl font-bold text-[#153323]">
            Follow Our Clean Rituals on Instagram
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80'
          ].map((url, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-sm bg-[#FAF8F5]">
              <img src={url} alt="Instagram" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
