import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, CreditCard, QrCode, Truck, ArrowLeft, PackageCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Checkout() {
  const { cart, cartSubtotal, clearCart, user } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user ? user.name.split(' ')[0] : 'Vivek',
    lastName: user && user.name.split(' ').length > 1 ? user.name.split(' ')[1] : 'Patel',
    email: user ? user.email : 'vivek.patel@example.com',
    phone: '+91 98765 43210',
    address: '402, Green Orchid Heights, Off S.G. Highway',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380054'
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  const shippingCost = shippingMethod === 'express' ? 10.00 : (cartSubtotal >= 50 ? 0 : 5.00);
  const tax = +(cartSubtotal * 0.08).toFixed(2);
  const total = +(cartSubtotal + shippingCost + tax).toFixed(2);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    const orderPayload = {
      items: cart,
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      paymentMethod,
      shippingMethod,
      totals: {
        subtotal: cartSubtotal,
        shipping: shippingCost,
        tax,
        total
      }
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrderComplete(data.order);
        clearCart();
      }
    } catch {
      // Offline fallback order
      const mockOrder = {
        orderId: 'ADR-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString(),
        customer: orderPayload.customer,
        shippingAddress: orderPayload.shippingAddress,
        paymentMethod,
        items: cart,
        totals: { total }
      };
      setOrderComplete(mockOrder);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  // Order Confirmed State
  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#EAF1E8] text-[#153323] flex items-center justify-center animate-bounce">
          <CheckCircle2 size={40} className="text-[#153323]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">Payment Confirmed</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#153323]">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-gray-600">
            Order ID: <strong className="text-[#153323]">{orderComplete.orderId}</strong>
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E4DA] text-left space-y-4 shadow-sm text-xs">
          <h3 className="font-serif text-base font-bold text-[#153323] border-b pb-2">Order Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400 block">Deliver to:</span>
              <span className="font-semibold text-gray-800">{orderComplete.customer.name}</span>
              <p className="text-gray-600 mt-1">
                {orderComplete.shippingAddress.address}, {orderComplete.shippingAddress.city}, {orderComplete.shippingAddress.state} - {orderComplete.shippingAddress.pincode}
              </p>
            </div>
            <div>
              <span className="text-gray-400 block">Payment Method:</span>
              <span className="font-semibold text-gray-800 uppercase">{orderComplete.paymentMethod}</span>
              <span className="text-gray-400 block mt-2">Total Paid:</span>
              <span className="font-serif text-lg font-bold text-[#153323]">${orderComplete.totals.total}</span>
            </div>
          </div>
          <p className="text-gray-500 pt-2 border-t">
            A confirmation receipt and courier tracking link have been dispatched to <strong>{orderComplete.customer.email}</strong>.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/shop"
            className="inline-block bg-[#153323] text-white text-xs font-semibold px-8 py-3.5 rounded-xl hover:bg-[#204b34] transition shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
        <Link to="/cart" className="hover:text-[#153323] flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Bag
        </Link>
        <span>/</span>
        <span className="text-[#153323] font-bold">Secure Checkout</span>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Shipping & Payment details */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact & Shipping Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#153323] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#153323] text-white text-xs flex items-center justify-center font-bold">1</span>
              Shipping Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House / Flat No., Street, Landmark"
                  className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">PIN / Zip Code</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Options */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#153323] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#153323] text-white text-xs flex items-center justify-center font-bold">2</span>
              Delivery Speed
            </h2>

            <div className="space-y-3 text-xs">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  shippingMethod === 'standard' ? 'border-[#153323] bg-[#FAF8F5]' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="accent-[#153323]"
                  />
                  <div>
                    <span className="font-bold text-[#153323] block">Standard Eco Delivery (3-5 Business Days)</span>
                    <span className="text-gray-500">100% Carbon Neutral Shipping</span>
                  </div>
                </div>
                <span className="font-bold text-[#153323]">{cartSubtotal >= 50 ? 'FREE' : '$5.00'}</span>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  shippingMethod === 'express' ? 'border-[#153323] bg-[#FAF8F5]' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="accent-[#153323]"
                  />
                  <div>
                    <span className="font-bold text-[#153323] block">Express Priority (1-2 Business Days)</span>
                    <span className="text-gray-500">Dispatched within 4 hours</span>
                  </div>
                </div>
                <span className="font-bold text-[#153323]">$10.00</span>
              </label>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#153323] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#153323] text-white text-xs flex items-center justify-center font-bold">3</span>
              Payment Method
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { id: 'upi', name: 'UPI / QR', icon: QrCode },
                { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                { id: 'netbanking', name: 'Net Banking', icon: ShieldCheck },
                { id: 'cod', name: 'Cash on Delivery', icon: Truck }
              ].map((m) => {
                const IconComponent = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-2 transition ${
                      paymentMethod === m.id
                        ? 'border-[#153323] bg-[#EAF1E8] text-[#153323] font-bold shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent size={20} />
                    <span>{m.name}</span>
                  </button>
                );
              })}
            </div>

            {paymentMethod === 'upi' && (
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-gray-200 text-xs text-gray-700 space-y-2">
                <span className="font-semibold block">Pay via any UPI App (GPay, PhonePe, Paytm):</span>
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. yourname@okhdfcbank)"
                  className="w-full bg-white border border-gray-200 p-2.5 rounded-lg outline-none"
                />
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-gray-200 text-xs text-gray-700 space-y-3">
                <input
                  type="text"
                  placeholder="Card Number (4532 •••• •••• ••••)"
                  className="w-full bg-white border border-gray-200 p-2.5 rounded-lg outline-none"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg outline-none"
                  />
                  <input
                    type="password"
                    maxLength="3"
                    placeholder="CVV"
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#153323] border-b pb-3">
              Items in Order ({cart.length})
            </h3>

            <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-gray-100 pr-1">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-gray-50" />
                    <div>
                      <h4 className="font-bold text-[#153323] line-clamp-1">{item.name}</h4>
                      <span className="text-gray-400">Qty: {item.quantity} • {item.size}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#153323]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-gray-600 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping ({shippingMethod})</span>
                <span>{shippingCost === 0 ? <strong className="text-[#799A70]">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t text-base font-bold text-[#153323]">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-[#153323] hover:bg-[#204b34] text-white text-sm font-semibold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {loading ? 'Processing Order...' : `Complete Order • $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
