import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const fallbackProducts = [
  {
    id: "okra-shampoo",
    name: "Smooth & Shine Okra Shampoo",
    category: "Hair Care",
    price: 28.00,
    originalPrice: 34.00,
    rating: 4.9,
    reviewsCount: 240,
    isBestseller: true,
    isNew: false,
    badge: "Best Seller",
    sizes: ["250ml", "500ml"],
    image: "/figma_landing/shampoo_showcase_exact.png",
    gallery: [
      "/figma_landing/shampoo_showcase_exact.png",
      "/figma_landing/shampoo_thumb_2.png",
      "/figma_landing/shampoo_thumb_3.png",
      "/figma_landing/shampoo_thumb_4.png"
    ],
    description: "An intensively nourishing botanical shampoo infused with pure Okra fruit mucilage extract. Packed with natural amino acids, vitamins A and C, and essential minerals to smooth cuticles and lock in shine.",
    benefits: [
      "Natural mucilage creates a silky slip that detangles without weight",
      "Controls humidity-induced frizz and seals hair cuticles",
      "Fortified with Biotin and Pro-Vitamin B5 for scalp resilience",
      "Color-safe, sulfate-free, silicone-free, and 100% vegan"
    ],
    ingredients: "Aqua, Abelmoschus Esculentus (Okra) Fruit Extract, Sodium Cocoyl Isethionate, Aloe Vera Juice, Biotin, Argan Oil, Panthenol, Rosemary Extract, Citric Acid.",
    howToUse: "Apply generously to wet hair. Massage into scalp and glide through lengths. Rinse thoroughly with cool water."
  },
  {
    id: "okra-facewash",
    name: "Gentle Foaming Okra Face Wash",
    category: "Skin Care",
    price: 22.00,
    originalPrice: 28.00,
    rating: 4.8,
    reviewsCount: 185,
    isBestseller: true,
    isNew: false,
    badge: "Popular",
    sizes: ["150ml", "300ml"],
    image: "/figma_landing/facewash_showcase_exact.png",
    gallery: [
      "/figma_landing/facewash_showcase_exact.png",
      "/figma_landing/facewash_thumb_2.png",
      "/figma_landing/facewash_thumb_3.png",
      "/figma_landing/facewash_thumb_4.png"
    ],
    description: "A cloud-soft daily foaming facial cleanser powered by antioxidant-rich Okra extract and Green Tea. Dissolves impurities while preserving the skin barrier.",
    benefits: [
      "Leaves skin feeling hydrated and plump, never stripped",
      "Rich in natural Vitamin C and bioflavonoids",
      "Balances sensitive and combination skin types"
    ],
    ingredients: "Aqua, Okra Extract, Glycerin, Green Tea Leaf Water, Decyl Glucoside, Sodium Hyaluronate, Centella Asiatica, Allantoin.",
    howToUse: "Pump 1-2 puffs onto damp palms. Gently massage in circular motions for 60 seconds, then rinse with lukewarm water."
  },
  {
    id: "okra-serum",
    name: "Okra Boost Glow Serum",
    category: "Skin Care",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 310,
    isBestseller: true,
    isNew: true,
    badge: "Best Seller",
    sizes: ["30ml", "50ml"],
    image: "/figma_landing/serum_showcase_exact.png",
    gallery: [
      "/figma_landing/serum_showcase_exact.png",
      "/figma_landing/serum_thumb_2.png",
      "/figma_landing/serum_thumb_3.png",
      "/figma_landing/serum_thumb_4.png"
    ],
    description: "A featherlight, nutrient-dense face serum powered by organic cold-pressed Okra mucilage extract. Enriched with natural hyaluronic acid, cucumber water, and licorice root to plump, brighten, and restore a luminous glass-skin glow.",
    benefits: [
      "Locks in deep cellular hydration for up to 72 hours without greasy heaviness",
      "Visibly refines pore texture and balances natural oil production",
      "Fades dark spots and promotes a brighter, more uniform skin complexion"
    ],
    ingredients: "Aqua, Abelmoschus Esculentus (Okra) Fruit Extract, Cucumis Sativus (Cucumber) Water, Glycyrrhiza Glabra (Licorice) Root Extract, Sodium Hyaluronate, Niacinamide, Glycerin, Panthenol, Allantoin.",
    howToUse: "Dispense 3-4 drops morning and night on clean skin. Gently press into face and follow with moisturizer."
  },
  {
    id: "okra-hair-mask",
    name: "Deep Moisture Okra Hair Mask",
    category: "Hair Care",
    price: 32.00,
    originalPrice: 38.00,
    rating: 4.9,
    reviewsCount: 192,
    isBestseller: true,
    isNew: false,
    badge: "Intense Care",
    sizes: ["200ml", "400ml"],
    image: "/figma_landing/prod_mask.png",
    gallery: [
      "/figma_landing/prod_mask.png"
    ],
    description: "A buttery botanical treatment mask designed for dry or heat-damaged strands. High-viscosity okra extract wraps each follicle in restorative hydration.",
    benefits: [
      "Deeply reconstructs cuticles and repairs split ends",
      "Provides 72-hour humidity protection",
      "Restores bounce and curl definition"
    ],
    ingredients: "Aqua, Okra Fruit Extract, Cetearyl Alcohol, Shea Butter, Avocado Oil, Hydrolyzed Keratin, Citric Acid.",
    howToUse: "Apply generously to clean, wet hair from mid-lengths to ends. Leave on for 10-15 minutes, then rinse thoroughly."
  },
  {
    id: "okra-body-lotion",
    name: "Silky Botanical Okra Body Lotion",
    category: "Body Care",
    price: 26.00,
    originalPrice: 30.00,
    rating: 4.7,
    reviewsCount: 142,
    isBestseller: false,
    isNew: true,
    badge: "New Arrival",
    sizes: ["250ml"],
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Velvety all-over body hydrator infused with cold-pressed Okra mucilage and Shea butter to soothe dry skin with zero grease.",
    benefits: [
      "24-hour long-lasting skin barrier hydration",
      "Subtle botanical scent of green fig and eucalyptus",
      "Fast-absorbing formula"
    ],
    ingredients: "Aqua, Okra Extract, Caprylic/Capric Triglyceride, Shea Butter, Squalane, Jojoba Oil, Vitamin E.",
    howToUse: "Massage all over body post-shower for supple, radiant skin."
  },
  {
    id: "okra-scalp-oil",
    name: "Revitalizing Okra & Rosemary Scalp Oil",
    category: "Hair Care",
    price: 30.00,
    originalPrice: 36.00,
    rating: 4.8,
    reviewsCount: 115,
    isBestseller: false,
    isNew: true,
    badge: "Scalp Therapy",
    sizes: ["60ml"],
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Potent scalp oil formulation combining cold-pressed Okra seed oil with antioxidant Rosemary leaf oil to stimulate healthy follicle growth.",
    benefits: [
      "Soothes itchy scalp and prevents dryness flakes",
      "Stimulates microcirculation at hair roots",
      "Non-comedogenic and easy to wash out"
    ],
    ingredients: "Sunflower Seed Oil, Okra Seed Oil, Rosemary Leaf Oil, Castor Seed Oil, Peppermint Oil, Tocopherol.",
    howToUse: "Part hair into sections, apply directly to scalp, and massage gently for 5 minutes. Leave on for 30 minutes before washing."
  }
];

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('adron_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('adron_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('adron_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Fetch live products from backend
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.products?.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {
        // Keeps fallbackProducts
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('adron_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('adron_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product, size = null, quantity = 1) => {
    const chosenSize = size || (product.sizes ? product.sizes[0] : 'Standard');
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id && item.size === chosenSize);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id && item.size === chosenSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: chosenSize,
          category: product.category,
          quantity
        }
      ];
    });
    showToast(`Added "${product.name}" (${chosenSize}) to cart`);
  };

  const updateQuantity = (productId, size, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.productId === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.size === size)));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from favorites`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to favorites`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('adron_user', JSON.stringify(userData));
    showToast(`Welcome back, ${userData.name}!`);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('adron_user');
    showToast('Logged out successfully');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        loading,
        cart,
        cartCount,
        cartSubtotal,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toastMessage,
        showToast,
        user,
        loginUser,
        logoutUser
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14281D] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in border border-[#799a70]/40 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-[#799a70] animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
