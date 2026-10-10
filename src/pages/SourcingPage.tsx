import React, { useState } from 'react';
import { 
  Globe2, 
  ShieldCheck, 
  Coins, 
  Clock, 
  ArrowRight, 
  Layers, 
  Truck, 
  Handshake, 
  CheckCircle2, 
  MessageSquare,
  Package
} from 'lucide-react';
import { POLYMER_PRODUCTS, COMPANY_INFO } from '../data/polymerData';
import { MaterialCondition, PolymerProduct } from '../types';
import { SourcingProcess } from '../components/SourcingProcess';
import { BuySellSection } from '../components/BuySellSection';
import { MaterialRangeCards } from '../components/MaterialRangeCards';

interface SourcingPageProps {
  onOpenQuote: (type: 'buy' | 'sell' | 'quote', material?: string, condition?: MaterialCondition) => void;
  onSelectPolymer: (product: PolymerProduct) => void;
}

export const SourcingPage: React.FC<SourcingPageProps> = ({ onOpenQuote, onSelectPolymer }) => {
  const [selectedCondition, setSelectedCondition] = useState<MaterialCondition | 'All'>('Prime');

  const conditions: (MaterialCondition | 'All')[] = ['Prime', 'Near Prime', 'Off-Grade', 'Recycled'];

  const filteredProducts = POLYMER_PRODUCTS.filter((p) => {
    if (selectedCondition === 'All') return true;
    return p.conditionsAvailable.includes(selectedCondition as MaterialCondition);
  });

  return (
    <div className="space-y-0 bg-white">
      {/* Hero Banner */}
      <section className="relative bg-[#07162c] text-white py-16 md:py-24 overflow-hidden border-b border-sky-950">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <img
            src="/src/assets/images/port_container_terminal_1791543588743.jpg"
            alt="International Ocean Container Port Terminal"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#07162c]/90 to-transparent pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-700/60 text-cyan-400 text-xs font-semibold">
              <span>Home / Sourcing & Trading</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Polymer Sourcing & Trading
            </h1>
            <p className="text-amber-400 text-base md:text-lg font-semibold">
              Connecting Global Supply with Your Needs
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Newways Enterprise sources and trades high-quality polymer materials from trusted global suppliers, helping you get the right grade, at the right price, with reliable delivery.
            </p>

            {/* 4 Feature Badges matching mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <Globe2 className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-slate-200">Global Sourcing</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-slate-200">Verified Suppliers</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <Coins className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-slate-200">Competitive Pricing</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-slate-200">Timely Delivery</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="italic text-xs text-emerald-400 block">
                Right Material • Right Partner • Global Reach
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Material Range Cards (Prime, Off-Grade / Non-Prime, Recycled) */}
      <MaterialRangeCards
        onSelectCondition={(cond) => {
          setSelectedCondition(cond);
          const el = document.getElementById('polymer-range-table');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onViewAll={() => {
          setSelectedCondition('All');
          const el = document.getElementById('polymer-range-table');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Why Choose Newways as Trading Partner */}
      <section className="py-16 md:py-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">WHY CHOOSE NEWWAYS</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0b1e36] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Your Trusted Polymer Trading Partner
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              We work with manufacturers, stockists, importers, and recyclers across the globe to provide a wide range of polymer materials with consistent quality, competitive pricing, and flexible supply options.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Global Network</h3>
              <p className="text-xs text-slate-500 mt-1">Access to reliable suppliers from UAE, Europe, Japan and more.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Quality Assurance</h3>
              <p className="text-xs text-slate-500 mt-1">Material verification and supplier background checks.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Flexible Trading</h3>
              <p className="text-xs text-slate-500 mt-1">Prime, Near Prime, Off-Grade & Recycled materials.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Logistics Support</h3>
              <p className="text-xs text-slate-500 mt-1">International freight, transportation and documentation assistance.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
                <Handshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Long-Term Relationships</h3>
              <p className="text-xs text-slate-500 mt-1">Built on trust, transparency, and repeat business partnerships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Polymer Materials We Trade with Material Condition Tabs */}
      <section id="polymer-range-table" className="py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">OUR PRODUCT RANGE</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0b1e36] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Polymer Materials We Trade
              </h2>
              <p className="text-slate-600 text-xs md:text-sm mt-1">
                Wide range of polymer grades and material conditions to meet diverse manufacturing needs.
              </p>
            </div>

            {/* Condition Filter Tabs matching mockup: Prime | Near Prime | Off-Grade | Recycled */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase hidden sm:inline">Material Condition:</span>
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
                {conditions.map((cond) => {
                  const isActive = selectedCondition === cond;
                  return (
                    <button
                      key={cond}
                      onClick={() => setSelectedCondition(cond)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? cond === 'Prime' ? 'bg-[#0b1e36] text-white shadow-sm'
                          : cond === 'Near Prime' ? 'bg-sky-600 text-white shadow-sm'
                          : cond === 'Off-Grade' ? 'bg-orange-600 text-white shadow-sm'
                          : 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cond}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {filteredProducts.map((p) => (
              <div 
                key={p.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:border-sky-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-base font-extrabold text-[#0b1e36]">
                      {p.code}
                    </span>
                    <button 
                      onClick={() => onSelectPolymer(p)}
                      className="p-1 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100"
                      title="View Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-xs font-bold text-slate-700 mb-2 truncate">
                    {p.name}
                  </h3>

                  {p.imageUrl && (
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-100">
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Bullet applications list */}
                  <ul className="space-y-1 text-[11px] text-slate-500 mb-3">
                    {p.keyApplications.slice(0, 4).map((app, i) => (
                      <li key={i} className="truncate">
                        • {app}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {p.mfiRange}
                  </span>
                  <button
                    onClick={() => onOpenQuote('buy', p.code, selectedCondition === 'All' ? 'Prime' : selectedCondition)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700"
                  >
                    Enquire &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sourcing Disclaimer */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
            *Final prices, material specifications, availability, payment terms, and delivery schedules are subject to confirmation.
          </div>
        </div>
      </section>

      {/* 13. SPECIALIZED SERVICES SECTION */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">CORE SERVICES</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1e36] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Our Specialized Polymer Services
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-2">
              Comprehensive commercial, sourcing, documentation, and logistics services supporting high-volume polymer transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all hover:shadow-md">
              <span className="text-[10px] font-mono font-bold text-sky-600 block mb-1">SERVICE 01</span>
              <h3 className="text-base font-extrabold text-slate-900">POLYMER SOURCING</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Find suitable grades based on application, quantity and location.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all hover:shadow-md">
              <span className="text-[10px] font-mono font-bold text-sky-600 block mb-1">SERVICE 02</span>
              <h3 className="text-base font-extrabold text-slate-900">TRADING</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect buyers and sellers for domestic and imported polymer materials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all hover:shadow-md">
              <span className="text-[10px] font-mono font-bold text-sky-600 block mb-1">SERVICE 03</span>
              <h3 className="text-base font-extrabold text-slate-900">IMPORT & EXPORT</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Support international sourcing and trade coordination.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all hover:shadow-md">
              <span className="text-[10px] font-mono font-bold text-sky-600 block mb-1">SERVICE 04</span>
              <h3 className="text-base font-extrabold text-slate-900">LOGISTICS</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Freight-forwarding and transportation coordination.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all hover:shadow-md">
              <span className="text-[10px] font-mono font-bold text-sky-600 block mb-1">SERVICE 05</span>
              <h3 className="text-base font-extrabold text-slate-900">DOCUMENTATION</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Support with commercial and trade documentation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all hover:shadow-md">
              <span className="text-[10px] font-mono font-bold text-sky-600 block mb-1">SERVICE 06</span>
              <h3 className="text-base font-extrabold text-slate-900">BUSINESS VERIFICATION</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Supplier/buyer verification and business coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Step Sourcing Process */}
      <SourcingProcess onOpenQuote={onOpenQuote} />

      {/* Panoramic Container Shipping & Port Terminal Banner */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-14 px-4 sm:px-6 border-y border-sky-950">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/src/assets/images/terminal_cargo_reach_stacker_1791545680144.jpg"
            alt="International Polymer Cargo Reach Stacker Container Crane Loading Port Terminal"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#07162c]/85 to-transparent pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              IMPORT • EXPORT • DOMESTIC DISTRIBUTION
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Looking for a specific polymer grade or port shipment?
            </h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Get real-time updates on container arrivals, CFR port pricing, and domestic warehouse availability. Need to buy? Need to sell? Let's connect and move your polymer business forward.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-shrink-0">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Join WhatsApp Network</span>
            </a>

            <button
              onClick={() => onOpenQuote('quote')}
              className="w-full sm:w-auto px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors"
            >
              Request Commercial Quote
            </button>
          </div>
        </div>
      </section>

      {/* Full Buy & Sell Submission Forms */}
      <BuySellSection />
    </div>
  );
};
