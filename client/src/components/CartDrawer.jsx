import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart
  } = useShop();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E5E0D4]">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E4DA] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#153323]" />
              <h3 className="font-serif text-lg font-bold text-[#153323]">
                Your Shopping Bag ({cartCount})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#EAF1E8] px-5 py-3 border-b border-[#D8E4D5]">
            <div className="flex justify-between text-xs font-semibold text-[#153323] mb-1.5">
              <span>
                {remainingForFreeShipping === 0
                  ? "🎉 You've unlocked FREE Shipping!"
                  : `Add $${remainingForFreeShipping.toFixed(2)} more for FREE Shipping`}
              </span>
              <span>{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-[#C8DAC4] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#153323] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EAE6DC] flex items-center justify-center text-gray-400">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#153323]">Your bag is empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Experience the ultra-nourishing power of Okra botanicals for your hair and skin.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-[#153323] text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-[#204b34] transition"
                >
                  Explore Best Sellers
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="bg-white p-3.5 rounded-xl border border-[#E8E4DA] flex gap-3.5 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg bg-gray-50"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-bold text-[#153323] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.size)}
                          className="text-gray-400 hover:text-red-600 transition p-0.5"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#799A70] font-semibold block mt-0.5">
                        Size: {item.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, -1)}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded-l-lg transition"
                          title="Decrease"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, 1)}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded-r-lg transition"
                          title="Increase"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#153323]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E8E4DA] space-y-3.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-[#153323] text-base">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Taxes and coupon discounts calculated at checkout.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full bg-[#153323] hover:bg-[#204b34] text-white text-sm font-semibold py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full bg-[#EAF1E8] hover:bg-[#D9E6D6] text-[#153323] text-xs font-semibold py-2.5 rounded-xl transition text-center"
                >
                  View Full Cart Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
