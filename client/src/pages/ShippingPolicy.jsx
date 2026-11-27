import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, ShieldCheck, Package, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="w-full bg-[#FAF8F5] text-[#1C201D] font-sans antialiased selection:bg-[#84A338]/20">
      {/* Hero Header */}
      <section className="relative w-full bg-[#F4F7EE] py-12 lg:py-16 border-b border-[#E8EDE0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-normal mb-6">
            <Link to="/" className="hover:text-[#1C201D] transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#1C201D] font-medium">Shipping Policy</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#84A338] block">
              TRANSPARENT & RELIABLE DISPATCH
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1C201D] tracking-tight leading-tight">
              Shipping & <span className="text-[#84A338]">Delivery Policy</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              At Adron, we treat every single parcel with utmost care. Our botanical formulations are freshly batch-crafted, packaged in eco-friendly biodegradable materials, and dispatched via India's top express logistics networks.
            </p>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E8EDE0] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F4F7EE] flex items-center justify-center text-[#84A338]">
              <Truck size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#1C201D]">Free Delivery</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Complimentary express shipping on all prepaid and COD orders above ₹999 across all pin-codes in India.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8EDE0] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F4F7EE] flex items-center justify-center text-[#84A338]">
              <Clock size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#1C201D]">2 to 4 Business Days</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Metro cities (Mumbai, Delhi, Bengaluru, Ahmedabad) typically receive parcels within 48 to 72 hours.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8EDE0] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F4F7EE] flex items-center justify-center text-[#84A338]">
              <Package size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#1C201D]">100% Eco-Packaging</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Zero single-use plastic. We use water-soluble cornstarch peanuts and 100% recyclable glass bottles & FSC paper.
            </p>
          </div>
        </div>

        {/* Policy Prose Sections */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8EDE0] shadow-sm space-y-8 text-xs text-gray-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C201D]">1. Dispatch Timeline</h2>
            <p>
              Orders placed before <strong>2:00 PM IST (Monday through Saturday)</strong> are dispatched on the same business day from our primary botanical facility in Surat, Gujarat. Orders placed on Sundays or public holidays are processed and shipped on the following business morning.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C201D]">2. Shipping Rates</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li><strong>Orders above ₹999:</strong> FREE Shipping across all serviceable pin codes in India.</li>
              <li><strong>Orders below ₹999:</strong> A nominal flat standard shipping fee of ₹99 is applied at checkout.</li>
              <li><strong>Cash on Delivery (COD):</strong> Available on orders up to ₹3,000 at no extra handling charge.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C201D]">3. Courier Partners & Tracking</h2>
            <p>
              We partner exclusively with verified Tier-1 express air and surface logistics providers: <strong>BlueDart Express, Delhivery, DTDC, and Shadowfax</strong>. Once your order has been dispatched, you will automatically receive an SMS and WhatsApp message containing your AWB tracking number and live tracking link.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C201D]">4. Damaged or Tampered Parcels</h2>
            <p>
              If your package appears physically damaged or opened at the time of delivery, please do not accept it from the delivery courier and contact us immediately at <a href="mailto:care@adronbotanicals.com" className="text-[#84A338] font-bold underline">care@adronbotanicals.com</a> or WhatsApp <strong>+91 98765 43210</strong>. We will arrange a replacement dispatch immediately.
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-8 rounded-3xl bg-[#F4F7EE] border border-[#E8EDE0] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-base text-[#1C201D]">Looking for your package right now?</h3>
            <p className="text-xs text-gray-600">Enter your order ID to see the live location of your parcel.</p>
          </div>
          <Link
            to="/track-order"
            className="bg-[#1C201D] hover:bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition"
          >
            <span>Track Order</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
