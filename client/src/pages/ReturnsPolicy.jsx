import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ShieldCheck, HeartHandshake, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

export default function ReturnsPolicy() {
  return (
    <div className="w-full bg-[#FAF8F5] text-[#1C201D] font-sans antialiased selection:bg-[#84A338]/20">
      {/* Hero Header */}
      <section className="relative w-full bg-[#F4F7EE] py-12 lg:py-16 border-b border-[#E8EDE0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-normal mb-6">
            <Link to="/" className="hover:text-[#1C201D] transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#1C201D] font-medium">Returns & Exchanges</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#84A338] block">
              15-DAY BOTANICAL SATISFACTION PROMISE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1C201D] tracking-tight leading-tight">
              Returns & <span className="text-[#84A338]">Exchange Policy</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              We stand firmly behind the efficacy and purity of our cold-pressed okra formulations. If for any reason our product doesn't suit your hair or skin type, our 15-day return policy has you completely covered.
            </p>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* 3 Step Return Process */}
        <div className="space-y-4">
          <h2 className="text-center font-bold text-xl sm:text-2xl text-[#1C201D]">
            How Our Easy Return Process Works
          </h2>
          <p className="text-center text-xs text-gray-500 max-w-md mx-auto">
            Three simple steps to return or exchange your order without any complicated paperwork.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-[#E8EDE0] shadow-xs space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#F4F7EE] text-[#84A338] font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-sm text-[#1C201D]">Request Return</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Email us at <strong>care@adronbotanicals.com</strong> or WhatsApp our support line with your Order ID within 15 days of receiving your parcel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8EDE0] shadow-xs space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#F4F7EE] text-[#84A338] font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-sm text-[#1C201D]">Doorstep Reverse Pickup</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our logistics partner will arrive at your address within 24 to 48 hours to collect the return parcel at zero extra cost to you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8EDE0] shadow-xs space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#F4F7EE] text-[#84A338] font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-sm text-[#1C201D]">Instant Refund / Swap</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Upon package pickup verification, your refund is credited to your bank account or UPI within 3 business days, or replacement shipped.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8EDE0] shadow-sm space-y-6 text-xs text-gray-700 leading-relaxed">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#1C201D]">Eligibility for Returns</h3>
            <p>
              To maintain strict botanical hygiene standards, products must be returned in their original packaging with at least 70% of the formulation remaining.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#1C201D]">Damaged, Leaking or Incorrect Items</h3>
            <p>
              In the unlikely event that your bottle arrives leaking or damaged during transit, notify us within 48 hours with a photo of the item. We will dispatch a brand-new replacement immediately with priority express shipping.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#1C201D]">Refund Modes</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li><strong>Prepaid Orders (Cards, NetBanking, UPI):</strong> Automatically refunded back to the original source account within 3–5 business days.</li>
              <li><strong>Cash on Delivery (COD):</strong> Refunded via instant UPI transfer or direct NEFT bank transfer upon receiving your preferred account details.</li>
            </ul>
          </div>
        </div>

        {/* Support Banner */}
        <div className="p-8 rounded-3xl bg-[#F4F7EE] border border-[#E8EDE0] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-base text-[#1C201D]">Need help with a return or exchange?</h3>
            <p className="text-xs text-gray-600">Our customer care team is available to assist you step-by-step.</p>
          </div>
          <Link
            to="/contact"
            className="bg-[#1C201D] hover:bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition"
          >
            <span>Contact Support</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
