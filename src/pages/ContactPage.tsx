import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO, POLYMER_PRODUCTS } from '../data/polymerData';
import { TradeMap } from '../components/TradeMap';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState<'Buyer' | 'Seller' | 'Other'>('Buyer');
  const [material, setMaterial] = useState('PP');
  const [grade, setGrade] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detection

    if (!name.trim() || !company.trim() || !phone.trim()) {
      setErrorMessage('Please fill in your Full Name, Company, and Phone / WhatsApp number.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please provide consent for our team to contact you.');
      return;
    }

    setErrorMessage('');
    const ref = `NW-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(ref);
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `*NEWWAYS ENTERPRISE — CONTACT ENQUIRY*\n` +
      `Reference: ${submittedRef || 'Web Contact'}\n` +
      `Type: ${enquiryType}\n` +
      `Name: ${name}\n` +
      `Company: ${company}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email || 'N/A'}\n` +
      `Material: ${material}\n` +
      `Grade/Spec: ${grade || 'General'}\n` +
      `Quantity: ${quantity || 'Flexible'} MT\n` +
      `Location: ${location || 'India'}\n` +
      `Message: ${message || 'Looking forward to your quotation.'}`
    );
    window.open(`https://wa.me/919879747777?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-0 bg-white">
      {/* Page Hero Header */}
      <section className="relative bg-[#07162c] text-white py-16 md:py-24 overflow-hidden border-b border-sky-950">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-700/60 text-cyan-400 text-xs font-semibold">
                <span>Home / Contact Us</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Let's Connect and Trade Polymers
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                We are here to help! Whether you have a product inquiry, need sourcing support, or want to explore new trading opportunities — get in touch with our team in Surendranagar, Gujarat.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-sky-300">
                <span>🚢 Port Cleared Lots</span>
                <span>•</span>
                <span>📋 CoA Verified Specifications</span>
                <span>•</span>
                <span>⚡ Prompt Commercial Response</span>
              </div>
            </div>

            {/* Right: Container Ship Import Export photo */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border border-sky-700/60 shadow-2xl aspect-[16/10] bg-slate-900 group">
                <img
                  src="/src/assets/images/port_container_terminal_1791543588743.jpg"
                  alt="Deep Sea Container Port Terminal for Polymer Import Export"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07162c] via-transparent to-black/20 pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-sky-800/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-cyan-400 font-bold block text-[11px] uppercase tracking-wider">Direct Import-Export Desks</span>
                    <span className="text-slate-300 text-xs">Surendranagar • Mundra • Hazira</span>
                  </div>
                  <span className="text-amber-400 font-mono font-bold text-[11px]">+91 98797 47777</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Grid: Details on Left, Form on Right */}
      <section className="py-16 md:py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600">GET IN TOUCH</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0b1e36] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  We'd Love to Hear From You
                </h2>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Reach out to us for inquiries, quotations, partnerships or any trade support you need. Our polymer desk is ready to assist you.
                </p>
              </div>

              {/* Direct cards */}
              <div className="space-y-4">
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 shadow-sm transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0b1e36] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400">Phone / WhatsApp Desk</span>
                    <div className="text-base font-bold text-slate-900 mt-0.5">{COMPANY_INFO.phoneDisplay}</div>
                    <span className="text-xs text-emerald-600 font-medium">Direct Voice & WhatsApp Chat</span>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 shadow-sm transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0b1e36] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400">Official Email</span>
                    <div className="text-base font-bold text-slate-900 mt-0.5">{COMPANY_INFO.email}</div>
                    <span className="text-xs text-slate-500">Corporate & RFQ Communications</span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400">Head Office Address</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{COMPANY_INFO.name}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{COMPANY_INFO.address.fullAddress}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400">Trading Desk Hours</span>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">Monday – Saturday: 9:30 AM – 7:30 PM IST</div>
                    <span className="text-xs text-slate-500">WhatsApp Desk Available 24/7 for urgent RFQs</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-2xl bg-sky-950 text-white flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block">Your Trusted Partner in Global Polymer Trade</span>
                  <span className="text-slate-400">Sourcing • Trading • Recycling Coordination</span>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Working Enquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl">
              {submittedRef ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong>{name}</strong>. Your inquiry has been registered under:
                  </p>
                  <div className="inline-block font-mono text-lg font-bold text-slate-900 bg-slate-100 border border-slate-300 px-4 py-1.5 rounded-xl">
                    {submittedRef}
                  </div>
                  <p className="text-xs text-slate-500 max-w-lg mx-auto">
                    An executive from our Surendranagar office will reach out to <strong>{phone}</strong> with grade availability and pricing.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleWhatsAppForward}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send via WhatsApp to Desk Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmittedRef(null)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-xl font-bold text-slate-900">Send Us a Message</h3>
                    <p className="text-xs text-slate-500">Fill out the form below and we'll get back to you as soon as possible.</p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Honeypot hidden input for anti-spam */}
                  <div className="hidden">
                    <input value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </div>

                  {/* Enquiry type selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      I am interested in:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Buyer', 'Seller', 'Other'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setEnquiryType(type)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            enquiryType === type
                              ? 'bg-[#0b1e36] text-white border-[#0b1e36] shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {type === 'Buyer' ? 'Buying Material' : type === 'Seller' ? 'Selling Stock' : 'General Partnership'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Your company or plant"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98797 47777"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Material & Trade details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Material</label>
                      <select
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none bg-white"
                      >
                        {POLYMER_PRODUCTS.map((p) => (
                          <option key={p.id} value={p.code}>{p.code} — {p.name}</option>
                        ))}
                        <option value="Recycled">Recycled Regrind / Flakes</option>
                        <option value="Other">Other Material</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Grade / MFI</label>
                      <input
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        placeholder="e.g. 570SP / MI 3.0"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Quantity (MT)</label>
                      <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="e.g. 25 MT"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Delivery / Warehouse Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Surendranagar, Ahmedabad, Bhiwandi, Mundra..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message / Specifications
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message, application details, payment term preference, or specific requests here..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none resize-none"
                    ></textarea>
                  </div>

                  {/* Privacy Notice and Consent */}
                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="consent-check"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <label htmlFor="consent-check" className="text-xs text-slate-600 cursor-pointer">
                      I agree to allow NEWWAYS ENTERPRISE to process my contact details to respond to this trade enquiry in accordance with business communication standards.
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message / RFQ</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Global Trade Map section */}
      <section className="py-16 md:py-20 bg-[#07162c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <TradeMap />
        </div>
      </section>
    </div>
  );
};
