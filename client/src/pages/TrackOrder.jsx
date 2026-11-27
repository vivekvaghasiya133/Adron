import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [searched, setSearched] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId) return;

    // Simulated responsive order tracking
    setOrderData({
      id: orderId.toUpperCase().startsWith('ADR-') ? orderId.toUpperCase() : `ADR-${orderId.toUpperCase()}`,
      placedDate: 'November 25, 2026',
      expectedDelivery: 'November 29, 2026',
      status: 'In Transit',
      carrier: 'BlueDart Express',
      awb: 'BLUEDART-8492019402',
      destination: 'Ahmedabad, Gujarat',
      items: [
        { name: 'Nourish & Shine Okra Shampoo (250 ml)', qty: 1, price: '₹1,299' },
        { name: 'Okra Boost Glow Serum (30 ml)', qty: 1, price: '₹1,299' }
      ],
      steps: [
        { title: 'Order Confirmed & Paid', date: 'Nov 25, 10:14 AM', completed: true },
        { title: 'Freshly Formulated & Packed in Eco-Box', date: 'Nov 25, 04:30 PM', completed: true },
        { title: 'Handed Over to BlueDart Courier (Surat Hub)', date: 'Nov 26, 09:00 AM', completed: true },
        { title: 'In Transit to Destination Delivery Hub', date: 'Nov 27, 08:45 AM', completed: true, current: true },
        { title: 'Out for Delivery to Your Doorstep', date: 'Expected Nov 28', completed: false },
        { title: 'Delivered', date: 'Expected Nov 29', completed: false }
      ]
    });
    setSearched(true);
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#1C201D] font-sans antialiased selection:bg-[#84A338]/20">
      {/* Hero Header */}
      <section className="relative w-full bg-[#F4F7EE] py-12 lg:py-16 border-b border-[#E8EDE0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-normal mb-6">
            <Link to="/" className="hover:text-[#1C201D] transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#1C201D] font-medium">Track Order</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#84A338] block">
              REAL-TIME SHIPMENT UPDATES
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1C201D] tracking-tight leading-tight">
              Track Your <span className="text-[#84A338]">Botanical Order</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Enter your Order Number and registered Email or Phone below to check the real-time fulfillment and transit status of your Adron parcel.
            </p>
          </div>
        </div>
      </section>

      {/* Lookup Card */}
      <section className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8EDE0] shadow-sm space-y-6">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5">
                  Order ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. ADR-849201"
                  className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#84A338] focus:bg-white transition"
                />
                <span className="text-[10px] text-gray-400 block mt-1">Found in your SMS & confirmation email.</span>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1.5">
                  Email Address or Mobile Number
                </label>
                <input
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="Registered phone or email"
                  className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#84A338] focus:bg-white transition"
                />
                <span className="text-[10px] text-gray-400 block mt-1">Used to verify shipment details.</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1C201D] hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search size={14} />
              <span>Track Shipment</span>
            </button>
          </form>

          {/* Quick Sample Order Button for User Convenience */}
          {!searched && (
            <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
              <span>Quick test:</span>
              <button
                type="button"
                onClick={() => {
                  setOrderId('ADR-849201');
                  setPhoneOrEmail('customer@adron.com');
                }}
                className="text-[#84A338] font-bold hover:underline"
              >
                Autofill sample order ADR-849201
              </button>
            </div>
          )}
        </div>

        {/* Tracking Results */}
        {searched && orderData && (
          <div className="mt-8 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8EDE0] shadow-sm space-y-8 animate-fade-in">
            {/* Order Overview Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#84A338] block">Live Status</span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1C201D]">
                  Order {orderData.id}
                </h2>
                <p className="text-xs text-gray-500">Placed on {orderData.placedDate} • Destination: {orderData.destination}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#F4F7EE] text-[#84A338] border border-[#84A338]/30">
                  <Truck size={14} />
                  <span>{orderData.status}</span>
                </span>
                <span className="text-xs font-semibold text-gray-700">Carrier: {orderData.carrier}</span>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Fulfillment & Delivery Milestones</h3>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200">
                {orderData.steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 text-xs">
                    <div
                      className={`absolute -left-6 sm:-left-8 w-5 sm:w-7 h-5 sm:h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold z-10 ${
                        step.completed
                          ? 'bg-[#84A338]'
                          : step.current
                          ? 'bg-[#1C201D] ring-4 ring-[#84A338]/20'
                          : 'bg-gray-300'
                      }`}
                    >
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <span className={`font-bold text-sm ${step.current ? 'text-[#84A338]' : step.completed ? 'text-[#1C201D]' : 'text-gray-400'}`}>
                          {step.title}
                        </span>
                        <span className="text-[11px] text-gray-400">{step.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Contents */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Package Items</h3>
              <div className="space-y-2">
                {orderData.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-3 bg-[#FAF8F5] rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Package size={15} className="text-[#84A338]" />
                      <span className="font-semibold text-[#1C201D]">{item.name}</span>
                      <span className="text-gray-400">x{item.qty}</span>
                    </div>
                    <span className="font-bold text-[#1C201D]">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
