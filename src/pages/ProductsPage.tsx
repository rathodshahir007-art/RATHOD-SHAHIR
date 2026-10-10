import React, { useState } from 'react';
import { PolymerCatalog } from '../components/PolymerCatalog';
import { MaterialRangeCards } from '../components/MaterialRangeCards';
import { POLYMER_PRODUCTS, COMPANY_INFO } from '../data/polymerData';
import { PolymerProduct, MaterialCondition } from '../types';
import { Layers, ShieldCheck, CheckCircle2, ArrowRight, PhoneCall, Filter } from 'lucide-react';

interface ProductsPageProps {
  onSelectPolymer: (product: PolymerProduct) => void;
  onOpenQuote: (type: 'buy' | 'sell' | 'quote', material?: string, condition?: MaterialCondition) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectPolymer,
  onOpenQuote,
}) => {
  const [activeCondition, setActiveCondition] = useState<MaterialCondition | 'All'>('All');

  const handleConditionSelect = (cond: MaterialCondition) => {
    setActiveCondition(cond);
    const el = document.getElementById('polymer-catalog-view');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-0 bg-white">
      {/* Header Banner */}
      <section className="relative bg-[#07162c] text-white py-16 md:py-24 overflow-hidden border-b border-sky-950">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <img
            src="/src/assets/images/port_container_terminal_1791543588743.jpg"
            alt="Deep Sea Container Port Terminal for Polymer Import Export"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#07162c]/90 to-transparent pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-700/60 text-cyan-400 text-xs font-semibold">
              <span>Home / Polymers Portfolio</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Key Polymer Grades & Materials
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Prime Virgin Resins, Factory Surplus, Near-Prime Lots, and Screened Recycled Polymers for injection molding, extrusion, pipe compounding, blow molding, and packaging.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['PP', 'PPCP', 'HDPE', 'LDPE', 'LLDPE', 'PET', 'PVC', 'ABS', 'Nylon', 'Recycled Flakes'].map((badge) => (
                <span key={badge} className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-xs font-mono font-bold text-cyan-300">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Material Range Cards (Prime, Off-Grade / Non-Prime, Recycled) */}
      <MaterialRangeCards
        onSelectCondition={handleConditionSelect}
        onViewAll={() => setActiveCondition('All')}
      />

      {/* Main Filterable Catalog */}
      <div id="polymer-catalog-view">
        <PolymerCatalog
          initialCondition={activeCondition}
          onSelectProduct={onSelectPolymer}
          onRequestQuote={(code, cond) => onOpenQuote('buy', code, cond)}
        />
      </div>

      {/* Grade Comparison & Assistance Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0b1e36] text-white rounded-3xl p-8 md:p-12 shadow-xl border border-sky-900 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                TECHNICAL SPECIFICATION MATCHING
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Need Assistance Selecting the Right Melt Index or Equivalent Grade?
              </h2>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Our polymer sourcing team compares Melt Flow Index (MFI), Izod impact strength, tensile modulus, and environmental stress crack resistance (ESCR) against Indian refinery grades and international alternatives.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => onOpenQuote('quote', 'Technical Specification Assistance')}
                className="w-full sm:w-auto px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors"
              >
                Request Technical Match
              </button>
              <a
                href={COMPANY_INFO.directWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
