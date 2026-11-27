import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#1C201D] font-sans antialiased selection:bg-[#84A338]/20">
      {/* Hero Banner */}
      <section className="relative w-full bg-[#F4F7EE] py-12 lg:py-16 border-b border-[#E8EDE0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-normal mb-6">
            <Link to="/" className="hover:text-[#1C201D] transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#1C201D] font-medium">Contact Us</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#84A338] block">
              WE ARE HERE FOR YOU
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1C201D] tracking-tight leading-tight">
              Get in Touch with <span className="text-[#84A338]">Adron</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Have a question regarding your order, our cold-pressed okra extraction process, or need guidance choosing the right botanical routine for your hair and skin? Our team is always delighted to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Direct Contact Info & Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C201D] tracking-tight mb-2">
                Contact Information
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Connect with our botanical care concierges directly via phone, email, or WhatsApp.
              </p>
            </div>

            <div className="space-y-4">
              {/* Card 1: Email */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8EDE0] shadow-xs flex items-start gap-4 transition hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#F4F7EE] flex items-center justify-center text-[#84A338] shrink-0">
                  <Mail size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Email Support</span>
                  <a href="mailto:care@adronbotanicals.com" className="text-sm font-bold text-[#1C201D] hover:text-[#84A338] transition">
                    care@adronbotanicals.com
                  </a>
                  <p className="text-[11px] text-gray-500">Average response time: within 2 to 4 business hours.</p>
                </div>
              </div>

              {/* Card 2: Phone / WhatsApp */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8EDE0] shadow-xs flex items-start gap-4 transition hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#F4F7EE] flex items-center justify-center text-[#84A338] shrink-0">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Phone & WhatsApp</span>
                  <a href="tel:+919876543210" className="text-sm font-bold text-[#1C201D] hover:text-[#84A338] transition block">
                    +91 98765 43210
                  </a>
                  <p className="text-[11px] text-gray-500">Monday to Saturday: 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              {/* Card 3: Headquarters & Botanical Lab */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8EDE0] shadow-xs flex items-start gap-4 transition hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#F4F7EE] flex items-center justify-center text-[#84A338] shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Botanical Lab & Office</span>
                  <p className="text-xs font-semibold text-[#1C201D]">
                    Adron Life Sciences Pvt. Ltd.
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Plot 48, Organic Botanical Corridor, Surat, Gujarat — 395007, India.
                  </p>
                </div>
              </div>

              {/* Card 4: Business Hours */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8EDE0] shadow-xs flex items-start gap-4 transition hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#F4F7EE] flex items-center justify-center text-[#84A338] shrink-0">
                  <Clock size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Operational Hours</span>
                  <p className="text-xs text-gray-700 font-medium">Orders dispatched daily (Mon–Sat) by 2:00 PM</p>
                  <p className="text-[11px] text-gray-500">Customer care closed on Sundays and national public holidays.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8EDE0] shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#84A338] block mb-1">
                  SEND US A DIRECT MESSAGE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1C201D] tracking-tight">
                  How can we help you today?
                </h2>
                <p className="text-xs text-gray-500 pt-1">
                  Fill in your details below and our customer support specialist will reply via email shortly.
                </p>
              </div>

              {submitted ? (
                <div className="bg-[#F4F7EE] border border-[#84A338]/30 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-[#84A338] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={28} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#1C201D]">Message Sent Successfully!</h3>
                    <p className="text-xs text-gray-600 max-w-md mx-auto">
                      Thank you for reaching out, <strong>{formData.name}</strong>. A copy has been received by our support desk and we will contact you at <strong>{formData.email}</strong> within 2–4 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'Order Inquiry', message: '' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#84A338] hover:underline cursor-pointer"
                  >
                    <span>Send another inquiry</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priyanshu Dave"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#84A338] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#84A338] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 00000"
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#84A338] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-1.5">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#84A338] focus:bg-white transition"
                      >
                        <option value="Order Inquiry">Track Order / Delivery Status</option>
                        <option value="Product Guidance">Product Routine & Compatibility</option>
                        <option value="Returns & Refunds">Returns, Exchange & Damaged Item</option>
                        <option value="Wholesale & Bulk">Wholesale, Salon & Retail Partnership</option>
                        <option value="General Feedback">General Feedback & Suggestions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1.5">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows="5"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share order details, batch numbers, or any specific questions you have..."
                      className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl p-4 outline-none focus:border-[#84A338] focus:bg-white transition leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#1C201D] hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Inquiry</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Helpful Links Grid */}
      <section className="bg-white border-t border-[#E8EDE0] py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/track-order" className="p-6 rounded-2xl bg-[#F4F7EE] border border-[#E8EDE0] hover:border-[#84A338] transition block group">
              <span className="text-[10px] font-bold text-[#84A338] uppercase block mb-1">Self Service</span>
              <h3 className="font-bold text-base text-[#1C201D] group-hover:text-[#84A338] transition flex items-center justify-between">
                <span>Track Your Order</span>
                <ArrowRight size={16} />
              </h3>
              <p className="text-xs text-gray-600 mt-2">Enter your order ID for live tracking updates via BlueDart & Delhivery.</p>
            </Link>

            <Link to="/faqs" className="p-6 rounded-2xl bg-[#F4F7EE] border border-[#E8EDE0] hover:border-[#84A338] transition block group">
              <span className="text-[10px] font-bold text-[#84A338] uppercase block mb-1">Knowledge Base</span>
              <h3 className="font-bold text-base text-[#1C201D] group-hover:text-[#84A338] transition flex items-center justify-between">
                <span>Frequently Asked Questions</span>
                <ArrowRight size={16} />
              </h3>
              <p className="text-xs text-gray-600 mt-2">Instant answers about shipping, cold-pressed Okra formulations, and routines.</p>
            </Link>

            <Link to="/returns-exchange" className="p-6 rounded-2xl bg-[#F4F7EE] border border-[#E8EDE0] hover:border-[#84A338] transition block group">
              <span className="text-[10px] font-bold text-[#84A338] uppercase block mb-1">Hassle-Free</span>
              <h3 className="font-bold text-base text-[#1C201D] group-hover:text-[#84A338] transition flex items-center justify-between">
                <span>Returns & Exchanges</span>
                <ArrowRight size={16} />
              </h3>
              <p className="text-xs text-gray-600 mt-2">15-day botanical satisfaction guarantee and door-step reverse pickups.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
