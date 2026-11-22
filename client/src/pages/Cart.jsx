import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Cart() {
  const { cart, cartSubtotal, updateQuantity, removeFromCart, clearCart } = useShop();
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (coupon.trim().toUpperCase() === 'ADRON15') {
      const disc = +(cartSubtotal * 0.15).toFixed(2);
      setAppliedDiscount(disc);
      setCouponSuccess('Coupon ADRON15 applied! You saved 15%.');
    } else if (coupon.trim().toUpperCase() === 'FIRST10') {
      const disc = +(cartSubtotal * 0.10).toFixed(2);
      setAppliedDiscount(disc);
      setCouponSuccess('Coupon FIRST10 applied! You saved 10%.');
    } else {
      setCouponError('Invalid promo code. Try "ADRON15"');
    }
  };

  const freeShippingThreshold = 50;
  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 5.00;
  const tax = +((cartSubtotal - appliedDiscount) * 0.08).toFixed(2);
  const finalTotal = +(cartSubtotal - appliedDiscount + shipping + tax).toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#EAE6DC] flex items-center justify-center text-gray-400">
          <ShoppingBag size={32} />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#153323]">Your Bag Is Empty</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          You haven't added any Okra botanical formulations to your bag yet.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#153323] text-white text-sm font-semibold px-8 py-3.5 rounded-xl hover:bg-[#204b34] transition shadow-md"
        >
          Browse Best Sellers <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="border-b border-[#E8E4DA] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">Review Order</span>
          <h1 className="font-serif text-3xl font-bold text-[#153323]">Shopping Bag ({cart.length} items)</h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:underline font-semibold"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Alert */}
          <div className="bg-[#EAF1E8] p-4 rounded-2xl border border-[#CDE0CB] flex items-center justify-between text-xs font-semibold text-[#153323]">
            <span>
              {remainingForFree === 0
                ? "🎉 You qualified for FREE Standard Shipping!"
                : `Add $${remainingForFree.toFixed(2)} more to unlock FREE Shipping!`}
            </span>
            <span className="bg-[#153323] text-white text-[10px] px-2.5 py-1 rounded-full font-bold">
              ${freeShippingThreshold}+ Tier
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E4DA] overflow-hidden divide-y divide-gray-100 shadow-sm">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-gray-50 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#799A70]">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#153323]">
                      <Link to={`/product/${item.productId}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                    <span className="text-xs text-gray-500">Size: {item.size}</span>
                    <div className="sm:hidden font-bold text-sm text-[#153323] mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* Quantity adjustment */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, -1)}
                      className="p-1.5 text-gray-600 hover:bg-gray-200 rounded-l-xl transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-xs font-bold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, 1)}
                      className="p-1.5 text-gray-600 hover:bg-gray-200 rounded-r-xl transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="hidden sm:block text-right">
                    <span className="font-serif text-base font-bold text-[#153323] block">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      ${item.price.toFixed(2)} each
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="text-gray-400 hover:text-red-600 p-2 transition"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs">
            <Link to="/shop" className="text-[#153323] font-semibold hover:underline flex items-center gap-1">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#153323] border-b border-gray-100 pb-3">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="e.g. ADRON15"
                  className="flex-1 bg-[#FAF8F5] border border-gray-200 text-xs px-3 py-2 rounded-xl uppercase outline-none focus:border-[#153323]"
                />
                <button
                  type="submit"
                  className="bg-[#153323] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#204b34] transition"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-[#799A70] font-semibold">{couponSuccess}</p>}
            </form>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">${cartSubtotal.toFixed(2)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#799A70] font-semibold">
                  <span>Discount</span>
                  <span>-${appliedDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="text-[#799A70]">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-gray-200 text-base font-bold text-[#153323]">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#153323] hover:bg-[#204b34] text-white text-sm font-semibold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={17} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2">
              <ShieldCheck size={14} className="text-[#799A70]" />
              <span>Safe & Secure 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
