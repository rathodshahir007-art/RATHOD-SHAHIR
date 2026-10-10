import React, { useState } from 'react';
import { X, CheckCircle, MessageSquare, Send, ShieldCheck, ArrowRight, Building, Phone, Mail, Package } from 'lucide-react';
import { COMPANY_INFO, POLYMER_PRODUCTS } from '../data/polymerData';
import { MaterialCondition } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'buy' | 'sell' | 'quote';
  defaultMaterial?: string;
  defaultCondition?: MaterialCondition;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'quote',
  defaultMaterial = '',
  defaultCondition = 'Prime',
}) => {
  const [tradeType, setTradeType] = useState<'buy' | 'sell' | 'quote'>(defaultType);
  const [material, setMaterial] = useState(defaultMaterial || 'PP');
  const [condition, setCondition] = useState<MaterialCondition>(defaultCondition);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detected

    if (!name.trim() || !phone.trim() || !company.trim()) {
      setErrorMessage('Please fill in your Name, Company, and Phone / WhatsApp number.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate reliable enterprise processing
    setTimeout(() => {
      const randomRef = `NW-${tradeType.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(randomRef);
      setIsSubmitting(false);
    }, 600);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `*NEWWAYS ENTERPRISE — Trade Enquiry*\n` +
      `Type: ${tradeType.toUpperCase()}\n` +
      `Reference: ${submittedRef || 'Direct Web Enquiry'}\n` +
      `Name: ${name}\n` +
      `Company: ${company}\n` +
      `Phone: ${phone}\n` +
      `Material: ${material} (${condition})\n` +
      `Grade/Spec: ${grade || 'Not specified'}\n` +
      `Quantity: ${quantity || 'Flexible'} MT\n` +
      `Location: ${location || 'India'}\n` +
      `Target/Offer Price: ${targetPrice || 'Indicative'}\n` +
      `Notes: ${message || 'Please contact me with availability & pricing.'}`
    );
    window.open(`https://wa.me/919879747777?text=${text}`, '_blank');
  };

  const resetForm = () => {
    setSubmittedRef(null);
    setName('');
    setCompany('');
    setPhone('');
    setEmail('');
    setGrade('');
    setQuantity('');
    setLocation('');
    setTargetPrice('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#0b1e36] to-[#0e2a47] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>NEWWAYS POLYMER SOURCING DESK</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {tradeType === 'buy' ? 'Submit Buying Requirement' : tradeType === 'sell' ? 'Submit Available Stock' : 'Request a Polymer Quotation'}
          </h3>
          <p className="text-slate-300 text-xs md:text-sm mt-1">
            Connect with our trading team for genuine grade specifications, verified lots, and commercial terms.
          </p>

          {/* Trade Type Switcher */}
          {!submittedRef && (
            <div className="flex gap-2 mt-4 p-1 bg-slate-900/60 rounded-xl max-w-md">
              <button
                type="button"
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tradeType === 'buy' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                Buy Polymers
              </button>
              <button
                type="button"
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tradeType === 'sell' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                Sell Stock
              </button>
              <button
                type="button"
                onClick={() => setTradeType('quote')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tradeType === 'quote' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                General Quote
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {submittedRef ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Enquiry Successfully Recorded
                </span>
                <h4 className="text-2xl font-bold text-slate-900 mt-2">
                  Thank You, {name}!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                  Your requirement has been logged with reference code:
                </p>
                <div className="inline-block font-mono font-bold text-lg text-slate-900 bg-slate-100 border border-slate-300 px-4 py-1.5 rounded-lg my-2">
                  {submittedRef}
                </div>
                <p className="text-xs text-slate-500 max-w-lg mx-auto">
                  Our polymer desk in Surendranagar will review the specifications and reach out to <strong>{phone}</strong> within business hours.
                </p>
              </div>

              {/* Fast WhatsApp Bridge */}
              <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 max-w-lg mx-auto text-left">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-600 text-white rounded-lg">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold text-emerald-950">
                      Need faster coordination?
                    </h5>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Send this structured specification directly to our WhatsApp desk (+91 98797 47777) for instant dispatch.
                    </p>
                    <button
                      type="button"
                      onClick={handleWhatsAppRedirect}
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs tracking-wide shadow-md transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send to WhatsApp Desk Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Hidden anti-spam honeypot */}
              <div className="hidden">
                <label>Do not fill: <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
              </div>

              {/* Contact info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rajesh Shah"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
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
                    placeholder="e.g. Apex Plastics Pvt Ltd"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
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
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
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
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  />
                </div>
              </div>

              {/* Material specifications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Material
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white"
                  >
                    {POLYMER_PRODUCTS.map((p) => (
                      <option key={p.id} value={p.code}>
                        {p.code} ({p.name})
                      </option>
                    ))}
                    <option value="Other">Other Polymer / Compound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as MaterialCondition)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white"
                  >
                    <option value="Prime">Prime (Virgin)</option>
                    <option value="Near Prime">Near Prime</option>
                    <option value="Off-Grade">Off-Grade / Surplus</option>
                    <option value="Recycled">Recycled Granules</option>
                    <option value="Regrind">Clean Regrind / Flakes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Grade / MFI Specs
                  </label>
                  <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="e.g. 570SP / MFI 3.0"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  />
                </div>
              </div>

              {/* Commercial Specs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quantity (MT)
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 20 MT / 1 FCL"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tradeType === 'sell' ? 'Stock Location' : 'Delivery Destination'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Ahmedabad, Bhiwandi, Mundra"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tradeType === 'sell' ? 'Expected Offer (₹/kg or $/MT)' : 'Target Price'}
                  </label>
                  <input
                    type="text"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="e.g. Market Spot / Best Rate"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  />
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Technical / Packing Requirements
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Application details, packing type (25kg or Jumbo bags), test certificates required, or payment terms..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
                ></textarea>
              </div>

              {/* Disclaimer notice as required by brief */}
              <p className="text-[11px] text-slate-500 leading-normal">
                *Final prices, material specifications, availability, payment terms, and delivery schedules are subject to commercial confirmation.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-orange-600/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>{tradeType === 'buy' ? 'Submit Buying Requirement' : tradeType === 'sell' ? 'Submit Available Stock' : 'Request Quotation'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
