import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Plus,
  Minus,
  Check,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { useShop, fallbackProducts } from '../context/ShopContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useShop();

  const isFacewash = id === 'okra-facewash' || id === 'facewash';
  const isShampoo = id === 'okra-shampoo' || (!isFacewash && id !== 'okra-serum');

  const [product, setProduct] = useState(() => {
    return (
      products.find((p) => p.id === id) ||
      fallbackProducts.find((p) => p.id === id) ||
      fallbackProducts[0]
    );
  });

  // Hero Gallery Thumbnails
  const shampooGallery = [
    '/figma_landing/shampoo_showcase_exact.png',
    '/figma_landing/shampoo_thumb_2.png',
    '/figma_landing/shampoo_thumb_3.png',
    '/figma_landing/shampoo_thumb_4.png'
  ];

  const facewashGallery = [
    '/figma_landing/fw_showcase_exact.png',
    '/figma_landing/fw_thumb_2.png',
    '/figma_landing/fw_thumb_3.png',
    '/figma_landing/fw_thumb_4.png'
  ];

  const currentGallery = isFacewash ? facewashGallery : shampooGallery;

  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedSize, setSelectedSize] = useState('250 ml');
  const [quantity, setQuantity] = useState(1);

  // Scalp / Face Before/After comparison slider state
  const [sliderPos, setSliderPos] = useState(50);
  const sliderContainerRef = useRef(null);
  const isDraggingSlider = useRef(false);

  // FAQ Accordion State (first item open by default)
  const [openFaq, setOpenFaq] = useState(0);

  // Reviews state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      author: isFacewash ? 'Riya Patel' : 'Ananya S.',
      rating: 5,
      date: '2 days ago',
      title: isFacewash ? 'Gentle and so hydrating!' : 'Miraculous slip and softness!',
      comment: isFacewash
        ? 'Leaves my skin thoroughly clean without that dry, tight squeaky feeling. The creamy texture melts away dirt and leaves a radiant dewy bounce.'
        : 'The natural okra mucilage gives unbelievable slip. I was skeptical about no silicone, but my hair detangles in seconds and stays lightweight with zero greasy residue.'
    },
    {
      id: 'rev-2',
      author: isFacewash ? 'Meera S.' : 'Pooja V.',
      rating: 5,
      date: '1 week ago',
      title: isFacewash ? 'Redness calmed in days' : 'Scalp irritation completely calmed',
      comment: isFacewash
        ? 'Aloe vera, cucumber and hibiscus combination is so calming for sensitive acne-prone skin. It balances natural oils effortlessly.'
        : 'Finally a botanical shampoo that actually lathers richly without stripping my scalp. The itchiness and flaking went away in 3 washes.'
    },
    {
      id: 'rev-3',
      author: isFacewash ? 'Divya K.' : 'Kavita M.',
      rating: 5,
      date: '2 weeks ago',
      title: isFacewash ? 'Fresh everyday glow' : 'Best Ayurvedic + Botanical hair care',
      comment: isFacewash
        ? 'A luxurious creamy cleanser that feels like a spa facial. Skin feels soft, refreshed, and hydrated after every morning wash.'
        : 'Hibiscus and Shikakai paired with Okra is a genius formulation. Hair looks glossy and vibrant like salon treatments.'
    }
  ]);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const found =
      products.find((p) => p.id === id) ||
      fallbackProducts.find((p) => p.id === id);
    if (found) {
      setProduct(found);
    }
    setActiveThumb(0);
    setQuantity(1);
    setSelectedSize('250 ml');
    setSliderPos(50);
  }, [id, products]);

  // Scalp / Face slider mouse/touch drag handlers
  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const onMouseDownSlider = () => {
    isDraggingSlider.current = true;
  };

  useEffect(() => {
    const onMouseUp = () => {
      isDraggingSlider.current = false;
    };
    const onMouseMove = (e) => {
      if (isDraggingSlider.current) {
        handleSliderMove(e.clientX);
      }
    };
    const onTouchMove = (e) => {
      if (isDraggingSlider.current && e.touches[0]) {
        handleSliderMove(e.touches[0].clientX);
      }
    };
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    const newRev = {
      id: 'rev-' + Date.now(),
      author: reviewName,
      rating: reviewRating,
      date: 'Just now',
      title: 'Verified Customer Review',
      comment: reviewComment
    };
    setReviewsList((prev) => [newRev, ...prev]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
      setReviewName('');
      setReviewComment('');
    }, 2000);
  };

  const prevThumb = () => {
    setActiveThumb((prev) => (prev === 0 ? currentGallery.length - 1 : prev - 1));
  };
  const nextThumb = () => {
    setActiveThumb((prev) => (prev === currentGallery.length - 1 ? 0 : prev + 1));
  };

  // Pricing logic matching Figma
  const basePrice = isFacewash ? 999 : 1299;
  const originalPrice = isFacewash ? 1299 : 1599;
  const priceDisplay = isFacewash
    ? selectedSize.includes('500')
      ? '1,699.0'
      : '999.0'
    : selectedSize.includes('500')
    ? '2,199'
    : '1,299';

  const origPriceDisplay = isFacewash
    ? selectedSize.includes('500')
      ? '2,199'
      : '1,299'
    : selectedSize.includes('500')
    ? '2,799'
    : '1,599';

  const unitNumericPrice = isFacewash
    ? selectedSize.includes('500')
      ? 1699
      : 999
    : selectedSize.includes('500')
    ? 2199
    : 1299;

  // 8 FAQs exact text from Figma
  const faqs = isFacewash
    ? [
        {
          q: '1. What is Okra Facewash?',
          a: 'Adron Hydra Glow Creamy Face Wash is a gentle botanical cleanser enriched with cold-pressed okra, cucumber, aloe vera, and hibiscus, designed to cleanse away daily impurities while preserving natural skin barrier moisture.'
        },
        {
          q: '2. What are the benefits of Okra Facewash?',
          a: 'It gently removes dirt and excess sebum without stripping the skin, hydrates deeply with plant mucilage, soothes redness, and leaves your complexion soft, plump, and glowing.'
        },
        {
          q: '3. Is Okra Facewash suitable for all skin types?',
          a: 'Yes, its balanced, pH-neutral creamy formula is dermatologically tested for dry, oily, combination, sensitive, and acne-prone skin.'
        },
        {
          q: '4. Does Okra Facewash leave skin feeling tight or dry?',
          a: 'Not at all. Unlike soap-based or harsh foam cleansers that disrupt your acid mantle, our creamy botanical blend nourishes while cleansing for a velvety petal-soft finish.'
        },
        {
          q: '5. Can I use Okra Facewash twice a day?',
          a: 'Yes! It is mild and gentle enough to be used every morning to awaken your skin and every evening to cleanse away pollutants and daily buildup.'
        },
        {
          q: '6. Does it help soothe active acne and redness?',
          a: 'Yes, natural anti-inflammatory bioflavonoids from Okra paired with soothing Aloe Vera and cooling Cucumber calm active irritation and balance sebum production.'
        },
        {
          q: '7. Can I use it to remove makeup or sunscreen?',
          a: 'Yes, the creamy botanical lather effortlessly dissolves water-resistant sunscreen, daily grime, and light makeup without aggressive rubbing or tugging.'
        },
        {
          q: '8. How should I use Okra Facewash?',
          a: 'Wet face with lukewarm water, apply an adequate amount to clean palms, massage in gentle circular motions for 60 seconds, and rinse clean with water.'
        }
      ]
    : [
        {
          q: '1. What is Okra Shampoo?',
          a: 'Okra Shampoo is a hair-care formula enriched with the benefits of okra, designed to gently cleanse the hair while helping improve softness, smoothness, and manageability.'
        },
        {
          q: '2. What are the benefits of Okra Shampoo?',
          a: 'It deeply hydrates dry and frizzy strands, gently cleanses without stripping natural oils, enhances natural shine, supports scalp health, and makes hair noticeably softer and easier to detangle.'
        },
        {
          q: '3. Is Okra Shampoo suitable for all hair types?',
          a: 'Yes, our gentle pH-balanced formula is carefully crafted for straight, wavy, curly, coily, fine, coarse, and color-treated hair.'
        },
        {
          q: '4. Does Okra Shampoo help with frizzy hair?',
          a: 'Absolutely. Pure okra mucilage is rich in natural pectins and polysaccharides that coat the hair fiber, locking out external humidity and smoothing rough cuticles to prevent frizz.'
        },
        {
          q: '5. Can I use Okra Shampoo every day?',
          a: 'Yes. Because it is completely free from harsh sulfates, parabens, and aggressive detergents, it is mild enough for daily use or whenever your hair needs washing.'
        },
        {
          q: '6. Does Okra Shampoo contain natural okra?',
          a: 'Yes, it contains cold-extracted natural Okra (Abelmoschus Esculentus) extract alongside Hibiscus and Shikakai for maximum botanical efficacy.'
        },
        {
          q: '7. Is Okra Shampoo suitable for dry hair?',
          a: 'Yes, dry and brittle hair benefits tremendously from the intense moisture-locking power of natural okra mucilage, restoring elasticity and soft movement.'
        },
        {
          q: '8. How should I use Okra Shampoo?',
          a: 'Wet hair thoroughly, apply an adequate amount to scalp and hair, massage gently into a rich lather, rinse thoroughly with clean water, and repeat if needed.'
        }
      ];

  return (
    <div className="w-full bg-white text-[#1C201D] font-sans antialiased selection:bg-[#84A338]/20">
      {/* ========================================================= */}
      {/* SECTION 1: HERO / PRODUCT SHOWCASE & PURCHASE (#F4F7EE)   */}
      {/* ========================================================= */}
      <section className="relative w-full bg-[#F4F7EE] pt-6 pb-16 lg:pb-24 overflow-hidden">
        {/* Floating Okra Pod on Far Right */}
        <div className="hidden xl:block absolute right-0 top-20 pointer-events-none select-none z-0">
          <img
            src="/figma_landing/shampoo_hero_floating_okra.png"
            alt=""
            className="w-48 lg:w-64 h-auto object-contain opacity-90"
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-normal mb-8 sm:mb-10">
            <Link to="/" className="hover:text-[#1C201D] transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#1C201D] font-medium">
              {isFacewash ? 'Okra Facewash' : 'Okra Shampoo'}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left: Showcase Container & 4 Thumbnails */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* Main White Showcase Box */}
              <div className="w-full max-w-[540px] aspect-square bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#E9ECE0] transition-all">
                <img
                  src={currentGallery[activeThumb]}
                  alt={isFacewash ? 'Hydra Glow Creamy Face Wash' : 'Nourish & Shine Okra Shampoo'}
                  className="w-full h-full object-contain drop-shadow-sm transition-all duration-300"
                />
              </div>

              {/* 4 Gallery Thumbnails Row */}
              <div className="w-full max-w-[540px] flex items-center justify-center gap-3 sm:gap-4 mt-6">
                <button
                  onClick={prevThumb}
                  className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 transition border border-gray-100 shrink-0"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto py-1">
                  {currentGallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveThumb(idx)}
                      className={`w-[70px] h-[70px] sm:w-[82px] sm:h-[82px] rounded-2xl overflow-hidden bg-white border-2 transition-all p-1.5 flex items-center justify-center shrink-0 ${
                        activeThumb === idx
                          ? 'border-[#1C201D] shadow-sm scale-105'
                          : 'border-transparent opacity-80 hover:opacity-100 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextThumb}
                  className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 transition border border-gray-100 shrink-0"
                  aria-label="Next image"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Right: Product Info, Price, Size, Add to Cart */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6 pt-2">
              {/* Eyebrow */}
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#B59059] block">
                BOTANICAL HYDRATION & REPAIR
              </span>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1C201D] leading-[1.15] tracking-tight">
                {isFacewash ? 'Hydra Glow Creamy Face Wash' : 'Nourish & Shine Okra Shampoo'}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2.5 pt-1">
                <div className="flex text-[#B59059] text-sm tracking-widest">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="text-xs font-bold text-[#1C201D]">(4.9)</span>
                <span className="text-gray-300">|</span>
                <a
                  href="#reviews"
                  className="text-xs text-gray-500 hover:text-black underline underline-offset-2 transition-colors"
                >
                  148 Verified Reviews
                </a>
              </div>

              {/* Editorial Description */}
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed max-w-xl font-normal">
                {isFacewash
                  ? 'Revitalize dull, thirsty skin with the ultimate power of Okra-infused hydration. Rich in vitamins A, C, and natural mucilage, our scientifically refined creamy formula cleanses away impurities while sealing in maximum moisture.'
                  : 'Revitalize dull, thirsty hair with the ultimate power of Okra-infused hydration. Rich in vitamins A, C, and natural mucilage, our scientifically refined formula coats your strands to seal in maximum moisture, preventing split ends while calming sensitive scalps.'}
              </p>

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3.5 pt-2">
                <span className="text-3xl sm:text-[34px] font-bold text-[#1C201D] tracking-tight">
                  ₹{priceDisplay}
                </span>
                <span className="text-base sm:text-lg text-gray-400 line-through">
                  ₹{origPriceDisplay}
                </span>
                <span className="bg-[#EBF2D8] text-[#55781E] text-[11px] font-bold px-2.5 py-0.5 rounded tracking-wide">
                  SAVE 18%
                </span>
              </div>

              {/* Size Selector */}
              <div className="pt-2 space-y-2.5">
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#1C201D] block">
                  SELECT SIZE
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedSize('250 ml')}
                    className={`px-5 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedSize === '250 ml'
                        ? 'border-[#1C201D] text-[#1C201D] bg-white shadow-sm'
                        : 'border-gray-300 text-gray-600 bg-white/60 hover:border-gray-400'
                    }`}
                  >
                    250 ml
                  </button>
                  <button
                    onClick={() => setSelectedSize('500 ml (Value Pack)')}
                    className={`px-5 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedSize === '500 ml (Value Pack)'
                        ? 'border-[#1C201D] text-[#1C201D] bg-white shadow-sm'
                        : 'border-gray-300 text-gray-600 bg-white/60 hover:border-gray-400'
                    }`}
                  >
                    500 ml (Value Pack)
                  </button>
                </div>
              </div>

              {/* Quantity & Add to Cart Row */}
              <div className="flex items-center gap-3 pt-3">
                <div className="flex items-center justify-between border border-gray-300 rounded-lg bg-white px-3 py-2.5 w-28 sm:w-32 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-gray-500 hover:text-black transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs sm:text-sm font-bold text-[#1C201D]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-gray-500 hover:text-black transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() =>
                    addToCart(
                      {
                        ...product,
                        name: isFacewash ? 'Hydra Glow Creamy Face Wash' : 'Nourish & Shine Okra Shampoo',
                        price: unitNumericPrice
                      },
                      selectedSize,
                      quantity
                    )
                  }
                  className="flex-1 bg-[#1C201D] hover:bg-[#2C332E] text-white py-3.5 px-6 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <span>
                    ADD TO CART — ₹
                    {(unitNumericPrice * quantity).toLocaleString()}
                  </span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* 3 Guarantees / Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-200/80 text-[11px] sm:text-xs text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                  <Check size={15} className="text-[#84A338] shrink-0" />
                  <span>100% Organic Extracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={15} className="text-[#84A338] shrink-0" />
                  <span>Dermatologist Tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={15} className="text-[#84A338] shrink-0" />
                  <span>Free Express Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: WHY BELONGS IN YOUR BEAUTY RITUAL (White)      */}
      {/* ========================================================= */}
      <section className="w-full bg-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading, Paragraphs & Stats */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {isFacewash ? (
                <>
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#B59059] block">
                    YOUR DAILY FRESH START
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1C201D] leading-[1.2] tracking-tight">
                    Why <span className="text-[#84A338]">a creamy cleanse</span> belongs in your beauty ritual
                  </h2>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                    Great skincare begins with a clean canvas. Meet Hydra Glow, the creamy face wash in our Okra Facewash collection, created around the simple ritual of cleansing, hydration and glow.
                  </p>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                    With hibiscus, cucumber, aloe vera and licorice extracts named on the pack, this botanical-inspired formula brings a little everyday care to your morning and evening routine.
                  </p>
                  {/* 3 Callouts */}
                  <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#84A338] block tracking-tight">
                        Cleanse
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-600 font-medium block mt-1.5 leading-tight">
                        Reported Deeper Hydration
                      </span>
                    </div>
                    <div>
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#84A338] block tracking-tight">
                        Hydrate
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-600 font-medium block mt-1.5 leading-tight">
                        Increase in Natural Shine
                      </span>
                    </div>
                    <div>
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#84A338] block tracking-tight">
                        Glow
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-600 font-medium block mt-1.5 leading-tight">
                        Moisture Lock Shield
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1C201D] leading-[1.2] tracking-tight">
                    Why <span className="text-[#84A338]">Okra</span> Belongs in Your Ultimate Beauty Ritual
                  </h2>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                    Okra is not just a nutrient-dense dietary staple—it is a botanical powerhouse for cuticle repair. When processed utilizing our clinical cold-extraction method, Okra pods release a rich, slippery mucilage packed with polysaccharides, amino acids, and antioxidant vitamins.
                  </p>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                    This natural film-forming agent wraps each hair strand in a weightless, protective barrier that seals cuticle scales flat, trapping moisture and generating an unparalleled brilliant glass-like shine without heavy chemical silicones.
                  </p>
                  {/* 3 Stats Row */}
                  <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#84A338] block tracking-tight">
                        94%
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-600 font-medium block mt-1.5 leading-tight">
                        Reported Deeper Hydration
                      </span>
                    </div>
                    <div>
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#84A338] block tracking-tight">
                        72%
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-600 font-medium block mt-1.5 leading-tight">
                        Increase in Natural Shine
                      </span>
                    </div>
                    <div>
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#84A338] block tracking-tight">
                        24H
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-600 font-medium block mt-1.5 leading-tight">
                        Moisture Lock Shield
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right Column: Model Photo Holding Product */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[460px] flex items-center justify-center">
                <img
                  src={
                    isFacewash
                      ? '/figma_landing/fw_model_hero_exact.png'
                      : '/figma_landing/shampoo_model_hero_exact.png'
                  }
                  alt={isFacewash ? 'Model holding Hydra Glow Face Wash' : 'Model holding Okra Shampoo'}
                  className="w-full h-auto object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: PRODUCT DESCRIPTION (#F4F7EE)                  */}
      {/* ========================================================= */}
      <section className="w-full bg-[#F4F7EE] py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: 3 Circular Outline Badges */}
            <div className="lg:col-span-5 flex justify-center">
              <img
                src={
                  isFacewash
                    ? '/figma_landing/fw_3_badges_exact.png'
                    : '/figma_landing/shampoo_3_badges_exact.png'
                }
                alt="Product feature badges"
                className="w-full max-w-[480px] h-auto object-contain"
              />
            </div>

            {/* Right: Rich Editorial Description */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C201D] tracking-tight">
                Product Description
              </h2>

              {isFacewash ? (
                <>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                    Experience fresh, clean, and glowing-looking skin with Adron Hydra Glow Creamy Face Wash. Enriched with the goodness of aloe vera, cucumber, and hibiscus extracts, this creamy face wash helps cleanse your skin by removing everyday dirt and impurities while leaving it feeling soft, refreshed, and hydrated.
                  </p>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                    Its gentle cleansing formula is designed for all skin types and is suitable for everyday skincare. The refreshing botanical-inspired blend makes it a great addition to your daily beauty routine, helping your skin feel clean, smooth, and comfortable after every wash.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#B59059]">
                    Nourish your hair. Restore its natural shine.
                  </h3>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                    Adron Nourish & Shine Hair Shampoo is a nature-inspired hair care formula designed to gently cleanse and nourish your hair while helping it feel softer, smoother, and healthier. Enriched with Okra, Hibiscus, and Shikakai, the shampoo combines traditional botanical ingredients with everyday hair-care needs.
                  </p>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                    Its nourishing formula helps support stronger-looking hair, improved softness, and a natural-looking shine, making it suitable for regular use across different hair types.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: PRODUCT BENEFITS (White)                       */}
      {/* ========================================================= */}
      <section className="w-full bg-white py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Benefits Bullets & 3 Circular Icons */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C201D] tracking-tight mb-2">
                  Product Benefits
                </h2>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  Key Benefits
                </span>
              </div>

              {isFacewash ? (
                <ul className="space-y-2 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Deep Cleansing:</strong> Helps remove everyday dirt, oil, and impurities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Hydration Support:</strong> Helps keep skin feeling soft and moisturized.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Aloe Vera Extracts:</strong> Help maintain a comfortable, refreshed skin feel.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Cucumber Extracts:</strong> Provide a refreshing touch to your skincare routine.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Hibiscus Extracts:</strong> Add a botanical-inspired touch to your daily cleansing ritual.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>For All Skin Types:</strong> Suitable for daily use as part of your skincare routine.</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Helps control hair fall</strong> – Supports healthier-looking, stronger hair.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Nourishes hair</strong> – Helps provide essential care to dry and stressed hair.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Adds shine</strong> – Leaves hair looking naturally glossy and vibrant.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Improves softness</strong> – Helps make hair feel smoother and more manageable.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Gentle cleansing</strong> – Cleanses away dirt, excess oil, and buildup without leaving hair feeling overly dry.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>For all hair types</strong> – Suitable for different hair textures and everyday hair-care routines.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#84A338] font-bold">•</span>
                    <span><strong>Sulfate-free & paraben-free</strong> – Formulated without sulfates and parabens.</span>
                  </li>
                </ul>
              )}

              {/* 3 Circular Benefit Icons */}
              <div className="pt-4">
                <img
                  src={
                    isFacewash
                      ? '/figma_landing/fw_benefit_icons_exact.png'
                      : '/figma_landing/shampoo_benefit_icons_exact.png'
                  }
                  alt="Product benefit icons"
                  className="w-full max-w-[480px] h-auto object-contain"
                />
              </div>
            </div>

            {/* Right: Shower / Splashing Water Model with Play Button */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[480px] rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer">
                <img
                  src={
                    isFacewash
                      ? '/figma_landing/fw_splashing_exact.png'
                      : '/figma_landing/shampoo_shower_lather_exact.png'
                  }
                  alt={isFacewash ? 'Water Splashing Application' : 'Shower Lather Application'}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: HOW TO USE & BEFORE/AFTER COMPARISON (White)   */}
      {/* ========================================================= */}
      <section className="w-full bg-white py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Scalp or Face Before / After Interactive Slider */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                ref={sliderContainerRef}
                onMouseDown={onMouseDownSlider}
                onTouchStart={onMouseDownSlider}
                className="relative w-full max-w-[520px] aspect-[620/390] rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-md border border-gray-100"
              >
                {/* AFTER image (Background layer) */}
                <img
                  src={
                    isFacewash
                      ? '/figma_landing/fw_face_after_exact.png'
                      : '/figma_landing/shampoo_scalp_after_exact.png'
                  }
                  alt="After Treatment"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* BEFORE image (Clipped foreground layer) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={
                      isFacewash
                        ? '/figma_landing/fw_face_before_exact.png'
                        : '/figma_landing/shampoo_scalp_before_exact.png'
                    }
                    alt="Before Treatment"
                    className="absolute top-0 left-0 h-full w-[520px] max-w-none object-cover"
                  />
                </div>

                {/* Badges */}
                <span className="absolute bottom-3 left-3 bg-[#2A4B23] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow z-10 pointer-events-none">
                  BEFORE
                </span>
                <span className="absolute bottom-3 right-3 bg-[#2A4B23] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow z-10 pointer-events-none">
                  AFTER
                </span>

                {/* Vertical Divider line & Circular Draggable Handle */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)] z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-[10px] font-bold text-gray-700 border border-gray-200">
                    ◀▶
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Step-by-Step Instructions */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C201D] uppercase tracking-wide">
                HOW TO USE
              </h2>

              {isFacewash ? (
                <div className="space-y-4 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-[#1C201D]">Step 1: Wet :</strong> Start with clean hands and wet your face with lukewarm water.
                  </p>
                  <p>
                    <strong className="text-[#1C201D]">Step 2: Cleanse :</strong> Apply a small amount. Gently massage over your face, avoiding the eye area.
                  </p>
                  <p>
                    <strong className="text-[#1C201D]">Step 3: Rinse :</strong> Rinse thoroughly with water and pat dry with a soft towel.
                  </p>
                  <p>
                    <strong className="text-[#1C201D]">Step 4: Replenish :</strong> Rinse thoroughly with clean water.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-[#1C201D]">Step 1:</strong> Wet your hair thoroughly with water.
                  </p>
                  <p>
                    <strong className="text-[#1C201D]">Step 2:</strong> Apply an adequate amount of shampoo to your scalp and hair.
                  </p>
                  <p>
                    <strong className="text-[#1C201D]">Step 3:</strong> Gently massage into the scalp and hair to create a rich lather.
                  </p>
                  <p>
                    <strong className="text-[#1C201D]">Step 4:</strong> Rinse thoroughly with clean water.
                  </p>
                  <p>
                    <strong className="text-[#1C201D]">Step 5:</strong> Repeat if needed and follow with your preferred conditioner.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: KEY INGREDIENTS & TEST TUBES (White)           */}
      {/* ========================================================= */}
      <section className="w-full bg-white py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Ingredients Details & Full List */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C201D] tracking-tight">
                Key Ingredients
              </h2>

              {isFacewash ? (
                <div className="space-y-4 text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-[#1C201D] text-sm mb-1">Hibiscus</h4>
                    <p>A floral botanical featured in the Hydra Glow blend.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1C201D] text-sm mb-1">Cucumber</h4>
                    <p>A fresh botanical companion to your cleansing ritual.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1C201D] text-sm mb-1">Aloe vera</h4>
                    <p>A familiar botanical in hydration-focused skincare.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1C201D] text-sm mb-1">Licorice</h4>
                    <p>A plant extract named alongside the other botanicals on pack.</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-bold text-[#1C201D] text-sm mb-1">Full Ingredient List</h4>
                    <p className="text-gray-500 font-medium">
                      The complete INCI list is pending. Please check the product label for the final ingredients and any allergens before use.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-[#1C201D] text-sm mb-1">Okra</h4>
                    <p>
                      A nutrient-rich botanical known for its conditioning properties, helping to
                      nourish hair and leave it feeling softer, smoother, and more manageable.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1C201D] text-sm mb-1">Hibiscus</h4>
                    <p>
                      A flower traditionally used in hair care, known for helping support
                      healthy-looking hair while enhancing softness and natural shine.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1C201D] text-sm mb-1">Shikakai</h4>
                    <p>
                      A traditional Ayurvedic ingredient that gently cleanses the scalp and hair while
                      helping maintain smoothness and manageability.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-bold text-[#1C201D] text-sm mb-1">Full Ingredient List</h4>
                    <p className="text-gray-500 font-medium">
                      Okra • Hibiscus • Shikakai • Aqua / Water • Cleansing Agents • Conditioning
                      Agents • Fragrance / Parfum
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: 3 Botanical Laboratory Test Tubes Graphic */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[500px]">
                <img
                  src="/figma_landing/shampoo_test_tubes_exact.png"
                  alt="Hyaluronic Acid, Okra Extract, Okra Seed Oil in Test Tubes"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (White)             */}
      {/* ========================================================= */}
      <section className="w-full bg-white py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C201D] text-center mb-10 tracking-tight">
            Frequency Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1C201D] hover:text-[#84A338] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-gray-400 font-normal text-lg shrink-0">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8: CUSTOMER REVIEWS (White)                       */}
      {/* ========================================================= */}
      <section id="reviews" className="w-full bg-white py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C201D] text-center mb-12 tracking-tight">
            Customer Reviews
          </h2>

          {/* 3-Column Review Overview matching Figma */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-gray-200">
            {/* Left: Star Breakdown Bars */}
            <div className="md:col-span-4 space-y-2.5 text-xs">
              {[
                { star: '5 Star', count: '568', pct: '85%' },
                { star: '4 Star', count: '423', pct: '65%' },
                { star: '3 Star', count: '102', pct: '25%' },
                { star: '2 Star', count: '86', pct: '15%' },
                { star: '1 Star', count: '75', pct: '10%' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-12 text-gray-700 font-medium">{item.star}</span>
                  <span className="text-[#B59059] text-xs">☆</span>
                  <div className="flex-1 h-2 bg-[#F4F6EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#84A338] rounded-full transition-all duration-500"
                      style={{ width: item.pct }}
                    />
                  </div>
                  <span className="w-8 text-right text-gray-500 font-medium">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Center: Customer Find this product best for */}
            <div className="md:col-span-4 text-center px-4 md:border-l md:border-r border-gray-200">
              <span className="text-xs font-semibold text-gray-700 block mb-3">
                Customer Find this product best for
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Straight Hair',
                  'Color Treated Hair',
                  'Natural Textured Hair',
                  'Dry Hair',
                  'Damaged Hair'
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#F4F7EE] text-gray-700 text-[11px] font-medium px-3.5 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: (4.9) Out Of 5 and Write a review button */}
            <div className="md:col-span-4 text-center space-y-3">
              <div className="flex justify-center text-[#B59059] text-xl tracking-widest">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
              </div>
              <div className="text-3xl font-bold text-[#1C201D]">
                (4.9) <span className="text-base font-normal text-gray-500">Out Of 5</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Average rating includes incentivized reviews.
              </p>
              <div>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="inline-flex items-center gap-2 border border-[#1C201D] text-[#1C201D] hover:bg-[#1C201D] hover:text-white px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span>Write a review</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Optional Inline Review Form */}
          {showReviewForm && (
            <div className="max-w-xl mx-auto my-8 p-6 bg-[#F4F7EE] rounded-2xl border border-gray-200 transition-all">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm text-[#1C201D]">Write Your Review</h4>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-400 hover:text-black"
                >
                  <X size={18} />
                </button>
              </div>

              {reviewSubmitted ? (
                <div className="p-4 bg-white text-[#84A338] text-center rounded-xl text-xs font-bold">
                  ✓ Thank you! Your review has been added.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Radhika P."
                      className="w-full bg-white border border-gray-200 rounded-lg p-2.5 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full bg-white border border-gray-200 rounded-lg p-2.5 outline-none"
                    >
                      <option value="5">★★★★★ (5 Stars - Outstanding)</option>
                      <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                      <option value="3">★★★☆☆ (3 Stars - Average)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Your Review</label>
                    <textarea
                      required
                      rows="3"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder={isFacewash ? "Share your experience with Okra Facewash..." : "Share your experience with Okra Shampoo..."}
                      className="w-full bg-white border border-gray-200 rounded-lg p-2.5 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#1C201D] text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-black transition"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Existing Verified Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1C201D]">{rev.author}</span>
                  <span className="text-[10px] text-gray-400">{rev.date}</span>
                </div>
                <div className="flex text-[#B59059] text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < rev.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                <h5 className="font-semibold text-xs text-[#1C201D]">{rev.title}</h5>
                <p className="text-[11px] text-gray-600 leading-relaxed font-normal">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9: EXPLORE RELATED ARTICLES (#FAF7F2)             */}
      {/* ========================================================= */}
      <section className="relative w-full bg-[#FAF7F2] py-20 lg:py-28 overflow-hidden">
        {/* Floating Okra Pod on Bottom Left */}
        <div className="hidden xl:block absolute left-0 bottom-4 pointer-events-none select-none z-0">
          <img
            src="/figma_landing/shampoo_sec9_okra.png"
            alt=""
            className="w-48 lg:w-56 h-auto object-contain opacity-90"
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C201D] text-center mb-12 tracking-tight">
            <span className="text-[#84A338]">Explore</span> Related Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                img: '/figma_landing/shampoo_art_1.png',
                title: "Rose Water in Your Skincare Routine: 7 Ways You're Probably Not Using It",
                desc: "You've probably got a bottle of rose water sitting on your shelf, dutifully used as a toner after cleansing. But here..."
              },
              {
                img: '/figma_landing/shampoo_art_2.png',
                title: "Rose Water in Your Skincare Routine: 7 Ways You're Probably Not Using It",
                desc: "You've probably got a bottle of rose water sitting on your shelf, dutifully used as a toner after cleansing. But here..."
              },
              {
                img: '/figma_landing/shampoo_art_3.png',
                title: "Rose Water in Your Skincare Routine: 7 Ways You're Probably Not Using It",
                desc: "You've probably got a bottle of rose water sitting on your shelf, dutifully used as a toner after cleansing. But here..."
              }
            ].map((art, idx) => (
              <div
                key={idx}
                className="bg-transparent flex flex-col group cursor-pointer space-y-3"
              >
                <div className="w-full aspect-[406/332] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[#1C201D] leading-snug group-hover:text-[#84A338] transition-colors">
                  {art.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                  {art.desc}
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#84A338] hover:underline">
                    <span>Read More</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Navigation Dots / Arrows */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 transition border border-gray-100"
              aria-label="Previous article"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 transition border border-gray-100"
              aria-label="Next article"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10: ADRONGLOW INSTAGRAM GRID (White)              */}
      {/* ========================================================= */}
      <section className="w-full bg-white py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C201D] text-center mb-10 tracking-tight">
            Adron<span className="text-[#84A338]">Glow</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
            {[
              '/figma_landing/shampoo_ig_1.png',
              '/figma_landing/shampoo_ig_2.png',
              '/figma_landing/shampoo_ig_3.png',
              '/figma_landing/shampoo_ig_4.png',
              '/figma_landing/shampoo_ig_5.png',
              '/figma_landing/shampoo_ig_6.png'
            ].map((img, idx) => (
              <a
                key={idx}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 block group shadow-sm"
              >
                <img
                  src={img}
                  alt={`Instagram Post ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#1C201D] text-[#1C201D] hover:bg-[#1C201D] hover:text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>FOLLOW @ADRON_SKINCARE</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
