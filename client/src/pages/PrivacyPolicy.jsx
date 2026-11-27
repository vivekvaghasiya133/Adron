import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-[#FAF8F5] text-[#1C201D] font-sans antialiased selection:bg-[#84A338]/20">
      {/* Hero Header */}
      <section className="relative w-full bg-[#F4F7EE] py-12 lg:py-16 border-b border-[#E8EDE0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-normal mb-6">
            <Link to="/" className="hover:text-[#1C201D] transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#1C201D] font-medium">Privacy Policy</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#84A338] block">
              YOUR PRIVACY MATTERS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1C201D] tracking-tight leading-tight">
              Privacy Policy & <span className="text-[#84A338]">Data Protection</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              At Adron, we respect your privacy and are committed to protecting your personal data with 256-bit bank-grade encryption and total ethical transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Main Legal Content */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8EDE0] shadow-sm space-y-8 text-xs text-gray-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#1C201D]">1. Information We Collect</h2>
            <p>
              When you purchase our botanical products or register an account with Adron, we collect only necessary fulfillment details: your full name, shipping and billing address, email address, and phone number for delivery dispatch and order status notifications.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#1C201D]">2. Payment Data Security</h2>
            <p>
              We do <strong>not</strong> store your credit card numbers, debit card details, or UPI MPIN on our servers. All financial transactions are processed securely through RBI-licensed payment gateways (Razorpay, Cashfree, UPI) utilizing end-to-end PCI-DSS Level 1 encryption.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#1C201D]">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>To fulfill, pack, and deliver your ordered botanical products.</li>
              <li>To send real-time SMS and WhatsApp order tracking links and invoices.</li>
              <li>To provide dedicated customer care, returns, and skincare consultations.</li>
              <li>We <strong>never sell, lease, or trade</strong> your personal information to third-party data brokers or advertisers.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#1C201D]">4. Cookies & Analytics</h2>
            <p>
              We use minimal, functional cookies necessary to maintain your shopping cart state and ensure smooth website navigation. You may choose to disable cookies in your browser settings at any time without losing access to our catalog.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#1C201D]">5. Contact Our Privacy Grievance Officer</h2>
            <p>
              If you have any questions or wish to delete your customer data from our records, please contact our designated Data Officer at <a href="mailto:privacy@adronbotanicals.com" className="text-[#84A338] font-bold underline">privacy@adronbotanicals.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
