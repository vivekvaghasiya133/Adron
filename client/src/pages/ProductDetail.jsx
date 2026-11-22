import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Plus, Minus, ShieldCheck, Leaf, Sparkles, Check, ArrowRight, MessageSquare, ChevronRight } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('description');
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
    // Fetch live product reviews
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.product) {
          setProduct(data.product);
          if (data.product.reviews) {
            setReviewsList(data.product.reviews);
          }
        }
      })
      .catch(() => {
        // fallback reviews
      });
  }, [id, products]);

  const isFav = isInWishlist(product.id);

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
      // Local fallback addition
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
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

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-[#F6F4ED] border border-[#E8E4DA] relative shadow-md">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
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
              <Heart size={20} className={isFav ? "fill-[#C24B4B] text-[#C24B4B]" : ""} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img ? 'border-[#153323] ring-2 ring-[#799A70]/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#799A70] block mb-1">
              {product.category} • Okra Infusion
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#153323] leading-tight">
              {product.name}
            </h1>

            {/* Ratings & reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-[#DDA743]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? "fill-[#DDA743]" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#153323]">
                {product.rating} ({product.reviewsCount || 240} Verified Reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-2 border-b border-gray-200">
            <span className="text-3xl font-serif font-bold text-[#153323]">
              ${Number(product.price).toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-base text-gray-400 line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
                <span className="text-xs font-bold bg-[#EAF1E8] text-[#153323] px-2 py-0.5 rounded-full">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Key Benefits Bulletpoints */}
          {product.benefits && (
            <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E4DA]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#153323] block mb-1">
                Clinical Key Benefits:
              </span>
              {product.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                  <Check size={14} className="text-[#799A70] shrink-0 mt-0.5 font-bold" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          )}

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

          {/* Quantity & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between border border-gray-300 rounded-xl bg-white px-3 py-2 w-full sm:w-36">
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

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="flex-1 bg-[#153323] hover:bg-[#204b34] text-white text-sm font-semibold py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                Add {quantity} to Bag • ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={() => {
                addToCart(product, selectedSize, quantity);
                navigate('/checkout');
              }}
              className="w-full bg-[#EAF1E8] hover:bg-[#D9E6D6] text-[#153323] text-sm font-bold py-3 rounded-xl transition border border-[#799A70]/40"
            >
              Instant Buy Now
            </button>
          </div>

          {/* Guarantees Box */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 text-center text-[11px] text-gray-500">
            <div className="flex flex-col items-center gap-1">
              <Leaf size={16} className="text-[#799A70]" />
              <span>100% Vegan</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={16} className="text-[#799A70]" />
              <span>Derm Tested</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Sparkles size={16} className="text-[#799A70]" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, How to Use, Ingredients, Reviews */}
      <div className="bg-white rounded-3xl border border-[#E8E4DA] p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex border-b border-gray-200 overflow-x-auto gap-4 sm:gap-8">
          {[
            { id: 'description', label: 'Product Details' },
            { id: 'howtouse', label: 'How to Use' },
            { id: 'ingredients', label: 'Full Ingredients' },
            { id: 'reviews', label: `Reviews (${reviewsList.length + 2})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold tracking-wide transition border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#153323] text-[#153323]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="text-sm text-gray-600 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-serif text-xl font-bold text-[#153323]">
                The Power of Botanical Okra Hydration
              </h3>
              <p>{product.description}</p>
              <p>
                Our proprietary extraction technique separates the high-molecular-weight polysaccharides from fresh organic okra pods at sub-zero temperatures. This ensures the fragile botanical enzymes and natural antioxidants remain potent and intact.
              </p>
            </div>
          )}

          {activeTab === 'howtouse' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-serif text-xl font-bold text-[#153323]">
                Application Ritual
              </h3>
              <p className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E4DA] text-gray-800">
                {product.howToUse || "Apply evenly to damp or clean skin/hair. Massage gently in circular motions until completely absorbed. Use daily for cumulative botanical benefits."}
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-serif text-xl font-bold text-[#153323]">
                Clean Formulation Standard
              </h3>
              <p className="font-mono text-xs text-gray-700 bg-gray-50 p-5 rounded-2xl border border-gray-200 leading-loose">
                {product.ingredients || "Abelmoschus Esculentus (Okra) Fruit Extract, Aqua, Aloe Barbadensis Leaf Juice, Biotin, Niacinamide, Sodium Hyaluronate, Tocopherol."}
              </p>
              <div className="flex gap-4 pt-2">
                <Link to="/ingredients" className="text-xs font-bold text-[#153323] underline">
                  Learn more in our Ingredients Encyclopedia →
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Reviews Summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E4DA]">
                <div className="md:col-span-4 text-center md:text-left space-y-1">
                  <span className="font-serif text-4xl font-bold text-[#153323]">{product.rating}</span>
                  <div className="flex justify-center md:justify-start text-[#DDA743]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-[#DDA743]" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 block">Based on 240+ verified ratings</span>
                </div>
                <div className="md:col-span-8 space-y-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-gray-500">5 Stars</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#153323] h-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="w-8 text-right font-semibold">92%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-gray-500">4 Stars</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#153323] h-full" style={{ width: '8%' }}></div>
                    </div>
                    <span className="w-8 text-right font-semibold">8%</span>
                  </div>
                </div>
              </div>

              {/* Review Submission Form */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
                <h4 className="font-serif text-base font-bold text-[#153323]">
                  Write a Review for {product.name}
                </h4>

                {reviewSubmitted ? (
                  <div className="p-4 bg-[#EAF1E8] text-[#153323] rounded-xl text-xs font-semibold">
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
                          placeholder="e.g. Priya M."
                          className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-lg outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Rating</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-lg outline-none"
                        >
                          <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                          <option value="4">★★★★☆ (4 Stars - Great)</option>
                          <option value="3">★★★☆☆ (3 Stars - Average)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">Review</label>
                      <textarea
                        required
                        rows="3"
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Share your experience with this formulation..."
                        className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-lg outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#153323] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#204b34] transition"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 sm:p-5 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DA] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#153323] text-sm">{rev.author}</span>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex text-[#DDA743]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < rev.rating ? "fill-[#DDA743]" : "text-gray-300"} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* You May Also Like / Related Formulations */}
      <div className="space-y-6 pt-4">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">Complete The Ritual</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#153323]">You May Also Like</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
