import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { COMPANY_INFO, POLYMER_PRODUCTS } from '../data/polymerData';
import { MaterialCondition } from '../types';

export const BuySellSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  
  // Buy Form State
  const [buyName, setBuyName] = useState('');
  const [buyCompany, setBuyCompany] = useState('');
  const [buyPhone, setBuyPhone] = useState('');
  const [buyMaterial, setBuyMaterial] = useState('PP');
  const [buyGrade, setBuyGrade] = useState('');
  const [buyMfi, setBuyMfi] = useState('');
  const [buyApplication, setBuyApplication] = useState('');
  const [buyQuantity, setBuyQuantity] = useState('');
  const [buyLocation, setBuyLocation] = useState('');
  const [buyTargetPrice, setBuyTargetPrice] = useState('');
  const [buyRequiredDate, setBuyRequiredDate] = useState('');
  const [buyHoneypot, setBuyHoneypot] = useState('');
  const [buySuccessRef, setBuySuccessRef] = useState<string | null>(null);

  // Sell Form State
  const [sellName, setSellName] = useState('');
  const [sellCompany, setSellCompany] = useState('');
  const [sellPhone, setSellPhone] = useState('');
  const [sellMaterial, setSellMaterial] = useState('HDPE');
  const [sellGrade, setSellGrade] = useState('');
  const [sellMfi, setSellMfi] = useState('');
  const [sellQuantity, setSellQuantity] = useState('');
  const [sellLocation, setSellLocation] = useState('');
  const [sellPacking, setSellPacking] = useState('25 kg bags');
  const [sellOfferPrice, setSellOfferPrice] = useState('');
  const [sellNotes, setSellNotes] = useState('');
  const [sellHoneypot, setSellHoneypot] = useState('');
  const [sellSuccessRef, setSellSuccessRef] = useState<string | null>(null);

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (buyHoneypot) return;
    if (!buyName.trim() || !buyPhone.trim() || !buyCompany.trim()) return;

    const ref = `NW-BUY-${Math.floor(100000 + Math.random() * 900000)}`;
    setBuySuccessRef(ref);
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sellHoneypot) return;
    if (!sellName.trim() || !sellPhone.trim() || !sellCompany.trim()) return;

    const ref = `NW-SELL-${Math.floor(100000 + Math.random() * 900000)}`;
    setSellSuccessRef(ref);
  };

  const forwardBuyToWhatsApp = () => {
    const text = encodeURIComponent(
      `*NEWWAYS ENTERPRISE — BUYING REQUIREMENT*\n` +
      `Reference: ${buySuccessRef || 'Website RFQ'}\n` +
      `Name: ${buyName}\n` +
      `Company: ${buyCompany}\n` +
      `Phone: ${buyPhone}\n` +
      `Material: ${buyMaterial}\n` +
      `Grade: ${buyGrade || 'Open'}\n` +
      `MFI: ${buyMfi || 'Standard'}\n` +
      `Application: ${buyApplication || 'Industrial'}\n` +
      `Quantity: ${buyQuantity || 'Flexible'} MT\n` +
      `Destination: ${buyLocation || 'India'}\n` +
      `Target Price: ${buyTargetPrice || 'Spot rate'}\n` +
      `Required By: ${buyRequiredDate || 'Immediate'}`
    );
    window.open(`https://wa.me/919879747777?text=${text}`, '_blank');
  };

  const forwardSellToWhatsApp = () => {
    const text = encodeURIComponent(
      `*NEWWAYS ENTERPRISE — STOCK OFFER*\n` +
      `Reference: ${sellSuccessRef || 'Website Offer'}\n` +
      `Name: ${sellName}\n` +
      `Company: ${sellCompany}\n` +
      `Phone: ${sellPhone}\n` +
      `Material: ${sellMaterial}\n` +
      `Grade: ${sellGrade || 'Not specified'}\n` +
      `MFI: ${sellMfi || 'Standard'}\n` +
      `Available Quantity: ${sellQuantity || 'In Stock'} MT\n` +
      `Warehouse Location: ${sellLocation || 'Gujarat'}\n` +
      `Packing: ${sellPacking}\n` +
      `Expected Price: ${sellOfferPrice || 'Market rate'}\n` +
      `Lot Description: ${sellNotes || 'Please contact me to review samples & CoA.'}`
    );
    window.open(`https://wa.me/919879747777?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>TRADE DESK SUBMISSIONS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1e36] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Buy Polymers or Liquidate Available Stock
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            “Tell us what you need. Tell us what you have. Newways connects the two.”
          </p>

          {/* Dual Tab Switcher */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl mt-6 border border-slate-200">
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'buy'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Buy Polymers (Requirement)
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'sell'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Sell Your Polymer Stock
            </button>
          </div>
        </div>

        {/* Tab 1: BUY POLYMERS FORM */}
        {activeTab === 'buy' && (
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm animate-in fade-in duration-200">
            {buySuccessRef ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Buying Requirement Submitted!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Reference: <strong className="font-mono text-sky-700 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">{buySuccessRef}</strong>
                </p>
                <p className="text-xs text-slate-500 max-w-lg mx-auto">
                  Our sourcing team will check inventory across Mundra, Nhava Sheva, and domestic stockists and contact {buyPhone}.
                </p>
                <div className="pt-2">
                  <button
                    onClick={forwardBuyToWhatsApp}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send directly to WhatsApp Desk</span>
                  </button>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setBuySuccessRef(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Submit another requirement
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBuySubmit} className="space-y-5">
                <div className="border-b border-slate-200 pb-4 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Buyer Requirement Specification
                  </h3>
                  <p className="text-xs text-slate-500">
                    Share your material, grade, MFI, application, quantity, delivery location, and target pricing.
                  </p>
                </div>

                <div className="hidden">
                  <input value={buyHoneypot} onChange={(e) => setBuyHoneypot(e.target.value)} />
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={buyName}
                      onChange={(e) => setBuyName(e.target.value)}
                      placeholder="e.g. Anand Patel"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Plant <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={buyCompany}
                      onChange={(e) => setBuyCompany(e.target.value)}
                      placeholder="e.g. Gujarat Polymers Ltd"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={buyPhone}
                      onChange={(e) => setBuyPhone(e.target.value)}
                      placeholder="+91 98797 47777"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                </div>

                {/* Technical specs */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Material</label>
                    <select
                      value={buyMaterial}
                      onChange={(e) => setBuyMaterial(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    >
                      {POLYMER_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.code}>{p.code} — {p.name}</option>
                      ))}
                      <option value="Other">Other Compound</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Required Grade</label>
                    <input
                      type="text"
                      value={buyGrade}
                      onChange={(e) => setBuyGrade(e.target.value)}
                      placeholder="e.g. Raffia / 570SP / P6006"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target MFI / Viscosity</label>
                    <input
                      type="text"
                      value={buyMfi}
                      onChange={(e) => setBuyMfi(e.target.value)}
                      placeholder="e.g. MFI 3.0"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Application</label>
                    <input
                      type="text"
                      value={buyApplication}
                      onChange={(e) => setBuyApplication(e.target.value)}
                      placeholder="e.g. Blow molding, Pipe"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                </div>

                {/* Commercial parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Quantity (MT)</label>
                    <input
                      type="text"
                      value={buyQuantity}
                      onChange={(e) => setBuyQuantity(e.target.value)}
                      placeholder="e.g. 25 MT / monthly"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Destination</label>
                    <input
                      type="text"
                      value={buyLocation}
                      onChange={(e) => setBuyLocation(e.target.value)}
                      placeholder="e.g. Ahmedabad / Bhiwandi"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Price (₹/kg or $)</label>
                    <input
                      type="text"
                      value={buyTargetPrice}
                      onChange={(e) => setBuyTargetPrice(e.target.value)}
                      placeholder="e.g. Best spot quote"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Required Date / Timeline</label>
                    <input
                      type="text"
                      value={buyRequiredDate}
                      onChange={(e) => setBuyRequiredDate(e.target.value)}
                      placeholder="e.g. Immediate / Next 10 days"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <p className="text-[11px] text-slate-500 italic">
                    *Final prices, material specifications and delivery schedules subject to confirmation.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
                  >
                    SUBMIT BUYING REQUIREMENT
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: SELL YOUR POLYMER STOCK FORM */}
        {activeTab === 'sell' && (
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm animate-in fade-in duration-200">
            {sellSuccessRef ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Stock Offer Logged!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Reference: <strong className="font-mono text-orange-700 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">{sellSuccessRef}</strong>
                </p>
                <p className="text-xs text-slate-500 max-w-lg mx-auto">
                  Our trading desk will review your lot parameters and coordinate with buyers in our network.
                </p>
                <div className="pt-2">
                  <button
                    onClick={forwardSellToWhatsApp}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send lot details to WhatsApp Desk</span>
                  </button>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setSellSuccessRef(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Submit another lot
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSellSubmit} className="space-y-5">
                <div className="border-b border-slate-200 pb-4 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Supplier / Stockist Material Submission
                  </h3>
                  <p className="text-xs text-slate-500">
                    Allow suppliers to submit material, grade, MFI, quantity, location, packing, offer price, and lot specifications.
                  </p>
                </div>

                <div className="hidden">
                  <input value={sellHoneypot} onChange={(e) => setSellHoneypot(e.target.value)} />
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={sellName}
                      onChange={(e) => setSellName(e.target.value)}
                      placeholder="e.g. Suresh Vora"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Trading House <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={sellCompany}
                      onChange={(e) => setSellCompany(e.target.value)}
                      placeholder="e.g. Vora Polymers Mumbai"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={sellPhone}
                      onChange={(e) => setSellPhone(e.target.value)}
                      placeholder="+91 98797 47777"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                {/* Material row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Material</label>
                    <select
                      value={sellMaterial}
                      onChange={(e) => setSellMaterial(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                      {POLYMER_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.code}>{p.code} — {p.name}</option>
                      ))}
                      <option value="Regrind">Regrind / Flakes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Grade / Make</label>
                    <input
                      type="text"
                      value={sellGrade}
                      onChange={(e) => setSellGrade(e.target.value)}
                      placeholder="e.g. HMEL R03RR, 24FS040"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">MFI Tested</label>
                    <input
                      type="text"
                      value={sellMfi}
                      onChange={(e) => setSellMfi(e.target.value)}
                      placeholder="e.g. MFI 0.35 or 12.0"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Quantity (MT)</label>
                    <input
                      type="text"
                      value={sellQuantity}
                      onChange={(e) => setSellQuantity(e.target.value)}
                      placeholder="e.g. 50 MT Ready Lot"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                {/* Logistics & Packing */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Warehouse Location</label>
                    <input
                      type="text"
                      value={sellLocation}
                      onChange={(e) => setSellLocation(e.target.value)}
                      placeholder="e.g. Bhiwandi, Mundra, Daman"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Packing Type</label>
                    <input
                      type="text"
                      value={sellPacking}
                      onChange={(e) => setSellPacking(e.target.value)}
                      placeholder="e.g. 25kg Original Bags / Jumbo"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Expected Price (Ex-Works / Delivery)</label>
                    <input
                      type="text"
                      value={sellOfferPrice}
                      onChange={(e) => setSellOfferPrice(e.target.value)}
                      placeholder="e.g. ₹98/kg or USD/MT"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lot Notes & CoA Availability</label>
                  <textarea
                    rows={2}
                    value={sellNotes}
                    onChange={(e) => setSellNotes(e.target.value)}
                    placeholder="Mention condition (Prime, Near Prime, Off-Grade, Regrind), packaging status, test reports, or sample availability..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <p className="text-[11px] text-slate-500 italic">
                    *We verify supplier credibility and sample specifications before publishing to our network.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-600/30 transition-all"
                  >
                    SUBMIT AVAILABLE STOCK
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
